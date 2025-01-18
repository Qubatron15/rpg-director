import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store"; // Adjust the path based on your project structure

export interface SceneData {
  id: number;
  name: string;
  description?: string;
}

const initialState: SceneData[] = [
  {
    id: 1,
    name: 'Attic'
  },
  {
    id: 2,
    name: 'Polio'
  },
  {
    id: 3,
    name: 'Titanic'
  }
];

const scenesListSlice = createSlice({
  name: "scenesList",
  initialState,
  reducers: {
    addScene: (state: SceneData[], action: PayloadAction<SceneData>) => {
      state.push(action.payload);
    },
    deleteScene: (state: SceneData[], action: PayloadAction<SceneData>) => {
      const index = state.findIndex(scene => scene.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
    }
  }
});

// Selector to get a scene by its ID
export const getSceneById = (state: RootState, id: number): SceneData | undefined => state.scenesList.find(scene => scene.id === id);

export const { addScene, deleteScene } = scenesListSlice.actions;

export default scenesListSlice.reducer;
