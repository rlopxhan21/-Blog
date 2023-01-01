import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const initialState = {
  loginForm: true,
  isLoggedIn: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  authTokens: localStorage.getItem("authTokens")
    ? JSON.parse(localStorage.getItem("authTokens"))
    : null,
  userInfo: localStorage.getItem("authTokens")
    ? jwt_decode(JSON.parse(localStorage.getItem("authTokens")).access)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    formChangeHandler(state) {
      state.loginForm = !state.loginForm;
    },
    loginUserHandler(state, action) {
      state.authTokens = action.payload.token;
      state.userInfo = action.payload.access;
      state.isLoggedIn = true;

      localStorage.setItem("authTokens", JSON.stringify(action.payload.token));
    },

    logoutUserHandler(state) {
      state.isLoggedIn = null;
      state.authTokens = null;
      state.userInfo = null;
      localStorage.removeItem("authTokens");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
