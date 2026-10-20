import { useState, useEffect } from 'react';
import { MessageSquare, Phone, Mail, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { getAdminEnquiries, updateEnquiryStatus } from '../../api/admin';

export function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const data = await getAdminEnquiries(statusFilter || undefined);
      setEnquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      await updateEnquiryStatus(id, newStatus);
      loadEnquiries();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-6 sm:p-8 space-y-6">
      
      <AdminHeader
        title="Customer Product & Spare Part Enquiries"
        subtitle="Manage leads, photo identification queries, and size compatibility confirmations."
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
          <option value="In Progress">In Progress</option>
          <option value="Quoted">Quoted</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="space-y-4">
        {loading ? (
          <LoadingSpinner text="Retrieving enquiries..." />
        ) : enquiries.length > 0 ? (
          enquiries.map((e) => (
            <div key={e.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    e.status === 'New' ? 'bg-amber-100 text-amber-800' :
                    e.status === 'Quoted' ? 'bg-blue-100 text-blue-800' :
                    e.status === 'Closed' ? 'bg-slate-100 text-slate-600' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {e.status}
                  </span>
                  <span className="text-xs text-slate-400">
                    Logged {new Date(e.created_at).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {e.enquiry_type}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-slate-900 text-base">
                  {e.customer_name}
                </h3>

                <div className="flex flex-wrap gap-4 text-xs text-slate-600">
                  <span className="flex items-center space-x-1">
                    <Phone className="w-3.5 h-3.5 text-brand-blue" />
                    <strong>{e.phone}</strong>
                  </span>
                  {e.email && (
                    <span className="flex items-center space-x-1">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{e.email}</span>
                    </span>
                  )}
                  <span className="text-brand-blue font-semibold">
                    Contact via: {e.preferred_contact}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1">
                  {e.product_name && (
                    <p><strong>Item:</strong> {e.product_name} {e.variant_name ? `(${e.variant_name})` : ''} - Qty: {e.quantity}</p>
                  )}
                  {e.pump_brand && (
                    <p><strong>Pump:</strong> {e.pump_brand} {e.pump_model ? `- ${e.pump_model}` : ''}</p>
                  )}
                  {e.message && (
                    <p><strong>Notes:</strong> {e.message}</p>
                  )}
                  {e.image_url && (
                    <div className="pt-2">
                      <span className="font-bold block mb-1">Customer Uploaded Photo:</span>
                      <a href={e.image_url} target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline font-semibold">
                        View Full Photo Attachment →
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update Dropdown */}
              <div className="flex flex-col sm:items-end space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Update Status</span>
                <select
                  value={e.status}
                  disabled={updatingId === e.id}
                  onChange={(ev) => handleStatusChange(e.id, ev.target.value)}
                  className="px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-white font-semibold"
                >
                  <option value="New">New</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Quoted">Quoted</option>
                  <option value="Closed">Closed</option>
                </select>

                <a
                  href={`https://wa.me/${e.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${e.customer_name}, regarding your spare part enquiry with Sri Jayavarman Electricals Thoothukudi:`)}`}
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
            No customer enquiries match the selected filter.
          </div>
        )}
      </div>

    </div>
  );
}
