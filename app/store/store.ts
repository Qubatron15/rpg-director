import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import scenesListSlice from './slices/scenesListSlice';
import { mongoDbApi } from './slices/apiSlice';

export const store = configureStore({
  reducer: {
    scenesList: scenesListSlice,
    [mongoDbApi.reducerPath]: mongoDbApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mongoDbApi.middleware),
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
