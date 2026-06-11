import { Link } from 'react-router-dom';
import { Gavel, Clock, TrendingUp, Shield } from 'lucide-react';
import clsx from 'clsx';
import type { AuctionListing } from '@/types';
import { useCountdown } from '@/hooks/useCountdown';

type AuctionCardProps = {
  auction: AuctionListing;
};

export default function AuctionCard({ auction }: AuctionCardProps) {
  const countdown = useCountdown(auction.endTime);
  const imgSrc = auction.car.images && auction.car.images.length > 0
    ? auction.car.images[0]
    : 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80';

  const reserveMet = auction.currentBid >= auction.reservePrice;

  return (
    <Link
      to={`/auction/${auction.id}`}
      className="bg-white rounded-xl overflow-hidden vintage-border card-hover block"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={imgSrc}
          alt={auction.car.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'; }}
        />
        <div className="absolute top-2 left-2">
          <span className={clsx('px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide', {
            'bg-green-500 text-white auction-pulse': auction.status === 'live',
            'bg-yellow-400 text-navy': auction.status === 'upcoming',
            'bg-gray-500 text-white': auction.status === 'ended',
          })}>
            {auction.status === 'live' ? '🔴 LIVE' : auction.status === 'upcoming' ? '⏳ Upcoming' : '✅ Ended'}
          </span>
        </div>
        {auction.status === 'live' && (
          <div className="absolute top-2 right-2 bg-navy bg-opacity-90 rounded-lg px-2 py-1 text-gold text-xs font-bold flex items-center gap-1">
            <Clock size={12} />
            {String(countdown.hours).padStart(2,'0')}:{String(countdown.minutes).padStart(2,'0')}:{String(countdown.seconds).padStart(2,'0')}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-navy text-lg" style={{ fontFamily: 'Georgia, serif' }}>{auction.car.title}</h3>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Current Bid</div>
            <div className="text-2xl font-bold text-gold flex items-center gap-1">
              <TrendingUp size={18} /> ${auction.currentBid.toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500">{auction.bids.length} bid{auction.bids.length !== 1 ? 's' : ''}</div>
            <div className={clsx('flex items-center gap-1 text-xs font-medium mt-1', reserveMet ? 'text-green-600' : 'text-orange-500')}>
              <Shield size={12} /> {reserveMet ? 'Reserve Met' : 'Reserve Not Met'}
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
          <Gavel size={12} /> {auction.sellerName} · {auction.car.location}
        </div>
      </div>
    </Link>
  );
}
