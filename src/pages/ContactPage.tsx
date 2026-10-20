import { MapPin, Phone, MessageSquare, Clock, Mail, Navigation, ExternalLink, HelpCircle, Building2, Store } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SEO } from '../components/common/SEO';
import { BusinessSettings } from '../types';

export function ContactPage({ settings }: { settings?: BusinessSettings | null }) {
  const address = settings?.address || "93A, Thevarpuram Road, Thoothukudi, Tamil Nadu 628003, India";
  const phone = settings?.phone || "+91 94425 35457";
  const whatsappNumber = settings?.whatsapp_number?.replace(/[^0-9]/g, '') || "919442535457";
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=Sri+Jayavarman+Electricals+Thevarpuram+Road+Thoothukudi";

  return (
    <div className="bg-brand-surface min-h-screen pb-20">
      
      <SEO
        title="Contact Store & Location | Sri Jayavarman Electricals Thoothukudi"
        description="Contact Sri Jayavarman Electricals on Thevarpuram Road, Thoothukudi - 628003. Direct owner phone 9442535457, landline 0461-2324374, WhatsApp, store photos, and Google Maps."
        canonicalUrl="https://srijayavarmanelectricals.com/contact"
      />

      <div className="bg-brand-navyDark text-white py-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Store Location & Contact' }]} />
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow bg-brand-yellow/10 px-3 py-1 rounded-full border border-brand-yellow/30">
              Direct Counter Contact
            </span>
            <span className="text-xs text-amber-300 font-tamil font-semibold">
              ஸ்ரீ ஜெயவர்மன் எலக்ட்ரிக்கல்ஸ் (ராஜீ எலக்ட்ரிக்கல் சர்வீஸ்)
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-3">
            Storefront Location & Direct Counter Contact
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Sri Jayavarman Electricals is located on Thevarpuram Road, Thoothukudi. Call the owner directly or visit our shop counter to match pump spare parts or discuss motor service.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Address */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
              <MapPin className="w-5 h-5 text-brand-yellow" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 text-base">Store Address</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{address}</p>
            <p className="text-[11px] text-slate-400">Near Thevarpuram Road Junction (Opposite Raja Agencies)</p>
            <div className="pt-2">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold text-brand-blue hover:underline"
              >
                <span>Open in Google Maps</span>
                <Navigation className="w-3.5 h-3.5 ml-1" />
              </a>
            </div>
          </div>

          {/* Card 2: Phone Numbers */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 text-base">Phone & WhatsApp Lines</h3>
            <p className="text-xs text-slate-500">Direct owner & counter numbers</p>
            <div className="space-y-2 pt-1 text-xs">
              <div>
                <a href={`tel:${phone}`} className="font-bold text-slate-900 hover:text-brand-blue flex items-center justify-between">
                  <span>Mobile / Owner:</span>
                  <span className="text-brand-blue font-bold text-sm">{phone}</span>
                </a>
              </div>
              <div>
                <a href="tel:04612324374" className="font-semibold text-slate-700 hover:text-brand-blue flex items-center justify-between">
                  <span>Landline Office:</span>
                  <span className="font-bold text-slate-900">0461 - 2324374</span>
                </a>
              </div>
              <div>
                <a href="tel:9786009783" className="font-semibold text-slate-700 hover:text-brand-blue flex items-center justify-between">
                  <span>Alternate Cell:</span>
                  <span className="font-bold text-slate-900">97860 09783</span>
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello Sri Jayavarman Electricals, I am looking for pump spare parts in Thoothukudi.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 font-bold text-emerald-600 hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Owner: 94425 35457</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Hours */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-slate-900 text-base">Store Operating Hours</h3>
            <div className="text-xs text-slate-600 space-y-1.5">
              <p><strong className="text-slate-800">Monday – Saturday:</strong> 9:00 AM – 8:30 PM</p>
              <p><strong className="text-slate-800">Sunday:</strong> Closed</p>
              <p className="text-[11px] text-slate-500 pt-1">
                Emergency agricultural & industrial breakdown support is available via phone or WhatsApp.
              </p>
            </div>
          </div>

        </div>

        {/* Real Shop Photos Recognition Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Store Landmark</span>
              <h3 className="font-heading font-bold text-xl text-slate-900 mt-0.5">
                Recognize Sri Jayavarman Electricals on Thevarpuram Road
              </h3>
            </div>
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-brand-blue text-xs font-semibold">
              <Store className="w-3.5 h-3.5 mr-1" />
              Verified Shop Photos
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
              <img
                src="/shop/storefront_entrance.jpg"
                alt="Storefront Entrance - Sri Jayavarman Electricals Thoothukudi"
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 bg-slate-900 text-white">
                <p className="text-xs font-bold text-brand-yellow">Store Entrance on Thevarpuram Road</p>
                <p className="text-[11px] text-slate-300">Look for the yellow & blue signboard near the junction</p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative group">
              <img
                src="/shop/signboard.jpg"
                alt="Official Signboard - Sri Jayavarman Electricals (Raju Electricals)"
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-3 bg-slate-900 text-white">
                <p className="text-xs font-bold text-brand-yellow">Official Store Signboard</p>
                <p className="text-[11px] text-slate-300">Phone: 0461 - 2324374 • Cell: 94425 35457, 97860 09783</p>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center text-xs">
            <span className="font-bold text-slate-800">Sri Jayavarman Electricals Location (Thevarpuram Road, Thoothukudi - 628003)</span>
            <a
              href={mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue font-bold hover:underline inline-flex items-center space-x-1"
            >
              <span>Full Screen Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full aspect-[21/9] min-h-[350px] bg-slate-100">
            <iframe
              title="Sri Jayavarman Electricals Store Location"
              src="https://www.google.com/maps?q=Sri+Jayavarman+Electricals,+Thevarpuram+Road,+Thoothukudi&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Local Discovery Information */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center space-x-2.5 text-slate-900">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center font-bold">
              G
            </div>
            <h3 className="font-heading font-bold text-lg">
              Visiting the Store for Pump Parts Matching
            </h3>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            When visiting Sri Jayavarman Electricals to purchase or replace worn pump components, we recommend bringing your existing damaged part (impeller, shaft, seal, or bearing) or noting down your pump model plate details (e.g. PSG 1.0 HP Monobloc or CRI Submersible). Our team uses precision micrometers to match exact inner diameter, outer diameter, bore size, and keyway slots on the spot.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-brand-blue block">1. Physical Counter Sales</span>
              <p className="text-slate-600">Immediate component inspection and pickup at 93A, Thevarpuram Road, Thoothukudi - 628003.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-brand-blue block">2. Micrometer Precision</span>
              <p className="text-slate-600">All impellers, shafts, and wear rings measured in mm at counter to prevent improper fitting.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-bold text-brand-blue block">3. Direct Owner Contact</span>
              <p className="text-slate-600">Speak directly with the shop owner at <strong>94425 35457</strong> or <strong>0461 - 2324374</strong> for advice.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
