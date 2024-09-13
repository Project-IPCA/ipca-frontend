import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/redux/loginSlice";
import exerciseReducer from "../features/sumbitCode/redux/submitCodeSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    exercise: exerciseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
