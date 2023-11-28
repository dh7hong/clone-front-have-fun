import { createSlice } from '@reduxjs/toolkit';
import useQuery from 'react-query'
import { getDateTime } from '../../util/getDateTime';

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
        id: action.payload.id,
        nickname: action.payload.nickname,
        name: action.payload.name,
        contents: action.payload.contents,
        memberId: action.payload.memberId,
        createdAt: action.payload.createdAt,
      });
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

export const { addComment, setComments } = commentSlice.actions;
export default commentSlice.reducer;