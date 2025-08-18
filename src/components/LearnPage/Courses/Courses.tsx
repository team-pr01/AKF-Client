import { ClockIcon, PlayIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";

const Courses = () => {
  const { theme } = useTheme();
  const courses = [
    {
      title: "Introduction to Vedas",
      description:
        "Learn the basics of Vedic knowledge, scriptures, and core concepts.",
      duration: "2 hours",
      progress: 60,
      image:
        "https://images.unsplash.com/photo-1532653495815-8631ce38b510?w=800&auto=format&fit=crop&q=60",
      lastLesson: "Understanding Vedic Philosophy",
    },
    {
      title: "Sanskrit Basics for Beginners",
      description:
        "An introductory course to learn fundamental Sanskrit alphabets and grammar.",
      duration: "3 hours",
      progress: 30,
      image:
        "https://images.unsplash.com/photo-1516383607781-913a19294fd1?w=800&auto=format&fit=crop&q=60",
      lastLesson: "Basic Sanskrit Grammar - Part 1",
    },
  ];
  return (
    <div className="space-y-4">
      {courses.map((course, index) => (
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
            src={course.image}
            alt={course.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3
              className={`font-semibold text-lg ${
                theme === "light"
                  ? "text-light-text-primary"
                  : "text-dark-text-primary"
              }`}
            >
              {course.title}
            </h3>
            <p
              className={`text-sm mb-3 ${
                theme === "light"
                  ? "text-light-text-secondary"
                  : "text-dark-text-secondary"
              }`}
            >
              {course.description}
            </p>
            <div
              className={`flex items-center justify-between text-xs mb-3 ${
                theme === "light"
                  ? "text-light-text-tertiary"
                  : "text-dark-text-tertiary"
              }`}
            >
              <div className="flex items-center gap-1.5">
                <ClockIcon className="w-3.5 h-3.5" />
                <span>{course.duration}</span>
              </div>
              <span>
                {course.progress}% Complete
              </span>
            </div>
            <div
              className={`w-full rounded-full h-2 mb-4 ${
                theme === "light" ? "bg-light-surface-alt" : "bg-dark-surface"
              }`}
            >
              <div
                className="bg-gradient-to-r from-brand-orange to-brand-yellow h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <button
              className="w-full bg-gradient-to-r from-brand-orange to-yellow-500 hover:from-yellow-500 hover:to-brand-orange bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
            >
              <PlayIcon className="w-4 h-4" />
              <span>
                Continue Learning
              </span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Courses;
