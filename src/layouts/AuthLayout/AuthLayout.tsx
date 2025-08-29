import { Outlet } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const AuthLayout = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`w-full max-w-md bg-white dark:bg-slate-800 shadow-xl p-6 md:p-8 ${
        theme === "dark"
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700"
          : "bg-gradient-to-br from-slate-50 via-white to-orange-50/60"
      }`}
    >
      <Outlet />
    </div>
  );
};

export default AuthLayout;
