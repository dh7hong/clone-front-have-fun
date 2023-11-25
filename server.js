const jsonServer = require("json-server");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());

server.get("/api", (req, res) => {
  res.jsonp(router.db.getState());
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
  const updates = req.body;

  const post = router.db.get("posts").find({ postId }).value();

  if (post) {
    // Update the post with new data
    router.db.get("posts")
      .find({ postId })
      .assign(updates) // Merging the updates into the original post
      .write();

    res.status(200).jsonp({ ...post, ...updates });
  } else {
    res.status(404).send("Post not found");
  }
});

// POST method for adding a new comment to a post
server.post("/api/users/:memberId/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);
  const memberId = parseInt(req.params.memberId);
  const newComment = req.body;
  console.log('newComment', newComment);
  console.log('Full Request:', req);
  // Add the comment to the 'comments' array in db.json
  router.db.get("comments").push(newComment).write();

  res.status(201).jsonp(newComment);
});


server.get("/api/users/:memberId/posts/:postId/comments", (req, res) => {
  const postId = parseInt(req.params.postId);
  const comments = router.db.get("comments").filter({ postId: postId.toString() }).value();
  res.jsonp(comments);
});

server.get("/api/users/:memberId/posts/:postId/comments/:commentId", (req, res) => {
  const postId = parseInt(req.params.postId);
  const commentId = parseInt(req.params.commentId);
  let comment = router.db
    .get("comments")
    .find({ commentId, postId }) // Adjusted to use commentId and postId
    .value();

  if (comment) {
    const user = router.db
      .get("users")
      .find({ userId: comment.userId })
      .value();
    comment = { ...comment, user };
    res.jsonp(comment);
  } else {
    res.status(404).send("Comment not found");
  }
});

server.use("/api", router); // Prefix all json-server routes with /api
server.use(middlewares);


const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
