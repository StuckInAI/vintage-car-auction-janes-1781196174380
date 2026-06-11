import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Car, Gavel, LogIn, LogOut, UserPlus, User } from 'lucide-react';
import clsx from 'clsx';
import type { AuthState } from '@/types';

type HeaderProps = {
  auth: AuthState;
  onLogout: () => void;
};

export default function Header({ auth, onLogout }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-navy text-cream sticky top-0 z-50 shadow-lg">
      {/* Top gold bar */}
      <div className="gold-gradient h-1" />
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-lg bg-navy-mid flex items-center justify-center vintage-border group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 60 60" width="40" height="40">
              <rect width="60" height="60" rx="8" fill="#1a1a2e" />
              <text x="30" y="42" fontFamily="Georgia, serif" fontSize="32" fontWeight="bold" textAnchor="middle" fill="#c9a227">V</text>
              <rect x="6" y="46" width="48" height="3" rx="1.5" fill="#c9a227" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold text-gold tracking-widest" style={{ fontFamily: 'Georgia, serif' }}>VCCP</div>
            <div className="text-xs text-gold-light tracking-widest uppercase">Vintage Car Classified Portal</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="nav-link text-cream hover:text-gold transition-colors text-sm tracking-wide">Home</Link>
          <Link to="/listings" className="nav-link text-cream hover:text-gold transition-colors text-sm tracking-wide flex items-center gap-1">
            <Car size={16} /> Listings
          </Link>
          <Link to="/sell" className="nav-link text-cream hover:text-gold transition-colors text-sm tracking-wide">Sell Your Car</Link>
          <Link to="/auction" className="nav-link text-cream hover:text-gold transition-colors text-sm tracking-wide flex items-center gap-1">
            <Gavel size={16} /> Auctions
          </Link>

          {auth.isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 bg-navy-mid border border-gold rounded-full px-4 py-2 text-gold hover:bg-gold hover:text-navy transition-all text-sm"
              >
                <User size={16} />
                {auth.user?.name}
                <ChevronDown size={14} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 top-12 w-48 bg-navy-mid border border-gold rounded-lg shadow-xl z-50">
                  <Link to="/dashboard" className="flex items-center gap-2 px-4 py-3 text-cream hover:bg-navy hover:text-gold text-sm" onClick={() => setDropdownOpen(false)}>
                    <User size={14} /> My Dashboard
                  </Link>
                  <button
                    onClick={() => { onLogout(); setDropdownOpen(false); navigate('/'); }}
                    className="flex items-center gap-2 px-4 py-3 text-cream hover:bg-navy hover:text-gold text-sm w-full text-left"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login" className="flex items-center gap-1 text-cream hover:text-gold text-sm transition-colors">
                <LogIn size={16} /> Log In
              </Link>
              <Link to="/register" className="flex items-center gap-1 bg-gold text-navy px-4 py-2 rounded-full font-bold text-sm hover:bg-gold-light transition-colors">
                <UserPlus size={16} /> Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gold" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-navy-mid border-t border-gold">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" className="text-cream hover:text-gold text-sm" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/listings" className="text-cream hover:text-gold text-sm" onClick={() => setMobileOpen(false)}>Listings</Link>
            <Link to="/sell" className="text-cream hover:text-gold text-sm" onClick={() => setMobileOpen(false)}>Sell Your Car</Link>
            <Link to="/auction" className="text-cream hover:text-gold text-sm" onClick={() => setMobileOpen(false)}>Auctions</Link>
            {auth.isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-cream hover:text-gold text-sm" onClick={() => setMobileOpen(false)}>My Dashboard</Link>
                <button onClick={() => { onLogout(); setMobileOpen(false); navigate('/'); }} className={clsx('text-left text-rust-light text-sm')}>Log Out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-cream hover:text-gold text-sm" onClick={() => setMobileOpen(false)}>Log In</Link>
                <Link to="/register" className="text-cream hover:text-gold text-sm" onClick={() => setMobileOpen(false)}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
