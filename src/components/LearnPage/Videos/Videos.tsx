/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import {
  useGetAllReelsQuery,
  useLikeVideoMutation,
} from "../../../redux/Features/Reels/reelsApi";
import { getEmbedUrl } from "../../../utils/getEmbedUrl";
import Loader from "../../Shared/Loader/Loader";
import { useSelector } from "react-redux";
import { useCurrentUser } from "../../../redux/Features/Auth/authSlice";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";

const Videos = () => {
  const { theme } = useTheme();
  const { data: reels, isLoading: isReelsLoading } = useGetAllReelsQuery({});
  const [likeVideo, { isLoading: isLikeLoading }] = useLikeVideoMutation();
  const user = useSelector(useCurrentUser);

  const [shuffledReels, setShuffledReels] = useState<any[]>([]);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  // 🔀 Shuffle videos once loaded
  useEffect(() => {
    if (reels?.data?.length) {
      const shuffled = [...reels.data].sort(() => Math.random() - 0.5);
      setShuffledReels(shuffled);
      setCurrentReelIndex(0);
    }
  }, [reels]);

  const handleNext = () => {
    if (currentReelIndex < shuffledReels.length - 1) {
      setCurrentReelIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentReelIndex > 0) {
      setCurrentReelIndex((prev) => prev - 1);
    }
  };

  // ❤️ Optimistic Like Toggle
  const handleLike = async (id: string) => {
    setCurrentVideo(id);

    // Update UI instantly before API response
    setShuffledReels((prev) =>
      prev.map((reel) =>
        reel._id === id
          ? {
              ...reel,
              likedBy: reel.likedBy.includes(user?._id)
                ? reel.likedBy.filter((uid: string) => uid !== user?._id)
                : [...reel.likedBy, user?._id],
              likes: reel.likedBy.includes(user?._id)
                ? reel.likes - 1
                : reel.likes + 1,
            }
          : reel
      )
    );

    try {
      await likeVideo(id).unwrap();
    } catch (err) {
      console.error("❌ Error liking video:", err);
    } finally {
      setCurrentVideo(null);
    }
  };

  const currentReel = shuffledReels[currentReelIndex];

  if (isReelsLoading) return <Loader />;

  if (!currentReel)
    return (
      <p
        className={`text-center py-6 text-sm ${
          theme === "light"
            ? "text-light-text-tertiary"
            : "text-dark-text-tertiary"
        }`}
      >
        No videos found.
      </p>
    );

  return (
    <div className="space-y-4 w-full">
      {/* Single video card */}
      <div
        key={currentReelIndex}
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
        {/* Video iframe */}
        <div className="relative w-full h-64 sm:h-72 md:h-80">
          <iframe
            src={getEmbedUrl(currentReel?.videoUrl) as string}
            className="absolute inset-0 w-full h-full rounded-t-lg"
            frameBorder="0"
            allow="autoplay; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Video details */}
        <div className="p-4 flex flex-col gap-3">
          <h3
            className={`font-semibold text-lg ${
              theme === "light"
                ? "text-light-text-primary"
                : "text-dark-text-primary"
            }`}
          >
            {currentReel.title}
          </h3>
          <p
            className={`text-sm ${
              theme === "light"
                ? "text-light-text-secondary"
                : "text-dark-text-secondary"
            }`}
          >
            {currentReel.category}
          </p>

          {/* ❤️ Like Button */}
          <div className="flex items-center gap-2 pt-2">
            {isLikeLoading && currentVideo === currentReel._id ? (
              <p className="text-xs text-gray-400 animate-pulse">Updating...</p>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(currentReel._id);
                }}
                className="flex items-center gap-2 text-sm font-medium group select-none"
              >
                <Heart
                  size={20}
                  color={
                    currentReel?.likedBy?.includes(user?._id)
                      ? "#EF4444"
                      : theme === "light"
                      ? "#6B7280"
                      : "#9CA3AF"
                  }
                  fill={
                    currentReel?.likedBy?.includes(user?._id)
                      ? "#EF4444"
                      : "none"
                  }
                  className="transition-transform group-hover:scale-110"
                />
                <span
                  className={`transition-colors ${
                    currentReel?.likedBy?.includes(user?._id)
                      ? "text-red-500"
                      : theme === "light"
                      ? "text-gray-500"
                      : "text-gray-400"
                  }`}
                >
                  {currentReel.likes}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-between items-center pt-2">
        <button
          onClick={handlePrevious}
          disabled={currentReelIndex === 0}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            currentReelIndex === 0
              ? "opacity-40 cursor-not-allowed"
              : theme === "light"
              ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <span
          className={`text-sm font-medium ${
            theme === "light" ? "text-gray-600" : "text-dark-text-secondary"
          }`}
        >
          {currentReelIndex + 1} / {shuffledReels.length}
        </span>

        <button
          onClick={handleNext}
          disabled={currentReelIndex === shuffledReels.length - 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all ${
            currentReelIndex === shuffledReels.length - 1
              ? "opacity-40 cursor-not-allowed"
              : theme === "light"
              ? "bg-gray-100 hover:bg-gray-200 text-gray-800"
              : "bg-gray-700 hover:bg-gray-600 text-white"
          }`}
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default Videos;
