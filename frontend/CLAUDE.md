# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 필요한 가이드를 제공합니다.

## 개발 명령어

- **개발 서버 시작**: `npm run dev`
- **프로덕션 빌드**: `npm run build`
- **프로덕션 미리보기**: `npm run preview`
- **타입 체크**: `npm run check`
- **타입 체크 (감시 모드)**: `npm run check:watch`
- **코드 검사**: `npm run lint`
- **코드 포맷팅**: `npm run format`

## 아키텍처 개요

이 프로젝트는 TypeScript로 구축된 SvelteKit 애플리케이션으로, UI 컴포넌트는 shadcn-svelte, 스타일링은 Tailwind CSS v4를 사용합니다.

### 기술 스택

- **SvelteKit**: 파일 기반 라우팅을 사용하는 풀스택 웹 프레임워크
- **Tailwind CSS v4**: `@import "tailwindcss"` 새로운 문법을 사용하는 유틸리티 우선 CSS 프레임워크
- **shadcn-svelte**: Copy-Paste 철학을 따르는 Headless UI 컴포넌트 라이브러리
- **TypeScript**: 애플리케이션 전반의 타입 안전성

### 프로젝트 구조

```
src/
├── routes/                 # SvelteKit 파일 기반 라우팅
│   ├── +layout.svelte     # 테마 초기화가 포함된 루트 레이아웃
│   ├── +page.svelte       # 홈페이지 (BokslHome 환영 페이지)
│   ├── about/             # 프로젝트 정보 페이지
│   └── samples/           # UI 컴포넌트 데모
│       ├── forms/         # 폼 컴포넌트 예제
│       ├── layout/        # 레이아웃 컴포넌트 예제
│       ├── theme/         # 테마 전환 데모
│       └── [기타]/        # 추가 컴포넌트 카테고리
├── lib/
│   ├── components/ui/     # shadcn-svelte 컴포넌트들 (Button, Card, Input, Label)
│   ├── stores/           # Svelte 스토어
│   │   └── theme.ts      # 테마 관리 (light/dark/system)
│   └── utils.ts          # 유틸리티 함수 (cn 헬퍼)
└── app.css               # 테마용 CSS 변수가 포함된 글로벌 스타일
```

### 주요 설정 파일

- **PostCSS**: `@tailwindcss/postcss` 플러그인 사용 (Tailwind v4 필수)
- **Tailwind Config**: shadcn 색상 시스템이 포함된 TypeScript 기반 설정
- **Components Config**: 경로 별칭이 포함된 shadcn-svelte 설정

### 테마 시스템

애플리케이션은 정교한 테마 시스템을 사용합니다:

- **기본 테마**: 다크 모드
- **테마 스토어**: `$lib/stores/theme.ts`에서 light/dark/system 선호도 관리
- **CSS 변수**: `app.css`의 root 및 `.dark` 선택자에서 정의
- **지속성**: 테마 선호도를 localStorage에 저장
- **시스템 감지**: "system" 선택 시 OS 선호도 자동 감지

### 임포트 규칙

- TypeScript 파일은 확장자 없이 임포트: `import { theme } from "$lib/stores/theme"`
- Svelte 파일은 `.svelte` 확장자와 함께 임포트: `import Button from "$lib/components/ui/button.svelte"`
- 경로 별칭 사용: `$lib/`는 `src/lib/`로 매핑

### shadcn-svelte 통합

이 프로젝트는 shadcn-svelte의 copy-paste 철학을 따릅니다:
- 컴포넌트들은 프로젝트가 소유 (npm 의존성이 아님)
- `$lib/components/ui/`에 위치
- 각 컴포넌트는 index.ts barrel export가 포함된 자체 디렉토리를 가짐
- CSS 변수 기반 테마와 함께 Tailwind 유틸리티 클래스 사용
- Headless 아키텍처: 스타일링과 기능 분리

### 개발 참고사항

- **Tailwind v4**: `@tailwind` 지시어 대신 새로운 `@import "tailwindcss"` 문법 사용
- **SvelteKit 라우팅**: `+page.svelte` 규칙을 사용하는 파일 기반 라우팅
- **테마 초기화**: 루트 `+layout.svelte`에서 마운트 시 발생
- **TypeScript**: 프로젝트 전반에 엄격한 타이핑 적용