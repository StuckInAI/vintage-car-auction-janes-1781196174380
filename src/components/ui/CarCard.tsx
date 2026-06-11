import { Link } from 'react-router-dom';
import { Eye, MapPin, Calendar, Gauge } from 'lucide-react';
import clsx from 'clsx';
import type { CarListing } from '@/types';

type CarCardProps = {
  car: CarListing;
  compact?: boolean;
};

export default function CarCard({ car, compact }: CarCardProps) {
  const imgSrc = car.images && car.images.length > 0
    ? car.images[0]
    : 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80';

  return (
    <Link
      to={`/listings/${car.id}`}
      className={clsx(
        'bg-white rounded-xl overflow-hidden vintage-border card-hover block',
        compact ? 'flex gap-3 items-center p-2' : ''
      )}
    >
      <div className={clsx('overflow-hidden', compact ? 'w-24 h-20 rounded-lg flex-shrink-0' : 'h-52')}>
        <img
          src={imgSrc}
          alt={car.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'; }}
        />
      </div>
      <div className={clsx('p-4', compact ? 'flex-1 p-2' : '')}>
        <div className="flex items-start justify-between gap-2">
          <h3 className={clsx('font-bold text-navy', compact ? 'text-sm' : 'text-lg')} style={{ fontFamily: 'Georgia, serif' }}>
            {car.title}
          </h3>
          <span className={clsx('bg-gold text-navy font-bold rounded px-2 py-1 whitespace-nowrap', compact ? 'text-xs' : 'text-sm')}>
            ${car.price.toLocaleString()}
          </span>
        </div>
        {!compact && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Calendar size={12} /> {car.year}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Gauge size={12} /> {car.mileage.toLocaleString()} mi
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <MapPin size={12} /> {car.location}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <Eye size={12} /> {car.viewCount} views
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <span className={clsx('rounded-full px-2 py-0.5 text-xs font-medium', {
            'bg-green-100 text-green-700': car.condition === 'Excellent',
            'bg-blue-100 text-blue-700': car.condition === 'Very Good',
            'bg-yellow-100 text-yellow-700': car.condition === 'Good',
            'bg-orange-100 text-orange-700': car.condition === 'Fair',
            'bg-red-100 text-red-700': car.condition === 'Project',
          })}>
            {car.condition}
          </span>
          {!compact && (
            <span className="text-xs text-gray-500 bg-gray-100 rounded-full px-2 py-0.5">{car.transmission}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
