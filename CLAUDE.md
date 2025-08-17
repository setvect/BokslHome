# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. 프로젝트 개요

**복슬홈 (BokslHome)** - BokslPortal 프로젝트의 현대화 버전으로 Spring Boot + Kotlin 백엔드와 SvelteKit + TypeScript 프론트엔드로 구성

### 1.1. 주요 기능
- 게시판
- 복슬지식
- 복슬노트
- 복슬메모
- 복슬관계
- 댓글
- 첨부파일
- 로또번호 생성

## 2. 기술 스택

### 2.1. 백엔드 (완성됨)
- **언어**: Kotlin
- **프레임워크**: Spring Boot 3.4.0
- **데이터베이스**: H2 Database
- **보안**: JWT 인증
- **Java 버전**: 21

### 2.2. 프론트엔드 (개발 중 - 5단계 재구축)
- **언어**: TypeScript
- **프레임워크**: SvelteKit + **Svelte 5 Runes** (`$state`, `$effect`, `$derived`) - **반드시 Svelte 5 문법 사용**
- **스타일링**: Tailwind CSS 4.x (`@import "tailwindcss"` 신규 문법)
- **UI 컴포넌트**: shadcn-svelte (20+ 컴포넌트)
- **아이콘**: @lucide/svelte
- **폼 시스템**: Superforms + Zod + Formsnap v2
- **빌드 도구**: Vite
- **에디터 컴포넌트**:
  - MarkdownEditor (CodeMirror 6 + Mermaid 다이어그램)
  - HtmlEditor (TinyMCE)

## 3. 개발 명령어

### 3.1. 전체 프로젝트 빌드
```bash
# 전체 프로젝트 빌드 (프론트엔드 + 백엔드)
./backend/gradlew buildAll
```

### 3.2. 백엔드 개발
```bash
cd backend
./gradlew bootRun
```

### 3.3. 프론트엔드 개발
```bash
cd frontend
npm run dev
npm run build
npm run check    # TypeScript 검사
npm run lint     # ESLint (접근성 경고 무시)
npm run format   # Prettier
```

### 3.4. Docker 배포
```bash
# Docker 이미지 빌드
docker build -t bokslhome .

# 컨테이너 실행 (프론트엔드:3000, 백엔드:8080 포트 노출)
docker run -p 3000:3000 -p 8080:8080 bokslhome
```

## 4. 아키텍처 및 구조

### 4.1. 모노레포 구조
- `backend/` - Spring Boot Kotlin 애플리케이션 (완성됨)
- `frontend/` - SvelteKit TypeScript 애플리케이션 (개발 중)
- `docs/` - 프로젝트 문서 및 TODO 가이드

### 4.2. 백엔드 아키텍처 (참고용 - 완성됨)
```
backend/src/main/kotlin/com/setvect/bokslhome/
├── app/                    # 기능 모듈
│   ├── board/             # 게시판 시스템 (게시글, 관리)
│   ├── knowledge/         # 지식 베이스
│   ├── note/             # 노트 시스템 (카테고리 포함)
│   ├── memo/             # 메모 시스템 (카테고리 포함)
│   ├── network/          # 관계 관리
│   ├── comment/          # 댓글 시스템
│   ├── attach/           # 파일 첨부 처리
│   └── user/             # 사용자 관리 및 인증
├── config/               # 보안, 웹, Jackson 설정
├── filter/              # JWT 인증 필터
└── util/                # 공통 유틸리티, JWT 유틸
```

### 4.3. 프론트엔드 아키텍처 (5단계 재구축)

#### 4.3.1. 폴더 구조
```
frontend/src/
├── lib/
│   ├── components/
│   │   ├── layout/                    # 레이아웃 컴포넌트
│   │   │   ├── Header.svelte         # 공통 헤더
│   │   │   ├── Sidebar.svelte        # 메인 앱 사이드바
│   │   │   ├── DesignSystemSidebar.svelte  # 디자인 시스템 사이드바
│   │   │   └── MainContent.svelte    # 메인 콘텐츠
│   │   └── ui/                       # shadcn-svelte 컴포넌트 (20+개)
│   ├── stores/                       # 상태 관리
│   ├── utils/                        # 유틸리티 함수
│   ├── types/                        # TypeScript 타입
│   └── mock/                         # Mock 데이터/API
└── routes/
    ├── (app)/                        # 메인 애플리케이션
    │   ├── +layout.svelte           # Header + Sidebar + MainContent
    │   └── +page.svelte             # 홈페이지
    └── (design)/                     # 디자인 시스템
        ├── +layout.svelte           # Header + DesignSystemSidebar + MainContent
        └── design-system/           # 디자인 시스템 문서
```

#### 4.3.2. 그룹 라우팅 구조
- **(app)**: 메인 애플리케이션 - 헤더 + 앱 사이드바 + 메인 콘텐츠
- **(design)**: 디자인 시스템 - 헤더 + 디자인 사이드바 + 메인 콘텐츠
- **헤더 공유**: 모든 그룹에서 동일한 Header 컴포넌트 사용

### 4.5. 주요 기술 세부사항

#### 4.4.1. **Svelte 5 Runes 문법 (필수)**
**이 프로젝트는 Svelte 5를 사용하므로 반드시 Runes 문법을 사용해야 합니다.**

```typescript
// ✅ 올바른 Svelte 5 Runes 문법 - 반드시 사용
let currentValue = $state(value);
let previewHtml = $state('');
let isDarkMode = $derived(detectTheme());

// Props 정의 (Svelte 5)
interface Props {
  children: any;
  title?: string;
}
let { children, title = 'Default' }: Props = $props();

// 이벤트 핸들러
function handleClick() {
  currentValue = 'new value';
}

$effect(() => {
  // 반응형 효과 로직
  console.log('Value changed:', currentValue);
});

// ❌ 절대 사용하지 말 것 - Svelte 4 문법
// export let value;
// let: binding;
// on:click={handler}
```

### 4.5. API 문서 참조
외부 라이브러리 작업 시 항상 공식 문서 참조:
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **SvelteKit**: https://kit.svelte.dev/docs
- **shadcn-svelte**: https://shadcn-svelte.com/docs
- **Superforms**: https://superforms.rocks
- **CodeMirror 6**: https://codemirror.net/docs/
- **Mermaid**: https://mermaid.js.org/
- **TinyMCE**: https://www.tiny.cloud/docs/

## 5. 소통 가이드라인

- **언어**: 모든 소통은 한국어로
- **기술 용어**: 한국어-영어 혼용 가능 (예: "컴포넌트(component)")
- **코드 주석**: 한국어 선호
- **커밋 메시지**: 한국어

## 6. 개발 워크플로우

### 6.1. 소스 수정 후 즉시 오류 확인 (필수)
**모든 파일 수정 후에는 즉시 `mcp__ide__getDiagnostics()`를 사용하여 컴파일 오류 및 경고를 확인해야 합니다.**

#### 6.1.1. 오류 확인 및 수정 프로세스
1. **파일 수정 완료**
2. **즉시 진단 실행**: `mcp__ide__getDiagnostics()` 호출
3. **오류 분석**: TypeScript 오류, Svelte 경고, 문법 오류 등 확인
4. **오류 수정**: 발견된 모든 오류와 경고 해결
5. **재검증**: 수정 후 다시 진단 실행하여 오류 해결 확인
6. **반복**: 모든 오류가 해결될 때까지 3-5단계 반복
7. **중단 조건**: 반복적으로 수정했지만 같은 오류가 계속 발생할 경우 수정 작업 중단

```typescript
// 진단 도구 사용 예시
mcp__ide__getDiagnostics()
// 특정 파일만 검사할 경우
mcp__ide__getDiagnostics({ uri: "file:///path/to/file.svelte" })
```

**중요**: `npm run check`는 전체 프로젝트를 검사하므로 비효율적입니다. 개별 파일 수정 시에는 위의 진단 도구를 사용하는 것이 훨씬 효율적입니다.

### 6.2. 프론트엔드 5단계 재구축 계획

#### 6.2.1. 재구축 배경
기존 프론트엔드 프로젝트의 복잡한 레이아웃 문제를 해결하기 위해 단계적으로 처음부터 재구축

#### 6.2.2. 5단계 계획 (`/docs/TODO/frontend-project/`)
1. **기반 설정** (01-foundation.md): SvelteKit + TypeScript + Tailwind CSS 4.x
2. **기본 UI 컴포넌트** (02-ui-components.md): shadcn-svelte 20+ 컴포넌트 + 테마 시스템
3. **기본 레이아웃** (03-layout.md): Header + Sidebar + MainContent 3영역 레이아웃
4. **디자인 시스템 + 폼** (04-design-system.md): 색상/타이포/스페이싱 + Superforms + 문서화
5. **에디터 컴포넌트** (05-editor-components.md): MarkdownEditor + HtmlEditor + 최적화

#### 6.2.3. 핵심 원칙
- **단계별 검증**: 각 단계마다 `npm run dev`, `npm run build`, `npm run check` 확인
- **Svelte 5 Runes 필수**: 절대 Svelte 4 문법 사용 금지
- **단순한 상태 관리**: 복잡한 전역 상태 피하고 로컬 상태부터 시작
- **접근성 무시**: ESLint에서 `a11y-*` 경고 모두 무시

### 6.3. TODO 관리
복잡한 다단계 작업에는 TodoWrite 도구를 사용하여 진행 상황을 추적하고 사용자에게 가시성 제공

### 6.4. 프론트엔드 개발 시 주의사항
- **package.json 확인**: 새로운 라이브러리 설치 전 이미 설치된 패키지 확인 (예: @lucide/svelte)
- **Svelte 5 문법 준수**: 절대 Svelte 4 문법 사용하지 말 것
- **shadcn-svelte 컴포넌트**: 문제 발생 시 Popover 등 안정적인 대안 사용
- **타입스크립트**: `<script lang="ts">` 태그 필수
- **색상 테마 호환성**:
  - 모든 텍스트는 `text-foreground` 계열 클래스 사용
  - `text-muted-foreground`, 고정 색상 클래스 사용 금지
  - 새 컴포넌트 작성 후 라이트/다크 모드에서 가독성 확인 필수
  - 아이콘은 `text-current` 또는 `text-foreground` 사용

### 6.5. 오류 처리
- 단계별 디버깅 접근법
- 라이브러리별 이슈는 공식 문서 참조
- 큰 변경보다는 점진적 테스트

### 6.6. 보안 모범 사례
- API 키나 민감한 정보 노출 금지
- 인증은 JWT 사용 (백엔드에서 처리)
- 사용자 입력 검증
- OWASP 가이드라인 준수
