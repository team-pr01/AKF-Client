/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  ChevronRightIcon,
  ShieldCheckIcon,
  InfoIcon,
  LogOutIcon,
  UserProfileIcon as AccountIcon,
  PaletteIcon,
  UsersIcon,
  XIcon,
  SearchLucideIcon,
} from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, useCurrentUser } from "../../redux/Features/Auth/authSlice";
import { CgEnter } from "react-icons/cg";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const user = useSelector(useCurrentUser) as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [communityUpdates, setCommunityUpdates] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [languageSearchTerm, setLanguageSearchTerm] = useState("");

  //   const filteredAppLanguages = appLanguages.filter(lang =>
  //     lang.name.toLowerCase().includes(languageSearchTerm.toLowerCase()) ||
  //     lang.code.toLowerCase().includes(languageSearchTerm.toLowerCase())
  //   );

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const SettingItem: React.FC<{
    icon: React.ReactElement<{ className?: string }>;
    label: string;
    value?: string;
    onClick?: () => void;
    isToggle?: boolean;
    toggleValue?: boolean;
    onToggle?: (value: boolean) => void;
  }> = ({ icon, label, value, onClick, isToggle, toggleValue, onToggle }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between p-3.5 sm:p-4 bg-light-surface dark:bg-dark-surface-alt hover:bg-gray-200 dark:hover:bg-gray-700/70 rounded-lg transition-colors text-left ${
        onClick ? "cursor-pointer" : "cursor-default"
      }`}
      disabled={!onClick && !isToggle}
      aria-label={label}
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { className: "w-5 h-5 text-brand-orange" })}
        <span className="text-sm sm:text-base text-light-text-primary dark:text-dark-text-primary">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary truncate max-w-[100px] sm:max-w-[150px]">
            {value}
          </span>
        )}
        {isToggle && onToggle && (
          <label
            htmlFor={`toggle-${label.replace(/\s+/g, "-")}`}
            className="relative inline-flex items-center cursor-pointer"
          >
            <input
              type="checkbox"
              id={`toggle-${label.replace(/\s+/g, "-")}`}
              className="sr-only peer"
              checked={toggleValue}
              onChange={(e) => onToggle(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-brand-orange rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-500 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
          </label>
        )}
        {onClick && !isToggle && (
          <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" />
        )}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-light-primary dark:bg-black text-light-text-primary dark:text-white font-sans">
      <PageHeader title="Settings" />
      <main className="p-4 space-y-6 pb-20">
        <section>
          <h2 className="text-xs font-semibold text-light-text-tertiary dark:text-gray-500 uppercase mb-2 px-1">
            General
          </h2>
          <div className="space-y-2">
            {/* <SettingItem 
              icon={<LangSettingIcon />} 
              label={"Language"} 
              value={currentLanguage.name} 
              onClick={() => setShowLanguageModal(true)}
            /> */}
            <SettingItem
              icon={<PaletteIcon />}
              label={"Theme"}
              isToggle={true}
              toggleValue={theme === "dark"}
              onToggle={() => toggleTheme()}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-light-text-tertiary dark:text-gray-500 uppercase mb-2 px-1">
            Notifications
          </h2>
          <div className="space-y-2">
            <SettingItem
              icon={<UsersIcon />}
              label="Community Updates"
              isToggle={true}
              toggleValue={communityUpdates}
              onToggle={setCommunityUpdates}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-light-text-tertiary dark:text-gray-500 uppercase mb-2 px-1">
            Account
          </h2>
          <div className="space-y-2">
            <SettingItem
              icon={<AccountIcon />}
              label="Manage Account"
              onClick={() => alert("Manage Account page coming soon!")}
            />
            <SettingItem
              icon={<ShieldCheckIcon />}
              label="Data & Privacy"
              onClick={() => alert("Data & Privacy info coming soon!")}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-light-text-tertiary dark:text-gray-500 uppercase mb-2 px-1">
            About
          </h2>
          <div className="space-y-2">
            <SettingItem
              icon={<InfoIcon />}
              label={`About Vedic Wisdom`}
              onClick={() => alert("Vedic Wisdom")}
            />
            <SettingItem
              icon={<InfoIcon />}
              label="Version"
              value="1.0.0 (Mock)"
            />
          </div>
        </section>

        <div className="pt-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-600/20 dark:hover:bg-red-600/30 transition-colors text-red-500 dark:text-red-400 rounded-lg py-3 text-sm font-medium"
            >
              <LogOutIcon className="w-5 h-5" />
              Logout
            </button>
          ) : (
            <Link
              to="/auth/login"
              className={`mt-4 text-brand-orange rounded-lg px-5 py-2 text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors
                        ${
                          theme === "light"
                            ? "bg-brand-orange/10 hover:bg-brand-orange/20"
                            : "bg-brand-orange/20 hover:bg-brand-orange/30"
                        }`}
            >
              <CgEnter className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </main>

      {showLanguageModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[100]"
          onClick={() => setShowLanguageModal(false)}
        >
          <div
            className="bg-dark-surface text-white rounded-xl w-full max-w-md shadow-2xl max-h-[80vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-brand-orange">
                Select Language
              </h2>
              <button
                onClick={() => setShowLanguageModal(false)}
                className="p-1.5 text-gray-400 hover:text-white"
                aria-label="Close language selection"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 border-b border-gray-700">
              <div className="relative">
                <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search languages..."
                  value={languageSearchTerm}
                  onChange={(e) => setLanguageSearchTerm(e.target.value)}
                  className="w-full bg-dark-surface-alt pl-9 pr-3 py-2 rounded-md text-sm text-gray-200 focus:ring-1 focus:ring-brand-orange outline-none"
                />
              </div>
            </div>
            {/* <div className="flex-grow overflow-y-auto p-1">
              {filteredAppLanguages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLanguage(lang);
                    setShowLanguageModal(false);
                    setLanguageSearchTerm('');
                  }}
                  className={`w-full text-left px-3 py-2.5 text-sm rounded-md my-0.5
                    ${currentLanguage.code === lang.code 
                      ? 'bg-brand-orange text-white font-medium' 
                      : 'text-gray-300 hover:bg-dark-surface-alt hover:text-brand-orange'
                    }`}
                >
                  {lang.name} <span className="text-xs opacity-60">({lang.code})</span>
                </button>
              ))}
              {filteredAppLanguages.length === 0 && (
                <p className="text-center text-gray-500 py-4 text-sm">No languages found matching "{languageSearchTerm}".</p>
              )}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
