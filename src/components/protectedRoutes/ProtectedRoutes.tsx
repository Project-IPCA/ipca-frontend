import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks/store";
import { getLoginState } from "../../features/login/redux/loginSlice";
import { setLogoutState } from "../../features/login/redux/loginSlice";

const VITE_IPCA_RT = import.meta.env.VITE_IPCA_RT;

function ProtectedRoutes() {
  const location = useLocation();
  const loginState = useAppSelector(getLoginState);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (data.profile.f_name) {
      const evtSource = new EventSource(
        `${VITE_IPCA_RT}/user/connection/${data.profile.group_info?.group_id}?id=${data.profile.user_id}`
      );
      evtSource.onmessage = (event) => {
        if (event.data) {
          if (!event.data.status as boolean) {
            evtSource.close();
            dispatch(setLogoutState());
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/login");
          }
        }
      };
      return () => {
        evtSource.close();
      };
    }
  }, [data]);

  useEffect(() => {}, [location.pathname, loginState.token]);
  return localStorage.access_token || localStorage.refresh_token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoutes;
