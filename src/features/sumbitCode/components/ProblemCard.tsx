import { Button, Card } from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";

const ProblemCard = () => {
  return (
    <Card className="w-full p-6 md:h-full h-[500px]">
      <div className="flex justify-between border-b-[1px] border-blue-gray pb-2 h-10">
        <div className="flex gap-x-2">
          <Button
            size="sm"
            variant="outlined"
            className="rounded-full flex items-center justify-center gap-x-1"
          >
            <div className="w-4 h-4">
              <ClipboardDocumentListIcon />
            </div>
            Problem
          </Button>
          <Button
            size="sm"
            variant="outlined"
            className="rounded-full flex items-center justify-center gap-x-1"
          >
            <div className="w-4 h-4">
              <QuestionMarkCircleIcon />
            </div>
            Submission History
          </Button>
        </div>
      </div>
      <p className="pt-2 h-full overflow-auto break-words">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea officiis
        maiores quasi consequuntur dicta quos, officia excepturi exercitationem?
        Molestiae dolorem nihil dolore magnam, ea deleniti eveniet quibusdam eos
        soluta! Quidem?
      </p>
    </Card>
  );
};

export default ProblemCard;
