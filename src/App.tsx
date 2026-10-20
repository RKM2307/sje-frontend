import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WhatsAppFloatingButton } from './components/common/WhatsAppFloatingButton';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { SalesServicePage } from './pages/SalesServicePage';
import { PartIdentifierPage } from './pages/PartIdentifierPage';
import { BrandsPage } from './pages/BrandsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProductsPage } from './pages/admin/AdminProductsPage';
import { AdminEnquiriesPage } from './pages/admin/AdminEnquiriesPage';
import { AdminServicesPage } from './pages/admin/AdminServicesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminBrandsModelsPage } from './pages/admin/AdminBrandsModelsPage';
import { fetchSettings } from './api/settings';
import { BusinessSettings } from './types';

export function App() {
  const [settings, setSettings] = useState<BusinessSettings | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await fetchSettings();
        setSettings(data);
      } catch (err) {
        console.error("Settings load notice:", err);
      }
    }
    loadSettings();
  }, []);

  // Keyboard shortcut Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-surface text-slate-800">
      
      {/* Universal Public Navbar (only if not in admin portal) */}
      {!isAdminRoute && (
        <Navbar
          settings={settings}
          onOpenSearch={() => setIsSearchOpen(true)}
        />
      )}

      {/* Main Page Routing */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage settings={settings} />} />
          <Route path="/products" element={<CatalogPage settings={settings} />} />
          <Route path="/products/:identifier" element={<ProductDetailPage settings={settings} />} />
          <Route path="/products/ref/:identifier" element={<ProductDetailPage settings={settings} />} />
          <Route path="/sales-and-service" element={<SalesServicePage settings={settings} />} />
          <Route path="/identify-part" element={<PartIdentifierPage settings={settings} />} />
          <Route path="/brands" element={<BrandsPage />} />
          <Route path="/contact" element={<ContactPage settings={settings} />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="enquiries" element={<AdminEnquiriesPage />} />
            <Route path="services" element={<AdminServicesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="brands-models" element={<AdminBrandsModelsPage />} />
          </Route>
        </Routes>
      </div>

      {/* Universal Public Footer (only if not in admin portal) */}
      {!isAdminRoute && <Footer settings={settings} />}

      {/* Floating WhatsApp Action Button */}
      {!isAdminRoute && <WhatsAppFloatingButton settings={settings} />}

      {/* Universal Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

    </div>
  );
}

export default App;
