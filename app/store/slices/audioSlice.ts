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
      const soundUri = action.payload
      state.soundUri = soundUri;
      state.isPlaying = !!soundUri;
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
