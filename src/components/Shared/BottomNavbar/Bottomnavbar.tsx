import React from 'react';
import { AkfPlaceholderIcon, EmergencyIcon, HomeIcon } from '../../../constants';
import { useLocation } from 'react-router-dom';

const BottomNavbar = () => {
    const location = useLocation();
    const navItems= [
    { path: "home", name: "Home", icon: <HomeIcon />},
    {
      path: "learn",
      name: "Learn",
    icon: <EmergencyIcon />,
    },
    {
      path: "akf",
      name: "AKF",
      icon: <AkfPlaceholderIcon />,
    },
    {
      path: "news",
      name: "News",
    icon: <EmergencyIcon />,
    },
    {
      path: "emergency",
      name: "Emergency",
      icon: <EmergencyIcon />,
    },
  ];
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-light-surface dark:bg-dark-surface shadow-top-md z-50 border-t border-gray-200 dark:border-gray-700/50">
      <div className="max-w-md mx-auto h-16 flex justify-around items-center px-2">
        {navItems.map((item) => {
          const isActive = location?.pathname === item.path;
          const isEmergency = item.path === 'emergency';
          
          const iconColorClass = isActive 
            ? 'text-brand-orange' 
            : (isEmergency ? 'text-yellow-500 dark:text-yellow-400 group-hover:text-brand-orange dark:group-hover:text-brand-yellow' : 'text-gray-500 dark:text-gray-400 group-hover:text-brand-orange dark:group-hover:text-brand-yellow');
          
          let textColorClass = '';
          if (isActive) {
            textColorClass = 'text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-yellow font-semibold';
          } else if (isEmergency) {
            textColorClass = 'text-yellow-500 dark:text-yellow-400 group-hover:text-brand-orange dark:group-hover:text-brand-yellow';
          } else {
            textColorClass = 'text-gray-500 dark:text-gray-300 group-hover:text-brand-orange dark:group-hover:text-brand-yellow';
          }


          if (item.path === 'akf') { 
            return (
              <button
                key={item.path}
                aria-label={item.name}
                className="flex flex-col items-center justify-center text-center -mt-6 group" 
              >
                <div 
                  className={`bg-gradient-to-br from-brand-blue to-teal-400 dark:from-brand-blue dark:to-teal-500 w-14 h-14 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-brand-glow-blue transition-all duration-300 group-hover:scale-105
                              ${isActive && item.path === 'akf' ? 'animate-akf-active-pulse' : ''}`}
                >
                  {React.cloneElement(item.icon, { className: "w-8 h-8 text-white" })} 
                </div>
                <span 
                  className={`text-xs mt-1 transition-colors ${textColorClass}`}
                >
                  {item.name}
                </span>
              </button>
            );
          }
          return (
            <button
              key={item.path}
              aria-label={item.name}
              className={`flex flex-col items-center justify-center text-center p-1 flex-1 group transition-all duration-200 ease-in-out hover:bg-light-surface-alt/50 dark:hover:bg-dark-surface-alt/50 rounded-md transform hover:scale-105`}
            >
              <div className={`mb-0.5 transition-colors ${iconColorClass} ${isActive && !isEmergency ? 'animate-subtle-beat' : ''}`}>
                {React.cloneElement(item?.icon, { className: `w-5 h-5` })}
              </div>
              <span className={`text-xs transition-colors ${textColorClass}`}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
    );
};

export default BottomNavbar;