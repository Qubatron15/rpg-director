import { createSlice } from '@reduxjs/toolkit';

const soundSlice = createSlice({
  name: 'music',
  initialState: {
    isPlaying: false,
    soundUri: '',
  },
  reducers: {
    playSound: (state, action) => {
      state.soundUri = action.payload;
      state.isPlaying = true;
    },
    pauseSound: (state) => {
      state.isPlaying = false;
    },
    stopSound: (state) => {
      state.soundUri = '';
      state.isPlaying = false;
    },
  },
});

export const { playSound, pauseSound, stopSound } = soundSlice.actions;
export default soundSlice.reducer;
