import { useState } from 'react';
import { 
  Wrench, Package, Phone, MessageSquare, CheckCircle2, AlertCircle, 
  Send, ShieldCheck, Clock, Check
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SEO } from '../components/common/SEO';
import { submitServiceRequest, submitEnquiry } from '../api/enquiries';
import { BusinessSettings } from '../types';

export function SalesServicePage({ settings }: { settings?: BusinessSettings | null }) {
  const [activeTab, setActiveTab] = useState<'sales' | 'service'>('service');
  
  // Service form state
  const [serviceCustomerName, setServiceCustomerName] = useState('');
  const [servicePhone, setServicePhone] = useState('');
  const [serviceEmail, setServiceEmail] = useState('');
  const [serviceBrand, setServiceBrand] = useState('PSG Pumps');
  const [serviceModel, setServiceModel] = useState('');
  const [serviceType, setServiceType] = useState('Pump Inspection');
  const [problemDescription, setProblemDescription] = useState('');
  const [servicePreferredContact, setServicePreferredContact] = useState('WhatsApp');
  const [serviceSubmitting, setServiceSubmitting] = useState(false);
  const [serviceSuccess, setServiceSuccess] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);

  // Sales form state
  const [salesCustomerName, setSalesCustomerName] = useState('');
  const [salesPhone, setSalesPhone] = useState('');
  const [salesType, setSalesType] = useState('Pump Spare Parts');
  const [salesQuantity, setSalesQuantity] = useState(1);
  const [salesMessage, setSalesMessage] = useState('');
  const [salesPreferredContact, setSalesPreferredContact] = useState('WhatsApp');
  const [salesSubmitting, setSalesSubmitting] = useState(false);
  const [salesSuccess, setSalesSuccess] = useState(false);
  const [salesError, setSalesError] = useState<string | null>(null);

  const phone = settings?.phone || "+91 94425 35457";

  const serviceOptions = [
    { title: "Pump Inspection", desc: "Bench testing, mechanical clearance check, and wear diagnostics at our Thoothukudi workshop." },
    { title: "Motor Service", desc: "Winding resistance test, stator insulation check, bearing replacement, and rotor balancing." },
    { title: "Repair Enquiries", desc: "Guidance on feasibility and spare part requirements for damaged pump casings or broken shafts." },
    { title: "Spare-Part Replacement", desc: "Fitting new impellers, mechanical seals, and wear rings with micrometer precision." },
    { title: "Maintenance Enquiries", desc: "Pre-season overhaul advice for agricultural and industrial pump systems." },
  ];

  const salesOptions = [
    { title: "Pumps and Motors", desc: "Complete pump assemblies and electric motors for domestic, farm and industrial requirements." },
    { title: "Pump Spare Parts", desc: "Over 50 component categories including impellers, shafts, wear rings, bearings, and sleeves." },
    { title: "Replacement Components", desc: "Direct dimensional drop-in replacements for worn or damaged components." },
    { title: "Bulk Orders", desc: "Volume pricing for agricultural contractors, plumbers, and maintenance workshops." },
    { title: "Product Compatibility", desc: "Model-specific fitment verification for PSG and CRI pumps." },
    { title: "Price and Stock Enquiries", desc: "Immediate stock availability confirmation and competitive pricing." },
  ];

  const handleServiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceCustomerName.trim() || !servicePhone.trim() || !problemDescription.trim()) {
      setServiceError('Name, phone number and problem description are required.');
      return;
    }

    setServiceSubmitting(true);
    setServiceError(null);

    try {
      await submitServiceRequest({
        customer_name: serviceCustomerName.trim(),
        phone: servicePhone.trim(),
        email: serviceEmail.trim() || undefined,
        pump_brand: serviceBrand,
        pump_model: serviceModel.trim() || undefined,
        service_type: serviceType,
        problem_description: problemDescription.trim(),
        preferred_contact: servicePreferredContact
      });
      setServiceSuccess(true);
    } catch (err: any) {
      setServiceError(err.message || 'Failed to submit service enquiry.');
    } finally {
      setServiceSubmitting(false);
    }
  };

  const handleSalesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!salesCustomerName.trim() || !salesPhone.trim()) {
      setSalesError('Name and phone number are required.');
      return;
    }

    setSalesSubmitting(true);
    setSalesError(null);

    try {
      await submitEnquiry({
        customer_name: salesCustomerName.trim(),
        phone: salesPhone.trim(),
        enquiry_type: salesType,
        quantity: salesQuantity,
        message: salesMessage.trim() || `Sales enquiry for: ${salesType}`,
        preferred_contact: salesPreferredContact
      });
      setSalesSuccess(true);
    } catch (err: any) {
      setSalesError(err.message || 'Failed to submit sales enquiry.');
    } finally {
      setSalesSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-surface min-h-screen pb-20">
      
      <SEO
        title="Sales and Service Enquiries | Sri Jayavarman Electricals Thoothukudi"
        description="Pump inspection, motor servicing, replacement components, and bulk enquiries in Thoothukudi (Tuticorin). Contact our Thevarpuram Road workshop."
        canonicalUrl="https://srijayavarmanelectricals.com/sales-and-service"
      />

      {/* Top Banner */}
      <div className="bg-brand-navyDark text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'Sales & Service Enquiries' }]} />
          <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white mt-2">
            Pump Sales, Spare Parts & Workshop Service
          </h1>
          <p className="mt-2 text-sm text-slate-300 max-w-2xl leading-relaxed">
            Sri Jayavarman Electricals offers authorized parts assistance, component matching, and workshop inspection in Thoothukudi. Select your enquiry type below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Tab Selection */}
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('service')}
            className={`flex items-center space-x-2 py-3 px-6 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'service'
                ? 'border-brand-blue text-brand-blue bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4 text-brand-yellow" />
            <span>Pump & Motor Service Enquiries</span>
          </button>

          <button
            onClick={() => setActiveTab('sales')}
            className={`flex items-center space-x-2 py-3 px-6 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'sales'
                ? 'border-brand-blue text-brand-blue bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Package className="w-4 h-4 text-brand-yellow" />
            <span>Product Sales & Bulk Orders</span>
          </button>
        </div>

        {/* TAB 1: SERVICE ENQUIRIES */}
        {activeTab === 'service' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Options & Verification Notice */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-slate-900 text-lg">
                  Confirmed Workshop Services
                </h3>
                <p className="text-xs text-slate-500">
                  Services performed at our 93A Thevarpuram Road workshop facility:
                </p>

                <div className="space-y-3 pt-2">
                  {serviceOptions.map((opt) => (
                    <div key={opt.title} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{opt.title}</h4>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 pl-6">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service scope transparency disclaimer (Section 10) */}
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                <span className="font-bold block mb-1">Service Scope Policy:</span>
                We only accept pump and motor service requests confirmed directly with our technician. In-workshop repairs and component replacement are standard. Onsite or well-pulling services are evaluated on case-by-case enquiry.
              </div>

            </div>

            {/* Right: Service Request Submission Form */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-1">
                Book a Service or Inspection Enquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Fill in your pump details to receive availability and estimated diagnostic schedule.
              </p>

              {serviceSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-xl">Service Request Logged!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, {serviceCustomerName}. Our Thoothukudi workshop specialist will reach out via {servicePreferredContact} to review your {serviceBrand} pump.
                  </p>
                  <button
                    onClick={() => setServiceSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleServiceSubmit} className="space-y-4">
                  
                  {serviceError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{serviceError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={serviceCustomerName}
                        onChange={(e) => setServiceCustomerName(e.target.value)}
                        placeholder="e.g. Ramesh K."
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Contact Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={servicePhone}
                        onChange={(e) => setServicePhone(e.target.value)}
                        placeholder="+91 94425 XXXXX"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Pump / Motor Brand
                      </label>
                      <select
                        value={serviceBrand}
                        onChange={(e) => setServiceBrand(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                      >
                        <option value="PSG Pumps">PSG Pumps & Motors</option>
                        <option value="CRI Pumps">CRI Pumps</option>
                        <option value="Texmo">Texmo / Taro</option>
                        <option value="Kirloskar">Kirloskar</option>
                        <option value="Other">Other Brand</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Service Category Required *
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt.title} value={opt.title}>{opt.title}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Pump Model Number (If known)
                    </label>
                    <input
                      type="text"
                      value={serviceModel}
                      onChange={(e) => setServiceModel(e.target.value)}
                      placeholder="e.g. PSG OS-3 3HP Openwell or CRI 4-inch Submersible"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Problem Description / Noise / Symptoms *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={problemDescription}
                      onChange={(e) => setProblemDescription(e.target.value)}
                      placeholder="Describe what happened: e.g. motor tripping, reduced water discharge, excessive vibration, burning smell, worn bearings..."
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      {['WhatsApp', 'Telephone Call'].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setServicePreferredContact(method)}
                          className={`py-2.5 px-3 rounded-xl border font-bold transition-colors ${
                            servicePreferredContact === method
                              ? 'bg-brand-blue text-white border-brand-blue'
                              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={serviceSubmitting}
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-brand-yellow" />
                      <span>{serviceSubmitting ? 'Submitting Service Request...' : 'Submit Service Enquiry'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>
        )}

        {/* TAB 2: SALES ENQUIRIES */}
        {activeTab === 'sales' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-slate-900 text-lg">
                  Sales Enquiry Categories
                </h3>
                <p className="text-xs text-slate-500">
                  Select your procurement requirement:
                </p>

                <div className="space-y-3 pt-2">
                  {salesOptions.map((opt) => (
                    <div key={opt.title} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0" />
                        <h4 className="font-semibold text-slate-900 text-xs sm:text-sm">{opt.title}</h4>
                      </div>
                      <p className="mt-1 text-xs text-slate-600 pl-6">{opt.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <h3 className="font-heading font-bold text-slate-900 text-xl mb-1">
                Submit Product or Bulk Sales Enquiry
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Enquire about part availability, wholesale quotations, or customized dimensions.
              </p>

              {salesSuccess ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-xl">Sales Enquiry Sent!</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    We will send price and availability details for {salesType} to your {salesPreferredContact}.
                  </p>
                  <button
                    onClick={() => setSalesSuccess(false)}
                    className="px-6 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSalesSubmit} className="space-y-4">
                  
                  {salesError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{salesError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Your Name / Business Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={salesCustomerName}
                        onChange={(e) => setSalesCustomerName(e.target.value)}
                        placeholder="e.g. Murugan Electricals"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={salesPhone}
                        onChange={(e) => setSalesPhone(e.target.value)}
                        placeholder="+91 94425 XXXXX"
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Enquiry Type
                      </label>
                      <select
                        value={salesType}
                        onChange={(e) => setSalesType(e.target.value)}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white"
                      >
                        {salesOptions.map((opt) => (
                          <option key={opt.title} value={opt.title}>{opt.title}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Estimated Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={salesQuantity}
                        onChange={(e) => setSalesQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Details / Part Numbers Needed
                    </label>
                    <textarea
                      rows={3}
                      value={salesMessage}
                      onChange={(e) => setSalesMessage(e.target.value)}
                      placeholder="List required parts (e.g. 120mm Gunmetal impellers, 25mm SS shafts, bearing 6205) and delivery requirements..."
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={salesSubmitting}
                      className="w-full inline-flex items-center justify-center space-x-2 py-3 px-6 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white text-xs font-bold transition-all shadow-md disabled:opacity-50"
                    >
                      <Send className="w-4 h-4 text-brand-yellow" />
                      <span>{salesSubmitting ? 'Sending Sales Enquiry...' : 'Submit Sales Enquiry'}</span>
                    </button>
                  </div>

                </form>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
