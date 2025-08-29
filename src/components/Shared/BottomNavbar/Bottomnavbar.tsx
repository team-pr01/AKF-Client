import React from "react";
import {
  // AkfPlaceholderIcon,
  EmergencyIcon,
  LearnIcon,
  NewsIcon,
} from "../../../constants";
import { Link, useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import logo from "../../../assets/logo.png"

const BottomNavbar = () => {
  const { theme } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: "/learn", name: "Learn", icon: <LearnIcon /> },
    { path: "/ai-chat", name: "AI Chat", icon: <MessageCircle /> },
    { path: "/", name: "Home", image: logo },
    { path: "/news", name: "News", icon: <NewsIcon /> },
    { path: "/emergency", name: "Emergency", icon: <EmergencyIcon /> },
  ];

  const bgClass = theme === "light" ? "bg-light-surface border-gray-200" : "bg-dark-surface border-gray-700/50";
  const hoverBgClass = theme === "light" ? "hover:bg-light-surface-alt/50" : "hover:bg-dark-surface-alt/50";

  return (
    <nav className={`fixed bottom-0 left-0 right-0 shadow-top-md z-40 border-t ${bgClass}`}>
      <div className="max-w-md mx-auto h-16 flex justify-around items-center px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const isEmergency = item.path === "/emergency";

          const iconColorClass = isActive
            ? theme === "light"
              ? "text-brand-orange"
              : "text-brand-yellow"
            : isEmergency
            ? theme === "light"
              ? "text-red-500 group-hover:text-brand-orange"
              : "text-red-400 group-hover:text-brand-yellow"
            : theme === "light"
            ? "text-gray-500 group-hover:text-brand-orange"
            : "text-gray-400 group-hover:text-brand-yellow";

          const textColorClass = isActive
            ? theme === "light"
              ? "text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow font-semibold"
              : "text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow font-semibold"
            : isEmergency
            ? iconColorClass
            : iconColorClass;

          if (item.path === "/") {
            return (
              <Link key={item.path} to={item.path}>
                <button
                  aria-label={item.name}
                  className="flex flex-col items-center justify-center text-center -mt-6 group transition-all duration-300"
                >
                  <div
                    className={`size-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-105 ${
                      isActive
                        ? theme === "light"
                          ? "animate-akf-active-pulse bg-gradient-to-br from-brand-orange to-orange-600"
                          : "animate-akf-active-pulse bg-gradient-to-br from-brand-orange to-orange-500"
                        : theme === "light"
                        ? "bg-gradient-to-br from-brand-blue to-teal-400"
                        : "bg-gradient-to-br from-brand-blue to-teal-500"
                    }`}
                  >
                    { item?.icon && React.cloneElement(item.icon, { className: "w-8 h-8 text-white" })}
                    {
                      item.image &&
                      <img src={item.image} className="siz1 rounded-full" />
                    }
                  </div>
                  <span className={`text-xs mt-1 transition-colors ${textColorClass}`}>
                    {item.name}
                  </span>
                </button>
              </Link>
            );
          }

          return (
            <Link key={item.path} to={item.path}>
              <button
                aria-label={item.name}
                className={`flex flex-col items-center justify-center text-center p-1 flex-1 group transition-all duration-200 ease-in-out rounded-md transform hover:scale-105 ${hoverBgClass}`}
              >
                <div className={`mb-0.5 transition-colors ${iconColorClass} ${isActive && !isEmergency ? "animate-subtle-beat" : ""}`}>
                  {item.icon && React.cloneElement(item.icon, { className: "w-5 h-5" })}
                </div>
                <span className={`text-xs transition-colors ${textColorClass}`}>{item.name}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavbar;
