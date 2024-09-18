import { Button, Card, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen h-screen justify-center items-center ">
      <Card shadow={false} className="w-[50rem] text-center">
        <Typography variant="h6">Computer Programming, KMITL</Typography>
        <Typography variant="h1" color="black" className="mt-2">
          Learning by Doing
        </Typography>
        <Typography className="break-words mt-4">
          the process whereby people make sense of their experiences, especially
          those experiences in which they actively engage in making things and
          exploring the world.
        </Typography>
        <div className="w-full flex justify-center items-center mt-12">
          <Button variant="outlined" onClick={() => navigate("/submit_code")}>
            Get Started
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;
