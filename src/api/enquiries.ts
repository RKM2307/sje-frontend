import { apiRequest } from './client';
import { EnquiryPayload, ServiceRequestPayload } from '../types';

export async function submitEnquiry(payload: EnquiryPayload) {
  return apiRequest('/enquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function submitServiceRequest(payload: ServiceRequestPayload) {
  return apiRequest('/service-requests', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function uploadImage(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('file', file);

  return apiRequest<{ url: string; filename: string }>('/uploads', {
    method: 'POST',
    body: formData,
  });
}
