import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resolveApiError } from "../../../utils/function";
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import { RootState } from "../../../store/store";

const VITE_IPCA_API = import.meta.env.VITE_IPCA_API;

interface Testcase {
  testcaseId: string;
  exerciseId: string;
  content: string;
  output: string;
}

interface Exercise {
  exerciseId: string;
  content: string;
  testcases: Testcase[];
}

interface ExerciseState {
  data: Exercise;
  isLoading: boolean;
  error: API_ERROR_RESPONSE | null;
}

const initialState: ExerciseState = {
  data: {
    exerciseId: "",
    content: "",
    testcases: [],
  },
  isLoading: false,
  error: null,
};

export const getExercise = createAsyncThunk(
  "submitCode/getExercise",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${VITE_IPCA_API}/student/exercise/61c97214-024b-441b-96a1-ac99700321e8`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(resolveApiError(error));
    }
  },
);

const submitCodeSlice = createSlice({
  name: "submitCode",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getExercise.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(getExercise.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getExercise.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as API_ERROR_RESPONSE;
      }),
});

export const getExerciseState = (state: RootState) => state.exercise.data;
export const getExerciseStatus = (state: RootState) => state.exercise.isLoading;
export const getExerciseError = (state: RootState) => state.exercise.error;

export default submitCodeSlice.reducer;
