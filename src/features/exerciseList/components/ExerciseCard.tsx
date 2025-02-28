import { Card, Chip, Progress, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { getExercciseListStatus } from "../redux/exerciseListSlice";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../hooks/store";

interface Props {
  chapter_id: string;
  full_mark: number;
  index: number;
  is_open: boolean;
  marking: number;
  name: string;
  last_exercise_success: number;
}

const ExerciseCard = ({
  index,
  name,
  marking,
  full_mark,
  is_open,
  last_exercise_success,
}: Props) => {
  const navigate = useNavigate();
  const isFetching = useAppSelector(getExercciseListStatus);
  const { t } = useTranslation();
  return (
    <Card
      className={`w-full h-60 p-5 flex flex-col justify-between cursor-pointer border-[1px] ${is_open ? "" : "bg-gray-50 cursor-default text-gray-500"}`}
      onClick={() => {
        if (is_open) {
          navigate(`/exercise/${index}/${last_exercise_success}`);
        }
      }}
    >
      <div>
        {isFetching ? (
          <Typography
            as="div"
            variant="lead"
            className="h-5 w-14 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        ) : (
          <Chip
            value={
              is_open
                ? t("feature.exercise_list.exercise.status.open")
                : t("feature.exercise_list.exercise.status.closed")
            }
            className={`w-fit ${is_open ? "bg-green-400" : "bg-red-400"}`}
          />
        )}
        {isFetching ? (
          <Typography
            as="div"
            variant="lead"
            className="mt-4 h-3 w-11/12 rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        ) : (
          <Typography variant="lead" className="mt-4">
            {t("feature.exercise_list.exercise.unit")} {index}: {name}
          </Typography>
        )}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-end gap-4">
          {isFetching ? (
            <Typography
              as="div"
              variant="h6"
              className="h-5 mb-1 w-14 rounded-full bg-gray-300"
            >
              &nbsp;
            </Typography>
          ) : (
            <Typography
              color="blue-gray"
              variant="h6"
              className={is_open ? "" : "text-gray-500"}
            >
              {marking}/{full_mark}
            </Typography>
          )}
        </div>
        {isFetching ? (
          <Typography
            as="div"
            variant="lead"
            className=" h-3 w-full rounded-full bg-gray-300"
          >
            &nbsp;
          </Typography>
        ) : (
          <Progress value={(marking / full_mark) * 100} />
        )}
      </div>
    </Card>
  );
};

export default ExerciseCard;
