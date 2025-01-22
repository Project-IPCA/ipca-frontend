import { Card, Chip, Progress, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ExerciseInfo } from "../redux/exerciseListSlice";
import { useTranslation } from "react-i18next";

const ExerciseCard = ({
  index,
  name,
  marking,
  full_mark,
  is_open,
  last_exercise_success,
}: ExerciseInfo) => {
  const navigate = useNavigate();
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
        <Chip
          value={
            is_open
              ? t("feature.exercise_list.exercise.status.open")
              : t("feature.exercise_list.exercise.status.closed")
          }
          className={`w-fit ${is_open ? "bg-green-400" : "bg-red-400"}`}
        />
        <Typography variant="lead" className="mt-4">
          {t("feature.exercise_list.exercise.unit")} {index}: {name}
        </Typography>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-end gap-4">
          <Typography
            color="blue-gray"
            variant="h6"
            className={is_open ? "" : "text-gray-500"}
          >
            {marking}/{full_mark}
          </Typography>
        </div>
        <Progress value={(marking / full_mark) * 100} />
      </div>
    </Card>
  );
};

export default ExerciseCard;
