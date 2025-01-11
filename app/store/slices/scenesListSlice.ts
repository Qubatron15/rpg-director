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
    addScene: (state, action: PayloadAction<SceneData>) => {
      state.push(action.payload);
    }
  }
});

export const { addScene } = scenesListSlice.actions;

export default scenesListSlice.reducer;
