import { useState, useEffect } from 'react';
import { X, Save, AlertCircle, Upload } from 'lucide-react';
import { uploadImage } from '../../api/enquiries';
import { Category, Brand, ProductDetail } from '../../types';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  product?: ProductDetail | null;
  categories: Category[];
  brands: Brand[];
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  product,
  categories,
  brands
}: ProductFormModalProps) {
  const [referenceNumber, setReferenceNumber] = useState<number>(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [brandId, setBrandId] = useState<number | ''>('');
  const [modelNumber, setModelNumber] = useState('');
  const [mfgPartNumber, setMfgPartNumber] = useState('');
  const [stockStatus, setStockStatus] = useState('Contact for Availability');
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [primaryImageUrl, setPrimaryImageUrl] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setReferenceNumber(product.reference_number);
      setName(product.name || '');
      setDescription(product.description || '');
      setCategoryId(product.category_id || '');
      setBrandId(product.brand_id || '');
      setModelNumber(product.model_number || '');
      setMfgPartNumber(product.manufacturer_part_number || '');
      setStockStatus(product.stock_status || 'Contact for Availability');
      setPublished(product.published || false);
      setFeatured(product.featured || false);
      setPrimaryImageUrl(product.primary_image_url || '');
      setVerificationNotes(product.verification_notes || '');
      setSeoTitle(product.seo_title || '');
      setSeoDescription(product.seo_description || '');
    } else {
      setReferenceNumber(51);
      setName('');
      setDescription('');
      setCategoryId('');
      setBrandId('');
      setModelNumber('');
      setMfgPartNumber('');
      setStockStatus('Contact for Availability');
      setPublished(false);
      setFeatured(false);
      setPrimaryImageUrl('');
      setVerificationNotes('');
      setSeoTitle('');
      setSeoDescription('');
    }
    setError(null);
  }, [product, isOpen]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadImage(file);
      setPrimaryImageUrl(res.url);
    } catch (err: any) {
      setError(`Image upload failed: ${err.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Product name is required.');
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        reference_number: referenceNumber,
        name: name.trim(),
        description: description.trim(),
        category_id: categoryId ? Number(categoryId) : null,
        brand_id: brandId ? Number(brandId) : null,
        model_number: modelNumber.trim() || null,
        manufacturer_part_number: mfgPartNumber.trim() || null,
        stock_status: stockStatus,
        published,
        featured,
        primary_image_url: primaryImageUrl.trim() || null,
        verification_notes: verificationNotes.trim() || null,
        seo_title: seoTitle.trim() || null,
        seo_description: seoDescription.trim() || null,
      };

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save product');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 my-8">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow bg-brand-navy px-2 py-0.5 rounded">
              Catalogue ID #{referenceNumber}
            </span>
            <h3 className="font-heading font-bold text-slate-900 text-lg mt-1">
              {product ? `Edit Part: ${product.name}` : 'Register New Spare Part'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Reference ID (1-50) */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Ref ID (1-50) *
              </label>
              <input
                type="number"
                min="1"
                required
                value={referenceNumber}
                onChange={(e) => setReferenceNumber(parseInt(e.target.value, 10))}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue font-mono font-bold"
              />
            </div>

            {/* Product Name */}
            <div className="sm:col-span-9">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Standard Product Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Check Valve Spindle, Impeller, Shaft"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
              >
                <option value="">Select Functional Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Brand */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Brand Affiliation
              </label>
              <select
                value={brandId}
                onChange={(e) => setBrandId(e.target.value ? Number(e.target.value) : '')}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
              >
                <option value="">Universal / Unassigned Brand</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>{b.name}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Manufacturer Part Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Manufacturer Part # (When Verified)
              </label>
              <input
                type="text"
                value={mfgPartNumber}
                onChange={(e) => setMfgPartNumber(e.target.value)}
                placeholder="Official supplier part code"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            {/* Stock Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Stock Status
              </label>
              <select
                value={stockStatus}
                onChange={(e) => setStockStatus(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
              >
                <option value="In Stock">In Stock</option>
                <option value="Available to Order">Available to Order</option>
                <option value="Contact for Availability">Contact for Availability</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Product Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description, function in pump assembly, wear characteristics..."
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Image URL & File Upload */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Product Image (Upload or URL)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={primaryImageUrl}
                onChange={(e) => setPrimaryImageUrl(e.target.value)}
                placeholder="/products/part_11.webp or uploaded URL"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
              <label className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer flex-shrink-0 transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Verification Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Internal Verification Notes
            </label>
            <input
              type="text"
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              placeholder="e.g. Dimensions confirmed with PSG OS-3 standard drawings"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          {/* Toggles: Published and Featured */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 text-xs block">Publish to Public Catalogue</span>
                <span className="text-[11px] text-slate-500">Unverified items remain unpublished drafts by default.</span>
              </div>
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5 rounded text-brand-blue focus:ring-brand-blue cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200">
              <div>
                <span className="font-semibold text-slate-800 text-xs block">Feature on Homepage</span>
                <span className="text-[11px] text-slate-500">Highlight in popular spare parts section.</span>
              </div>
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-5 h-5 rounded text-brand-blue focus:ring-brand-blue cursor-pointer"
              />
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                SEO Meta Title
              </label>
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="Part 11 - Impeller | Sri Jayavarman Electricals Thoothukudi"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                SEO Meta Description
              </label>
              <textarea
                rows={2}
                value={seoDescription}
                onChange={(e) => setSeoDescription(e.target.value)}
                placeholder="Targeting Thoothukudi / Tuticorin local searches"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-100 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center space-x-2 px-6 py-2 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{saving ? 'Saving...' : 'Save Product Record'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
