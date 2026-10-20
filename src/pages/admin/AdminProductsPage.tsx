import { useState, useEffect } from 'react';
import { 
  Package, Plus, Search, Filter, Edit, Eye, EyeOff, Layers, 
  Trash2, FileSpreadsheet, CheckCircle2, AlertCircle, ArrowUpRight
} from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { ProductFormModal } from '../../components/admin/ProductFormModal';
import { VariantFormModal } from '../../components/admin/VariantFormModal';
import { CsvImportModal } from '../../components/admin/CsvImportModal';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { 
  getAdminProducts, getAdminProduct, createProduct, updateProduct, 
  deleteProduct, toggleProductPublish, addProductVariant, updateProductVariant,
  deleteProductVariant
} from '../../api/admin';
import { fetchCategories, fetchBrands } from '../../api/products';
import { Category, Brand, ProductDetail, ProductVariant } from '../../types';

export function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search & Filters
  const [search, setSearch] = useState('');
  const [publishedFilter, setPublishedFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductDetail | null>(null);

  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [variantProductId, setVariantProductId] = useState<number | null>(null);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(null);

  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const pub = publishedFilter === 'all' ? undefined : publishedFilter === 'published';
      const cat = categoryFilter ? Number(categoryFilter) : undefined;
      const res = await getAdminProducts({
        q: search || undefined,
        published: pub,
        category_id: cat,
        limit: 100
      });
      setProducts(res.items);
      setTotal(res.total);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
    loadData();
  }, [search, publishedFilter, categoryFilter]);

  const handleOpenEdit = async (id: number) => {
    try {
      const data = await getAdminProduct(id);
      setEditingProduct(data);
      setIsProductModalOpen(true);
    } catch (err: any) {
      alert(`Failed to load product details: ${err.message}`);
    }
  };

  const handleSaveProduct = async (payload: any) => {
    if (editingProduct) {
      await updateProduct(editingProduct.id, payload);
      setFeedback(`Product Ref #${payload.reference_number} updated.`);
    } else {
      await createProduct(payload);
      setFeedback(`New Product Ref #${payload.reference_number} created.`);
    }
    loadData();
  };

  const handleTogglePublish = async (id: number) => {
    try {
      await toggleProductPublish(id);
      loadData();
    } catch (err: any) {
      alert(`Publish toggle failed: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id: number, refNum: number) => {
    if (confirm(`Are you sure you want to delete Product Ref #${refNum}?`)) {
      try {
        await deleteProduct(id);
        setFeedback(`Product Ref #${refNum} deleted.`);
        loadData();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleOpenAddVariant = (productId: number) => {
    setVariantProductId(productId);
    setEditingVariant(null);
    setIsVariantModalOpen(true);
  };

  const handleSaveVariant = async (payload: any) => {
    if (editingVariant) {
      await updateProductVariant(editingVariant.id, payload);
      setFeedback('Size variant updated.');
    } else if (variantProductId) {
      await addProductVariant(variantProductId, payload);
      setFeedback('New size variant added.');
    }
    loadData();
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      <AdminHeader
        title="50-Part Inventory Management"
        subtitle="Full catalogue reference records (1 to 50), size variants, and verification controls."
        actions={
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCsvModalOpen(true)}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
            >
              <FileSpreadsheet className="w-4 h-4 text-brand-yellow" />
              <span>CSV Import / Export</span>
            </button>

            <button
              onClick={() => {
                setEditingProduct(null);
                setIsProductModalOpen(true);
              }}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Catalogue Part</span>
            </button>
          </div>
        }
      />

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-emerald-600 font-bold">×</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or Ref # (1-50)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <select
            value={publishedFilter}
            onChange={(e) => setPublishedFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none"
          >
            <option value="all">All Statuses (Published & Drafts)</option>
            <option value="published">Published Only</option>
            <option value="draft">Unpublished Drafts Only</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl border border-slate-300 bg-white focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Main Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        
        {loading ? (
          <LoadingSpinner text="Retrieving catalogue items..." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Ref #</th>
                  <th className="py-3 px-4">Component Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Size Variants</th>
                  <th className="py-3 px-4">Stock Status</th>
                  <th className="py-3 px-4">Visibility</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    {/* Reference # */}
                    <td className="py-3 px-4 font-mono font-bold text-brand-navy">
                      <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200">
                        #{p.reference_number}
                      </span>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">{p.name}</span>
                      {p.manufacturer_part_number && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          MPN: {p.manufacturer_part_number}
                        </span>
                      )}
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4 text-slate-600">
                      {p.category_name || "General"}
                    </td>

                    {/* Brand */}
                    <td className="py-3 px-4 text-slate-600">
                      {p.brand_name || "Universal / Multibrand"}
                    </td>

                    {/* Variants Count & Add Variant action */}
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-slate-800">
                          {p.variants_count} Sizes
                        </span>
                        <button
                          onClick={() => handleOpenAddVariant(p.id)}
                          title="Add size variant"
                          className="p-1 rounded text-brand-blue hover:bg-blue-50"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Stock Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        p.stock_status === 'In Stock'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {p.stock_status}
                      </span>
                    </td>

                    {/* Published status toggle */}
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleTogglePublish(p.id)}
                        className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                          p.published
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        }`}
                      >
                        {p.published ? (
                          <>
                            <Eye className="w-3 h-3" />
                            <span>Published</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Draft (Hidden)</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleOpenEdit(p.id)}
                          title="Edit Part Record"
                          className="p-1.5 rounded-lg text-slate-600 hover:text-brand-blue hover:bg-slate-100 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteProduct(p.id, p.reference_number)}
                          title="Delete Part"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex justify-between items-center">
          <span>Showing {products.length} parts across Thoothukudi shop catalogue</span>
          <span>50-Part Standard Reference Index Maintained</span>
        </div>

      </div>

      {/* Modals */}
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={editingProduct}
        categories={categories}
        brands={brands}
      />

      <VariantFormModal
        isOpen={isVariantModalOpen}
        onClose={() => setIsVariantModalOpen(false)}
        onSave={handleSaveVariant}
        variant={editingVariant}
        productId={variantProductId || 0}
      />

      <CsvImportModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        onSuccess={loadData}
      />

    </div>
  );
}
