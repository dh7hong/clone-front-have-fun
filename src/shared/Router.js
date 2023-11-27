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
import PostHome from "../pages/PostHome";
import AddFriendComponent from "../pages/AddFriendComponent";
import UserList from '../pages/UserList';

export default function Router() {
  const isLoggedIn = !!localStorage.getItem("token"); // Check login status
  const memberId = localStorage.getItem("memberId"); // Get memberId from localStorage
  console.log(`memberId is ${memberId}`);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/login" element={<Login />} />
        <Route path="/api/register" element={<Register />} />
        <Route path="/" element={<Layout />}>
          <Route path="/api/users" element={<UserList />} />
          {isLoggedIn && memberId ? (
            <>
              <Route path="/api/users/:memberId/posts" element={<PostHome />} />
              <Route
                path="/api/users/:memberId/posts/new"
                element={<NewPost />}
              />
              <Route
                path="/api/users/:memberId/posts/:postId"
                element={<DetailedPage />}
              />
              <Route
                path="/api/users/:memberId/friends"
                element={<AddFriendComponent />}
              />
              <Route
                path="/api/users/:memberId/profile"
                element={<Profile />}
              />
              <Route path="/api/users/:memberId/diary" element={<Diary />} />
              <Route
                path="/api/users/:memberId/jukebox"
                element={<Jukebox />}
              />
              <Route
                path="/api/users/:memberId/guestbook"
                element={<Guestbook />}
              />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/api/login" />} />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
