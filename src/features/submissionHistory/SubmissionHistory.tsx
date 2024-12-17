import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { getSubmissionHistoryState } from "./redux/submissionHistorySlice";
import { TABLE_HEADER } from "./constants";
import { Button, Chip, Typography } from "@material-tailwind/react";
import { format } from "date-fns";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { SUBMISSION_STATUS } from "../../constants/constants";
// import TestCaseResult from "./components/TestCaseResult";
// import { TestCaseOutput } from "../../components";
import CodeDisplay from "../codeDisplay/CodeDisplay";
import { STEPPER } from "../sumbitCode/constants";

export interface SubmissionResult {
  actual: string;
  expected: string;
  is_passed: boolean;
  testcase_no: number;
  show_to_student: boolean;
}

interface SubmissionDetail {
  attempt: number;
  submissionId: string;
}

interface Props {
  chapterId?: string;
  stepper: string;
  submissionDetail: SubmissionDetail | null;
  onChangeSubmissionDetail: (submissionId: string, attempt: number) => void;
  onStepperChange: (step: string) => void;
}

function SubmissionHistory({
  stepper,
  onStepperChange,
  submissionDetail,
  onChangeSubmissionDetail,
}: Props) {
  const submissionHistoryState = useAppSelector(getSubmissionHistoryState);
  const { chapter, problem } = useParams();
  const submissionKey = `${chapter}.${problem}`;
  const submissionHistory =
    submissionHistoryState[submissionKey]?.submissionHistory || null;

  const submission =
    submissionHistory && submissionHistory.length > 0
      ? submissionHistory.find(
          (sub) => sub.submission_id === submissionDetail?.submissionId,
        )
      : null;

  const submissionResult: SubmissionResult[] =
    submission && submission.result ? JSON.parse(submission.result) : [];

  console.log(submissionHistory);
  console.log(submission?.result);
  console.log(submissionResult);

  const getStatusColor = () => {
    if (submission?.status === SUBMISSION_STATUS.accepted) {
      return "green";
    }
    return "red";
  };

  const convertStatus = (status: string) => {
    switch (status) {
      case SUBMISSION_STATUS.accepted:
        return "Accepted";
      case SUBMISSION_STATUS.wrongAnswer:
        return "Wrong Answer";
      case SUBMISSION_STATUS.error:
        return "Error";
      case SUBMISSION_STATUS.pending:
        return "Pending";
      case SUBMISSION_STATUS.rejected:
        return "Rejected";
      default:
        return "Not Valid";
    }
  };

  return (
    <>
      {stepper === STEPPER.submission && (
        <table className="w-full min-w-max table-auto text-center">
          <thead>
            <tr>
              {TABLE_HEADER.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {submissionHistory &&
              submissionHistory.length > 0 &&
              submissionHistory
                .slice()
                .reverse()
                .map(
                  (
                    { submission_id, status, time_submit, marking },
                    index,
                    arr,
                  ) => (
                    <tr
                      key={submission_id}
                      className="even:bg-blue-gray-50/50 hover:bg-blue-gray-50 cursor-pointer"
                      onClick={() => {
                        onChangeSubmissionDetail(
                          submission_id,
                          arr.length - index,
                        );
                        onStepperChange(STEPPER.result);
                      }}
                    >
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {arr.length - index}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color={
                            status === SUBMISSION_STATUS.accepted
                              ? "green"
                              : "red"
                          }
                          className="font-normal"
                        >
                          {convertStatus(status)}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {marking}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          {format(time_submit, "MMM dd, yyyy HH:mm:ss")}
                        </Typography>
                      </td>
                    </tr>
                  ),
                )}
          </tbody>
        </table>
      )}
      {stepper === STEPPER.result && submission && (
        <>
          <Button
            variant="text"
            className="flex items-center gap-2 p-2"
            onClick={() => onStepperChange(STEPPER.submission)}
          >
            <ArrowLeftIcon className="w-4 h-4" /> Back
          </Button>
          <div className="px-6">
            <Typography variant="h4" className="pt-4">
              Submission #{submissionDetail?.attempt}
            </Typography>
            <div className="flex justify-between items-center pt-6">
              <div className="flex items-center gap-2">
                <Chip
                  value={convertStatus(String(submission?.status))}
                  color={getStatusColor()}
                  className="rounded-full"
                />
                <Typography variant="small">
                  Submitted at{" "}
                  {format(
                    String(submission?.time_submit),
                    "MMM dd, yyyy HH:mm:ss",
                  )}
                </Typography>
              </div>
              <Chip
                value={`${submission?.marking}/2`}
                color={getStatusColor()}
              />
            </div>
            <div className="pt-4">
              <Typography variant="h6" className="mb-2">
                Sourcecode
              </Typography>
              <CodeDisplay fileName={String(submission?.sourcecode_filename)} />
            </div>
            <div className="pt-4">
              <Typography variant="h6" className="mb-2">
                Result
              </Typography>
              {/*

                {(submission?.status === SUBMISSION_STATUS.accepted ||
                  submission?.status === SUBMISSION_STATUS.wrongAnswer ||
                  submission?.status === SUBMISSION_STATUS.rejected) &&
                  submissionResult.map((result, index) => (
                    <TestCaseResult
                    key={result.testcase_no}
                    result={result}
                    index={index}
                    />
              ))}
              {submission?.status === SUBMISSION_STATUS.error && (
                <TestCaseOutput output={submission.error_message || ""} />
              )}
              {submission?.status === SUBMISSION_STATUS.pending && (
                <TestCaseOutput output={"Run time has rejected"} />
              )}
              */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SubmissionHistory;
