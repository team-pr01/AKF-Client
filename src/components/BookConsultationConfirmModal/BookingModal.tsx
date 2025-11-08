/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { X, ChevronRight, AlertTriangle } from "lucide-react";

const BookingModal = ({
  visible,
  selectedDoctor,
  consultationIssue,
  setConsultationIssue,
  error,
  handleBookConsultation,
  setShowBookingModal,
  isBooking,
}: any) => {
  if (!visible || !selectedDoctor) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50"
      onClick={() => setShowBookingModal(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            Book Consultation
          </h2>
          <button onClick={() => setShowBookingModal(false)}>
            <X
              size={22}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-4 space-y-4">
          {/* Doctor Info */}
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedDoctor.name}
            </p>
            <p className="text-sm text-orange-500 font-medium">
              {selectedDoctor.specialty}
            </p>
            <p className="text-sm text-green-600 font-semibold">
              ৳{selectedDoctor.fees} per session
            </p>
          </div>

          {/* Concern Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Your Concern *
            </label>
            <textarea
              value={consultationIssue}
              onChange={(e) => setConsultationIssue(e.target.value)}
              placeholder="Describe your health concern..."
              rows={4}
              className="w-full border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 outline-none resize-none"
            />
          </div>
          <p className="text-xs italic ">
            {" "}
            Once you submit the request we will contact you as soon as possible{" "}
          </p>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-md p-3">
              <AlertTriangle size={16} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Book Button */}
          <button
            onClick={handleBookConsultation}
            className="w-full flex justify-center items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg py-3 font-semibold transition-all"
          >
            {isBooking ? "Booking..." : "Book Appointment"}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
