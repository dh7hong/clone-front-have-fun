import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../modules/Image";
import commentSlice from "../modules/commentSlice";
import userSlice from '../modules/userSlice';

export const store = configureStore({
  reducer: {
    image: imageSlice,
    comments: commentSlice,
    user: userSlice,
  },
});