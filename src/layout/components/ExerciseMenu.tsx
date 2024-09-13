import { IconButton, MenuItem, Typography } from "@material-tailwind/react";
import {
  Squares2X2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { createElement } from "react";

interface Props {
  toggleDrawer: () => void;
}

const ExerciseMenu = ({ toggleDrawer }: Props) => {
  return (
    <ul className="mt-2 mb-4 flex  gap-2 lg:mb-0 lg:mt-0 flex-row items-center lg:justify-start justify-between">
      <Typography
        as="a"
        variant="small"
        color="gray"
        className="font-medium text-blue-gray-500"
        onClick={toggleDrawer}
      >
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          {createElement(Squares2X2Icon, {
            className: "h-[18px] w-[18px]",
          })}{" "}
          <span className="text-gray-900">Problem List</span>
        </MenuItem>
      </Typography>
      <div>
        <IconButton size="sm" color="blue-gray" variant="text">
          <ChevronLeftIcon className="h-6 w-6" />
        </IconButton>
        <IconButton size="sm" color="blue-gray" variant="text">
          <ChevronRightIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </ul>
  );
};

export default ExerciseMenu;
