import { Card, Typography, Button } from "@material-tailwind/react";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  sourcecode: string;
  onChange: (val: string) => void;
  onSubmitCode: () => void;
  isSubmissionHistoryFetching: boolean;
  isExerciseExist: boolean;
  canSubmit: boolean;
  lastSubmitSourcecode?: string | null;
}

const CodeEditorCard = ({
  sourcecode,
  onChange,
  onSubmitCode,
  isSubmissionHistoryFetching,
  isExerciseExist,
  canSubmit,
  lastSubmitSourcecode,
}: Props) => {
  const codeMirrorRef = useRef<HTMLDivElement | null>(null);
  const [codeMirrorHeight, setCodeMirrorHeight] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    if (codeMirrorRef.current) {
      const height = codeMirrorRef.current.getBoundingClientRect().height;
      setCodeMirrorHeight(height);
    }
  }, [codeMirrorRef]);

  const isEditCode = canSubmit && isExerciseExist;

  const getSourcecodeDisplay = () => {
    if (isEditCode) {
      return sourcecode;
    } else {
      if (lastSubmitSourcecode) {
        return lastSubmitSourcecode;
      }
    }
    return "";
  };

  return (
    <Card className="w-full p-6 lg:h-full h-[500px]  border-[1px] shadow-none">
      <div className="flex justify-between border-b-[1px] border-blue-gray pb-3">
        <div className="flex gap-x-1 items-center">
          <div className="w-5 h-5">
            <CodeBracketIcon />
          </div>
          <Typography variant="h6">
            {t("feature.submit_code.editor.title")}
          </Typography>
        </div>
        {isEditCode ? (
          <Button
            size="sm"
            onClick={onSubmitCode}
            loading={isSubmissionHistoryFetching}
          >
            {t("feature.submit_code.editor.submit")}
          </Button>
        ) : null}
      </div>
      <div className="h-full overflow-auto" ref={codeMirrorRef}>
        <CodeMirror
          height={`${codeMirrorHeight}px`}
          value={getSourcecodeDisplay()}
          extensions={[python()]}
          onChange={onChange}
          placeholder={t("feature.submit_code.editor.placeholder")}
          readOnly={!isEditCode}
          editable={isEditCode}
          autoFocus={isEditCode}
        />
      </div>
    </Card>
  );
};

export default CodeEditorCard;
