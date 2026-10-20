export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_category_id?: number | null;
  description?: string;
  image_url?: string;
  active: boolean;
  product_count?: number;
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
  logo_url?: string;
  authorisation_status?: string;
  description?: string;
  active: boolean;
  product_count?: number;
}

export interface PumpModel {
  id: number;
  brand_id: number;
  brand_name?: string;
  model_name: string;
  model_number?: string;
  pump_type?: string;
  specifications?: Record<string, any>;
  active: boolean;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  variant_name: string;
  sku?: string;
  dimensions?: {
    diameter_mm?: number | string;
    inner_diameter_mm?: number | string;
    outer_diameter_mm?: number | string;
    length_mm?: number | string;
    thickness_mm?: number | string;
    bore_size_mm?: number | string;
    thread_size?: string;
    [key: string]: any;
  };
  material?: string;
  compatible_models?: string;
  price?: number | null;
  quantity: number;
  stock_status?: string;
  image_url?: string;
  active: boolean;
}

export interface Compatibility {
  id: number;
  product_id: number;
  variant_id?: number;
  pump_model_id: number;
  model_name?: string;
  brand_name?: string;
  pump_type?: string;
  compatibility_notes?: string;
  verified: boolean;
}

export interface ProductListItem {
  id: number;
  reference_number: number;
  name: string;
  slug: string;
  description?: string;
  brand_name?: string;
  brand_id?: number;
  category_name?: string;
  category_id?: number;
  primary_image_url?: string;
  published: boolean;
  featured: boolean;
  stock_status: string;
  variant_count: number;
  starting_price?: number | null;
  created_at: string;
  updated_at: string;
}

export interface ProductDetail {
  id: number;
  reference_number: number;
  name: string;
  slug: string;
  description?: string;
  brand_id?: number;
  category_id?: number;
  model_number?: string;
  manufacturer_part_number?: string;
  specifications?: Record<string, any>;
  primary_image_url?: string;
  published: boolean;
  featured: boolean;
  stock_status: string;
  verification_notes?: string;
  seo_title?: string;
  seo_description?: string;
  created_at: string;
  updated_at: string;
  brand?: Brand;
  category?: Category;
  variants: ProductVariant[];
  compatibilities: Compatibility[];
}

export interface PaginatedProducts {
  items: ProductListItem[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface BusinessSettings {
  id: number;
  business_name: string;
  business_name_tamil?: string;
  tagline?: string;
  address: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
  phone: string;
  landline?: string;
  alt_phone?: string;
  whatsapp_number: string;
  email: string;
  latitude: number;
  longitude: number;
  opening_hours: Record<string, string>;
  map_url?: string;
  google_business_url?: string;
  hero_heading?: string;
  hero_subtext?: string;
  seo_meta_title?: string;
  seo_meta_description?: string;
  updated_at: string;
}

export interface EnquiryPayload {
  customer_name: string;
  phone: string;
  email?: string;
  enquiry_type?: string;
  product_id?: number;
  variant_id?: number;
  pump_brand?: string;
  pump_model?: string;
  quantity?: number;
  message?: string;
  image_url?: string;
  preferred_contact?: string;
}

export interface ServiceRequestPayload {
  customer_name: string;
  phone: string;
  email?: string;
  pump_brand?: string;
  pump_model?: string;
  service_type: string;
  problem_description: string;
  image_url?: string;
  preferred_contact?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  full_name?: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: AdminUser;
}
