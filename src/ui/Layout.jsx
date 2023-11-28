import React from "react";
import Header from "./Header";
import Login from "../pages/auth/Login";
import { Outlet, useLocation } from "react-router-dom";

import Navigation from "./Navigation";

export default function Layout() {
  const { pathname } = useLocation();
  /* need some adjustments here maybe */
  const isMyPage = pathname === "/api/users/:memberId";
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Navigation />
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
