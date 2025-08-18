/* eslint-disable @typescript-eslint/no-explicit-any */
import {  useEffect, useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { useTheme } from "../../contexts/ThemeContext";
import { CalendarIcon, EyeIcon, FacebookIcon, FilterIcon, HeartIcon, Link2Icon, LinkedinIcon, LoaderIcon, SearchLucideIcon, Share2Icon, TwitterIcon, XIcon } from "../../constants";

const categoryGradients = [
  'from-blue-500 to-sky-500 dark:from-blue-600 dark:to-sky-600',
  'from-green-500 to-emerald-500 dark:from-green-600 dark:to-emerald-600',
  'from-purple-500 to-indigo-500 dark:from-purple-600 dark:to-indigo-600',
  'from-pink-500 to-rose-500 dark:from-pink-600 dark:to-rose-600',
  'from-indigo-500 to-violet-500 dark:from-indigo-600 dark:to-violet-600',
  'from-teal-500 to-cyan-500 dark:from-teal-600 dark:to-cyan-600',
  'from-yellow-500 to-amber-500 dark:from-yellow-600 dark:to-amber-600',
];

const baseEnglishCategories = ['All', 'Education', 'Event', 'Health', 'Culture', 'Spirituality', 'Community'];
const News = () => {
    const { theme } = useTheme();
  
  const [selectedNewsItem, setSelectedNewsItem] = useState(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareTargetNews, setShareTargetNews] = useState(null);
  
  const [isTranslating, setIsTranslating] = useState<Record<string, boolean>>({}); 
  const [translatedArticles, setTranslatedArticles] = useState<Record<number, Record<string, any>>>({});
  const [loveReacts, setLoveReacts] = useState<Record<number, { count: number; loved: boolean }>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const initialNewsData = [
    {
      id: 1,
      title: "বৈদিক শিক্ষার নতুন পাঠক্রম চালু",
      summary: "আগামী শিক্ষাবর্ষ থেকে বৈদিক শিক্ষার নতুন পাঠক্রম চালু করা হবে। এই পাঠক্রমে সংস্কৃত ভাষা, বেদ, উপনিষদ, গীতা এবং অন্যান্য প্রাচীন গ্রন্থের শিক্ষা অন্তর্ভুক্ত করা হয়েছে।",
      content: `আগামী শিক্ষাবর্ষ থেকে বৈদিক শিক্ষার নতুন পাঠক্রম চালু করা হবে। এই পাঠক্রমে সংস্কৃত ভাষা, বেদ, উপনিষদ, গীতা এবং অন্যান্য প্রাচীন গ্রন্থের শিক্ষা অন্তর্ভুক্ত করা হয়েছে। নতুন পাঠক্রমের মাধ্যমে শিক্ষার্থীরা প্রাচীন ভারতীয় জ্ঞান ও দর্শনের সাথে পরিচিত হতে পারবে। এছাড়াও যোগ, আয়ুর্বেদ এবং ধ্যানের মতো বিষয়গুলিও শিক্ষা দেওয়া হবে। পাঠক্রমটি আধুনিক শিক্ষা পদ্ধতির সাথে সামঞ্জস্যপূর্ণভাবে তৈরি করা হয়েছে। ডিজিটাল মাধ্যমে শিক্ষাদান এবং অনলাইন কোর্সের ব্যবস্থাও থাকবে। এই উদ্যোগটি শিক্ষার্থীদের মধ্যে ভারতীয় সংস্কৃতির প্রতি আগ্রহ বাড়াতে সাহায্য করবে এবং তাদের নৈতিক ও আধ্যাত্মিক বিকাশে সহায়ক হবে।`,
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=60",
      date: "March 15, 2024",
      views: "2.5K",
      category: "Education" 
    },
    {
      id: 2,
      title: "সনাতন ধর্মের মূল্যবোধ শিক্ষা কর্মশালা",
      summary: "আগামী সপ্তাহে অনুষ্ঠিত হবে সনাতন ধর্মের মূল্যবোধ শিক্ষা বিষয়ক কর্মশালা। এই কর্মশালায় বিভিন্ন বিশেষজ্ঞ ও পণ্ডিতগণ অংশগ্রহণ করবেন।",
      content: `আগামী সপ্তাহে অনুষ্ঠিত হবে সনাতন ধর্মের মূল্যবোধ শিক্ষা বিষয়ক কর্মশালা। এই কর্মশালায় বিভিন্ন বিশেষজ্ঞ ও পণ্ডিতগণ অংশগ্রহণ করবেন। কর্মশালায় সনাতন ধর্মের মৌলিক মূল্যবোধ, নৈতিক শিক্ষা এবং আধ্যাত্মিক উন্নয়নের বিষয়ে আলোচনা করা হবে। বিশেষ করে যুব সমাজের মধ্যে এই মূল্যবোধগুলি কীভাবে প্রচার করা যায় সে বিষয়ে গুরুত্ব দেওয়া হবে। অংশগ্রহণকারীদের জন্য বিনামূল্যে প্রশিক্ষণ সামগ্রী ও সার্টিফিকেট প্রদান করা হবে। কর্মশালাটি অনলাইন এবং অফলাইন উভয় মাধ্যমেই পরিচালিত হবে।`,
      image: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800&auto=format&fit=crop&q=60",
      date: "March 14, 2024",
      views: "1.8K",
      category: "Event"
    },
    {
      id: 3,
      title: "যোগ ও ধ্যান শিবির",
      summary: "প্রতি শনিবার সকালে অনুষ্ঠিত হবে যোগ ও ধ্যান শিবির। এই শিবিরে অভিজ্ঞ যোগ শিক্ষক ও ধ্যান গুরুরা উপস্থিত থাকবেন।",
      content: `প্রতি শনিবার সকালে অনুষ্ঠিত হবে যোগ ও ধ্যান শিবির। এই শিবিরে অভিজ্ঞ যোগ শিক্ষক ও ধ্যান গুরুরা উপস্থিত থাকবেন। শিবিরে অংশগ্রহণকারীরা বিভিন্ন যোগাসন, প্রাণায়াম এবং ধ্যান পদ্ধতি শিখতে পারবেন। এছাড়াও স্বাস্থ্যকর জীবনযাপন ও মানসিক শান্তি বিষয়ে পরামর্শ দেওয়া হবে। সকল বয়সের মানুষের জন্য এই শিবির উন্মুক্ত। আগ্রহীরা অনলাইনে রেজিস্ট্রেশন করতে পারবেন। শিবিরের শেষে একটি বিশেষ মেডিটATION সেশনের আয়োজন করা হবে।`,
      image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&auto=format&fit=crop&q=60",
      date: "March 13, 2024",
      views: "3.2K",
      category: "Health"
    }
  ];
  
  const [newsFeed, setNewsFeed] = useState(initialNewsData);
  
  useEffect(() => {
    const initialLoveReacts: Record<number, { count: number; loved: boolean }> = {};
    newsFeed.forEach(article => {
        initialLoveReacts[article.id] = { count: Math.floor(Math.random() * 100) + 10, loved: false };
    });
    setLoveReacts(initialLoveReacts);
  }, [newsFeed]);

//   useEffect(() => {
//     newsFeed.forEach(article => {
//       translateArticleIfNeeded(article, dropdownSelectedLanguage);
//     });
//   }, [dropdownSelectedLanguage, newsFeed, translateArticleIfNeeded]);


  const filteredNews = newsFeed.filter(item => {
    const lowerQuery = searchQuery.toLowerCase();
    const currentTranslation = translatedArticles[item.id];
    
    const titleToSearch = currentTranslation?.title || item.title;
    const contentToSearch = currentTranslation?.content || item.content;
    const categoryToSearch = item.category; // Use original English category for filtering

    const matchesCategory = selectedCategory === 'All' || categoryToSearch === selectedCategory;
    const matchesSearch = !lowerQuery || 
                          titleToSearch.toLowerCase().includes(lowerQuery) ||
                          contentToSearch.toLowerCase().includes(lowerQuery);
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticleModal = (article: any) => {
    setSelectedNewsItem(article);
    setIsArticleModalOpen(true);
  };
  
  const handleLoveReact = (articleId: number) => {
    setLoveReacts(prev => {
        const currentReact = prev[articleId] || { count: 0, loved: false };
        return {
            ...prev,
            [articleId]: {
                count: currentReact.loved ? currentReact.count - 1 : currentReact.count + 1,
                loved: !currentReact.loved
            }
        };
    });
  };


  const handleShare = (newsItem: any) => {
    setShareTargetNews(newsItem);
    setShowShareModal(true);
  };

  return (
        <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans pb-20">
      <PageHeader title={"News Feed"} />

      <div className={`p-4 space-y-3 sticky top-[60px] z-30 border-b ${theme === 'light' ? 'bg-light-primary border-gray-200' : 'bg-primary border-gray-700/50 shadow-md'}`}> 
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-light-surface dark:bg-dark-surface-alt pl-10 pr-4 py-3 rounded-lg outline-none text-light-text-primary dark:text-dark-text-primary placeholder-light-text-tertiary dark:placeholder-dark-text-tertiary focus:ring-2 focus:ring-brand-orange transition-shadow focus:shadow-lg`}
            />
          </div>
          {/* <select
            value={dropdownSelectedLanguage.code}
            onChange={(e) => {
                const lang = appLanguages.find(l => l.code === e.target.value);
                if (lang) {
                  setDropdownSelectedLanguage(lang);
                }
            }}
            className={`bg-light-surface dark:bg-dark-surface-alt rounded-lg px-4 py-3 outline-none appearance-none cursor-pointer sm:min-w-[150px] text-light-text-primary dark:text-dark-text-primary focus:ring-2 focus:ring-brand-orange transition-shadow focus:shadow-md`}
            aria-label={translate('selectLanguageAria', "Select language for translation")}
          >
            {appLanguages.map((lang) => (
              <option key={lang.code} value={lang.code} className="bg-light-surface dark:bg-dark-surface text-light-text-primary dark:text-dark-text-primary">
                {lang.name}
              </option>
            ))}
          </select> */}
        </div>
      </div>

      <div className="p-4 space-y-4 pt-2">
        {filteredNews.length === 0 && !Object.values(isTranslating).some(v => v) ? (
          <div className={`text-center py-8 ${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>
            <FilterIcon className="w-12 h-12 mx-auto mb-2 text-gray-400 dark:text-gray-500 animate-subtle-beat" />
            <p className="text-lg">No news found.</p>
            <p className="text-sm">Try adjusting your search or category filters.</p>
          </div>
        ) : (
          filteredNews.map((item) => {
            const translationKey = `${item.id}`;
            const isLoadingTranslation = isTranslating[translationKey];
            const translated = translatedArticles[item.id];
            const displayTitle = translated?.title || item.title;
            const displaySummary = translated?.summary || item.summary;
            const { count: loveCount, loved: userLoved } = loveReacts[item.id] || { count: 0, loved: false };
            const displayCategory = "Category";
            const categoryColorIndex = baseEnglishCategories.indexOf(item.category);


            return (
            <div key={item.id} 
                className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl dark:hover:shadow-brand-yellow/20 hover:shadow-brand-orange/20 cursor-pointer transform hover:-translate-y-1 ${theme === 'light' ? 'bg-light-surface' : 'bg-dark-card animate-soft-breathing-shadow'}`}
                style={{'--tw-shadow-color': 'rgba(255,193,7,0.1)'} as React.CSSProperties}
                onClick={() => handleOpenArticleModal(item)}
            >
              <img 
                src={item.image} 
                alt={displayTitle}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4">
                <span className={`text-xs px-2.5 py-1 text-white rounded-full mb-2 inline-block bg-gradient-to-r ${categoryGradients[categoryColorIndex % categoryGradients.length] || 'from-gray-500 to-gray-600'}`}>
                  {displayCategory}
                </span>
                <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>
                  {isLoadingTranslation && !translated?.title ? <LoaderIcon className="w-5 h-5 inline animate-spin mr-2" /> : displayTitle}
                </h2>
                
                <p className={`text-sm line-clamp-3 ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>
                  {isLoadingTranslation && !translated?.summary ? <LoaderIcon className="w-4 h-4 inline animate-spin mr-1" /> : displaySummary}
                </p>

                <div className={`flex items-center justify-between text-xs mt-4 pt-3 ${theme === 'light' ? 'text-light-text-tertiary border-t border-gray-200' : 'text-dark-text-tertiary border-t border-gray-700'}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1" title="Date published">
                      <CalendarIcon className="w-3.5 h-3.5" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1" title="Views">
                      <EyeIcon className="w-3.5 h-3.5" />
                      <span>{item.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleLoveReact(item.id);}}
                        className={`p-1.5 rounded-full transition-colors transform hover:scale-110 ${userLoved ? 'text-pink-500 hover:text-pink-600' : `${theme === 'light' ? 'text-gray-400 hover:text-pink-500' : 'text-gray-500 hover:text-pink-500'}`}`}
                        aria-label={userLoved ? "Unlike article" : "Like article"}
                    >
                        <HeartIcon className={`w-4 h-4 ${userLoved ? 'fill-current' : ''}`} /> 
                    </button>
                    <span className="text-xs">{loveCount}</span>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleShare(item);}}
                        aria-label='Share'
                        className={`p-1.5 rounded-full transition-colors transform hover:scale-110 ${theme === 'light' ? 'hover:bg-brand-orange/10 text-gray-400 hover:text-brand-orange' : 'hover:bg-brand-orange/20 text-gray-500 hover:text-brand-orange'}`}
                    >
                        <Share2Icon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )})
        )}
      </div>

      {showShareModal && shareTargetNews && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100]" onClick={() => setShowShareModal(false)}>
          <div className={`rounded-xl p-6 w-full max-w-xs shadow-2xl animate-soft-breathing-shadow ${theme === 'light' ? 'bg-light-surface text-light-text-primary' : 'bg-dark-card text-dark-text-primary'}`} 
               style={{'--tw-shadow-color': theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,111,0,0.2)'} as React.CSSProperties}
               onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gradient bg-gradient-to-r from-brand-orange to-brand-yellow">Share News</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? 'text-gray-500 hover:bg-gray-200 hover:text-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
                aria-label="Close share modal"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              {(['facebook', 'twitter', 'linkedin', 'copy'] as const).map((platform, idx) => (
                <button
                  key={platform}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 hover:shadow-lg transform hover:scale-105
                            bg-gradient-to-r ${categoryGradients[idx % categoryGradients.length]} text-white hover:brightness-110 focus:ring-white/50 bg-200% hover:animate-background-pan-fast`}
                >
                  {platform === 'facebook' && <FacebookIcon className="w-5 h-5" />}
                  {platform === 'twitter' && <TwitterIcon className="w-5 h-5" />}
                  {platform === 'linkedin' && <LinkedinIcon className="w-5 h-5" />}
                  {platform === 'copy' && <Link2Icon className="w-5 h-5" />}
                  <span className="capitalize">{platform === 'copy' ? "Copy Link" : platform}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {isArticleModalOpen && selectedNewsItem && (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[90]" 
            onClick={() => setIsArticleModalOpen(false)}
        >
          <div 
            className={`rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-soft-breathing-shadow ${theme === 'light' ? 'bg-light-surface text-light-text-primary' : 'bg-dark-card text-dark-text-primary'}`}
            style={{'--tw-shadow-color': theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,111,0,0.2)'} as React.CSSProperties}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="article-modal-title"
          >
            <div className={`flex justify-between items-center p-4 border-b sticky top-0 rounded-t-xl ${theme === 'light' ? 'bg-light-surface border-gray-200' : 'bg-dark-card border-gray-700'}`}>
              <h2 id="article-modal-title" className="text-lg font-semibold text-gradient bg-gradient-to-r from-brand-orange to-brand-yellow truncate pr-2" title="Title">
                Title
              </h2>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className={`p-1.5 rounded-full transition-colors ${theme === 'light' ? 'text-gray-500 hover:bg-gray-200 hover:text-gray-700' : 'text-gray-400 hover:bg-gray-700 hover:text-white'}`}
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>
            <div className={`p-4 border-t flex justify-between items-center sticky bottom-0 rounded-b-xl ${theme === 'light' ? 'bg-light-surface border-gray-200' : 'bg-dark-card border-gray-700'}`}>
                <div className={`text-xs ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>
                    {selectedNewsItem.date} &bull; {selectedNewsItem.views} {'views'}
                </div>
                <div className="flex items-center gap-2">
                     <button 
                        onClick={() => { handleShare(selectedNewsItem); setIsArticleModalOpen(false); }}
                        className={`p-2 rounded-lg transition-colors transform hover:scale-105 ${theme === 'light' ? 'bg-gray-200 text-gray-600 hover:bg-gray-300' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        <Share2Icon className="w-4 h-4" />
                    </button>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default News;