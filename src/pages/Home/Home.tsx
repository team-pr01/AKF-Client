import { useEffect, useRef, useState } from "react";
import Books from "../../components/HomePage/Books/Books";
import Hero from "../../components/HomePage/Hero/Hero";
import OurProjects from "../../components/HomePage/OurProjects/OurProjects";
import PageIconLinks from "../../components/HomePage/PageIconLinks/PageIconLinks";
import SearchBar from "../../components/HomePage/Searchbar/SearchBar";
import WelcomePopupModal from "../../components/HomePage/WelcomePopupModal";
import { useLocation } from "react-router-dom";
import { useGetAllPopupsQuery } from "../../redux/Features/Popup/popupApi";

const Home = () => {
  const { data, isLoading } = useGetAllPopupsQuery({});
  console.log(data);
  const location = useLocation();
  const [isWelcomePopupOpen, setIsWelcomePopupOpen] = useState(false);
  const [hasShownWelcomePopup, setHasShownWelcomePopup] = useState(false);
  const welcomePopupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    if (welcomePopupTimerRef.current) {
      clearTimeout(welcomePopupTimerRef.current);
      welcomePopupTimerRef.current = null;
    }

    if (location.pathname === "/" && !hasShownWelcomePopup) {
      welcomePopupTimerRef.current = setTimeout(() => {
        setIsWelcomePopupOpen(true);
        setHasShownWelcomePopup(true);
      }, 2000);
    } else if (location.pathname !== "/" && isWelcomePopupOpen) {
      setIsWelcomePopupOpen(false);
    }

    return () => {
      if (welcomePopupTimerRef.current) {
        clearTimeout(welcomePopupTimerRef.current);
        welcomePopupTimerRef.current = null;
      }
    };
  }, [location, hasShownWelcomePopup, isWelcomePopupOpen]);
  return (
    <div>
      <Hero />
      <div className="px-4 py-3 bg-light-primary dark:bg-primary">
        <SearchBar />
      </div>
      <PageIconLinks />
      <Books />
      <OurProjects />

      {!isLoading && (
        <WelcomePopupModal
          isOpen={isWelcomePopupOpen}
          onClose={() => setIsWelcomePopupOpen(false)}
          title={data?.data?.[0]?.title}
          message={data?.data?.[0]?.content}
          ctaText={data?.data?.[0]?.btnText}
          ctaLinkAction={data?.data?.[0]?.btnLink}
          imageUrl={data?.data?.[0]?.imageUrl}
          imageAlt={data?.data?.[0]?.title}
        />
      )}
    </div>
  );
};

export default Home;
