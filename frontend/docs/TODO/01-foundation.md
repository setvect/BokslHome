# 1단계: 기반 설정 (Foundation)

## 목표
- 새로운 Next.js 프론트엔드 프로젝트 초기 설정
- TypeScript, Tailwind CSS 환경 구성
- 개발 환경 및 품질 도구 설정
- 기본 폴더 구조 설계

## 할일 목록

### 1.1 기존 프론트엔드 디렉토리 정리
- [ ] `frontend/` 디렉토리가 프로젝트 루트
- [ ] 새로운 프론트엔드 프로젝트 생성 준비

### 1.2 Next.js 프로젝트 초기화
- [ ] `npx create-next-app@latest frontend` 실행
- [ ] 프로젝트 설정 선택:
  - [ ] TypeScript 활성화
  - [ ] ESLint 활성화
  - [ ] Tailwind CSS 활성화
  - [ ] src/ directory 사용
  - [ ] App Router 사용 (권장)
  - [ ] import alias 설정 (`@/*`)
- [ ] `cd frontend && npm install` 실행
- [ ] 기본 개발 서버 실행 확인: `npm run dev`

### 1.3 TypeScript 설정
- [ ] `tsconfig.json` 확인 및 커스터마이징
- [ ] 엄격한 타입 검사 활성화 (`strict: true`)
- [ ] 절대 경로 import 설정 확인

### 1.4 Tailwind CSS 설정
- [ ] Tailwind CSS 설정 파일 확인 (`tailwind.config.ts`)
- [ ] `globals.css`에 Tailwind directive 확인
- [ ] 기본 테마 변수 설정 준비

### 1.5 기본 폴더 구조 생성
- [ ] `src/` 하위 구조 생성:
  ```
  src/
  ├── app/                    # Next.js App Router
  │   ├── layout.tsx
  │   ├── page.tsx
  │   └── globals.css
  ├── components/
  │   ├── layout/
  │   └── ui/
  ├── lib/
  │   ├── utils.ts
  │   ├── types/
  │   ├── hooks/
  │   ├── constants/
  │   └── mock/
  │       ├── data/
  │       └── api/
  └── styles/
      └── globals.css
  ```

### 1.6 개발 환경 도구 설정
- [ ] `.eslintrc.json` 설정 파일 확인 및 보강
- [ ] Prettier 설정 추가 (`.prettierrc` 파일 생성)
- [ ] `package.json` scripts 확인 및 추가 (dev, build, lint, format, type-check)

### 1.7 기본 유틸리티 설정
- [ ] `src/lib/utils.ts` 생성 (cn 함수 등)
- [ ] `src/lib/types/common.ts` 생성 (기본 타입들)
- [ ] Next.js용 환경변수 설정 파일 생성 (`.env.local`)

### 1.8 기본 페이지 생성
- [ ] `src/app/layout.tsx` 루트 레이아웃 설정
- [ ] `src/app/page.tsx` 홈페이지 생성
- [ ] Tailwind CSS 기본 스타일 적용
- [ ] 메타데이터 및 SEO 기본 설정

### 1.9 최종 검증
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] `npm run lint` 통과 확인
- [ ] `npm run type-check` TypeScript 오류 0개 확인

## React 특화 설정

### 1.10 React 18+ 최적화
- [ ] React 18 Concurrent Features 활용 준비
- [ ] Suspense 경계 설정
- [ ] Error Boundary 컴포넌트 기본 구조 생성

### 1.11 Next.js App Router 설정
- [ ] App Router 폴더 구조 이해
- [ ] 레이아웃 네스팅 구조 설계
- [ ] 라우트 그룹 활용 계획 (`(app)`, `(design)`)

## 검증 체크리스트
- [ ] 개발 서버가 `http://localhost:3000`에서 정상 실행
- [ ] 빌드 과정에서 오류 없음
- [ ] TypeScript 컴파일 오류 0개
- [ ] ESLint 경고 최소화
- [ ] 기본 Tailwind 스타일 적용 확인