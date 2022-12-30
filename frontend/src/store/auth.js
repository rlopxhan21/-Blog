import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginForm: true,
  isLoggedIn: false,
  RefreshToken: "",
  AccessToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    formChangeHandler(state) {
      state.loginForm = !state.loginForm;
    },
    loginHandler(state, action) {
      state.RefreshToken = action.payload.RefreshToken;
      state.AccessToken = action.payload.AccessToken;
      state.isLoggedIn = true;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
