/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeartIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { useGetAllDonationProgramsQuery } from "../../../redux/Features/DonationPrograms/donationProgramApi";

const OurProjects = () => {
  const { theme } = useTheme();
  const { data: programData, isLoading: isProgramLoading } =
    useGetAllDonationProgramsQuery({});

  return (
    <section className="px-4 py-2 bg-light-primary dark:bg-primary mb-20">
      <h2 className="text-xl font-semibold dark:text-dark-text-primary mb-3 text-gradient bg-gradient-to-r from-brand-blue to-emerald-500 bg-clip-text text-transparent">
        Our Projects
      </h2>

      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-3">
        {isProgramLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-64 sm:w-72 cursor-pointer"
            >
              <div className="relative h-44 sm:h-52 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 animate-pulse bg-gray-100 dark:bg-gray-800">
                {/* Image placeholder */}
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700" />

                {/* Content placeholder */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-100/90 via-gray-100/60 to-transparent dark:from-gray-800/90 dark:via-gray-800/60 dark:to-transparent p-3 flex flex-col justify-end">
                  <div className="h-4 w-28 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="h-3 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
                  <div className="h-8 w-full bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
              </div>
            </div>
          ))
        ) : programData?.data?.length < 1 ? (
          <p
            className={`text-center py-6 text-sm ${
              theme === "light"
                ? "text-light-text-tertiary"
                : "text-dark-text-tertiary"
            }`}
          >
            Projects are coming soon.
          </p>
        ) : (
          programData?.data?.map((item: any, index: number) => (
            <div
              key={item._id}
              className="flex-shrink-0 w-64 sm:w-72 group cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
              role="article"
              aria-labelledby={`project-title-${item.id}`}
            >
              <div
                className={`relative h-44 sm:h-52 rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-brand-orange/40 dark:group-hover:shadow-brand-yellow/40 animate-soft-breathing-shadow bg-light-surface dark:bg-dark-card border-2 border-transparent group-hover:border-brand-orange/50 transition-all duration-300`}
                style={
                  {
                    animationDelay: `${index * 0.2}s`,
                    "--tw-shadow-color": "rgba(0,196,204,0.15)",
                  } as React.CSSProperties
                }
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 flex flex-col justify-end">
                  <h3
                    id={`project-title-${item.id}`}
                    className="text-lg font-semibold text-white mb-1 group-hover:text-brand-yellow transition-colors"
                  >
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-gray-200 dark:text-gray-300 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  )}
                  <button
                    className="mt-auto w-full bg-gradient-to-r from-brand-orange to-yellow-400 dark:from-brand-orange dark:to-yellow-500 hover:from-yellow-400 hover:to-brand-orange dark:hover:from-yellow-500 dark:hover:to-brand-orange bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-md py-2 px-3 text-xs font-medium flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                    aria-label={`Donate to ${item.title}`}
                  >
                    <HeartIcon className="w-3.5 h-3.5" />
                    Donate Program Coming Soon
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default OurProjects;
