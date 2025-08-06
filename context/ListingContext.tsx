import React, { createContext, useContext, useState, useEffect } from 'react';
import { Listing, ListingContextType, SearchFilters } from '@/types';
import { mockListings } from '@/lib/mockData';

const ListingContext = createContext<ListingContextType | undefined>(undefined);

export function useListing() {
  const context = useContext(ListingContext);
  if (context === undefined) {
    throw new Error('useListing must be used within a ListingProvider');
  }
  return context;
}

interface ListingProviderProps {
  children: React.ReactNode;
}

export function ListingProvider({ children }: ListingProviderProps) {
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('silvershift_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        localStorage.removeItem('silvershift_favorites');
      }
    }
  }, []);

  const toggleFavorite = (listingId: string) => {
    const newFavorites = favorites.includes(listingId)
      ? favorites.filter(id => id !== listingId)
      : [...favorites, listingId];
    
    setFavorites(newFavorites);
    localStorage.setItem('silvershift_favorites', JSON.stringify(newFavorites));

    setListings(prevListings => 
      prevListings.map(listing => 
        listing.id === listingId 
          ? { 
              ...listing, 
              favoriteCount: favorites.includes(listingId) 
                ? listing.favoriteCount - 1 
                : listing.favoriteCount + 1 
            }
          : listing
      )
    );
  };

  const getFavoriteListings = (): Listing[] => {
    return listings.filter(listing => favorites.includes(listing.id));
  };

  const getListingById = (id: string): Listing | undefined => {
    return listings.find(listing => listing.id === id);
  };

  const value: ListingContextType = {
    listings,
    favorites,
    filters,
    isLoading,
    setFilters,
    toggleFavorite,
    getFavoriteListings,
    getListingById
  };

  return (
    <ListingContext.Provider value={value}>
      {children}
    </ListingContext.Provider>
  );
}