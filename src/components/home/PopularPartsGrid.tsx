import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductListItem } from '../../types';
import { ProductCard } from '../catalog/ProductCard';

interface PopularPartsGridProps {
  products: ProductListItem[];
  whatsappNumber?: string;
}

export function PopularPartsGrid({ products, whatsappNumber }: PopularPartsGridProps) {
  return (
    <section className="py-16 bg-brand-surface border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200 inline-flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-brand-yellow" />
              <span>Verified Inventory</span>
            </span>
            <h2 className="mt-3 font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Popular Pump & Motor Spare Parts
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              High-turnover replacement components in stock for immediate pickup or delivery in Thoothukudi and surrounding agricultural regions.
            </p>
          </div>

          <div className="mt-4 sm:mt-0">
            <Link
              to="/products"
              className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-brand-blueDark transition-colors group"
            >
              <span>Explore Complete Catalogue (50 Reference IDs)</span>
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} whatsappNumber={whatsappNumber} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-slate-500 text-sm">No products currently displayed.</p>
          </div>
        )}

      </div>
    </section>
  );
}
