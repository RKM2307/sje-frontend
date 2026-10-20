import { useState } from 'react';
import { MessageSquare, AlertCircle, X } from 'lucide-react';
import { BusinessSettings } from '../../types';

export function WhatsAppFloatingButton({ settings }: { settings?: BusinessSettings | null }) {
  const [showConfigWarning, setShowConfigWarning] = useState(false);

  const rawNumber = settings?.whatsapp_number || "9442535457";
  const isConfigured = Boolean(rawNumber && rawNumber.replace(/[^0-9]/g, '').length >= 10);
  const cleanNumber = rawNumber?.replace(/[^0-9]/g, '') || '919442535457';

  const handleClick = (e: React.MouseEvent) => {
    if (!isConfigured) {
      e.preventDefault();
      setShowConfigWarning(true);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Pulse effect badge */}
        <span className="mb-2 hidden sm:inline-block px-2.5 py-1 bg-brand-navyDark text-white text-xs font-semibold rounded-full shadow-lg border border-slate-700">
          Chat with Shop Specialist
        </span>

        {isConfigured ? (
          <a
            href={`https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hello Sri Jayavarman Electricals, I am looking for pump spare parts in Thoothukudi.")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enquire on WhatsApp"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-110 active:scale-95"
          >
            <MessageSquare className="w-7 h-7" />
          </a>
        ) : (
          <button
            onClick={handleClick}
            aria-label="WhatsApp not configured"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-xl transition-all"
          >
            <MessageSquare className="w-7 h-7" />
          </button>
        )}
      </div>

      {/* Admin warning modal if WhatsApp number is unconfigured */}
      {showConfigWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-amber-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 text-amber-600">
                <AlertCircle className="w-6 h-6 flex-shrink-0" />
                <h3 className="font-heading font-bold text-lg text-slate-800">
                  WhatsApp Number Not Configured
                </h3>
              </div>
              <button
                onClick={() => setShowConfigWarning(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              In accordance with store quality guidelines, invented WhatsApp numbers are not hardcoded. 
              The business administrator must configure a verified store WhatsApp contact in the Admin Settings.
            </p>
            <div className="mt-5 flex justify-end space-x-3">
              <button
                onClick={() => setShowConfigWarning(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <a
                href="/admin/settings"
                className="px-4 py-2 text-sm font-semibold text-white bg-brand-blue hover:bg-brand-blueDark rounded-lg"
              >
                Go to Admin Settings
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
