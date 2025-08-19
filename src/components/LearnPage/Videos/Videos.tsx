/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "../../../contexts/ThemeContext";
import { useGetAllReelsQuery } from "../../../redux/Features/Reels/reelsApi";
import { getEmbedUrl } from "../../../utils/getEmbedUrl";
import Loader from "../../Shared/Loader/Loader";

const Videos = () => {
  const { theme } = useTheme();

  const { data: reels, isLoading: isReelsLoading } = useGetAllReelsQuery({});
  return (
    <div className="space-y-4">
      {reels?.data?.length < 1 ? (
        <p
          className={`text-center py-6 text-sm ${
            theme === "light"
              ? "text-light-text-tertiary"
              : "text-dark-text-tertiary"
          }`}
        >
          No data found
        </p>
      ) : isReelsLoading ? (
        <Loader />
      ) : (
        reels?.data?.map((video: any, index: number) => (
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
            <div className="relative w-full h-48">
              <iframe
                src={getEmbedUrl(video?.videoUrl) as string}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; picture-in-picture"
                allowFullScreen
              />
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
                <span>{video.category}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Videos;
