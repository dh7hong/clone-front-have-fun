// redux/modules/profileSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: {}, // Using an object to store messages by memberId
};

const profileSlice = createSlice({
  name: 'profileStatus',
  initialState,
  reducers: {
    updateOrCreateStatusMessage: (state, action) => {
      const { memberId, message } = action.payload;
      // Update or create the message for the memberId
      state.messages[memberId] = message;
    },
  },
});

export const { updateOrCreateStatusMessage } = profileSlice.actions;
export default profileSlice.reducer;