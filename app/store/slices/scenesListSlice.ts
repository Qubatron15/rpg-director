import { createSlice } from "@reduxjs/toolkit"

export interface SceneData {
  id: number;
  name: string;
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
  reducers: {}
})

export default scenesListSlice.reducer;