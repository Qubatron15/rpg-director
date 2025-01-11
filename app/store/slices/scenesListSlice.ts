import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SceneData {
  id: number;
  name: string;
  description?: string;
}

const scenesListSlice = createSlice({
  name: "scenesList",
  initialState: [
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
  ],
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

export const { addScene, deleteScene } = scenesListSlice.actions;

export default scenesListSlice.reducer;
