import { IconButton, MenuItem, Typography } from "@material-tailwind/react";
import {
  Squares2X2Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { createElement, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { parseInt } from "lodash";
import { useAppSelector } from "../../hooks/store";
import { getChapterListState } from "../redux/submitCodeLayoutSlice";
import { ALLOW_PROBLEM_TYPE } from "../../constants/constants";

interface Props {
  toggleDrawer: () => void;
  handleCloseNav: () => void;
}

const ExerciseMenu = ({ toggleDrawer, handleCloseNav }: Props) => {
  const navigate = useNavigate();
  const { chapter, problem } = useParams();
  const chapterList = useAppSelector(getChapterListState);

  const sortedChapterList = useMemo(
    () =>
      [...chapterList].sort(
        (a, b) => a.items[0]?.chapter_idx - b.items[0]?.chapter_idx,
      ),
    [chapterList],
  );

  const flatChapterList = useMemo(
    () =>
      chapterList
        .flatMap((chapter) => chapter.items)
        .sort((a, b) => {
          if (a.chapter_idx === b.chapter_idx) {
            return a.item_idx - b.item_idx;
          }
          return a.chapter_idx - b.chapter_idx;
        }),
    [chapterList],
  );

  const handleBack = () => {
    if (problem && chapter) {
      const index = Math.max(
        0,
        5 * (parseInt(chapter) - 1) + parseInt(problem) - 2,
      );
      const newItem = flatChapterList[index];
      const nextProblem = sortedChapterList[Math.floor(index / 5)];
      if (nextProblem.allow_access_type === ALLOW_PROBLEM_TYPE.always) {
        navigate(`/exercise/${newItem.chapter_idx}/${newItem.item_idx}`);
      }
    }
    handleCloseNav();
  };

  const handleNext = () => {
    if (problem && chapter) {
      const index = Math.min(
        flatChapterList.length - 1,
        5 * (parseInt(chapter) - 1) + parseInt(problem),
      );
      const newItem = flatChapterList[index];
      const nextProblem = sortedChapterList[Math.floor(index / 5)];
      if (nextProblem.allow_access_type === ALLOW_PROBLEM_TYPE.always) {
        navigate(`/exercise/${newItem.chapter_idx}/${newItem.item_idx}`);
      }
    }
    handleCloseNav();
  };
  return (
    <ul className="mt-2 mb-4 flex  gap-2 lg:mb-0 lg:mt-0 flex-row items-center lg:justify-start justify-between">
      <Typography
        as="a"
        variant="small"
        color="gray"
        className="font-medium text-blue-gray-500"
        onClick={() => {
          toggleDrawer();
          handleCloseNav();
        }}
      >
        <MenuItem className="flex items-center gap-2 lg:rounded-full">
          {createElement(Squares2X2Icon, {
            className: "h-[18px] w-[18px]",
          })}{" "}
          <span className="text-gray-900">Problem List</span>
        </MenuItem>
      </Typography>
      <div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={() => handleBack()}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </IconButton>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={() => handleNext()}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </IconButton>
      </div>
    </ul>
  );
};

export default ExerciseMenu;
