import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import { useListing } from '@/context/ListingContext';
import { useAuth } from '@/context/AuthContext';
import { industries, locations } from '@/lib/mockData';
import { SearchFilters } from '@/types';

export default function ListingsPage() {
  const { listings, favorites, toggleFavorite } = useListing();
  const { isAuthenticated } = useAuth();
  const [localFilters, setLocalFilters] = useState<SearchFilters>({});
  const [sortBy, setSortBy] = useState<'price' | 'revenue' | 'date'>('date');

  const filteredAndSortedListings = useMemo(() => {
    const filtered = listings.filter((listing) => {
      if (listing.status !== 'PUBLISHED') return false;
      
      if (localFilters.industry && listing.industry !== localFilters.industry) return false;
      if (localFilters.location && listing.location !== localFilters.location) return false;
      if (localFilters.verified !== undefined && listing.verified !== localFilters.verified) return false;
      if (localFilters.priceMin && listing.askingPrice < localFilters.priceMin) return false;
      if (localFilters.priceMax && listing.askingPrice > localFilters.priceMax) return false;
      if (localFilters.keyword) {
        const keyword = localFilters.keyword.toLowerCase();
        const searchText = `${listing.title} ${listing.description} ${listing.industry}`.toLowerCase();
        if (!searchText.includes(keyword)) return false;
      }
      
      return true;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.askingPrice - b.askingPrice;
        case 'revenue':
          return b.annualRevenue - a.annualRevenue;
        case 'date':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
  }, [listings, localFilters, sortBy]);

  const handleFilterChange = (key: keyof SearchFilters, value: string | number | boolean | undefined) => {
    setLocalFilters(prev => {
      if (value === undefined || value === '' || value === 0) {
        const { [key]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [key]: value
      };
    });
  };

  const clearFilters = () => {
    setLocalFilters({});
  };

  return (
    <Layout>
      <div className="bg-white">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-screen-xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Businesses for sale
                </h1>
                <p className="text-gray-600 mt-1">
                  {filteredAndSortedListings.length} businesses • Browse verified opportunities
                </p>
              </div>
              
              {/* Filters Button */}
              <button className="md:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </div>

                {/* Search */}
                <div>
                  <Input
                    label="Search"
                    placeholder="Search businesses..."
                    value={localFilters.keyword || ''}
                    onChange={(e) => handleFilterChange('keyword', e.target.value)}
                  />
                </div>

                {/* Industry */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={localFilters.industry || ''}
                    onChange={(e) => handleFilterChange('industry', e.target.value || '')}
                  >
                    <option value="">All Industries</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={localFilters.location || ''}
                    onChange={(e) => handleFilterChange('location', e.target.value || '')}
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={localFilters.priceMin || ''}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={localFilters.priceMax || ''}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value ? Number(e.target.value) : undefined)}
                    />
                  </div>
                </div>

                {/* Verified Only */}
                <div>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={localFilters.verified === true}
                      onChange={(e) => handleFilterChange('verified', e.target.checked ? true : undefined)}
                    />
                    <span className="text-sm text-gray-700">Verified listings only</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="lg:col-span-3 mt-8 lg:mt-0">
              {/* Sort and Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-600">
                  {filteredAndSortedListings.length} businesses found
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Sort by:</span>
                  <select
                    className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'price' | 'revenue' | 'date')}
                  >
                    <option value="date">Newest First</option>
                    <option value="price">Price: Low to High</option>
                    <option value="revenue">Revenue: High to Low</option>
                  </select>
                </div>
              </div>

              {/* Listings Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedListings.map((listing) => (
                  <Link key={listing.id} href={`/listings/${listing.id}`}>
                    <div className="group cursor-pointer">
                      <div className="relative mb-3">
                        <div className="aspect-square bg-gray-200 rounded-xl overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <span className="text-4xl">
                              {listing.industry === 'Healthcare' ? '🏥' : 
                               listing.industry === 'Pet Services' ? '🐕' : 
                               listing.industry === 'Home Services' ? '🔧' : 
                               listing.industry === 'Automotive' ? '🚗' : 
                               listing.industry === 'Food & Beverage' ? '🍕' :
                               listing.industry === 'Professional Services' ? '💼' : '🏢'}
                            </span>
                          </div>
                        </div>
                        {isAuthenticated && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(listing.id);
                            }}
                            className="absolute top-3 right-3 p-2 hover:scale-110 transition-transform"
                          >
                            <svg 
                              className={`w-5 h-5 ${favorites.includes(listing.id) ? 'text-rose-500 fill-current' : 'text-gray-700 hover:text-rose-500'}`} 
                              fill={favorites.includes(listing.id) ? 'currentColor' : 'none'} 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                        )}
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 group-hover:underline truncate">
                            {listing.title}
                          </h3>
                          {listing.verified && (
                            <svg className="w-4 h-4 text-rose-500 flex-shrink-0 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{listing.location}</p>
                        <p className="text-gray-600 text-sm">{listing.industry}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold text-gray-900">
                            {formatCurrency(listing.askingPrice)}
                          </span>
                          <div className="flex items-center text-gray-600 text-xs">
                            <span>★ 4.{Math.floor(Math.random() * 9) + 1}</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500">
                          Revenue: {formatCurrency(listing.annualRevenue)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {filteredAndSortedListings.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your filters or search criteria
                  </p>
                  <Button variant="ghost" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}