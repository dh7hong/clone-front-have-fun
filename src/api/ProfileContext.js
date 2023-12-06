// context/ProfileContext.js

import React, { createContext, useContext, useReducer } from "react";

const ProfileContext = createContext();

const initialState = {
  statusMessage: "", // 초기값 설정
};

const profileReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STATUS_MESSAGE":
      return { ...state, statusMessage: action.payload };
    default:
      return state;
  }
};

const ProfileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  return (
    <ProfileContext.Provider value={{ state, dispatch }}>
      {" "}
      {/* dispatch 추가 */}
      {children}
    </ProfileContext.Provider>
  );
};

const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used within a ProfileProvider");
  }
  return context;
};

export { ProfileProvider, useProfileContext };
