import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Hash, ArrowRight, ShieldCheck } from 'lucide-react';

export function QuickPartFinder() {
  const [refNumber, setRefNumber] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (refNumber.trim()) {
      const num = parseInt(refNumber.trim(), 10);
      if (!isNaN(num) && num >= 1 && num <= 50) {
        navigate(`/products/ref/${num}`);
        return;
      }
      navigate(`/products?q=${encodeURIComponent(refNumber.trim())}`);
    } else if (selectedCategory) {
      navigate(`/products?category_id=${selectedCategory}`);
    } else {
      navigate('/products');
    }
  };

  const popularRefs = [
    { ref: 1, name: "Check Valve Spindle" },
    { ref: 7, name: "Shaft" },
    { ref: 9, name: "Bearing" },
    { ref: 11, name: "Impeller" },
    { ref: 12, name: "Wear Ring" },
    { ref: 16, name: "Coupling" },
    { ref: 24, name: "Reinforced Seal" },
    { ref: 31, name: "Motor Rotor" },
    { ref: 39, name: "Upper Thrust Bearing" },
  ];

  return (
    <section className="py-12 bg-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-slate-900 via-brand-navy to-slate-900 rounded-2xl border border-slate-700/80 p-6 sm:p-10 shadow-2xl">
          
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-yellow flex items-center space-x-1.5 mb-2">
              <Hash className="w-3.5 h-3.5" />
              <span>50-Part Standard Reference Index</span>
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Quick Part Finder by Reference ID (1 to 50)
            </h2>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed">
              Sri Jayavarman Electricals maintains all 50 component categories from the pump spare parts reference chart. Jump directly to your required part by entering its catalogue reference ID or selecting below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLookup} className="mt-6 grid grid-cols-1 sm:grid-cols-12 gap-3 max-w-4xl">
            
            <div className="sm:col-span-5 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Hash className="w-4 h-4 text-brand-yellow" />
              </div>
              <input
                type="number"
                min="1"
                max="50"
                value={refNumber}
                onChange={(e) => setRefNumber(e.target.value)}
                placeholder="Enter Reference # (1 - 50)"
                className="w-full pl-9 pr-3 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              />
            </div>

            <div className="sm:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-yellow"
              >
                <option value="">All 4 Spare Categories</option>
                <option value="1">Cat A: Check Valve & Pump Assembly</option>
                <option value="2">Cat B: Rotating Parts & Hydraulics</option>
                <option value="3">Cat C: Bearings, Seals & Retention</option>
                <option value="4">Cat D: Electrical & Miscellaneous</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-brand-yellow hover:bg-brand-yellowLight text-brand-navy font-bold text-sm transition-all shadow-lg active:scale-95"
              >
                <span>Find Part</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

          {/* Quick jump pills */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Quick Select:</span>
            {popularRefs.map((p) => (
              <button
                key={p.ref}
                onClick={() => navigate(`/products/ref/${p.ref}`)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-brand-blue hover:text-white border border-slate-700 text-slate-300 text-xs font-medium transition-colors"
              >
                <span className="text-brand-yellow font-bold mr-1">#{p.ref}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
