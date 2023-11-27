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

const JWT_SECRET = process.env.JWT_SECRET;

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

// Simulate user registration
server.post("/api/register", (req, res) => {
  const { id, password, nickname } = req.body;
  const db = readDatabase();

  if (db.users.some((u) => u.id === id || u.nickname === nickname)) {
    return res.status(400).json({ message: "User already exists" });
  }
  const memberId = generateUniqueId();
  const newUser = { id, password, nickname, memberId }; // Use Date.now() for simplicity
  db.users.push(newUser);
  fs.writeFileSync("db.json", JSON.stringify(db));

  res
    .status(201)
    .json({ message: "User registered successfully", userId: newUser.userId });
});

// Simulate user login
server.post("/api/login", (req, res) => {
  const { id } = req.body;
  const db = readDatabase();

  const user = db.users.find((u) => u.id === id);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      id: user.id,
      nickname: user.nickname,
      memberId: user.memberId,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({
    token,
    id: user.id,
    nickname: user.nickname,
    memberId: user.memberId,
  });
});

server.post("/api/users/:memberId/friends", (req, res) => {
    const { memberId } = req.params;
    const { friendNickname } = req.body;

    const dbFilePath = path.join(__dirname, 'db.json'); // Replace with correct path to db.json
    let db = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

    // Find the friend by nickname and ensure memberId is a number
    const friend = db.users.find(u => u.nickname === friendNickname);
    if (!friend) {
        return res.status(404).json({ message: "Friend not found" });
    }

    // Parse memberId and friendMemberId as integers
    const numericMemberId = parseInt(memberId, 10);
    const numericFriendMemberId = parseInt(friend.memberId, 10);

    // Check if the relationship already exists
    const relationshipExists = db.relationships.some(r => 
        (r.memberId === numericMemberId && r.friendMemberId === numericFriendMemberId) ||
        (r.memberId === numericFriendMemberId && r.friendMemberId === numericMemberId)
    );

    if (relationshipExists) {
        return res.status(409).json({ message: "Friendship already exists" });
    }

    // Create and add the new relationship
    const newRelationship = { memberId: numericMemberId, friendMemberId: numericFriendMemberId };
    db.relationships = db.relationships || [];
    db.relationships.push(newRelationship);

    // Write the updated data back to db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
    res.status(201).json(newRelationship);
});

server.post("/api/users/:memberId/posts", (req, res) => {
  const newPost = req.body;
  router.db.get("posts").push(newPost).write();

  res.status(201).jsonp(newPost);
});

server.get("/api/users/:memberId/posts", (req, res) => {
  const memberId = req.params.memberId;

  const posts = router.db.get("posts").value();

  const userPosts = posts.filter((post) => post.toMemberId === memberId);

  res.jsonp(userPosts);
});

server.get("/api/users/:memberId/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = router.db.get("posts").find({ postId }).value();
  if (post) {
    const user = router.db.get("users").find({ userId: post.userId }).value();
    res.jsonp({ ...post, user });
  } else {
    res.status(404).send("Post not found");
  }
});

server.delete("/api/users/:memberId/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const post = router.db.get("posts").find({ postId }).value();

  if (post) {
    router.db.get("posts").remove({ postId }).write();
    res.status(200).send(`Post with postId ${postId} deleted`);
  } else {
    res.status(404).send("Post not found");
  }
});

server.patch("/api/users/:memberId/posts/:postId", (req, res) => {
  const postId = parseInt(req.params.postId);
  console.log("Received comment:", req.body);
  const updates = req.body;

  const post = router.db.get("posts").find({ postId }).value();

  if (post) {
    router.db.get("posts").find({ postId }).assign(updates).write();

    res.status(200).jsonp({ ...post, ...updates });
  } else {
    res.status(404).send("Post not found");
  }
});

server.post("/api/users/:memberId/posts/:postId/comments", (req, res) => {
  const newComment = req.body;

  router.db.get("comments").push(newComment).write();
  res.status(201).jsonp(newComment);
});

server.get("/api/users/:memberId/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);
  const comments = router.db
    .get("comments")
    .filter({ postId: postId.toString() })
    .value();
  res.jsonp(comments);
});

server.use("/api", router);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
