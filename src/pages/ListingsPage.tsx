import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Grid, List, SortAsc } from 'lucide-react';
import clsx from 'clsx';
import CarCard from '@/components/ui/CarCard';
import SearchBar from '@/components/ui/SearchBar';
import type { CarListing, SearchFilters } from '@/types';

type ListingsPageProps = {
  listings: CarListing[];
};

type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'mileage-asc' | 'year-desc' | 'year-asc';

export default function ListingsPage({ listings }: ListingsPageProps) {
  const [searchParams] = useSearchParams();
  const [filtered, setFiltered] = useState<CarListing[]>(listings);
  const [sort, setSort] = useState<SortOption>('newest');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const initMake = searchParams.get('make') || '';

  useEffect(() => {
    setFiltered(applyFilters({ make: initMake, model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '', mileageMax: '', condition: '', transmission: '', fuelType: '', bodyStyle: '', driveType: '', color: '', location: '', keyword: '' }));
  }, [listings]);

  function applyFilters(f: SearchFilters): CarListing[] {
    return listings.filter(car => {
      if (f.keyword && !`${car.title} ${car.make} ${car.model} ${car.description} ${car.color}`.toLowerCase().includes(f.keyword.toLowerCase())) return false;
      if (f.make && car.make.toLowerCase() !== f.make.toLowerCase()) return false;
      if (f.model && !car.model.toLowerCase().includes(f.model.toLowerCase())) return false;
      if (f.yearMin && car.year < parseInt(f.yearMin)) return false;
      if (f.yearMax && car.year > parseInt(f.yearMax)) return false;
      if (f.priceMin && car.price < parseInt(f.priceMin)) return false;
      if (f.priceMax && car.price > parseInt(f.priceMax)) return false;
      if (f.mileageMax && car.mileage > parseInt(f.mileageMax)) return false;
      if (f.condition && car.condition !== f.condition) return false;
      if (f.transmission && car.transmission !== f.transmission) return false;
      if (f.fuelType && car.fuelType !== f.fuelType) return false;
      if (f.bodyStyle && car.bodyStyle !== f.bodyStyle) return false;
      if (f.driveType && car.driveType !== f.driveType) return false;
      if (f.color && !car.color.toLowerCase().includes(f.color.toLowerCase())) return false;
      if (f.location && !car.location.toLowerCase().includes(f.location.toLowerCase())) return false;
      return true;
    });
  }

  function handleSearch(f: SearchFilters) {
    setFiltered(applyFilters(f));
  }

  function sorted(): CarListing[] {
    const arr = [...filtered];
    switch (sort) {
      case 'newest': return arr.sort((a, b) => b.createdAt - a.createdAt);
      case 'oldest': return arr.sort((a, b) => a.createdAt - b.createdAt);
      case 'price-asc': return arr.sort((a, b) => a.price - b.price);
      case 'price-desc': return arr.sort((a, b) => b.price - a.price);
      case 'mileage-asc': return arr.sort((a, b) => a.mileage - b.mileage);
      case 'year-desc': return arr.sort((a, b) => b.year - a.year);
      case 'year-asc': return arr.sort((a, b) => a.year - b.year);
      default: return arr;
    }
  }

  const cars = sorted();

  // Group by make for sidebar
  const makeGroups: Record<string, number> = {};
  listings.forEach(c => { makeGroups[c.make] = (makeGroups[c.make] || 0) + 1; });

  const yearGroups: Record<string, number> = {};
  listings.forEach(c => {
    const decade = `${Math.floor(c.year / 10) * 10}s`;
    yearGroups[decade] = (yearGroups[decade] || 0) + 1;
  });

  return (
    <div className="min-h-screen bg-cream">
      {/* Header bar */}
      <div className="bg-navy py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-cream mb-2" style={{ fontFamily: 'Georgia, serif' }}>Browse Classic Cars</h1>
          <p className="text-cream opacity-60 text-sm">{listings.length} listings available</p>
          <div className="mt-6">
            <SearchBar onSearch={handleSearch} initialFilters={{ make: initMake }} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-xl vintage-border p-4 mb-4">
            <h3 className="font-bold text-navy mb-3 text-sm uppercase tracking-wide">Browse by Make</h3>
            {Object.entries(makeGroups).sort((a, b) => b[1] - a[1]).map(([make, count]) => (
              <button
                key={make}
                onClick={() => handleSearch({ make, model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '', mileageMax: '', condition: '', transmission: '', fuelType: '', bodyStyle: '', driveType: '', color: '', location: '', keyword: '' })}
                className="flex items-center justify-between w-full px-2 py-1.5 text-sm text-navy hover:bg-cream rounded transition-colors"
              >
                <span>{make}</span>
                <span className="bg-gold text-navy text-xs font-bold rounded-full px-2 py-0.5">{count}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-xl vintage-border p-4 mb-4">
            <h3 className="font-bold text-navy mb-3 text-sm uppercase tracking-wide">Browse by Era</h3>
            {Object.entries(yearGroups).sort((a, b) => a[0].localeCompare(b[0])).map(([decade, count]) => (
              <div key={decade} className="flex items-center justify-between px-2 py-1.5 text-sm text-navy">
                <span>{decade}</span>
                <span className="bg-cream text-navy text-xs rounded-full px-2 py-0.5 border border-gold">{count}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl vintage-border p-4">
            <h3 className="font-bold text-navy mb-3 text-sm uppercase tracking-wide">Condition</h3>
            {['Excellent', 'Very Good', 'Good', 'Fair', 'Project'].map(cond => (
              <button
                key={cond}
                onClick={() => handleSearch({ make: '', model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '', mileageMax: '', condition: cond, transmission: '', fuelType: '', bodyStyle: '', driveType: '', color: '', location: '', keyword: '' })}
                className="flex items-center justify-between w-full px-2 py-1.5 text-sm text-navy hover:bg-cream rounded transition-colors"
              >
                <span>{cond}</span>
                <span className="text-xs text-gray-400">{listings.filter(l => l.condition === cond).length}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 text-sm">{cars.length} result{cars.length !== 1 ? 's' : ''} found</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-white rounded-lg border border-gold p-1">
                <button
                  onClick={() => setView('grid')}
                  className={clsx('p-1.5 rounded', view === 'grid' ? 'bg-gold text-navy' : 'text-gray-400 hover:text-navy')}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={clsx('p-1.5 rounded', view === 'list' ? 'bg-gold text-navy' : 'text-gray-400 hover:text-navy')}
                >
                  <List size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg border border-gold px-3 py-2">
                <SortAsc size={16} className="text-gold" />
                <select
                  value={sort}
                  onChange={(e: any) => setSort(e.target.value as SortOption)}
                  className="text-sm text-navy focus:outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest Listed</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="year-desc">Year: Newest</option>
                  <option value="year-asc">Year: Oldest</option>
                  <option value="mileage-asc">Lowest Mileage</option>
                </select>
              </div>
            </div>
          </div>

          {cars.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-navy mb-2">No Cars Found</h3>
              <p className="text-gray-500">Try adjusting your search filters.</p>
            </div>
          ) : (
            <div className={clsx(
              view === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            )}>
              {cars.map(car => <CarCard key={car.id} car={car} compact={view === 'list'} />)}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
