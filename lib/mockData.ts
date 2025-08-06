import { User, Listing, Course } from '@/types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'john.buyer@email.com',
    name: 'John Smith',
    userType: 'BUYER',
    verified: true,
    subscriptionTier: 'PRO',
    profile: {
      phone: '+1-555-0123',
      location: 'San Francisco, CA',
      bio: 'Tech executive looking to transition into business ownership',
      avatar: '/avatars/john.jpg',
      buyerIndustries: ['Technology', 'Healthcare', 'Professional Services'],
      buyerBudgetMin: 200000,
      buyerBudgetMax: 800000,
      buyerExperience: 'First-time buyer with corporate management experience'
    },
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    email: 'sarah.seller@email.com',
    name: 'Sarah Johnson',
    userType: 'SELLER',
    verified: true,
    subscriptionTier: 'ELITE',
    profile: {
      phone: '+1-555-0456',
      location: 'Austin, TX',
      bio: 'Retiring business owner with 30+ years experience',
      avatar: '/avatars/sarah.jpg',
      sellerBusinesses: 2,
      sellerExperience: '30+ years in dental practice management'
    },
    createdAt: '2024-01-10T00:00:00Z'
  }
];

export const mockListings: Listing[] = [
  {
    id: '1',
    sellerId: '2',
    title: 'Established HVAC Service Company',
    description: 'Thriving HVAC business serving residential and commercial clients for over 15 years. Strong customer base, experienced team, and excellent reputation in the community.',
    industry: 'Home Services',
    location: 'Austin, TX',
    askingPrice: 450000,
    annualRevenue: 650000,
    yearEstablished: 2008,
    employeeCount: 8,
    status: 'PUBLISHED',
    verified: true,
    confidenceScore: 92,
    images: ['/listings/hvac-1.jpg', '/listings/hvac-2.jpg', '/listings/hvac-3.jpg'],
    viewCount: 234,
    favoriteCount: 18,
    inquiryCount: 7,
    financials: {
      revenues: [580000, 620000, 650000],
      profits: [145000, 155000, 162500],
      expenses: [435000, 465000, 487500],
      ebitda: 180000,
      cashFlow: 155000,
      grossMargin: 0.32
    },
    createdAt: '2024-01-20T00:00:00Z'
  },
  {
    id: '2',
    sellerId: '2',
    title: 'Premium Pet Grooming Salon',
    description: 'High-end pet grooming salon in affluent neighborhood. Loyal customer base, premium pricing, and growth potential.',
    industry: 'Pet Services',
    location: 'Beverly Hills, CA',
    askingPrice: 180000,
    annualRevenue: 240000,
    yearEstablished: 2015,
    employeeCount: 4,
    status: 'PUBLISHED',
    verified: true,
    confidenceScore: 88,
    images: ['/listings/pet-grooming-1.jpg', '/listings/pet-grooming-2.jpg'],
    viewCount: 156,
    favoriteCount: 23,
    inquiryCount: 12,
    financials: {
      revenues: [210000, 225000, 240000],
      profits: [63000, 67500, 72000],
      expenses: [147000, 157500, 168000],
      ebitda: 85000,
      cashFlow: 68000,
      grossMargin: 0.38
    },
    createdAt: '2024-01-18T00:00:00Z'
  },
  {
    id: '3',
    sellerId: '2',
    title: 'Modern Dental Practice',
    description: 'State-of-the-art dental practice with digital equipment and established patient base of 2,500+ active patients.',
    industry: 'Healthcare',
    location: 'Denver, CO',
    askingPrice: 800000,
    annualRevenue: 1200000,
    yearEstablished: 2010,
    employeeCount: 12,
    status: 'PUBLISHED',
    verified: true,
    confidenceScore: 95,
    images: ['/listings/dental-1.jpg', '/listings/dental-2.jpg', '/listings/dental-3.jpg'],
    viewCount: 342,
    favoriteCount: 31,
    inquiryCount: 15,
    financials: {
      revenues: [1050000, 1125000, 1200000],
      profits: [315000, 337500, 360000],
      expenses: [735000, 787500, 840000],
      ebitda: 420000,
      cashFlow: 385000,
      grossMargin: 0.42
    },
    createdAt: '2024-01-22T00:00:00Z'
  },
  {
    id: '4',
    sellerId: '2',
    title: 'Express Car Wash Business',
    description: 'Automated car wash with consistent revenue stream. Prime location with high traffic volume.',
    industry: 'Automotive',
    location: 'Phoenix, AZ',
    askingPrice: 120000,
    annualRevenue: 180000,
    yearEstablished: 2018,
    employeeCount: 3,
    status: 'PUBLISHED',
    verified: false,
    confidenceScore: 75,
    images: ['/listings/carwash-1.jpg', '/listings/carwash-2.jpg'],
    viewCount: 89,
    favoriteCount: 8,
    inquiryCount: 4,
    financials: {
      revenues: [165000, 172500, 180000],
      profits: [49500, 51750, 54000],
      expenses: [115500, 120750, 126000],
      ebitda: 62000,
      cashFlow: 58000,
      grossMargin: 0.28
    },
    createdAt: '2024-01-25T00:00:00Z'
  },
  {
    id: '5',
    sellerId: '2',
    title: 'Boutique Accounting Firm',
    description: 'Full-service accounting firm specializing in small to medium businesses. Strong recurring revenue model.',
    industry: 'Professional Services',
    location: 'Nashville, TN',
    askingPrice: 300000,
    annualRevenue: 400000,
    yearEstablished: 2012,
    employeeCount: 6,
    status: 'PUBLISHED',
    verified: true,
    confidenceScore: 90,
    images: ['/listings/accounting-1.jpg', '/listings/accounting-2.jpg'],
    viewCount: 178,
    favoriteCount: 14,
    inquiryCount: 9,
    financials: {
      revenues: [360000, 380000, 400000],
      profits: [108000, 114000, 120000],
      expenses: [252000, 266000, 280000],
      ebitda: 140000,
      cashFlow: 125000,
      grossMargin: 0.35
    },
    createdAt: '2024-01-21T00:00:00Z'
  }
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Business Acquisition Fundamentals',
    description: 'Learn the basics of buying and evaluating small businesses',
    category: 'Fundamentals',
    duration: '4 hours',
    price: 99,
    rating: 4.8,
    imageUrl: '/courses/fundamentals.jpg'
  },
  {
    id: '2',
    title: 'Financial Due Diligence',
    description: 'Master the art of analyzing business financials and identifying red flags',
    category: 'Finance',
    duration: '6 hours',
    price: 149,
    rating: 4.9,
    imageUrl: '/courses/due-diligence.jpg'
  },
  {
    id: '3',
    title: 'Negotiation Strategies',
    description: 'Effective negotiation techniques for business purchases',
    category: 'Negotiation',
    duration: '3 hours',
    price: 79,
    rating: 4.7,
    imageUrl: '/courses/negotiation.jpg'
  },
  {
    id: '4',
    title: 'Post-Acquisition Management',
    description: 'Successfully transition into business ownership',
    category: 'Management',
    duration: '5 hours',
    price: 129,
    rating: 4.6,
    imageUrl: '/courses/management.jpg'
  }
];

export const industries = [
  'Home Services',
  'Pet Services', 
  'Healthcare',
  'Automotive',
  'Food & Beverage',
  'Professional Services',
  'Technology',
  'Retail',
  'Manufacturing',
  'Education'
];

export const locations = [
  'Austin, TX',
  'San Francisco, CA',
  'Denver, CO',
  'Phoenix, AZ',
  'Nashville, TN',
  'Atlanta, GA',
  'Seattle, WA',
  'Miami, FL',
  'Chicago, IL',
  'New York, NY'
];