import { Card, Typography, Button } from "@material-tailwind/react";
import { CodeBracketIcon } from "@heroicons/react/24/solid";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onSubmitCode: () => void;
}

const CodeEditorCard = ({ value, onChange, onSubmitCode }: Props) => {
  return (
    <Card className="w-full p-6 md:h-full h-[500px]">
      <div className="flex justify-between border-b-[1px] border-blue-gray pb-2">
        <div className="flex gap-x-1 items-center">
          <div className="w-5 h-5">
            <CodeBracketIcon />
          </div>
          <Typography variant="h6">Code editor</Typography>
        </div>
        <Button size="sm" onClick={onSubmitCode}>
          Submit
        </Button>
      </div>
      <div className="h-full overflow-auto">
        <CodeMirror
          height="625px"
          value={value}
          extensions={[python()]}
          onChange={onChange}
          placeholder="Put your code here..."
        />
      </div>
    </Card>
  );
};

export default CodeEditorCard;
