import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Camera, HelpCircle, Package, ArrowUpRight } from 'lucide-react';
import { fetchProducts } from '../../api/products';
import { ProductListItem } from '../../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
      setHasSearched(false);
    }
  }, [isOpen]);

  // Keyboard shortcut Ctrl+K / Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ q: query, limit: 6 });
        setResults(data.items);
        setHasSearched(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectProduct = (slug: string) => {
    onClose();
    navigate(`/products/${slug}`);
  };

  const handleFullSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Search Input Bar */}
        <form onSubmit={handleFullSearch} className="flex items-center px-4 py-3.5 border-b border-slate-200 bg-slate-50">
          <Search className="w-5 h-5 text-brand-blue flex-shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search part name, reference ID (e.g. 11), impeller, shaft, CRI bearing..."
            className="w-full bg-transparent text-slate-800 placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-semibold text-slate-500 hover:text-slate-700 bg-slate-200/70 rounded"
          >
            ESC
          </button>
        </form>

        {/* Quick query suggestion tags */}
        {!query && (
          <div className="p-4 bg-white border-b border-slate-100">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Popular Searches:
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              {['Part 11 Impeller', 'Part 7 Shaft', 'Check Valve Spindle', 'Bearing 6205', 'Wear Ring', 'PSG OS-3', '120 mm'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-brand-blue text-slate-600 transition-colors font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-2">
          {loading && (
            <div className="py-8 text-center text-slate-400 text-sm">
              Searching catalogue...
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 pb-1">
                Matching Spare Parts ({results.length})
              </p>
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleSelectProduct(product.slug)}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-all group"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <span className="px-2 py-0.5 rounded bg-brand-navy text-brand-yellow font-heading font-black text-xs">
                      #{product.reference_number}
                    </span>
                    <div className="truncate">
                      <h4 className="text-sm font-semibold text-slate-800 group-hover:text-brand-blue transition-colors truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">
                        {product.category_name} {product.brand_name ? `• ${product.brand_name}` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 flex-shrink-0 ml-4">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      Available at Store
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-blue group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={handleFullSearch}
                  className="w-full py-2.5 px-4 text-center rounded-lg bg-blue-50 hover:bg-blue-100 text-brand-blue font-semibold text-xs transition-colors flex items-center justify-center space-x-1"
                >
                  <span>View all results in full catalogue</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Empty State as explicitly instructed in Section 9 */}
          {!loading && hasSearched && results.length === 0 && (
            <div className="py-8 px-4 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="font-heading font-bold text-slate-800 text-base">
                  Can't find the part you need?
                </h4>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  Send us a photo or your pump model and our team can help identify the correct component.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  navigate('/identify-part');
                }}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-sm font-semibold shadow-md transition-all"
              >
                <Camera className="w-4 h-4 text-brand-yellow" />
                <span>Help Me Identify My Spare Part</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer info */}
        <div className="px-4 py-2.5 bg-slate-100 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Search 50 reference parts across PSG & CRI compatibility</span>
          <span>Sri Jayavarman Electricals • Thoothukudi</span>
        </div>

      </div>
    </div>
  );
}
