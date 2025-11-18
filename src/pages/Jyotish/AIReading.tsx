/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useState } from "react";
import GenerateKundaliForm from "./AiReading/GenerateKundaliForm";
import GenerateMuhurtaForm from "./AiReading/GenerateMuhurtaForm";

const AIReading = ({ setIsAiReadingModalOpen }: any) => {
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState("Kundali");
  const tabButtons = ["Kundali", "Muhurta"];

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50"
      onClick={() => setIsAiReadingModalOpen(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            AI Jyotish Reading
          </h2>
          <button onClick={() => setIsAiReadingModalOpen(false)}>
            <X
              size={22}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between gap-5">
            {tabButtons?.map((button) => (
              <button
                key={button}
                onClick={() => setActiveTab(button)}
                className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors
  ${
    // Active tab takes precedence
    activeTab === button
      ? "bg-brand-orange text-white"
      : theme === "light"
      ? "bg-brand-orange/10 hover:bg-brand-orange/20 text-brand-orange"
      : "bg-brand-orange/20 hover:bg-brand-orange/30 text-white"
  }
`}
              >
                {button}
              </button>
            ))}
          </div>

          {activeTab === "Kundali" ? (
            <GenerateKundaliForm />
          ) : (
            <GenerateMuhurtaForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default AIReading;
