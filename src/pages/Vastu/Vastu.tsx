import React, { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useTheme } from "../../contexts/ThemeContext";
import {
    ArrowRightIcon,
  BathIcon,
  BedIcon,
  CompassIcon,
  DoorOpenIcon,
  KitchenIcon,
  Plant2Icon,
  PlayIcon,
  SearchLucideIcon,
  StarIcon,
  TempleIcon,
} from "../../constants";

const Vastu = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const vastuCategories = [
    { id: "all", name: "All", icon: <CompassIcon /> },
    { id: "entrance", name: "Entrance", icon: <DoorOpenIcon /> },
    { id: "bedroom", name: "Bedroom", icon: <BedIcon /> },
    { id: "kitchen", name: "Kitchen", icon: <KitchenIcon /> },
    { id: "bathroom", name: "Bathroom", icon: <BathIcon /> },
    { id: "temple", name: "Temple", icon: <TempleIcon /> },
    { id: "garden", name: "Garden", icon: <Plant2Icon /> },
  ];

  const initialVastuTips = [
  {
    title: 'Main Entrance',
    icon: <DoorOpenIcon />,
    category: 'entrance',
    tips: [
      'North-East entrance is considered most auspicious for overall prosperity.',
      'Avoid obstructions like poles or large trees directly in front of the main door.',
      'The entrance door should always open inward, clockwise.',
      'Keep the entrance area well-lit and clean.'
    ]
  },
  {
    title: 'Bedroom',
    icon: <BedIcon />,
    category: 'bedroom',
    tips: [
      'Master bedroom should ideally be in the South-West direction.',
      'Sleep with your head pointing South or East for peaceful sleep.',
      'Avoid placing mirrors directly opposite the bed.',
      'Use calming colors for bedroom walls.'
    ]
  },
  {
    title: 'Kitchen',
    icon: <KitchenIcon />,
    category: 'kitchen',
    tips: [
      'The South-East corner is ideal for the kitchen (Agni corner).',
      'Cooking stove should be placed such that the cook faces East.',
      'Water source (sink, tap) should be in the North-East of the kitchen.',
      'Avoid placing the stove and sink directly opposite each other.'
    ]
  },
  {
    title: 'Bathroom & Toilet',
    icon: <BathIcon />,
    category: 'bathroom',
    tips: [
      'North-West is the preferred direction for bathrooms and toilets.',
      'Toilet seat should ideally face South or North.',
      'Ensure good ventilation and keep the bathroom door closed when not in use.',
      'Avoid constructing toilets in the North-East or South-West corners.'
    ]
  },
  {
    title: 'Temple Room (Pooja Room)',
    icon: <TempleIcon />,
    category: 'temple',
    tips: [
      'The North-East (Ishan Kona) is the most sacred direction for a pooja room.',
      'Idols should face West or East.',
      'Keep the pooja room clean, clutter-free, and well-lit.',
      'Avoid placing the pooja room under a staircase or next to a bathroom.'
    ]
  }
];


  const initialVastuExperts = [
  {
    id: 1,
    name: 'Dr. Acharya Vinod Shastri',
    speciality: 'Vastu & Vedic Astrology',
    experience: '20 years',
    rating: 4.9,
    price: '₹2000',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&auto=format&fit=crop&q=60',
    nextAvailable: 'Available Now'
  },
  {
    id: 2,
    name: 'Smt. Radhika Sharma',
    speciality: 'Residential & Commercial Vastu',
    experience: '15 years',
    rating: 4.8,
    price: '₹1500',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=800&auto=format&fit=crop&q=60',
    nextAvailable: 'Tomorrow, 10 AM'
  }
];

  const vastuVideosData = [
  {
    id: 1,
    title: 'Introduction to Vastu Shastra Principles',
    duration: '15:30',
    thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    views: '1.2M'
  },
  {
    id: 2,
    title: 'Vastu Guidelines for a Prosperous Home Office',
    duration: '12:45',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60',
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4',
    views: '850K'
  }
];



  const [filteredTips, setFilteredTips] = useState(initialVastuTips);
  const [filteredExperts, setFilteredExperts] = useState(initialVastuExperts);

  return (
    <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans pb-20">
      <PageHeader title={"Vastu Shastra"} />

      <div
        className={`p-4 space-y-4 sticky top-[60px] z-30 ${
          theme === "light"
            ? "bg-light-primary dark:bg-dark-primary"
            : "bg-primary dark:bg-black"
        }`}
      >
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
            <input
              type="text"
              placeholder={"Search Vastu tips, experts..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-12 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange ${
                theme === "light"
                  ? "bg-light-surface text-light-text-primary placeholder-light-text-tertiary"
                  : "bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary"
              }`}
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
          {vastuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 flex items-center ${
                selectedCategory === category.id
                  ? "bg-brand-orange text-white font-semibold"
                  : `${
                      theme === "light"
                        ? "bg-light-surface-alt text-light-text-secondary hover:bg-gray-200"
                        : "bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary"
                    }`
              }`}
            >
              {React.cloneElement(category.icon, {
                className: `w-4 h-4 mr-1.5 ${
                  selectedCategory === category.id
                    ? "text-white"
                    : theme === "light"
                    ? "text-light-text-secondary"
                    : "text-dark-text-secondary"
                }`,
              })}
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <main className="p-4 pt-0 space-y-6">
        <section>
          <h2
            className={`text-lg font-semibold mb-3 ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            Vastu Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {vastuVideosData.map((video) => (
              <div
                key={video.id}
                className={`rounded-lg overflow-hidden shadow-lg ${
                  theme === "light" ? "bg-light-surface" : "bg-dark-card"
                }`}
              >
                <div className="relative">
                  <video
                    src={video.videoUrl}
                    poster={video.thumbnail}
                    className="w-full h-40 object-cover"
                    preload="metadata"
                    playsInline
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-opacity"
                  >
                      <PlayIcon className="w-10 h-10 text-white/80" />
                  </button>
                </div>
                <div className="p-3">
                  <h3
                    className={`font-medium text-sm truncate mb-1 ${
                      theme === "light"
                        ? "text-light-text-primary"
                        : "text-dark-text-primary"
                    }`}
                    title={video.title}
                  >
                    {video.title}
                  </h3>
                  <div
                    className={`flex justify-between items-center text-xs ${
                      theme === "light"
                        ? "text-light-text-secondary"
                        : "text-dark-text-secondary"
                    }`}
                  >
                    <span>{video.duration}</span>
                    <span>
                      {video.views} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2
            className={`text-lg font-semibold mb-3 ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            Popular Vastu Tips
          </h2>
          {filteredTips.length > 0 ? (
            <div className="space-y-3">
              {filteredTips.map((tip, index) => (
                <details
                  key={index}
                  className={`rounded-lg shadow-md overflow-hidden ${
                    theme === "light" ? "bg-light-surface" : "bg-dark-card"
                  }`}
                >
                  <summary
                    className={`p-3 cursor-pointer flex items-center gap-3 transition-colors hover:bg-opacity-80 ${
                      theme === "light"
                        ? "hover:bg-gray-100"
                        : "hover:bg-gray-700"
                    }`}
                  >
                    {React.cloneElement(tip.icon, {
                      className: `w-6 h-6 text-brand-orange`,
                    })}
                    <span
                      className={`font-medium text-sm ${
                        theme === "light"
                          ? "text-light-text-primary"
                          : "text-dark-text-primary"
                      }`}
                    >
                      {tip.title}
                    </span>
                    <ArrowRightIcon className="w-4 h-4 ml-auto transform transition-transform details-arrow" />
                  </summary>
                  <div
                    className={`p-3 border-t text-xs space-y-1.5 ${
                      theme === "light"
                        ? "border-gray-200 text-light-text-secondary bg-light-surface-alt/50"
                        : "border-gray-700 text-dark-text-secondary bg-dark-surface/50"
                    }`}
                  >
                    {tip.tips.map((t, i) => (
                      <p key={i}>{t}</p>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <p
              className={`text-center py-6 text-sm ${
                theme === "light"
                  ? "text-light-text-tertiary"
                  : "text-dark-text-tertiary"
              }`}
            >
              No Vastu tips found
            </p>
          )}
        </section>

        <section>
          <h2
            className={`text-lg font-semibold mb-3 ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            Vastu Experts
          </h2>
          {filteredExperts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredExperts.map((expert) => (
                <div
                  key={expert.id}
                  className={`rounded-lg p-3 shadow-lg flex gap-3 ${
                    theme === "light" ? "bg-light-surface" : "bg-dark-card"
                  }`}
                >
                  <img
                    src={expert.image}
                    alt={expert.name}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-sm ${
                        theme === "light"
                          ? "text-light-text-primary"
                          : "text-dark-text-primary"
                      }`}
                    >
                      {expert.name}
                    </h3>
                    <p className="text-xs text-brand-orange mb-0.5">
                      {expert.speciality}
                    </p>
                    <p
                      className={`text-xs ${
                        theme === "light"
                          ? "text-light-text-secondary"
                          : "text-dark-text-secondary"
                      }`}
                    >
                      {expert.experience}
                    </p>
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <StarIcon className="w-3 h-3 text-yellow-400" />{" "}
                      <span
                        className={`${
                          theme === "light"
                            ? "text-light-text-secondary"
                            : "text-dark-text-secondary"
                        }`}
                      >
                        {expert.rating}
                      </span>
                      <span
                        className={`mx-1 ${
                          theme === "light" ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        |
                      </span>
                      <span
                        className={`${
                          theme === "light"
                            ? "text-light-text-primary"
                            : "text-dark-text-primary"
                        }`}
                      >
                        {expert.price}
                      </span>
                    </div>
                    <button
                      className={`mt-2 text-xs px-3 py-1 rounded-md text-white transition-colors ${
                        theme === "light"
                          ? "bg-brand-blue hover:bg-blue-600"
                          : "bg-brand-blue hover:bg-blue-500"
                      }`}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p
              className={`text-center py-6 text-sm ${
                theme === "light"
                  ? "text-light-text-tertiary"
                  : "text-dark-text-tertiary"
              }`}
            >
              No Vastu experts found
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Vastu;
