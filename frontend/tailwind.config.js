import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './src/**/*.svelte',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [
    typography
  ],
  darkMode: 'class',
  // Tailwind CSS 4.x - 개발 중에는 더 많은 클래스 생성
  safelist: [
    // 색상 관련 클래스들
    {
      pattern: /^(text|bg|border)-(gray|blue|red|green|yellow|indigo|purple|pink)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    // 다크모드 클래스들
    {
      pattern: /^dark:(text|bg|border)-(gray|blue|red|green|yellow|indigo|purple|pink)-(50|100|200|300|400|500|600|700|800|900)$/,
    },
    // 사이즈 관련
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl',
    // 폰트 굵기
    'font-medium', 'font-semibold', 'font-bold',
    // 간격
    'space-x-2', 'space-x-4', 'space-y-2', 'space-y-4',
    // 패딩, 마진
    'p-1', 'p-2', 'p-3', 'p-4', 'p-6', 'p-8',
    'px-2', 'px-3', 'px-4', 'px-6', 'py-1', 'py-2', 'py-3', 'py-4',
    'm-1', 'm-2', 'm-4', 'mb-1', 'mb-2', 'mb-4', 'mb-8', 'mb-12', 'mt-8', 'mt-16',
    // 테두리
    'rounded', 'rounded-md', 'rounded-lg',
    'border-gray-300', 'border-gray-600',
    // 그림자
    'shadow-sm', 'shadow', 'shadow-lg',
    // 포커스
    'focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500', 'focus:border-transparent',
    // 호버
    'hover:shadow-lg', 'hover:bg-gray-100', 'hover:bg-gray-700',
    // 전환
    'transition-shadow', 'transition-all', 'transition-colors',
  ]
}
