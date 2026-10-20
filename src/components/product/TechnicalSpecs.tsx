import { CheckCircle2, ShieldCheck, Info } from 'lucide-react';
import { ProductDetail, ProductVariant } from '../../types';

interface TechnicalSpecsProps {
  product: ProductDetail;
  selectedVariant: ProductVariant | null;
}

export function TechnicalSpecs({ product, selectedVariant }: TechnicalSpecsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
      
      <div>
        <h3 className="font-heading font-bold text-slate-900 text-lg flex items-center space-x-2">
          <Info className="w-5 h-5 text-brand-blue" />
          <span>Technical Specifications & Verification</span>
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Component catalogue details based on the reference standard and verified shop inventory.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs sm:text-sm">
          <tbody className="divide-y divide-slate-100">
            
            <tr className="bg-slate-50">
              <th className="py-2.5 px-3 font-semibold text-slate-600 w-1/3">Catalogue Reference ID</th>
              <td className="py-2.5 px-3 font-bold text-brand-navy">
                Part #{product.reference_number} (From 1-50 Standard Chart)
              </td>
            </tr>

            <tr>
              <th className="py-2.5 px-3 font-semibold text-slate-600">Standard Component Name</th>
              <td className="py-2.5 px-3 text-slate-800">{product.name}</td>
            </tr>

            <tr className="bg-slate-50">
              <th className="py-2.5 px-3 font-semibold text-slate-600">Category</th>
              <td className="py-2.5 px-3 text-slate-800">{product.category?.name || "General Spares"}</td>
            </tr>

            <tr>
              <th className="py-2.5 px-3 font-semibold text-slate-600">Brand Affiliation</th>
              <td className="py-2.5 px-3 text-slate-800">
                {product.brand ? (
                  <span className="inline-flex items-center space-x-1">
                    <span className="font-semibold">{product.brand.name}</span>
                    <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Authorisation Pending Verification
                    </span>
                  </span>
                ) : (
                  "Universal / Multi-brand compatible"
                )}
              </td>
            </tr>

            {product.manufacturer_part_number && (
              <tr className="bg-slate-50">
                <th className="py-2.5 px-3 font-semibold text-slate-600">Manufacturer Part Number</th>
                <td className="py-2.5 px-3 font-mono text-xs text-slate-800">{product.manufacturer_part_number}</td>
              </tr>
            )}

            {selectedVariant && (
              <>
                <tr>
                  <th className="py-2.5 px-3 font-semibold text-slate-600">Selected Variant</th>
                  <td className="py-2.5 px-3 font-semibold text-brand-blue">{selectedVariant.variant_name}</td>
                </tr>

                {selectedVariant.material && (
                  <tr className="bg-slate-50">
                    <th className="py-2.5 px-3 font-semibold text-slate-600">Material Composition</th>
                    <td className="py-2.5 px-3 text-slate-800">{selectedVariant.material}</td>
                  </tr>
                )}

                {selectedVariant.sku && (
                  <tr>
                    <th className="py-2.5 px-3 font-semibold text-slate-600">Store SKU</th>
                    <td className="py-2.5 px-3 font-mono text-xs text-slate-700">{selectedVariant.sku}</td>
                  </tr>
                )}
              </>
            )}

            <tr className="bg-slate-50">
              <th className="py-2.5 px-3 font-semibold text-slate-600">Data Quality & Verification</th>
              <td className="py-2.5 px-3 text-xs text-slate-600">
                {product.verification_notes || "Dimensions and compatibility verified with owner/supplier standards. Actual size confirmed before dispatch."}
              </td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>
  );
}
