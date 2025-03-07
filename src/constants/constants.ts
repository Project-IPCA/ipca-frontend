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

export const CARD_MODE = "CARD_MODE";
export const LIST_MODE = "LIST_MODE";

export const DAYS_2_LANGUAGE = [
  {
    en: "Monday",
    th: "วันจันทร์",
  },
  {
    en: "Tuesday",
    th: "วันอังคาร",
  },
  {
    en: "Wednesday",
    th: "วันพุธ",
  },
  {
    en: "Thursday",
    th: "วันพฤหัสบดี",
  },
  {
    en: "Friday",
    th: "วันศุกร์",
  },
  {
    en: "Saturday",
    th: "วันเสาร์",
  },
  {
    en: "Sunday",
    th: "วันอาทิตย์",
  },
];

export const DAY_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];
