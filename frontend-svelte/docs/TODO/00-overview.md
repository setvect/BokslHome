# 새 프론트엔드 프로젝트 전체 작업 개요

## 프로젝트 목표
기존 복슬홈 프론트엔드 프로젝트를 새롭게 재구성하여 단순하고 안정적인 SvelteKit + TypeScript 애플리케이션 구축

## 기존 프로젝트에서 학습한 교훈
- **단계별 검증 필수**: 각 단계마다 오류 확인
- **레이아웃부터 시작**: 디자인 시스템보다 기본 구조가 우선
- **복잡한 전역 상태 피하기**: 단순한 로컬 상태부터 시작
- **Svelte 5 Runes 문법 필수**: 절대 Svelte 4 문법 사용 금지

## 전체 작업 단계

### 1단계: 기반 설정 (Foundation)
**파일**: `01-foundation.md`
- SvelteKit 프로젝트 초기화
- TypeScript, Tailwind CSS 4.x 설정
- 기본 폴더 구조 설계
- 개발 환경 및 품질 도구 설정

### 2단계: 기본 UI 컴포넌트 (Basic UI Components)
**파일**: `02-ui-components.md`
- shadcn-svelte 설치 및 기본 컴포넌트
- 테마 시스템 (라이트/다크 모드)
- 핵심 UI 컴포넌트들 (Button, Input, Card 등)
- 아이콘 시스템 (@lucide/svelte)

### 3단계: 기본 레이아웃 (Simple Layout)
**파일**: `03-layout.md`
- 단순한 레이아웃 구조 (복잡한 전역 상태 피하기)
- 기본 헤더 + 메인 콘텐츠 구조
- 반응형 동작 (모바일/데스크톱)
- 간단한 네비게이션

### 4단계: 디자인 시스템 + 폼 및 상호작용 (Design System & Forms)
**파일**: `04-design-system.md`
- 색상 시스템 및 테마 변수 정의
- 타이포그래피 및 스페이싱 시스템
- Superforms + Zod + Formsnap v2 통합
- 유효성 검사 패턴 확립
- 폼 컴포넌트들 및 상호작용 처리
- 컴포넌트 문서화 페이지 구축

### 5단계: 에디터 컴포넌트 (Editor Components)
**파일**: `05-editor-components.md`
- MarkdownEditor 컴포넌트 (CodeMirror 6 기반)
- HtmlEditor 컴포넌트 (TinyMCE 기반)
- 실시간 미리보기 및 Mermaid 다이어그램 지원
- 에디터 문서화 페이지 (`/design-system/components/markdown/`, `/design-system/components/editor/`)

### ~~6단계: 핵심 기능 구현 (Core Features)~~ - **SKIP**
~~Mock API 시스템 구축, 주요 페이지들 구현~~

## 단계별 의존성

```
1. Foundation (기반 설정)
    ↓
2. UI Components (기본 컴포넌트)
    ↓
3. Layout (레이아웃) ← 2단계의 컴포넌트 사용
    ↓
4. Design System & Forms (디자인 시스템 + 폼) ← 2,3단계 결과물을 체계화하고 폼 시스템 통합
    ↓
5. Editor Components (에디터 컴포넌트) ← 4단계의 디자인 시스템 기반으로 고급 컴포넌트 구축
```

## 각 단계별 검증 방법
- **개발 서버 정상 실행**: `npm run dev`
- **빌드 성공**: `npm run build`
- **타입 체크**: `npm run check`
- **코드 품질**: `npm run lint`, `npm run format`
- **기능 테스트**: 브라우저에서 실제 동작 확인

## 주요 기술 스택
- **프레임워크**: SvelteKit + Svelte 5 Runes
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4.x
- **UI 컴포넌트**: shadcn-svelte
- **아이콘**: @lucide/svelte
- **폼 처리**: Superforms + Zod + Formsnap v2
- **빌드 도구**: Vite

## 작업 순서 가이드라인
1. 각 단계는 순서대로 진행 (의존성 때문에 건너뛸 수 없음)
2. 각 단계 완료 후 반드시 검증 수행
3. 문제 발생 시 해당 단계 내에서 해결 후 다음 단계 진행
4. 모든 단계 완료 후 전체 통합 테스트 수행

## 완료 기준
- [ ] 1단계: 기반 설정 완료
- [ ] 2단계: 기본 UI 컴포넌트 완료
- [ ] 3단계: 기본 레이아웃 완료
- [ ] 4단계: 디자인 시스템 + 폼 및 상호작용 완료
- [ ] 5단계: 에디터 컴포넌트 완료
- [ ] 전체 통합 테스트 통과
- [ ] 프로덕션 빌드 성공
- [ ] TypeScript 오류 0개 상태