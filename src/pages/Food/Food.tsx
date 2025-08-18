/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import {
  AkfPlaceholderIcon,
  EmergencyIcon,
  HomeIcon,
  LearnIcon,
  SearchLucideIcon,
  ShoppingBagIcon,
  NewsIcon as NewsNavIcon,
  StopCircleIcon,
  MicIcon,
  BrainIcon,
  ClockIcon,
  StarIcon,
  ChevronRightIcon,
  XIcon,
  HeartIcon,
  LoaderIcon,
} from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";

const Food = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAIModal, setShowAIModal] = useState(false);
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipePrompt, setRecipePrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

//   const handleGenerateRecipe = async () => {
//     if (!recipePrompt.trim()) return;
//     setIsGenerating(true);
//     setError(null);
//     try {
//       const recipe = await AIRecipeService.generateRecipe(recipePrompt);
//       setRecipePrompt("");
//       setShowAIModal(false);
//       setRecipes((prev) => [recipe, ...prev.filter((r) => r.id !== recipe.id)]);
//       setSelectedRecipe(recipe);
//       setShowRecipeModal(true);
//     } catch (err: any) {
//       console.error("Error generating recipe:", err);
//       setError(err.message || "Failed to generate recipe. Please try again.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

  const initialRecipes = [
    {
      id: "sattvic-khichdi",
      name: "Sattvic Khichdi",
      category: "sattvic",
      ingredients: [
        "Moong Dal (1/2 cup)",
        "Rice (1/2 cup)",
        "Ghee (1 tbsp)",
        "Cumin Seeds (1 tsp)",
        "Turmeric (1/2 tsp)",
        "Water (3 cups)",
        "Salt to taste",
      ],
      instructions: [
        "Wash rice and dal thoroughly.",
        "Heat ghee in a pressure cooker.",
        "Add cumin seeds and let them crackle.",
        "Add rice, dal, turmeric, and salt.",
        "Add water and pressure cook for 3-4 whistles.",
        "Let pressure release naturally. Serve hot with a dollop of ghee.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop&q=60",
      cookingTime: "30 mins",
      difficulty: "Easy",
      cuisine: "Vedic",
    },
    {
      id: "prasad-halwa",
      name: "Prasad Halwa",
      category: "prasad",
      ingredients: [
        "Semolina (1 cup)",
        "Ghee (1/2 cup)",
        "Sugar (1 cup)",
        "Water (2 cups)",
        "Cardamom powder (1/2 tsp)",
        "Mixed Nuts (2 tbsp, chopped)",
      ],
      instructions: [
        "Heat ghee in a pan and roast semolina on low heat until golden brown and aromatic.",
        "In a separate saucepan, bring water and sugar to a boil to make sugar syrup.",
        "Gradually add the hot sugar syrup to the roasted semolina, stirring continuously to avoid lumps.",
        "Add cardamom powder and cook until the halwa thickens and leaves the sides of the pan.",
        "Garnish with chopped nuts and serve warm as prasad.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=60",
      cookingTime: "25 mins",
      difficulty: "Medium",
      cuisine: "Temple",
    },
    {
      id: "ayurvedic-tea",
      name: "Ayurvedic Herbal Tea",
      category: "ayurvedic",
      ingredients: [
        "Water (2 cups)",
        "Fresh Ginger (1 inch, grated)",
        "Tulsi (Holy Basil) leaves (5-6)",
        "Cardamom pods (2, crushed)",
        "Cinnamon stick (1 inch)",
        "Honey or Jaggery to taste (optional)",
      ],
      instructions: [
        "Bring water to a boil in a saucepan.",
        "Add grated ginger, tulsi leaves, crushed cardamom, and cinnamon stick.",
        "Simmer on low heat for 5-7 minutes to let the flavors infuse.",
        "Strain the tea into cups.",
        "Add honey or jaggery if desired. Serve hot.",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1571934811356-5cc819f459dc?w=800&auto=format&fit=crop&q=60",
      cookingTime: "10 mins",
      difficulty: "Easy",
      cuisine: "Ayurvedic",
    },
  ];

  const [recipes, setRecipes] = useState(initialRecipes);

  const categories = [
    { id: "all", name: "All", icon: <ShoppingBagIcon /> },
    {
      id: "sattvic",
      name: "Sattvic",
      icon: <span className="text-2xl">🌱</span>,
    },
    {
      id: "prasad",
      name: "Prasad",
      icon: <span className="text-2xl">🍲</span>,
    },
    {
      id: "ayurvedic",
      name: "Ayurvedic",
      icon: <span className="text-2xl">🌿</span>,
    },
    {
      id: "fasting",
      name: "Fasting",
      icon: <span className="text-2xl">🍚</span>,
    },
  ];

  const filteredRecipes = recipes.filter(
    (recipe) =>
      (selectedCategory === "all" ||
        recipe.category.toLowerCase() === selectedCategory) &&
      (!searchQuery ||
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleViewRecipe = (recipe: any) => {
    setSelectedRecipe(recipe);
    setShowRecipeModal(true);
  };

  const foodPageNavItems = [
    { id: "home", name: "Home", icon: <HomeIcon /> },
    {
      id: "learn",
      name: "Learn",
      icon: <LearnIcon />,
    },
    { id: "akf", name: "AKF", icon: <AkfPlaceholderIcon />, onClick: () => {} },
    {
      id: "news",
      name: "News",
      icon: <NewsNavIcon />,
    },
    {
      id: "emergency",
      name: "Emergency",
      icon: <EmergencyIcon />,
    },
  ];

  return (
    <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans pb-20">
      <PageHeader title={"Vedic Food & Recipes"} />

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
              isListening
                ? "Stop voice search"
                : "Start voice search"
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
              theme === "light" ? "bg-light-surface-alt" : "bg-dark-surface-alt"
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

      <div className="grid grid-cols-5 gap-2 sm:gap-4 p-4 mt-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`rounded-lg p-2 sm:p-4 flex flex-col items-center justify-center gap-1.5 text-center transition-all aspect-square shadow-md hover:shadow-lg transform hover:scale-105
              ${
                selectedCategory === category.id
                  ? `ring-2 ring-brand-orange ${
                      theme === "light"
                        ? "bg-light-surface"
                        : "bg-dark-card animate-soft-breathing-shadow"
                    }`
                  : `${
                      theme === "light"
                        ? "bg-light-surface hover:bg-gray-200"
                        : "bg-dark-surface-alt hover:bg-gray-700"
                    }`
              }`}
            style={
              selectedCategory === category.id && theme === "dark"
                ? ({
                    "--tw-shadow-color": "rgba(255,111,0,0.15)",
                  } as React.CSSProperties)
                : {}
            }
            aria-pressed={selectedCategory === category.id}
          >
            <div
              className={`text-xl sm:text-2xl ${
                selectedCategory === category.id
                  ? "text-brand-orange animate-subtle-beat"
                  : theme === "light"
                  ? "text-light-text-secondary"
                  : "text-dark-text-secondary"
              }`}
            >
              {typeof category.icon === "string"
                ? category.icon
                : React.cloneElement(
                    category.icon as React.ReactElement<{ className?: string }>,
                    { className: "w-6 h-6 sm:w-7 sm:h-7" }
                  )}
            </div>
            <span
              className={`text-xs font-medium ${
                selectedCategory === category.id
                  ? "text-brand-orange"
                  : theme === "light"
                  ? "text-light-text-tertiary"
                  : "text-dark-text-tertiary"
              }`}
            >
              {category.name}
            </span>
          </button>
        ))}
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRecipes.map((recipe) => (
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
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
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
                  <span>{recipe.cookingTime}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
              <button
                onClick={() => handleViewRecipe(recipe)}
                className="w-full bg-gradient-to-r from-brand-orange to-yellow-500 hover:from-yellow-500 hover:to-brand-orange bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg"
              >
                <span>View Recipe</span>
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        {filteredRecipes.length === 0 && !isGenerating && (
          <div
            className={`md:col-span-2 text-center py-10 ${
              theme === "light"
                ? "text-light-text-tertiary"
                : "text-dark-text-tertiary"
            }`}
          >
            <p className="text-xl mb-2">(._.)</p>
            <p>
              No recipes found
            </p>
            <p className="text-sm mt-1">
              Try a different search or category, or use the AI Recipe generator!
            </p>
          </div>
        )}
      </div>

      {showRecipeModal && selectedRecipe && (
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
      )}

      {showAIModal && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowAIModal(false)}
        >
          <div
            className={`rounded-xl p-6 w-full max-w-lg shadow-2xl animate-soft-breathing-shadow ${
              theme === "light"
                ? "bg-light-surface text-light-text-primary"
                : "bg-dark-card text-dark-text-primary"
            }`}
            style={
              {
                "--tw-shadow-color":
                  theme === "dark" ? "rgba(0,196,204,0.15)" : "rgba(0,0,0,0.1)",
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-recipe-title"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <BrainIcon className="w-6 h-6 text-brand-orange animate-subtle-beat" />
                <h2
                  id="ai-recipe-title"
                  className="text-xl font-bold text-gradient bg-gradient-to-r from-brand-blue to-teal-400"
                >
                  AI Recipe Generator
                </h2>
              </div>
              <button
                onClick={() => setShowAIModal(false)}
                className={`p-1.5 rounded-full ${
                  theme === "light"
                    ? "text-gray-500 hover:bg-gray-200"
                    : "text-gray-400 hover:bg-gray-700"
                }`}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="recipe-prompt"
                  className={`block text-sm mb-1.5 ${
                    theme === "light"
                      ? "text-light-text-secondary"
                      : "text-dark-text-secondary"
                  }`}
                >
                 Describe the recipe you want (e.g., ingredients, cuisine, type):
                </label>
                <textarea
                  id="recipe-prompt"
                  value={recipePrompt}
                  onChange={(e) => setRecipePrompt(e.target.value)}
                  placeholder="E.g., A healthy sattvic breakfast using oats and fruits..."
                  className={`w-full rounded-lg px-3 py-2.5 outline-none h-28 resize-none focus:ring-2 focus:ring-brand-orange ${
                    theme === "light"
                      ? "bg-light-surface-alt text-light-text-primary placeholder-light-text-tertiary border border-gray-300"
                      : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary border border-gray-600"
                  }`}
                />
              </div>
              {error && (
                <div
                  className={`rounded-lg p-3 text-sm ${
                    theme === "light"
                      ? "bg-red-100 border border-red-300 text-red-700"
                      : "bg-red-500/10 border border-red-500/50 text-red-400"
                  }`}
                >
                  {error}
                </div>
              )}
              <button
                // onClick={handleGenerateRecipe}
                disabled={isGenerating || !recipePrompt.trim()}
                className="w-full bg-gradient-to-r from-brand-blue to-teal-500 hover:from-teal-500 hover:to-brand-blue bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg py-3 flex items-center justify-center gap-2 font-medium disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-brand-blue/40"
              >
                {isGenerating ? (
                  <>
                    <LoaderIcon className="w-5 h-5 animate-spin" />
                    <span>
                      Generating...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Generate Recipe
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Food;
