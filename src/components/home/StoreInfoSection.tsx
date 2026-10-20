import { MapPin, Phone, MessageSquare, Clock, Navigation, CheckCircle2, Building2 } from 'lucide-react';
import { BusinessSettings } from '../../types';

interface StoreInfoSectionProps {
  settings?: BusinessSettings | null;
}

export function StoreInfoSection({ settings }: StoreInfoSectionProps) {
  const address = settings?.address || "93A, Thevarpuram Road, Thoothukudi, Tamil Nadu 628003, India";
  const phone = settings?.phone || "+91 94425 35457";
  const whatsappNumber = settings?.whatsapp_number?.replace(/[^0-9]/g, '') || "919442535457";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Sri+Jayavarman+Electricals+Thevarpuram+Road+Thoothukudi";

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Store Details */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow flex items-center space-x-1.5 bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/30">
                <Building2 className="w-4 h-4" />
                <span>Physical Storefront & Service Centre</span>
              </span>
              <span className="text-xs text-brand-yellow font-tamil font-bold">
                ஸ்ரீ ஜெயவர்மன் எலக்ட்ரிக்கல்ஸ்
              </span>
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug">
              Visit <span className="text-brand-yellow">Sri Jayavarman Electricals</span> on Thevarpuram Road
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Conveniently situated in the commercial electrical and pump market of Thoothukudi. We provide <strong>complete sales, rewinding and servicing for all company motors and pumps</strong>, along with genuine spares for PSG, CRI, and all industrial/agricultural pump brands.
            </p>

            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <MapPin className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Store Address</h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5">{address}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Landmark: Thevarpuram Road (Opposite Raja Agencies)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <Clock className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Counter & Workshop Hours</h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-0.5">Monday to Saturday: 9:00 AM – 8:30 PM</p>
                  <p className="text-slate-400 text-xs">Sunday: Closed (Emergency breakdown calls accepted)</p>
                </div>
              </div>

              {/* Direct Phone Lines */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <a
                  href={`tel:${phone}`}
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-brand-yellow transition-all group"
                >
                  <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Owner / Cell</span>
                    <span className="text-xs font-bold text-white group-hover:text-brand-yellow">94425 35457</span>
                  </div>
                </a>

                <a
                  href="tel:04612324374"
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-sky-400 transition-all group"
                >
                  <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Landline Office</span>
                    <span className="text-xs font-bold text-white group-hover:text-sky-300">0461-2324374</span>
                  </div>
                </a>

                <a
                  href="tel:9786009783"
                  className="flex items-center space-x-2 p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-emerald-400 transition-all group"
                >
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">Alt Service</span>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300">97860 09783</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-brand-yellow hover:bg-brand-yellowLight text-brand-navy font-bold text-sm shadow-lg transition-all"
              >
                <Navigation className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Sri Jayavarman Electricals, I am looking for pump and motor spare parts & service in Thoothukudi.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Owner</span>
              </a>
            </div>

          </div>

          {/* Right Column: Real Store Photo & Embedded Interactive Map */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Storefront Photo Card */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl bg-slate-800 relative group">
              <img
                src="/shop/storefront_entrance.jpg"
                alt="Sri Jayavarman Electricals Storefront Entrance on Thevarpuram Road Thoothukudi"
                className="w-full h-48 sm:h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                <span className="text-xs font-bold text-brand-yellow">Store Entrance View</span>
                <p className="text-xs text-slate-200">93A, Thevarpuram Road, Thoothukudi (Opposite Raja Agencies)</p>
              </div>
            </div>

            {/* Map Embed centered on Sri Jayavarman Electricals */}
            <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-800 relative">
              <div className="p-3 bg-brand-navy border-b border-slate-700 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                  <span className="font-semibold text-brand-yellow">Sri Jayavarman Electricals Location</span>
                </div>
                <span className="text-[11px] text-slate-400">93A Thevarpuram Rd</span>
              </div>

              {/* Real OpenStreetMap / Google Maps Embed searching exact place */}
              <div className="aspect-[16/9] w-full bg-slate-900 relative">
                <iframe
                  title="Sri Jayavarman Electricals Location Map"
                  src="https://www.google.com/maps?q=Sri+Jayavarman+Electricals,+Thevarpuram+Road,+Thoothukudi&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="p-3 bg-slate-800/90 text-xs text-slate-300 flex justify-between items-center">
                <span>Thevarpuram Road, Pudugramam, Thoothukudi - 628003</span>
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-yellow hover:underline font-semibold"
                >
                  Get Directions →
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
