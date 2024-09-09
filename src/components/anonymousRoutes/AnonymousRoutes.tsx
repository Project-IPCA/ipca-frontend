import { Navigate, Outlet } from "react-router-dom";

function AnonymousRoutes() {
  return localStorage.access_token ? <Navigate to="/" replace /> : <Outlet />;
}
export default AnonymousRoutes;
