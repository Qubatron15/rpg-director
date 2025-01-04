import { configureStore } from '@reduxjs/toolkit';
import scenesListSlice from './slices/scenesListSlice';

export const store = configureStore({
  reducer: {
    scenesList: scenesListSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
