import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  imageArr: "",
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.imageArr = action.payload;
    },

    resetImage: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export default imageSlice.reducer;
export const { addImage, resetImage } = imageSlice.actions;
