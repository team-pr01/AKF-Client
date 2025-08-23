import { useEffect, useState } from "react";
import {
  BellIcon,
  CalendarIcon,
  MenuIcon,
  UserProfileIcon,
} from "../../../constants";
import { calculateVedicDate } from "../../../utils/vedicTime";
import type { VedicDate } from "../../../types";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import { useTheme } from "../../../contexts/ThemeContext";

const Navbar = () => {
  const [isHamburgerMenuOpen, setHamburgerMenuOpen] = useState<boolean>(false);
  const [currentVedicDate, setCurrentVedicDate] = useState<VedicDate>(
    calculateVedicDate()
  );
  const { theme } = useTheme();

  useEffect(() => {
    const updateDate = () => {
      setCurrentVedicDate(calculateVedicDate());
    };
    updateDate();
    const timerId = setInterval(updateDate, 24 * 60 * 60 * 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="sticky top-0 z-50">
      <header
        className={`px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow-md border-b transition-colors ${
          theme === "light"
            ? "bg-light-surface border-gray-200"
            : "bg-primary border-gray-700/30"
        }`}
      >
        {/* Left: Hamburger */}
        <div className="relative">
          <button
            aria-label="Open side menu"
            className={`p-2 transition-colors ${
              theme === "light"
                ? "text-gray-600 hover:text-brand-orange"
                : "text-gray-300 hover:text-brand-yellow"
            }`}
            onClick={() => setHamburgerMenuOpen(!isHamburgerMenuOpen)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Center: Vedic date */}
        <div className="text-center flex-1 min-w-0 px-2">
          {currentVedicDate ? (
            <div
              className={`flex items-center justify-center text-xs sm:text-sm font-semibold ${
                theme === "light"
                  ? "text-brand-orange"
                  : "text-brand-yellow"
              }`}
            >
              <CalendarIcon className="w-4 h-4 mr-1.5 opacity-80" />
              <span className="truncate">{`তিথি: ${currentVedicDate.tithi}, ${currentVedicDate.paksha}`}</span>
              <span className="mx-1 sm:mx-1.5 opacity-60">|</span>
              <span className="truncate">{`মাস: ${currentVedicDate.month}`}</span>
            </div>
          ) : (
            <div className="text-xl font-bold bg-gradient-to-r from-brand-orange to-brand-yellow text-transparent bg-clip-text">
              Vedic Wisdom
            </div>
          )}
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Link
            to={"/notifications"}
            className={`p-2 transition-colors ${
              theme === "light"
                ? "text-gray-600 hover:text-brand-orange"
                : "text-gray-300 hover:text-brand-yellow"
            }`}
          >
            <BellIcon className="w-6 h-6" />
          </Link>
          <Link
            to={"/my-profile"}
            className={`p-2 transition-colors ${
              theme === "light"
                ? "text-gray-600 hover:text-brand-orange"
                : "text-gray-300 hover:text-brand-yellow"
            }`}
          >
            <UserProfileIcon className="w-6 h-6" />
          </Link>
        </div>
      </header>

      {isHamburgerMenuOpen && (
        <HamburgerMenu
          isHamburgerMenuOpen={isHamburgerMenuOpen}
          setHamburgerMenuOpen={setHamburgerMenuOpen}
        />
      )}
    </div>
  );
};

export default Navbar;
