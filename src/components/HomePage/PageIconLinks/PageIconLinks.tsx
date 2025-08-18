import React from "react";
import {
  YogaIcon,
  LandmarkIcon,
  FoodIcon,
  ConsultancyIcon,
  ShopIcon,
  VastuServiceIcon,
  JyotishServiceIcon,
} from "../../../constants";
import { Link } from "react-router-dom";

interface ServiceItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactElement<{ className?: string }>;
  gradientClasses: string;
}

const services: ServiceItem[] = [
  {
    id: "yoga",
    name: "Yoga",
    icon: <YogaIcon />,
    gradientClasses:
      "from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600",
    path: "/yoga",
  },
  {
    id: "temples",
    name: "Sanatan Sthal",
    icon: <LandmarkIcon />,
    gradientClasses:
      "from-sky-500 to-blue-500 dark:from-sky-600 dark:to-blue-600",
    path: "/temples",
  },
  {
    id: "food",
    name: "Food",
    icon: <FoodIcon />,
    gradientClasses:
      "from-emerald-500 to-green-500 dark:from-emerald-600 dark:to-green-600",
    path: "/food",
  },
  {
    id: "vastu",
    name: "Vastu",
    icon: <VastuServiceIcon />,
    gradientClasses:
      "from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600",
    path: "/vastu",
  },
  {
    id: "jyotish",
    name: "Jyotish",
    icon: <JyotishServiceIcon />,
    gradientClasses:
      "from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
    path: "/jyotish",
  },
  {
    id: "consult",
    name: "Consultancy",
    icon: <ConsultancyIcon />,
    gradientClasses:
      "from-amber-500 to-yellow-500 dark:from-amber-600 dark:to-yellow-600",
    path: "/consultancy",
  },
  {
    id: "shop",
    name: "Shop",
    icon: <ShopIcon />,
    gradientClasses:
      "from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600",
    path: "/shop",
  },
];

const PageIconLinks = () => {
  return (
    <section className="px-2 py-1">
      {" "}
      {/* Further reduced py */}
      <div className="flex overflow-x-auto scrollbar-hide gap-x-3 items-start pb-2 pt-1">
        {services.map((service, index) => (
          <Link
            to={service.path}
            key={service.id}
            aria-label={service.name}
            className="flex flex-col items-center space-y-1.5 text-center group flex-shrink-0 transform hover:scale-105 transition-transform duration-200 ease-in-out"
          >
            <div
              className={`p-3 bg-gradient-to-br ${service.gradientClasses} rounded-full group-hover:shadow-xl group-hover:shadow-brand-orange/30 dark:group-hover:shadow-brand-yellow/30 transition-all duration-300 aspect-square flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 border-2 border-white/20 dark:border-black/20 animate-soft-breathing-shadow group-hover:animate-background-pan-fast bg-200%`}
              style={
                {
                  animationDelay: `${index * 0.1}s`,
                  "--tw-shadow-color": "rgba(255,111,0,0.2)",
                } as React.CSSProperties
              }
            >
              {React.cloneElement(service.icon, {
                className:
                  "w-6 h-6 sm:w-7 sm:h-7 text-white transition-colors group-hover:animate-subtle-beat",
              })}
            </div>
            <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary group-hover:text-brand-orange dark:group-hover:text-brand-yellow transition-colors w-16 truncate">
              {service.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PageIconLinks;
