import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { resolveApiError } from "../../../utils/function";
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import { RootState } from "../../../store/store";

const VITE_IPCA_API = import.meta.env.VITE_IPCA_API;
export const VITE_IPCA_RT = import.meta.env.VITE_IPCA_RT;

interface Params {
  chapter_idx: string;
  item_id: string;
}

interface SubmitExerciseRequest {
  chapter_id: string | null;
  item_id: number | null;
  sourcecode: string | null;
  job_id: string | null;
}

export interface Testcase {
  show_to_student: boolean;
  testcase_content: string;
  testcase_id: string;
  testcase_note: string;
  testcase_output: string;
}

interface Exercise {
  chapter_id: string;
  chapter_index: number;
  content: string;
  exercise_id: string;
  full_mark: number;
  level: string;
  name: string;
  suggested_constraints: string;
  testcase: string;
  testcase_list: Testcase[];
  user_defined_constraints: string;
}

interface ExerciseState {
  exercise: Exercise | null;
  isFetching: boolean;
  error: API_ERROR_RESPONSE | null;
}

const initialState: {
  [key: string]: ExerciseState;
} = {};

export const getExercise = createAsyncThunk(
  "submitCode/getExercise",
  async ({ chapter_idx, item_id }: Params, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("access_token");
      const params = {
        chapter_idx: chapter_idx,
        item_id: item_id,
      };
      const response = await axios.get(
        `${VITE_IPCA_API}/student/assigned_exercise`,
        {
          params: params,
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

export const submitExercise = createAsyncThunk(
  "submitCode/sumbitExercise",
  async (
    { chapter_id, item_id, sourcecode, job_id }: SubmitExerciseRequest,
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.post(
        `${VITE_IPCA_API}/student/exercise_submit`,
        {
          item_id: item_id,
          chapter_id: chapter_id,
          sourcecode: sourcecode,
          job_id: job_id,
        },
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
      .addCase(getExercise.pending, (state, action) => {
        const { chapter_idx, item_id } = action.meta.arg;
        state[`${chapter_idx}.${item_id}`] = {
          exercise: null,
          isFetching: true,
          error: null,
        };
      })
      .addCase(getExercise.fulfilled, (state, action) => {
        const { chapter_idx, item_id } = action.meta.arg;
        state[`${chapter_idx}.${item_id}`] = {
          exercise: action.payload,
          isFetching: false,
          error: null,
        };
      })
      .addCase(getExercise.rejected, (state, action) => {
        const { chapter_idx, item_id } = action.meta.arg;
        state[`${chapter_idx}.${item_id}`] = {
          exercise: null,
          isFetching: false,
          error: action.payload as API_ERROR_RESPONSE,
        };
      }),
});

export const getExerciseState = (state: RootState) => state.exercise;

export default submitCodeSlice.reducer;
