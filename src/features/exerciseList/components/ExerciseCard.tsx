import { Card, Chip, Progress, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
interface Props {
  index: number;
  name: string;
  score: number;
  fullmark: number;
  isOpen: boolean;
}
const ExerciseCard = ({ index, name, score, fullmark, isOpen }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      className="w-full h-60 p-5 flex flex-col justify-between cursor-pointer"
      onClick={() => navigate("/submit_code")}
    >
      <div>
        <Chip
          value={isOpen ? "Open" : "Close"}
          className={`w-fit ${isOpen ? "bg-green-400" : "bg-red-400"}`}
        />
        <Typography variant="lead" className="mt-4">
          Unit {index}: {name}
        </Typography>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-end gap-4">
          <Typography color="blue-gray" variant="h6">
            {score}/{fullmark}
          </Typography>
        </div>
        <Progress value={(score / fullmark) * 100} />
      </div>
    </Card>
  );
};

export default ExerciseCard;
