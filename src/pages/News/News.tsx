/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useTheme } from "../../contexts/ThemeContext";
import {
  CalendarIcon,
  FacebookIcon,
  LanguagesIcon,
  Link2Icon,
  LinkedinIcon,
  SearchLucideIcon,
  TwitterIcon,
  XIcon,
} from "../../constants";
import { useGetAllNewsQuery } from "../../redux/Features/News/newsApi";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import Loader from "../../components/Shared/Loader/Loader";
import { formatDate } from "../../utils/formatDate";
import { LANGUAGES } from "../../utils/allLanguages";
import { X } from "lucide-react";

const categoryGradients = [
  "from-blue-500 to-sky-500 dark:from-blue-600 dark:to-sky-600",
  "from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600",
  "from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600",
  "from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600",
  "from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600",
  "from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600",
  "from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600",
];
const News = () => {
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState(LANGUAGES[0]);
  const [translatedArticles, setTranslatedArticles] = useState([]);
  const { data, isLoading, isFetching } = useGetAllNewsQuery({
    category: selectedCategory,
    keyword: searchQuery,
  });

  console.log(translatedArticles);

  useEffect(() => {
    const langCode = selectedLang?.code;
    if (!data?.data || !langCode) {
      setTranslatedArticles([]);
      return;
    }
    console.log(langCode);
    const filtered = data.data
      .map((article: any) => {
        let translations = article?.translations;
        if (!translations) return null;

        // 🔹 Convert array → object if needed
        if (Array.isArray(translations)) {
          translations = translations.reduce((acc: any, t: any) => {
            if (t?.language) acc[t.language] = t;
            return acc;
          }, {});
        }
        const hasLang =
          translations?.[langCode] ||
          translations?.[langCode.toLowerCase?.()] ||
          translations?.[langCode.toUpperCase?.()];

        if (!hasLang) return null;

        return { ...article, translated: hasLang };
      })
      .filter(Boolean); // remove nulls (articles without that language)

    setTranslatedArticles(filtered);
    console.log("✅ Translated articles:", filtered);
  }, [data, selectedLang]);

  const { data: categoryData } = useGetAllCategoriesQuery({});
  const filteredCategory = categoryData?.data?.filter(
    (category: any) => category.areaName === "news"
  );
  const allCategories = filteredCategory?.map(
    (category: any) => category.category
  );

  const [selectedNewsItem, setSelectedNewsItem] = useState<any>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);

  const [showShareModal, setShowShareModal] = useState(false);
  const handleOpenArticleModal = (article: any) => {
    setSelectedNewsItem(article);
    setIsArticleModalOpen(true);
  };

  const handleSelect = (lang: { code: string; name: string }) => {
    setSelectedLang(lang);
    setShowModal(false);
  };

  return (
    <div
      className={`min-h-screen text-light-text-primary dark:text-dark-text-primary font-sans pb-20 ${
        theme === "light"
          ? "bg-white"
          : "bg-gray-800 animate-soft-breathing-shadow"
      }`}
    >
      <PageHeader title={"News Feed"} />

      <div
        className={`p-4 space-y-3 sticky top-[60px] z-30 border-b ${
          theme === "light"
            ? "bg-light-primary border-gray-200"
            : "bg-primary border-gray-700/50 shadow-md"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search & language */}
          <div className="flex items-center gap-3 relative w-full">
            {/* Search Input */}
            <div className="flex-1 relative">
              <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary focus:ring-2 focus:ring-brand-orange transition-shadow focus:shadow-lg ${
                  theme === "light"
                    ? "bg-white"
                    : "bg-gray-800 animate-soft-breathing-shadow"
                }`}
              />
            </div>

            {/* Language Button */}
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-brand-orange text-white font-medium hover:opacity-90 transition"
            >
              <LanguagesIcon className="w-5 h-5" />
              <span className="hidden sm:inline">
                {selectedLang.code.toUpperCase()}
              </span>
            </button>

            {/* Modal Overlay */}
            {showModal && (
              <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
                onClick={() => setShowModal(false)}
              ></div>
            )}

            {/* Modal Content */}
            <div
              className={`fixed top-1/2 left-1/2 z-50 w-80 h-[70vh] overflow-y-auto p-4 rounded-2xl shadow-xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                showModal
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90 pointer-events-none"
              } ${theme === "light" ? "bg-white" : "bg-gray-800"}`}
            >
              {/* Header with close button */}
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-brand-orange">
                  Choose Language
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>

              {/* Language list */}
              <div className="space-y-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleSelect(lang)}
                    className={`w-full py-2 px-3 rounded-lg text-left transition ${
                      selectedLang.code === lang.code
                        ? "bg-brand-orange text-white"
                        : theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* Categories */}
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
      </div>

      {/* mapping data */}
      <div
        className={`p-4 space-y-4 pt-2 ${
          theme === "light"
            ? "bg-white"
            : "bg-gray-800 animate-soft-breathing-shadow"
        }`}
      >
        {translatedArticles?.length === 0 ? (
          <p
            className={`text-center py-6 text-sm ${
              theme === "light"
                ? "text-light-text-tertiary"
                : "text-dark-text-tertiary"
            }`}
          >
            No news found
          </p>
        ) : isLoading || isFetching ? (
          <Loader />
        ) : (
          translatedArticles?.map((article: any) => {
            const translated = article?.translations?.[selectedLang.code];

            return (
              <div
                key={translated?._id}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl dark:hover:shadow-brand-yellow/20 hover:shadow-brand-orange/20 cursor-pointer transform hover:-translate-y-1 ${
                  theme === "light"
                    ? "bg-light-surface"
                    : "bg-dark-card animate-soft-breathing-shadow"
                }`}
                style={
                  {
                    "--tw-shadow-color": "rgba(255,193,7,0.1)",
                  } as React.CSSProperties
                }
              >
                <img
                  src={article?.imageUrl}
                  alt={translated?.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`text-xs bg-brand-blue px-2 py-1 rounded-3xl text-white`}
                    >
                      {translated?.category}
                    </div>
                    <div
                      className="flex items-center gap-1"
                      title="Date published"
                    >
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{formatDate(translated?.createdAt)}</span>
                    </div>
                  </div>

                  <h2
                    className={`text-lg font-semibold mb-2 ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    }`}
                  >
                    {translated?.title}
                  </h2>

                  <p
                    className={`text-sm line-clamp-3 ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-dark-text-secondary"
                    }`}
                  >
                    {translated?.excerpt}
                  </p>

                  <div
                    className={`flex items-center justify-end text-xs mt-4 pt-3 ${
                      theme === "light"
                        ? "text-light-text-tertiary border-t border-gray-200"
                        : "text-dark-text-tertiary border-t border-gray-700"
                    }`}
                  >
                    <button
                      onClick={() =>
                        handleOpenArticleModal({
                          ...translated,
                          createdAt: article?.createdAt,
                        })
                      }
                      className="text-xs bg-brand-orange px-2 py-1 rounded text-white"
                    >
                      See more
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {showShareModal && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100]"
          onClick={() => setShowShareModal(false)}
        >
          <div
            className={`rounded-xl p-6 w-full max-w-xs shadow-2xl animate-soft-breathing-shadow ${
              theme === "light"
                ? "bg-light-surface text-light-text-primary"
                : "bg-dark-card text-dark-text-primary"
            }`}
            style={
              {
                "--tw-shadow-color":
                  theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,111,0,0.2)",
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gradient bg-gradient-to-r from-brand-orange to-brand-yellow">
                Share News
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-1.5 rounded-full transition-colors ${
                  theme === "light"
                    ? "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
                aria-label="Close share modal"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {(["facebook", "twitter", "linkedin", "copy"] as const).map(
                (platform, idx) => (
                  <button
                    key={platform}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 hover:shadow-lg transform hover:scale-105
                            bg-gradient-to-r ${
                              categoryGradients[idx % categoryGradients.length]
                            } text-white hover:brightness-110 focus:ring-white/50 bg-200% hover:animate-background-pan-fast`}
                  >
                    {platform === "facebook" && (
                      <FacebookIcon className="w-5 h-5" />
                    )}
                    {platform === "twitter" && (
                      <TwitterIcon className="w-5 h-5" />
                    )}
                    {platform === "linkedin" && (
                      <LinkedinIcon className="w-5 h-5" />
                    )}
                    {platform === "copy" && <Link2Icon className="w-5 h-5" />}
                    <span className="capitalize">
                      {platform === "copy" ? "Copy Link" : platform}
                    </span>
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {isArticleModalOpen && selectedNewsItem && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[90]"
          onClick={() => setIsArticleModalOpen(false)}
        >
          <div
            className={`rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-soft-breathing-shadow h-[70vh] overflow-y-auto ${
              theme === "light"
                ? "bg-light-surface text-light-text-primary"
                : "bg-dark-card text-dark-text-primary"
            }`}
            style={
              {
                "--tw-shadow-color":
                  theme === "light" ? "rgba(0,0,0,0.1)" : "rgba(255,111,0,0.2)",
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            <div
              className={`flex justify-between items-center p-4 rounded-t-xl sticky top-0 ${
                theme === "light"
                  ? "bg-light-surface border-gray-200"
                  : "bg-dark-card border-gray-700"
              }`}
            >
              <h2
                id="article-modal-title"
                className="text-lg font-semibold text-gradient bg-gradient-to-r from-brand-orange to-brand-yellow truncate bg-clip-text text-transparent pr-2"
                title="Title"
              >
                Full Article
              </h2>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className={`p-1.5 rounded-full transition-colors ${
                  theme === "light"
                    ? "text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div
              className={`p-4 border-t flex flex-col rounded-b-xl ${
                theme === "light"
                  ? "bg-light-surface border-gray-200"
                  : "bg-dark-card border-gray-700"
              }`}
            >
              <div className="flex items-center justify-between mb-4 text-sm">
                <div
                  className={`text-xs bg-brand-blue px-2 py-1 rounded-3xl text-white`}
                >
                  {selectedNewsItem?.category}
                </div>
                <div className="flex items-center gap-1" title="Date published">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  <span>{formatDate(selectedNewsItem.createdAt)}</span>
                </div>
              </div>
              <h2
                className={`text-lg font-semibold mb-2 ${
                  theme === "light"
                    ? "text-light-text-primary"
                    : "text-dark-text-primary"
                }`}
              >
                {selectedNewsItem?.title}
              </h2>

              <p
                className={`text-sm line-clamp-3 ${
                  theme === "light"
                    ? "text-light-text-secondary"
                    : "text-dark-text-secondary"
                }`}
              >
                {selectedNewsItem?.excerpt}
              </p>

              <div
                className={`text-sm mt-5 ${
                  theme === "light"
                    ? "text-light-text-secondary"
                    : "text-dark-text-secondary"
                }`}
                dangerouslySetInnerHTML={{ __html: selectedNewsItem?.content }}
              />

              <div className="flex items-center justify-between mt-3">
                <div
                  className={`text-xs ${
                    theme === "light"
                      ? "text-light-text-secondary"
                      : "text-dark-text-secondary"
                  }`}
                >
                  {formatDate(selectedNewsItem.createdAt)}
                </div>
                {/* <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleShare(selectedNewsItem);
                    setIsArticleModalOpen(false);
                  }}
                  className={`p-2 rounded-lg transition-colors transform hover:scale-105 ${
                    theme === "light"
                      ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <Share2Icon className="w-4 h-4" />
                </button>
              </div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
