import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div>
      <h1>navbar</h1>
      <Outlet />
    </div>
  );
}

export default Layout;
