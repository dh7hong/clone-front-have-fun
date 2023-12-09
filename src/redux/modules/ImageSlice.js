import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  images: {},
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    addImage: (state, action) => {
      const { memberId, imageUrl } = action.payload;
      state.images[memberId] = imageUrl;
    },

    resetImage: (state) => {
      state.images = {};
    },
  },
});

export default imageSlice.reducer;
export const { addImage, resetImage } = imageSlice.actions;
