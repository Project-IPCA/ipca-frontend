import CodeEditorCard from "./components/CodeEditorCard";
import ProblemCard from "./components/ProblemCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  CheckKeywordReponse,
  CheckUserConstraintData,
  getExercise,
  getExerciseState,
  submitExercise,
  VITE_IPCA_RT,
} from "./redux/submitCodeSlice";
import { useNavigate, useParams } from "react-router-dom";
import { SUBMISSION_STATUS } from "../../constants/constants";
import { v4 as uuidv4 } from "uuid";
import {
  getSubmissionHistory,
  getSubmissionHistoryState,
} from "../submissionHistory/redux/submissionHistorySlice";
import {
  getChapterList,
  getChapterListState,
} from "../../layout/redux/submitCodeLayoutSlice";
import { Bounce, toast } from "react-toastify";
import {
  getExerciseList,
  getExerciseListState,
} from "../exerciseList/redux/exerciseListSlice";
import { STEPPER } from "./constants";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  getCodeDisplayState,
  getCodeFromMinio,
} from "../codeDisplay/redux/codeDisplaySlice";
import axiosInstance from "../../utils/axios";
import axios from "axios";
import { checkCanSubmit } from "../../utils/function";

export interface SubmissionDetail {
  attempt: number;
  submissionId: string;
}

const ConstraintsTypeMap = {
  eq: "Equal",
  me: "More than equal",
  le: "Less than equal",
  na: "Not appear",
} as const;

const SubmitCode = () => {
  const dispatch = useAppDispatch();
  const exerciseState = useAppSelector(getExerciseState);
  const chapterList = useAppSelector(getChapterListState);
  const allChapterList = useAppSelector(getExerciseListState);
  const submissionHistoryState = useAppSelector(getSubmissionHistoryState);
  const codeDisplay = useAppSelector(getCodeDisplayState);
  const submissionInitialize = useRef(false);
  const { chapter, problem } = useParams();
  const [sourcecode, setSourcecode] = useState<string>("");
  const [jobId, setJobId] = useState<string>();
  const [submissionResult, setSubmissionResult] = useState<boolean>(false);
  const [problemStepper, setProblemStepper] = useState<string>(STEPPER.problem);
  const [submissionDetail, setSubmissionDetail] =
    useState<SubmissionDetail | null>(null);
  const navigate = useNavigate();
  const [isCanSubmit, setIsCanSubmit] = useState<boolean>(false);

  const exerciseKey = `${chapter}.${problem}`;
  const exercise = exerciseState[exerciseKey]?.exercise || null;
  const exerciseError = exerciseState[exerciseKey]?.error || null;
  const isFetching = exerciseState[exerciseKey]?.isFetching;

  const submissionKey = `${chapter}.${problem}`;
  const submissionHistory =
    submissionHistoryState[submissionKey]?.submissionHistory || null;

  const isSubmissionHistoryFetching =
    submissionHistoryState[submissionKey]?.isFetching;

  const lastSubmitCode =
    submissionHistory && submissionHistory.length > 0
      ? codeDisplay[
          submissionHistory[submissionHistory.length - 1]?.sourcecode_filename
        ]?.code
      : null;

  const onProblemStepperChange = (step: string) => {
    setProblemStepper(step);
  };

  const onChangeSubmissionDetail = (submissionId: string, attempt: number) => {
    setSubmissionDetail({
      submissionId: submissionId,
      attempt: attempt,
    });
  };

  const onChange = useCallback((val: string) => {
    setSourcecode(val);
  }, []);

  const sortedChapterList = useMemo(
    () =>
      [...chapterList].sort(
        (a, b) => a.items[0]?.chapter_idx - b.items[0]?.chapter_idx,
      ),
    [chapterList],
  );

  const exerciseResult = useMemo(() => {
    if (!chapter || !problem) return;
    const chapterIndex = parseInt(String(chapter)) - 1;
    const problemIndex = parseInt(String(problem)) - 1;

    if (
      chapterIndex >= 0 &&
      chapterIndex < sortedChapterList.length &&
      problemIndex >= 0 &&
      problemIndex < sortedChapterList[chapterIndex].items.length
    ) {
      return sortedChapterList[chapterIndex].items[problemIndex];
    }
    return null;
  }, [chapter, problem, sortedChapterList]);

  const onSubmitCode = async () => {
    try {
      const response = await axiosInstance.post("/common/keyword_check", {
        exercise_kw_list: exercise?.user_defined_constraints,
        sourcecode: sourcecode,
      });
      const responseData: CheckKeywordReponse = response.data;
      if (responseData.status == "failed") {
        const errConstraints = Object.entries(responseData.keyword_constraint)
          .filter(
            ([, val]) =>
              val.length > 0 &&
              val.some((item: CheckUserConstraintData) => !item.is_passed),
          )
          .reduce(
            (acc, [key, val]) => ({
              ...acc,
              [key]: val.filter(
                (item: CheckUserConstraintData) => !item.is_passed,
              ),
            }),
            {} as Record<string, CheckUserConstraintData[]>,
          );
        Object.entries(errConstraints).map(([key, val]) => {
          val.map((data: CheckUserConstraintData) => {
            toast.error(
              `${key} ${data.keyword} have to ${
                ConstraintsTypeMap[data.type]
              } ${data.type == "na" ? "" : data.limit}`,
              {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
              },
            );
          });
        });
        return;
      }
      const uuid = uuidv4();
      dispatch(
        submitExercise({
          chapter_id: exercise?.chapter_id ? exercise?.chapter_id : null,
          chapter_idx: exercise?.chapter_index ? exercise?.chapter_index : null,
          item_id: problem ? parseInt(problem) : null,
          sourcecode: sourcecode,
          job_id: uuid,
        }),
      );
      setJobId(uuid);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    }
  };

  useEffect(() => {
    if (allChapterList.length <= 0) {
      dispatch(getExerciseList());
    }
  }, [dispatch, allChapterList]);

  useEffect(() => {
    if (exerciseError && allChapterList && allChapterList.length > 0) {
      toast.error(exerciseError.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate(`/exercises`);
    }
  }, [exerciseError, allChapterList]);

  useEffect(() => {
    if (jobId) {
      const evtSource = new EventSource(
        `${VITE_IPCA_RT}/submission-result/${jobId}`,
      );

      const entTimeOut = setTimeout(() => {
        if (evtSource) {
          evtSource.close();
          window.location.reload();
        }
      }, 3000);

      evtSource.onmessage = (event) => {
        if (event.data) {
          setSubmissionResult(true);
          dispatch(
            getSubmissionHistory({
              chapter_idx: chapter ? chapter : "",
              item_id: problem ? problem : "",
            }),
          );
          dispatch(getChapterList());
          dispatch(getExerciseList());
          evtSource.close();
          clearTimeout(entTimeOut);
        }
      };
    }
  }, [jobId]);

  useEffect(() => {
    if (submissionResult && submissionHistory && submissionHistory.length > 0) {
      const lastResult = submissionHistory[submissionHistory.length - 1];
      if (lastResult.status === SUBMISSION_STATUS.accepted) {
        toast.success("Great!, Correct answer.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else if (lastResult.status === SUBMISSION_STATUS.wrongAnswer) {
        toast.error("Try again!, Wrong answer", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else if (lastResult.status === SUBMISSION_STATUS.error) {
        toast.error("Oops!, Double check your syntax", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

      setSubmissionResult(false);
      setSubmissionDetail({
        attempt: submissionHistory.length,
        submissionId:
          submissionHistory[submissionHistory.length - 1].submission_id,
      });
    }
  }, [submissionResult, submissionHistory]);

  useEffect(() => {
    if (submissionDetail) {
      setProblemStepper(STEPPER.result);
    }
  }, [submissionDetail]);

  useEffect(() => {
    dispatch(
      getExercise({
        chapter_idx: chapter ? chapter : "",
        item_id: problem ? problem : "",
      }),
    );
    setProblemStepper(STEPPER.problem);
  }, [dispatch, chapter, problem]);

  useEffect(() => {
    if (exercise?.chapter_id && !submissionInitialize.current) {
      dispatch(
        getSubmissionHistory({
          chapter_idx: chapter ? chapter : "",
          item_id: problem ? problem : "",
        }),
      );
    }
  }, [dispatch, chapter, problem, exercise]);

  useEffect(() => {
    if (
      submissionHistory &&
      submissionHistory.length > 0 &&
      !codeDisplay[
        submissionHistory[submissionHistory.length - 1]?.sourcecode_filename
      ]
    )
      dispatch(
        getCodeFromMinio(
          submissionHistory[submissionHistory.length - 1].sourcecode_filename,
        ),
      );
  }, [dispatch, submissionHistory, codeDisplay]);

  useEffect(() => {
    if (chapter && chapterList && chapterList.length > 0) {
      setIsCanSubmit(
        checkCanSubmit(chapterList[parseInt(chapter) - 1]) &&
          exerciseResult?.marking !== exerciseResult?.full_mark,
      );
    }
  }, [
    chapter,
    chapterList,
    problem,
    setIsCanSubmit,
    checkCanSubmit,
    exerciseResult,
  ]);

  return (
    <>
      <div className="w-full h-full lg:block hidden">
        <PanelGroup direction="horizontal">
          <Panel minSize={40}>
            <ProblemCard
              name={exercise?.name}
              content={exercise?.content}
              marking={exerciseResult?.marking}
              fullMark={exerciseResult?.full_mark}
              testcaseList={exercise?.testcase_list}
              chapterId={exercise?.chapter_id}
              stepper={problemStepper}
              onStepperChange={onProblemStepperChange}
              submissionDetail={submissionDetail}
              onChangeSubmissionDetail={onChangeSubmissionDetail}
              isFetching={isFetching}
            />
          </Panel>

          <PanelResizeHandle className="flex w-3 items-center justify-center bg-white p-0 group">
            <div className="h-5 border-l-2 border-gray-300 rounded-full group-hover:h-full group-hover:border-l-4 group-hover:border-blue-400 group-hover:border-0 group-hover:cursor-ew-resize"></div>
          </PanelResizeHandle>
          <Panel minSize={25}>
            <CodeEditorCard
              sourcecode={sourcecode}
              lastSubmitSourcecode={lastSubmitCode}
              onChange={onChange}
              onSubmitCode={onSubmitCode}
              isSubmissionHistoryFetching={
                isSubmissionHistoryFetching && submissionResult
              }
              isExerciseExist={!!exercise}
              canSubmit={isCanSubmit}
              isFetching={isFetching}
            />
          </Panel>
        </PanelGroup>
      </div>
      <div className="lg:hidden w-full  flex flex-col gap-y-4 mb-4">
        <ProblemCard
          name={exercise?.name}
          content={exercise?.content}
          marking={exerciseResult?.marking}
          fullMark={exerciseResult?.full_mark}
          testcaseList={exercise?.testcase_list}
          chapterId={exercise?.chapter_id}
          stepper={problemStepper}
          onStepperChange={onProblemStepperChange}
          submissionDetail={submissionDetail}
          onChangeSubmissionDetail={onChangeSubmissionDetail}
          isFetching={isFetching}
        />
        <CodeEditorCard
          sourcecode={sourcecode}
          lastSubmitSourcecode={lastSubmitCode}
          onChange={onChange}
          onSubmitCode={onSubmitCode}
          isSubmissionHistoryFetching={
            isSubmissionHistoryFetching && submissionResult
          }
          isExerciseExist={!!exercise}
          canSubmit={isCanSubmit}
          isFetching={isFetching}
        />
      </div>
    </>
  );
};

export default SubmitCode;
