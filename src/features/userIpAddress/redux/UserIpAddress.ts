import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ERROR_RESPONSE } from "../../../constants/constants";
import axios from "axios";
import { resolveApiError } from "../../../utils/function";
import { RootState } from "../../../store/store";

const API_IPIFY = "https://api.ipify.org?format=json";

interface IPAddress {
  ip: string;
}

interface UserIPAdressState {
  ipAddress: IPAddress;
  isFetching: boolean;
  error: API_ERROR_RESPONSE | null;
}

const initialState: UserIPAdressState = {
  ipAddress: {
    ip: "",
  },
  isFetching: false,
  error: null,
};

export const fetchUserIPAddress = createAsyncThunk(
  "userIPAddress/fetchUserIPAddress",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_IPIFY);
      return response.data;
    } catch (error) {
      return rejectWithValue(resolveApiError(error));
    }
  },
);

const userIpAddressSlice = createSlice({
  name: "userIpAddress",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchUserIPAddress.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchUserIPAddress.fulfilled, (state, action) => {
        state.ipAddress = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchUserIPAddress.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload as API_ERROR_RESPONSE;
      }),
});
export const getUserIpAddress = (state: RootState) =>
  state.userIpAddress.ipAddress;
export const getUserIpAddressFetching = (state: RootState) =>
  state.userIpAddress.isFetching;
export const getUserIpAddressError = (state: RootState) =>
  state.userIpAddress.error;

export default userIpAddressSlice.reducer;
