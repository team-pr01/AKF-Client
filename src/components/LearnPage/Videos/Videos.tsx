import { PlayIcon } from "../../../constants";
import { useTheme } from "../../../contexts/ThemeContext";

const Videos = () => {
  const { theme } = useTheme();
  const realVideos = [
    {
      title: "Morning Vedic Chants for Positive Energy",
      duration: "15 min",
      instructor: "Pandit Sharma",
      views: "12K",
      thumbnail:
        "https://images.unsplash.com/photo-1609766418204-94aae0ecf4e5?w=800&auto=format&fit=crop&q=60",
      videoUrl:
        "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    },
    {
      title: "Discourse on Bhagavad Gita - Chapter 2",
      duration: "45 min",
      instructor: "Swami Ramdev",
      views: "25K",
      thumbnail:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
      videoUrl:
        "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    },
    {
      title: "Sanskrit Pronunciation Guide for Beginners",
      duration: "30 min",
      instructor: "Dr. Patel",
      views: "8K",
      thumbnail:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60",
      videoUrl:
        "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    },
  ];
  return (
    <div className="space-y-4">
      {realVideos.map((video, index) => (
        <div
          key={index}
          className={`rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-brand-blue/30 transform hover:-translate-y-1 duration-300 ${
            theme === "light"
              ? "bg-light-surface"
              : "bg-dark-card animate-soft-breathing-shadow"
          }`}
          style={
            {
              "--tw-shadow-color": "rgba(0,196,204,0.1)",
            } as React.CSSProperties
          }
        >
          <div className="relative">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover"
            />
            <button
              className={`absolute inset-0 flex items-center justify-center group ${
                theme === "light"
                  ? "bg-black/20 hover:bg-black/40"
                  : "bg-black/40 hover:bg-black/60"
              } transition-all duration-300`}
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-sm transition-all group-hover:scale-110 ${
                  theme === "light"
                    ? "bg-black/10 group-hover:bg-black/20"
                    : "bg-white/10 group-hover:bg-white/20"
                }`}
              >
                <PlayIcon className="w-6 h-6 text-white" />
              </div>
            </button>
            <div
              className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs backdrop-blur-sm ${
                theme === "light"
                  ? "bg-black/50 text-gray-100"
                  : "bg-black/60 text-white"
              }`}
            >
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h3
              className={`font-medium mb-1.5 truncate ${
                theme === "light"
                  ? "text-light-text-primary"
                  : "text-dark-text-primary"
              }`}
              title={video.title}
            >
              {video.title}
            </h3>
            <div
              className={`flex items-center justify-between text-xs ${
                theme === "light"
                  ? "text-light-text-secondary"
                  : "text-dark-text-secondary"
              }`}
            >
              <span>{video.instructor}</span>
              <span>{video.views} views</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
