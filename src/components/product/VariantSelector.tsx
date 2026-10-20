import { Layers, CheckCircle2, HelpCircle, Phone, Ruler } from 'lucide-react';
import { ProductVariant } from '../../types';

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant | null;
  onSelectVariant: (variant: ProductVariant) => void;
}

export function VariantSelector({
  variants,
  selectedVariant,
  onSelectVariant,
}: VariantSelectorProps) {
  // If no variants exist for this component
  if (variants.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start space-x-3">
        <HelpCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-slate-800">Custom Dimension Verification</h4>
          <p className="mt-0.5 text-slate-600 leading-relaxed">
            Contact the shop owner at <strong>94425 35457</strong> to confirm the exact outer diameter, bore size, or pump model needed. We stock and custom-match sizes directly at our counter.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Available Size / Model Variations ({variants.length} verified sizes)
          </label>
          <span className="text-[11px] text-slate-400">Click to inspect dimensions</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {variants.map((v) => {
            const isSelected = selectedVariant?.id === v.id;
            return (
              <div
                key={v.id}
                onClick={() => onSelectVariant(v)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'border-brand-blue bg-blue-50/70 ring-2 ring-brand-blue/30 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-semibold text-slate-900 text-xs sm:text-sm">
                    {v.variant_name}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 ml-1.5" />
                  )}
                </div>

                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                    Available at Store
                  </span>
                  {v.sku && (
                    <span className="text-[11px] text-slate-400 font-mono">
                      Ref Code: {v.sku}
                    </span>
                  )}
                </div>

                {v.material && (
                  <span className="mt-1.5 block text-[11px] text-slate-600 font-medium">
                    Material: <strong className="text-slate-800">{v.material}</strong>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Dimensions Highlights Table */}
      {selectedVariant?.dimensions && Object.keys(selectedVariant.dimensions).length > 0 && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center space-x-1.5 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
            <Ruler className="w-3.5 h-3.5 text-brand-blue" />
            <span>Verified Physical Dimensions for {selectedVariant.variant_name}:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            {Object.entries(selectedVariant.dimensions).map(([key, val]) => (
              <div key={key} className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-2xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  {key.replace(/_/g, ' ')}
                </span>
                <span className="font-bold text-slate-900 text-xs">{String(val)} mm</span>
              </div>
            ))}
          </div>

          {selectedVariant.compatible_models && (
            <p className="text-[11px] text-slate-600 pt-1">
              <strong>Compatible Pump Models:</strong> {selectedVariant.compatible_models}
            </p>
          )}
        </div>
      )}

      {/* Sizing Verification Note */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center justify-between">
        <span className="text-[11px]">
          Uncertain about your pump's bore or shaft diameter? Call <strong>94425 35457</strong> for instant size checking.
        </span>
      </div>

    </div>
  );
}
