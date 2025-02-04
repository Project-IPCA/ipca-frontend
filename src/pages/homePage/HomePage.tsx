import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { handCoding, coding } from "../../assets";
import { HomeInfo } from "../../features/homeInfo";
import { UserIpAddress } from "../../features/userIpAddress";
import ProfilePic from "../../features/homeInfo/components/ProfilePic";
import { useTranslation } from "react-i18next";

function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex w-screen md:min-h-screen justify-center items-center  lg:pt-20 pt-24 lg:px-20 px-5 ">
      <div className="flex flex-col gap-5 h-full justify-center items-center w-full lg:pb-0 pb-6">
        <Card className="lg:h-96 w-full border-[1px] flex flex-row">
          <CardBody className="lg:w-2/3 w-full">
            <Typography variant="h4" className="pb-2">
              {t("page.home.title.welcome")}
            </Typography>
            <Typography variant="h3" className="pb-4" color="black">
              {t("page.home.title.compro")}
            </Typography>
            <Card className="shadow-none border-[1px] flex lg:flex-row flex-col">
              <CardBody className="lg:w-72 w-full space-y-2 flex justify-center items-center">
                <div className="space-y-2">
                  <ProfilePic />
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
                {t("page.home.quote.intro")}
              </Typography>
              <Typography variant="h2" className="pb-9" color="black">
                {t("page.home.quote.main")}
              </Typography>
              <Button onClick={() => navigate("/exercises")}>
                {t("page.home.quote.button")}
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
