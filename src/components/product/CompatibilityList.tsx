import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, Camera, ArrowRight } from 'lucide-react';
import { Compatibility } from '../../types';

interface CompatibilityListProps {
  compatibilities: Compatibility[];
  productName: string;
}

export function CompatibilityList({ compatibilities, productName }: CompatibilityListProps) {
  const verifiedList = compatibilities.filter(c => c.verified);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      
      <div>
        <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Pump Model Compatibility</span>
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Compatibility must be explicit and verified. We do not make generic claims that parts fit every pump model.
        </p>
      </div>

      {verifiedList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Pump Brand</th>
                <th className="py-2.5 px-3">Model Name</th>
                <th className="py-2.5 px-3">Pump Type</th>
                <th className="py-2.5 px-3">Fitment Notes</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {verifiedList.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-3 font-semibold text-slate-800">{c.brand_name || "PSG / CRI"}</td>
                  <td className="py-3 px-3 font-medium text-brand-blue">{c.model_name}</td>
                  <td className="py-3 px-3 text-slate-600">{c.pump_type || "Water Pump"}</td>
                  <td className="py-3 px-3 text-slate-600 text-xs">{c.compatibility_notes || "Direct Fit"}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Verified Fit
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-3">
          <div className="flex items-start space-x-3 text-slate-700">
            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              No automatic compatibility assumptions are made for this part. Pump impeller diameters, shaft step-downs, and wear ring seats vary between monobloc and openwell submersibles.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between">
            <span className="font-semibold text-slate-800">Need to verify if this fits your pump?</span>
            <Link
              to="/identify-part"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-brand-blue text-white font-semibold text-xs hover:bg-brand-blueDark transition-colors"
            >
              <Camera className="w-3.5 h-3.5 text-brand-yellow" />
              <span>Verify My Pump Model</span>
            </Link>
          </div>
        </div>
      )}

    </div>
  );
}
