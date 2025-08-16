/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";
import { MOCK_HERO_IMAGES } from "../../../mockData";

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
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const heroScrollContainerRef = useRef<HTMLDivElement>(null);
  const heroVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const heroIntervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedUpdateSlideIndex = useRef(
    debounce((scrollLeft: number, clientWidth: number, totalSlides: number) => {
      if (clientWidth > 0) {
        const newIndex = Math.round(scrollLeft / clientWidth);
        if (
          newIndex >= 0 &&
          newIndex < totalSlides &&
          newIndex !== currentHeroSlide
        ) {
          setCurrentHeroSlide(newIndex);
        }
      }
    }, 150)
  ).current;
  const advanceHeroSlide = useCallback(() => {
    if (heroScrollContainerRef.current && MOCK_HERO_IMAGES.length > 0) {
      const currentItem = MOCK_HERO_IMAGES[currentHeroSlide];
      const videoElement =
        currentItem.type === "video"
          ? heroVideoRefs.current[currentHeroSlide]
          : null;

      if (videoElement && !videoElement.paused) {
        return;
      }

      const newSlideIndex = (currentHeroSlide + 1) % MOCK_HERO_IMAGES.length;
      heroScrollContainerRef.current.scrollTo({
        left: newSlideIndex * heroScrollContainerRef.current.clientWidth,
        behavior: "smooth",
      });
      setCurrentHeroSlide(newSlideIndex);
    }
  }, [currentHeroSlide]);
  useEffect(() => {
    heroVideoRefs.current = heroVideoRefs.current.slice(
      0,
      MOCK_HERO_IMAGES.length
    );
  }, []);
  useEffect(() => {
    const setupInterval = () => {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);

      const currentItem = MOCK_HERO_IMAGES[currentHeroSlide];
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
  }, [currentHeroSlide, advanceHeroSlide]);
  const handleManualHeroScroll = () => {
    if (heroScrollContainerRef.current) {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
      debouncedUpdateSlideIndex(
        heroScrollContainerRef.current.scrollLeft,
        heroScrollContainerRef.current.clientWidth,
        MOCK_HERO_IMAGES.length
      );
      setTimeout(() => {}, 5000);
    }
  };
  const handleVideoEvents = (
    index: number,
    eventType: "play" | "ended" | "pause"
  ) => {
    if (eventType === "play") {
      if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
    } else if (eventType === "ended") {
      advanceHeroSlide();
    } else if (eventType === "pause") {
      const videoElement = heroVideoRefs.current[index];
      if (videoElement && !videoElement.ended) {
        if (heroIntervalRef.current) clearInterval(heroIntervalRef.current);
        heroIntervalRef.current = setInterval(
          advanceHeroSlide,
          MOCK_HERO_IMAGES[index].duration || 10000
        );
      }
    }
  };

  return (
    <div className="relative bg-light-surface dark:bg-dark-surface">
      <div
        ref={heroScrollContainerRef}
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory h-full"
        onScroll={handleManualHeroScroll}
      >
        {MOCK_HERO_IMAGES.map((item, index) => (
          <div
            key={index}
            className="w-full flex-shrink-0 snap-center h-full bg-black relative"
          >
            {item.type === "image" || !item.videoUrl ? (
              <img
                src={item.url}
                alt={item.altText || `Hero image ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : (
              <video
                ref={(el: HTMLVideoElement | null) => {
                  heroVideoRefs.current[index] = el;
                }}
                src={item.videoUrl}
                className="absolute inset-0 w-full h-full object-cover" // ✅ FIX
                muted
                autoPlay={index === currentHeroSlide}
                loop={false}
                playsInline
                onPlay={() => handleVideoEvents(index, "play")}
                onEnded={() => handleVideoEvents(index, "ended")}
                onPause={() => handleVideoEvents(index, "pause")}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
