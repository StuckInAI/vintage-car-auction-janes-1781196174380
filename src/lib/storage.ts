import type { CarListing, AuctionListing, User } from '@/types';

const LISTINGS_KEY = 'vccp_listings';
const AUCTIONS_KEY = 'vccp_auctions';
const USERS_KEY = 'vccp_users';
const AUTH_KEY = 'vccp_auth';

export function getListings(): CarListing[] {
  try {
    const raw = localStorage.getItem(LISTINGS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveListings(listings: CarListing[]): void {
  localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
}

export function getAuctions(): AuctionListing[] {
  try {
    const raw = localStorage.getItem(AUCTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveAuctions(auctions: AuctionListing[]): void {
  localStorage.setItem(AUCTIONS_KEY, JSON.stringify(auctions));
}

export function getUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getStoredAuth(): { userId: string } | null {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAuth(userId: string): void {
  localStorage.setItem(AUTH_KEY, JSON.stringify({ userId }));
}

export function clearAuth(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
