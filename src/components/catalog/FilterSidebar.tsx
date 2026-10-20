import { Filter, X, Check } from 'lucide-react';
import { Category, Brand } from '../../types';

interface FilterSidebarProps {
  categories: Category[];
  brands: Brand[];
  selectedCategory: number | null;
  selectedBrand: number | null;
  selectedStockStatus: string | null;
  onSelectCategory: (id: number | null) => void;
  onSelectBrand: (id: number | null) => void;
  onSelectStockStatus: (status: string | null) => void;
  onResetFilters: () => void;
}

export function FilterSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrand,
  selectedStockStatus,
  onSelectCategory,
  onSelectBrand,
  onSelectStockStatus,
  onResetFilters,
}: FilterSidebarProps) {
  const hasActiveFilters = Boolean(selectedCategory || selectedBrand || selectedStockStatus);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center space-x-2 text-slate-900 font-heading font-bold text-base">
          <Filter className="w-4 h-4 text-brand-blue" />
          <span>Filter Spare Parts</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:underline flex items-center space-x-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Brand Filters */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Pump & Motor Brand
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectBrand(null)}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
              selectedBrand === null
                ? 'bg-brand-blue text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All Brands</span>
            {selectedBrand === null && <Check className="w-3.5 h-3.5" />}
          </button>

          {brands.map((b) => (
            <button
              key={b.id}
              onClick={() => onSelectBrand(b.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                selectedBrand === b.id
                  ? 'bg-brand-blue text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{b.name}</span>
              {selectedBrand === b.id && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Functional Category
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onSelectCategory(null)}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
              selectedCategory === null
                ? 'bg-brand-blue text-white font-semibold'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All 4 Categories</span>
            {selectedCategory === null && <Check className="w-3.5 h-3.5" />}
          </button>

          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                selectedCategory === c.id
                  ? 'bg-brand-blue text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="truncate pr-2">{c.name}</span>
              {selectedCategory === c.id && <Check className="w-3.5 h-3.5 flex-shrink-0" />}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status Filter */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Availability Status
        </h4>
        <div className="space-y-1.5">
          {[
            { label: 'All Statuses', value: null },
            { label: 'In Stock', value: 'In Stock' },
            { label: 'Contact for Availability', value: 'Contact for Availability' },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => onSelectStockStatus(item.value)}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                selectedStockStatus === item.value
                  ? 'bg-brand-blue text-white font-semibold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {selectedStockStatus === item.value && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
