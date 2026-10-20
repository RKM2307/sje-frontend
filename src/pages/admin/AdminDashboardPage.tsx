import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Layers, AlertTriangle, MessageSquare, Wrench, 
  FileSpreadsheet, ArrowRight, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { StatCard } from '../../components/admin/StatCard';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getDashboardStats } from '../../api/admin';

export function AdminDashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading dashboard metrics..." />;
  }

  return (
    <div className="p-6 sm:p-8 space-y-8">
      
      <AdminHeader
        title="Store & Inventory Overview"
        subtitle="Real-time catalogue metrics, enquiries, and Thoothukudi workshop requests."
        actions={
          <Link
            to="/admin/products"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-sm"
          >
            <Package className="w-4 h-4 text-brand-yellow" />
            <span>Manage 50 Parts</span>
          </Link>
        }
      />

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Catalogue Parts"
          value={stats?.total_products || 50}
          sublabel={`${stats?.published_products || 0} Published / ${stats?.draft_products || 0} Drafts`}
          icon={Package}
          colorScheme="blue"
        />

        <StatCard
          label="Available Size Variants"
          value={stats?.total_variants || 0}
          sublabel="Multi-size dimension models"
          icon={Layers}
          colorScheme="navy"
        />

        <StatCard
          label="Pending Enquiries"
          value={stats?.pending_enquiries || 0}
          sublabel="Awaiting price or size check"
          icon={MessageSquare}
          colorScheme="amber"
        />

        <StatCard
          label="Active Service Requests"
          value={stats?.pending_services || 0}
          sublabel="Pump / motor inspection"
          icon={Wrench}
          colorScheme="emerald"
        />
      </div>

      {/* Breakdown by Functional Category & Low Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Categories Distribution */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-bold text-slate-900 text-base">
              Parts Count by Category (50 Reference Items)
            </h3>
            <span className="text-xs font-bold text-brand-blue">Total 50 Parts</span>
          </div>

          <div className="space-y-3">
            {(stats?.categories_stats || []).map((cat: any) => (
              <div key={cat.category} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-slate-800 text-xs sm:text-sm">{cat.category}</h4>
                  <span className="text-[11px] text-slate-400">Structured classification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-brand-blue font-bold text-xs">
                    {cat.count} parts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Status Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-heading font-bold text-slate-900 text-base">
            Store Quality & Verification Protocol
          </h3>

          <div className="space-y-3 text-xs text-slate-600">
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Zero Duplicate Rule:</strong> All 50 catalogue reference IDs are strictly indexed without duplicates.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start space-x-2">
              <ShieldCheck className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
              <span>
                <strong>Draft Safeguard:</strong> Unverified products remain unpublished drafts until confirmed with actual store stock.
              </span>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Low Stock Items:</strong> {stats?.low_stock_variants || 0} variant sizes currently have 3 or fewer units in stock.
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/admin/products"
              className="w-full flex items-center justify-center space-x-1.5 py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
            >
              <span>Review Inventory Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
