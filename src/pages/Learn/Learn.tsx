import { useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useTheme } from "../../contexts/ThemeContext";
import TabButton from "../../components/LearnPage/TabButton/TabButton";
import Courses from "../../components/LearnPage/Courses/Courses";
import Videos from "../../components/LearnPage/Videos/Videos";
import AIChat from "../../components/LearnPage/AIChat/AIChat";
import Quiz from "./Quiz";


const Learn = () => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState("courses");
    return (
        <div className={`min-h-screen font-sans pb-20 ${
          theme === "light"
            ? "bg-white text-light-text-primary"
            : "bg-gray-800 text-dark-text-primary animate-soft-breathing-shadow"
        }`}>
      <PageHeader title="Learn & Explore" />

      <div className={`p-4 sticky top-[60px] z-30 mb-2 ${theme === 'light' ? 'bg-light-primary dark:bg-dark-primary shadow-sm' : 'bg-primary dark:bg-black shadow-md'}`}>
        <div className="flex gap-2">
          <TabButton tabId="courses" label="Courses" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton tabId="videos" label="Videos" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton tabId="ai" label="AI Assistant" activeTab={activeTab} setActiveTab={setActiveTab} />
          <TabButton tabId="quiz" label='Quiz' activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      <div className="p-4">
        {
          activeTab === "courses" && <Courses/>
        }
        {
          activeTab === "videos" && <Videos/>
        }
        {
          activeTab === "ai" && <AIChat/>
        }
        {
          activeTab === "quiz" && <Quiz/>
        }
      </div>

      {/* <main className="p-4 pt-0"> 
        {renderTabContent()}
      </main> */}

      {/* {currentQuiz && <QuizModal quiz={currentQuiz} onClose={() => setCurrentQuiz(null)} onComplete={handleQuizComplete} />}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black/70 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-[70]" onClick={() => setShowVideoModal(false)}>
          <div className={`w-full max-w-2xl rounded-lg shadow-2xl ${theme === 'light' ? 'bg-light-surface' : 'bg-dark-surface'}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end pt-2 pr-2">
              <button onClick={() => setShowVideoModal(false)} className={`p-1.5 rounded-full ${theme === 'light' ? 'hover:bg-black/10 text-black' : 'hover:bg-white/10 text-white'}`}><XIcon className="w-5 h-5" /></button>
            </div>
            <video src={selectedVideo.videoUrl} controls autoPlay className="w-full aspect-video rounded-b-lg">
              Your browser does not support the video tag.
            </video>
            <div className={`p-4 rounded-b-lg -mt-1 ${theme === 'light' ? 'bg-light-surface-alt' : 'bg-dark-surface-alt'}`}>
              <h3 className={`text-base font-semibold ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>{selectedVideo.title}</h3>
              <p className={`text-xs ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>{selectedVideo.instructor}</p>
            </div>
          </div>
        </div>
      )} */}
    </div>
    );
};

export default Learn;