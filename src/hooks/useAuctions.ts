import { useState, useEffect, useCallback } from 'react';
import type { AuctionListing, Bid } from '@/types';
import { getAuctions, saveAuctions, getListings, generateId } from '@/lib/storage';
import { createSeedAuctions } from '@/lib/mockData';

function ensureSeedAuctions(): void {
  const auctions = getAuctions();
  if (auctions.length === 0) {
    const listings = getListings();
    if (listings.length > 0) {
      saveAuctions(createSeedAuctions(listings));
    }
  }
}

export function useAuctions(): {
  auctions: AuctionListing[];
  addAuction: (data: Omit<AuctionListing, 'id' | 'createdAt' | 'bids' | 'currentBid' | 'currentBidderId' | 'currentBidderName' | 'status'>) => AuctionListing;
  placeBid: (auctionId: string, bidderId: string, bidderName: string, amount: number) => { success: boolean; error?: string };
  refresh: () => void;
} {
  const [auctions, setAuctions] = useState<AuctionListing[]>([]);

  const refresh = useCallback(() => {
    ensureSeedAuctions();
    const all = getAuctions();
    const now = Date.now();
    const updated = all.map(a => {
      if (a.status === 'upcoming' && now >= a.startTime) {
        return { ...a, status: 'live' as const };
      }
      if (a.status === 'live' && now >= a.endTime) {
        return { ...a, status: 'ended' as const };
      }
      return a;
    });
    const hasChanges = updated.some((a, i) => a.status !== all[i].status);
    if (hasChanges) saveAuctions(updated);
    setAuctions(updated);
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  function addAuction(data: Omit<AuctionListing, 'id' | 'createdAt' | 'bids' | 'currentBid' | 'currentBidderId' | 'currentBidderName' | 'status'>): AuctionListing {
    const now = Date.now();
    const newAuction: AuctionListing = {
      ...data,
      id: generateId(),
      createdAt: now,
      bids: [],
      currentBid: data.startingBid,
      currentBidderId: '',
      currentBidderName: '',
      status: now >= data.startTime ? 'live' : 'upcoming',
    };
    const updated = [newAuction, ...getAuctions()];
    saveAuctions(updated);
    setAuctions(updated);
    return newAuction;
  }

  function placeBid(auctionId: string, bidderId: string, bidderName: string, amount: number): { success: boolean; error?: string } {
    const current = getAuctions();
    const auction = current.find(a => a.id === auctionId);
    if (!auction) return { success: false, error: 'Auction not found.' };
    if (auction.status !== 'live') return { success: false, error: 'Auction is not active.' };
    if (amount <= auction.currentBid) {
      return { success: false, error: `Bid must be higher than current bid of $${auction.currentBid.toLocaleString()}.` };
    }
    const bid: Bid = {
      id: generateId(),
      auctionId,
      bidderId,
      bidderName,
      amount,
      timestamp: Date.now(),
    };
    const updatedAuction: AuctionListing = {
      ...auction,
      currentBid: amount,
      currentBidderId: bidderId,
      currentBidderName: bidderName,
      bids: [...auction.bids, bid],
    };
    const updated = current.map(a => a.id === auctionId ? updatedAuction : a);
    saveAuctions(updated);
    setAuctions(updated);
    return { success: true };
  }

  return { auctions, addAuction, placeBid, refresh };
}
