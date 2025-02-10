import InfoText from "./components/InfoText";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect, useRef } from "react";
import { getProfile, getProfileStatus } from "../profile/redux/profileSlice";
import { Bounce, toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { getUserIpAddressFetching } from "../userIpAddress/redux/UserIpAddress";
import { CardBody, Typography } from "@material-tailwind/react";

function HomeInfo() {
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state) => state.profile);
  const { t } = useTranslation();
  const isProfileFetching = useAppSelector(getProfileStatus);
  const isIpFetching = useAppSelector(getUserIpAddressFetching);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      dispatch(getProfile());
    }
    return () => {};
  }, [dispatch, data]);

  useEffect(() => {
    if (error) {
      toast.error(error.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  }, [error]);

  return isProfileFetching || isIpFetching ? (
    <CardBody className="w-full space-y-6">
      {Array.from({ length: 5 }).map((_, index) => (
        <Typography
          key={index}
          as="div"
          variant="paragraph"
          className="mb-2 h-3 w-64 rounded-full bg-gray-300"
        >
          &nbsp;
        </Typography>
      ))}
    </CardBody>
  ) : (
    <CardBody className="w-full space-y-2">
      <InfoText
        label={t("feature.home_info.label.student")}
        value={`${data.profile.kmitl_id} ${data.profile.f_name} ${data.profile.l_name}`}
      />
      <InfoText
        label={t("feature.home_info.label.group")}
        value={`${data.profile.group_info?.number}`}
      />
      <InfoText
        label={t("feature.home_info.label.class_date")}
        value={`${data.profile.group_info?.day} , ${data.profile.group_info?.time_start} - ${data.profile.group_info?.time_end}`}
      />
      <div className="flex gap-2">
        <InfoText
          label={t("feature.home_info.label.year")}
          value={`${data.profile.group_info?.year}`}
        />
        <InfoText
          label={t("feature.home_info.label.semester")}
          value={`${data.profile.group_info?.semester}`}
        />
      </div>
      <InfoText
        label={t("feature.home_info.label.instructor")}
        value={`${data.profile.group_info?.instructor}`}
      />
    </CardBody>
  );
}

export default HomeInfo;
