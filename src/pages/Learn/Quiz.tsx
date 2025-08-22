/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Loader from "../../components/Shared/Loader/Loader";
import { BookOpenIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { useGetAllQuizzesQuery } from "../../redux/Features/Quiz/quizApi";

const Quiz = () => {
  const { theme } = useTheme();
  const { data, isLoading } = useGetAllQuizzesQuery({});
  return (
    <div className="space-y-4">
      {isLoading ? (
        <Loader />
      ) : data?.data?.length < 1 ? (
        <p
          className={`text-center py-6 text-sm ${
            theme === "light"
              ? "text-light-text-tertiary"
              : "text-dark-text-tertiary"
          }`}
        >
          No Vastu tips found
        </p>
      ) : (
        data?.data?.map((topic: any, index: number) => (
          <div
            key={index}
            className={`rounded-lg p-4 shadow-lg transition-all hover:shadow-brand-orange/30 dark:hover:shadow-brand-yellow/30 transform hover:-translate-y-1 duration-300 ${
              theme === "light"
                ? "bg-light-surface"
                : "bg-dark-card animate-soft-breathing-shadow"
            }`}
            style={
              {
                "--tw-shadow-color": "rgba(255,193,7,0.1)",
              } as React.CSSProperties
            }
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3
                  className={`font-semibold text-lg capitalize ${
                    theme === "light"
                      ? "text-light-text-primary"
                      : "text-dark-text-primary"
                  }`}
                >
                  {topic.title}
                </h3>
                <span
                  className={`inline-block text-xs px-2 py-0.5 rounded-full mt-1.5 ${
                    theme === "light"
                      ? "bg-gray-200 text-gray-700"
                      : "bg-gray-700 text-gray-300"
                  }`}
                >
                  {topic?.questions?.length || 0} Questions
                </span>
              </div>
              {/* <AwardIcon className="w-6 h-6 text-yellow-400 animate-subtle-beat" /> */}
            </div>
            <Link
            to={`/attend-quiz/${topic?._id}`}
            className="w-full bg-gradient-to-r from-brand-orange to-yellow-500 hover:from-yellow-500 hover:to-brand-orange bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg">
              <BookOpenIcon className="w-4 h-4" />
              <span>Start Quiz</span>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Quiz;
