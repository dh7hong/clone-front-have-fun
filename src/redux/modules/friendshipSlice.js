import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  outgoingFriendRequests: [],
  incomingFriendRequests: [],
};

const friendshipSlice = createSlice({
  name: "friendship",
  initialState,
  reducers: {
    addFriend: (state, action) => {
      const { senderId, receiverId, status } = action.payload;
      // Update the request with both sender and receiver information
      state.outgoingFriendRequests.push({ senderId, receiverId, status});
    },
    receiveFriend: (state, action) => {
      const { receiverId, senderId, status } = action.payload;
      state.incomingFriendRequests.push({receiverId, senderId, status});
      }
    }
  },
);

export const { addFriend, receiveFriend } = friendshipSlice.actions;
export default friendshipSlice.reducer;
