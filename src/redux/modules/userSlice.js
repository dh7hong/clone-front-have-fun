import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  id: null,
  nickname: null,
  memberId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setId: (state, action) => {
      // Add a reducer to set useName
      state.id = action.payload;
    },
    setNickname: (state, action) => {
      // Add a reducer to set useName
      state.nickname = action.payload;
    },
    setMemberId: (state, action) => {
      // Add a reducer to set useName
      state.memberId = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.id = null; // Clear id on logout
      state.nickname = null; // Clear nickname on logout
      state.memberId = null; // Clear memberId on logout
    },
  },
});

export const { setToken, setId, logout, setNickname, setMemberId } = userSlice.actions;
export default userSlice.reducer;
