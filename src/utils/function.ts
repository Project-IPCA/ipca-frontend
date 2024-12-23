import { isAxiosError } from "axios";
import { API_ERROR_RESPONSE } from "../constants/constants";

export const resolveApiError = (error: unknown): API_ERROR_RESPONSE => {
  if (!isAxiosError(error) || !error.response) {
    const data = {
      code: "xxx",
      error: "error",
    };
    return data as API_ERROR_RESPONSE;
  }
  return error.response?.data;
};
