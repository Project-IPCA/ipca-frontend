import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/store";
import { getLoginState } from "../../features/login/redux/loginSlice";

function AnonymousRoutes() {
  const loginState = useAppSelector(getLoginState);
  return loginState.token && localStorage.access_token ? (
    <Navigate to="/" replace />
  ) : (
    <Outlet />
  );
}
export default AnonymousRoutes;
