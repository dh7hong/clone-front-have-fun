import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "../modules/imageSlice";
import commentSlice from "../modules/commentSlice";
import userSlice from "../modules/userSlice";
import postSlice from "../modules/postSlice";
import diarySlice from "../modules/diarySlice";
import profileSlice from "../modules/profileSlice";
import feelingSlice from "../modules/feelingSlice";

export const store = configureStore({
  reducer: {
    image: imageSlice,
    comments: commentSlice,
    user: userSlice,
    post: postSlice,
    diary: diarySlice,
    profile: profileSlice,
    feeling: feelingSlice,
  },
});
