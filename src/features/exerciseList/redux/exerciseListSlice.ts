import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import { resolveApiError } from "../../../utils/function";
import { RootState } from "../../../store/store";
import axiosInstance from "../../../utils/axios";

export interface ExerciseInfo {
  chapter_id: string;
  full_mark: number;
  index: number;
  is_open: boolean;
  marking: number;
  name: string;
  last_exercise_success: number;
}

interface ExerciseState {
  data: ExerciseInfo[];
  isFetching: boolean;
  error: API_ERROR_RESPONSE | null;
}

const initialState: ExerciseState = {
  data: [],
  isFetching: false,
  error: null,
};

export const getExerciseList = createAsyncThunk(
  "exercise/getExerciseList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/student/all_chapter");
      return response.data;
    } catch (error) {
      return rejectWithValue(resolveApiError(error));
    }
  }
);

const exerciseListSlice = createSlice({
  name: "exerciseList",
  initialState,
  reducers: {
    clearExerciseListError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getExerciseList.pending, (state, _) => {
        state.isFetching = true;
      })
      .addCase(getExerciseList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(getExerciseList.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as API_ERROR_RESPONSE;
      }),
});

export const { clearExerciseListError } = exerciseListSlice.actions;

export const getExerciseListState = (state: RootState) =>
  state.exerciseList.data;
export const getExercciseListStatus = (state: RootState) =>
  state.exerciseList.isFetching;
export const getExerciseListError = (state: RootState) =>
  state.exerciseList.error;
export default exerciseListSlice.reducer;
