import InfoText from "./components/InfoText";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { useEffect, useRef } from "react";
import { getProfile } from "../profile/redux/profileSlice";
import { Bounce, toast } from "react-toastify";

function HomeInfo() {
  const initialized = useRef(false);
  const dispatch = useAppDispatch();
  const { data, error } = useAppSelector((state) => state.profile);

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

  return (
    <>
      <InfoText
        label="Student info"
        value={`${data.profile.kmitl_id} ${data.profile.f_name} ${data.profile.l_name}`}
      />
      <InfoText label="Group" value={`${data.profile.group_info?.number}`} />
      <InfoText
        label="Class date"
        value={`${data.profile.group_info?.day} , ${data.profile.group_info?.time_start} - ${data.profile.group_info?.time_end}`}
      />
      <div className="flex gap-2">
        <InfoText label="Year" value={`${data.profile.group_info?.year}`} />
        <InfoText
          label="Semester"
          value={`${data.profile.group_info?.semester}`}
        />
      </div>
      <InfoText
        label="Instructor"
        value={`${data.profile.group_info?.instructor}`}
      />
    </>
  );
}

export default HomeInfo;
