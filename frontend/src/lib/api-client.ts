
function resolveApiBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL; // backwards compatibility
  // Next.js rewrites를 사용하므로 상대 경로로 요청
  return '';
}

export const API_BASE_URL = resolveApiBaseUrl();

type FetchOptions = RequestInit & {
  params?: Record<string, string | number | boolean | undefined | null>;
};

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { params, ...init } = options;

  // URL 생성 (절대 URL 또는 상대 경로)
  let url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;

  // URL 파라미터 처리
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const paramString = searchParams.toString();
    if (paramString) {
      url = `${url}?${paramString}`;
    }
  }

  // 기본 헤더 설정
  const headers = new Headers(init.headers);
  if (!headers.has('Content-Type') && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // 인증 토큰(JWT) 추가
  const config: RequestInit = {
    ...init,
    headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      // 에러 응답 파싱 시도 - clone을 사용하여 body를 여러 번 읽을 수 있도록 함
      let errorData;
      const contentType = response.headers.get('content-type');

      try {
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = await response.text();
        }
      } catch {
        errorData = 'Failed to parse error response';
      }
      throw new ApiError(response.status, `API Error: ${response.status}`, errorData);
    }

    // 응답이 없는 경우 (204 No Content 등) 처리
    if (response.status === 204) {
      return {} as T;
    }

    return response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    // 네트워크 에러 등 fetch 자체 실패
    throw new ApiError(0, error instanceof Error ? error.message : 'Network Error');
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),

  put: <T>(endpoint: string, body: unknown, options?: FetchOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body instanceof FormData ? body : JSON.stringify(body)
    }),

  delete: <T>(endpoint: string, options?: FetchOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
