import { createSlice } from '@reduxjs/toolkit';
import useQuery from 'react-query'

const initialState = {
  comments: [],
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push({
        commentId: action.payload.commentId,
        postId: action.payload.postId,
        userId: action.payload.userId,
        username: action.payload.username,
        contents: action.payload.contents
      });
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { addComment, setComments } = commentSlice.actions;
export default commentSlice.reducer;