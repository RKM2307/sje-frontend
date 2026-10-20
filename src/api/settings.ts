import { apiRequest } from './client';
import { BusinessSettings } from '../types';

export async function fetchSettings(): Promise<BusinessSettings> {
  return apiRequest<BusinessSettings>('/settings');
}

export async function updateSettings(data: Partial<BusinessSettings>): Promise<BusinessSettings> {
  return apiRequest<BusinessSettings>('/settings', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
