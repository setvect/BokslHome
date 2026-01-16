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
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
    ];
  },
};

export default nextConfig;
