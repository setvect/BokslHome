# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 1. 프로젝트 개요

**복슬홈 (BokslHome)** - BokslPortal 프로젝트의 현대화 버전으로 Spring Boot + Kotlin 백엔드와 React + Next.js + TypeScript 프론트엔드로 구성

**중요**: 기존 `frontend-svelte/` 프로젝트 개발을 중단하고 `frontend/` 디렉토리에서 React 기반으로 새롭게 시작하는 중입니다.

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

### 2.2. 프론트엔드 (새로 시작)
- **언어**: TypeScript
- **프레임워크**: Next.js 14+ (App Router)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **아이콘**: lucide-react
- **폼 시스템**: React Hook Form + Zod
- **테마 관리**: next-themes
- **상태 관리**: React Context + useState/useReducer
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

### 3.3. 프론트엔드 개발 (React - 현재 개발 중)
```bash
cd frontend
npm run dev        # 개발 서버 실행
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 실행
npm run lint       # ESLint 검사
npm run format     # Prettier 포맷팅
npm run type-check # TypeScript 검사
```

### 3.4. 기존 Svelte 프론트엔드 (개발 중단)
```bash
cd frontend-svelte
# 이 프로젝트는 더 이상 개발하지 않습니다.
# React 기반 frontend/ 프로젝트로 마이그레이션 중입니다.
```

### 3.5. Docker 배포
```bash
# Docker 이미지 빌드
docker build -t bokslhome .

# 컨테이너 실행 (프론트엔드:3000, 백엔드:8080 포트 노출)
docker run -p 3000:3000 -p 8080:8080 bokslhome
```

## 4. 아키텍처 및 구조

### 4.1. 모노레포 구조
- `backend/` - Spring Boot Kotlin 애플리케이션 (완성됨)
- `frontend/` - Next.js + React + TypeScript 애플리케이션 (새로 시작)
- `frontend-svelte/` - SvelteKit 애플리케이션 (개발 중단, 참고용으로만 유지)
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

### 4.3. React 프론트엔드 아키텍처 (새 프로젝트 - 5단계 개발 계획)

#### 4.3.1. 폴더 구조
```
frontend/src/
├── app/                    # Next.js App Router
│   ├── (app)/             # 메인 애플리케이션
│   ├── (design)/          # 디자인 시스템
│   ├── layout.tsx         # 루트 레이아웃
│   └── globals.css        # 전역 스타일
├── components/
│   ├── layout/            # 레이아웃 컴포넌트
│   │   ├── header.tsx     # 공통 헤더
│   │   ├── sidebar.tsx    # 메인 앱 사이드바
│   │   ├── design-system-sidebar.tsx  # 디자인 시스템 사이드바
│   │   └── main-content.tsx    # 메인 콘텐츠
│   └── ui/                # shadcn/ui 컴포넌트
├── lib/
│   ├── utils.ts           # 유틸리티 함수
│   ├── types/             # TypeScript 타입
│   ├── hooks/             # 커스텀 훅
│   ├── contexts/          # React Context
│   ├── schemas/           # Zod 스키마
│   └── mock/              # Mock 데이터
└── providers/             # Provider 컴포넌트
```

#### 4.3.2. 그룹 라우팅 구조 (Next.js App Router)
- **(app)**: 메인 애플리케이션 - 헤더 + 앱 사이드바 + 메인 콘텐츠
- **(design)**: 디자인 시스템 - 헤더 + 디자인 사이드바 + 메인 콘텐츠
- **헤더 공유**: 모든 그룹에서 동일한 Header 컴포넌트 사용

### 4.4. React 개발 주요 원칙


### 4.5. API 문서 참조
외부 라이브러리 작업 시 항상 공식 문서 참조:
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev/reference/react
- **Tailwind CSS**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **React Hook Form**: https://react-hook-form.com
- **Zod**: https://zod.dev
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
3. **오류 분석**: TypeScript 오류, React 경고, 문법 오류 등 확인
4. **오류 수정**: 발견된 모든 오류와 경고 해결
5. **재검증**: 수정 후 다시 진단 실행하여 오류 해결 확인
6. **반복**: 모든 오류가 해결될 때까지 3-5단계 반복

```typescript
// 진단 도구 사용 예시
mcp__ide__getDiagnostics()
// 특정 파일만 검사할 경우
mcp__ide__getDiagnostics({ uri: "file:///path/to/file.tsx" })
```

### 6.2. React 프론트엔드 5단계 개발 계획

#### 6.2.1. 개발 배경
기존 Svelte 프론트엔드 개발을 중단하고 React 기반으로 새롭게 시작. AI 답변 품질과 개발 생산성 향상을 위해 React 생태계 선택.

#### 6.2.2. 5단계 계획 (`frontend/docs/TODO/`)
1. **기반 설정** (01-foundation.md): Next.js + TypeScript + Tailwind CSS
2. **기본 UI 컴포넌트** (02-ui-components.md): shadcn/ui 컴포넌트 + 테마 시스템
3. **기본 레이아웃** (03-layout.md): Header + Sidebar + MainContent 3영역 레이아웃
4. **디자인 시스템 + 폼** (04-design-system.md): 색상/타이포/스페이싱 + React Hook Form + 문서화
5. **에디터 컴포넌트** (05-editor-components.md): MarkdownEditor + HtmlEditor

#### 6.2.3. 핵심 원칙
- **단계별 검증**: 각 단계마다 `npm run dev`, `npm run build`, `npm run type-check` 확인
- **React 18+ 패턴 필수**: 함수형 컴포넌트와 Hooks 활용
- **단순한 상태 관리**: 복잡한 전역 상태 피하고 로컬 상태부터 시작
- **간단한 웹사이트 목표**: 테스트 코드나 성능 최적화보다는 빠른 구현 우선

### 6.3. TODO 관리
복잡한 다단계 작업에는 TodoWrite 도구를 사용하여 진행 상황을 추적하고 사용자에게 가시성 제공

### 6.4. React 개발 시 주의사항
- **package.json 확인**: 새로운 라이브러리 설치 전 이미 설치된 패키지 확인
- **React 패턴 준수**: Server/Client Components 올바른 구분
- **'use client' directive**: 필요시에만 사용 (Server Components 우선)
- **shadcn/ui 컴포넌트**: 문제 발생 시 대안 컴포넌트 사용
- **TypeScript**: 모든 컴포넌트에서 타입 정의 필수
- **색상 테마 호환성**:
  - 모든 텍스트는 `text-foreground` 계열 클래스 사용
  - 하드코딩된 색상 클래스 사용 금지
  - 새 컴포넌트 작성 후 라이트/다크 모드에서 가독성 확인 필수
  - 아이콘은 `text-current` 또는 `text-foreground` 사용

### 6.5. 오류 처리
- 단계별 디버깅 접근법
- 라이브러리별 이슈는 공식 문서 참조
- 큰 변경보다는 점진적 구현

### 6.6. 보안 모범 사례
- API 키나 민감한 정보 노출 금지
- 인증은 JWT 사용 (백엔드에서 처리)
- 사용자 입력 검증
- OWASP 가이드라인 준수