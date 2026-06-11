import { useState, useEffect, useCallback } from 'react';
import type { CarListing } from '@/types';
import { getListings, saveListings, generateId } from '@/lib/storage';
import { SEED_LISTINGS } from '@/lib/mockData';

function ensureSeedListings(): void {
  const listings = getListings();
  if (listings.length === 0) {
    saveListings(SEED_LISTINGS);
  }
}

export function useListings(): {
  listings: CarListing[];
  addListing: (data: Omit<CarListing, 'id' | 'createdAt' | 'viewCount' | 'status'>) => CarListing;
  updateListing: (id: string, updates: Partial<CarListing>) => void;
  deleteListing: (id: string) => void;
  incrementView: (id: string) => void;
  refresh: () => void;
} {
  const [listings, setListings] = useState<CarListing[]>([]);

  const refresh = useCallback(() => {
    ensureSeedListings();
    setListings(getListings());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  function addListing(data: Omit<CarListing, 'id' | 'createdAt' | 'viewCount' | 'status'>): CarListing {
    const newListing: CarListing = {
      ...data,
      id: generateId(),
      createdAt: Date.now(),
      viewCount: 0,
      status: 'active',
    };
    const updated = [newListing, ...getListings()];
    saveListings(updated);
    setListings(updated);
    return newListing;
  }

  function updateListing(id: string, updates: Partial<CarListing>): void {
    const current = getListings();
    const updated = current.map(l => l.id === id ? { ...l, ...updates } : l);
    saveListings(updated);
    setListings(updated);
  }

  function deleteListing(id: string): void {
    const updated = getListings().filter(l => l.id !== id);
    saveListings(updated);
    setListings(updated);
  }

  function incrementView(id: string): void {
    const current = getListings();
    const updated = current.map(l => l.id === id ? { ...l, viewCount: l.viewCount + 1 } : l);
    saveListings(updated);
    setListings(updated);
  }

  return { listings, addListing, updateListing, deleteListing, incrementView, refresh };
}
