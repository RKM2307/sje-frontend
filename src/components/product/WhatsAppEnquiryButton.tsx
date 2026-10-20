import { MessageSquare } from 'lucide-react';
import { ProductDetail, ProductVariant } from '../../types';

interface WhatsAppEnquiryButtonProps {
  product: ProductDetail;
  selectedVariant: ProductVariant | null;
  whatsappNumber?: string;
}

export function WhatsAppEnquiryButton({
  product,
  selectedVariant,
  whatsappNumber = "9442535457"
}: WhatsAppEnquiryButtonProps) {
  const cleanNumber = "919442535457";

  const selectedBrand = product.brand?.name || "General / Unspecified";
  const selectedSize = selectedVariant?.variant_name || "Contact to confirm required size";

  const messageText = 
`Hello Sri Jayavarman Electricals,

I would like to enquire about a pump spare part from your Thoothukudi shop.

Part Reference: #${product.reference_number}
Part Name: ${product.name}
Brand: ${selectedBrand}
Selected Size/Dimensions: ${selectedSize}

Please confirm availability at your 93A, Thevarpuram Road store.`;

  const encodedUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;

  return (
    <a
      href={encodedUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
    >
      <MessageSquare className="w-5 h-5 flex-shrink-0" />
      <span>Chat with Owner on WhatsApp</span>
    </a>
  );
}
