import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/redux/loginSlice";
import exerciseReducer from "../features/sumbitCode/redux/submitCodeSlice";
import profileReducer from "../features/profile/redux/profileSlice";
import exerciseListReducer from "../features/exerciseList/redux/exerciseListSlice";
import chapterListReducer from "../layout/redux/submitCodeLayoutSlice";
import submissionHistoryReducer from "../features/submissionHistory/redux/submissionHistorySlice";
import codeDisplayReducer from "../features/codeDisplay/redux/codeDisplaySlice";
import userIpAddressReducer from "../features/userIpAddress/redux/UserIpAddress";

export const RESET_STATE = "RESET_STATE";

const appReducer = combineReducers({
  login: loginReducer,
  exercise: exerciseReducer,
  profile: profileReducer,
  exerciseList: exerciseListReducer,
  chapterList: chapterListReducer,
  submissionHistory: submissionHistoryReducer,
  codeDisplay: codeDisplayReducer,
  userIpAddress: userIpAddressReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === RESET_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const resetState = () => ({
  type: RESET_STATE,
});