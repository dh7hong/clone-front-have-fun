import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../modules/ImageSlice";
import commentSlice from "../modules/commentSlice";
import userSlice from "../modules/userSlice";
import postSlice from "../modules/postSlice";
import diarySlice from '../modules/diarySlice';

export const store = configureStore({
  reducer: {
    image: imageSlice,
    comments: commentSlice,
    user: userSlice,
    post: postSlice,
    diary: diarySlice,
  },
});
