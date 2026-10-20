import { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle, Phone, MessageSquare } from 'lucide-react';
import { submitEnquiry } from '../../api/enquiries';
import { ProductDetail, ProductVariant } from '../../types';

interface QuickEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ProductDetail;
  selectedVariant: ProductVariant | null;
}

export function QuickEnquiryModal({
  isOpen,
  onClose,
  product,
  selectedVariant,
}: QuickEnquiryModalProps) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [preferredContact, setPreferredContact] = useState('WhatsApp');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setError('Please provide your name and contact phone number.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await submitEnquiry({
        customer_name: customerName.trim(),
        phone: phone.trim(),
        enquiry_type: 'Product Enquiry',
        product_id: product.id,
        variant_id: selectedVariant?.id,
        pump_brand: product.brand?.name,
        pump_model: selectedVariant?.compatible_models || product.model_number,
        quantity: 1,
        message: message.trim() || `Customer enquiry for Part #${product.reference_number} ${product.name} (${selectedVariant?.variant_name || 'Standard'})`,
        preferred_contact: preferredContact
      });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please call us directly at 94425 35457.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-yellow bg-brand-navy px-2 py-0.5 rounded">
              Part #{product.reference_number}
            </span>
            <h3 className="font-heading font-bold text-slate-900 text-lg mt-1">
              Contact Owner for Availability
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-slate-900 text-lg">Enquiry Received!</h4>
              <p className="mt-1 text-sm text-slate-600">
                The owner of Sri Jayavarman Electricals will contact you at <strong>{phone}</strong> via {preferredContact} regarding <strong>{product.name}</strong>.
              </p>
            </div>
            <div className="pt-2">
              <a
                href="tel:9442535457"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Or Call Immediately: 94425 35457</span>
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Part summary banner */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-semibold text-slate-900">{product.name}</span>
              <span className="text-slate-500 block text-[11px] mt-0.5">
                {selectedVariant ? selectedVariant.variant_name : 'Standard / Contact for exact bore size'}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Senthil Kumar"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Contact Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 98421 XXXXX"
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Preferred Reply Mode
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['WhatsApp', 'Telephone Call'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPreferredContact(method)}
                    className={`py-2 px-3 rounded-lg border font-semibold transition-colors ${
                      preferredContact === method
                        ? 'bg-brand-blue text-white border-brand-blue'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Your Pump Model / Dimension Query (Optional)
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention pump model or shaft outer diameter if known..."
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
              ></textarea>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <a
                href="tel:9442535457"
                className="text-xs font-bold text-brand-blue hover:underline flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                <span>Call Owner: 94425 35457</span>
              </a>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center space-x-2 px-5 py-2 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Send to Owner'}</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
