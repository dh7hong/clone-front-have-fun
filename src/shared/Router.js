import React from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { QueryClient, QueryClientProvider } from "react-query";
import PrivateRoute from "./PrivateRoute";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Layout from "../ui/Layout";
import Home from "../pages/Home";
import NewPost from "../pages/NewPost";
import DetailedPage from "../pages/DetailedPage";
import MyPage from "../pages/MyPage";
import Profile from "../pages/Profile";
import Diary from "../pages/Diary";
import Jukebox from "../pages/Jukebox";
import Guestbook from "../pages/Guestbook";

export default function Router() {
  const isLoggedIn = !!localStorage.getItem("token"); // Check login status

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/" /> : <Login />}
          />
          <Route path="api/posts" element={<NewPost />} />
          <Route path="/api/posts/:postId" element={<DetailedPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/jukebox" element={<Jukebox />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
