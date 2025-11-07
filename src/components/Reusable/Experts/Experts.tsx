import { ArrowRightIcon, Clock, Star } from "lucide-react";
import Loader from "../../Shared/Loader/Loader";
import { useTheme } from "../../../contexts/ThemeContext";
import BookConsultationConfirmModal from "../../BookConsultationConfirmModal/BookConsultationConfirmModal";
import { useState } from "react";

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
  const [isBookConsultationModalOpen, setIsBookConsultationModalOpen] =
    useState<boolean>(false);

  const handleConfirmBooking = () => {
    //jhjhy
  };

  return (
    <div className="w-full">
      <div className="px-4 py-4">
        <h2
          className={`text-xl font-bold mb-4 ${
            theme === "light" ? "text-gray-800" : "text-dark-text-secondary"
          }`}
        >
          {title} Experts
        </h2>

        {isLoading ? (
          <Loader />
        ) : data?.length > 0 ? (
          <div className="space-y-3">
            {data.map((expert) => (
              <div key={expert._id} className="block">
                <div
                  className={`rounded-xl p-4 flex gap-3 shadow-md hover:shadow-lg transition-shadow duration-200 ${
                    theme === "light" ? "bg-white" : "bg-dark-card"
                  }`}
                >
                  <div className="relative size-20">
                    <img
                      src={expert.imageUrl}
                      alt={expert.name}
                      className="rounded-full size-20 object-cover"
                    />
                  </div>
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
                        setIsBookConsultationModalOpen(true);
                      }}
                      className={`w-full text-sm flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold transition-all duration-200 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 mt-2
                          ${
                            theme === "light"
                              ? "bg-brand-orange text-white hover:bg-opacity-90 focus:ring-brand-orange focus:ring-offset-gray-50"
                              : "bg-brand-yellow text-black hover:bg-opacity-90 focus:ring-brand-yellow focus:ring-offset-gray-800"
                          }
                        `}
                    >
                      <span>Book Consultation</span>
                      <ArrowRightIcon className="w-5 h-5" />
                    </button>
                  </div>
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

      <div className="h-5"></div>

      {isBookConsultationModalOpen && (
        <BookConsultationConfirmModal
          setIsModalOpen={setIsBookConsultationModalOpen}
          onConfirm={handleConfirmBooking}
          title="Confirm Consultation"
          message="Are you sure you want to book this consultation session?"
        />
      )}
    </div>
  );
};

export default Experts;
