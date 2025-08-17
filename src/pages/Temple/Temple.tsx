/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import {
  Building2Icon,
  LandmarkIcon,
  PlusIcon,
  QuestionMarkIcon,
  SchoolIcon,
  SearchLucideIcon,
} from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import { MOCK_SANATAN_STHAL_ITEMS } from "../../mockData";

const Temple = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const getTypeIcon = (type: any) => {
    const iconClass = `w-5 h-5 ${
      theme === "light" ? "text-brand-orange" : "text-brand-yellow"
    }`;
    switch (type) {
      case "temple":
        return <LandmarkIcon className={iconClass} />;
      case "gurukul":
        return <SchoolIcon className={iconClass} />;
      case "org":
        return <Building2Icon className={iconClass} />;
      default:
        return <QuestionMarkIcon className={iconClass} />;
    }
  };
  return (
    <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans">
      <PageHeader title={"Sanatan Sthal Directory"} />

      <div className="fixed bottom-5 right-4 z-30 sm:bottom-6 sm:right-6">
        {" "}
        {/* Adjusted positioning for better visibility */}
        <button
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
        {MOCK_SANATAN_STHAL_ITEMS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_SANATAN_STHAL_ITEMS.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl overflow-hidden shadow-lg cursor-pointer transition-all hover:shadow-brand-orange/20 dark:hover:shadow-brand-orange/30 hover:transform hover:-translate-y-1 
                            ${
                              theme === "light"
                                ? "bg-light-surface"
                                : "bg-dark-card"
                            }`}
              >
                <div className="relative h-40">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs flex items-center gap-1
                                    ${
                                      theme === "light"
                                        ? "bg-black/50 text-white"
                                        : "bg-black/70 text-gray-200"
                                    }`}
                  >
                    {/* <StarIcon className="w-3 h-3 text-yellow-400" /> */}
                    <span>{item.rating.toFixed(1)} ★</span>
                  </div>
                </div>
                <div className="p-3">
                  <div
                    className={`flex items-center gap-2 mb-1 ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    }`}
                  >
                    {getTypeIcon(item.type)}
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
                    {item.location}
                  </p>
                  <p
                    className={`text-xs line-clamp-2 ${
                      theme === "light"
                        ? "text-light-text-tertiary"
                        : "text-dark-text-tertiary"
                    }`}
                  >
                    {item.description}
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

      {/* {showRegistrationModal && (
        <RegistrationModal
          isOpen={showRegistrationModal}
          onClose={() => setShowRegistrationModal(false)}
          onSubmit={handleRegister}
        />
      )}

      {showDetailsModal && selectedItem && (
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
    </div>
  );
};

export default Temple;
