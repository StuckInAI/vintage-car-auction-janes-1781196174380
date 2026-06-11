import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import CarDetailPage from './pages/CarDetailPage';
import { useAuth } from './hooks/useAuth';
import { useListings } from './hooks/useListings';
import { useAuctions } from './hooks/useAuctions';

function App() {
  const { auth, login, register, logout } = useAuth();
  const { listings, addListing, updateListing, deleteListing, incrementView } = useListings();
  const { auctions, addAuction, placeBid } = useAuctions();

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header auth={auth} onLogout={logout} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage listings={listings} auctions={auctions} />} />
            <Route path="/listings" element={<ListingsPage listings={listings} />} />
            <Route path="/listings/:id" element={<CarDetailPage listings={listings} incrementView={incrementView} auth={auth} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
