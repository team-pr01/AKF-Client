/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useTheme } from "../../contexts/ThemeContext";
import {
  SearchLucideIcon,
} from "../../constants";
import { useGetAllVastuQuery } from "../../redux/Features/Vastu/vastuApi";
import { getEmbedUrl } from "../../utils/getEmbedUrl";
import Loader from "../../components/Shared/Loader/Loader";
import Experts from "../../components/Reusable/Experts/Experts";
import { useGetAllConsultancyServicesQuery } from "../../redux/Features/ConsultancyService/consultancyServiceApi";
import { useGetAllVastuTipsQuery } from "../../redux/Features/Vastu/vastuTipsApi";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import { BrainIcon } from "lucide-react";
import VastuModal from "../../components/VastuPage/VastuModal/VastuModal";

export type TVastu = {
  _id: string;
  title: string;
  category: string;
  videoUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const Vastu = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
   const [showAIModal, setShowAIModal] = useState(false);
  const {
    data: vastu,
    isLoading: isVastuLoading,
    isFetching,
  } = useGetAllVastuQuery({
    keyword: searchQuery,
    category: selectedCategory,
  });
  const { data, isLoading } = useGetAllConsultancyServicesQuery({});
  const filteredExperts =
    data?.data?.filter((expert: any) => expert.category === "Vastu Expert") ||
    [];

  const { data: vastuTips, isLoading: isVastuTipsLoading } =
    useGetAllVastuTipsQuery({});

 const { data: categoryData } = useGetAllCategoriesQuery({});
  const filteredCategory = categoryData?.data?.filter(
    (category: any) => category.areaName === "vastu"
  );

  const allCategories = filteredCategory?.map(
    (category: any) => category.category
  );

  return (
    <div
      className={`min-h-screen font-sans pb-20 ${
        theme === "light"
          ? "bg-light-primary text-light-text-primary"
          : "bg-primary text-dark-text-primary"
      }`}
    >
      <PageHeader title={"Vastu Shastra"} />
 <div className="p-4 pb-[90px] flex flex-col gap-5">
      <div
        className={`p-4 flex flex-col sm:flex-row gap-2 sticky top-[60px] z-30 ${
            theme === "light"
              ? "bg-light-primary dark:bg-dark-primary shadow-sm"
              : "bg-primary dark:bg-black shadow-md"
          }`}
      >
        <div
          className={`p-4 flex flex-col sm:flex-row gap-2 sticky top-[60px] z-30 ${
            theme === "light"
              ? "bg-light-primary dark:bg-dark-primary shadow-sm"
              : "bg-primary dark:bg-black shadow-md"
          }`}
        >
          <div className="flex-1 relative">
            <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange transition-shadow focus:shadow-lg ${
                theme === "light"
                  ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                  : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
              }`}
              aria-label="Search recipes"
            />
          </div>
          <button
            onClick={() => setShowAIModal(true)}
            className="bg-gradient-to-r from-brand-blue to-teal-500 hover:from-teal-500 hover:to-brand-blue bg-200% animate-background-pan-fast px-4 py-3 sm:py-0 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-white font-medium shadow-md hover:shadow-lg hover:shadow-brand-blue/40"
          >
            <BrainIcon className="w-5 h-5" />
            <span>AI Recipe</span>
          </button>
        </div>
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
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
</div>
      <main className="p-4 pt-0 space-y-6">
        {/* Videos */}
        <section>
          <h2
            className={`text-lg font-semibold mb-3 ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            Vastu Videos
          </h2>
          {isVastuLoading || isFetching ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vastu?.data?.length < 1 ? (
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
                vastu?.data?.map((vastu: TVastu) => (
                  <div
                    key={vastu._id}
                    className={`rounded-lg overflow-hidden shadow-lg ${
                      theme === "light" ? "bg-light-surface" : "bg-dark-card"
                    }`}
                  >
                    <div className="relative w-full h-48">
                      <iframe
                        src={getEmbedUrl(vastu.videoUrl) as string}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="autoplay; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-3">
                      <h3
                        className={`font-medium text-sm truncate mb-1 ${
                          theme === "light"
                            ? "text-light-text-primary"
                            : "text-dark-text-primary"
                        }`}
                        title={vastu.title}
                      >
                        {vastu.title}
                      </h3>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        {/* Vastu tips */}
        <section>
          <h2
            className={`text-lg font-semibold mb-3 ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            Popular Vastu Tips
          </h2>
          {isVastuTipsLoading ? (
            // 🦴 Skeleton Loader
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-md overflow-hidden animate-pulse ${
                    theme === "light" ? "bg-gray-100" : "bg-gray-800"
                  }`}
                >
                  {/* Summary skeleton */}
                  <div className="flex items-center gap-3 p-3">
                    <div
                      className={`size-6 rounded-full ${
                        theme === "light" ? "bg-gray-200" : "bg-gray-700"
                      }`}
                    ></div>
                    <div
                      className={`h-4 w-2/3 rounded ${
                        theme === "light" ? "bg-gray-200" : "bg-gray-700"
                      }`}
                    ></div>
                  </div>

                  {/* Details skeleton */}
                  <div
                    className={`p-3 border-t space-y-2 ${
                      theme === "light"
                        ? "border-gray-200 bg-gray-50"
                        : "border-gray-700 bg-gray-900"
                    }`}
                  >
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-3 w-full rounded ${
                          theme === "light" ? "bg-gray-200" : "bg-gray-700"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : vastuTips?.data?.length > 0 ? (
            // ✅ Actual data rendering
            <div className="space-y-3">
              {vastuTips?.data?.map((tip: any, index: number) => (
                <details
                  key={index}
                  className={`rounded-lg shadow-md overflow-hidden ${
                    theme === "light" ? "bg-light-surface" : "bg-dark-card"
                  }`}
                >
                  <summary
                    className={`p-3 cursor-pointer flex items-center gap-3 transition-colors hover:bg-opacity-80 ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <img src={tip?.imageUrl} alt="icon" className="size-6" />
                    <span
                      className={`font-medium text-sm ${
                        theme === "light"
                          ? "text-light-text-primary"
                          : "text-dark-text-primary"
                      }`}
                    >
                      {tip?.title}
                    </span>
                  </summary>
                  <div
                    className={`p-3 border-t text-xs space-y-1.5 ${
                      theme === "light"
                        ? "border-gray-200 text-light-text-secondary bg-light-surface-alt/50"
                        : "border-gray-700 text-dark-text-secondary bg-dark-surface/50"
                    }`}
                  >
                    {tip?.tips.map((t: string, i: number) => (
                      <p key={i}>{t}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            // 🚫 No data
            <p
              className={`text-center py-6 text-sm ${
                theme === "light"
                  ? "text-light-text-tertiary"
                  : "text-dark-text-tertiary"
              }`}
            >
              No Vastu tips found
            </p>
          )}
        </section>
      </main>
      <div className="">
        {isLoading ? (
          <Loader />
        ) : (
          <Experts
            data={filteredExperts}
            title={"Vastu"}
            isLoading={isLoading}
          />
        )}
      </div>
      {showAIModal && <VastuModal setShowAIModal={setShowAIModal} />}
    </div>
  );
};

export default Vastu;
