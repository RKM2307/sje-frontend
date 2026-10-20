import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, MessageSquare, MapPin, Search, ChevronRight, CheckCircle2,
  Package, Wrench, ShieldCheck, Camera, Layers, Info
} from 'lucide-react';
import { BusinessSettings } from '../../types';

interface HeroSectionProps {
  settings?: BusinessSettings | null;
}

const SHOP_SLIDES = [
  {
    image: '/shop/storefront_entrance.jpg',
    title: 'Storefront Entrance',
    desc: '93A, Thevarpuram Road, Thoothukudi - 628003',
  },
  {
    image: '/shop/store_interior.jpg',
    title: 'Inside Spares Counter',
    desc: 'Blue display counters & inventory shelves',
  },
  {
    image: '/shop/impeller_shelves.jpg',
    title: 'Impellers & Mechanical Racks',
    desc: 'Complete range of bronze, gunmetal & cast iron impellers',
  },
  {
    image: '/shop/pumps_showcase.jpg',
    title: 'Pump Showcase Display',
    desc: 'CRI and PSG Openwell & Monobloc pumps',
  },
  {
    image: '/shop/signboard.jpg',
    title: 'Official Store Signboard',
    desc: 'Cell: 94425 35457 | Phone: 0461-2324374',
  },
];

export function HeroSection({ settings }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const primaryPhone = "9442535457";
  const landline = "0461-2324374";
  const altPhone = "9786009783";
  const whatsappNumber = "919442535457";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Sri+Jayavarman+Electricals+Thevarpuram+Road+Thoothukudi";

  // Auto-advance background every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SHOP_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-brand-navyDark text-white border-b border-slate-800">
      
      {/* Real Shop Background Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {SHOP_SLIDES.map((slide, idx) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{ transition: 'opacity 1s ease-in-out, transform 8s ease-out' }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center filter saturate-110"
            />
          </div>
        ))}

        {/* Multi-layered Dark Navy Industrial Overlays for guaranteed text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navyDark via-brand-navyDark/90 to-brand-navyDark/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navyDark via-transparent to-black/40"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
        
        {/* Top Shop Identification Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-xs sm:text-sm text-slate-200 mb-6 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-yellow animate-pulse"></span>
          <span className="font-bold text-brand-yellow">ஸ்ரீ ஜெயவர்மன் எலக்ட்ரிக்கல்ஸ்</span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-300">93A, Thevarpuram Road, Thoothukudi - 628003</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Phone, and Direct Actions */}
          <div className="lg:col-span-8 space-y-6">
            
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-5xl tracking-tight leading-tight text-white">
              All Company Pump & Motor Spares, Complete Sales & Service in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow via-amber-300 to-yellow-400">
                Thoothukudi
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              <strong className="text-brand-yellow">Sri Jayavarman Electricals (Raju Electricals)</strong> provides complete sales, rewinding & service for all company electric motors and pumps. Authorised PSG & CRI dealer, stocking genuine spare parts for all brand motors, submersibles, monoblocs, impellers, shafts, and bearings on Thevarpuram Road.
            </p>

            {/* Direct Owner Contact Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-md max-w-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                  Direct Store & Owner Contact:
                </span>
                <div className="flex items-center space-x-3 mt-1">
                  <a
                    href={`tel:${primaryPhone}`}
                    className="font-heading font-black text-xl text-white hover:text-brand-yellow transition-colors flex items-center space-x-1.5"
                  >
                    <Phone className="w-5 h-5 text-brand-yellow" />
                    <span>94425 35457</span>
                  </a>
                  <span className="text-slate-500">|</span>
                  <a
                    href={`tel:04612324374`}
                    className="text-xs text-slate-300 hover:text-white"
                  >
                    0461-2324374
                  </a>
                  <span className="text-slate-500">|</span>
                  <a
                    href={`tel:9786009783`}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    97860 09783
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`tel:${primaryPhone}`}
                  className="px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueLight text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Call Owner</span>
                </a>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Sri Jayavarman Electricals, I am looking for pump spare parts in Thoothukudi.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* In-hero Search Bar */}
            <form onSubmit={handleSearchSubmit} className="max-w-xl">
              <div className="relative flex items-center bg-white rounded-2xl p-1.5 shadow-2xl focus-within:ring-2 focus-within:ring-brand-yellow">
                <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search spare parts (e.g. impeller, shaft, bearing, #11)..."
                  className="w-full px-3 py-2.5 bg-transparent text-slate-900 placeholder-slate-500 text-sm focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-navy hover:bg-brand-blue text-white font-bold text-xs rounded-xl transition-all shadow-md flex-shrink-0"
                >
                  Search Spares
                </button>
              </div>
            </form>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-brand-yellow hover:bg-brand-yellowLight text-brand-navy font-bold text-sm transition-all shadow-lg active:scale-95"
              >
                <Package className="w-4 h-4" />
                <span>Explore Products Sold</span>
              </button>

              <button
                onClick={() => navigate('/identify-part')}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-all active:scale-95"
              >
                <Camera className="w-4 h-4 text-brand-yellow" />
                <span>Identify My Spare Part</span>
              </button>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition-all active:scale-95"
              >
                <MapPin className="w-4 h-4 text-brand-yellow" />
                <span>Store Location & Directions</span>
              </a>
            </div>

            {/* Storefront Authenticity Badges */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Established Shop on Thevarpuram Rd</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>50 Standard Spare Part Categories</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Direct Contact with Shop Specialist</span>
              </div>
            </div>

          </div>

          {/* Right Column: Live Background Photo Switcher Card */}
          <div className="lg:col-span-4">
            <div className="bg-slate-900/90 rounded-2xl border border-slate-700/80 p-5 shadow-2xl backdrop-blur-md space-y-4">
              
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-brand-yellow" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Genuine Storefront Views
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800">
                  Real Photos
                </span>
              </div>

              {/* Active Image Preview Box */}
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 shadow-inner group">
                <img
                  src={SHOP_SLIDES[currentSlide].image}
                  alt={SHOP_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                  <div>
                    <h4 className="font-heading font-bold text-white text-xs">
                      {SHOP_SLIDES[currentSlide].title}
                    </h4>
                    <p className="text-[11px] text-slate-300">
                      {SHOP_SLIDES[currentSlide].desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Thumbnail Selector buttons */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Click to View Shop Area:
                </span>
                <div className="grid grid-cols-5 gap-1.5">
                  {SHOP_SLIDES.map((slide, idx) => (
                    <button
                      key={slide.image}
                      onClick={() => setCurrentSlide(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border transition-all ${
                        idx === currentSlide
                          ? 'border-brand-yellow ring-2 ring-brand-yellow/40 scale-105'
                          : 'border-slate-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Physical Counter Landmark info */}
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Signboard Cell Numbers:</span>
                  <span className="text-white font-bold">94425 35457 / 97860 09783</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Landline:</span>
                  <span className="text-white font-medium">0461 - 2324374</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
