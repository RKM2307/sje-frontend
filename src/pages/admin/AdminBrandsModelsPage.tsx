import { useState, useEffect } from 'react';
import { Building2, Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { fetchBrands, fetchPumpModels } from '../../api/products';
import { apiRequest } from '../../api/client';
import { Brand, PumpModel } from '../../types';

export function AdminBrandsModelsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<PumpModel[]>([]);
  const [loading, setLoading] = useState(true);

  // New model form
  const [selectedBrandId, setSelectedBrandId] = useState<number>(1);
  const [modelName, setModelName] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [pumpType, setPumpType] = useState('Openwell Submersible');
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [b, m] = await Promise.all([fetchBrands(), fetchPumpModels()]);
      setBrands(b);
      setModels(m);
      if (b.length > 0) setSelectedBrandId(b[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modelName.trim()) return;

    setSubmitting(true);
    try {
      await apiRequest('/pump-models', {
        method: 'POST',
        body: JSON.stringify({
          brand_id: selectedBrandId,
          model_name: modelName.trim(),
          model_number: modelNumber.trim() || undefined,
          pump_type: pumpType,
          active: true,
        }),
      });
      setModelName('');
      setModelNumber('');
      loadData();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteModel = async (id: number) => {
    if (confirm('Delete this pump model?')) {
      try {
        await apiRequest(`/pump-models/${id}`, { method: 'DELETE' });
        loadData();
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  if (loading) return <LoadingSpinner text="Loading brand and pump model databases..." />;

  return (
    <div className="p-6 sm:p-8 space-y-8">
      
      <AdminHeader
        title="Brands & Pump Models Compatibility Management"
        subtitle="Manage brand authorisation notices and verified pump models."
      />

      {/* Brands Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {brands.map((b) => (
          <div key={b.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-slate-900 text-lg">{b.name}</h3>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                {b.authorisation_status}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{b.description}</p>
            <div className="text-xs text-slate-400 font-medium pt-2">
              Status: <span className="text-emerald-600 font-bold">Active in Catalogue</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pump Models Manager */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        
        <h3 className="font-heading font-bold text-slate-900 text-base">
          Verified Pump Models Database
        </h3>

        {/* Add Model Form */}
        <form onSubmit={handleAddModel} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Brand</label>
            <select
              value={selectedBrandId}
              onChange={(e) => setSelectedBrandId(Number(e.target.value))}
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>{b.name}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-4">
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Model Name *</label>
            <input
              type="text"
              required
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="e.g. PSG Openwell OS-5"
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-[11px] font-bold uppercase text-slate-600 mb-1">Pump Type</label>
            <input
              type="text"
              value={pumpType}
              onChange={(e) => setPumpType(e.target.value)}
              placeholder="e.g. Openwell Submersible"
              className="w-full px-2.5 py-2 text-xs rounded-lg border border-slate-300 bg-white"
            />
          </div>

          <div className="sm:col-span-2 flex items-end">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-2 px-3 rounded-lg bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-sm"
            >
              {submitting ? 'Adding...' : 'Add Model'}
            </button>
          </div>
        </form>

        {/* Models List Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-2.5 px-3">Brand</th>
                <th className="py-2.5 px-3">Model Name</th>
                <th className="py-2.5 px-3">Pump Type</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {models.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{m.brand_name}</td>
                  <td className="py-2.5 px-3 font-medium text-brand-blue">{m.model_name}</td>
                  <td className="py-2.5 px-3 text-slate-600">{m.pump_type}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleDeleteModel(m.id)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
