import { Card, Typography } from "@material-tailwind/react";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/solid";
import { ReactNode } from "react";

const TestCaseCard = (props: { children: ReactNode }) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between border-b-[1px] border-blue-gray pb-2">
        <div className="flex gap-x-1 items-center">
          <div className="w-5 h-5">
            <ClipboardDocumentCheckIcon />
          </div>
          <Typography variant="h6">Testcases</Typography>
        </div>
      </div>
      {props.children}
    </Card>
  );
};

export default TestCaseCard;
