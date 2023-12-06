const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

require("dotenv").config();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use(cors());

const readDatabase = () => {
  try {
    return JSON.parse(fs.readFileSync("db.json", "utf8"));
  } catch (err) {
    console.error("Error reading database", err);
    throw new Error("Error reading database");
  }
};

server.get("/api", (req, res) => {
  res.jsonp(router.db.getState());
});

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000000);
};

server.get("/api/users/:memberId/posts", (req, res) => {
  const memberId = req.params.memberId;

  // Fetch posts based on the memberId in the URL
  const posts = router.db.get("posts").filter({ memberId }).value();
  res.jsonp(posts);
});

// For adding a new post
server.post("/api/users/:memberId/posts", (req, res) => {
  const newPost = { ...req.body, memberId: req.params.memberId };
  router.db.get("posts").push(newPost).write();
  res.status(201).jsonp(newPost);
});


server.get("/api/users/:memberId/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = router.db.get("posts").find({ postId }).value();
  if (post) {
    const user = router.db
      .get("users")
      .find({ memberId: post.memberId })
      .value();
    res.jsonp({ ...post, user });
  } else {
    res.status(404).send("Post not found");
  }
});

server.delete("/api/users/:memberId/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const memberId = req.params.memberId;
  const post = router.db.get("posts").find({ postId, memberId }).value();

  if (post) {
    router.db.get("posts").remove({ postId, memberId }).write();
    res.status(200).send(`Post with postId ${postId} deleted`);
  } else {
    res.status(404).send("Post not found");
  }
});

server.patch("/api/users/:memberId/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const memberId = req.params.memberId
  const db = router.db; // Get lowdb instance
  let post = db.get("posts").find({ postId, memberId }).value();

  if (post) {
    // Update the post
    db.get("posts")
      .find({ postId, memberId })
      .assign(req.body)
      .write();

    // Return the updated post
    post = db.get("posts").find({ postId, memberId }).value();
    res.jsonp(post);
  } else {
    res.status(404).send("Post not found");
  }
});

server.post("/api/users/:memberId/posts/:postId/comments", (req, res) => {
  const newComment = { ...req.body, postId: req.params.postId };
  router.db.get("comments").push(newComment).write();
  res.status(201).jsonp(newComment);
});

server.get("/api/users/:memberId/posts/:postId/comments", (req, res) => {
  const postId = req.params.postId;
  const comments = router.db.get("comments").filter({ postId }).value();
  res.jsonp(comments);
});

server.get("/api/users/:memberId/diary", (req, res) => {
  const memberId = req.params.memberId;
  const db = router.db; // Get lowdb instance
  const diaryEntries = db.get("diary").filter({ memberId }).value();
  res.jsonp(diaryEntries);
});


server.post("/api/users/:memberId/diary", (req, res) => {
  const newDiaryEntry = { ...req.body, memberId: req.params.memberId };
  router.db.get("diary").push(newDiaryEntry).write();
  res.status(201).jsonp(newDiaryEntry);
});



server.use("/api", router);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
