import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import clsx from 'clsx';
import type { SearchFilters } from '@/types';

const MAKES = ['All Makes', 'Buick', 'Cadillac', 'Chevrolet', 'Chrysler', 'Dodge', 'Ford', 'Hudson', 'Lincoln', 'Mercury', 'Nash', 'Oldsmobile', 'Packard', 'Plymouth', 'Pontiac', 'Shelby', 'Studebaker', 'Other'];
const CONDITIONS = ['Any Condition', 'Excellent', 'Very Good', 'Good', 'Fair', 'Project'];
const BODY_STYLES = ['Any Style', 'Sedan', 'Coupe', 'Convertible', 'Roadster', 'Station Wagon', 'SUV', 'Truck', 'Van', 'Other'];
const TRANSMISSIONS = ['Any Transmission', 'Manual', 'Automatic', 'Semi-Automatic'];
const FUEL_TYPES = ['Any Fuel', 'Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other'];

const EMPTY_FILTERS: SearchFilters = {
  make: '', model: '', yearMin: '', yearMax: '', priceMin: '', priceMax: '',
  mileageMax: '', condition: '', transmission: '', fuelType: '',
  bodyStyle: '', driveType: '', color: '', location: '', keyword: '',
};

type SearchBarProps = {
  onSearch: (filters: SearchFilters) => void;
  initialFilters?: Partial<SearchFilters>;
};

export default function SearchBar({ onSearch, initialFilters }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({ ...EMPTY_FILTERS, ...initialFilters });
  const [advanced, setAdvanced] = useState(false);

  function handleChange(key: keyof SearchFilters, value: string) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setFilters(EMPTY_FILTERS);
    onSearch(EMPTY_FILTERS);
  }

  return (
    <div className="bg-navy rounded-2xl p-6 shadow-2xl">
      {/* Main search row */}
      <div className="flex gap-3 flex-wrap">
        <input
          type="text"
          placeholder="Search by keyword, model, color..."
          value={filters.keyword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('keyword', e.target.value)}
          className="flex-1 min-w-48 bg-navy-mid border border-gold rounded-lg px-4 py-3 text-cream placeholder-cream placeholder-opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <select
          value={filters.make}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleChange('make', e.target.value === 'All Makes' ? '' : e.target.value)}
          className="bg-navy-mid border border-gold rounded-lg px-4 py-3 text-cream text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        >
          {MAKES.map(m => <option key={m} value={m === 'All Makes' ? '' : m}>{m}</option>)}
        </select>
        <input
          type="number"
          placeholder="Year From"
          value={filters.yearMin}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('yearMin', e.target.value)}
          className="w-28 bg-navy-mid border border-gold rounded-lg px-4 py-3 text-cream placeholder-cream placeholder-opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <input
          type="number"
          placeholder="Year To"
          value={filters.yearMax}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('yearMax', e.target.value)}
          className="w-28 bg-navy-mid border border-gold rounded-lg px-4 py-3 text-cream placeholder-cream placeholder-opacity-50 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
        />
        <button
          onClick={() => onSearch(filters)}
          className="bg-gold text-navy font-bold px-8 py-3 rounded-lg hover:bg-gold-light transition-colors flex items-center gap-2"
        >
          <Search size={18} /> Search
        </button>
        <button
          onClick={() => setAdvanced(!advanced)}
          className={clsx('px-4 py-3 rounded-lg border text-sm flex items-center gap-2 transition-colors', advanced ? 'border-gold bg-gold text-navy' : 'border-gold text-gold hover:bg-gold hover:text-navy')}
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Advanced filters */}
      {advanced && (
        <div className="mt-4 pt-4 border-t border-gold border-opacity-30 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Min Price</label>
            <input type="number" placeholder="$0" value={filters.priceMin}
              onChange={(e: any) => handleChange('priceMin', e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Max Price</label>
            <input type="number" placeholder="Any" value={filters.priceMax}
              onChange={(e: any) => handleChange('priceMax', e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Max Mileage</label>
            <input type="number" placeholder="Any" value={filters.mileageMax}
              onChange={(e: any) => handleChange('mileageMax', e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Condition</label>
            <select value={filters.condition}
              onChange={(e: any) => handleChange('condition', e.target.value === 'Any Condition' ? '' : e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold">
              {CONDITIONS.map(c => <option key={c} value={c === 'Any Condition' ? '' : c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Body Style</label>
            <select value={filters.bodyStyle}
              onChange={(e: any) => handleChange('bodyStyle', e.target.value === 'Any Style' ? '' : e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold">
              {BODY_STYLES.map(s => <option key={s} value={s === 'Any Style' ? '' : s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Transmission</label>
            <select value={filters.transmission}
              onChange={(e: any) => handleChange('transmission', e.target.value === 'Any Transmission' ? '' : e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold">
              {TRANSMISSIONS.map(t => <option key={t} value={t === 'Any Transmission' ? '' : t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Fuel Type</label>
            <select value={filters.fuelType}
              onChange={(e: any) => handleChange('fuelType', e.target.value === 'Any Fuel' ? '' : e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold">
              {FUEL_TYPES.map(f => <option key={f} value={f === 'Any Fuel' ? '' : f}>{f}</option>)}
            </select>
          </div>
          <div>
            <label className="text-gold text-xs uppercase tracking-wide block mb-1">Location</label>
            <input type="text" placeholder="City, State" value={filters.location}
              onChange={(e: any) => handleChange('location', e.target.value)}
              className="w-full bg-navy-mid border border-gold border-opacity-50 rounded px-3 py-2 text-cream text-sm focus:outline-none focus:ring-1 focus:ring-gold" />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <button onClick={handleReset} className="flex items-center gap-2 text-rust-light hover:text-cream text-sm transition-colors">
              <X size={14} /> Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
