import { useAppSelector } from "../../../hooks/store";
import { profileNone } from "../../../assets";

function ProfilePic() {
  const { data } = useAppSelector((state) => state.profile);
  return (
    <img
      src={data.profile.avatar ? data.profile.avatar : profileNone}
      className="h-36 w-36 rounded-full"
    />
  );
}

export default ProfilePic;
