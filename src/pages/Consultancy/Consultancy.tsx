/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { SearchLucideIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import Experts from "../../components/Reusable/Experts/Experts";
import Loader from "../../components/Shared/Loader/Loader";
import { useGetAllConsultancyServicesQuery } from "../../redux/Features/ConsultancyService/consultancyServiceApi";

const Consultancy = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isFetching, isLoading } = useGetAllConsultancyServicesQuery({
    category: selectedCategory,
    keyword: searchQuery,
  });
  const { data: categoryData } = useGetAllCategoriesQuery({});

  const filteredCategory = categoryData?.data?.filter(
    (category: any) => category.areaName === "consultancyService"
  );

  const allCategories = filteredCategory?.map(
    (category: any) => category.category
  );

 ;

  return (
    <div
      className={`min-h-screen font-sans pb-16 ${
        theme === "light"
          ? "bg-light-primary text-light-text-primary"
          : "bg-primary text-dark-text-primary"
      }`}
    >
      <PageHeader title={"Consultancy Services"} />

      <div
        className={`p-4 space-y-4 sticky top-[60px] z-30 ${
          theme === "light"
            ? "bg-light-primary dark:bg-dark-primary"
            : "bg-primary dark:bg-black"
        }`}
      >
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
            <input
              type="text"
              placeholder={"Search doctors, specialties..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange ${
                theme === "light"
                  ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                  : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
              }`}
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 ${
              selectedCategory === ""
                ? "bg-brand-orange text-white font-semibold"
                : `${
                    theme === "light"
                      ? "bg-light-surface-alt text-light-text-secondary hover:bg-gray-200"
                      : "bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary"
                  }`
            }`}
          >
            All
          </button>
          {allCategories?.map((category: any) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 ${
                selectedCategory === category
                  ? "bg-brand-orange text-white font-semibold"
                  : `${
                      theme === "light"
                        ? "bg-light-surface-alt text-light-text-secondary hover:bg-gray-200"
                        : "bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary"
                    }`
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <main className="">
        {isLoading ? (
          <Loader />
        ) : (
          <Experts
            data={data?.data}
            title={"Yoga"}
            isLoading={isLoading || isFetching}
          />
        )}
      </main>

      
    </div>
  );
};

export default Consultancy;
