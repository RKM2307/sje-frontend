import { Link } from 'react-router-dom';
import { Layers, Disc, CircleDot, Zap, ArrowRight } from 'lucide-react';
import { Category } from '../../types';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  const getCategoryIcon = (index: number) => {
    switch (index % 4) {
      case 0: return Layers;
      case 1: return Disc;
      case 2: return CircleDot;
      case 3: return Zap;
      default: return Layers;
    }
  };

  const categoryHighlights = [
    {
      title: "Check Valve & Pump Assembly",
      desc: "Spindles, outlet flanges, valve seats, sleeves, discs, and suction lanterns.",
      refs: "Ref 1–6, 8, 14",
      catId: 1
    },
    {
      title: "Rotating Parts & Hydraulics",
      desc: "Impellers, drive shafts, wear rings, couplings, motor rotors, stators & sleeves.",
      refs: "Ref 7, 11–12, 16–20, 22, 25, 27, 29–33, 35–37, 39, 41–42, 44–45, 49–50",
      catId: 2
    },
    {
      title: "Bearings, Seals & Retention",
      desc: "Ball bearings, taper sleeves, guide bearing blocks, mechanical seals & lock nuts.",
      refs: "Ref 9–10, 13, 21, 23–24, 26, 28, 34, 38, 40, 43, 46–48",
      catId: 3
    },
    {
      title: "Electrical & Miscellaneous",
      desc: "Motor lead wires, motor terminal attachments, capped nuts, and electrical components.",
      refs: "Ref 15, 21, 46",
      catId: 4
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Systematic Classification
          </span>
          <h2 className="mt-3 font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Explore Spare Parts by Functional Group
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Our 50 catalogue reference items are structured into 4 mechanical and electrical categories to streamline identification and replacement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryHighlights.map((cat, idx) => {
            const Icon = getCategoryIcon(idx);
            return (
              <div
                key={cat.catId}
                className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-xl hover:border-brand-blue/40 transition-all duration-300 group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue group-hover:bg-brand-navy group-hover:text-brand-yellow flex items-center justify-center transition-colors mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] font-bold text-brand-yellow uppercase tracking-wider block mb-1">
                    Category {String.fromCharCode(65 + idx)}
                  </span>

                  <h3 className="font-heading font-bold text-slate-900 text-lg group-hover:text-brand-blue transition-colors">
                    {cat.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <span className="text-[11px] text-slate-400 block mb-2">
                    {cat.refs}
                  </span>
                  <Link
                    to={`/products?category_id=${cat.catId}`}
                    className="inline-flex items-center text-xs font-bold text-brand-blue hover:text-brand-blueDark group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Browse Category Items</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
