import axios from 'axios';

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// 전역 에러 핸들링
client.interceptors.response.use(
    response => response,
    error => {
        // 공통 에러 처리 로직
        return Promise.reject(error);
    }
);