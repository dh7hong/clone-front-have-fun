import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: {},
  friendRequests: {}, // memberId -> { status: 'pending' | 'accepted' | 'denied', name: string }
  incomingFriendRequests: [], // Array of memberId
};

const friendshipSlice = createSlice({
  name: "friendship",
  initialState,
  reducers: {
    addFriendRequest: (state, action) => {
      const { receiverId, receiverName, status, senderId, senderName } = action.payload;
      // Update the request with both sender and receiver information
      state.friendRequests[senderId] = { status, name: senderName, receiverId, receiverName };
    },
    updateFriendRequestStatus: (state, action) => {
      const { receiverId, status } = action.payload;
      if (state.friendRequests[receiverId]) {
        state.friendRequests[receiverId].status = status;
      }
    },
    updateFriendsList(state, action) {
      const { memberId, friends } = action.payload;
      state.friends[memberId] = friends;
    },
    addFriend(state, action) {
      const { memberId, friendId } = action.payload;
      state.friends[memberId] = state.friends[memberId] || [];
      state.friends[memberId].push(friendId);
    },
    setIncomingRequests: (state, action) => {
      state.incomingFriendRequests = action.payload;
    },
  },
});

export const { addFriendRequest, updateFriendRequestStatus, addFriend, setIncomingRequests } = friendshipSlice.actions;
export default friendshipSlice.reducer;
