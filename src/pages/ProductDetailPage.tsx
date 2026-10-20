import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Phone, MessageSquare, Send, CheckCircle2, ShieldCheck, ArrowRight,
  Package, HelpCircle, Layers, ArrowLeft, MapPin, Ruler
} from 'lucide-react';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { SEO } from '../components/common/SEO';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { VariantSelector } from '../components/product/VariantSelector';
import { TechnicalSpecs } from '../components/product/TechnicalSpecs';
import { CompatibilityList } from '../components/product/CompatibilityList';
import { WhatsAppEnquiryButton } from '../components/product/WhatsAppEnquiryButton';
import { QuickEnquiryModal } from '../components/product/QuickEnquiryModal';
import { ImageZoomGallery } from '../components/product/ImageZoomGallery';
import { ProductCard } from '../components/catalog/ProductCard';
import { fetchProductDetail, fetchRelatedProducts } from '../api/products';
import { ProductDetail, ProductVariant, ProductListItem, BusinessSettings } from '../types';

export function ProductDetailPage({ settings }: { settings?: BusinessSettings | null }) {
  const { identifier } = useParams<{ identifier: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [related, setRelated] = useState<ProductListItem[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const ownerPhone = "9442535457";
  const landline = "0461-2324374";

  useEffect(() => {
    async function loadProduct() {
      if (!identifier) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchProductDetail(identifier);
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        } else {
          setSelectedVariant(null);
        }

        try {
          const rel = await fetchRelatedProducts(data.slug, 4);
          setRelated(rel);
        } catch {
          // ignore
        }
      } catch (err: any) {
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [identifier]);

  // Schema.org Product structured data without commercial pricing
  useEffect(() => {
    if (!product) return;
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "image": product.primary_image_url ? `https://srijayavarmanelectricals.com${product.primary_image_url}` : undefined,
      "description": product.description || `Part Reference #${product.reference_number}: ${product.name}`,
      "sku": selectedVariant?.sku || `SJE-${String(product.reference_number).padStart(3, '0')}`,
      "mpn": product.manufacturer_part_number || undefined,
      "brand": {
        "@type": "Brand",
        "name": product.brand?.name || "Sri Jayavarman Electricals"
      },
      "offers": {
        "@type": "Offer",
        "url": `https://srijayavarmanelectricals.com/products/${product.slug}`,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "HomeGoodsStore",
          "name": "Sri Jayavarman Electricals",
          "telephone": "+919442535457",
          "address": "93A, Thevarpuram Road, Thoothukudi - 628003, Tamil Nadu, India"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'product-schema';
    script.text = JSON.stringify(schemaData);

    const existing = document.getElementById('product-schema');
    if (existing) existing.remove();
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById('product-schema');
      if (el) el.remove();
    };
  }, [product, selectedVariant]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-surface py-20">
        <LoadingSpinner text="Retrieving verified product record..." />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-brand-surface py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <HelpCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h2 className="font-heading font-bold text-slate-900 text-xl">Product Record Not Found</h2>
          <p className="text-sm text-slate-600">
            {error || "The requested spare part could not be found or is currently an unverified draft."}
          </p>
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-blue text-white text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products Catalogue</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-surface min-h-screen pb-20">
      
      <SEO
        title={product.seo_title || `Part ${product.reference_number} - ${product.name} | Sri Jayavarman Electricals Thoothukudi`}
        description={product.seo_description || `Enquire about Part #${product.reference_number} (${product.name}) for PSG & CRI pumps in Thoothukudi (Tuticorin). Call 94425 35457.`}
        canonicalUrl={`https://srijayavarmanelectricals.com/products/${product.slug}`}
      />

      {/* Breadcrumb Top Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Products & Spares', path: '/products' },
              ...(product.category ? [{ label: product.category.name, path: `/products?category_id=${product.category.id}` }] : []),
              { label: `Part #${product.reference_number} - ${product.name}` }
            ]}
          />
        </div>
      </div>

      {/* Main Product Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Top Product Summary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <ImageZoomGallery
              primaryImageUrl={selectedVariant?.image_url || product.primary_image_url}
              productName={product.name}
              refNumber={product.reference_number}
            />

            {/* In-store pickup notice */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start space-x-3 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">In-Store Dimension Matching</span>
                <span>Bring your damaged component to 93A Thevarpuram Road for micrometer tolerance matching before purchasing.</span>
              </div>
            </div>

            {/* Real Store Photo Snippet */}
            <div className="p-3 bg-slate-100 rounded-xl border border-slate-200 text-xs flex items-center space-x-3">
              <img src="/shop/impeller_shelves.jpg" alt="Shelves" className="w-12 h-12 object-cover rounded-lg" />
              <div>
                <span className="font-bold text-slate-800 block text-[11px]">Real Inventory Racks</span>
                <span className="text-slate-500 text-[10px]">Over 50 component categories stored in shop</span>
              </div>
            </div>
          </div>

          {/* Right Column: Info, Variants, Contact Actions (NON-ECOMMERCE) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            {/* Header Titles */}
            <div>
              <div className="flex items-center space-x-2 mb-2 flex-wrap gap-y-1">
                <span className="px-3 py-1 rounded-lg bg-brand-navy text-brand-yellow font-heading font-black text-xs shadow-sm">
                  Catalogue Ref #{product.reference_number}
                </span>

                {product.category && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-brand-blue border border-blue-200">
                    {product.category.name}
                  </span>
                )}

                {product.brand && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {product.brand.name}
                  </span>
                )}
              </div>

              <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 tracking-tight leading-snug">
                {product.name}
              </h1>

              {product.manufacturer_part_number && (
                <p className="mt-1 text-xs text-slate-500 font-mono">
                  Manufacturer Part #: <span className="text-slate-700 font-semibold">{product.manufacturer_part_number}</span>
                </p>
              )}
            </div>

            {/* Non-Ecommerce Availability Highlight */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Product Availability
                </span>
                <span className="font-heading font-extrabold text-lg text-emerald-800 flex items-center space-x-1.5 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Available at Thoothukudi Counter</span>
                </span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  93A, Thevarpuram Road, Thoothukudi - 628003
                </span>
              </div>

              <div className="sm:text-right">
                <a
                  href={`tel:${ownerPhone}`}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-blue text-white font-bold text-xs shadow hover:bg-brand-blueDark transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>Call: 94425 35457</span>
                </a>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
              <p>{product.description}</p>
            </div>

            {/* Variant Selector (pure sizing / dimension options) */}
            <div className="border-t border-slate-100 pt-4">
              <VariantSelector
                variants={product.variants}
                selectedVariant={selectedVariant}
                onSelectVariant={(v) => setSelectedVariant(v)}
              />
            </div>

            {/* Primary Action Buttons (Direct Contact Owner) */}
            <div className="border-t border-slate-100 pt-6 space-y-3">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${ownerPhone}`}
                  className="flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-brand-blue hover:bg-brand-blueDark text-white font-bold text-sm shadow-md transition-all active:scale-[0.99]"
                >
                  <Phone className="w-4 h-4 text-brand-yellow" />
                  <span>Call Owner Directly: 94425 35457</span>
                </a>

                <WhatsAppEnquiryButton
                  product={product}
                  selectedVariant={selectedVariant}
                  whatsappNumber={ownerPhone}
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                <span>Landline: <strong>{landline}</strong> | Cell: <strong>{ownerPhone} / 97860 09783</strong></span>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="font-bold text-brand-blue hover:underline"
                >
                  Send Request Form Instead →
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Technical Specs & Compatibility Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <TechnicalSpecs product={product} selectedVariant={selectedVariant} />
          <CompatibilityList compatibilities={product.compatibilities} productName={product.name} />
        </div>

        {/* Related Components */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Related Spare Components in {product.category?.name || "Catalogue"}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Frequently replaced together during pump overhaul.
                </p>
              </div>
              <Link
                to={`/products?category_id=${product.category_id}`}
                className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center"
              >
                <span>View all in category</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} whatsappNumber={ownerPhone} />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Quick Enquiry Modal Popup */}
      <QuickEnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
        selectedVariant={selectedVariant}
      />

    </div>
  );
}
