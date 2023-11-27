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
  const { id, password, nickname } = req.body;
  let db = readDatabase();

  if (db.users.some((u) => u.id === id)) {
    return res.status(400).json({ message: "Username already exists" });
  }
  if (db.users.some((u) => u.nickname === nickname)) {
    return res.status(400).json({ message: "Nickname already exists" });
  }
  const userId = generateUniqueId();
  const memberId = generateUniqueId();
  const newUser = { id, password, nickname, memberId };
  db.users.push(newUser);
  writeDatabase(db);

  res.status(201).json({ message: "User registered successfully", userId });
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
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({
    token,
    id: user.id,
    nickname: user.nickname,
    memberId: user.memberId,
  });
});

// GET endpoint for /api/users
app.get('/api/users', (req, res) => {
  try {
    const dbData = readDatabase();
    res.json(dbData.users);
  } catch (error) {
    res.status(500).send("Error fetching users");
  }
});

const PORT = 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
