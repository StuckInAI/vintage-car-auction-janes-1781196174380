import { Link } from 'react-router-dom';
import { Car, Gavel, Search, Star, Shield, TrendingUp, ChevronRight } from 'lucide-react';
import CarCard from '@/components/ui/CarCard';
import AuctionCard from '@/components/ui/AuctionCard';
import type { CarListing, AuctionListing } from '@/types';

type HomePageProps = {
  listings: CarListing[];
  auctions: AuctionListing[];
};

const MAKES_FEATURED = [
  { name: 'Ford', years: '1932–1979', count: 0 },
  { name: 'Chevrolet', years: '1937–1979', count: 0 },
  { name: 'Dodge', years: '1940–1979', count: 0 },
  { name: 'Plymouth', years: '1940–1979', count: 0 },
  { name: 'Shelby', years: '1962–1970', count: 0 },
  { name: 'Buick', years: '1936–1970', count: 0 },
];

export default function HomePage({ listings, auctions }: HomePageProps) {
  const featured = listings.slice(0, 4);
  const liveAuctions = auctions.filter(a => a.status === 'live').slice(0, 3);

  const makesWithCount = MAKES_FEATURED.map(m => ({
    ...m,
    count: listings.filter(l => l.make === m.name).length,
  }));

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1600&q=80')` }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(26,26,46,0.3) 0%, rgba(26,26,46,0.9) 100%)' }} />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold bg-opacity-20 border border-gold rounded-full px-4 py-2 text-gold text-sm mb-6">
            <Star size={14} /> Premium Vintage Automobile Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-cream mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            <span className="text-gold">VCCP</span>
          </h1>
          <p className="text-xl md:text-2xl text-cream opacity-80 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Vintage Car Classified Portal
          </p>
          <p className="text-base text-cream opacity-60 mb-10 max-w-2xl mx-auto">
            Discover, buy, sell, and auction the world's finest vintage automobiles. From muscle cars to roadsters — your classic car journey starts here.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/listings" className="bg-gold text-navy font-bold px-8 py-4 rounded-full hover:bg-gold-light transition-all flex items-center gap-2 text-lg">
              <Car size={22} /> Browse Listings
            </Link>
            <Link to="/auction" className="border-2 border-gold text-gold px-8 py-4 rounded-full hover:bg-gold hover:text-navy transition-all flex items-center gap-2 text-lg">
              <Gavel size={22} /> Live Auctions
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-cream opacity-60 text-sm">
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">{listings.length}+</div>
              <div>Active Listings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">{liveAuctions.length}</div>
              <div>Live Auctions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">50+</div>
              <div>Classic Makes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold">1920s+</div>
              <div>Vintage Eras</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold animate-bounce">
          <ChevronRight size={32} className="rotate-90" />
        </div>
      </section>

      {/* Live Auctions Banner */}
      {liveAuctions.length > 0 && (
        <section className="bg-rust py-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center gap-3 text-white">
              <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
              <span className="font-bold tracking-wide uppercase text-sm">Live Auctions In Progress</span>
              <span className="text-white opacity-70 text-sm">— {liveAuctions.length} auction{liveAuctions.length !== 1 ? 's' : ''} active now</span>
            </div>
            <Link to="/auction" className="text-white font-bold text-sm hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
        </section>
      )}

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-navy" style={{ fontFamily: 'Georgia, serif' }}>Featured Listings</h2>
            <div className="w-16 h-1 bg-gold mt-2" />
          </div>
          <Link to="/listings" className="text-gold hover:text-gold-dark flex items-center gap-1 font-medium">
            View All <ChevronRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      {/* Browse by Make */}
      <section className="bg-navy-mid py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-cream" style={{ fontFamily: 'Georgia, serif' }}>Browse by Make</h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {makesWithCount.map(make => (
              <Link
                key={make.name}
                to={`/listings?make=${make.name}`}
                className="bg-navy rounded-xl p-4 text-center vintage-border card-hover"
              >
                <div className="text-gold text-2xl mb-1">🚗</div>
                <div className="text-cream font-bold text-sm">{make.name}</div>
                <div className="text-gold-light text-xs opacity-70">{make.years}</div>
                {make.count > 0 && (
                  <div className="mt-1 bg-gold text-navy text-xs font-bold rounded-full px-2 py-0.5 inline-block">
                    {make.count} listed
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Live Auctions section */}
      {liveAuctions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-navy flex items-center gap-3" style={{ fontFamily: 'Georgia, serif' }}>
                <Gavel className="text-gold" /> Live Auctions
              </h2>
              <div className="w-16 h-1 bg-gold mt-2" />
            </div>
            <Link to="/auction" className="text-gold hover:text-gold-dark flex items-center gap-1 font-medium">
              All Auctions <ChevronRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveAuctions.map(a => <AuctionCard key={a.id} auction={a} />)}
          </div>
        </section>
      )}

      {/* Why VCCP */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-navy" style={{ fontFamily: 'Georgia, serif' }}>Why Choose VCCP</h2>
            <div className="w-16 h-1 bg-gold mx-auto mt-2" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield size={36} className="text-gold" />, title: 'Verified Sellers', desc: 'Every seller is verified and listings are authentic. Buy with confidence.' },
              { icon: <Search size={36} className="text-gold" />, title: 'Advanced Search', desc: 'Filter by make, model, year, condition, price and dozens more parameters.' },
              { icon: <TrendingUp size={36} className="text-gold" />, title: 'Live Auctions', desc: 'Participate in real-time auctions with live bidding, timers and reserve prices.' },
            ].map(item => (
              <div key={item.title} className="text-center p-8 bg-white rounded-2xl vintage-border">
                <div className="flex justify-center mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-navy mb-3" style={{ fontFamily: 'Georgia, serif' }}>{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-cream mb-4" style={{ fontFamily: 'Georgia, serif' }}>Ready to Sell Your Classic?</h2>
          <p className="text-cream opacity-70 mb-8">List your vintage car with VCCP and reach thousands of serious collectors.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/sell" className="bg-gold text-navy font-bold px-8 py-4 rounded-full hover:bg-gold-light transition-all">
              List Your Car
            </Link>
            <Link to="/auction/create" className="border-2 border-gold text-gold px-8 py-4 rounded-full hover:bg-gold hover:text-navy transition-all">
              Start an Auction
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
