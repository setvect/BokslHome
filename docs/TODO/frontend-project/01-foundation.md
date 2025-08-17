# 1단계: 기반 설정 (Foundation)

## 목표
- 새로운 SvelteKit 프론트엔드 프로젝트 초기 설정
- TypeScript, Tailwind CSS 4.x 환경 구성
- 개발 환경 및 품질 도구 설정
- 기본 폴더 구조 설계

## 할일 목록

### 1.1 기존 프론트엔드 디렉토리 정리
- [x] `frontend/` 디렉토리가 프로젝트 루트
- [x] 새로운 프론트엔드 프로젝트 생성 준비

### 1.2 SvelteKit 프로젝트 초기화
- [x] `npm create svelte@latest frontend` 실행
- [x] 프로젝트 설정 선택:
  - [x] Skeleton project 선택
  - [x] TypeScript 활성화
  - [x] ESLint 활성화
  - [x] Prettier 활성화
  - [x] Playwright 비활성화
  - [x] Vitest 비활성화
- [x] `cd frontend && npm install` 실행
- [x] 기본 개발 서버 실행 테스트: `npm run dev`

### 1.3 TypeScript 설정
- [x] `tsconfig.json` 확인
- [x] `src/app.d.ts` 타입 정의 확인

### 1.4 Tailwind CSS 4.x 설정
- [x] Tailwind CSS 4.x 설치: `npm install -D tailwindcss @tailwindcss/vite`
- [x] `vite.config.ts`에 Tailwind 플러그인 추가
- [x] `src/app.css` 생성:
  ```css
  @import "tailwindcss";
  ```
- [x] `+layout.svelte`에서 CSS 임포트 적용
- [ ] 기본 테마 변수 설정

### 1.5 기본 폴더 구조 생성
- [x] `src/lib/` 하위 구조 생성:
  ```
  src/lib/
  ├── components/
  │   ├── layout/
  │   └── ui/
  ├── stores/
  ├── types/
  ├── utils/
  ├── schemas/
  ├── hooks/
  ├── constants/
  └── mock/
      ├── data/
      └── api/
  ```

### 1.6 개발 환경 도구 설정
- [x] `.prettierrc` 설정 파일 생성
- [x] ESLint Flat config(`eslint.config.js`) 규칙 보강 및 충돌 제거:
  ```javascript
  // eslint.config.js
  export default ts.config(
    // ...
    {
      rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'svelte/valid-compile': 'error',
        'svelte/no-at-debug-tags': 'warn',
        'no-undef': 'off'
      }
    }
  );
  ```
- [x] `package.json` scripts 확인 (lint/format/check 유지)

### 1.7 기본 유틸리티 설정
- [x] `src/lib/utils/index.ts` 생성 (기본 유틸 추가)
- [x] `src/lib/types/common.ts` 생성 (기본 타입들)

### 1.8 기본 페이지 생성
- [x] `src/routes/+layout.svelte` 기본 레이아웃 생성 (favicon, title 적용)
- [x] `src/routes/+page.svelte` 홈페이지 생성
- [x] Tailwind CSS 테스트용 스타일 적용

### 1.9 최종 검증
- [x] `npm run dev` 정상 실행 확인
- [x] `npm run build` 성공 확인
- [x] `npm run lint` 통과 확인
- [x] `npm run check` TypeScript 오류 0개 확인