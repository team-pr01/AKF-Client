/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/Features/Auth/authSlice";
import {
  useAttendOnQuizMutation,
  useGetSingleQuizQuery,
} from "../../redux/Features/Quiz/quizApi";
import Loader from "../../components/Shared/Loader/Loader";
import { useState } from "react";
import { toast } from "sonner";

const AttendQuiz = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { id: quizId } = useParams<{ id: string }>();
  const user = useSelector(useCurrentUser) as any; // user?._id

  const { data, isLoading } = useGetSingleQuizQuery(quizId);
  const [attendOnQuiz, { isLoading: isSubmitting }] = useAttendOnQuizMutation();

  // Track user answers
  const [answers, setAnswers] = useState<
    { questionId: string; selectedAnswer: string }[]
  >([]);

  // Handle selecting an answer
  const handleSelectAnswer = (questionId: string, selectedAnswer: string) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) {
        return prev.map((a) =>
          a.questionId === questionId ? { ...a, selectedAnswer } : a
        );
      }
      return [...prev, { questionId, selectedAnswer }];
    });
  };

  // Submit quiz
  const handleSubmitQuiz = async () => {
    try {
      const payload = {
        quizId: quizId!,
        userId: user?._id,
        answers,
      };

      const response = await attendOnQuiz({
        data: payload,
        id: quizId,
      }).unwrap();

      if (response?.success) {
        navigate("/quiz-result", {
          state: {
            userName: user?.name || "User",
            quizTitle: data?.data?.title || "Quiz",
            quizDescription: data?.data?.description || "",
            score: response?.data?.score,
            totalQuestions:
              response?.data?.totalQuestions || 0,
            percentage: response?.data?.percentage || 0,
          },
        });
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };

  if (isLoading) return <Loader />;

  const quiz = data?.data;

  return (
    <div className={`p-4 max-w-3xl mx-auto mb-16 ${
          theme === "light"
            ? "bg-white"
            : "bg-gray-800"
        }`}>
      <h3
        className={`font-semibold text-xl mb-4 ${
          theme === "light"
            ? "text-light-text-primary"
            : "text-dark-text-primary"
        }`}
      >
        {quiz?.title}
      </h3>

      <div className="space-y-6">
        {quiz?.questions?.map((q: any, index: number) => (
          <div
            key={q._id}
            className={`p-4 rounded-lg shadow-md ${
              theme === "light" ? "bg-white" : "bg-gray-800"
            }`}
          >
            <h4
              className={`font-medium mb-3 ${
                theme === "light" ? "text-gray-900" : "text-gray-100"
              }`}
            >
              {index + 1}. {q.question}
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt: string, optIndex: number) => (
                <label
                  key={optIndex}
                  className={`flex items-center p-2 border rounded-md cursor-pointer ${
                    theme === "light"
                      ? "border-gray-300 hover:bg-gray-100"
                      : "border-gray-600 hover:bg-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={optIndex + 1}
                    onChange={() =>
                      handleSelectAnswer(q._id, String(optIndex + 1))
                    }
                    checked={
                      answers.find((a) => a.questionId === q._id)
                        ?.selectedAnswer === String(optIndex + 1)
                    }
                    className="mr-2"
                  />
                  <span
                    className={
                      theme === "light" ? "text-gray-800" : "text-gray-200"
                    }
                  >
                    {opt}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSubmitQuiz}
          disabled={isSubmitting}
          className="px-6 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit Quiz"}
        </button>
      </div>
    </div>
  );
};

export default AttendQuiz;
