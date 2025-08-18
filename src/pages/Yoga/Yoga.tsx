/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { SearchLucideIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { useGetAllYogaQuery } from "../../redux/Features/Yoga/yogaApi";
import { getEmbedUrl } from "../../utils/getEmbedUrl";
import { useGetAlConsultancyServicesQuery } from "../../redux/Features/ConsultancyService/consultancyServiceApi";
import Experts from "../../components/Reusable/Experts/Experts";
import Loader from "../../components/Shared/Loader/Loader";

const Yoga = () => {
  const { data, isLoading } = useGetAllYogaQuery({});
   const {
    data: experts,
    isLoading: isExpertsLoading,
  } = useGetAlConsultancyServicesQuery({});
  const filteredExperts =
    experts?.data?.filter((expert: any) => expert.category === 'Yoga Expert') ||
    [];
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ];

  

  return (
    <div className="h-full bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans">
      <PageHeader title={"Yoga Programs"} />

      <main className="px-4 pt-4">
        <div className="relative mb-6">
          <div
            className={`rounded-full flex items-center px-3 py-2 shadow-lg transition-shadow duration-300 hover:shadow-xl ${
              theme === "light"
                ? "bg-light-surface"
                : "bg-dark-surface animate-soft-breathing-shadow"
            }`}
          >
            <SearchLucideIcon className="w-4 h-4 text-brand-orange mr-2" />
            <input
              type="text"
              placeholder={"Search yoga programs..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent w-full outline-none text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary text-sm`}
              aria-label="Search yoga programs"
            />
            {/* {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className={`p-1.5 text-light-text-secondary dark:text-dark-text-secondary hover:text-brand-orange dark:hover:text-brand-orange`}
              >
                <ClearSearchIcon className="w-4 h-4" />
              </button>
            )} */}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-4 px-4">
          {levels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedCategory(level.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transform hover:scale-105 ${
                selectedCategory === level.id
                  ? `bg-gradient-to-r from-brand-orange to-yellow-500 text-white font-semibold focus:ring-brand-yellow ${
                      theme === "dark"
                        ? "animate-background-pan-fast bg-200%"
                        : ""
                    }`
                  : `${
                      theme === "light"
                        ? "bg-light-surface-alt text-light-text-secondary hover:bg-gray-200 hover:text-light-text-primary focus:ring-gray-300"
                        : "bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary focus:ring-gray-600"
                    }`
              }`}
            >
              {level.name}
            </button>
          ))}
        </div>

        <div className="mb-8">
          <h2
            className={`dark:text-dark-text-primary text-xl font-bold text-gradient bg-gradient-to-r from-brand-orange to-yellow-400 bg-clip-text text-transparent`}
          >
            Yoga Programs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`animate-pulse p-3 rounded-lg ${
                    theme === "light"
                      ? "bg-light-surface-alt"
                      : "bg-dark-surface-alt"
                  }`}
                >
                  <div
                    className={`h-32 rounded-lg mb-3 ${
                      theme === "light" ? "bg-gray-300" : "bg-gray-700"
                    }`}
                  />
                  <div
                    className={`h-4 w-3/4 rounded mb-2 ${
                      theme === "light" ? "bg-gray-300" : "bg-gray-700"
                    }`}
                  />
                  <div
                    className={`h-3 w-1/2 rounded mb-2 ${
                      theme === "light" ? "bg-gray-300" : "bg-gray-700"
                    }`}
                  />
                  <div
                    className={`h-3 w-1/3 rounded ${
                      theme === "light" ? "bg-gray-300" : "bg-gray-700"
                    }`}
                  />
                </div>
              ))
            ) : data?.data?.length > 0 ? (
              data?.data?.map((program:any) => (
                <div
                  key={program.id}
                  className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl dark:hover:shadow-brand-yellow/30 hover:shadow-brand-orange/30 hover:transform hover:-translate-y-1.5 ${
                    theme === "light"
                      ? "bg-light-surface"
                      : "bg-dark-surface-alt animate-soft-breathing-shadow"
                  }`}
                  style={
                    theme === "dark"
                      ? ({
                          "--tw-shadow-color": "rgba(255,193,7,0.1)",
                        } as React.CSSProperties)
                      : {}
                  }
                >
                 <div className="relative w-full h-48">
                   <iframe
                    src={getEmbedUrl(program.videoUrl) as string}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; picture-in-picture"
                    allowFullScreen
                  />
                 </div>
                  <div className="p-4">
                    <h3
                      className={`font-semibold text-base text-light-text-primary dark:text-dark-text-primary mb-1.5 truncate`}
                      title={program.name}
                    >
                      {program.name}
                    </h3>
                    <p
                      className={`text-sm text-light-text-secondary dark:text-dark-text-secondary`}
                    >
                      {program.description}
                    </p>

                    <span
                      className={`text-sm text-light-text-secondary dark:text-dark-text-secondary`}
                    >
                      Duration: {program.duration}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div
                className={`sm:col-span-2 text-center py-10 text-light-text-tertiary dark:text-dark-text-tertiary`}
              >
                <p className="text-lg mb-2">(╥_╥)</p>
                <p>No yoga programs found matching your criteria.</p>
                <p className="text-sm mt-1">
                  Try adjusting your search or filters.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

     <div className="mb-14">
       {isExpertsLoading ? (
            <Loader />
          ) : (
            <Experts
              data={filteredExperts}
              title={'Yoga'}
              isLoading={isLoading}
            />
          )}
     </div>
    </div>
  );
};

export default Yoga;
