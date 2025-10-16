/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { SearchLucideIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { MicIcon, StopCircleIcon } from "lucide-react";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import { useGetAllAyurvedaQuery } from "../../redux/Features/Ayurveda/ayurvedaApi";
import Loader from "../../components/Shared/Loader/Loader";
import AyurvedaCard from "../../components/AyurvedaPage/AyurvedaCard/AyurvedaCard";

const Ayurveda = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // Get all Ayurveda items
  const { data, isLoading, isFetching } = useGetAllAyurvedaQuery({
    keyword: searchQuery,
    category: selectedCategory,
  });

  const { data: categoryData } = useGetAllCategoriesQuery({});
  const filteredCategory = categoryData?.data?.filter(
    (category: any) => category.areaName === "ayurveda"
  );

  const allCategories = filteredCategory?.map(
    (category: any) => category.category
  );

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      const recognitionInstance: SpeechRecognition = new SpeechRecognitionAPI();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US"; // Consider making this dynamic based on app language

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };
      recognitionInstance.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error, event.message);
        setIsListening(false);
      };
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      recognitionRef.current = recognitionInstance;
    } else {
      console.warn("Speech recognition not supported in this browser.");
    }
  }, []);

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported or not initialized.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Error starting voice search:", err);
        setIsListening(false);
      }
    }
  };

  console.log(data);
  return (
    <div
      className={`min-h-screen font-sans ${
        theme === "light"
          ? "bg-light-primary text-light-text-primary"
          : "bg-primary text-dark-text-primary"
      }`}
    >
      <PageHeader title={"Ayurdeva"} />

      <div className="p-4 pb-[90px] flex flex-col gap-5">
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
              placeholder="Search ayurdeva..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange transition-shadow focus:shadow-lg ${
                theme === "light"
                  ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                  : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
              }`}
              aria-label="Search ayurdeva"
            />
            <button
              onClick={handleVoiceSearch}
              aria-label={
                isListening ? "Stop voice search" : "Start voice search"
              }
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full transition-colors ${
                isListening
                  ? "text-red-500 animate-ping"
                  : "text-brand-orange hover:text-opacity-80"
              }`}
              disabled={!recognitionRef.current}
            >
              {isListening ? (
                <StopCircleIcon className="w-5 h-5" />
              ) : (
                <MicIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isListening && (
          <div className="px-4">
            <div
              className={`rounded-lg p-2 mt-1 text-center ${
                theme === "light"
                  ? "bg-light-surface-alt"
                  : "bg-dark-surface-alt"
              }`}
            >
              <div
                className={`flex items-center justify-center gap-2 text-xs ${
                  theme === "light"
                    ? "text-light-text-secondary"
                    : "text-dark-text-secondary"
                }`}
              >
                <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                <span>Listening...</span>
              </div>
            </div>
          </div>
        )}

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.data?.length < 1 ? (
            <p
              className={`text-center py-6 text-sm ${
                theme === "light"
                  ? "text-light-text-tertiary"
                  : "text-dark-text-tertiary"
              }`}
            >
              No ayurveda found
            </p>
          ) : isLoading || isFetching ? (
            <Loader />
          ) : (
            data?.data?.map((recipe: any) => (
              <AyurvedaCard key={recipe._id} {...recipe} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Ayurveda;
