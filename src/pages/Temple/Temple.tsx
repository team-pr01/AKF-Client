/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { LandmarkIcon, PlusIcon, SearchLucideIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { useGetAllTempleQuery } from "../../redux/Features/Temple/templeApi";
import Loader from "../../components/Shared/Loader/Loader";
import RegisterTempleModal from "../../components/TemplePage/RegisterTempleModal/RegisterTempleModal";

export type TTemple = {
  _id: string;
  name: string;
  mainDeity: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  establishedYear: number;
  visitingHours: string;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  imageUrl: string;
  videoUrl?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: "pending" | "approved" | "rejected";
};

const Temple = () => {
  const [showRegistrationModal, setShowRegistrationModal] =
    useState<boolean>(false);
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isFetching } = useGetAllTempleQuery({
    keyword: searchQuery,
  });
  const approvedTemples =
    data?.data?.filter((item: TTemple) => item.status === "approved") || [];

  console.log(approvedTemples);
  return (
    <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans">
      <PageHeader title={"Sanatan Sthal Directory"} />

      <div className="fixed bottom-20 right-4 z-30 sm:bottom-6 sm:right-6">
        {" "}
        {/* Adjusted positioning for better visibility */}
        <button
          onClick={() => setShowRegistrationModal(true)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-200 ease-in-out hover:scale-110
                      ${
                        theme === "light"
                          ? "bg-brand-orange text-white hover:bg-opacity-90"
                          : "bg-brand-yellow text-black hover:bg-opacity-90"
                      }`}
        >
          <PlusIcon className="w-7 h-7" />
        </button>
      </div>

      <main className="p-4 pb-5 space-y-4">
        {" "}
        {/* Adjusted pb to remove conflict with potential global BottomNavBar space */}
        <div className="relative">
          <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
          <input
            type="text"
            placeholder="Search Temples, Gurukuls, Orgs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange 
                        ${
                          theme === "light"
                            ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                            : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
                        }`}
          />
        </div>
        {isLoading || isFetching ? (
          <Loader />
        ) : approvedTemples?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {approvedTemples?.map((item: TTemple) => (
              <div
                key={item?._id}
                className={`rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-brand-orange/20 dark:hover:shadow-brand-orange/30 hover:transform hover:-translate-y-1 
                            ${
                              theme === "light"
                                ? "bg-light-surface"
                                : "bg-dark-card"
                            }`}
              >
                <div className="relative h-40">
                  <img
                    src={item?.imageUrl}
                    alt={item?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div
                    className={`flex items-center gap-2 mb-1 ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    }`}
                  >
                    {/* {getTypeIcon(item.type)} */}
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {item.name}
                    </h3>
                  </div>
                  <p
                    className={`text-xs flex items-center gap-1 mb-1 ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-dark-text-secondary"
                    }`}
                  >
                    <LandmarkIcon className="w-3 h-3" />{" "}
                    {/* Using LandmarkIcon as a generic location icon */}
                    {item?.city}, {item?.country}
                  </p>
                  <p
                    className={`text-xs line-clamp-2 ${
                      theme === "light"
                        ? "text-light-text-tertiary"
                        : "text-dark-text-tertiary"
                    }`}
                  >
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p
            className={`text-center text-sm py-8 ${
              theme === "light"
                ? "text-light-text-tertiary"
                : "text-dark-text-tertiary"
            }`}
          >
            No places found matching your search.
          </p>
        )}
      </main>

      {/* {showDetailsModal && selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          onMessage={() => handleMessageInitiate(selectedItem)}
        />
      )}

      {showMessagePopup && messageReceiver && (
        <MessagePopup
          receiverId={messageReceiver.id}
          receiverName={messageReceiver.name}
          onClose={() => {
            setShowMessagePopup(false);
            setMessageReceiver(null);
          }}
        />
      )} */}

      {showRegistrationModal && (
        <RegisterTempleModal onClose={() => setShowRegistrationModal(false)} />
      )}
    </div>
  );
};

export default Temple;
