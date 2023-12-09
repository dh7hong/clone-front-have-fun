// jukeboxSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videosByMemberId: {}
};

const jukeboxSlice = createSlice({
  name: 'jukebox',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      const { memberId, videos } = action.payload;
      state.videosByMemberId[memberId] = videos;
    },
    addVideo: (state, action) => {
      const { memberId, video } = action.payload;
      if (!state.videosByMemberId[memberId]) {
        state.videosByMemberId[memberId] = [];
      }
      state.videosByMemberId[memberId].push(video);
    },
    deleteVideo: (state, action) => {
      const { memberId, index } = action.payload;
      state.videosByMemberId[memberId].splice(index, 1);
    },
    updateVolume: (state, action) => {
      const { memberId, index, volume } = action.payload;
      state.videosByMemberId[memberId][index].volume = volume;
    }
  }
});

export const { setVideos, addVideo, deleteVideo, updateVolume } = jukeboxSlice.actions;
export default jukeboxSlice.reducer;
