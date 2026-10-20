import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Brand } from '../../types';

interface BrandHighlightsProps {
  brands: Brand[];
}

export function BrandHighlights({ brands }: BrandHighlightsProps) {
  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Brands Handled
            </span>
            <h2 className="mt-3 font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              PSG & CRI Pumps, Motors and Components
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              We supply compatible components, replacement assemblies, and provide technical guidance for prominent pump brands operating across Thoothukudi farms and industries.
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <Link
              to="/brands"
              className="inline-flex items-center text-sm font-semibold text-brand-blue hover:text-brand-blueDark transition-colors"
            >
              <span>View Brand Compatibility Details</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Brand Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: PSG Pumps & Motors */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-blue-900 text-white flex items-center justify-center font-heading font-black text-2xl shadow-md">
                  PSG
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Authorisation Pending Verification
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-slate-900">
                PSG Pumps & Motors
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Replacement parts and sizing assistance for PSG industrial monoblocs, openwell submersibles (such as OS-3), agricultural pumps, and motor components.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Compatible Impellers, Shafts & Wear Rings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Monobloc & Openwell Submersible parts</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                to="/products?brand_id=1"
                className="text-xs font-bold text-brand-blue hover:text-brand-blueDark uppercase tracking-wider inline-flex items-center"
              >
                Explore PSG Compatible Parts <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
              <span className="text-[11px] text-slate-400">Thoothukudi stock</span>
            </div>
          </div>

          {/* Card 2: CRI Pumps */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6 sm:p-8 hover:shadow-lg transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 rounded-xl bg-red-700 text-white flex items-center justify-center font-heading font-black text-2xl shadow-md">
                  CRI
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Authorisation Pending Verification
                </span>
              </div>

              <h3 className="font-heading font-bold text-xl text-slate-900">
                CRI Pumps
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                High-demand spare parts for CRI 4" borehole submersibles, openwell models (such as OSW-3), centrifugal pumps, thrust bearing sets, and mechanical seals.
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Submersible Thrust Bearings & Bushings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>4" Borewell & Openwell compatibility</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <Link
                to="/products?brand_id=2"
                className="text-xs font-bold text-brand-blue hover:text-brand-blueDark uppercase tracking-wider inline-flex items-center"
              >
                Explore CRI Compatible Parts <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
              <span className="text-[11px] text-slate-400">Tuticorin distribution</span>
            </div>
          </div>

        </div>

        {/* Verification transparency banner */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start space-x-3 text-amber-900 text-xs">
          <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold">Brand Verification Notice:</strong> Sri Jayavarman Electricals sources genuine pump components and spare parts. Specific authorised-dealer claims are published only upon formal verification of applicable dealer authorisations. Component compatibility is verified on a model-by-model basis.
          </p>
        </div>

      </div>
    </section>
  );
}
