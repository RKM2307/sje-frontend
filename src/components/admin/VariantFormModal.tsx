import { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { ProductVariant } from '../../types';

interface VariantFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  variant?: ProductVariant | null;
  productId: number;
}

export function VariantFormModal({
  isOpen,
  onClose,
  onSave,
  variant,
  productId
}: VariantFormModalProps) {
  const [variantName, setVariantName] = useState('');
  const [sku, setSku] = useState('');
  const [diameter, setDiameter] = useState('');
  const [innerDiameter, setInnerDiameter] = useState('');
  const [outerDiameter, setOuterDiameter] = useState('');
  const [length, setLength] = useState('');
  const [thickness, setThickness] = useState('');
  const [boreSize, setBoreSize] = useState('');
  const [threadSize, setThreadSize] = useState('');
  const [material, setMaterial] = useState('');
  const [compatibleModels, setCompatibleModels] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [stockStatus, setStockStatus] = useState('In Stock');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (variant) {
      setVariantName(variant.variant_name || '');
      setSku(variant.sku || '');
      const dims = variant.dimensions || {};
      setDiameter(dims.diameter_mm ? String(dims.diameter_mm) : '');
      setInnerDiameter(dims.inner_diameter_mm ? String(dims.inner_diameter_mm) : '');
      setOuterDiameter(dims.outer_diameter_mm ? String(dims.outer_diameter_mm) : '');
      setLength(dims.length_mm ? String(dims.length_mm) : '');
      setThickness(dims.thickness_mm ? String(dims.thickness_mm) : '');
      setBoreSize(dims.bore_size_mm ? String(dims.bore_size_mm) : '');
      setThreadSize(dims.thread_size ? String(dims.thread_size) : '');
      setMaterial(variant.material || '');
      setCompatibleModels(variant.compatible_models || '');
      setPrice(variant.price !== null && variant.price !== undefined ? variant.price : '');
      setQuantity(variant.quantity || 0);
      setStockStatus(variant.stock_status || 'In Stock');
    } else {
      setVariantName('');
      setSku('');
      setDiameter('');
      setInnerDiameter('');
      setOuterDiameter('');
      setLength('');
      setThickness('');
      setBoreSize('');
      setThreadSize('');
      setMaterial('');
      setCompatibleModels('');
      setPrice('');
      setQuantity(5);
      setStockStatus('In Stock');
    }
    setError(null);
  }, [variant, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!variantName.trim()) {
      setError('Variant name is required.');
      return;
    }

    setSaving(true);
    setError(null);

    const dimensions: Record<string, any> = {};
    if (diameter) dimensions.diameter_mm = Number(diameter) || diameter;
    if (innerDiameter) dimensions.inner_diameter_mm = Number(innerDiameter) || innerDiameter;
    if (outerDiameter) dimensions.outer_diameter_mm = Number(outerDiameter) || outerDiameter;
    if (length) dimensions.length_mm = Number(length) || length;
    if (thickness) dimensions.thickness_mm = Number(thickness) || thickness;
    if (boreSize) dimensions.bore_size_mm = Number(boreSize) || boreSize;
    if (threadSize) dimensions.thread_size = threadSize;

    try {
      const payload = {
        product_id: productId,
        variant_name: variantName.trim(),
        sku: sku.trim() || undefined,
        dimensions,
        material: material.trim() || undefined,
        compatible_models: compatibleModels.trim() || undefined,
        price: price !== '' ? Number(price) : null,
        quantity: Number(quantity) || 0,
        stock_status: stockStatus,
        active: true
      };

      await onSave(payload);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to save variant');
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h3 className="font-heading font-bold text-slate-900 text-lg">
            {variant ? 'Edit Size & Dimension Variant' : 'Add New Size Variant'}
          </h3>
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
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Variant Name / Size Title *
            </label>
            <input
              type="text"
              required
              value={variantName}
              onChange={(e) => setVariantName(e.target.value)}
              placeholder="e.g. 120mm Outer Diameter (Bore 22mm) or 25mm Shaft x 450mm"
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="col-span-2 sm:col-span-4 text-xs font-bold uppercase tracking-wider text-slate-700">
              Precise Physical Dimensions (mm)
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Diameter (mm)</label>
              <input
                type="text"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                placeholder="e.g. 25"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Inner Dia (mm)</label>
              <input
                type="text"
                value={innerDiameter}
                onChange={(e) => setInnerDiameter(e.target.value)}
                placeholder="e.g. 25"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Outer Dia (mm)</label>
              <input
                type="text"
                value={outerDiameter}
                onChange={(e) => setOuterDiameter(e.target.value)}
                placeholder="e.g. 120"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Length (mm)</label>
              <input
                type="text"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                placeholder="e.g. 450"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Thickness (mm)</label>
              <input
                type="text"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                placeholder="e.g. 6"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Bore Size (mm)</label>
              <input
                type="text"
                value={boreSize}
                onChange={(e) => setBoreSize(e.target.value)}
                placeholder="e.g. 22"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Thread / Connection</label>
              <input
                type="text"
                value={threadSize}
                onChange={(e) => setThreadSize(e.target.value)}
                placeholder="e.g. M16 Standard Thread"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Material Composition
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Gunmetal / Stainless Steel 410 / Cast Iron"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Compatible Models
              </label>
              <input
                type="text"
                value={compatibleModels}
                onChange={(e) => setCompatibleModels(e.target.value)}
                placeholder="e.g. PSG OS-3, CRI OSW-3"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Selling Price (₹)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                placeholder="Leave blank for 'Contact for Price'"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

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
                <option value="Contact for Price">Contact for Price</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex justify-end space-x-3">
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
              <span>{saving ? 'Saving...' : 'Save Size Variant'}</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
