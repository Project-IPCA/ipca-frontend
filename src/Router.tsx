import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./layout";

const HomePage = lazy(() => import("./pages/homePage/HomePage"));

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
