import { toast } from 'react-toastify';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

export const fetchWithTimeout = async (
  url: string,
  options: FetchOptions = {}
): Promise<Response> => {
  const { timeout = 8000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      throw new NetworkError(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new NetworkError('Request timed out');
      }
      throw new NetworkError(error.message);
    }
    throw new NetworkError('An unknown error occurred');
  } finally {
    clearTimeout(timeoutId);
  }
};

export const handleApiError = (error: unknown): void => {
  const message = error instanceof Error ? error.message : 'An unknown error occurred';
  
  console.error('API Error:', error);
  
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};