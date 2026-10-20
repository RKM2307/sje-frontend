import { useState } from 'react';
import { Package, ZoomIn, X, Info } from 'lucide-react';

interface ImageZoomGalleryProps {
  primaryImageUrl?: string | null;
  productName: string;
  refNumber: number;
}

export function ImageZoomGallery({ primaryImageUrl, productName, refNumber }: ImageZoomGalleryProps) {
  const [isZoomed, setIsZoomed] = useState(false);

  // Determine if this is an illustrative placeholder
  const isIllustrative = !primaryImageUrl || primaryImageUrl.includes('placeholder') || primaryImageUrl.includes('part_');

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Main Display Box */}
        <div 
          onClick={() => setIsZoomed(true)}
          className="relative aspect-square sm:aspect-[4/3] bg-gradient-to-b from-slate-100 to-slate-50 flex items-center justify-center p-8 cursor-zoom-in group"
        >
          {/* Reference Stamp */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-xl bg-brand-navy/90 text-brand-yellow font-heading font-black text-sm shadow-md backdrop-blur-sm">
            Part #{refNumber}
          </div>

          {/* Zoom hint */}
          <div className="absolute bottom-4 right-4 z-10 p-2 rounded-xl bg-white/90 text-slate-700 shadow border border-slate-200 opacity-80 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4" />
          </div>

          {/* Graphic / Placeholder / Real Image */}
          <div className="flex flex-col items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-300">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-blue-50 text-brand-blue flex items-center justify-center border border-blue-100 shadow-inner">
              <Package className="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <span className="mt-4 font-heading font-bold text-slate-600 text-sm">
              {productName}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Catalogue ID: {refNumber}
            </span>
          </div>
        </div>

        {/* Mandatory Transparency Label from Section 15 */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-1.5">
            <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span className="italic">
              {isIllustrative ? "Illustrative Graphic / Placeholder until shop verified photo is uploaded." : "Verified Store Product Photograph"}
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Sri Jayavarman Electricals</span>
        </div>

      </div>

      {/* Fullscreen Zoom Lightbox Modal */}
      {isZoomed && (
        <div 
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative border border-slate-700 overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-brand-yellow bg-brand-navy px-2 py-0.5 rounded">
                  Ref #{refNumber}
                </span>
                <h3 className="font-heading font-bold text-slate-900 text-lg mt-1">
                  {productName}
                </h3>
              </div>
              <button
                onClick={() => setIsZoomed(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-12 flex flex-col items-center justify-center bg-slate-50 rounded-xl my-4">
              <div className="w-40 h-40 rounded-3xl bg-blue-50 text-brand-blue flex items-center justify-center border border-blue-200 shadow-lg">
                <Package className="w-24 h-24" />
              </div>
              <p className="mt-4 text-xs text-slate-500 italic max-w-md text-center">
                Detailed close-up inspection available directly at 93A Thevarpuram Road store. Contact shop specialist to inspect bore and keyway dimensions.
              </p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsZoomed(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
              >
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
