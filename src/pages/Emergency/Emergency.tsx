import {
  PhoneIcon,
  MessageSquareIcon,
  ClockIcon,
  MapPinIcon,
} from '../../constants';
import { useTheme } from '../../contexts/ThemeContext';
import SendEmergencyMessageForm from '../../components/EmergencyPage/SendEmergencyMessageForm/SendEmergencyMessageForm';


const Emergency = () => {
  const { theme } = useTheme();

  const emergencyContacts = [
  { name: "AKF Emergency Hotline", number: "+8801612131631", available: "24/7", type: "call" },
  { name: "AKF WhatsApp Support", number: "+8801540731551", available: "24/7", type: "whatsapp" },
  { name: "AKF Office (Daytime)", number: "+8801540731551", available: "9 AM - 5 PM", type: "call" }
];

  return (
    <div 
      className={`min-h-screen font-sans pb-20 pt-3 ${theme === 'light' ? 'bg-red-50 text-red-800' : 'text-white bg-gray-800 dark:bg-gradient-to-br from-red-900 via-black to-black'}`}
    >

      <div className="p-4 flex flex-col gap-8">
       <SendEmergencyMessageForm/>

        <div>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-red-700' : 'text-gray-100'}`}>Quick Contacts</h2>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className={`rounded-lg p-4 flex items-center justify-between shadow-lg ${theme === 'light' ? 'bg-white border border-gray-200 text-gray-800' : 'bg-gray-900/60 backdrop-blur-sm border border-gray-700/50 text-gray-100'}`}
              >
                <div className="flex-1 min-w-0">
                  <h3 className={`font-medium truncate ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>{contact.name}</h3>
                  <p className="text-sm text-brand-orange font-medium">{contact.number}</p>
                  <div className={`flex items-center gap-1.5 mt-1 text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                    <ClockIcon className="w-3.5 h-3.5" />
                    <span>Available: {contact.available}</span>
                  </div>
                </div>
                <a
                  href={contact.type === 'whatsapp' 
                    ? `https://wa.me/${contact.number.replace(/[^0-9]/g, '')}`
                    : `tel:${contact.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-brand-orange p-3 ml-2 rounded-full hover:bg-opacity-80 transition-colors shadow-md flex-shrink-0"
                >
                  {contact.type === 'whatsapp' ? (
                    <MessageSquareIcon className="w-5 h-5 text-white" />
                  ) : (
                    <PhoneIcon className="w-5 h-5 text-white" />
                  )}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={`text-xl font-bold mb-4 ${theme === 'light' ? 'text-red-700' : 'text-gray-100'}`}>Visit Our Office</h2>
          <div className={`rounded-lg p-4 shadow-lg ${theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-900/60 backdrop-blur-sm border border-gray-700/50'}`}>
            <div className="flex items-center gap-3 mb-2">
              <MapPinIcon className={`w-5 h-5 ${theme === 'light' ? 'text-brand-orange' : 'text-brand-yellow' } flex-shrink-0`} />
              <h3 className={`font-medium ${theme === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>Arya Kalyan Foundation</h3>
            </div>
            <p className={`text-sm ml-8 ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}>Rangpur Sadar, Kamal Kachna, Notun Para, Rangpur, Bangladesh</p>
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=Arya+Kalyan+Foundation+Rangpur+Bangladesh`, '_blank')}
              className={`w-full mt-4 rounded-lg py-2.5 text-sm shadow-md focus:outline-none focus:ring-2 focus:ring-brand-orange transition-colors
                ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' : 'bg-gray-800/70 hover:bg-gray-700/70 text-gray-200'}`}
            >
              Get Directions on Google Maps
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
