import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Search, Filter, HelpCircle, Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { ProductCard } from '../components/catalog/ProductCard';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SEO } from '../components/common/SEO';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { fetchProducts, fetchCategories, fetchBrands } from '../api/products';
import { ProductListItem, Category, Brand, BusinessSettings } from '../types';

export function CatalogPage({ settings }: { settings?: BusinessSettings | null }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  // URL query state
  const q = searchParams.get('q') || '';
  const categoryId = searchParams.get('category_id') ? Number(searchParams.get('category_id')) : null;
  const brandId = searchParams.get('brand_id') ? Number(searchParams.get('brand_id')) : null;
  const stockStatus = searchParams.get('stock_status') || null;
  const page = searchParams.get('page') ? Number(searchParams.get('page')) : 1;

  const [searchInput, setSearchInput] = useState(q);

  useEffect(() => {
    setSearchInput(q);
  }, [q]);

  useEffect(() => {
    async function loadMeta() {
      try {
        const [c, b] = await Promise.all([fetchCategories(), fetchBrands()]);
        setCategories(c);
        setBrands(b);
      } catch (err) {
        console.error(err);
      }
    }
    loadMeta();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      try {
        const res = await fetchProducts({
          q: q || undefined,
          category_id: categoryId || undefined,
          brand_id: brandId || undefined,
          stock_status: stockStatus || undefined,
          page,
          limit: 12
        });
        setProducts(res.items);
        setTotal(res.total);
        setTotalPages(res.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [q, categoryId, brandId, stockStatus, page]);

  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams);
    if (value !== null && value !== '') {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    next.delete('page'); // Reset page on filter change
    setSearchParams(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam('q', searchInput.trim() || null);
  };

  const handleResetFilters = () => {
    setSearchParams({});
    setSearchInput('');
  };

  return (
    <div className="bg-brand-surface min-h-screen pb-20">
      
      <SEO
        title="Products Catalogue | PSG & CRI Pumps and Spare Parts Thoothukudi"
        description="Search pump spare parts by Reference ID (1-50), name, dimensions, or model. Impellers, shafts, wear rings, bearings in Thoothukudi."
        canonicalUrl="https://srijayavarmanelectricals.com/products"
      />

      {/* Top Banner */}
      <div className="bg-brand-navyDark text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Products Catalogue' }]} />
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-2">
            Pump Sales & Spare Parts Catalogue
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Browse our standard 50-part catalogue and verified component inventory. Search by reference ID, part name, dimensions, or pump model.
          </p>

          {/* Quick search input */}
          <form onSubmit={handleSearchSubmit} className="mt-6 max-w-xl flex items-center bg-white rounded-xl p-1 shadow-md">
            <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search part name, Ref ID (1-50), 120mm impeller, CRI bearing..."
              className="w-full px-3 py-2 text-slate-800 placeholder-slate-400 text-sm focus:outline-none"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('');
                  updateParam('q', null);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="px-4 py-2 bg-brand-blue hover:bg-brand-blueLight text-white font-semibold text-xs rounded-lg transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <FilterSidebar
              categories={categories}
              brands={brands}
              selectedCategory={categoryId}
              selectedBrand={brandId}
              selectedStockStatus={stockStatus}
              onSelectCategory={(id) => updateParam('category_id', id ? String(id) : null)}
              onSelectBrand={(id) => updateParam('brand_id', id ? String(id) : null)}
              onSelectStockStatus={(val) => updateParam('stock_status', val)}
              onResetFilters={handleResetFilters}
            />
          </div>

          {/* Products Column */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-4 rounded-xl border border-slate-200 text-xs text-slate-600 gap-2">
              <div>
                Showing <strong className="text-slate-900">{products.length}</strong> of{' '}
                <strong className="text-slate-900">{total}</strong> verified items
                {q && <span> for search: "<span className="text-brand-blue font-semibold">{q}</span>"</span>}
              </div>

              <div className="flex items-center space-x-2">
                <span>Verified shop records in Thoothukudi</span>
              </div>
            </div>

            {/* Product Grid / Loading / Empty */}
            {loading ? (
              <LoadingSpinner text="Searching catalogue records..." />
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} whatsappNumber={settings?.whatsapp_number} />
                ))}
              </div>
            ) : (
              /* Empty State adhering to Section 9 */
              <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <div className="max-w-md mx-auto">
                  <h3 className="font-heading font-bold text-slate-900 text-xl">
                    Can't find the part you need?
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Send us a photo or your pump model and our team can help identify the correct component. We stock over 50 component categories on Thevarpuram Road.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => navigate('/identify-part')}
                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-sm font-bold shadow-md transition-all"
                  >
                    <Camera className="w-4 h-4 text-brand-yellow" />
                    <span>Help Me Identify My Spare Part</span>
                  </button>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 pt-6">
                <button
                  disabled={page <= 1}
                  onClick={() => updateParam('page', String(page - 1))}
                  className="p-2 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-slate-700 px-3">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => updateParam('page', String(page + 1))}
                  className="p-2 rounded-lg border border-slate-300 bg-white text-slate-600 disabled:opacity-40 hover:bg-slate-50"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
