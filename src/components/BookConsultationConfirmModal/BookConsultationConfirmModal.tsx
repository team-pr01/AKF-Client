import { XIcon } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";

interface BookConsultationConfirmModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
}

const BookConsultationConfirmModal = ({ 
  setIsModalOpen, 
  onConfirm,
  title = "Confirm Booking",
  message = "Are you sure you want to book this consultation?"
}: BookConsultationConfirmModalProps) => {
  const { theme } = useTheme();

  const handleConfirm = () => {
    onConfirm();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[200]"
      onClick={() => setIsModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div
        className={`rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 ease-out scale-100
                  ${
                    theme === "light"
                      ? "bg-gradient-to-br from-white to-gray-100 text-gray-800"
                      : "bg-gradient-to-br from-dark-surface to-gray-800 text-white"
                  }
                `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10">
          <div
            className={`relative py-4 px-6 ${
              theme === "light"
                ? "border-b border-gray-200 bg-white/80 backdrop-blur-sm"
                : "border-b border-gray-700 bg-gray-800/80 backdrop-blur-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2
                id="confirmation-modal-title"
                className={`text-xl font-bold ${
                  theme === "light" ? "text-brand-orange" : "text-brand-yellow"
                }`}
              >
                {title}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === "light"
                    ? "hover:bg-gray-100 text-gray-600"
                    : "hover:bg-gray-700 text-gray-400"
                }`}
                aria-label="Close confirmation modal"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
              theme === "light" 
                ? "bg-brand-orange/10 text-brand-orange" 
                : "bg-brand-yellow/10 text-brand-yellow"
            }`}>
              <svg 
                className="w-8 h-8" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <h3 className={`text-lg font-semibold mb-2 ${
              theme === "light" ? "text-gray-900" : "text-white"
            }`}>
              {title}
            </h3>
            <p className={`text-sm ${
              theme === "light" ? "text-gray-600" : "text-gray-300"
            }`}>
              {message}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleCancel}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 border-2 ${
                theme === "light"
                  ? "border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                  : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
              }`}
            >
              No, Cancel
            </button>
            <button
              onClick={handleConfirm}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 hover:scale-[1.02] ${
                theme === "light"
                  ? "bg-brand-orange hover:bg-orange-600"
                  : "bg-brand-yellow hover:bg-yellow-500 text-black"
              }`}
            >
              Yes, Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookConsultationConfirmModal;