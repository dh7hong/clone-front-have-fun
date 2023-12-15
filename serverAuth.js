const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const router = express.Router();

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401); // No token
  console.log("Received token: ", token);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification error:", err);

      return res.sendStatus(403); // Invalid token
    }

    // Check if the user ID in the token matches the user ID in the request
    // if (parseInt(user.memberId) !== parseInt(req.params.memberId)) {
    //   console.log("User IDs don't match")
    //   return res.sendStatus(403); // User IDs don't match
    // }

    req.user = user; // Add user information to request
    next(); // Proceed to the next middleware
  });
};

const generateUniqueId = () => {
  let date = new Date();
  let milliseconds =
    date.getMinutes() * 60 * 1000 +
    date.getSeconds() * 1000 +
    date.getMilliseconds();
  console.log(milliseconds);
  return milliseconds;
};

const readDatabase = () => {
  try {
    const db = JSON.parse(fs.readFileSync("db_auth.json", "utf8"));
    // Ensure profileImages is always initialized
    if (!db.users) {
      db.users = [];
    }
    if (!db.profileMessage) {
      db.profileMessage = [];
    }
    if (!db.feeling) {
      db.feeling = [];
    }
    if (!db.profileIntro) {
      db.profileIntro = [];
    }
    if (!db.jukeLinks) {
      db.jukeLinks = {};
    }
    if (!db.profileImages) {
      db.profileImages = [];
    }
    if (!db.friendRequests) {
      db.friendRequests = [];
    }
    return db;
  } catch (err) {
    console.error("Error reading database", err);
    throw new Error("Error reading database");
  }
};
const writeDatabase = (db) => {
  try {
    fs.writeFileSync("db_auth.json", JSON.stringify(db, null, 2)); // Pretty print the JSON
  } catch (err) {
    console.error("Error writing to database", err);
    throw new Error("Error writing to database");
  }
};

app.post("/api/register", async (req, res) => {
  const { id, password, nickname, name } = req.body;
  let db = readDatabase();

  if (db.users.some((u) => u.id === id)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  if (db.users.some((u) => u.nickname === nickname)) {
    return res.status(400).json({ message: "Nickname already exists" });
  }
  const memberId = generateUniqueId();
  const newUser = { id, password, nickname, memberId, name, friends: [] };
  db.users.push(newUser);
  writeDatabase(db);

  res
    .status(201)
    .json({ message: "User registered successfully", name: newUser.name });
});

app.post("/api/login", async (req, res) => {
  const { id, password } = req.body;
  let db = readDatabase();

  const user = db.users.find((u) => u.id === id);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    {
      id: user.id,
      nickname: user.nickname,
      memberId: user.memberId,
      name: user.name,
    },
    JWT_SECRET,
    {
      expiresIn: "3h",
    }
  );
  res.json({
    token,
    data: {
      id: user.id,
      nickname: user.nickname,
      memberId: user.memberId,
      name: user.name,
    },
  });
});

// GET endpoint for /api/users
app.get("/api/users", async (req, res) => {
  try {
    let db = readDatabase();
    res.json(db.users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

app.post(
  "/api/users/:memberId/profile",
  authenticateToken,
  async (req, res) => {
    const memberId = parseInt(req.params.memberId); // Parse memberId as integer
    const { message } = req.body;
    let db = readDatabase();

    // Check if the user exists
    const userExists = db.users.some((u) => u.memberId === memberId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!db.profileMessage) {
      db.profileMessage = [];
    }

    const existingMessageIndex = db.profileMessage.findIndex(
      (m) => m.memberId === memberId
    );
    if (existingMessageIndex !== -1) {
      // Update existing message
      db.profileMessage[existingMessageIndex].message = message;
    } else {
      // Add new message
      db.profileMessage.push({ memberId, message });
    }

    writeDatabase(db);
    console.log("Profile messsage", db.profileMessage);
    res.json({
      message: "Profile message updated successfully",
      memberId: memberId,
      profileMessage: message,
    });
  }
);

// GET endpoint for reading user profileMessage
app.get("/api/users/:memberId/profile", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const db = readDatabase();

  const user = db.profileMessage.find((u) => u.memberId === memberId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ memberId: user.memberId, message: user.message });
});

// Express server
// POST endpoint for updating user feeling
app.post("/api/users/:memberId/feeling", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const { feeling } = req.body;
  let db = readDatabase();

  const userIndex = db.users.findIndex((u) => u.memberId === memberId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if feeling entry exists, if not create it
  const feelingIndex = db.feeling.findIndex((f) => f.memberId === memberId);
  if (feelingIndex === -1) {
    db.feeling.push({ memberId, feeling });
  } else {
    db.feeling[feelingIndex].feeling = feeling;
  }

  writeDatabase(db);
  res.json({ message: "Feeling updated successfully", memberId, feeling });
});

// GET endpoint for reading user feeling
app.get("/api/users/:memberId/feeling", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const db = readDatabase();

  const user = db.feeling.find((u) => u.memberId === memberId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ memberId: user.memberId, feeling: user.feeling });
});

app.post("/api/users/:memberId/intro", authenticateToken, async (req, res) => {
  const memberId = parseInt(req.params.memberId); // Parse memberId as integer
  const { intro } = req.body;
  let db = readDatabase();

  // Check if the user exists
  const userExists = db.users.some((u) => u.memberId === memberId);
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!db.profileIntro) {
    db.profileIntro = [];
  }

  const existingIntroIndex = db.profileIntro.findIndex(
    (m) => m.memberId === memberId
  );
  if (existingIntroIndex !== -1) {
    // Update existing message
    db.profileIntro[existingIntroIndex].intro = intro;
  } else {
    // Add new message
    db.profileIntro.push({ memberId, intro });
  }

  writeDatabase(db);
  console.log("Profile messsage", db.profileIntro);
  res.json({
    message: "Profile message updated successfully",
    memberId: memberId,
    profileIntro: intro,
  });
});

// GET endpoint for reading user profileIntro
app.get("/api/users/:memberId/intro", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const db = readDatabase();

  const user = db.profileIntro.find((u) => u.memberId === memberId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ memberId: user.memberId, intro: user.intro });
});

app.patch("/api/users/:memberId/intro", authenticateToken, async (req, res) => {
  const memberId = parseInt(req.params.memberId); // Parse memberId as integer
  const { intro } = req.body;
  let db = readDatabase();

  // Check if the user exists
  const userExists = db.users.some((u) => u.memberId === memberId);
  if (!userExists) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!db.profileIntro) {
    db.profileIntro = [];
  }

  const existingIntroIndex = db.profileIntro.findIndex(
    (m) => m.memberId === memberId
  );
  if (existingIntroIndex !== -1) {
    // Update existing intro
    db.profileIntro[existingIntroIndex].intro = intro;
    writeDatabase(db);
    res.json({
      message: "Profile intro updated successfully",
      memberId: memberId,
      profileIntro: intro,
    });
  } else {
    // Intro does not exist, cannot perform PATCH
    res
      .status(400)
      .json({ message: "Profile intro does not exist for this user" });
  }
});

app.post("/api/users/:memberId/jukebox", async (req, res) => {
  const memberId = req.params.memberId;
  const { videos } = req.body; // Get videos array from the request body
  const db = readDatabase();

  if (!db.jukeLinks) {
    db.jukeLinks = {};
  }

  // Assuming you want to save the entire array sent in the request
  db.jukeLinks[memberId] = videos;
  writeDatabase(db);

  res.status(200).json({ message: "Videos updated successfully" });
});

app.get("/api/users/:memberId/jukebox", async (req, res) => {
  const memberId = req.params.memberId;
  const db = readDatabase();

  // Initialize jukeLinks if it doesn't exist
  if (!db.jukeLinks) {
    db.jukeLinks = {};
  }

  // Check if the memberId exists in jukeLinks
  if (!db.jukeLinks[memberId]) {
    res.status(404).json({ message: "User videos not found" });
  } else {
    const videos = db.jukeLinks[memberId];
    console.log("Videos response", videos);
    res.json({ message: "Video Retrieval Success!", videos: videos });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./public/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post(
  "/api/users/:memberId/profileImage",
  upload.single("profileImage"),
  async (req, res) => {
    const memberId = parseInt(req.params.memberId);
    const db = readDatabase();

    if (!db.profileImages) {
      db.profileImages = [];
    }

    const imageUrl = `/images/${req.file.filename}`;
    const existingIndex = db.profileImages.findIndex(
      (img) => img.memberId === memberId
    );

    if (existingIndex >= 0) {
      db.profileImages[existingIndex].profileImage = imageUrl;
    } else {
      db.profileImages.push({ memberId, profileImage: imageUrl });
    }

    writeDatabase(db);
    res.json({ message: "Image uploaded successfully", imageUrl });
  }
);

// GET route for retrieving an image
app.get("/api/users/:memberId/profileImage", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const db = readDatabase();

  const profileImage = db.profileImages.find(
    (img) => img.memberId === memberId
  );
  const imageUrl = profileImage
    ? profileImage.profileImage
    : "/images/default.png";

  res.json({ memberId: memberId, imageUrl: imageUrl });
});

// Static route to serve images
app.use("/images", express.static("images"));

app.get("/api/users/:memberId/friends", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  let db = readDatabase();

  const user = db.users.find((u) => parseInt(u.memberId) === parseInt(memberId));
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const friends = user.friends || [];
  res.json({ friends });
});

app.get("/api/users/:memberId/incomingFriendRequests", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  let db = readDatabase();

  const incomingRequests = db.friendRequests.filter(
    (request) =>
      parseInt(request.receiverId) === parseInt(memberId) &&
      request.status === "pending"
  );
  res.json(incomingRequests);
});

app.post("/api/users/:receiverId/sendFriendRequest", async (req, res) => {
  console.log("req.body", req.body);
  const { senderId, receiverId } = req.body;
  console.log("receiverId", receiverId);
  console.log("senderId", senderId);
  let db = readDatabase();

  // Check if receiver exists
  const receiverExists = db.users.some(
    (user) => parseInt(user.memberId) === parseInt(receiverId)
  );
  if (!receiverExists) {
    return res.status(404).json({ message: "Receiver not found" });
  }

  // Add the friend request
  if (!db.friendRequests) {
    db.friendRequests = [];
  }
  db.friendRequests.push({
    senderId: parseInt(senderId),
    receiverId: parseInt(receiverId),
    status: "pending",
  });

  writeDatabase(db);
  res.json({ message: "Friend request sent successfully" });
});

app.patch("/api/users/:memberId/respondToFriendRequest", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const { senderId, accept } = req.body;

  let db = readDatabase();

  // Find the friend request
  const requestIndex = db.friendRequests.findIndex(
    (request) =>
      parseInt(request.senderId) === parseInt(senderId) &&
      parseInt(request.receiverId) === parseInt(memberId)
  );
  if (requestIndex === -1) {
    return res.status(404).json({ message: "Friend request not found" });
  }

  // Update the request status
  db.friendRequests[requestIndex].status = accept ? "accepted" : "rejected";

  // If accepted, add each user to the other's friends list
  if (accept) {
    const sender = db.users.find(
      (user) => parseInt(user.memberId) === parseInt(senderId)
    );
    const receiver = db.users.find(
      (user) => parseInt(user.memberId) === parseInt(memberId)
    );

    // Check if sender and receiver are found
    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or Receiver not found" });
    }

    sender.friends = sender.friends || [];
    receiver.friends = receiver.friends || [];
    sender.friends.push(parseInt(memberId));
    receiver.friends.push(parseInt(senderId));
  }

  writeDatabase(db);
  res.json({ message: `Friend request ${accept ? "accepted" : "rejected"}` });
});

app.use(router);

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

const PORT = 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
