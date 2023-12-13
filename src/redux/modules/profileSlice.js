// redux/modules/profileSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: {}, // Using an object to store messages by memberId
};

const profileSlice = createSlice({
  name: "profileStatus",
  initialState,
  reducers: {
    updateOrCreateStatusMessage: (state, action) => {
      const { memberId, message } = action.payload;
      // Update or create the message for the memberId
      state.messages[memberId] = message;
    },
    // New reducer for setting status message
    setStatusMessage: (state, action) => {
      const { memberId, message } = action.payload;
      state.messages[memberId] = message;
    },
    getStatusMessage: (state, action) => {
      const { memberId } = action.payload;
      return state.messages[memberId];
    },
  },
});

export const { updateOrCreateStatusMessage, setStatusMessage } = profileSlice.actions;
export default profileSlice.reducer;
