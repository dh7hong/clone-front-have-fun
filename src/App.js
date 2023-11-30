import React from "react";
import Router from "./shared/Router";
import { ProfileProvider } from "./api/ProfileContext";

export default function App() {
  return (
    <ProfileProvider>
      <Router />;
    </ProfileProvider>
  );
}
