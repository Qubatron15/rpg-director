import { configureStore } from '@reduxjs/toolkit';
import scenesListReducer from './slices/scenesSlice';

export const store = configureStore({
  reducer: {
    scenesList: scenesListReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
