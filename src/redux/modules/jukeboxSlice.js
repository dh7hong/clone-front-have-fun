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
      const { memberId, videos, videoId, createdAt } = action.payload;
      state.videosByMemberId[memberId] = videos;
    },
    addVideo: (state, action) => {
      const { memberId, video } = action.payload;
      if (!state.videosByMemberId[memberId]) {
        state.videosByMemberId[memberId] = [];
      }
      // Add video along with the createdAt property
      state.videosByMemberId[memberId].push({
        ...video,
        createdAt: action.payload.createdAt, // Ensure this line is included
      });
    },
    deleteVideo: (state, action) => {
      const { memberId, videoId } = action.payload;
      state.videosByMemberId[memberId].splice(videoId, 1);
    },
    updateVolume: (state, action) => {
      const { memberId, videoId, volume } = action.payload;
      state.videosByMemberId[memberId][videoId].volume = volume;
    }
  }
});

export const { setVideos, addVideo, deleteVideo, updateVolume } = jukeboxSlice.actions;
export default jukeboxSlice.reducer;
