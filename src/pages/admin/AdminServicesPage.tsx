import { useState, useEffect } from 'react';
import { Wrench, Phone, Mail, CheckCircle2, MessageSquare } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getAdminServiceRequests, updateServiceRequestStatus } from '../../api/admin';

export function AdminServicesPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await getAdminServiceRequests(statusFilter || undefined);
      setRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, [statusFilter]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await updateServiceRequestStatus(id, newStatus);
      loadRequests();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      <AdminHeader
        title="Pump & Motor Service Requests"
        subtitle="Workshop overhaul diagnostics, winding inspection, and spare part replacement jobs."
      />

      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">Filter by Status:</span>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white"
        >
          <option value="">All Statuses</option>
          <option value="New">New Only</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="space-y-4">
        {loading ? (
          <LoadingSpinner text="Retrieving service requests..." />
        ) : requests.length > 0 ? (
          requests.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    r.status === 'New' ? 'bg-amber-100 text-amber-800' :
                    r.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {r.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    Logged {new Date(r.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {r.service_type}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-base">
                  {r.customer_name}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-brand-blue" />
                    <strong>{r.phone}</strong>
                  </span>
                  <span className="text-brand-blue font-semibold">
                    Contact Preference: {r.preferred_contact}
                  </span>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  <p><strong>Pump Brand & Model:</strong> {r.pump_brand || 'Not specified'} {r.pump_model ? `- ${r.pump_model}` : ''}</p>
                  <p><strong>Problem Description:</strong> {r.problem_description}</p>
                </div>
              </div>

              <div className="flex flex-col sm:items-end space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Update Status</span>
                <select
                  value={r.status}
                  onChange={(ev) => handleStatusChange(r.id, ev.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-semibold"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <a
                  href={`https://wa.me/${r.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${r.customer_name}, regarding your ${r.service_type} request with Sri Jayavarman Electricals Thoothukudi:`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>
              </div>

            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 text-sm">
            No service requests found for this filter.
          </div>
        )}
      </div>

    </div>
  );
}
