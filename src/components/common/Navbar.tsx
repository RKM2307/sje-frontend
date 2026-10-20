import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, MessageSquare, Search, Menu, X, Wrench, Package, ShieldCheck, MapPin, Building2
} from 'lucide-react';
import { BusinessSettings } from '../../types';

interface NavbarProps {
  settings?: BusinessSettings | null;
  onOpenSearch: () => void;
}

export function Navbar({ settings, onOpenSearch }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const primaryPhone = settings?.phone || "9442535457";
  const landline = settings?.landline || "0461-2324374";
  const whatsappNumber = "919442535457";

  const navLinks = [
    { label: "Products & Spares", path: "/products", icon: Package },
    { label: "Identify My Part", path: "/identify-part", icon: ShieldCheck },
    { label: "Sales & Service", path: "/sales-and-service", icon: Wrench },
    { label: "Brands Handled", path: "/brands", icon: Building2 },
    { label: "Store Location & About", path: "/contact", icon: MapPin },
  ];

  const isActive = (path: string) => {
    if (path === '/products' && location.pathname.startsWith('/products')) return true;
    return location.pathname === path;
  };

  return (
    <>
      {/* Top emergency / quick contact bar */}
      <div className="bg-brand-navyDark text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          
          <div className="flex items-center space-x-3 text-slate-300 flex-wrap">
            <span className="inline-flex items-center text-brand-yellow font-bold">
              <MapPin className="w-3.5 h-3.5 mr-1" />
              93A, Thevarpuram Road, Thoothukudi - 628003
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              ஸ்ரீ ஜெயவர்மன் எலக்ட்ரிக்கல்ஸ் (ராஜீ எலக்ட்ரிக்கல் சர்வீஸ்)
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href={`tel:04612324374`}
              className="hidden lg:inline-flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 mr-1 text-slate-400" />
              <span>Office: {landline}</span>
            </a>

            <a 
              href={`tel:9786009783`}
              className="hidden sm:inline-flex items-center text-slate-300 hover:text-white transition-colors text-xs"
            >
              <Phone className="w-3 h-3 mr-1 text-emerald-400" />
              <span>Service: 97860 09783</span>
            </a>

            <a 
              href={`tel:${primaryPhone}`}
              className="inline-flex items-center text-white bg-brand-blue/40 px-2.5 py-0.5 rounded-full border border-blue-400/30 hover:bg-brand-blue transition-colors font-bold"
            >
              <Phone className="w-3 h-3 mr-1 text-brand-yellow" />
              <span>Cell: 94425 35457</span>
            </a>

            <Link 
              to="/admin/login" 
              className="text-slate-400 hover:text-slate-200 transition-colors hidden sm:inline text-[11px]"
            >
              Owner Portal
            </Link>
          </div>

        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-brand-navy/95 backdrop-blur-md border-b border-slate-800/80 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-navyDark border border-amber-400/40 flex items-center justify-center text-brand-yellow font-heading font-black text-2xl shadow-inner group-hover:scale-105 transition-transform flex-shrink-0">
                SJE
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-brand-yellow tracking-tight leading-tight group-hover:brightness-110 transition-colors">
                  Sri Jayavarman Electricals
                </span>
                <span className="text-xs text-blue-200 font-semibold tracking-wide">
                  All Company Pump & Motor Sales, Spares & Service • PSG & CRI Dealer
                </span>
                <span className="text-[11px] text-amber-300 font-tamil font-medium hidden sm:block">
                  ராஜீ எலக்ட்ரிக்கல் சர்வீஸ் - அங்கம் (அனைத்து கம்பெனி மோட்டார் & பம்ப் சர்வீஸ்)
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-brand-yellow bg-slate-800/80 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Action Buttons: Call & WhatsApp */}
            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={onOpenSearch}
                aria-label="Search spare parts"
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition-colors text-sm"
              >
                <Search className="w-4 h-4 text-brand-yellow" />
                <span className="hidden xl:inline">Search Parts...</span>
              </button>

              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-brand-blue hover:bg-brand-blueLight text-white font-bold text-sm transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-brand-yellow" />
                <span>Call Owner</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Sri Jayavarman Electricals, I would like to enquire about pump spare parts.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Menu & Search Buttons */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-brand-yellow" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-brand-navyDark border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                      isActive(link.path)
                        ? 'bg-brand-blue text-white font-semibold'
                        : 'text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-brand-yellow" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
              <a
                href={`tel:${primaryPhone}`}
                className="flex items-center justify-center space-x-1.5 py-3 px-3 rounded-lg bg-brand-blue text-white text-sm font-bold shadow"
              >
                <Phone className="w-4 h-4 text-brand-yellow" />
                <span>Call: 94425 35457</span>
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Sri Jayavarman Electricals, I am looking for pump spare parts in Thoothukudi.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1.5 py-3 px-3 rounded-lg bg-emerald-600 text-white text-sm font-bold shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
