import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post_data: [],
  room_data: [],
  blog_data: [],
  blogroom_data: [],
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

    updateBlog(state, action) {
      state.blog_data = action.payload.blog_data;
    },
    updateBlogRoom(state, action) {
      state.blogroom_data = action.payload.blogroom_data;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
