
// GuestHome.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Base from "../layout/Base";
import FirstGridArea from "../layout/FirstGridArea";
import SecondGridArea from "../SecondGridArea";
import * as S from "./GuestHomeStyle";
import {
  MiniroomImage,
  NewsBox,
  UpdateImage,
  UpdateNewsContent,
  UpdatedNews,
  UpdateNews,
} from "../../shared/style/Main";
import { userList } from "../../api/userService";
import GuestList from "./GuestList";

export default function GuestHome() {
  const [users, setUsers] = useState([]);
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();
  const [currentUserFriends, setCurrentUserFriends] = useState([]);

  const getUsersData = async () => {
    try {
      const response = await userList();
      const data = response;
      console.log("API 응답 구조가 예상과 같습니다:", data);
      // API 응답이 예상대로 구조화되었는지 확인
      if (data) {
        console.log("API 응답 구조가 예상과 같습니다:", data);
        setUsers(response);
      } else {
        console.error("API 응답 구조가 예상과 다릅니다:", response.data);
      }
    } catch (error) {
      console.error("데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const fetchProfileData = async (memberId) => {
    try {
      const [messageResponse, imageResponse] = await Promise.all([
        axios.get(
          `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profile`
        ),
        axios.get(
          `${process.env.REACT_APP_AUTH_URL}/api/users/${memberId}/profileImage`
        ),
      ]);

      setProfileData((prevData) => ({
        ...prevData,
        [memberId]: {
          message: messageResponse.data.message,
          imageUrl: imageResponse.data.imageUrl,
        },
      }));
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const memberId = localStorage.getItem("memberId")

  const fetchCurrentUserFriends = async () => {
    try {
      const response = await axios.get(`/api/users/${memberId}/friends`);
      setCurrentUserFriends(response.data.friends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(() => {
    getUsersData();
    fetchCurrentUserFriends();
  }, []);

  useEffect(() => {
    users.forEach((user) => {
      fetchProfileData(user.memberId);
    });
  }, [users]);


  return (
    <>
      
        <SecondGridArea>
          <S.BoardWrapper>
            <S.BoardTitle>Profile Image</S.BoardTitle>
            <S.BoardTitle>ID</S.BoardTitle>
            <S.BoardTitle>Nickname</S.BoardTitle>
            <S.BoardTitle>Name</S.BoardTitle>
            <S.BoardTitle>Message</S.BoardTitle>
            <S.BoardTitle>Friends</S.BoardTitle>
          </S.BoardWrapper>

          <S.PostStyle>
            {users.map((user) => (
              <GuestList
                key={user.memberId}
                user={user}
                profileData={profileData}
                currentUserFriends={currentUserFriends}
              />
            ))}
          </S.PostStyle>
        </SecondGridArea>
      
    </>
  );
}

// GuestList.jsx
import React, { useState, useEffect } from "react";
import * as S from "./GuestListStyle";
import { getDateTime } from "../../util/getDateTime";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";


export default function GuestList({ user, profileData, currentUserFriends }) {
  const navigate = useNavigate();

  const isFriend = currentUserFriends.includes(user.memberId);
  const buttonLabel = isFriend ? "Friends" : "Add Friend";
  const currentUserId = localStorage.getItem("memberId");

  const imageUrl = profileData[user.memberId]?.imageUrl || "/images/default.png";

  const addFriend = (memberId) => {
    // Dispatch an action to add a friend request
    dispatch(addFriendRequest({ memberId, name: user.name }));
    
    // You might want to call an API to send the friend request to the server
    // Then based on the response, you can update the status
  };

  const handleButtonClick = () => {
    if (isFriend) {
      navigate(`/api/users/${user.memberId}/posts`);
    } else {
      addFriend(user.memberId);
    }
  };

  updateFriendRequestStatus(memberId: memberId, status: ?) // how do I add the status here?

  return (
    <S.PostStyle>
      <S.RowStyle>
        <S.RowTitle>
          <S.MyProfileImage src={imageUrl} alt="Profile" />
        </S.RowTitle>
        <S.RowTitle>{user.id}</S.RowTitle>
        <S.RowTitle>{user.nickname}</S.RowTitle>
        <S.RowTitle>{user.name}</S.RowTitle>
        <S.RowTitle>{profileData[user.memberId]?.message}</S.RowTitle>
        <S.RowTitle>
          <Button onClick={handleButtonClick}>{buttonLabel}</Button>
        </S.RowTitle>
      </S.RowStyle>
    </S.PostStyle>
  );
}



// friendshipSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: {},
  friendRequests: {}, // memberId -> { status: 'pending' | 'accepted' | 'denied', name: string }
};

const friendshipSlice = createSlice({
  name: "friendship",
  initialState,
  reducers: {
    addFriendRequest(state, action) {
      const { memberId, name } = action.payload;
      state.friendRequests[memberId] = { status: "pending", name };
    },
    updateFriendRequestStatus(state, action) {
      const { memberId, status } = action.payload;
      if (state.friendRequests[memberId]) {
        state.friendRequests[memberId].status = status;
      }
    },
  },
});

export const { addFriendRequest, updateFriendRequestStatus } = friendshipSlice.actions;
export default friendshipSlice.reducer;




please code the following in full detail. first, code where if you are not friends with another user.memberId, the button shows "Add Friend". However if you are already friends with the user.memberId, then the button shows "Friends" and the button goes to http://localhost:3003/api/users/user.memberId/posts


Next, code the following in full detail. When you add a friend, there should be two objects created: one object for the memberId that made the friend request and another object for the memberId that received the friend request. 

Next, code the following in full detail. There should be an alarm message with a button that shows on the received friend request memberId's Main.jsx page that shows incoming friend request. Please note that the incoming friend request should be shown with the incoming friend request member's name not by memberId.

Next, code the following in full detail. Use redux to manage the friend requests. DO NOT USE thunks. and DO NOT USE SWITCH CASE. After the friend request has been made the friend request status should be "pending" or "accepted" or "denied"



export const { your reducers here } = friendshipSlice.actions;
export default friendshipSlice.reducer;

Finally, code the following in full detail. Add the function in express required for all the previous client side actions that adds another memberId to a friends list. The express code right now is as follows:


// serverAuth.json
const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

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

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    // Check if the user ID in the token matches the user ID in the request
    if (parseInt(user.memberId) !== parseInt(req.params.memberId)) {
      return res.sendStatus(403); // User IDs don't match
    }

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

app.get("/api/users/:memberId/profile", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const db = readDatabase();

  const user = db.profileMessage.find((u) => u.memberId === memberId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ memberId: user.memberId, message: user.message });
});

app.post("/api/users/:memberId/feeling", async (req, res) => {
  const memberId = parseInt(req.params.memberId);
  const { feeling } = req.body;
  let db = readDatabase();

  const userIndex = db.users.findIndex((u) => u.memberId === memberId);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  const feelingIndex = db.feeling.findIndex((f) => f.memberId === memberId);
  if (feelingIndex === -1) {
    db.feeling.push({ memberId, feeling });
  } else {
    db.feeling[feelingIndex].feeling = feeling;
  }

  writeDatabase(db);
  res.json({ message: "Feeling updated successfully", memberId, feeling });
});

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

app.use("/images", express.static("images"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

const PORT = 4002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));