import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../modules/Image";
import commentSlice from "../modules/commentSlice";
import userSlice from '../modules/userSlice';
import postSlice from '../modules/postSlice';

export const store = configureStore({
  reducer: {
    image: imageSlice,
    comments: commentSlice,
    user: userSlice,
    post: postSlice,
  },
});
