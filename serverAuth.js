const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const JWT_SECRET = process.env.JWT_SECRET;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000000);
};

const readDatabase = () => {
  try {
    return JSON.parse(fs.readFileSync("db_auth.json", "utf8"));
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
  const newUser = { id, password, nickname, memberId, name };
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
      expiresIn: "1h",
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
app.get("/api/users", (req, res) => {
  try {
    const dbData = readDatabase();
    res.json(dbData.users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

app.post("/api/users/:memberId/profile", authenticateToken, (req, res) => {
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
});

// GET endpoint for reading user profileMessage
app.get("/api/users/:memberId/profile", (req, res) => {
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
app.post("/api/users/:memberId/feeling", (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const { feeling } = req.body;
  let db = readDatabase();

  const userIndex = db.users.findIndex(u => u.memberId === memberId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if feeling entry exists, if not create it
  const feelingIndex = db.feeling.findIndex(f => f.memberId === memberId);
  if (feelingIndex === -1) {
    db.feeling.push({ memberId, feeling });
  } else {
    db.feeling[feelingIndex].feeling = feeling;
  }

  writeDatabase(db);
  res.json({ message: "Feeling updated successfully", memberId, feeling });
});


// GET endpoint for reading user feeling
app.get("/api/users/:memberId/feeling", (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const db = readDatabase();

  const user = db.feeling.find((u) => u.memberId === memberId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ memberId: user.memberId, feeling: user.feeling });
});

const PORT = 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
