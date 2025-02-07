import { Button, Card, Chip, Typography } from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { Testcase } from "../redux/submitCodeSlice";
import { STEPPER } from "../constants";
import { SubmissionHistory } from "../../submissionHistory";
import { TestCaseOutput } from "../../../components";
import { SubmissionDetail } from "../SubmitCode";
import { useParams } from "react-router-dom";
import TextEditor from "./TextEditor";
import { useTranslation } from "react-i18next";

interface Props {
  name?: string;
  content?: string;
  marking?: number;
  fullMark?: number;
  testcaseList?: Testcase[];
  stepper: string;
  chapterId?: string;
  submissionDetail: SubmissionDetail | null;
  onChangeSubmissionDetail: (submissionId: string, attempt: number) => void;
  onStepperChange: (step: string) => void;
  isFetching: boolean;
}

const ProblemCard = ({
  name,
  content,
  marking,
  fullMark,
  testcaseList,
  stepper,
  chapterId,
  onStepperChange,
  submissionDetail,
  onChangeSubmissionDetail,
  isFetching,
}: Props) => {
  const { chapter, problem } = useParams();
  const { t } = useTranslation();
  return (
    <Card className="w-full   lg:h-full h-[500px] md:overflow-hidden overflow-auto p-6  border-[1px] shadow-none">
      <div className="flex justify-between border-b-[1px] border-blue-gray pb-4 lg:h-10 ">
        <div className="flex gap-x-2 justify-between w-full items-center">
          <div className="flex gap-x-2  gap-y-2">
            {isFetching ? (
              <Typography
                as="div"
                className="block  h-8 w-28 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            ) : (
              <Button
                size="sm"
                variant={stepper === STEPPER.problem ? "filled" : "outlined"}
                className="rounded-full flex items-center justify-center gap-x-1 "
                onClick={() => onStepperChange(STEPPER.problem)}
              >
                <div className="w-4 h-4">
                  <ClipboardDocumentListIcon />
                </div>
                <span className="md:block hidden">
                  {t("feature.submit_code.problem.title")}
                </span>
              </Button>
            )}
            {isFetching ? (
              <Typography
                as="div"
                className="block  h-8 w-28 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            ) : (
              <Button
                size="sm"
                variant={
                  stepper === STEPPER.submission || stepper === STEPPER.result
                    ? "filled"
                    : "outlined"
                }
                className="rounded-full flex items-center justify-center gap-x-1"
                onClick={() => onStepperChange(STEPPER.submission)}
              >
                <div className="w-4 h-4">
                  <QuestionMarkCircleIcon />
                </div>
                <span className="md:block hidden">
                  {t("feature.submit_code.submission.title")}
                </span>
              </Button>
            )}
          </div>
          <div>
            {isFetching ? (
              <Typography
                as="div"
                className="block  h-8 w-12 rounded-lg bg-gray-300"
              >
                &nbsp;
              </Typography>
            ) : (
              <Chip
                value={`${marking || 0}/${fullMark || 2}`}
                color={marking && marking === fullMark ? "green" : "blue-gray"}
                size="lg"
              />
            )}
          </div>
        </div>
      </div>
      <div className="h-full overflow-auto">
        {stepper === STEPPER.problem && (
          <>
            <div className="break-words  border-b-[1px] mb-5 pb-5">
              {isFetching ? (
                <Typography
                  as="div"
                  variant="small"
                  className="block mt-4 h-3 w-24 rounded-lg bg-gray-300"
                >
                  &nbsp;
                </Typography>
              ) : (
                <Typography variant="small" className="pt-4 font-medium">
                  {`${t("feature.submit_code.problem.chapter")} ${
                    chapter || ""
                  } ${t("feature.submit_code.problem.problem")} ${problem || ""}`}
                </Typography>
              )}
              {isFetching ? (
                <Typography
                  as="div"
                  variant="small"
                  className="block mt-4 mb-6 h-5 w-1/3 rounded-lg bg-gray-300"
                >
                  &nbsp;
                </Typography>
              ) : (
                <Typography variant="h4" className="pt-1 pb-2">
                  {name || ""}
                </Typography>
              )}
              {isFetching ? (
                <>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <Typography
                      as="div"
                      variant="paragraph"
                      className="mb-3 h-2 w-full rounded-full bg-gray-300"
                      key={index}
                    >
                      &nbsp;
                    </Typography>
                  ))}
                  <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-3 h-2 w-11/12 rounded-full bg-gray-300"
                  >
                    &nbsp;
                  </Typography>
                </>
              ) : (
                <TextEditor value={content ?? ""} />
              )}
            </div>
            {isFetching ? (
              <div className="flex flex-col gap-y-3">
                {Array.from({ length: 2 }).map((_, index) => (
                  <Card
                    key={index}
                    className="px-5 py-3 bg-white border-[1px] shadow-none"
                  >
                    <Typography
                      as="div"
                      variant="paragraph"
                      className="h-2 w-16 rounded-full bg-gray-300"
                    >
                      &nbsp;
                    </Typography>
                    <Typography
                      as="div"
                      className="h-7 w-full rounded-lg bg-gray-300 mt-3"
                    >
                      &nbsp;
                    </Typography>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-y-3">
                {testcaseList?.map((testcase, index) => (
                  <Card
                    className="px-5 py-3 bg-white border-[1px] shadow-none"
                    key={testcase.testcase_id}
                  >
                    <Typography variant="h6" className="pb-2">
                      {t("feature.submit_code.problem.testcase")}: {index + 1}
                    </Typography>
                    <TestCaseOutput
                      output={
                        testcase.show_to_student
                          ? testcase.testcase_output
                          : "Testcase Hidden"
                      }
                    />
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
        {(stepper === STEPPER.submission || stepper === STEPPER.result) && (
          <div className="pt-4">
            <SubmissionHistory
              chapterId={chapterId}
              stepper={stepper}
              onStepperChange={onStepperChange}
              submissionDetail={submissionDetail}
              onChangeSubmissionDetail={onChangeSubmissionDetail}
            />
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProblemCard;
