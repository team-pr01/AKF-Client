/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useTheme } from "../../contexts/ThemeContext";
import {
  ArrowRightIcon,
  BathIcon,
  BedIcon,
  DoorOpenIcon,
  KitchenIcon,
  Plant2Icon,
  SearchLucideIcon,
  TempleIcon,
} from "../../constants";
import { useGetAllVastuQuery } from "../../redux/Features/Vastu/vastuApi";
import { getEmbedUrl } from "../../utils/getEmbedUrl";
import Loader from "../../components/Shared/Loader/Loader";
import Experts from "../../components/Reusable/Experts/Experts";
import { useGetAllConsultancyServicesQuery } from "../../redux/Features/ConsultancyService/consultancyServiceApi";

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

  const vastuCategories = [
    { id: "", name: "All", icon: <DoorOpenIcon /> },
    { id: "entrance", name: "Entrance", icon: <DoorOpenIcon /> },
    { id: "bedroom", name: "Bedroom", icon: <BedIcon /> },
    { id: "kitchen", name: "Kitchen", icon: <KitchenIcon /> },
    { id: "bathroom", name: "Bathroom", icon: <BathIcon /> },
    { id: "temple", name: "Temple", icon: <TempleIcon /> },
    { id: "garden", name: "Garden", icon: <Plant2Icon /> },
  ];

  const initialVastuTips = [
    {
      title: "Main Entrance",
      icon: <DoorOpenIcon />,
      category: "entrance",
      tips: [
        "North-East entrance is considered most auspicious for overall prosperity.",
        "Avoid obstructions like poles or large trees directly in front of the main door.",
        "The entrance door should always open inward, clockwise.",
        "Keep the entrance area well-lit and clean.",
      ],
    },
    {
      title: "Bedroom",
      icon: <BedIcon />,
      category: "bedroom",
      tips: [
        "Master bedroom should ideally be in the South-West direction.",
        "Sleep with your head pointing South or East for peaceful sleep.",
        "Avoid placing mirrors directly opposite the bed.",
        "Use calming colors for bedroom walls.",
      ],
    },
    {
      title: "Kitchen",
      icon: <KitchenIcon />,
      category: "kitchen",
      tips: [
        "The South-East corner is ideal for the kitchen (Agni corner).",
        "Cooking stove should be placed such that the cook faces East.",
        "Water source (sink, tap) should be in the North-East of the kitchen.",
        "Avoid placing the stove and sink directly opposite each other.",
      ],
    },
    {
      title: "Bathroom & Toilet",
      icon: <BathIcon />,
      category: "bathroom",
      tips: [
        "North-West is the preferred direction for bathrooms and toilets.",
        "Toilet seat should ideally face South or North.",
        "Ensure good ventilation and keep the bathroom door closed when not in use.",
        "Avoid constructing toilets in the North-East or South-West corners.",
      ],
    },
    {
      title: "Temple Room (Pooja Room)",
      icon: <TempleIcon />,
      category: "temple",
      tips: [
        "The North-East (Ishan Kona) is the most sacred direction for a pooja room.",
        "Idols should face West or East.",
        "Keep the pooja room clean, clutter-free, and well-lit.",
        "Avoid placing the pooja room under a staircase or next to a bathroom.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans pb-20">
      <PageHeader title={"Vastu Shastra"} />

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
              placeholder={"Search Vastu tips, experts..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange ${
                theme === "light"
                  ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                  : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
              }`}
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {vastuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 flex items-center ${
                selectedCategory === category.id
                  ? "bg-brand-orange text-white font-semibold"
                  : `${
                      theme === "light"
                        ? "bg-light-surface-alt text-light-text-secondary hover:bg-gray-200"
                        : "bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary"
                    }`
              }`}
            >
              {React.cloneElement(category.icon, {
                className: `w-4 h-4 mr-1.5 ${
                  selectedCategory === category.id
                    ? "text-white"
                    : theme === "light"
                    ? "text-light-text-secondary"
                    : "text-dark-text-secondary"
                }`,
              })}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <main className="p-4 pt-0 space-y-6">
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
          {initialVastuTips.length > 0 ? (
            <div className="space-y-3">
              {initialVastuTips.map((tip, index) => (
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
                    {React.cloneElement(tip.icon, {
                      className: `w-6 h-6 text-brand-orange`,
                    })}
                    <span
                      className={`font-medium text-sm ${
                        theme === "light"
                          ? "text-light-text-primary"
                          : "text-dark-text-primary"
                      }`}
                    >
                      {tip.title}
                    </span>
                    <ArrowRightIcon className="w-4 h-4 ml-auto transform transition-transform details-arrow" />
                  </summary>
                  <div
                    className={`p-3 border-t text-xs space-y-1.5 ${
                      theme === "light"
                        ? "border-gray-200 text-light-text-secondary bg-light-surface-alt/50"
                        : "border-gray-700 text-dark-text-secondary bg-dark-surface/50"
                    }`}
                  >
                    {tip.tips.map((t, i) => (
                      <p key={i}>{t}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          ) : (
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
    </div>
  );
};

export default Vastu;
