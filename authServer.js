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

// Revised generateUniqueId function to return a random number
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000000); // Generates a random number
};

// Function to read the database
const readDatabase = () => {
  try {
    return JSON.parse(fs.readFileSync("db_auth.json", "utf8"));
  } catch (err) {
    console.error("Error reading database", err);
    throw new Error("Error reading database");
  }
};

// Function to write to the database
const writeDatabase = (db) => {
  try {
    fs.writeFileSync("db_auth.json", JSON.stringify(db, null, 2)); // Pretty print the JSON
  } catch (err) {
    console.error("Error writing to database", err);
    throw new Error("Error writing to database");
  }
};

// Register endpoint
app.post("/register", async (req, res) => {
  const { id, password } = req.body;
  let db = readDatabase();

  if (db.users.some((u) => u.id === id)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const userId = generateUniqueId();
  const newUser = { id, userId, password }; // Storing unhashed password as requested
  db.users.push(newUser);
  writeDatabase(db);

  res.status(201).json({ message: "User registered successfully", userId });
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { id, password } = req.body;
  let db = readDatabase();

  const user = db.users.find((u) => u.id === id);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.userId, id: user.id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token, userId: user.userId, id: user.id });
});

const PORT = 4001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
