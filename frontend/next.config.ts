import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Docker 최적화를 위한 standalone 모드
  output: "standalone",

  eslint: {
    // Docker 빌드 시 ESLint 에러 무시 (개발 시에는 eslint --fix로 수정 필요)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 타입 체크는 유지
    ignoreBuildErrors: false,
  },

  // 백엔드 API 프록시 설정
  async rewrites() {
    // WSL에서 Windows 백엔드에 접근하기 위해 host.docker.internal 또는 172.x.x.x IP 사용
    // 개발 환경에서는 환경변수로 설정 가능
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';

    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
