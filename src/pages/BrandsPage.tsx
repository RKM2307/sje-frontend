import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, CheckCircle2, Package, Layers } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SEO } from '../components/common/SEO';
import { fetchBrands, fetchPumpModels } from '../api/products';
import { Brand, PumpModel } from '../types';

export function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [models, setModels] = useState<PumpModel[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [b, m] = await Promise.all([fetchBrands(), fetchPumpModels()]);
        setBrands(b);
        setModels(m);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  return (
    <div className="bg-brand-surface min-h-screen pb-20">
      
      <SEO
        title="Brands Handled | PSG & CRI Pumps Thoothukudi | Sri Jayavarman Electricals"
        description="PSG Pumps & Motors and CRI Pumps spare parts dealer in Thoothukudi (Tuticorin). Openwell, monobloc, and borewell submersible parts."
        canonicalUrl="https://srijayavarmanelectricals.com/brands"
      />

      <div className="bg-brand-navyDark text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Brands Handled' }]} />
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-2">
            Brands Handled & Pump Models
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Sri Jayavarman Electricals sources replacement spare components and pump assemblies for trusted regional and national pump brands.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Verification transparency banner */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Brand Verification Notice:</strong> Authorised dealer representations are subject to verification of active dealer certificates. We supply compatible genuine-specification components and replacement parts for PSG and CRI pumps.
          </p>
        </div>

        {/* Brand Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* PSG Brand */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 rounded-xl bg-blue-900 text-white flex items-center justify-center font-heading font-black text-2xl shadow">
                PSG
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Authorisation Pending Verification
              </span>
            </div>

            <div>
              <h2 className="font-heading font-bold text-slate-900 text-2xl">
                PSG Pumps & Motors
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Reputed manufacturer of robust agricultural openwell submersibles and centrifugal monobloc pumps. We maintain spare impellers, wear rings, and motor shafts compatible with PSG models.
              </p>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Documented Pump Models:
              </h4>
              <div className="space-y-2 text-xs">
                {models.filter(m => m.brand_id === 1).map(m => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <span className="font-semibold text-slate-800">{m.model_name}</span>
                    <span className="text-slate-500">{m.pump_type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/products?brand_id=1"
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-colors"
              >
                <span>Browse All PSG Compatible Spares</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* CRI Brand */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="w-16 h-16 rounded-xl bg-red-700 text-white flex items-center justify-center font-heading font-black text-2xl shadow">
                CRI
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Authorisation Pending Verification
              </span>
            </div>

            <div>
              <h2 className="font-heading font-bold text-slate-900 text-2xl">
                CRI Pumps
              </h2>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Pioneering brand for 4" and 6" borehole submersible pumps and openwell systems. We supply verified thrust bearings, carbon pads, bushes, and wear components.
              </p>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Documented Pump Models:
              </h4>
              <div className="space-y-2 text-xs">
                {models.filter(m => m.brand_id === 2).map(m => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                    <span className="font-semibold text-slate-800">{m.model_name}</span>
                    <span className="text-slate-500">{m.pump_type}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                to="/products?brand_id=2"
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-colors"
              >
                <span>Browse All CRI Compatible Spares</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
