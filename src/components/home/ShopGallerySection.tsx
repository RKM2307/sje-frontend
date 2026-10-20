import { useState } from 'react';
import { Camera, MapPin, Phone, Building2, Layers, CheckCircle2, X } from 'lucide-react';

const REAL_IMAGES = [
  {
    src: '/shop/storefront_entrance.jpg',
    title: 'Storefront Entrance with Yellow Doors',
    caption: 'Front entrance at 93A, Thevarpuram Road with the official Sri Jayavarman Electricals signboard above.',
    category: 'Storefront'
  },
  {
    src: '/shop/store_interior.jpg',
    title: 'Interior Counter & Blue Display Shelves',
    caption: 'Counter where customers can bring damaged parts for micrometer measurement and model identification.',
    category: 'Spares Counter'
  },
  {
    src: '/shop/impeller_shelves.jpg',
    title: 'Impeller Stacks & Spare Hydraulic Discs',
    caption: 'Shelves of bronze, gunmetal, and cast iron impellers stacked by millimeter diameter and bore size.',
    category: 'Inventory Racks'
  },
  {
    src: '/shop/pumps_showcase.jpg',
    title: 'Pumps Showcase Cabinet',
    caption: 'Display cabinet featuring CRI & PSG openwell and monobloc pump assemblies.',
    category: 'Pump Showcase'
  },
  {
    src: '/shop/signboard.jpg',
    title: 'Official Yellow Signboard',
    caption: 'Official store signboard showing Tamil title, Cell: 94425 35457, 97860 09783, and Landline: 0461 - 2324374.',
    category: 'Signboard'
  }
];

export function ShopGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof REAL_IMAGES[0] | null>(null);

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-flex items-center space-x-1.5">
              <Camera className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Real Storefront & Workshop</span>
            </span>
            <h2 className="mt-3 font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Know Sri Jayavarman Electricals
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl leading-relaxed">
              We operate an established, physical store counter on Thevarpuram Road, Thoothukudi. Inspect our real shop, blue inventory cabinets, and impeller shelves below.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <a
              href="tel:9442535457"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold shadow transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Call Shop: 94425 35457</span>
            </a>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_IMAGES.map((img, idx) => (
            <div
              key={img.src}
              onClick={() => setSelectedPhoto(img)}
              className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-brand-yellow text-xs font-bold">
                  {img.category}
                </div>
              </div>

              <div className="p-4 space-y-1.5">
                <h4 className="font-heading font-bold text-slate-900 text-sm group-hover:text-brand-blue transition-colors">
                  {img.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {img.caption}
                </p>
              </div>
            </div>
          ))}

          {/* 6th Card: Store Overview Summary */}
          <div className="bg-gradient-to-br from-brand-navy to-slate-900 rounded-2xl border border-slate-700 p-6 text-white flex flex-col justify-between shadow-sm">
            <div className="space-y-3">
              <span className="text-xs font-bold text-brand-yellow uppercase tracking-wider block">
                Shop Summary
              </span>
              <h3 className="font-heading font-bold text-lg text-white">
                Visit Our Physical Sales Counter
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bring your damaged shaft, broken impeller, or worn seal directly to 93A Thevarpuram Road. We physically measure components to ensure proper fitment.
              </p>
              <div className="space-y-1.5 text-xs text-slate-300 pt-1">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                  <span>Cell: 94425 35457 / 97860 09783</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                  <span>Landline: 0461 - 2324374</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-yellow flex-shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 8:30 PM</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Sri+Jayavarman+Electricals+Thevarpuram+Road+Thoothukudi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-brand-yellow hover:bg-brand-yellowLight text-brand-navy font-bold text-xs transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Get Google Maps Directions</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full p-4 sm:p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-heading font-bold text-slate-900 text-base">
                {selectedPhoto.title}
              </h3>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="my-4 max-h-[60vh] overflow-hidden rounded-xl bg-slate-950 flex items-center justify-center">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedPhoto.caption}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="text-slate-500">Sri Jayavarman Electricals, Thoothukudi</span>
              <a
                href="tel:9442535457"
                className="font-bold text-brand-blue hover:underline"
              >
                Call Owner: 94425 35457
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
