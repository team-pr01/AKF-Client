import { useTheme } from "../../contexts/ThemeContext";
import { useLocation, Link } from "react-router-dom";

type QuizResultState = {
  userName: string;
  quizTitle: string;
  quizDescription: string;
  score: number;
  totalQuestions: number;
  percentage: number;
};

const QuizResult = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const state = location.state as QuizResultState;

  if (!state) {
    return <div className="p-4">No result to display</div>;
  }

  const {
    userName,
    quizTitle,
    quizDescription,
    score,
    totalQuestions,
    percentage,
  } = state;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1
          className={`text-2xl font-bold ${
            theme === "light" ? "text-gray-900" : "text-gray-100"
          }`}
        >
          Well Done, {userName}!
        </h1>
        <p
          className={`mt-2 text-gray-600 ${
            theme === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          You have completed the quiz: {quizTitle}
        </p>
        <p
          className={`mt-1 ${
            theme === "light" ? "text-gray-700" : "text-gray-300"
          }`}
        >
          {quizDescription}
        </p>
      </div>

      {/* Score Card */}
      <div
        className={`p-6 rounded-lg shadow-md ${
          theme === "light" ? "bg-white" : "bg-gray-800"
        } text-center`}
      >
        <h2 className="text-xl font-semibold mb-4">Score Card</h2>
        <p className="text-lg">
          Score: <span className="font-bold">{score}</span> / {totalQuestions}
        </p>
        <p className="text-lg mt-2">
          Percentage:{" "}
          <span className="font-bold">{percentage.toFixed(2)}%</span>
        </p>
      </div>

      {/* Back Button */}
      <div className="flex justify-center">
        <Link
          to="/learn"
          className="px-6 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default QuizResult;
