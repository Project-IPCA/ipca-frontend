import CodeEditorCard from "./components/CodeEditorCard";
import ProblemCard from "./components/ProblemCard";
import { useCallback, useEffect, useRef, useState } from "react";
import TestCaseCard from "./components/TestCaseCard";
import TestCaseItem from "./components/TestCaseItem";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { getExercise } from "./redux/submitCodeSlice";

const SubmitCode = () => {
  const [value, setValue] = useState<string>("");
  const onChange = useCallback((val: string) => {
    setValue(val);
  }, []);

  const onSubmitCode = () => {
    console.log(value);
  };

  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useAppSelector((state) => state.exercise);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      dispatch(getExercise());
    }
    return () => {};
  }, [dispatch, data]);

  const mockTestCase = [
    {
      isHidden: false,
      isCorrect: true,
      userOutput: "1",
      answerOutput: "1",
      testcaseNo: 1,
      testcaseAmount: 4,
    },
    {
      isHidden: false,
      isCorrect: false,
      userOutput: "2",
      answerOutput: "3",
      testcaseNo: 2,
      testcaseAmount: 4,
    },
    {
      isHidden: true,
      isCorrect: true,
      userOutput: "3",
      answerOutput: "5",
      testcaseNo: 3,
      testcaseAmount: 4,
    },
    {
      isHidden: true,
      isCorrect: false,
      userOutput: "4",
      answerOutput: "12",
      testcaseNo: 4,
      testcaseAmount: 4,
    },
  ];

  return (
    <>
      <div className="w-full  md:flex md:flex-row flex-col md:gap-x-5 md:space-y-0 space-y-3  md:h-[750px] ">
        <ProblemCard />
        <CodeEditorCard
          value={value}
          onChange={onChange}
          onSubmitCode={onSubmitCode}
        />
      </div>
      <div className="w-full pt-4">
        <TestCaseCard>
          {mockTestCase.map((item, index) => (
            <TestCaseItem key={index} {...item} />
          ))}
        </TestCaseCard>
      </div>
    </>
  );
};

export default SubmitCode;
