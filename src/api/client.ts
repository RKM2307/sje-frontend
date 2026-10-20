const API_BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api';

export function getAuthToken(): string | null {
  return localStorage.getItem('sje_admin_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('sje_admin_token', token);
}

export function removeAuthToken(): void {
  localStorage.removeItem('sje_admin_token');
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorDetail = 'An error occurred';
    try {
      const errorData = await response.json();
      errorDetail = errorData.detail || errorData.message || JSON.stringify(errorData);
    } catch {
      errorDetail = response.statusText || `HTTP ${response.status}`;
    }
    throw new Error(errorDetail);
  }

  // Handle blob responses (e.g. CSV download)
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('text/csv')) {
    return (await response.blob()) as unknown as T;
  }

  return response.json();
}
