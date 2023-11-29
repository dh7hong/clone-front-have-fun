// diarySlice.js
import { createSlice } from '@reduxjs/toolkit';

export const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    entries: [],
  },
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    addEntry: (state, action) => {
      state.entries.push(action.payload);
    },
  },
});

export const { setEntries, addEntry } = diarySlice.actions;
export default diarySlice.reducer;
