import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {
  return localStorage.access_token || localStorage.refresh_token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoutes;
