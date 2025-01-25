import { isAxiosError } from "axios";
import { ALLOW_PROBLEM_TYPE, API_ERROR_RESPONSE } from "../constants/constants";
import { Chapter } from "../layout/redux/submitCodeLayoutSlice";

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

export const isTimeInRange = (timeStart: string, timeEnd: string): boolean => {
  const now = new Date();
  const startTime = new Date(timeStart);
  const endTime = new Date(timeEnd);

  return now >= startTime && now <= endTime;
};

export const checkCanSubmit = (chapterData: Chapter) => {
  if (!chapterData) return false;

  if (
    chapterData.allow_submit_type === ALLOW_PROBLEM_TYPE.always ||
    chapterData.allow_submit_type === ALLOW_PROBLEM_TYPE.timerPaused
  ) {
    return true;
  } else if (chapterData.allow_submit_type === ALLOW_PROBLEM_TYPE.deny) {
    return false;
  } else if (
    chapterData.allow_submit_type === ALLOW_PROBLEM_TYPE.timmer ||
    chapterData.allow_submit_type === ALLOW_PROBLEM_TYPE.dateTime
  ) {
    return isTimeInRange(
      chapterData.submit_time_start,
      chapterData.submit_time_end,
    );
  }
  return false;
};

export const checkCanAccess = (chapterData: Chapter) => {
  if (!chapterData) return false;

  if (
    chapterData.allow_access_type === ALLOW_PROBLEM_TYPE.always ||
    chapterData.allow_access_type === ALLOW_PROBLEM_TYPE.timerPaused
  ) {
    return true;
  } else if (chapterData.allow_access_type === ALLOW_PROBLEM_TYPE.deny) {
    return false;
  } else if (
    chapterData.allow_access_type === ALLOW_PROBLEM_TYPE.timmer ||
    chapterData.allow_access_type === ALLOW_PROBLEM_TYPE.dateTime
  ) {
    return isTimeInRange(
      chapterData.access_time_start,
      chapterData.access_time_end,
    );
  }
  return false;
};
