import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "./layout";
import { AnonymousRoutes, ProtectedRoutes, SpinnerLoading } from "./components";
import SubmitCodeLayout from "./layout/SubmitCodeLayout";

const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const LoginPage = lazy(() => import("./pages/loginPage/LoginPage"));
const NotFoundPage = lazy(() => import("./pages/notFoundPage/NotFoundPage"));
const SubmitCodePage = lazy(
  () => import("./pages/submitCodePage/SubmitCodePage"),
);
const ExerciseListPage = lazy(
  () => import("./pages/exerciseListPage/ExerciseListPage"),
);
const FaqPage = lazy(() => import("./pages/faqPage/FaqPage"));

const InstructionsPage = lazy(
  () => import("./pages/instructionsPage/InstructionsPage"),
);
const ExaminationPage = lazy(
  () => import("./pages/examinationPage/ExaminationPage"),
);
const ProfilePage = lazy(() => import("./pages/profilePage/ProfilePage"));

const ErrorPage = lazy(() => import("./pages/errorPage/ErrorPage"));

const router = createBrowserRouter([
  {
    element: <AnonymousRoutes />,
    errorElement: <Navigate to="/error" replace />,
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
    errorElement: <Navigate to="/error" replace />,
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
            path: "/exercises",
            element: (
              <Suspense fallback={<SpinnerLoading />}>
                <ExerciseListPage />
              </Suspense>
            ),
          },
          {
            path: "/faq",
            element: (
              <Suspense fallback={<SpinnerLoading />}>
                <FaqPage />
              </Suspense>
            ),
          },
          {
            path: "/instructions",
            element: (
              <Suspense fallback={<SpinnerLoading />}>
                <InstructionsPage />
              </Suspense>
            ),
          },
          {
            path: "/examination",
            element: (
              <Suspense fallback={<SpinnerLoading />}>
                <ExaminationPage />
              </Suspense>
            ),
          },
          {
            path: "/profile",
            element: (
              <Suspense fallback={<SpinnerLoading />}>
                <ProfilePage />
              </Suspense>
            ),
          },
        ],
      },
      {
        element: <SubmitCodeLayout />,
        children: [
          {
            path: "/exercise/:chapter/:problem",
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
    path: "/error",
    element: (
      <Suspense fallback={<SpinnerLoading />}>
        <ErrorPage />
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
