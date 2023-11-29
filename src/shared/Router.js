import React from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Layout from "../ui/Layout";
import Home from "../pages/Home";
import NewPost from "../pages/posts/NewPost";
import DetailedPage from "../pages/posts/DetailedPage";
import Profile from "../pages/Profile";
import DiaryHome from "../pages/diary/DiaryHome";
import Jukebox from "../pages/Jukebox";
import Guestbook from "../pages/Guestbook";
import PostHome from "../pages/posts/PostHome";
import Main from "../pages/Main";

export default function Router() {
  // Check login status
  const memberId = localStorage.getItem("memberId"); // Get memberId from localStorage
  console.log(`memberId is ${memberId}`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/api/users/:memberId" element={<Home />} />
          <Route path="/api/users/:memberId/posts" element={<PostHome />} />
          <Route path="/api/users/:memberId/posts/new" element={<NewPost />} />
          <Route
            path="/api/users/:memberId/posts/:postId"
            element={<DetailedPage />}
          />
          <Route path="/api/users/:memberId/profile" element={<Profile />} />
          <Route path="/api/users/:memberId/diary" element={<DiaryHome />} />
          <Route path="/api/users/:memberId/jukebox" element={<Jukebox />} />
          <Route
            path="/api/users/:memberId/guestbook"
            element={<Guestbook />}
          />
          <Route path="/api/users" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
