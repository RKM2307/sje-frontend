import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, MessageSquare, Wrench, Settings, 
  ExternalLink, LogOut, ShieldCheck, FileSpreadsheet, Building2
} from 'lucide-react';
import { removeAuthToken } from '../../api/client';

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAuthToken();
    navigate('/admin/login');
  };

  const navItems = [
    { label: "Dashboard Overview", path: "/admin", icon: LayoutDashboard },
    { label: "50-Part Inventory", path: "/admin/products", icon: Package },
    { label: "Customer Enquiries", path: "/admin/enquiries", icon: MessageSquare },
    { label: "Service Requests", path: "/admin/services", icon: Wrench },
    { label: "Brands & Pump Models", path: "/admin/brands-models", icon: Building2 },
    { label: "Store & Map Settings", path: "/admin/settings", icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between min-h-screen border-r border-slate-800">
      
      {/* Brand Header */}
      <div>
        <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-blue text-brand-yellow font-heading font-black text-xl flex items-center justify-center">
            SJE
          </div>
          <div>
            <h2 className="font-heading font-bold text-white text-sm leading-tight">
              Sri Jayavarman
            </h2>
            <p className="text-[11px] text-slate-400">Admin Inventory Portal</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-brand-blue text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-brand-yellow' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span className="flex items-center space-x-2">
            <ExternalLink className="w-4 h-4 text-brand-yellow" />
            <span>View Public Store</span>
          </span>
          <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">Live</span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 transition-colors text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Admin</span>
        </button>
      </div>

    </aside>
  );
}
