export interface API_ERROR_RESPONSE {
  code: string | null;
  error: string | null;
}

export const TESTCASE_STATUS = {
  noInput: "NO_INPUT",
  yes: "YES",
  undefined: "UNDEFINED",
};

export const ALLOW_PROBLEM_TYPE = {
  always: "ALWAYS",
  deny: "DENY",
  timmer: "TIMER",
  timerPaused: "TIMER_PASUED",
  dateTime: "DATETIME",
};

export const SUBMISSION_STATUS = {
  wrongAnswer: "WRONG_ANSWER",
  accepted: "ACCEPTED",
  error: "ERROR",
  pending: "PENDING",
  rejected: "REJECTED",
};

export const LANGUAGE = {
  th: "th",
  en: "en",
};

export const C_LANG = "C";
export const PYTHON_LANG = "PYTHON";
