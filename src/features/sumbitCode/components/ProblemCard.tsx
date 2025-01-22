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
}: Props) => {
  const { chapter, problem } = useParams();
  const { t } = useTranslation();
  return (
    <Card className="w-full   lg:h-full h-[500px] md:overflow-hidden overflow-auto p-6  border-[1px] shadow-none">
      <div className="flex justify-between border-b-[1px] border-blue-gray pb-4 lg:h-10 ">
        <div className="flex gap-x-2 justify-between w-full items-center">
          <div className="flex gap-x-2  gap-y-2">
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
          </div>
          <div>
            <Chip
              value={`${marking}/${fullMark}`}
              color={marking === fullMark ? "green" : "blue-gray"}
              size="lg"
            />
          </div>
        </div>
      </div>
      <div className="h-full overflow-auto">
        {stepper === STEPPER.problem && (
          <>
            <div className="break-words  border-b-[1px] mb-5 pb-5">
              <Typography variant="small" className="pt-4 font-medium">
                {`${t("feature.submit_code.problem.chapter")} ${chapter || ""} ${t("feature.submit_code.problem.problem")} ${problem || ""}`}
              </Typography>
              <Typography variant="h4" className="pt-1 pb-2">
                {name || ""}
              </Typography>
              <TextEditor value={content ?? ""} />
            </div>
            <div className="flex flex-col gap-y-3">
              {testcaseList
                ?.filter((testcase) => testcase.show_to_student)
                .map((testcase, index) => (
                  <Card
                    className="px-5 py-3 bg-white border-[1px] shadow-none"
                    key={testcase.testcase_id}
                  >
                    <Typography variant="h6" className="pb-2">
                      Testcase: {index + 1}
                    </Typography>
                    <TestCaseOutput output={testcase.testcase_output} />
                  </Card>
                ))}
            </div>
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
