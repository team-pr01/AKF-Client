import { BrainIcon, CheckCircleIcon, MessageSquareIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";

const AIChat = () => {
  const { theme } = useTheme();
  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg p-6 text-center shadow-xl ${
          theme === "light"
            ? "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border border-brand-blue/30"
            : "bg-gradient-to-br from-gray-800 via-blue-900/20 to-indigo-900/20 border border-brand-blue/50 animate-soft-breathing-shadow"
        }`}
        style={
          { "--tw-shadow-color": "rgba(0,196,204,0.15)" } as React.CSSProperties
        }
      >
        <MessageSquareIcon className="w-12 h-12 mx-auto mb-4 text-brand-blue animate-subtle-beat" />
        <h3
          className={`text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-teal-400`}
        >
          AI Learning Assistant
        </h3>
        <p
          className={`mb-6 ${
            theme === "light"
              ? "text-light-text-secondary"
              : "text-dark-text-secondary"
          }`}
        >
          Get personalized help with your Vedic studies. Ask questions, get
          explanations, and deepen your understanding.
        </p>
        <button
        //   onClick={onNavigateToAIAgent}
          className="bg-gradient-to-r from-brand-blue to-teal-500 hover:from-teal-500 hover:to-brand-blue bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 mx-auto font-medium shadow-md hover:shadow-lg hover:shadow-brand-blue/40"
        >
          <BrainIcon className="w-5 h-5" />
          <span>Start Conversation</span>
        </button>
      </div>
      <div
        className={`rounded-lg p-6 shadow-lg ${
          theme === "light" ? "bg-light-surface" : "bg-dark-card"
        }`}
      >
        <h3
          className={`font-semibold mb-3 text-lg ${
            theme === "light"
              ? "text-light-text-primary"
              : "text-dark-text-primary"
          }`}
        >
          What can AI help you with?
        </h3>
        <ul className="space-y-2.5 text-sm">
          {[
            "Explain complex Vedic concepts",
            "Answer questions about Sanskrit",
            "Help with pronunciation of mantras",
            "Provide study recommendations",
          ].map((item) => (
            <li
              key={item}
              className={`flex items-start gap-2.5 ${
                theme === "light"
                  ? "text-light-text-secondary"
                  : "text-dark-text-secondary"
              }`}
            >
              <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIChat;
