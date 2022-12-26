import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginForm: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    formChangeHandler(state) {
      state.loginForm = !state.loginForm;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
