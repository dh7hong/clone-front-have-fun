// In your Redux slice, e.g., postSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  // Add other state properties as needed
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    // Add other reducers as needed
  },
});

export const { addPost } = postSlice.actions;
export default postSlice.reducer;