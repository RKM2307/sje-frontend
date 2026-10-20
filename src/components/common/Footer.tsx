import { Link } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, Clock, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';
import { BusinessSettings } from '../../types';

export function Footer({ settings }: { settings?: BusinessSettings | null }) {
  const phone = settings?.phone || "+91 94425 35457";
  const whatsappNumber = settings?.whatsapp_number?.replace(/[^0-9]/g, '') || "919442535457";
  const address = settings?.address || "93A, Thevarpuram Road, Thoothukudi, Tamil Nadu 628003, India";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Sri+Jayavarman+Electricals+Thevarpuram+Road+Thoothukudi";

  return (
    <footer className="bg-brand-navyDark text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Business Overview */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-brand-blue flex items-center justify-center text-brand-yellow font-heading font-black text-xl">
                SJE
              </div>
              <div>
                <h3 className="font-heading font-bold text-brand-yellow text-lg">Sri Jayavarman Electricals</h3>
                <p className="text-xs text-amber-400 font-tamil">ஸ்ரீ ஜெயவர்மன் எலக்ட்ரிக்கல்ஸ்</p>
                <p className="text-[11px] text-slate-400">ராஜீ எலக்ட்ரிக்கல் சர்வீஸ் - அங்கம்</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your dependable dealer & service center in Thoothukudi. We provide <strong>complete sales & service for all company motors and pumps</strong>, along with genuine spare parts for PSG, CRI and all brands.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-800/80 text-xs text-brand-yellow border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                PSG Pumps & Motors • CRI Pumps
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links & Catalogue Categories */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-yellow pl-2">
              Spare Parts Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/products?category_id=1" className="hover:text-brand-yellow transition-colors">
                  Check Valve & Pump Assembly
                </Link>
              </li>
              <li>
                <Link to="/products?category_id=2" className="hover:text-brand-yellow transition-colors">
                  Rotating Parts & Hydraulics (Impellers, Shafts)
                </Link>
              </li>
              <li>
                <Link to="/products?category_id=3" className="hover:text-brand-yellow transition-colors">
                  Bearings, Seals & Retention Rings
                </Link>
              </li>
              <li>
                <Link to="/products?category_id=4" className="hover:text-brand-yellow transition-colors">
                  Electrical & Motor Miscellaneous
                </Link>
              </li>
              <li>
                <Link to="/identify-part" className="text-brand-yellowLight hover:underline font-medium inline-flex items-center">
                  Help Me Identify My Spare Part <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Store Location & Timings */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-yellow pl-2">
              Store & Map Location
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                <span>{address}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-white">Mon – Sat: 9:00 AM – 8:30 PM</p>
                  <p className="text-xs text-slate-400">Sunday: Closed / Emergency Enquiries</p>
                </div>
              </li>
              <li className="pt-1">
                <a 
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded bg-brand-blue/30 text-blue-300 hover:bg-brand-blue/50 hover:text-white border border-blue-400/20 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  Get Google Maps Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Enquiries */}
          <div>
            <h4 className="font-heading font-bold text-white text-sm uppercase tracking-wider mb-4 border-l-2 border-brand-yellow pl-2">
              Contact & Enquiries
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={`tel:${phone}`} className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">{phone}</span>
                    <span className="text-[11px] text-slate-400">Mobile / Owner Contact</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:04612324374" className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">0461 - 2324374</span>
                    <span className="text-[11px] text-slate-400">Landline Counter</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="tel:9786009783" className="flex items-center space-x-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white block">97860 09783</span>
                    <span className="text-[11px] text-slate-400">Alternate Service Cell</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Sri Jayavarman Electricals, I am looking for pump spare parts in Thoothukudi.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors pt-1"
                >
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">WhatsApp: 94425 35457</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/sales-and-service"
                  className="block text-center py-2 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  Book Pump Inspection / Repair
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Local SEO Discovery Keyword Block */}
        <div className="py-6 border-b border-slate-800/60 text-xs text-slate-400 space-y-2">
          <p className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
            Serving Thoothukudi (Tuticorin) & Surrounding Areas:
          </p>
          <p className="leading-relaxed">
            PSG pump dealer in Thoothukudi • CRI pump dealer in Tuticorin • PSG pump spare parts in Thoothukudi • CRI pump spare parts in Tuticorin • Pump impeller supplier in Thoothukudi • Pump shaft supplier in Tuticorin • Pump bearing and seal supplier in Thoothukudi • Check valve components in Tuticorin • Water pump sales and service in Thoothukudi • Electric motor spare parts near Thevarpuram Road.
          </p>
        </div>

        {/* Bottom copyright & admin */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Sri Jayavarman Electricals, Thoothukudi. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Link to="/contact" className="hover:text-slate-300 transition-colors">Privacy & Store Terms</Link>
            <span>•</span>
            <Link to="/admin/login" className="hover:text-brand-yellow font-medium transition-colors">Administrator Dashboard</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
