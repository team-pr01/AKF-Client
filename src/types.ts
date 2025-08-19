/* eslint-disable @typescript-eslint/no-explicit-any */


// Removed: import React from 'react'; as it's not used in this file.

export interface HeroContent {
  type: 'image' | 'video';
  url: string; // For images, src. For videos, can be a poster or src.
  videoUrl?: string; // Specific URL for video source
  altText?: string; 
  duration?: number; // For images, duration in ms (e.g., 10000 for 10s)
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode; 
}

export interface PopularDestinationItem {
  id:string;
  name: string; 
  imageUrl: string;
  type: string; 
}

export interface RecommendedItem {
  id: string;
  name: string;
  imageUrl: string;
}

export interface NavItem {
  id: string;
  name: string; 
  label?: string; 
  icon: React.ReactElement<{ className?: string }>; 
  onClick?: () => void;
}

export interface YogaProgram {
  id: string;
  title: string;
  description: string;
  image: string;
  level: 'beginner' | 'intermediate' | 'advanced' | string; 
  duration: string;
  instructor: string;
  category: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  views: string;
  category: string;
}

export interface Recipe {
  id: string;
  name: string;
  category: string; 
  ingredients: string[];
  instructions: string[];
  imageUrl: string; 
  cookingTime: string;
  difficulty: string; 
  cuisine: string; 
}

export interface EmergencyContact {
  name: string;
  number: string;
  available: string;
  type: 'call' | 'whatsapp';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  provider?: 'deepseek' | 'gemini'; 
  timestamp?: number; // Added for AKFPage and HelpSupportPage chat messages
}

export interface Course {
  title: string;
  description: string;
  duration: string;
  progress: number;
  image: string;
  lastLesson: string;
}

export interface RealVideo {
  title: string;
  duration: string;
  instructor: string;
  views: string;
  thumbnail: string;
  videoUrl: string;
}

export interface QuizTopic {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  userAnswerIndex?: number; 
}

export interface Quiz {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  questions: QuizQuestion[];
}

export interface VedicDate {
  vikramYear: number;
  month: string;
  paksha: string;
  tithi: string;
  nakshatra: string;
  yoga: string;
  karana: string;
  vara: string; 
  ayana: string;
  ritu: string;
}

export interface VastuTip {
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  category: string;
  tips: string[];
}

export interface VastuExpert {
  id: number;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  price: string;
  image: string;
  nextAvailable: string;
}

export interface VastuVideo {
  id: number;
  title: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  views: string;
}

export interface DailyHoroscopeItem {
  sign: string;
  prediction: string;
  lucky: {
    color: string;
    number: string;
    direction: string;
  };
}

export interface TempleDirectoryItem {
  type: 'temple' | 'org' | 'gurukul' | string; 
  name: string;
  image: string;
  location: string;
  rating: number;
  description: string;
  userId: string; 
  contactName?: string; 
}

export type ItemCategory = 'temple' | 'news' | 'yoga' | 'food' | 'vastu' | 'jyotish' | 'service' | 'other' | 'veda' | 'consultancy' | 'sanatanSthal'; // Added sanatanSthal

export interface SearchResultItem {
  id: string;
  category: ItemCategory;
  title: string;
  description?: string;
  imageUrl?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  originalData: any; 
  onClick?: () => void; 
}

export interface FilterOption {
  id: ItemCategory | 'all';
  name: string;
  icon?: React.ReactElement<{ className?: string }>; 
}

export type CommunityEntityType = 'user' | 'organization' | 'temple';

export interface CommunitySearchResultItem {
  id: string;
  name: string;
  type: CommunityEntityType;
  avatarUrl?: string; 
  description?: string; 
}

export interface CommunityEntity extends CommunitySearchResultItem {
   // description made optional in CommunitySearchResultItem
}

export interface MockCommunityUser {
    id: string; 
    name: string;
    avatarUrl?: string;
    description?: string; // Added for consistency if a user profile has a bio
}

export interface MockCommunityOrganization {
    id: string; 
    name: string;
    description: string;
    avatarUrl?: string; 
}

export interface NotificationItem {
  id: string;
  type: 'alert' | 'info' | 'community' | 'content';
  title: string;
  message: string;
  timestamp: string; 
  isRead: boolean;
  link?: string; 
  icon?: React.ReactElement; 
}

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  joinDate: string;
  bio?: string;
  stats?: {
    mantrasSaved?: number;
    quizzesTaken?: number;
    articlesRead?: number;
    newsLiked?: number; // New
    mantrasReported?: number; // New
    totalActivities?: number; // New
    recipesGenerated?: number; // New
    consultanciesHired?: number; // New
  };
  country?: string;
  state?: string;
  city?: string;
  village?: string;
  phone?: string;
  dob?: string; // Date of Birth
  preferredLanguage?: string; // Language code
}

export interface ProjectItem {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
  budget: number; 
  collectedAmount: number; 
  deadlineDays: number; 
}

export interface LanguageOption { // Used in VedaReaderPage for its own language selection
  code: string; 
  name: string; 
}

export interface Doctor {
  id: number;
  name: string;
  speciality: string;
  experience: string;
  rating: number;
  nextAvailable: string;
  image: string;
  price: string; 
  category: string; 
}

// UI String Types for i18n
export type UIStrings = {
  [key: string]: string;
};

export type AllTranslations = {
  [langCode: string]: UIStrings;
};

// --- Auth Types ---
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL?: string | null; // For Google Sign-in
  // Add other app-specific user fields that are part of UserProfileData
  country?: string;
  state?: string;
  city?: string;
  village?: string;
  phone?: string;
  dob?: string;
  preferredLanguage?: string;
}

export interface AuthContextType {
  currentUser: User | null;
  isLoadingAuth: boolean;
  loginWithEmail: (email: string, pass: string) => Promise<User | null>;
  signupWithEmail: (userData: Omit<UserProfileData, 'id' | 'joinDate' | 'stats' | 'avatarUrl'> & {password: string}) => Promise<User | null>;
  loginWithGoogle: () => Promise<User | null>;
  logout: () => Promise<void>;
  verifyOtp: (otp: string) => Promise<boolean>; 
  sendOtp: (method: 'email' | 'phone', recipient: string) => Promise<boolean>;
}

// --- Report Types ---
export type ReportReason = 'incorrect_sanskrit' | 'incorrect_translation' | 'offensive_content' | 'technical_issue' | 'other';

export interface ReportSubmission {
  verseId: string;
  reason: ReportReason;
  feedback: string;
  timestamp: string;
}

// --- Chat History Type for AKF Page ---
export type ChatHistory = Record<string, ChatMessage[]>;

// --- Sanatan Sthal Page Types ---
export interface SanatanSthalDirectoryItem {
  id: string;
  type: 'temple' | 'org' | 'gurukul';
  name: string;
  image: string;
  location: string;
  rating: number;
  description: string;
  userId: string; // For messaging, maps to receiverId
  contactName: string; // For messaging, maps to receiverName
  phone?: string; // Optional phone number for call functionality
}

export type SanatanSthalEntityType = 'temple' | 'org' | 'gurukul';

// --- Membership Page Types ---
export interface MembershipPlanFeature {
  name: string; // Name of the feature (e.g., "AI Recipe Generation")
  access: string; // Description of access (e.g., "Limited (5/month)", "Unlimited", "Standard")
  isHighlighted?: boolean; // Optional: to emphasize certain features
}
export interface MembershipPlan {
  id: string; // e.g., 'sadhaka', 'acharya', 'rishi'
  name: string; // e.g., "Sadhaka Plan"
  priceMonthlyUSD: number; 
  priceAnnualUSD?: number; // Optional annual price
  description: string; // Short description of the plan
  features: MembershipPlanFeature[];
  ctaText: string; // e.g., "Choose Sadhaka", "Upgrade to Rishi"
  isPopular?: boolean; // Optional: to highlight a plan
  icon?: React.ReactElement;
}

// --- Speech Recognition API Types ---
declare global {
  interface SpeechRecognitionEvent extends Event {
    readonly resultIndex: number;
    readonly results: SpeechRecognitionResultList;
    readonlyemma?: any; 
    readonly interpretation?: any;
  }

  interface SpeechRecognitionResultList {
    readonly length: number;
    item(index: number): SpeechRecognitionResult;
    [index: number]: SpeechRecognitionResult;
  }

  interface SpeechRecognitionResult {
    readonly isFinal: boolean;
    readonly length: number;
    item(index: number): SpeechRecognitionAlternative;
    [index: number]: SpeechRecognitionAlternative;
  }
  
  interface SpeechRecognitionAlternative {
    readonly transcript: string;
    readonly confidence: number;
  }

  interface SpeechRecognitionErrorEvent extends Event {
    readonly error: SpeechRecognitionErrorCode; 
    readonly message: string; 
  }

  type SpeechRecognitionErrorCode =
    | 'no-speech'
    | 'aborted'
    | 'audio-capture'
    | 'network'
    | 'not-allowed'
    | 'service-not-allowed'
    | 'bad-grammar'
    | 'language-not-supported';

  interface SpeechRecognitionStatic {
    new(): SpeechRecognition;
  }

  interface SpeechRecognition extends EventTarget {
    grammars: SpeechGrammarList;
    lang: string;
    continuous: boolean;
    interimResults: boolean;
    maxAlternatives: number;
    serviceURI?: string; 

    start(): void;
    stop(): void;
    abort(): void;

    onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
    onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
    onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
    onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
    onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  }

  interface SpeechGrammarList {
    addFromString(string: string, weight?: number): void;
    addFromURI(src: string, weight?: number): void;
    readonly length: number;
    item(index: number): SpeechGrammar;
    [index: number]: SpeechGrammar;
  }
  interface SpeechGrammar {
    src: string;
    weight: number;
  }

  interface Window {
    SpeechRecognition?: SpeechRecognitionStatic;
    webkitSpeechRecognition?: SpeechRecognitionStatic;
  }
}