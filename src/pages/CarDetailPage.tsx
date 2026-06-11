import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail, Calendar, Gauge, Zap, Palette, Settings, ChevronLeft, Eye, Share2, Heart, Check } from 'lucide-react';
import type { CarListing, AuthState } from '@/types';

type CarDetailPageProps = {
  listings: CarListing[];
  incrementView: (id: string) => void;
  auth: AuthState;
};

export default function CarDetailPage({ listings, incrementView, auth }: CarDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [contactShown, setContactShown] = useState(false);

  const car = listings.find(l => l.id === id);

  useEffect(() => {
    if (car) incrementView(car.id);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy mb-4">Car Not Found</h2>
          <Link to="/listings" className="text-gold hover:underline">Back to Listings</Link>
        </div>
      </div>
    );
  }

  const imgSrc = (idx: number) => car.images && car.images.length > idx
    ? car.images[idx]
    : 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80';

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-navy py-4">
        <div className="max-w-7xl mx-auto px-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gold hover:text-gold-light text-sm">
            <ChevronLeft size={18} /> Back to Listings
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Images + Details */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="rounded-2xl overflow-hidden vintage-border mb-4 h-80 md:h-[480px]">
              <img
                src={imgSrc(activeImg)}
                alt={car.title}
                className="w-full h-full object-cover"
                onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'; }}
              />
            </div>
            {/* Thumbnails */}
            {car.images && car.images.length > 1 && (
              <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                {car.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImg === idx ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover"
                      onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'; }}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Title & Price */}
            <div className="bg-white rounded-2xl vintage-border p-6 mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-navy" style={{ fontFamily: 'Georgia, serif' }}>{car.title}</h1>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {car.location}</span>
                    <span className="flex items-center gap-1"><Eye size={14} /> {car.viewCount} views</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gold">${car.price.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-1">Asking Price</div>
                </div>
              </div>
            </div>

            {/* Specs grid */}
            <div className="bg-white rounded-2xl vintage-border p-6 mb-6">
              <h2 className="text-xl font-bold text-navy mb-4" style={{ fontFamily: 'Georgia, serif' }}>Vehicle Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: <Calendar size={16} />, label: 'Year', value: car.year },
                  { icon: <Gauge size={16} />, label: 'Mileage', value: `${car.mileage.toLocaleString()} mi` },
                  { icon: <Settings size={16} />, label: 'Transmission', value: car.transmission },
                  { icon: <Zap size={16} />, label: 'Engine', value: car.engineSize },
                  { icon: <Palette size={16} />, label: 'Color', value: car.color },
                  { icon: <Palette size={16} />, label: 'Interior', value: car.interiorColor },
                  { icon: <Settings size={16} />, label: 'Drive', value: car.driveType },
                  { icon: <Settings size={16} />, label: 'Fuel', value: car.fuelType },
                  { icon: <Settings size={16} />, label: 'Body', value: car.bodyStyle },
                  { icon: <Settings size={16} />, label: 'Doors', value: car.doors },
                  { icon: <Settings size={16} />, label: 'Condition', value: car.condition },
                  { icon: <Settings size={16} />, label: 'VIN', value: car.vin || 'N/A' },
                ].map(spec => (
                  <div key={spec.label} className="flex items-start gap-2 p-3 bg-cream rounded-lg">
                    <span className="text-gold mt-0.5">{spec.icon}</span>
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide">{spec.label}</div>
                      <div className="text-sm font-medium text-navy">{spec.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl vintage-border p-6 mb-6">
              <h2 className="text-xl font-bold text-navy mb-3" style={{ fontFamily: 'Georgia, serif' }}>Description</h2>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-2xl vintage-border p-6">
                <h2 className="text-xl font-bold text-navy mb-4" style={{ fontFamily: 'Georgia, serif' }}>Features & Options</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {car.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-navy">
                      <Check size={14} className="text-gold flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right: Seller info */}
          <div className="space-y-4">
            <div className="bg-navy rounded-2xl p-6 text-cream">
              <h3 className="text-gold font-bold text-lg mb-4" style={{ fontFamily: 'Georgia, serif' }}>Seller Information</h3>
              <div className="font-bold text-lg mb-1">{car.sellerName}</div>
              <div className="text-xs text-gold opacity-70 mb-4">Verified Seller</div>

              {contactShown ? (
                <div className="space-y-3">
                  <a href={`tel:${car.sellerPhone}`} className="flex items-center gap-3 bg-navy-mid rounded-lg p-3 hover:bg-gold hover:text-navy transition-all">
                    <Phone size={16} className="text-gold" /> {car.sellerPhone}
                  </a>
                  <a href={`mailto:${car.sellerEmail}`} className="flex items-center gap-3 bg-navy-mid rounded-lg p-3 hover:bg-gold hover:text-navy transition-all">
                    <Mail size={16} className="text-gold" /> {car.sellerEmail}
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => setContactShown(true)}
                  className="w-full bg-gold text-navy font-bold py-3 rounded-lg hover:bg-gold-light transition-colors"
                >
                  Show Contact Info
                </button>
              )}
            </div>

            <div className="bg-white rounded-2xl vintage-border p-4 space-y-3">
              <button
                onClick={() => setSaved(!saved)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg border-2 font-medium transition-all ${
                  saved ? 'border-red-400 bg-red-50 text-red-500' : 'border-gold text-gold hover:bg-gold hover:text-navy'
                }`}
              >
                <Heart size={18} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved' : 'Save Listing'}
              </button>
              <button
                onClick={() => { navigator.clipboard?.writeText(window.location.href); }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-gray-200 text-gray-500 hover:border-gold hover:text-gold transition-all font-medium"
              >
                <Share2 size={18} /> Share Listing
              </button>
            </div>

            {/* Similar cars */}
            <div className="bg-white rounded-2xl vintage-border p-4">
              <h3 className="font-bold text-navy mb-3 text-sm uppercase tracking-wide">Similar Cars</h3>
              <div className="space-y-3">
                {listings
                  .filter(l => l.id !== car.id && (l.make === car.make || Math.abs(l.year - car.year) <= 5))
                  .slice(0, 3)
                  .map(l => (
                    <Link key={l.id} to={`/listings/${l.id}`} className="flex gap-3 items-center group">
                      <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={l.images[0] || ''} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          onError={(e: any) => { e.target.src = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80'; }}
                        />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-navy group-hover:text-gold transition-colors">{l.title}</div>
                        <div className="text-xs text-gold">${l.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
