import { XMarkIcon } from "@heroicons/react/24/solid";
import { Drawer, Typography, IconButton, List } from "@material-tailwind/react";
import ProblemAccordion from "./ProblemAccordion";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExerciseListDrawer({ isOpen, onClose }: Props) {
  const navigate = useNavigate();
  const mockProblemList = [
    {
      title: "Intro",
      index: 1,
      problems: [
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
      ],
    },
    {
      title: "Intro",
      index: 1,
      problems: [
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
      ],
    },
    {
      title: "Intro",
      index: 1,
      problems: [
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
      ],
    },
    {
      title: "Intro",
      index: 1,
      problems: [
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
      ],
    },
    {
      title: "Intro",
      index: 1,
      problems: [
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
      ],
    },
    {
      title: "Intro",
      index: 1,
      problems: [
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
        { index: 1, name: "helloworld" },
      ],
    },
  ];
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      overlayProps={{
        className:
          "fixed inset-0 bg-black bg-opacity-20 h-screen overflow-auto",
      }}
      size={500}
    >
      <div className="flex justify-between items-center border-b-[1px] p-4 h-16">
        <div className="flex gap-x-2 items-center">
          <Typography variant="h5">Problem List</Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => navigate("/exercise")}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </IconButton>
        </div>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <XMarkIcon className="w-6 h-6" />
        </IconButton>
      </div>
      <List className="overflow-y-auto max-h-[calc(100vh-4rem)]">
        {mockProblemList.map((item, index) => (
          <ProblemAccordion {...item} key={index} />
        ))}
      </List>
    </Drawer>
  );
}
