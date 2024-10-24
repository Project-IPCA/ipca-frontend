import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/redux/loginSlice";
import exerciseReducer from "../features/sumbitCode/redux/submitCodeSlice";
import profileReducer from "../features/profile/redux/profileSlice";
import exerciseListReducer from "../features/exerciseList/redux/exerciseListSlice";
import chapterListReducer from "../layout/redux/submitCodeLayoutSlice";
import submissionHistoryReducer from "../features/submissionHistory/redux/submissionHistorySlice";
import codeDisplayReducer from "../features/codeDisplay/redux/codeDisplaySlice";
import userIpAddressReducer from "../features/userIpAddress/redux/UserIpAddress";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    exercise: exerciseReducer,
    profile: profileReducer,
    exerciseList: exerciseListReducer,
    chapterList: chapterListReducer,
    submissionHistory: submissionHistoryReducer,
    codeDisplay: codeDisplayReducer,
    userIpAddress: userIpAddressReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
