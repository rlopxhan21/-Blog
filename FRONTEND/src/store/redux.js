import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";

const redux = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default redux;
