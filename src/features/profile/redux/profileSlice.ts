import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import { getFreshAccessToken } from "../../../utils/service";
import axios from "axios";
import { resolveApiError } from "../../../utils/function";
import { RootState } from "../../../store/store";

const VITE_IPCA_API = import.meta.env.VITE_IPCA_API;

interface ProfileInfo {
  avatar: string;
  dept: Dept;
  dob: string;
  email: string;
  f_name: string;
  gender: string;
  l_name: string;
  nickname: string;
  tel: string;
}

interface Dept {
  dept_id: string;
  name: string;
}

interface Selected {
  departments: Dept[];
}

interface ProfileData {
  profile: ProfileInfo;
  selected: Selected;
}

interface ProfileState {
  data: ProfileData;
  isFetching: boolean;
  isUpdating: boolean;
  error: API_ERROR_RESPONSE | null;
}

const initialState: ProfileState = {
  data: {
    profile: {
      avatar: "",
      dept: {
        dept_id: "",
        name: "",
      },
      dob: "",
      email: "",
      f_name: "",
      gender: "",
      l_name: "",
      nickname: "",
      tel: "",
    },
    selected: {
      departments: [],
    },
  },
  isFetching: false,
  isUpdating: false,
  error: null,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const token = getFreshAccessToken();
      const response = await axios.get(`${VITE_IPCA_API}/common/user_info`, {
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

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (
    {
      avatar,
      confirm_new_password,
      current_password,
      dob,
      email,
      gender,
      new_password,
      nickname,
      tel,
      dept_id,
    }: {
      avatar: string | null;
      confirm_new_password: string | null;
      current_password: string | null;
      dob: string | null;
      email: string | null;
      gender: string | null;
      new_password: string | null;
      nickname: string | null;
      tel: string | null;
      dept_id: string | null;
    },
    { rejectWithValue },
  ) => {
    try {
      const token = getFreshAccessToken();
      const response = await axios.put(
        `${VITE_IPCA_API}/common/user_info`,
        {
          avatar: avatar,
          confirm_new_password: confirm_new_password,
          current_password: current_password,
          dob: dob,
          email: email,
          gender: gender,
          new_password: new_password,
          nickname: nickname,
          tel: tel,
          dept_id: dept_id,
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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProfile.pending, (state, _) => {
        state.isFetching = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isFetching = false;
        state.data.profile = action.payload.user_info;
        state.data.selected = action.payload.selected;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as API_ERROR_RESPONSE;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, _) => {
        state.isUpdating = false;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload as API_ERROR_RESPONSE;
      }),
});

export const { clearProfileError } = profileSlice.actions;

export const getProfileState = (state: RootState) => state.profile.data;
export const getProfileStatus = (state: RootState) => state.profile.isFetching;
export const getProfileUpdateStatus = (state: RootState) =>
  state.profile.isUpdating;
export const getProfileError = (state: RootState) => state.profile.error;

export default profileSlice.reducer;
