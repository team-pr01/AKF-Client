import { useState, useEffect, useRef } from "react";
import {
  SearchIcon,
  MicrophoneIcon,
  XCircleIcon,
  StopCircleIcon,
} from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [filteredPages, setFilteredPages] = useState<
    { label: string; path: string }[]
  >([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognitionAPI) {
      const recognitionInstance = new SpeechRecognitionAPI();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
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
      console.warn("Speech recognition not supported by this browser.");
    }
  }, []);

  const handleVoiceSearchToggle = () => {
    if (!recognitionRef.current) {
      alert("Voice search is not supported by your browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
        alert(
          "Could not start voice search. Please check microphone permissions."
        );
      }
    }
  };

  const { theme } = useTheme();

  const pageLinks = [
    { label: "Yoga", path: "/yoga" },
    { label: "Temples", path: "/temples" },
    { label: "Sanatan Sthal", path: "/temples" },
    { label: "Food", path: "/food" },
    { label: "Vastu", path: "/vastu" },
    { label: "Jyotish", path: "/jyotish" },
    { label: "News", path: "/news" },
    { label: "Emergency", path: "/emergency" },
    { label: "Learn", path: "/learn" },
    { label: "Reels", path: "/reels" },
    { label: "Course", path: "/course" },
    { label: "Quiz", path: "/quiz" },
    { label: "AI Chat", path: "/ai-chat" },
    { label: "Notifications", path: "/notifications" },
    { label: "My Profile", path: "/my-profile" },
  ];

  // filter pages whenever searchTerm changes
  useEffect(() => {
    if (searchTerm.trim()) {
      const matches = pageLinks.filter((page) =>
        page.label.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPages(matches);
    } else {
      setFilteredPages([]);
    }
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Bar */}
      <div
        className={`rounded-lg p-1 flex items-center shadow-lg animate-multicolor-glow ${
          theme === "light"
            ? "bg-light-primary text-light-text-primary"
            : "bg-primary text-dark-text-primary"
        }`}
      >
        <input
          type="text"
          placeholder={"Search Vedic wisdom, temples..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow p-3 bg-transparent text-light-text-primary placeholder-light-text-tertiary focus:outline-none text-sm"
          aria-label="Search"
        />
        {searchTerm && (
          <button
            aria-label="Clear search"
            onClick={() => setSearchTerm("")}
            className="p-2 text-gray-500 hover:text-brand-orange"
          >
            <XCircleIcon className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={handleVoiceSearchToggle}
          aria-label={isListening ? "Stop voice search" : "Search by voice"}
          className={`p-2 rounded-full transition-colors ${
            isListening
              ? "text-red-500 animate-pulse"
              : "text-gray-500 hover:text-brand-orange"
          }`}
          disabled={!recognitionRef.current && !isListening}
        >
          {isListening ? (
            <StopCircleIcon className="w-5 h-5" />
          ) : (
            <MicrophoneIcon className="w-5 h-5" />
          )}
        </button>
        <button
          aria-label="Submit search"
          className="p-2 text-gray-500 hover:text-brand-orange"
        >
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Dropdown suggestions */}
      {filteredPages.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredPages.map((page, idx) => (
            <li
              key={idx}
              onClick={() => {
                navigate(page.path);
                setSearchTerm("");
                setFilteredPages([]);
              }}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
              {page.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
