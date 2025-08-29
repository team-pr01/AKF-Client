/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  UserProfileIcon,
  SettingsIcon,
  LogOutIcon,
  XIcon,
  HelpCircleIcon,
} from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { logout, useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

const HamburgerMenu = ({
  isHamburgerMenuOpen,
  setHamburgerMenuOpen,
}: {
  isHamburgerMenuOpen: boolean;
  setHamburgerMenuOpen: any;
}) => {
  const user = useSelector(useCurrentUser) as any;
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const navItemClass = `z-50 w-full text-left px-3 py-3 text-sm rounded-md flex items-center gap-3 transition-colors 
                       ${
                         theme === "light"
                           ? "text-light-text-secondary hover:bg-light-surface-alt hover:text-brand-orange"
                           : "text-gray-300 hover:bg-brand-orange hover:text-white"
                       }`;

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 
              transition-opacity duration-500 ease-in-out
              ${
                isHamburgerMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
        onClick={() => setHamburgerMenuOpen(false)}
        aria-hidden={!isHamburgerMenuOpen}
      />

      {/* Side Navigation Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-72 shadow-xl z-50 
              transform transition-all duration-500 ease-in-out
              ${theme === "light" ? "bg-light-surface" : "bg-dark-surface"}
              ${
                isHamburgerMenuOpen
                  ? "translate-x-0 opacity-100 delay-150"
                  : "-translate-x-full opacity-0 delay-0"
              }`}
        role="navigation"
        aria-label="Main menu"
        aria-hidden={!isHamburgerMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={`flex items-center justify-between p-4 border-b ${
              theme === "light" ? "border-gray-200" : "border-gray-700"
            }`}
          >
            {user ? (
              <div className="flex items-center gap-2">
                <img
                  src={
                    user.avatar ||
                    `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
                      user.name || "User"
                    )}`
                  }
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h2
                    className={`text-md font-semibold truncate max-w-[150px] ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-white"
                    }`}
                  >
                    {user.name || "Vedic User"}
                  </h2>
                  <p
                    className={`text-xs truncate max-w-[150px] ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-gray-400"
                    }`}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <h2
                className={`text-xl font-semibold ${
                  theme === "light" ? "text-light-text-primary" : "text-white"
                }`}
              >
                Vedic Wisdom
              </h2>
            )}
            <button
              onClick={() => setHamburgerMenuOpen(false)}
              className={`p-2 rounded-full transition-colors ${
                theme === "light"
                  ? "text-gray-500 hover:bg-gray-200"
                  : "text-gray-400 hover:text-white hover:bg-gray-700"
              }`}
              aria-label="Close menu"
            >
              <XIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-grow p-4 space-y-2">
            <Link
              to={"/my-profile"}
              onClick={() => setHamburgerMenuOpen(false)}
              className={navItemClass}
            >
              <UserProfileIcon
                className={`w-5 h-5 ${
                  theme === "light"
                    ? "text-light-text-tertiary group-hover:text-brand-orange"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />{" "}
              My Profile
            </Link>
            <Link
              to={"/settings"}
              onClick={() => setHamburgerMenuOpen(false)}
              className={navItemClass}
            >
              <SettingsIcon
                className={`w-5 h-5 ${
                  theme === "light"
                    ? "text-light-text-tertiary group-hover:text-brand-orange"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />{" "}
              Settings
            </Link>
            {/* <button
              onClick={() => {
                onNavigateMembership();
                onClose();
              }}
              className={navItemClass}
            >
              <GemIcon
                className={`w-5 h-5 ${
                  theme === "light"
                    ? "text-light-text-tertiary group-hover:text-brand-orange"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />{" "}
              Membership
            </button> */}
            <Link
              to={"/emergency"}
              onClick={() => setHamburgerMenuOpen(false)}
              className={navItemClass}
            >
              <HelpCircleIcon
                className={`w-5 h-5 ${
                  theme === "light"
                    ? "text-light-text-tertiary group-hover:text-brand-orange"
                    : "text-gray-400 group-hover:text-white"
                }`}
              />{" "}
              Emergency Support
            </Link>
          </nav>

          {/* Footer/Logout */}
          <div
            className={`p-4 border-t ${
              theme === "light" ? "border-gray-200" : "border-gray-700"
            }`}
          >
            {
              user ?
              <button
              onClick={() => {
                handleLogout();
                setHamburgerMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-3 text-sm rounded-md flex items-center gap-3 transition-colors
                          ${
                            theme === "light"
                              ? "text-red-500 hover:bg-red-500/10 hover:text-red-600"
                              : "text-red-400 hover:bg-red-500/20 hover:text-red-300"
                          }`}
            >
              <LogOutIcon className="w-5 h-5" /> Logout
            </button>
            :
            <Link
              to={"/auth/login"}
              className={`w-full text-left px-3 py-3 text-sm rounded-md flex items-center gap-3 transition-colors
                          ${
                            theme === "light"
                              ? "text-red-500 hover:bg-red-500/10 hover:text-red-600"
                              : "text-red-400 hover:bg-red-500/20 hover:text-red-300"
                          }`}
            >
              <LogIn className="w-5 h-5" /> Login
            </Link>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default HamburgerMenu;
