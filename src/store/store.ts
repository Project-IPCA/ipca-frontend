import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/redux/loginSlice";
import exerciseReducer from "../features/sumbitCode/redux/submitCodeSlice";
import profileReducer from "../features/profile/redux/profileSlice";
import exerciseListReducer from "../features/exerciseList/redux/exerciseListSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    exercise: exerciseReducer,
    profile: profileReducer,
    exerciseList: exerciseListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
