import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { profileNone, handCoding, coding } from "../../assets";
import { HomeInfo } from "../../features/homeInfo";
import { UserIpAddress } from "../../features/userIpAddress";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex w-screen min-h-screen justify-center items-center  pt-20 lg:px-20 px-5">
      <div className="flex flex-col gap-5 h-full justify-center items-center w-full lg:pb-0 pb-6">
        <Card className="lg:h-96 w-full border-[1px] flex flex-row">
          <CardBody className="lg:w-2/3 w-full">
            <Typography variant="h4" className="pb-2">
              Welcome to,
            </Typography>
            <Typography variant="h3" className="pb-4" color="black">
              Computer Programming.
            </Typography>
            <Card className="shadow-none border-[1px] flex lg:flex-row flex-col">
              <CardBody className="lg:w-72 w-full space-y-2 flex justify-center items-center">
                <div className="space-y-2">
                  <img src={profileNone} className="h-36" />
                  <UserIpAddress />
                </div>
              </CardBody>
              <CardBody className="w-full space-y-2">
                <HomeInfo />
              </CardBody>
            </Card>
          </CardBody>
          <CardBody className="w-96  lg:flex hidden justify-center items-center ">
            <img src={coding} className="w-80" />
          </CardBody>
        </Card>
        <Card className="h-96 w-full border-[1px] p-6 flex flex-row justify-center">
          <CardBody className="w-1/2 lg:flex hidden justify-center items-center">
            <img src={handCoding} className="w-80" />
          </CardBody>
          <CardBody className="w-1/2 flex justify-center items-center">
            <div className="text-center">
              <Typography variant="h4" className="pb-2">
                The heart concept is
              </Typography>
              <Typography variant="h2" className="pb-9" color="black">
                "Learning by doing"
              </Typography>
              <Button onClick={() => navigate("/exercises")}>
                Let's start doing exercises!
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
