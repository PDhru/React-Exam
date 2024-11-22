import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./student";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;
