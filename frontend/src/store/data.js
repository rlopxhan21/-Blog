import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post_data: [],
  room_data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    updatePost(state, action) {
      state.post_data = action.payload.post_data;
    },
    updateRoom(state, action) {
      state.room_data = action.payload.room_data;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
