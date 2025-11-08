/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRightIcon,
  Clock,
  Star,
  Mic,
  Search,
  StopCircle,
  AlertTriangle,
} from "lucide-react";
import Loader from "../../Shared/Loader/Loader";
import { useTheme } from "../../../contexts/ThemeContext";
import BookConsultationConfirmModal from "../../BookConsultationConfirmModal/BookConsultationConfirmModal";
import BookingModal from "../../BookConsultationConfirmModal/BookingModal";
import { useBookConsultationMutation } from "../../../redux/Features/ConsultancyService/consultancyServiceApi";
import { toast } from "sonner";

interface Expert {
  _id: string;
  imageUrl: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  fees: number;
  availableTime: string;
  availabilityType: string[];
}

interface ExpertsProps {
  data: Expert[];
  title: string;
  isLoading: boolean;
}

const Experts: React.FC<ExpertsProps> = ({ data, title, isLoading }) => {
  const { theme } = useTheme();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>([]);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const [selectedDoctor, setSelectedDoctor] = useState<Expert | null>(null);
  const [consultationIssue, setConsultationIssue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [
    bookConsultation,
    {
      isLoading: isBooking,
      isSuccess: bookingSuccess,
    },
  ] = useBookConsultationMutation();

  // ✅ Filter experts by search query
  useEffect(() => {
    if (!searchQuery) {
      setFilteredExperts(data);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = data.filter(
        (expert) =>
          expert.name.toLowerCase().includes(lowerQuery) ||
          expert.specialty.toLowerCase().includes(lowerQuery)
      );
      setFilteredExperts(filtered);
    }
  }, [searchQuery, data]);

  // ✅ Setup browser speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setSearchQuery(transcript);
        };

        recognition.onerror = () => setIsListening(false);
        recognition.onend = () => setIsListening(false);

        recognitionRef.current = recognition;
      }
    }
  }, []);

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
    if (isListening) recognitionRef.current.stop();
    else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error("Error starting recognition:", err);
        setIsListening(false);
      }
    }
  };

  const handleBookConsultation = async () => {
    if (!consultationIssue.trim()) {
      setError("Please describe your concern before booking.");
      return;
    }
    if (!selectedDoctor) {
      setError("No consultant selected. Please select one.");
      return;
    }

    setError(null);

    try {
      const bookingData = {
        consultantId: selectedDoctor._id,
        concern: consultationIssue,
        fees: selectedDoctor.fees,
        category: selectedDoctor.specialty,
      };
      const res=await bookConsultation(bookingData).unwrap();
      console.log("✅ Booking successful!");
      setShowBookingModal(false);
      setConsultationIssue("");
      if(res.success){
        toast.success("we have reserved your request. we will contact you soon.");
      }
    } catch (err) {
      console.error("❌ Booking failed:", err);
      setError("Failed to book consultation. Please try again.");
    }
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="p-4 flex flex-col sm:flex-row gap-3">
        <div
          className={`flex items-center gap-2 w-full sm:w-[400px] px-4 py-2 rounded-full border ${
            theme === "light"
              ? "bg-gray-50 border-gray-200"
              : "bg-dark-card border-gray-700"
          }`}
        >
          <Search
            size={18}
            className={`${
              theme === "light" ? "text-gray-500" : "text-gray-400"
            }`}
          />
          <input
            type="text"
            placeholder="Search doctors or specialties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`flex-1 text-sm bg-transparent outline-none ${
              theme === "light" ? "text-gray-800" : "text-gray-100"
            }`}
          />
          <button
            onClick={handleVoiceSearch}
            className={`p-1 rounded-md transition ${
              isListening ? "bg-red-50" : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isListening ? (
              <StopCircle size={18} className="text-red-500" />
            ) : (
              <Mic size={18} className="text-orange-500" />
            )}
          </button>
        </div>

        {isListening && (
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            Listening...
          </div>
        )}
      </div>

      {/* Experts Section */}
      <div className="px-4 pb-6">
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "light" ? "text-gray-800" : "text-dark-text-secondary"
          }`}
        >
          {title} Experts
        </h2>

        {isLoading ? (
          <Loader />
        ) : filteredExperts?.length > 0 ? (
          <div className="space-y-3">
            {filteredExperts.map((expert) => (
              <div
                key={expert._id}
                className={`rounded-xl p-4 flex gap-3 shadow-md hover:shadow-lg transition-shadow duration-200 ${
                  theme === "light" ? "bg-white" : "bg-dark-card"
                }`}
              >
                <img
                  src={expert.imageUrl}
                  alt={expert.name}
                  className="rounded-full size-20 object-cover"
                />
                <div className="flex-1">
                  <h3
                    className={`text-base font-bold mb-1 ${
                      theme === "light"
                        ? "text-gray-800"
                        : "text-dark-text-primary"
                    }`}
                  >
                    {expert.name}
                  </h3>
                  <p className="text-sm text-orange-600 mb-1">
                    {expert.specialty}
                  </p>
                  <p
                    className={`text-xs mb-2 ${
                      theme === "light"
                        ? "text-gray-500"
                        : "text-dark-text-tertiary"
                    }`}
                  >
                    {expert.experience} experience
                  </p>

                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-1">
                      <Star
                        size={16}
                        className="text-amber-500 fill-amber-500"
                      />
                      <span
                        className={`text-sm font-semibold ${
                          theme === "light"
                            ? "text-gray-800"
                            : "text-dark-text-primary"
                        }`}
                      >
                        {expert.rating}
                      </span>
                    </div>
                    <span className="text-base font-bold text-emerald-500">
                      ৳{expert.fees}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mb-2">
                    <Clock size={14} className="text-emerald-500" />
                    <span className="text-xs font-medium text-emerald-500">
                      {expert.availableTime}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {expert.availabilityType.slice(0, 3).map((type) => (
                      <span
                        key={type}
                        className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${
                          theme === "light"
                            ? "bg-blue-50 text-blue-800"
                            : "bg-blue-900/40 text-blue-300"
                        }`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedDoctor(expert);
                      setShowBookingModal(true);
                    }}
                    className={`w-full text-sm flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold mt-2 transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-offset-2
                      ${
                        theme === "light"
                          ? "bg-brand-orange text-white hover:bg-opacity-90 focus:ring-brand-orange"
                          : "bg-brand-yellow text-black hover:bg-opacity-90 focus:ring-brand-yellow"
                      }`}
                  >
                    <span>Book Consultation</span>
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`text-center text-sm py-5 ${
              theme === "light" ? "text-gray-500" : "text-dark-text-tertiary"
            }`}
          >
            No {title} experts found for your search.
          </p>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedDoctor && (
        <BookingModal
          visible={showBookingModal}
          setShowBookingModal={setShowBookingModal}
          selectedDoctor={selectedDoctor}
          consultationIssue={consultationIssue}
          setConsultationIssue={setConsultationIssue}
          handleBookConsultation={handleBookConsultation}
          isBooking={isBooking}
          error={error}
        />
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <BookConsultationConfirmModal
          setIsModalOpen={setShowConfirmModal}
          onConfirm={handleBookConsultation}
          title="Confirm Consultation"
          message="Are you sure you want to book this consultation?"
        />
      )}
    </div>
  );
};

export default Experts;
