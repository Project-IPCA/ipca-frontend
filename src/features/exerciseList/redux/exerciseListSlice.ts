import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import { getFreshAccessToken } from "../../../utils/service";
import axios from "axios";
import { resolveApiError } from "../../../utils/function";
import { RootState } from "../../../store/store";

const VITE_IPCA_API = import.meta.env.VITE_IPCA_API;

export interface ExerciseInfo {
  chapter_id: string;
  full_mark: number;
  index: number;
  is_open: boolean;
  marking: number;
  name: string;
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
      const token = getFreshAccessToken();
      const response = await axios.get(`${VITE_IPCA_API}/student/all_chapter`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(resolveApiError(error));
    }
  },
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

export const getExerciseListState = (state: RootState) => state.profile.data;
export const getExercciseListStatus = (state: RootState) =>
  state.profile.isFetching;
export const getExerciseListError = (state: RootState) => state.profile.error;
export default exerciseListSlice.reducer;
