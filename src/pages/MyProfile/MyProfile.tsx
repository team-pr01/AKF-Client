/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  EditIcon,
  SettingsIcon,
  ChevronRightIcon,
  AwardIcon,
  LogOutIcon,
} from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { logout, useCurrentUser } from "../../redux/Features/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import { CgEnter } from "react-icons/cg";

const MyProfile = () => {
  const user = useSelector(useCurrentUser) as any;
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const StatItem: React.FC<{
    icon: React.ReactElement<{ className?: string }>;
    label: string;
    value: string | number;
  }> = ({ icon, label, value }) => (
    <div
      className={`p-3 rounded-lg flex items-center gap-3 ${
        theme === "light" ? "bg-light-surface shadow" : "bg-dark-card shadow-md"
      }`}
    >
      {React.cloneElement(icon, { className: "w-6 h-6 text-brand-orange" })}
      <div>
        <p
          className={`text-sm ${
            theme === "light"
              ? "text-light-text-secondary"
              : "text-dark-text-secondary"
          }`}
        >
          {label}
        </p>
        <p
          className={`text-lg font-semibold ${
            theme === "light"
              ? "text-light-text-primary"
              : "text-dark-text-primary"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen font-sans ${
            theme === "light"
              ? "bg-light-primary text-light-text-primary"
              : "bg-primary text-dark-text-primary"
          }`}>
      <PageHeader title="My Profile" />
      <main className="p-4 space-y-6 pb-20">
        <section
          className={`rounded-xl p-5 sm:p-6 text-center shadow-lg ${
            theme === "light" ? "bg-light-surface" : "bg-dark-card"
          }`}
        >
          {user ? (
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full mx-auto mb-4 border-4 border-brand-orange object-cover shadow-md"
            />
          ) : (
            <div className="flex items-center justify-center mb-4">
              <User className="text-center" />
            </div>
          )}
          <h2
            className={`text-xl sm:text-2xl font-bold ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            {user?.name || "Vedic User"}
          </h2>
          <p
            className={`text-sm mb-1 ${
              theme === "light"
                ? "text-light-text-secondary"
                : "text-dark-text-secondary"
            }`}
          >
            {user?.email || "You are not logged in"}
          </p>
          {user ? (
            <button
              onClick={() => alert("Edit Profile functionality coming soon!")}
              className={`mt-4 text-brand-orange rounded-lg px-5 py-2 text-sm font-medium flex items-center justify-center gap-2 mx-auto transition-colors
                        ${
                          theme === "light"
                            ? "bg-brand-orange/10 hover:bg-brand-orange/20"
                            : "bg-brand-orange/20 hover:bg-brand-orange/30"
                        }`}
            >
              <EditIcon className="w-4 h-4" />
              Edit Profile
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
        </section>

        {user && (
          <section>
            <h3
              className={`text-md font-semibold uppercase mb-3 px-1 ${
                theme === "light"
                  ? "text-light-text-secondary"
                  : "text-dark-text-secondary"
              }`}
            >
              Activity Summary
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* <StatItem
              icon={<BookOpenIcon />}
              label="Mantras Saved"
              value={userProfile.stats?.mantrasSaved || 0}
            /> */}
              <StatItem
                icon={<AwardIcon />}
                label="Quizzes Taken"
                value={user.totalQuizTaken || 0}
              />
              {/* <StatItem
              icon={<ArticleIcon />}
              label="Articles Read"
              value={userProfile.stats?.articlesRead || 0}
            />
            <StatItem
              icon={<HeartIcon />}
              label="News Liked"
              value={userProfile.stats?.newsLiked || 0}
            />
            <StatItem
              icon={<FlagIcon />}
              label="Mantras Reported"
              value={userProfile.stats?.mantrasReported || 0}
            />
            <StatItem
              icon={<ListChecksIcon />}
              label="Total Activities"
              value={userProfile.stats?.totalActivities || 0}
            />
            <StatItem
              icon={<RecipeIcon />}
              label="Recipes Generated"
              value={userProfile.stats?.recipesGenerated || 0}
            />
            <StatItem
              icon={<ConsultancyHiredIcon />}
              label="Consultancies Hired"
              value={userProfile.stats?.consultanciesHired || 0}
            /> */}
            </div>
          </section>
        )}

        {user && (
          <section>
            <h3
              className={`text-md font-semibold uppercase mb-3 px-1 ${
                theme === "light"
                  ? "text-light-text-secondary"
                  : "text-dark-text-secondary"
              }`}
            >
              Account & App
            </h3>
            <div className="space-y-3">
              <button
                //   onClick={onNavigateToSettings}
                className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-lg transition-colors text-left 
                            ${
                              theme === "light"
                                ? "bg-light-surface hover:bg-gray-100 shadow"
                                : "bg-dark-card hover:bg-gray-700/70 shadow-md"
                            }`}
              >
                <Link to={"/settings"} className="flex items-center gap-3">
                  <SettingsIcon className="w-5 h-5 text-brand-orange" />
                  <span
                    className={`text-sm sm:text-base ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    }`}
                  >
                    App Settings
                  </span>
                </Link>
                <ChevronRightIcon
                  className={`w-5 h-5 ${
                    theme === "light"
                      ? "text-light-text-tertiary"
                      : "text-dark-text-tertiary"
                  }`}
                />
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 dark:bg-red-600/20 dark:hover:bg-red-600/30 transition-colors text-red-500 dark:text-red-400 rounded-lg py-3 text-sm font-medium"
              >
                <LogOutIcon className="w-5 h-5" />
                Logout
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MyProfile;
