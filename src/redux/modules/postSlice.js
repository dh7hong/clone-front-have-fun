import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push({
        postId: action.payload.postId,
        title: action.payload.title,
        id: action.payload.id,
        nickname: action.payload.nickname,
        name: action.payload.name,
        contents: action.payload.contents,
        memberId: action.payload.memberId,
        createdAt: action.payload.createdAt,
      });
    },
    editPost: (state, action) => {
      const { postId, ...rest } = action.payload;
      const index = state.posts.findIndex((post) => post.postId === postId);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...rest };
      }
    },
  },
});

export const { addPost, editPost } = postSlice.actions;
export default postSlice.reducer;
