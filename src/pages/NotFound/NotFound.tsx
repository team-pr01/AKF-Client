import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";

const NotFoundPage = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 transition-colors duration-300 ${
        theme === "light"
          ? "bg-neutral-100 text-neutral-900"
          : "bg-neutral-900 text-neutral-100"
      }`}
    >
      {/* Error Code */}
      <h1 className="text-9xl font-extrabold tracking-widest text-primary-500">
        404
      </h1>

      {/* Message */}
      <div
        className={`px-6 py-4 rounded-xl shadow-md mt-6 text-center ${
          theme === "light" ? "bg-neutral-200" : "bg-neutral-800"
        }`}
      >
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
        <p
          className={
            theme === "light" ? "text-neutral-600" : "text-neutral-400"
          }
        >
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>
      </div>

      {/* Back to Home Button */}
      <Link
        to="/"
        className={`mt-8 flex items-center gap-2 px-6 py-3 text-lg font-medium rounded-2xl shadow-lg transition ${
          theme === "light"
            ? "bg-brand-orange text-white hover:bg-primary-600"
            : "bg-primary-400 text-white hover:bg-primary-500"
        }`}
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
