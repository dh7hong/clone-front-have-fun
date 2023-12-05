import { createSlice } from "@reduxjs/toolkit";
import {getFeelingIcon} from "../../util/getFeelingIcon";

const initialState = {
    memberId: null,
    selectedFeeling: "그냥 그래"
};

export const feelingSlice = createSlice({
  name: "feeling",
  initialState,
  reducers: {
    setFeeling: (state, action) => {
      state.memberId = action.payload.memberId;
      state.selectedFeeling = action.payload.feeling;
    },
  },
});

export const { setFeeling } = feelingSlice.actions;
export default feelingSlice.reducer;
