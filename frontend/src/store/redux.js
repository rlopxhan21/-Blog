import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./auth";
import dataSlice from "./data";

const redux = configureStore({
  reducer: {
    auth: authSlice.reducer,
    data: dataSlice.reducer,
  },
});

export default redux;
