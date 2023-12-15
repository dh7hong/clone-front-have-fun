import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: {},
  friendRequests: {}, // memberId -> { status: 'pending' | 'accepted' | 'denied', name: string }
};

const friendshipSlice = createSlice({
  name: "friendship",
  initialState,
  reducers: {
    addFriendRequest: (state, action) => {
      const { receiverId, receiverName, status, senderId, senderName} = action.payload;
      state.friendRequests[receiverId] = { status, receiverName };
    },
    updateFriendRequestStatus: (state, action) => {
      const { memberId, status } = action.payload;
      if (state.friendRequests[memberId]) {
        state.friendRequests[memberId].status = status;
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
  },
});

export const { addFriendRequest, updateFriendRequestStatus, addFriend } = friendshipSlice.actions;
export default friendshipSlice.reducer;
