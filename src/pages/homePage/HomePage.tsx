import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { handCoding, coding } from "../../assets";
import { HomeInfo } from "../../features/homeInfo";
import { UserIpAddress } from "../../features/userIpAddress";
import ProfilePic from "../../features/homeInfo/components/ProfilePic";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../hooks/store";
import { getProfileStatus } from "../../features/profile/redux/profileSlice";
import { getUserIpAddressFetching } from "../../features/userIpAddress/redux/UserIpAddress";
import { PhotoIcon } from "@heroicons/react/24/outline";

function HomePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isProfileFetching = useAppSelector(getProfileStatus);
  const isIpFetching = useAppSelector(getUserIpAddressFetching);
  const isFetching = isProfileFetching || isIpFetching;

  return (
    <div className="flex w-screen md:min-h-screen justify-center items-center  lg:pt-20 pt-24 lg:px-20 px-5 ">
      <div className="flex flex-col gap-5 h-full justify-center items-center w-full lg:pb-0 pb-6">
        <Card className="lg:h-96 w-full border-[1px] flex flex-row">
          <CardBody className="lg:w-2/3 w-full">
            {isFetching ? (
              <Typography
                as="div"
                variant="h4"
                className="mb-6 h-4 w-36 rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            ) : (
              <Typography variant="h4" className="pb-2">
                {t("page.home.title.welcome")}
              </Typography>
            )}
            {isFetching ? (
              <Typography
                as="div"
                variant="h3"
                className="mb-9 h-6 w-[24rem] rounded-full bg-gray-300"
              >
                &nbsp;
              </Typography>
            ) : (
              <Typography variant="h3" className="pb-4" color="black">
                {t("page.home.title.compro")}
              </Typography>
            )}

            <Card className="shadow-none border-[1px] flex lg:flex-row flex-col">
              <CardBody className="lg:w-72 w-full space-y-2 flex justify-center items-center">
                <div className="space-y-2">
                  <ProfilePic />
                  <UserIpAddress />
                </div>
              </CardBody>
              <HomeInfo />
            </Card>
          </CardBody>
          <CardBody className="w-96  lg:flex hidden justify-center items-center ">
            {isFetching ? (
              <div className="grid w-72 h-56  animate-pulse place-items-center rounded-lg bg-gray-300">
                <PhotoIcon className="h-12 w-12 text-gray-500" />
              </div>
            ) : (
              <img src={coding} className="w-80" />
            )}
          </CardBody>
        </Card>
        <Card className="h-96 w-full border-[1px] p-6 flex flex-row justify-center">
          <CardBody className="w-1/2 lg:flex hidden justify-center items-center">
            {isFetching ? (
              <div className="grid w-80 h-64  animate-pulse place-items-center rounded-lg bg-gray-300">
                <PhotoIcon className="h-12 w-12 text-gray-500" />
              </div>
            ) : (
              <img src={handCoding} className="w-80" />
            )}
          </CardBody>
          <CardBody className="w-1/2 flex justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              {isFetching ? (
                <Typography
                  as="div"
                  variant="h4"
                  className="block mb-6 h-4 w-44 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              ) : (
                <Typography variant="h4" className="pb-2">
                  {t("page.home.quote.intro")}
                </Typography>
              )}
              {isFetching ? (
                <Typography
                  as="div"
                  variant="h2"
                  className="block mb-12 h-6 w-96 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              ) : (
                <Typography variant="h2" className="pb-9" color="black">
                  {t("page.home.quote.main")}
                </Typography>
              )}
              {isFetching ? (
                <Typography
                  as="div"
                  variant="h2"
                  className="block  h-9 w-44 rounded-lg bg-gray-300"
                >
                  &nbsp;
                </Typography>
              ) : (
                <Button onClick={() => navigate("/exercises")}>
                  {t("page.home.quote.button")}
                </Button>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
