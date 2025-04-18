import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SceneData {
  id: string;
  name: string;
  description?: string;
  soundtrack?: string;
  checklist?: SceneChecklistItemData[]
  image?: Base64URLString;
}

export interface SceneChecklistItemData {
  name: string;
  checked: boolean;
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
  },
  selectors: {
    getSceneById: (state: SceneData[], id: string): SceneData | undefined => state.find(scene => scene.id === id),
    getAllScenes: (state: SceneData[]) => state ?? []
  }
});

export const { addScene, deleteScene, initScenesList } = scenesListSlice.actions;

export const { getSceneById, getAllScenes } = scenesListSlice.selectors;

export default scenesListSlice.reducer;
