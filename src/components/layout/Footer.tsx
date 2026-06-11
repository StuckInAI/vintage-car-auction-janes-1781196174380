import { Link } from 'react-router-dom';
import { Car, Gavel, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-navy text-cream mt-auto">
      <div className="gold-gradient h-1" />
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <svg viewBox="0 0 60 60" width="40" height="40">
              <rect width="60" height="60" rx="8" fill="#1a1a2e" />
              <text x="30" y="42" fontFamily="Georgia, serif" fontSize="32" fontWeight="bold" textAnchor="middle" fill="#c9a227">V</text>
              <rect x="6" y="46" width="48" height="3" rx="1.5" fill="#c9a227" />
            </svg>
            <div>
              <div className="text-xl font-bold text-gold tracking-widest">VCCP</div>
              <div className="text-xs text-gold-light tracking-wide">Vintage Car Classified Portal</div>
            </div>
          </div>
          <p className="text-sm text-cream opacity-70 leading-relaxed">
            The premier destination for vintage and classic car enthusiasts. Buy, sell, and auction the finest automobiles from history.
          </p>
        </div>

        <div>
          <h4 className="text-gold font-bold mb-4 tracking-wide uppercase text-sm">Browse</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/listings" className="hover:text-gold transition-colors flex items-center gap-1"><Car size={14} /> All Listings</Link></li>
            <li><Link to="/listings?make=Ford" className="hover:text-gold transition-colors">Ford Classics</Link></li>
            <li><Link to="/listings?make=Chevrolet" className="hover:text-gold transition-colors">Chevrolet Classics</Link></li>
            <li><Link to="/listings?make=Dodge" className="hover:text-gold transition-colors">Dodge Classics</Link></li>
            <li><Link to="/listings?make=Shelby" className="hover:text-gold transition-colors">Shelby</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-bold mb-4 tracking-wide uppercase text-sm">Services</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link to="/sell" className="hover:text-gold transition-colors">List Your Car</Link></li>
            <li><Link to="/auction" className="hover:text-gold transition-colors flex items-center gap-1"><Gavel size={14} /> Live Auctions</Link></li>
            <li><Link to="/register" className="hover:text-gold transition-colors">Create Account</Link></li>
            <li><Link to="/dashboard" className="hover:text-gold transition-colors">My Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold font-bold mb-4 tracking-wide uppercase text-sm">Contact</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li className="flex items-center gap-2"><Phone size={14} className="text-gold" /> 1-800-VCCP-CAR</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-gold" /> info@vccp.com</li>
            <li className="flex items-center gap-2"><MapPin size={14} className="text-gold" /> Detroit, Michigan</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold border-opacity-30 py-4 text-center text-xs opacity-50">
        © {new Date().getFullYear()} VCCP — Vintage Car Classified Portal. All Rights Reserved.
      </div>
    </footer>
  );
}
