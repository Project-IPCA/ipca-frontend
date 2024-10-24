import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_IPCA_API = import.meta.env.VITE_IPCA_API;
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import { resolveApiError } from "../../../utils/function";
import { RootState } from "../../../store/store";

interface GetSubmissionParams {
  stu_id: string | null;
  chapter_id: string | null;
  chapter_idx: string | null;
  item_id: string | null;
}

export interface SubmissionHistory {
  SubmissionID: string;
  StuID: string;
  ExerciseID: string;
  Status: string;
  SourcecodeFilename: string;
  Marking: number;
  TimeSubmit: string;
  IsInfLoop: boolean;
  Output: string | null;
  Result: string;
  ErrorMessage: string | null;
}

interface SubmissionHistoryState {
  submissionHistory: SubmissionHistory[];
  isFetching: boolean;
  error: API_ERROR_RESPONSE | null;
}

const initialState: {
  [key: string]: SubmissionHistoryState;
} = {};

export const getSubmissionHistory = createAsyncThunk(
  "submitCode/getSubmissionHistory",
  async (
    { chapter_id, item_id, stu_id }: GetSubmissionParams,
    { rejectWithValue },
  ) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get(
        `${VITE_IPCA_API}/common/student_submission`,
        {
          params: {
            stu_id: stu_id,
            chapter_id: chapter_id,
            item_id: item_id,
          },
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

const submissionHistorySlice = createSlice({
  name: "historySubmission",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(getSubmissionHistory.pending, (state, action) => {
        const { chapter_idx, item_id } = action.meta.arg;
        state[`${chapter_idx}.${item_id}`] = {
          submissionHistory: [],
          isFetching: true,
          error: null,
        };
      })
      .addCase(getSubmissionHistory.fulfilled, (state, action) => {
        const { chapter_idx, item_id } = action.meta.arg;
        state[`${chapter_idx}.${item_id}`] = {
          submissionHistory: action.payload,
          isFetching: false,
          error: null,
        };
      })
      .addCase(getSubmissionHistory.rejected, (state, action) => {
        const { chapter_idx, item_id } = action.meta.arg;
        state[`${chapter_idx}.${item_id}`] = {
          submissionHistory: [],
          isFetching: false,
          error: action.payload as API_ERROR_RESPONSE,
        };
      }),
});

export const getSubmissionHistoryState = (state: RootState) =>
  state.submissionHistory;

export default submissionHistorySlice.reducer;
