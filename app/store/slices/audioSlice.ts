import { createSlice } from '@reduxjs/toolkit';

export interface AudioData {
  isPlaying: boolean;
  soundUri: string;
}

const initialState: AudioData = {
  isPlaying: false,
  soundUri: '',
}

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    playAudio: (state, action) => {
      state.soundUri = action.payload;
      state.isPlaying = true;
    },
    pauseAudio: (state) => {
      state.isPlaying = false;
    },
    stopAudio: (state) => {
      state.soundUri = '';
      state.isPlaying = false;
    },
  },
});

export const { playAudio, pauseAudio, stopAudio } = audioSlice.actions;
export default audioSlice.reducer;
