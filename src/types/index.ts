export type CarCondition = 'Excellent' | 'Very Good' | 'Good' | 'Fair' | 'Project';
export type TransmissionType = 'Manual' | 'Automatic' | 'Semi-Automatic';
export type FuelType = 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'Other';
export type BodyStyle = 'Sedan' | 'Coupe' | 'Convertible' | 'Roadster' | 'Station Wagon' | 'SUV' | 'Truck' | 'Van' | 'Other';
export type DriveType = 'RWD' | 'FWD' | 'AWD' | '4WD';
export type ListingStatus = 'active' | 'sold' | 'pending';
export type AuctionStatus = 'upcoming' | 'live' | 'ended';

export interface CarListing {
  id: string;
  title: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  condition: CarCondition;
  transmission: TransmissionType;
  fuelType: FuelType;
  bodyStyle: BodyStyle;
  driveType: DriveType;
  engineSize: string;
  color: string;
  interiorColor: string;
  doors: number;
  vin: string;
  description: string;
  features: string[];
  images: string[];
  location: string;
  sellerName: string;
  sellerPhone: string;
  sellerEmail: string;
  status: ListingStatus;
  createdAt: number;
  viewCount: number;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidderId: string;
  bidderName: string;
  amount: number;
  timestamp: number;
}

export interface AuctionListing {
  id: string;
  carId: string;
  car: CarListing;
  sellerId: string;
  sellerName: string;
  reservePrice: number;
  startingBid: number;
  currentBid: number;
  currentBidderId: string;
  currentBidderName: string;
  bids: Bid[];
  status: AuctionStatus;
  durationHours: number;
  startTime: number;
  endTime: number;
  createdAt: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'seller' | 'bidder' | 'both';
  createdAt: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface SearchFilters {
  make: string;
  model: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  mileageMax: string;
  condition: string;
  transmission: string;
  fuelType: string;
  bodyStyle: string;
  driveType: string;
  color: string;
  location: string;
  keyword: string;
}
