/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import {
  SearchLucideIcon,
  StopCircleIcon,
  MicIcon,
  BrainIcon,
  ClockIcon,
  StarIcon,
} from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import { useGetAllRecipiesQuery } from "../../redux/Features/Recipe/recipeApi";
import Loader from "../../components/Shared/Loader/Loader";
import { getEmbedUrl } from "../../utils/getEmbedUrl";
import GenerateRecipeModal from "../../components/FoodPage/GenerateRecipeModal/GenerateRecipeModal";

const Food = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { data, isLoading, isFetching } = useGetAllRecipiesQuery({
    category: selectedCategory,
    keyword: searchQuery,
  });
  const { data: categoryData } = useGetAllCategoriesQuery({});
  const filteredCategory = categoryData?.data?.filter(
    (category: any) => category.areaName === "recipe"
  );

  const allCategories = filteredCategory?.map(
    (category: any) => category.category
  );

  const [showAIModal, setShowAIModal] = useState(false);
  // const [showRecipeModal, setShowRecipeModal] = useState(false);
  // const [selectedRecipe, setSelectedRecipe] = useState(null);

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

  // const handleViewRecipe = (recipe: any) => {
  //   setSelectedRecipe(recipe);
  //   setShowRecipeModal(true);
  // };

  return (
    <div
      className={`min-h-screen font-sans ${
        theme === "light"
          ? "bg-light-primary text-light-text-primary"
          : "bg-primary text-dark-text-primary"
      }`}
    >
      <PageHeader title={"Vedic Food & Recipes"} />

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
          <button
            onClick={() => setShowAIModal(true)}
            className="bg-gradient-to-r from-brand-blue to-teal-500 hover:from-teal-500 hover:to-brand-blue bg-200% animate-background-pan-fast px-4 py-3 sm:py-0 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 text-white font-medium shadow-md hover:shadow-lg hover:shadow-brand-blue/40"
          >
            <BrainIcon className="w-5 h-5" />
            <span>AI Recipe</span>
          </button>
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
              No Vastu tips found
            </p>
          ) : isLoading || isFetching ? (
            <Loader />
          ) : (
            data?.data?.map((recipe: any) => (
              <div
                key={recipe.id}
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl dark:hover:shadow-brand-yellow/30 hover:shadow-brand-orange/30 hover:transform hover:-translate-y-1.5 ${
                  theme === "light"
                    ? "bg-light-surface"
                    : "bg-dark-card animate-soft-breathing-shadow"
                }`}
                style={
                  theme === "dark"
                    ? ({
                        "--tw-shadow-color": "rgba(255,193,7,0.1)",
                      } as React.CSSProperties)
                    : {}
                }
              >
                <div className="relative w-full h-48">
                  <iframe
                    src={getEmbedUrl(recipe?.videoUrl) as string}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    allow="autoplay; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-4">
                  <h3
                    className={`font-semibold text-lg mb-2 truncate ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    }`}
                    title={recipe.name}
                  >
                    {recipe.name}
                  </h3>
                  <div
                    className={`flex items-center gap-4 text-sm mb-3 ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-dark-text-secondary"
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <ClockIcon className="w-4 h-4" />
                      <span>{recipe.duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <StarIcon className="w-4 h-4 text-yellow-400" />
                      <span>{recipe.category}</span>
                    </div>
                  </div>
                  {/* <button
                  onClick={() => handleViewRecipe(recipe)}
                  className="w-full bg-gradient-to-r from-brand-orange to-yellow-500 hover:from-yellow-500 hover:to-brand-orange bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
                >
                  <span>View Recipe</span>
                  <ChevronRightIcon className="w-4 h-4" />
                </button> */}
                </div>
              </div>
            ))
          )}
        </div>

        {/* {showRecipeModal && selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowRecipeModal(false)}
        >
          <div
            className={`rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl animate-soft-breathing-shadow ${
              theme === "light"
                ? "bg-light-surface text-light-text-primary"
                : "bg-dark-card text-dark-text-primary"
            }`}
            style={
              {
                "--tw-shadow-color": "rgba(255,111,0,0.15)",
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-title"
          >
            <div className="flex justify-between items-center mb-4">
              <h2
                id="recipe-title"
                className="text-xl font-bold text-gradient bg-gradient-to-r from-brand-orange to-brand-yellow"
              >
                {selectedRecipe.name}
              </h2>
              <button
                onClick={() => setShowRecipeModal(false)}
                className={`p-1.5 rounded-full ${
                  theme === "light"
                    ? "text-gray-500 hover:bg-gray-200"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <img
              src={selectedRecipe.imageUrl}
              alt={selectedRecipe.name}
              className="w-full h-56 object-cover rounded-lg mb-4 shadow-md"
            />
            <div className="space-y-4 text-sm">
              <div>
                <h3
                  className={`font-semibold mb-1.5 ${
                    theme === "light"
                      ? "text-light-text-primary"
                      : "text-dark-text-primary"
                  }`}
                >
                  Cuisine:{" "}
                  <span
                    className={`font-normal ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-dark-text-secondary"
                    }`}
                  >
                    {selectedRecipe.cuisine}
                  </span>
                </h3>
                <h3
                  className={`font-semibold mb-1.5 ${
                    theme === "light"
                      ? "text-light-text-primary"
                      : "text-dark-text-primary"
                  }`}
                >
                  Cooking Time:{" "}
                  <span
                    className={`font-normal ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-dark-text-secondary"
                    }`}
                  >
                    {selectedRecipe.cookingTime}
                  </span>
                </h3>
                <h3
                  className={`font-semibold mb-2 ${
                    theme === "light"
                      ? "text-light-text-primary"
                      : "text-dark-text-primary"
                  }`}
                >
                  Difficulty:{" "}
                  <span
                    className={`font-normal ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-dark-text-secondary"
                    }`}
                  >
                    {selectedRecipe.difficulty}
                  </span>
                </h3>
              </div>
              <div>
                <h3
                  className={`font-semibold mb-1.5 ${
                    theme === "light"
                      ? "text-light-text-primary"
                      : "text-dark-text-primary"
                  }`}
                >
                  Ingredients:
                </h3>
                <ul
                  className={`list-disc list-inside space-y-1 pl-1 ${
                    theme === "light"
                      ? "text-light-text-secondary"
                      : "text-dark-text-secondary"
                  }`}
                >
                  {selectedRecipe.ingredients.map(
                    (ingredient: string, index: number) => (
                      <li key={index}>{ingredient}</li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <h3
                  className={`font-semibold mb-1.5 ${
                    theme === "light"
                      ? "text-light-text-primary"
                      : "text-dark-text-primary"
                  }`}
                >
                  Instructions:
                </h3>
                <ol
                  className={`list-decimal list-inside space-y-1.5 pl-1 ${
                    theme === "light"
                      ? "text-light-text-secondary"
                      : "text-dark-text-secondary"
                  }`}
                >
                  {selectedRecipe.instructions.map(
                    (instruction: string, index: number) => (
                      <li key={index}>{instruction}</li>
                    )
                  )}
                </ol>
              </div>
              <div
                className={`flex items-center justify-end pt-4 mt-4 ${
                  theme === "light"
                    ? "border-t border-gray-200"
                    : "border-t border-gray-700"
                }`}
              >
                <button
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors transform hover:scale-105 ${
                    theme === "light"
                      ? "text-red-600 hover:text-red-700 hover:bg-red-100"
                      : "text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  }`}
                >
                  <HeartIcon className="w-4 h-4" />
                  <span>Save Recipe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )} */}
      </div>

      {showAIModal && <GenerateRecipeModal setShowAIModal={setShowAIModal} />}
    </div>
  );
};

export default Food;
