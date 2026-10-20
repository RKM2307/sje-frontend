import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  icon: LucideIcon;
  colorScheme?: 'blue' | 'amber' | 'emerald' | 'rose' | 'navy';
}

export function StatCard({ label, value, sublabel, icon: Icon, colorScheme = 'blue' }: StatCardProps) {
  const schemeStyles = {
    blue: 'bg-blue-50 text-brand-blue border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    navy: 'bg-slate-100 text-slate-800 border-slate-200'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow transition-shadow flex items-start justify-between">
      <div>
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
          {label}
        </span>
        <span className="font-heading font-black text-2xl text-slate-900 tracking-tight">
          {value}
        </span>
        {sublabel && (
          <p className="text-[11px] text-slate-400 mt-1">{sublabel}</p>
        )}
      </div>

      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${schemeStyles[colorScheme]}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  );
}
