import { Link } from 'react-router-dom';
import { Phone, MessageSquare, ArrowRight, Package, ShieldCheck } from 'lucide-react';
import { ProductListItem } from '../../types';

interface ProductCardProps {
  product: ProductListItem;
  whatsappNumber?: string;
}

export function ProductCard({ product }: ProductCardProps) {
  const ownerPhone = "9442535457";
  const prefilledText = encodeURIComponent(
    `Hello Sri Jayavarman Electricals, I am enquiring about Part Reference #${product.reference_number}: ${product.name} at your Thoothukudi shop.`
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group card-shine">
      
      {/* Top Media & Reference Badge */}
      <div className="relative aspect-video bg-gradient-to-tr from-slate-100 to-slate-50 flex items-center justify-center p-4 border-b border-slate-100 overflow-hidden">
        {/* Reference ID Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-brand-navy/90 text-brand-yellow font-heading font-black text-xs shadow-md backdrop-blur-sm">
          <span>Ref #{product.reference_number}</span>
        </div>

        {/* Counter Availability Badge (Non-ecommerce) */}
        <div className="absolute top-3 right-3 z-10">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            Available at Store
          </span>
        </div>

        {/* Component Visual Graphic */}
        <div className="flex flex-col items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-300">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center border border-blue-100 shadow-inner">
            <Package className="w-8 h-8" />
          </div>
          <span className="mt-2 text-[10px] text-slate-400 font-medium tracking-wide uppercase">
            Part Ref #{product.reference_number}
          </span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Category & Brand info */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 mb-1.5 flex-wrap">
            <span className="font-semibold text-brand-blue">{product.category_name}</span>
            {product.brand_name && (
              <>
                <span>•</span>
                <span className="font-medium text-slate-700">{product.brand_name}</span>
              </>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-heading font-bold text-slate-900 text-base group-hover:text-brand-blue transition-colors leading-snug">
            <Link to={`/products/${product.slug}`} className="hover:underline">
              {product.name}
            </Link>
          </h3>

          <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.description || `Part Reference #${product.reference_number}. Available with verified dimensions and models at Thoothukudi shop.`}
          </p>
        </div>

        {/* Sizing & Contact Availability (NO PRICES, NO STOCK QUANTITY) */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          
          <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Sizing Options
              </span>
              <span className="font-semibold text-slate-800">
                {product.variant_count > 0 ? `${product.variant_count} Verified Sizes` : 'Confirmed at Counter'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Store Location
              </span>
              <span className="font-semibold text-brand-blue">
                Thevarpuram Rd
              </span>
            </div>
          </div>

          {/* Direct Contact Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              to={`/products/${product.slug}`}
              className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors"
            >
              <span>View Sizing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <a
              href={`https://wa.me/91${ownerPhone}?text=${prefilledText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          <a
            href={`tel:${ownerPhone}`}
            className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-center text-[11px] font-bold text-slate-700 hover:text-brand-blue transition-colors"
          >
            <Phone className="w-3 h-3 text-brand-yellow" />
            <span>Call Owner: {ownerPhone}</span>
          </a>

        </div>

      </div>

    </div>
  );
}
