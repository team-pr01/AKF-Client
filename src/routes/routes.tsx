import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout/MainLayout";
import NotFound from "../pages/NotFound/NotFound";
import SignUp from "../pages/Auth/SignUp/SignUp";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import ForgotPassword from "../pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/Auth/ResetPassword/ResetPassword";
import Yoga from "../pages/Yoga/Yoga";
import Vastu from "../pages/Vastu/Vastu";
import Consultancy from "../pages/Consultancy/Consultancy";
import Temple from "../pages/Temple/Temple";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/yoga",
        element: <Yoga />,
      },
      {
        path: "/temple",
        element: <Temple />,
      },
      {
        path: "/vastu",
        element: <Vastu />,
      },
      {
        path: "/consultancy",
        element: <Consultancy />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
    ],
  },
]);
