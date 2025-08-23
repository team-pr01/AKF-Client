import { useState, useEffect, useRef } from "react";
import {
  SearchIcon,
  MicrophoneIcon,
  AdjustmentsHorizontalIcon,
  XCircleIcon,
  StopCircleIcon,
} from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

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

  return (
    <div
      className={`rounded-lg p-1 flex items-center shadow-lg mx-auto max-w-2xl animate-multicolor-glow ${
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
      <button
        aria-label="Filter search results"
        className="p-2 text-gray-500 hover:text-brand-orange"
      >
        <AdjustmentsHorizontalIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
