import flowbite from 'flowbite/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts,md}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  plugins: [flowbite],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard Variable', 'sans-serif'] // 기본 폰트를 Pretendard로 설정
      }
    }
  }
};
