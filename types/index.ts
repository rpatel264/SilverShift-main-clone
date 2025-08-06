export interface User {
  id: string;
  email: string;
  name: string;
  userType: 'BUYER' | 'SELLER' | 'ADMIN';
  verified: boolean;
  subscriptionTier: 'FREE' | 'PRO' | 'ELITE';
  profile: Profile;
  createdAt: string;
}

export interface Profile {
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  // Buyer-specific fields
  buyerIndustries?: string[];
  buyerBudgetMin?: number;
  buyerBudgetMax?: number;
  buyerExperience?: string;
  // Seller-specific fields
  sellerBusinesses?: number;
  sellerExperience?: string;
}

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  industry: string;
  location: string;
  askingPrice: number;
  annualRevenue: number;
  yearEstablished: number;
  employeeCount?: number;
  status: 'DRAFT' | 'PUBLISHED' | 'SOLD' | 'WITHDRAWN';
  verified: boolean;
  confidenceScore?: number; // 0-100 trust score
  images: string[];
  viewCount: number;
  favoriteCount: number;
  inquiryCount: number;
  financials: Financial;
  createdAt: string;
}

export interface Financial {
  revenues: number[]; // Last 3 years
  profits: number[];
  expenses: number[];
  ebitda?: number;
  cashFlow?: number;
  grossMargin?: number;
}

export interface Inquiry {
  id: string;
  buyerId: string;
  listingId: string;
  message: string;
  status: 'PENDING' | 'RESPONDED' | 'CLOSED';
  messages: Message[];
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  duration: string;
  price: number;
  rating: number;
  imageUrl: string;
  isCompleted?: boolean;
  progress?: number;
}

export interface SearchFilters {
  industry?: string;
  priceMin?: number;
  priceMax?: number;
  location?: string;
  verified?: boolean;
  keyword?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (profileData: Partial<Profile>) => void;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  userType: 'BUYER' | 'SELLER';
  profile?: Partial<Profile>;
}

export interface ListingContextType {
  listings: Listing[];
  favorites: string[];
  filters: SearchFilters;
  isLoading: boolean;
  setFilters: (filters: SearchFilters) => void;
  toggleFavorite: (listingId: string) => void;
  getFavoriteListings: () => Listing[];
  getListingById: (id: string) => Listing | undefined;
}