/* eslint-disable @typescript-eslint/no-explicit-any */
import { PlayIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { useGetAlCoursesQuery } from "../../../redux/Features/Course/courseApi";
import Loader from "../../Shared/Loader/Loader";

const Courses = () => {
  const { theme } = useTheme();
  //   Get all Courses
  const { data, isLoading: isCourseLoading } = useGetAlCoursesQuery({});
  return (
    <div className="space-y-4">
      {data?.data?.length < 1 ? (
        <p
          className={`text-center py-6 text-sm ${
            theme === "light"
              ? "text-light-text-tertiary"
              : "text-dark-text-tertiary"
          }`}
        >
          No Vastu tips found
        </p>
      ) : isCourseLoading ? (
        <Loader />
      ) : (
        data?.data?.map((course: any, index: number) => (
          <div
            key={index}
            className={`rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-brand-orange/30 dark:hover:shadow-brand-yellow/30 transform hover:-translate-y-1 duration-300 ${
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
            <img
              src={course?.imageUrl}
              alt={course?.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3
                className={`font-semibold text-lg ${
                  theme === "light"
                    ? "text-light-text-primary"
                    : "text-dark-text-primary"
                }`}
              >
                {course?.name}
              </h3>
              <p
                className={`text-sm mb-3 ${
                  theme === "light"
                    ? "text-light-text-secondary"
                    : "text-dark-text-secondary"
                }`}
              >
                {course?.description}
              </p>
              <a
                href={course?.url}
                target="_blank"
                className="w-full bg-gradient-to-r from-brand-orange to-yellow-500 hover:from-yellow-500 hover:to-brand-orange bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
              >
                <PlayIcon className="w-4 h-4" />
                <span>Continue Learning</span>
              </a>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Courses;
