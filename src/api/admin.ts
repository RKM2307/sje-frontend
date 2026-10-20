import { apiRequest } from './client';
import { AuthResponse, AdminUser, ProductDetail, ProductVariant } from '../types';

export async function adminLogin(username: string, password: string): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function getAdminMe(): Promise<AdminUser> {
  return apiRequest<AdminUser>('/auth/me');
}

export async function getDashboardStats() {
  return apiRequest<any>('/admin/dashboard-stats');
}

export async function getAdminProducts(params: {
  q?: string;
  category_id?: number;
  brand_id?: number;
  published?: boolean;
  page?: number;
  limit?: number;
}) {
  const query = new URLSearchParams();
  if (params.q) query.set('q', params.q);
  if (params.category_id) query.set('category_id', params.category_id.toString());
  if (params.brand_id) query.set('brand_id', params.brand_id.toString());
  if (params.published !== undefined) query.set('published', params.published.toString());
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());

  return apiRequest<any>(`/admin/products?${query.toString()}`);
}

export async function getAdminProduct(id: number): Promise<ProductDetail> {
  return apiRequest<ProductDetail>(`/admin/products/${id}`);
}

export async function createProduct(data: any): Promise<ProductDetail> {
  return apiRequest<ProductDetail>('/admin/products', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProduct(id: number, data: any) {
  return apiRequest(`/admin/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id: number) {
  return apiRequest(`/admin/products/${id}`, {
    method: 'DELETE',
  });
}

export async function toggleProductPublish(id: number) {
  return apiRequest(`/admin/products/${id}/toggle-publish`, {
    method: 'POST',
  });
}

export async function addProductVariant(productId: number, data: any): Promise<ProductVariant> {
  return apiRequest<ProductVariant>(`/admin/products/${productId}/variants`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateProductVariant(variantId: number, data: any): Promise<ProductVariant> {
  return apiRequest<ProductVariant>(`/admin/variants/${variantId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteProductVariant(variantId: number) {
  return apiRequest(`/admin/variants/${variantId}`, {
    method: 'DELETE',
  });
}

export async function addProductCompatibility(productId: number, data: any) {
  return apiRequest(`/admin/products/${productId}/compatibility`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function deleteProductCompatibility(compatId: number) {
  return apiRequest(`/admin/compatibility/${compatId}`, {
    method: 'DELETE',
  });
}

export async function getAdminEnquiries(statusFilter?: string) {
  const query = statusFilter ? `?status_filter=${statusFilter}` : '';
  return apiRequest<any[]>(`/enquiries${query}`);
}

export async function updateEnquiryStatus(id: number, status: string, admin_notes?: string) {
  return apiRequest(`/enquiries/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status, admin_notes }),
  });
}

export async function getAdminServiceRequests(statusFilter?: string) {
  const query = statusFilter ? `?status_filter=${statusFilter}` : '';
  return apiRequest<any[]>(`/service-requests${query}`);
}

export async function updateServiceRequestStatus(id: number, status: string, admin_notes?: string) {
  return apiRequest(`/service-requests/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status, admin_notes }),
  });
}

export async function exportCsvBlob(): Promise<Blob> {
  return apiRequest<Blob>('/admin/export-csv');
}

export async function importCsvFile(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  return apiRequest<any>('/admin/import-csv', {
    method: 'POST',
    body: formData,
  });
}
