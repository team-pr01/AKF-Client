/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTheme } from "../../../contexts/ThemeContext";

const TabButton = ({tabId, activeTab, setActiveTab, label} : any) => {
    const { theme } = useTheme();
    return (
        <button
        onClick={() => setActiveTab(tabId)}
        className={`flex-1 py-2.5 sm:py-3 px-1 text-xs sm:text-sm rounded-lg transition-all duration-200 ease-in-out font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-opacity-70 transform hover:scale-105
        ${ activeTab === tabId 
            ? `bg-gradient-to-r from-brand-orange to-yellow-500 text-white shadow-lg ${theme === 'dark' ? 'animate-background-pan-fast bg-200%' : ''}` 
            : `${theme === 'light' ? 'bg-light-surface-alt text-light-text-secondary hover:bg-gray-200' : 'bg-dark-surface-alt text-dark-text-secondary hover:bg-gray-700 hover:text-dark-text-primary'}`
        }`}
    >
        {label}
    </button>
    );
};

export default TabButton;