import { Bell, ShieldCheck, User } from 'lucide-react';

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function AdminHeader({ title, subtitle, actions }: AdminHeaderProps) {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="font-heading font-extrabold text-slate-900 text-xl tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center space-x-3">
        {actions}
        
        <div className="flex items-center space-x-2 pl-3 border-l border-slate-200 text-xs text-slate-600">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold border border-slate-200">
            <User className="w-4 h-4" />
          </div>
          <div className="hidden md:block">
            <span className="font-semibold text-slate-800 block leading-tight">Admin User</span>
            <span className="text-[10px] text-slate-400">Thoothukudi Store</span>
          </div>
        </div>
      </div>
    </header>
  );
}
