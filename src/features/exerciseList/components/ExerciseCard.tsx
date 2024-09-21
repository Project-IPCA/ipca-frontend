import { Card, Chip, Progress, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ExerciseInfo } from "../redux/exerciseListSlice";
const ExerciseCard = ({
  chapter_id,
  index,
  name,
  marking,
  full_mark,
  is_open,
}: ExerciseInfo) => {
  const navigate = useNavigate();
  console.log(chapter_id);
  return (
    <Card
      className="w-full h-60 p-5 flex flex-col justify-between cursor-pointer"
      onClick={() => navigate("/submit_code")}
    >
      <div>
        <Chip
          value={is_open ? "Open" : "Close"}
          className={`w-fit ${is_open ? "bg-green-400" : "bg-red-400"}`}
        />
        <Typography variant="lead" className="mt-4">
          Unit {index}: {name}
        </Typography>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-end gap-4">
          <Typography color="blue-gray" variant="h6">
            {marking}/{full_mark}
          </Typography>
        </div>
        <Progress value={(marking / full_mark) * 100} />
      </div>
    </Card>
  );
};

export default ExerciseCard;
