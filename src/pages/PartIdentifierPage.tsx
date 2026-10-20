import { useState } from 'react';
import { Camera, Upload, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SEO } from '../components/common/SEO';
import { uploadImage, submitEnquiry } from '../api/enquiries';
import { BusinessSettings } from '../types';

export function PartIdentifierPage({ settings }: { settings?: BusinessSettings | null }) {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [pumpBrand, setPumpBrand] = useState('PSG Pumps');
  const [pumpModel, setPumpModel] = useState('');
  const [partRefNumber, setPartRefNumber] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preferredContact, setPreferredContact] = useState('WhatsApp');

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);
    try {
      const res = await uploadImage(file);
      setImageUrl(res.url);
    } catch (err: any) {
      setError(`Failed to upload photo: ${err.message}`);
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setError('Name and phone number are required.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const detailedNotes = [
        partRefNumber ? `Reference # Guess: ${partRefNumber}` : null,
        dimensions ? `Measurements: ${dimensions}` : null,
        message ? `Notes: ${message}` : null,
      ].filter(Boolean).join(' | ');

      await submitEnquiry({
        customer_name: customerName.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        enquiry_type: 'Spare Part Identification',
        pump_brand: pumpBrand,
        pump_model: pumpModel.trim() || undefined,
        quantity,
        message: detailedNotes || 'Customer photo identification enquiry',
        image_url: imageUrl || undefined,
        preferred_contact: preferredContact,
      });

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Failed to submit identification request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-surface min-h-screen pb-20">
      
      <SEO
        title="Help Me Identify My Spare Part | Sri Jayavarman Electricals Thoothukudi"
        description="Upload a photo of your damaged pump component, impeller, or shaft. Our Thoothukudi team will identify the matching replacement and confirm dimensions."
        canonicalUrl="https://srijayavarmanelectricals.com/identify-part"
      />

      {/* Top Banner */}
      <div className="bg-brand-navyDark text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Help Me Identify My Spare Part' }]} />
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-2">
            Spare Part Identification Assistant
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Unsure of the part number or exact millimeter size? Upload a photo of the component or your pump's nameplate, and our technical staff will find the exact match from our 50-part inventory.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          
          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-heading font-bold text-slate-900 text-2xl">
                Identification Request Dispatched!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{customerName}</strong>. Our shop technicians on Thevarpuram Road are reviewing your component details and will reply via {preferredContact} with confirmed part reference, sizes, and price.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
                >
                  Submit Another Part for Identification
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Step 1: Upload Photo */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Step 1: Photograph of Existing Component or Pump Nameplate
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center hover:bg-slate-50 transition-colors">
                  {imageUrl ? (
                    <div className="space-y-3">
                      <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden border border-slate-200 shadow">
                        <img src={imageUrl} alt="Uploaded component preview" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs font-semibold text-emerald-700 flex items-center justify-center space-x-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Photo Uploaded Successfully</span>
                      </p>
                      <button
                        type="button"
                        onClick={() => setImageUrl('')}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove and re-upload photo
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="part-photo-upload"
                      />
                      <label htmlFor="part-photo-upload" className="cursor-pointer block space-y-2">
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-brand-blue flex items-center justify-center mx-auto">
                          <Camera className="w-6 h-6" />
                        </div>
                        <span className="text-sm font-semibold text-brand-blue block">
                          {uploadingImage ? 'Uploading photo...' : 'Click to Upload Component Photograph'}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          Capture clear photo of the impeller, shaft keyway, seal, or pump nameplate (JPG, PNG, WebP)
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Step 2: Pump & Reference Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Pump Brand *
                  </label>
                  <select
                    value={pumpBrand}
                    onChange={(e) => setPumpBrand(e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                  >
                    <option value="PSG Pumps">PSG Pumps & Motors</option>
                    <option value="CRI Pumps">CRI Pumps</option>
                    <option value="Texmo / Taro">Texmo / Taro</option>
                    <option value="Kirloskar">Kirloskar</option>
                    <option value="Other">Other / Unknown</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Pump Model / Type (If known)
                  </label>
                  <input
                    type="text"
                    value={pumpModel}
                    onChange={(e) => setPumpModel(e.target.value)}
                    placeholder="e.g. OS-3 3HP Openwell or W-4 Borewell"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Part Ref # (1-50, if known)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={partRefNumber}
                    onChange={(e) => setPartRefNumber(e.target.value)}
                    placeholder="e.g. 11 for Impeller"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Dimensions (mm, if known)
                  </label>
                  <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    placeholder="e.g. 120mm OD, 22mm Bore"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Required Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              {/* Step 3: Customer Contact Details */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Step 2: Where Should We Send the Part Confirmation?
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Selvam S."
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Phone Number (WhatsApp Preferred) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 94425 XXXXX"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Preferred Response Method
                  </label>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {['WhatsApp', 'Telephone Call'].map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPreferredContact(m)}
                        className={`py-2.5 px-3 rounded-xl border font-bold transition-colors ${
                          preferredContact === m
                            ? 'bg-brand-blue text-white border-brand-blue'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Any Additional Notes
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention keyway shape, material preference (gunmetal or cast iron), or pump application..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-sm font-bold shadow-md transition-all disabled:opacity-50"
                >
                  <Camera className="w-4 h-4 text-brand-yellow" />
                  <span>{submitting ? 'Sending Request to Shop...' : 'Send Identification Request to Shop'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
}
