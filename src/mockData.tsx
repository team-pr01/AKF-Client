// import { 
//     HeroContent, 
//     YogaProgram, NewsArticle, Recipe, PopularDestinationItem, 
//     VastuTip, DailyHoroscopeItem, VedicText, Verse, Section, Subsection, ItemCategory,
//     Course, RealVideo, QuizTopic, Quiz, EmergencyContact, ChatMessage, VastuExpert, VastuVideo,
//     TempleDirectoryItem, MockCommunityUser, MockCommunityOrganization,
//     UserProfileData, NotificationItem, Doctor, CommunityEntity,
//     SanatanSthalDirectoryItem
// } from './types';
import { 
    VastuServiceIcon,
    NewsIcon as NewsNavIcon, AlertCircleIcon, UsersIcon, BookOpenIcon
} from './constants'; 

// --- Hero Images & Videos ---
export const MOCK_HERO_IMAGES= [
  { type: 'image', url: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1920&h=1080&auto=format&fit=crop&q=80', altText: 'Beautiful serene landscape with mountains and a lake', duration: 10000 },
  { 
    type: 'video', 
    url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', // Poster or fallback image
    videoUrl: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', 
    altText: 'Short clip of Big Buck Bunny' 
    // Duration for videos is determined by the video itself
  },
  { type: 'image', url: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=1920&h=1080&auto=format&fit=crop&q=80', altText: 'Wooden pier extending into a calm blue lake with misty mountains', duration: 8000 },
  { type: 'image', url: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&h=1080&auto=format&fit=crop&q=80', altText: 'Green hills under a blue sky with a winding road', duration: 10000 },
  { type: 'image', url: 'https://images.unsplash.com/photo-1609766418204-94aae0ecf4e5?w=1920&h=1080&auto=format&fit=crop&q=80', altText: 'Sun setting over a tranquil ocean with waves lapping the shore', duration: 12000 },
  { 
    type: 'video', 
    url: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-shore-5856-large.mp4', // Poster
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-waves-coming-to-the-shore-5856-large.mp4', 
    altText: 'Calm waves on a shore' 
  },
  { type: 'image', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&auto=format&fit=crop&q=80', altText: 'Sunlight filtering through a dense forest canopy', duration: 10000 },
];


// --- Existing Mock Data (condensed for brevity) ---
export const MOCK_YOGA_PROGRAMS = [
    { id: 'yoga1', title: 'Morning Flow Yoga', description: 'Start your day with energizing yoga poses for all.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop', level: 'beginner', duration: '30 min', instructor: 'Sarah Johnson', category: 'Hatha Yoga' },
    { id: 'yoga2', title: 'Power Vinyasa', description: 'Dynamic and challenging flow sequence to build strength.', image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop', level: 'advanced', duration: '60 min', instructor: 'Michael Chen', category: 'Vinyasa' },
];
export const MOCK_NEWS_ARTICLES= [
    { id: 1, title: 'বৈদিক শিক্ষার নতুন পাঠক্রম', summary: 'আগামী শিক্ষাবর্ষ থেকে বৈদিক শিক্ষার নতুন পাঠক্রম চালু করা হবে।', content: '...', image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=200&fit=crop', date: 'Mar 15, 2024', views: '2.5K', category: 'Education' },
    { id: 2, title: 'সনাতন ধর্মের কর্মশালা', summary: 'আগামী সপ্তাহে অনুষ্ঠিত হবে সনাতন ধর্মের মূল্যবোধ শিক্ষা বিষয়ক কর্মশালা।', content: '...', image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=300&h=200&fit=crop', date: 'Mar 14, 2024', views: '1.8K', category: 'Event' },
];
export const MOCK_RECIPES= [
    { id: 'food1', name: 'Sattvic Khichdi', category: 'sattvic', ingredients: [], instructions: [], imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop', cookingTime: '30 mins', difficulty: 'Easy', cuisine: 'Vedic' },
];
export const MOCK_TEMPLE_DESTINATIONS= [
    { id: 'temple1', name: 'Jagannath Temple, Puri', imageUrl: 'https://images.unsplash.com/photo-1587135960431-7f6515a0ae40?w=300&h=200&fit=crop', type: 'Temple' },
    { id: 'temple2', name: 'Kashi Vishwanath', imageUrl: 'https://images.unsplash.com/photo-1612765352888-912a2c00a4a0?w=300&h=200&fit=crop', type: 'Temple' },
];
export const MOCK_VASTU_TIPS= [
    { title: 'Main Entrance Vastu', icon: <VastuServiceIcon/>, category: 'entrance', tips: ['North-East entrance is auspicious.'] },
];
export const MOCK_JYOTISH_ITEMS = [
    { sign: 'Aries (मेष)', prediction: 'A favorable day ahead. New opportunities may arise.', lucky: { color: 'Red', number: '9', direction: 'North' } },
];

// --- Mock data for Community Connect Page ---
export const MOCK_COMMUNITY_USERS= [
  { id: 'user1', name: 'Rohan Sharma', avatarUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=60', description: "Student of Vedanta" },
  { id: 'user2', name: 'Priya Patel', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29130?w=100&h=100&fit=crop&q=60', description: "Yoga Practitioner" },
  { id: 'user3', name: 'Amit Das', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=60', description: "Interested in Dharma" },
];

export const MOCK_COMMUNITY_ORGANIZATIONS= [
  { id: 'org1', name: 'Vedic Study Circle', description: 'Weekly discussions and study groups on Vedic texts.', avatarUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=100&h=100&fit=crop&q=60' },
  { id: 'org2', name: 'Community Kitchen Sewa', description: 'Serving free meals to the needy every Sunday.', avatarUrl: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=100&h=100&fit=crop&q=60' },
  { id: 'org3', name: 'Yoga & Meditation Center', description: 'Daily classes for all levels.', avatarUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=100&h=100&fit=crop&q=60' },
];

// --- Mock User Profile Data ---
export const MOCK_USER_PROFILE_DATA= {
  id: 'guestuser001', // Default guest ID
  name: 'Guest User',
  email: 'guest@example.com',
  avatarUrl: 'https://avatar.iran.liara.run/username?username=Guest+User', // Default avatar
  joinDate: new Date().toLocaleDateString(), // Today's date for guest
  bio: 'Exploring Vedic wisdom as a guest.',
  stats: {
    mantrasSaved: 5,
    quizzesTaken: 2,
    articlesRead: 10,
    newsLiked: 15,
    mantrasReported: 1,
    totalActivities: 33, // Example value
    recipesGenerated: 3,
    consultanciesHired: 0,
  },
  country: '',
  state: '',
  city: '',
  village: '',
  phone: '',
  dob: '',
  preferredLanguage: 'en', // Default language
};

// --- Mock Notifications Data ---
export const MOCK_NOTIFICATIONS = [
  {
    id: '1',
    type: 'content',
    title: 'New Article: The Essence of Upanishads',
    message: 'Explore the profound teachings of the Upanishads in our latest article.',
    timestamp: '2 hours ago',
    isRead: false,
    icon: <NewsNavIcon className="w-5 h-5 text-blue-400" />,
    link: '#news/article/essence-of-upanishads'
  },
  {
    id: '2',
    type: 'community',
    title: 'Community Event: Online Satsang this Sunday',
    message: 'Join us for an online satsang session this Sunday at 10 AM. Link will be shared soon.',
    timestamp: '1 day ago',
    isRead: true,
    icon: <UsersIcon className="w-5 h-5 text-green-400" />,
  },
  {
    id: '3',
    type: 'alert',
    title: 'Profile Update Required',
    message: 'Please update your profile information for a better experience.',
    timestamp: '3 days ago',
    isRead: false,
    icon: <AlertCircleIcon className="w-5 h-5 text-yellow-400" />,
  },
  {
    id: '4',
    type: 'info',
    title: 'Mantra of the Day: Om Namah Shivaya',
    message: 'Chant this powerful mantra for peace and clarity.',
    timestamp: 'Mar 15, 2024',
    isRead: true,
    icon: <BookOpenIcon className="w-5 h-5 text-purple-400" />,
  },
   {
    id: '5',
    type: 'content',
    title: 'Vastu Tip: Entrance Significance',
    message: 'Learn about the Vastu importance of your home entrance in our new Vastu guide.',
    timestamp: 'Mar 14, 2024',
    isRead: false,
    icon: <VastuServiceIcon className="w-5 h-5 text-indigo-400" />,
  },
];

// --- Mock Doctors for Consultancy Page ---
export const MOCK_DOCTORS= [
  {
    id: 1,
    name: 'Dr. Rajesh Kumar',
    speciality: 'Ayurvedic Physician',
    experience: '15 years',
    rating: 4.9,
    nextAvailable: '10:00 AM Tomorrow',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&q=60',
    price: '2000',
    category: 'Ayurvedic'
  },
  {
    id: 2,
    name: 'Dr. Priya Sharma',
    speciality: 'Yoga Therapist',
    experience: '12 years',
    rating: 4.8,
    nextAvailable: '2:30 PM Today',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&q=60',
    price: '1800',
    category: 'Yoga'
  },
  {
    id: 3,
    name: 'Dr. Amit Patel',
    speciality: 'Mental Health Specialist',
    experience: '10 years',
    rating: 4.7,
    nextAvailable: '11:15 AM Today',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&q=60',
    price: '2200',
    category: 'Mental Health'
  },
  {
    id: 4,
    name: 'Dr. Sunita Singh',
    speciality: 'Family Counselor',
    experience: '18 years',
    rating: 4.9,
    nextAvailable: '4:00 PM Today',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop&q=60',
    price: '2500',
    category: 'Family'
  },
  {
    id: 5,
    name: 'Dr. Arjun Mehta',
    speciality: 'Relationship Coach',
    experience: '9 years',
    rating: 4.6,
    nextAvailable: '9:00 AM Tomorrow',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&q=60',
    price: '1900',
    category: 'Relationship'
  }
];

// --- Mock Contacted Profiles for AKF Page ---
export const MOCK_CONTACTED_PROFILES= [
  { ...MOCK_COMMUNITY_USERS[0], type: 'user' },
  { ...MOCK_COMMUNITY_ORGANIZATIONS[0], type: 'organization'},
  { ...MOCK_COMMUNITY_USERS[1], type: 'user'},
  { id: MOCK_TEMPLE_DESTINATIONS[0].id, name:MOCK_TEMPLE_DESTINATIONS[0].name, type: 'temple', avatarUrl: MOCK_TEMPLE_DESTINATIONS[0].imageUrl, description: MOCK_TEMPLE_DESTINATIONS[0].type},
];

// --- Mock Chat History for AKF Page ---
export const MOCK_CHAT_HISTORY= {
  [MOCK_CONTACTED_PROFILES[0].id]: [
    { role: 'user', content: 'Namaste! Interested in your Vedanta study group.', timestamp: Date.now() - 3600000 },
    { role: 'assistant', content: 'Namaste! Thank you for your interest. Our group meets every Saturday at 5 PM. Would you like more details?', timestamp: Date.now() - 3500000 },
    { role: 'user', content: 'Yes, please. What topics do you usually cover?', timestamp: Date.now() - 3400000 },
  ],
  [MOCK_CONTACTED_PROFILES[1].id]: [
    { role: 'assistant', content: 'Welcome to Vedic Study Circle! How can we help you today?', timestamp: Date.now() - 7200000 },
    { role: 'user', content: 'I would like to know more about your weekly discussions.', timestamp: Date.now() - 7100000 },
  ],
  [MOCK_CONTACTED_PROFILES[2].id]: [
    { role: 'user', content: 'Hello Priya, I saw your profile on the community hub.', timestamp: Date.now() - 10800000 },
    { role: 'assistant', content: 'Hello! Nice to meet you. How can I help?', timestamp: Date.now() - 10700000 },
  ],
   [MOCK_CONTACTED_PROFILES[3].id]: [
    { role: 'user', content: 'Inquiring about darshan timings at Jagannath Temple.', timestamp: Date.now() - 14400000 },
    { role: 'assistant', content: 'Darshan timings are generally from 6 AM to 9 PM. Please check the official website for specific festival days.', timestamp: Date.now() - 14300000 },
  ],
};

// --- Mock Sanatan Sthal Directory Items ---
export const MOCK_SANATAN_STHAL_ITEMS = [
  {
    id: 'ssthal_temple1',
    type: 'temple',
    name: 'Sri Krishna Temple',
    image: 'https://images.unsplash.com/photo-1609766418204-94aae0ecf4e5?w=800&auto=format&fit=crop&q=60',
    location: 'Dhaka, Bangladesh',
    rating: 4.8,
    description: 'Ancient temple with daily puja and cultural activities. Known for its peaceful atmosphere and vibrant festivals.',
    userId: 'temple_admin_sk',
    contactName: 'Temple Administrator',
    phone: '+8801700000001'
  },
  {
    id: 'ssthal_gurukul1',
    type: 'gurukul',
    name: 'Vedic Gurukul Academy',
    image: 'https://images.unsplash.com/photo-1606166325683-e6deb697d301?w=800&auto=format&fit=crop&q=60',
    location: 'Chittagong, Bangladesh',
    rating: 4.9,
    description: 'Traditional Vedic education center offering courses on scriptures, Sanskrit, and yoga philosophy.',
    userId: 'gurukul_acharya_vga',
    contactName: 'Acharya Sharma',
    phone: '+8801800000002'
  },
  {
    id: 'ssthal_org1',
    type: 'org',
    name: 'Arya Kalyan Foundation (Main Branch)',
    image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?w=800&auto=format&fit=crop&q=60',
    location: 'Rangpur, Bangladesh',
    rating: 4.7,
    description: 'Cultural and spiritual organization promoting Vedic values, community service, and educational programs.',
    userId: 'org_secretary_akf',
    contactName: 'Foundation Secretary',
    phone: '+8801500000003'
  },
  {
    id: 'ssthal_temple2',
    type: 'temple',
    name: 'Radha Govinda Mandir',
    image: 'https://images.unsplash.com/photo-1624456735729-03594a40c5fb?w=800&auto=format&fit=crop&q=60',
    location: 'Sylhet, Bangladesh',
    rating: 4.6,
    description: 'Historic temple known for its beautiful architecture and serene devotional environment.',
    userId: 'temple_manager_rgm',
    contactName: 'Mandir Manager',
    phone: '+8801900000004'
  },
  {
    id: 'ssthal_gurukul2',
    type: 'gurukul',
    name: 'Sanskrit Learning Center',
    image: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=800&auto=format&fit=crop&q=60',
    location: 'Khulna, Bangladesh',
    rating: 4.5,
    description: 'Dedicated center for Sanskrit language studies and exploration of Vedic literature.',
    userId: 'gurukul_director_slc',
    contactName: 'Center Director',
    phone: '+8801600000005'
  },
  {
    id: 'ssthal_org2',
    type: 'org',
    name: 'Vedic Cultural Society',
    image: 'https://images.unsplash.com/photo-1567595747763-a9f8aa118370?w=800&auto=format&fit=crop&q=60',
    location: 'Rajshahi, Bangladesh',
    rating: 4.8,
    description: 'Actively promoting Vedic culture through workshops, seminars, and community gatherings.',
    userId: 'org_president_vcs',
    contactName: 'Society President',
    phone: '+8801300000006'
  }
];