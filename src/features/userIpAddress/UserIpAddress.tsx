import { Chip, Typography } from "@material-tailwind/react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import {
  fetchUserIPAddress,
  getUserIpAddress,
  getUserIpAddressFetching,
} from "./redux/UserIpAddress";
import { useEffect } from "react";

function UserIpAddress() {
  const dispatch = useAppDispatch();
  const ipAddress = useAppSelector(getUserIpAddress);
  const isFetching = useAppSelector(getUserIpAddressFetching);

  useEffect(() => {
    if (!ipAddress.ip) {
      dispatch(fetchUserIPAddress());
    }
  }, [ipAddress]);

  return (
    <>
      {isFetching ? (
        <Typography
          as="div"
          variant="paragraph"
          className="h-8  rounded-lg bg-gray-300 animate-pulse"
        >
          &nbsp;
        </Typography>
      ) : (
        <Chip
          value={ipAddress.ip}
          variant="filled"
          size="lg"
          color="green"
          className="text-center"
        />
      )}
    </>
  );
}

export default UserIpAddress;