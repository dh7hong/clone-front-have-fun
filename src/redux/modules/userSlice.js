import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
  username: null,
  memberId: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => { // Add a reducer to set userId
      state.userId = action.payload;  
    },
    setUsername: (state, action) => { // Add a reducer to set useName
      state.username = action.payload; 
    },
    setMemberId: (state, action) => { // Add a reducer to set useName
      state.memberId = action.payload; 
    },
    logout: (state) => {
      state.token = null;
      state.userId = null; // Clear userId on logout
      state.username = null; // Clear username on logout
      state.memberId = null; // Clear memberId on logout
    },
  },
});

export const { setToken, setUserId, logout, setUsername, setMemberId } = userSlice.actions;
export default userSlice.reducer;
