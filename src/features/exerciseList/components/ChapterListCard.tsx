import { Button, Chip, Typography } from "@material-tailwind/react";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { ExerciseInfo } from "../redux/exerciseListSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  chapterList: ExerciseInfo[];
  isFetching: boolean;
}

function ChapterListCard({ chapterList, isFetching }: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const getItemColor = (
    isSubmit: boolean,
    marking: number,
    fullMark: number,
  ) => {
    if (isSubmit) {
      if (marking === fullMark) {
        return "green";
      } else {
        return "red";
      }
    }
    return "gray";
  };

  return isFetching ? (
    <div className={`divide-y divide-gray-200 `}>
      {[...Array(5)].map((_, index) => (
        <div
          className={`flex justify-between lg:items-center gap-x-4 py-9 px-6 lg:flex-row flex-col  `}
          key={index}
        >
          <div className="space-y-4 md:mb-0 mb-4">
            <Typography
              as="div"
              variant="h5"
              className="block h-3  w-36 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
            <Typography
              as="div"
              variant="h5"
              className="block h-2  w-20 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          </div>
          <div className="flex items-center  md:gap-x-8 gap-x-2 md:flex-nowrap flex-wrap md:gap-y-0 gap-y-2 ">
            {[...Array(5)].map((_, index) => (
              <Typography
                key={index}
                as="div"
                className="block h-16  w-16 rounded-lg bg-gray-300"
              >
                &nbsp;
              </Typography>
            ))}
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="divide-y divide-gray-200 min-h-screen">
      {chapterList?.map((chapter, index) => (
        <div
          className="flex justify-between lg:items-center gap-x-4 py-6 px-6 lg:flex-row flex-col "
          key={index}
        >
          <div className="md:mb-0 mb-4">
            <div className="flex items-center gap-x-2 mb-2">
              {!chapter?.is_open ? (
                <LockClosedIcon className="w-5 h-5 mb-1" />
              ) : null}
              <Typography variant="h6">
                {chapter?.items[0].chapter_idx}. {chapter?.name}
              </Typography>
            </div>
            <div className="flex items-center gap-x-2 lg:mb-0 mb-4">
              <Typography variant="paragraph" className="text-sm">
                {t("feature.exercise_list.exercise.status.label")}
              </Typography>
              <Chip
                className="w-fit"
                variant="ghost"
                color={chapter?.is_open ? "green" : "red"}
                size="sm"
                value={
                  chapter?.is_open
                    ? t("feature.exercise_list.exercise.status.open")
                    : t("feature.exercise_list.exercise.status.closed")
                }
              />
            </div>
          </div>

          <div className="flex items-center  md:gap-x-8 gap-x-2 md:flex-nowrap flex-wrap md:gap-y-0 gap-y-2 ">
            {chapter?.items.map((item, jndex) => (
              <Button
                disabled={!chapter?.is_open}
                color={getItemColor(item.is_submit, item.marking, 2)}
                size="sm"
                variant={item.is_submit ? "filled" : "outlined"}
                className="w-16 h-16 flex flex-col justify-center items-center !p-2"
                onClick={() => {
                  if (chapter?.is_open) {
                    navigate(
                      `/exercise/${item?.chapter_idx}/${item?.item_idx}`,
                    );
                  }
                }}
                key={`${index}.${jndex}`}
              >
                <span className="block mb-1">
                  {t("feature.exercise_list.exercise.item")} {item?.item_idx}
                </span>
                <span className="block">
                  {item?.marking}/{2}
                </span>
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChapterListCard;
