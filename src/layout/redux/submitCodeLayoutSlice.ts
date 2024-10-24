import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ERROR_RESPONSE } from "../../constants/constants";
import { getFreshAccessToken } from "../../utils/service";
import axios from "axios";
import { resolveApiError } from "../../utils/function";
import { RootState } from "../../store/store";

const VITE_IPCA_API = import.meta.env.VITE_IPCA_API;

interface ChapterItem {
  chapter_idx: number;
  full_mark: number;
  item_idx: number;
  marking: number;
  status: string;
  time_end: string;
  time_start: string;
}

export interface Chapter {
  access_time_end: string;
  access_time_start: string;
  allow_access: boolean;
  allow_access_type: string;
  allow_submit: boolean;
  allow_submit_type: string;
  chapter_full_mark: number;
  chapter_id: string;
  chapter_name: string;
  class_id: string;
  items: ChapterItem[];
  no_items: number;
  status: string;
  submit_time_end: string;
  submit_time_start: string;
  time_end: string;
  time_start: string;
}

interface ChapterListState {
  data: Chapter[];
  isFetching: boolean;
  error: API_ERROR_RESPONSE | null;
}

const initialState: ChapterListState = {
  data: [],
  isFetching: false,
  error: null,
};

export const getChapterList = createAsyncThunk(
  "submitCodeLayout/getChapterList",
  async (_, { rejectWithValue }) => {
    try {
      const token = getFreshAccessToken();
      const response = await axios.get(
        `${VITE_IPCA_API}/student/chapter_list`,
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

const chapterListSlice = createSlice({
  name: "chapterList",
  initialState,
  reducers: {
    clearChapterListError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getChapterList.pending, (state, _) => {
        state.isFetching = true;
      })
      .addCase(getChapterList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data = action.payload;
      })
      .addCase(getChapterList.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as API_ERROR_RESPONSE;
      }),
});

export const { clearChapterListError } = chapterListSlice.actions;

export const getChapterListState = (state: RootState) => state.chapterList.data;
export const getChapterListStatus = (state: RootState) =>
  state.chapterList.isFetching;
export const getChapterListError = (state: RootState) =>
  state.chapterList.error;
export default chapterListSlice.reducer;
