import { useAppSelector } from "../../../hooks/store";
import { profileNone } from "../../../assets";
import { getProfileStatus } from "../../profile/redux/profileSlice";
import { Typography } from "@material-tailwind/react";
import { getUserIpAddressFetching } from "../../userIpAddress/redux/UserIpAddress";

function ProfilePic() {
  const { data } = useAppSelector((state) => state.profile);
  const isProfileFetching = useAppSelector(getProfileStatus);
  const isIpFetching = useAppSelector(getUserIpAddressFetching);

  return isProfileFetching || isIpFetching ? (
    <Typography
      as="div"
      variant="lead"
      className="h-36 w-36 rounded-full bg-gray-300"
    >
      &nbsp;
    </Typography>
  ) : (
    <img
      src={data.profile.avatar ? data.profile.avatar : profileNone}
      className="h-36 w-36 rounded-full"
    />
  );
}

export default ProfilePic;
