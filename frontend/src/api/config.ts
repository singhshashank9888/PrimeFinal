// Hardcoded for Production (Render)
export const API_BASE_URL = 'https://primefinal.onrender.com/api';

/**
 * Enhanced API wrapper with automatic token injection 
 * and standardized error handling.
 */
export const apiCall = async (endpoint: string, options?: RequestInit) => {
  const token = localStorage.getItem('authToken');
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string>),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    // This will now point to https://primefinal.onrender.com/api/your-endpoint
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login'; 
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`🚀 API Dispatch Error [${endpoint}]:`, error.message);
    throw error;
  }
};