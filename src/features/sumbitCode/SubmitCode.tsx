import CodeEditorCard from "./components/CodeEditorCard";
import ProblemCard from "./components/ProblemCard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
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

export interface SubmissionDetail {
  attempt: number;
  submissionId: string;
}

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

  const exerciseKey = `${chapter}.${problem}`;
  const exercise = exerciseState[exerciseKey]?.exercise || null;
  const exerciseError = exerciseState[exerciseKey]?.error || null;

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
    const uuid = uuidv4();
    dispatch(
      submitExercise({
        chapter_id: exercise?.chapter_id ? exercise?.chapter_id : null,
        item_id: problem ? parseInt(problem) : null,
        sourcecode: sourcecode,
        job_id: uuid,
      }),
    );
    setJobId(uuid);
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
      for (const chapter of allChapterList) {
        if (chapter.is_open && chapter.last_exercise_success !== 5) {
          navigate(
            `/exercise/${chapter.index}/${chapter.last_exercise_success}`,
          );
          break;
        }
      }
    }
  }, [exerciseError, allChapterList]);

  useEffect(() => {
    if (jobId) {
      const evtSource = new EventSource(
        `${VITE_IPCA_RT}/submission-result/${jobId}`,
      );
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
              canSubmit={exerciseResult?.marking !== exerciseResult?.full_mark}
            />
          </Panel>
        </PanelGroup>
      </div>
      <div className="lg:hidden  w-full  flex flex-col gap-y-4">
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
          canSubmit={exerciseResult?.marking !== exerciseResult?.full_mark}
        />
      </div>
    </>
  );
};

export default SubmitCode;
