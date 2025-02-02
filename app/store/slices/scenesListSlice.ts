import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the path based on your project structure

export interface SceneData {
  id: number;
  name: string;
  description?: string;
}

const initialState: SceneData[] = [];

const scenesListSlice = createSlice({
  name: "scenesList",
  initialState,
  reducers: {
    initScenesList: (state: SceneData[], action: PayloadAction<SceneData[]>) => action.payload,
    addScene: (state: SceneData[], action: PayloadAction<SceneData>) => {
      state.push(action.payload);
    },
    deleteScene: (state: SceneData[], action: PayloadAction<SceneData>) => {
      const index = state.findIndex(scene => scene.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    }
  }
});

export const getSceneById = (state: RootState, id: number): SceneData | undefined => state.scenesList.find(scene => scene.id === id);

export const { addScene, deleteScene, initScenesList } = scenesListSlice.actions;

export default scenesListSlice.reducer;
