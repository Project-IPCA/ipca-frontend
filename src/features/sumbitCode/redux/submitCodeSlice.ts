import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resolveApiError } from "../../../utils/function";
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import { RootState } from "../../../store/store";
import axiosInstance from "../../../utils/axios";

export const VITE_IPCA_RT = import.meta.env.VITE_IPCA_RT;

interface Params {
  chapter_idx: string;
  item_id: string;
}

interface SubmitExerciseRequest {
  chapter_id: string | null;
  chapter_idx: number | null;
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

export interface SuggestedConstraintData {
  keyword: string;
  limit: number;
}

export interface UserConstraintData {
  keyword: string;
  limit: number;
  active: boolean;
  type: ConstraintType;
}

export interface SuggestedConstraint {
  classes: SuggestedConstraintData[];
  functions: SuggestedConstraintData[];
  imports: SuggestedConstraintData[];
  methods: SuggestedConstraintData[];
  reserved_words: SuggestedConstraintData[];
  variables: SuggestedConstraintData[];
}

export interface UserConstraint {
  classes: UserConstraintData[];
  functions: UserConstraintData[];
  imports: UserConstraintData[];
  methods: UserConstraintData[];
  reserved_words: UserConstraintData[];
  variables: UserConstraintData[];
}

export interface CheckUserConstraintData extends UserConstraintData {
  is_passed: boolean;
}

export interface CheckUserConstraint {
  classes: CheckUserConstraintData[];
  functions: CheckUserConstraintData[];
  imports: CheckUserConstraintData[];
  methods: CheckUserConstraintData[];
  reserved_words: CheckUserConstraintData[];
  variables: CheckUserConstraintData[];
}

export interface CheckKeywordReponse {
  status: string;
  keyword_constraint: CheckUserConstraint;
}

type ConstraintType = "eq" | "me" | "le" | "na";

interface Exercise {
  chapter_id: string;
  chapter_index: number;
  content: string;
  exercise_id: string;
  full_mark: number;
  level: string;
  name: string;
  suggested_constraints: SuggestedConstraint;
  testcase: string;
  testcase_list: Testcase[];
  user_defined_constraints: UserConstraint;
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
      const params = {
        chapter_idx: chapter_idx,
        item_id: item_id,
      };
      const response = await axiosInstance.get(`/student/assigned_exercise`, {
        params: params,
      });
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
      const response = await axiosInstance.post(`/student/exercise_submit`, {
        item_id: item_id,
        chapter_id: chapter_id,
        sourcecode: sourcecode,
        job_id: job_id,
      });
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
      })
      .addCase(submitExercise.rejected, (state, action) => {
        const { chapter_idx, item_id } = action.meta.arg;
        state[`${chapter_idx}.${item_id}`] = {
          exercise: state[`${chapter_idx}.${item_id}`].exercise,
          isFetching: false,
          error: action.payload as API_ERROR_RESPONSE,
        };
      }),
});

export const getExerciseState = (state: RootState) => state.exercise;
export const getExerciseStatus = (state: RootState) => state.exercise;

export default submitCodeSlice.reducer;
