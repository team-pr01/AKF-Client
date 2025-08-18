/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import PageHeader from "../../components/Reusable/PageHeader/PageHeader";
import { CalendarIcon, ClockIcon, CompassIcon, FilterIcon, MoonIcon, SearchLucideIcon, StarIcon, SunIcon } from "../../constants";
import { useTheme } from "../../contexts/ThemeContext";
import type { VedicDate } from "../../types";
import { calculateVedicDate } from "../../utils/vedicTime";

const Jyotish = () => {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState("");

    const [currentVedicDate, setCurrentVedicDate] = useState<VedicDate>(calculateVedicDate());

  useEffect(() => {
    const timer = setInterval(() => setCurrentVedicDate(calculateVedicDate()), 60000); 
    return () => clearInterval(timer);
  }, []);

  const categories = [
  { id: "all", key: "allCategory", defaultName: "All", icon: <CompassIcon/> },
  { id: "kundli", key: "kundliCategory", defaultName: "Kundli", icon: <StarIcon/> },
  { id: "horoscope", key: "horoscopeCategory", defaultName: "Horoscope", icon: <SunIcon/> },
  { id: "muhurta", key: "muhurtaCategory", defaultName: "Muhurta", icon: <ClockIcon/> },
  { id: "panchang", key: "panchangCategory", defaultName: "Panchang", icon: <CalendarIcon/> },
];

  const dailyHoroscope = [
  {
    sign: "Aries",
    prediction: "A favorable day ahead. New opportunities may arise in your career. Focus on your goals.",
    lucky: { color: "Red", number: "9", direction: "North" }
  },
  {
    sign: "Taurus",
    prediction: "Family life will be peaceful and harmonious. Good time for financial planning.",
    lucky: { color: "Green", number: "6", direction: "South-East" }
  }
];
    return (
        <div className="min-h-screen bg-light-primary dark:bg-primary text-light-text-primary dark:text-dark-text-primary font-sans pb-20">
      <PageHeader title={"Jyotish & Astrology"} />

      <main className="pt-4">
        <section className="p-4">
          <div className={`rounded-xl p-5 sm:p-6 shadow-xl ${theme === 'light' ? 'bg-light-surface border border-gray-200' : 'bg-dark-card border border-gray-700/50'}`}>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center shadow-md">
                <CalendarIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>Vedic Calendar</h2>
                <p className={`text-xs sm:text-sm ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>VS {currentVedicDate.vikramYear} • {currentVedicDate.month}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className={`rounded-lg p-4 space-y-2 shadow-inner ${theme === 'light' ? 'bg-light-surface-alt/50' : 'bg-dark-surface/50'}`}>
                <h3 className="font-semibold text-brand-orange mb-1.5">Current Period</h3>
                {(Object.keys(currentVedicDate) as Array<keyof VedicDate>)
                  .filter(key => !['vikramYear', 'month', 'paksha', 'tithi', 'nakshatra', 'yoga', 'karana', 'vara'].includes(key))
                  .map(key => ( 
                  <div key={key} className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'} capitalize`}>{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className={`${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'} font-medium`}>{currentVedicDate[key]}</span>
                  </div>
                ))}
              </div>
              
              <div className={`rounded-lg p-4 space-y-2 shadow-inner ${theme === 'light' ? 'bg-light-surface-alt/50' : 'bg-dark-surface/50'}`}>
                 <h3 className="font-semibold text-brand-orange mb-1.5">Today's Panchang</h3>
                {(['tithi', 'paksha', 'nakshatra', 'yoga', 'karana', 'vara'] as Array<keyof VedicDate>) 
                  .map(key => (
                  <div key={key} className="flex justify-between items-center">
                    <span className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'} capitalize`}>{key}:</span>
                    <span className={`${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'} font-medium`}>
                      {key === 'tithi' ? `${currentVedicDate.paksha} ${currentVedicDate.tithi}` : (currentVedicDate as any)[key]}
                    </span>
                  </div>
                )).filter((_,i) => {
                    const explicitPanchangKeys: (keyof VedicDate)[] = ['tithi', 'nakshatra', 'yoga', 'karana', 'vara'];
                    return explicitPanchangKeys.includes(['tithi', 'nakshatra', 'yoga', 'karana', 'vara'][i] as keyof VedicDate);
                 })}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                 <div className={`rounded-lg p-4 shadow-inner ${theme === 'light' ? 'bg-light-surface-alt/50' : 'bg-dark-surface/50'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                        <SunIcon className="w-5 h-5 text-yellow-400" />
                        <h3 className="font-semibold text-brand-orange">Sun Transit</h3>
                    </div>
                    <div className="flex justify-between"><span className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>Sunrise:</span> <span className={`${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'} font-medium`}>6:15 AM</span></div>
                    <div className="flex justify-between"><span className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>Sunset:</span> <span className={`${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'} font-medium`}>5:45 PM</span></div>
                </div>
                <div className={`rounded-lg p-4 shadow-inner ${theme === 'light' ? 'bg-light-surface-alt/50' : 'bg-dark-surface/50'}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                        <MoonIcon className="w-5 h-5 text-blue-300" />
                        <h3 className="font-semibold text-brand-orange">Moon Transit</h3>
                    </div>
                    <div className="flex justify-between"><span className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>Moonrise:</span> <span className={`${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'} font-medium`}>8:30 PM</span></div>
                    <div className="flex justify-between"><span className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>Moonset:</span> <span className={`${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'} font-medium`}>9:15 AM</span></div>
                </div>
            </div>
          </div>
        </section>

        <div className={`p-4 space-y-4 sticky top-[60px] z-30 ${theme === 'light' ? 'bg-light-primary dark:bg-dark-primary' : 'bg-primary dark:bg-black'}`}>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <SearchLucideIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-orange" />
              <input type="text" placeholder="Search astrologers, services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-brand-orange ${theme === 'light' ? 'bg-light-surface text-light-text-primary placeholder-light-text-tertiary' : 'bg-dark-surface-alt text-dark-text-primary placeholder-dark-text-tertiary'}`} />
            </div>
            <button className={`px-4 rounded-lg flex items-center gap-2 transition-colors ${theme === 'light' ? 'bg-light-surface text-light-text-secondary hover:bg-gray-200' : 'bg-dark-surface-alt text-dark-text-secondary hover:text-dark-text-primary hover:bg-gray-700'}`}>
              <FilterIcon className="w-5 h-5" /> <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {categories.map((category) => (
              <button key={category.id} onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full whitespace-nowrap text-xs sm:text-sm transition-all duration-200 ease-in-out shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-50 flex items-center ${
                  selectedCategory === category.id ? 'bg-brand-orange text-white font-semibold' : `${theme === 'light' ? 'bg-light-surface-alt text-light-text-secondary hover:bg-gray-200' : 'bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary'}`
                }`}>
                {React.cloneElement(category.icon, { className: `w-4 h-4 mr-1.5 ${selectedCategory === category.id ? 'text-white' : (theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary')}`})}
                Category Name
              </button>
            ))}
          </div>
        </div>
        
        <section className="p-4 pt-0">
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>Daily Horoscope</h2>
          <div className="space-y-4">
            {dailyHoroscope.map((horoscope, index) => (
              <div key={index} className={`rounded-lg p-4 shadow-lg ${theme === 'light' ? 'bg-light-surface' : 'bg-dark-card'}`}>
                <div className="flex items-center gap-3 mb-2.5">
                  <StarIcon className="w-6 h-6 text-yellow-400" />
                  <h3 className={`text-lg font-semibold ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>{horoscope.sign}</h3>
                </div>
                <p className={`text-sm mb-3 ${theme === 'light' ? 'text-light-text-secondary' : 'text-dark-text-secondary'}`}>{horoscope.prediction}</p>
                <div className={`grid grid-cols-3 gap-2 text-xs pt-3 ${theme === 'light' ? 'border-t border-gray-200' : 'border-t border-gray-700/50'}`}>
                  <div className="text-center"><p className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>Color</p><p className={`font-medium ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>{horoscope.lucky.color}</p></div>
                  <div className="text-center"><p className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>Number</p><p className={`font-medium ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>{horoscope.lucky.number}</p></div>
                  <div className="text-center"><p className={`${theme === 'light' ? 'text-light-text-tertiary' : 'text-dark-text-tertiary'}`}>Direction</p><p className={`font-medium ${theme === 'light' ? 'text-light-text-primary' : 'text-dark-text-primary'}`}>{horoscope.lucky.direction}</p></div>
                </div>
              </div>
            ))}
          </div>
           <button className={`mt-6 w-full text-brand-orange hover:bg-opacity-80 transition-colors rounded-lg py-2.5 text-sm font-medium ${theme === 'light' ? 'bg-brand-orange/10 hover:bg-brand-orange/20' : 'bg-brand-orange/20 hover:bg-brand-orange/30'}`}>
           View All Horoscopes
          </button>
        </section>

      </main>
    </div>
    );
};

export default Jyotish;