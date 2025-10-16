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
import Food from "../pages/Food/Food";
import Jyotish from "../pages/Jyotish/Jyotish";
import News from "../pages/News/News";
import Learn from "../pages/Learn/Learn";
import AiChatPage from "../pages/Learn/AiChatPage";
import Notification from "../pages/Notification/Notification";
import AttendQuiz from "../pages/Learn/AttentQuiz";
import QuizResult from "../pages/QuizResult/QuizResult";
import MyProfile from "../pages/MyProfile/MyProfile";
import Settings from "../pages/Settings/Settings";
import Emergency from "../pages/Emergency/Emergency";
import Ayurveda from "../pages/Ayurveda/Ayurveda";
import Shop from "../pages/Shop/Shop";

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
        path: "/temples",
        element: <Temple />,
      },
      {
        path: "/food",
        element: <Food />,
      },
      {
        path: "/vastu",
        element: <Vastu />,
      },
      {
        path: "/jyotish",
        element: <Jyotish />,
      },
      {
        path: "/consultancy",
        element: <Consultancy />,
      },
      {
        path: "/news",
        element: <News/>,
      },
      {
        path: "/learn",
        element: <Learn/>,
      },
      {
        path: "/ai-chat",
        element: <AiChatPage/>,
      },
      {
        path: "/notifications",
        element: <Notification/>,
      },
      {
        path: "/my-profile",
        element: <MyProfile/>,
      },
      {
        path: "/settings",
        element: <Settings/>,
      },
      {
        path: "/attend-quiz/:id",
        element: <AttendQuiz/>,
      },
      {
        path: "/quiz-result",
        element: <QuizResult/>,
      },
      {
        path: "/emergency",
        element: <Emergency/>,
      },
      {
        path: "/ayurveda",
        element: <Ayurveda/>,
      },
      {
        path: "/shop",
        element: <Shop/>,
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
