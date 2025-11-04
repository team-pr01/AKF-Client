import React from "react";
import { X, Flag } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useReportMantraMutation } from "../../redux/Features/Book/bookApi";
import { toast } from "sonner";

const REPORT_REASONS = [
  "Incorrect translation",
  "Inappropriate content",
  "Technical error",
  "Missing information",
  "Other",
];

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  verseId: string;
  originalText: string;
  translation: string;
  bookId: string;
  languageCode: string;
}

interface ReportFormData {
  reason: string;
  feedback: string;
}

const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  verseId,
  originalText,
  translation,
  bookId,
  languageCode,
}) => {
  const [reportMantra, { isLoading }] = useReportMantraMutation();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReportFormData>({
    defaultValues: { reason: "", feedback: "" },
  });

  const selectedReason = watch("reason");

  const onSubmit = async (data: ReportFormData) => {
    try {
      const payload = {
        bookId: bookId || "",
        textId: verseId,
        originalText,
        translation,
        reason: data.reason,
        feedback: data.feedback.trim(),
        languageCode,
      };

      const res = await reportMantra(payload).unwrap();
      if (res?.data?.success) {
        toast.success("Reported successfully!");
      }
      reset();
      
      onClose();
    } catch (error) {
      console.error("❌ Report submission failed:", error);
      alert("Failed to submit report. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3">
          <div className="flex items-center gap-2">
            <Flag size={20} className="text-red-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              Report Issue
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[80vh] overflow-y-auto p-5">
          <h3 className="mb-3 text-base font-medium text-gray-800">
            What's the issue?
          </h3>

          <Controller
            control={control}
            name="reason"
            rules={{ required: "Please select a reason." }}
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                {REPORT_REASONS.map((reason) => (
                  <button
                    type="button"
                    key={reason}
                    onClick={() => onChange(reason)}
                    className={`flex w-full items-center rounded-lg border px-3 py-2 text-left transition ${
                      value === reason
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`mr-3 size-4 rounded-full border-2 ${
                        value === reason
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <span
                      className={`text-sm ${
                        value === reason
                          ? "text-orange-600 font-medium"
                          : "text-gray-700"
                      }`}
                    >
                      {reason}
                    </span>
                  </button>
                ))}
              </div>
            )}
          />
          {errors.reason && (
            <p className="mt-1 text-sm text-red-500">
              {errors.reason.message}
            </p>
          )}

          <h3 className="mt-6 mb-2 text-base font-medium text-gray-800">
            Additional feedback
          </h3>
          <Controller
            control={control}
            name="feedback"
            render={({ field: { onChange, value } }) => (
              <textarea
                placeholder="Please provide more details..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-24 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-500 focus:outline-none"
              />
            )}
          />

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={!selectedReason?.trim() || isLoading}
              className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                !selectedReason?.trim() || isLoading
                  ? "cursor-not-allowed bg-red-300"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              {isLoading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
