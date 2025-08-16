
import { HeartIcon } from '../../../constants';

const projectItems = [
  {
    id: 'project1',
    title: 'Community Kitchen Initiative',
    description: 'Providing nutritious meals to those in need.',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=300&fit=crop&q=75&seed=kitchen',
    budget: 500000,
    collectedAmount: 125000,
    deadlineDays: 45,
  },
  {
    id: 'project2',
    title: 'Vedic Library & Learning Center',
    description: 'A serene space for study and exploration of ancient texts.',
    imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&h=300&fit=crop&q=75&seed=library',
    budget: 1200000,
    collectedAmount: 350000,
    deadlineDays: 90,
  },
  {
    id: 'project3',
    title: 'Yoga & Wellness Workshops',
    description: 'Promoting holistic health through yoga and meditation.',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=300&fit=crop&q=75&seed=yoga',
    budget: 300000,
    collectedAmount: 275000,
    deadlineDays: 20,
  },
];

const OurProjects= () => {
  return (
    <section className="px-4 py-2 bg-light-primary dark:bg-primary"> {/* Reduced py further */}
      <h2 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-3 text-gradient bg-gradient-to-r from-brand-blue to-emerald-500">
        Our Project
      </h2>
      <div className="flex space-x-3 overflow-x-auto scrollbar-hide pb-3"> {/* Increased space-x slightly and pb */}
        {projectItems.map((item, index) => (
          <div 
            key={item.id} 
            className="flex-shrink-0 w-64 sm:w-72 group cursor-pointer transform hover:scale-105 transition-transform duration-300 ease-in-out"
            role="article"
            aria-labelledby={`project-title-${item.id}`}
          >
            <div 
              className={`relative h-44 sm:h-52 rounded-lg overflow-hidden shadow-xl group-hover:shadow-2xl group-hover:shadow-brand-orange/40 dark:group-hover:shadow-brand-yellow/40 animate-soft-breathing-shadow bg-light-surface dark:bg-dark-card border-2 border-transparent group-hover:border-brand-orange/50 transition-all duration-300`}
              style={{ animationDelay: `${index * 0.2}s`, '--tw-shadow-color': 'rgba(0,196,204,0.15)' } as React.CSSProperties} 
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-3 flex flex-col justify-end">
                <h3 id={`project-title-${item.id}`} className="text-lg font-semibold text-white mb-1 group-hover:text-brand-yellow transition-colors">{item.title}</h3>
                {item.description && <p className="text-xs text-gray-200 dark:text-gray-300 line-clamp-2 mb-2">{item.description}</p>}
                 <button
                    // onClick={(e) => { // Removed as the parent div is now clickable
                    //     e.stopPropagation(); 
                    //     onProjectClick(item);
                    // }}
                    className="mt-auto w-full bg-gradient-to-r from-brand-orange to-yellow-400 dark:from-brand-orange dark:to-yellow-500 hover:from-yellow-400 hover:to-brand-orange dark:hover:from-yellow-500 dark:hover:to-brand-orange bg-200% animate-background-pan-fast transition-all duration-300 text-white rounded-md py-2 px-3 text-xs font-medium flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                    aria-label={`Donate to ${item.title}`}
                  >
                    <HeartIcon className="w-3.5 h-3.5" />
                    Donate Now
                  </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProjects;