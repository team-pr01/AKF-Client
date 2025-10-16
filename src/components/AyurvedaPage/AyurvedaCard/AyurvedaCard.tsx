import React from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { getEmbedUrl } from '../../../utils/getEmbedUrl';

interface AyurvedaCardProps {
  category: string;
  content: string;
  createdAt: string;
  duration: string;
  expertName: string;
  imageUrl: string;
  updatedAt: string;
  videoUrl: string;
  _id: string;
}

const AyurvedaCard: React.FC<AyurvedaCardProps> = ({
  category,
  content,
  duration,
  expertName,
  imageUrl,
  videoUrl
}) => {
    const { theme } = useTheme();

  const formatDuration = (duration: string): string => {
    return duration.toLowerCase().includes('min') ? duration : `${duration} mins`;
  };

  return (
    <div
      className={`
        rounded-xl overflow-hidden shadow-lg transition-all duration-300 
        hover:shadow-xl hover:transform hover:-translate-y-1.5
        ${theme === 'light'
          ? 'bg-white text-gray-800 hover:shadow-orange-200'
          : 'bg-gray-800 text-white hover:shadow-yellow-800/30'
        }
      `}
    >
      {/* Media Section */}
      <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category}
            className="w-full h-full object-cover"
          />
        ) : videoUrl ? (
          <iframe
            src={getEmbedUrl(videoUrl) as string}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`${category} video`}
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${
            theme === 'light' ? 'bg-gray-100' : 'bg-gray-600'
          }`}>
            <span className="text-gray-400">No media available</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Category Badge */}
        <div className={`
          inline-block px-3 py-1 rounded-full text-xs font-medium mb-3
          ${theme === 'light' 
            ? 'bg-orange-100 text-orange-800' 
            : 'bg-yellow-900/30 text-yellow-300'
          }
        `}>
          {category}
        </div>

        {/* Content Preview */}
        <p className={`
          text-sm mb-3 line-clamp-2
          ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}
        `}>
          {content || 'No description available'}
        </p>

        {/* Meta Information */}
        <div className="flex items-center justify-between text-xs">
          <span className={`
            flex items-center gap-1
            ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}
          `}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatDuration(duration)}
          </span>
          
          <span className={`
            ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}
          `}>
            By {expertName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AyurvedaCard;