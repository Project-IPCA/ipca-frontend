import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./layout";
import { AnonymousRoutes, ProtectedRoutes, SpinnerLoading } from "./components";

const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const LoginPage = lazy(() => import("./pages/loginPage/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/notFoundPage/NotFoundPage"));
const SubmitCodePage = lazy(
  () => import("./pages/submitCodePage/SubmitCodePage"),
);

const router = createBrowserRouter([
  {
    element: <AnonymousRoutes />,
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<SpinnerLoading />}>
            <LoginPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "/",
            element: (
              <Suspense fallback={<SpinnerLoading />}>
                <HomePage />
              </Suspense>
            ),
          },
          {
            path: "/submit_code",
            element: (
              <Suspense fallback={<SpinnerLoading />}>
                <SubmitCodePage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/404page",
    element: (
      <Suspense fallback={<SpinnerLoading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/404page" replace />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
