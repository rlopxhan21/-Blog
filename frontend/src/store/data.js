import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post_data: [],
  comment_data: [],
  post_comment: [],
  room_data: [],
  blog_data: [],
  blog_comment: [],
  blogroom_data: [],
  profile_data: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    updatePost(state, action) {
      state.post_data = action.payload.post_data;
    },
    updateComment(state, action) {
      state.comment_data = action.payload;
    },
    updatePostComment(state, action) {
      state.post_comment = action.payload;
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
    updateBlogComment(state, action) {
      state.blog_comment = action.payload;
    },
    updateProfile(state, action) {
      state.profile_data = action.payload;
    },
  },
});

export const dataActions = dataSlice.actions;

export default dataSlice;
