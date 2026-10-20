import { apiRequest } from './client';
import { PaginatedProducts, ProductDetail, ProductListItem, Category, Brand, PumpModel } from '../types';

export async function fetchProducts(params: {
  q?: string;
  category_id?: number;
  brand_id?: number;
  stock_status?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedProducts> {
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.category_id) query.set('category_id', params.category_id.toString());
  if (params.brand_id) query.set('brand_id', params.brand_id.toString());
  if (params.stock_status) query.set('stock_status', params.stock_status);
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());

  return apiRequest<PaginatedProducts>(`/products?${query.toString()}`);
}

export async function fetchFeaturedProducts(limit = 8): Promise<ProductListItem[]> {
  return apiRequest<ProductListItem[]>(`/products/featured?limit=${limit}`);
}

export async function fetchProductDetail(identifier: string | number): Promise<ProductDetail> {
  return apiRequest<ProductDetail>(`/products/${identifier}`);
}

export async function fetchProductByRef(refNumber: number): Promise<ProductDetail> {
  return apiRequest<ProductDetail>(`/products/ref/${refNumber}`);
}

export async function fetchRelatedProducts(identifier: string | number, limit = 4): Promise<ProductListItem[]> {
  return apiRequest<ProductListItem[]>(`/products/${identifier}/related?limit=${limit}`);
}

export async function fetchCategories(): Promise<Category[]> {
  return apiRequest<Category[]>('/categories');
}

export async function fetchBrands(): Promise<Brand[]> {
  return apiRequest<Brand[]>('/brands');
}

export async function fetchPumpModels(brandId?: number): Promise<PumpModel[]> {
  const query = brandId ? `?brand_id=${brandId}` : '';
  return apiRequest<PumpModel[]>(`/pump-models${query}`);
}
