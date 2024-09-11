import { LockClosedIcon } from "@heroicons/react/24/solid";
import { XCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";

interface Props {
  isHidden: boolean;
  isCorrect: boolean;
  userOutput: string;
  answerOutput: string;
  testcaseNo: number;
  testcaseAmount: number;
}

const TestCaseItem = ({
  isHidden,
  isCorrect,
  userOutput,
  answerOutput,
  testcaseNo,
  testcaseAmount,
}: Props) => {
  return (
    <div className="pt-4 border-b-[1px] border-blue-gray pb-5">
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-x-2">
          {isHidden && (
            <span>
              <div className="w-4 h-4">
                <LockClosedIcon />
              </div>
            </span>
          )}
          <Typography>
            Testcase: #{testcaseNo}/{testcaseAmount}
          </Typography>
        </div>
        <div className="w-7 h-7">
          {isCorrect ? (
            <CheckCircleIcon className="text-green-400" />
          ) : (
            <XCircleIcon className="text-red-400" />
          )}
        </div>
      </div>
      {!isHidden ? (
        <div className="flex md:flex-row flex-col md:gap-y-0 gap-y-2 w-full gap-x-2">
          <div className="w-full bg-black h-20 text-white p-1">
            <Typography>{userOutput}</Typography>
          </div>
          <div className="w-full bg-black h-20 text-white p-1">
            <Typography>{answerOutput}</Typography>
          </div>
        </div>
      ) : (
        <div className="w-full bg-black h-20 text-white p-1">
          <Typography>Hidden testcase</Typography>
        </div>
      )}
    </div>
  );
};

export default TestCaseItem;
