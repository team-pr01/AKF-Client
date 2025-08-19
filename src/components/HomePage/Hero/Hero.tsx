/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetAllContentsQuery } from "../../../redux/Features/Content/contentApi";
import { getEmbedUrl } from "../../../utils/getEmbedUrl";

function debounce<F extends (...args: any[]) => any>(
  func: F,
  delay: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

const Hero = () => {
  const { data, isLoading } = useGetAllContentsQuery({});
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroScrollContainerRef = useRef<HTMLDivElement>(null);
  const heroVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const heroIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const contents = data?.data || [];
  const hasMultipleSlides = contents.length > 1;

  const debouncedUpdateSlideIndex = useRef(
    debounce((scrollLeft: number, clientWidth: number, totalSlides: number) => {
      if (clientWidth > 0) {
        // Calculate the current slide index based on scroll position
        const newIndex = Math.round(scrollLeft / clientWidth);

        // Ensure the index is within bounds
        if (newIndex >= 0 && newIndex < totalSlides) {
          setCurrentHeroSlide(newIndex);
        }
      }
    }, 150)
  ).current;

  const advanceHeroSlide = useCallback(() => {
    if (heroScrollContainerRef.current && contents.length > 0) {
      const currentItem = contents[currentHeroSlide];
      const videoElement =
        currentItem.type === "video"
          ? heroVideoRefs.current[currentHeroSlide]
          : null;

      if (videoElement && !videoElement.paused) {
        return;
      }

      const newSlideIndex = (currentHeroSlide + 1) % contents.length;
      heroScrollContainerRef.current.scrollTo({
        left: newSlideIndex * heroScrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentHeroSlide(newSlideIndex);
    }
  }, [currentHeroSlide, contents]);

  useEffect(() => {
    heroVideoRefs.current = heroVideoRefs.current.slice(0, contents.length);
  }, [contents]);

  useEffect(() => {
    if (!hasMultipleSlides) return; // Don't set up interval if only one slide

    const setupInterval = () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);

      const currentItem = contents[currentHeroSlide];
      if (currentItem.type === "image" || !currentItem.videoUrl) {
        heroIntervalRef.current = setInterval(
          advanceHeroSlide,
          currentItem.duration || 10000
        );
      } else {
        const videoElement = heroVideoRefs.current[currentHeroSlide];
        if (videoElement && videoElement.paused) {
          heroIntervalRef.current = setInterval(advanceHeroSlide, 10000);
        }
      }
    };

    setupInterval();

    return () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    };
  }, [currentHeroSlide, advanceHeroSlide, contents, hasMultipleSlides]);

  const handleManualHeroScroll = () => {
    if (heroScrollContainerRef.current) {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);

      const { scrollLeft, clientWidth } = heroScrollContainerRef.current;
      debouncedUpdateSlideIndex(scrollLeft, clientWidth, contents.length);
    }
  };

  // Handle click on dot to navigate to specific slide
  const goToSlide = (index: number) => {
    if (heroScrollContainerRef.current) {
      heroScrollContainerRef.current.scrollTo({
        left: index * heroScrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentHeroSlide(index);

      // Reset the auto-advance interval
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = setInterval(advanceHeroSlide, 10000);
    }
  };

  if (isLoading) {
    return (
      <div className="relative bg-light-surface dark:bg-dark-surface h-96 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">
          Loading hero content...
        </div>
      </div>
    );
  }

  if (!contents || contents.length === 0) {
    return (
      <div className="relative bg-light-surface dark:bg-dark-surface h-96 flex items-center justify-center">
        <div className="text-gray-500">No hero content available</div>
      </div>
    );
  }

  return (
    <div className="relative bg-light-surface dark:bg-dark-surface">
      <div
        ref={heroScrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory h-full"
        onScroll={handleManualHeroScroll}
      >
        {contents.map((item: any, index: number) => (
          <div
            key={index}
            className="w-full flex-shrink-0 snap-center h-66 bg-black relative"
          >
            {item.imageUrl ? (
              <img
                src={item.imageUrl}
                alt={item.title || `Hero image ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : item.videoUrl ? (
              <div className="relative w-full h-66">
                <iframe
                  src={getEmbedUrl(item.videoUrl) as string}
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="autoplay; picture-in-picture"
                  allowFullScreen
                  title={item.title || `Hero video ${index + 1}`}
                />
              </div>
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">No content available</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dots indicator - only show if multiple slides */}
      {hasMultipleSlides && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
          {contents.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentHeroSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Hero;
