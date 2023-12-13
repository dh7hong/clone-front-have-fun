import React from "react";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Layout from "../ui/Layout";
import NewPost from "../pages/posts/NewPost";
import DetailedPage from "../pages/posts/DetailedPage";
import Profile from "../pages/profile/Profile";
import DiaryHome from "../pages/diary/DiaryHome";
import Jukebox from "../pages/jukebox/Jukebox";
import GuestHome from "../pages/guest/GuestHome";
import PostHome from "../pages/posts/PostHome";
import Album from "../pages/album/Album";
import Main from "../pages/main/Main";

export default function Router() {
  // Check login status
  const memberId = localStorage.getItem("memberId"); // Get memberId from localStorage
  console.log(`memberId is ${memberId}`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={memberId ? <Navigate to="/api/users" /> : <Login />} />
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/api/users" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path=":memberId" element={<Main />} />
          <Route path=":memberId/posts" element={<PostHome />} />
          <Route path=":memberId/posts/new" element={<NewPost />} />
          <Route path=":memberId/posts/:postId" element={<DetailedPage />} />
          <Route path=":memberId/profile" element={<Profile />} />
          <Route path=":memberId/diary" element={<DiaryHome />} />
          <Route path=":memberId/jukebox" element={<Jukebox />} />
          <Route path=":memberId/guesthome" element={<GuestHome />} />
          <Route path=":memberId/album" element={<Album />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
