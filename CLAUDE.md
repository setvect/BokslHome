# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**복슬홈 (BokslHome)** - BokslPortal 프로젝트의 현대화 버전으로 Spring Boot + Kotlin 백엔드와 SvelteKit + TypeScript 프론트엔드로 구성

### 주요 기능
- 게시판
- 복슬지식 
- 복슬노트  
- 복슬메모
- 복슬관계
- 댓글
- 첨부파일
- 로또번호 생성

## 기술 스택

### 백엔드 (완성됨)
- **언어**: Kotlin
- **프레임워크**: Spring Boot 3.4.0
- **데이터베이스**: H2 Database
- **보안**: JWT 인증
- **Java 버전**: 21

### 프론트엔드 (개발 중)
- **언어**: TypeScript
- **프레임워크**: SvelteKit + Svelte 5 Runes (`$state`, `$effect`, `$derived`)
- **스타일링**: Tailwind CSS 4.x (`@import "tailwindcss"` 신규 문법)
- **UI 컴포넌트**: shadcn-svelte (헤드리스 UI 컴포넌트)
- **빌드 도구**: Vite
- **에디터 컴포넌트**: 
  - TinyMCE (HTML 편집)
  - CodeMirror 6 (마크다운 편집, Mermaid 다이어그램 지원)

## 개발 명령어

### 전체 프로젝트 빌드
```bash
# 전체 프로젝트 빌드 (프론트엔드 + 백엔드)
./backend/gradlew buildAll
```

### 백엔드 개발
```bash
cd backend
./gradlew bootRun
```

### 프론트엔드 개발
```bash
cd frontend
npm install  # 최초 한번만 실행
npm run dev
npm run dev -- --open  # 브라우저 자동 실행
```

### 코드 품질 관리
```bash
cd frontend
npm run check        # 타입 체크
npm run lint        # ESLint
npm run format      # Prettier 포맷팅
```

### Docker 배포
```bash
# Docker 이미지 빌드
docker build -t bokslhome .

# 컨테이너 실행 (프론트엔드:3000, 백엔드:8080 포트 노출)
docker run -p 3000:3000 -p 8080:8080 bokslhome
```

## 아키텍처 및 구조

### 모노레포 구조
- `backend/` - Spring Boot Kotlin 애플리케이션 (완성됨)
- `frontend/` - SvelteKit TypeScript 애플리케이션 (개발 중)
- `docs/` - 프로젝트 문서 및 TODO 가이드

### 백엔드 아키텍처 (참고용 - 완성됨)
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

### 프론트엔드 아키텍처
```
frontend/src/
├── lib/
│   ├── components/
│   │   ├── ui/                    # shadcn-svelte 컴포넌트
│   │   │   ├── MarkdownEditor.svelte  # 고급 마크다운 에디터
│   │   │   └── HtmlEditor.svelte      # TinyMCE 래퍼
│   │   └── [공유 컴포넌트들]
│   ├── stores/
│   │   └── theme.ts              # 테마 관리 스토어
│   └── utils.ts                  # 유틸리티 함수
└── routes/
    ├── design-system/            # 컴포넌트 문서
    └── [애플리케이션 라우트]
```

### 주요 기술 세부사항

#### Svelte 5 Runes 사용법
```typescript
// 항상 Svelte 5 runes 문법 사용
let currentValue = $state(value);
let previewHtml = $state('');
let isDarkMode = $derived(detectTheme());

$effect(() => {
  // 반응형 효과 로직
});
```

#### 테마 시스템
- 자동 라이트/다크 모드 감지
- Tailwind CSS 4.x와 CSS 변수 통합
- localStorage 지속성
- 시스템 선호도 감지

#### 에디터 컴포넌트
- **MarkdownEditor**: CodeMirror 6 기반, 실시간 미리보기, Mermaid 다이어그램, 이미지 붙여넣기 지원
- **HtmlEditor**: TinyMCE 통합, 테마 지원

## 중요한 구현 참고사항

### Tailwind CSS 4.x
- 새로운 `@import "tailwindcss"` 문법 사용 (`@tailwind` 대신)
- `@theme` 지시어로 테마 변수 정의
- CSS 변수 통합: `--color-primary: var(--primary)`

### CodeMirror 통합  
```typescript
// CodeMirror API 접근하는 올바른 방법
let editorView: any;

// on:ready 이벤트를 통해 에디터 인스턴스 획득
<CodeMirror on:ready={(e) => editorView = e.detail} />

// 커서 위치에 텍스트 삽입
function insertAtCursor(text: string) {
  if (editorView) {
    const state = editorView.state;
    const cursorPos = state.selection.main.head;
    editorView.dispatch({
      changes: { from: cursorPos, to: cursorPos, insert: text },
      selection: { anchor: cursorPos + text.length }
    });
  }
}
```

### Mermaid 다이어그램
- `mermaid` 코드 블록을 위한 커스텀 marked.js 렌더러
- 테마 지원과 함께 동적 SVG 렌더링
- HTML 생성 후 DOM 기반 후처리

### API 문서 참조
외부 라이브러리 작업 시 항상 공식 문서 참조:
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **SvelteKit**: https://kit.svelte.dev/docs
- **shadcn-svelte**: https://shadcn-svelte.com/docs
- **CodeMirror 6**: https://codemirror.net/docs/
- **Mermaid**: https://mermaid.js.org/

## 소통 가이드라인

- **언어**: 모든 소통은 한국어로
- **기술 용어**: 한국어-영어 혼용 가능 (예: "컴포넌트(component)")
- **코드 주석**: 한국어 선호
- **커밋 메시지**: 한국어

## 개발 워크플로우

### TODO 관리
복잡한 다단계 작업에는 TodoWrite 도구를 사용하여 진행 상황을 추적하고 사용자에게 가시성 제공

### 오류 처리  
- 단계별 디버깅 접근법
- 라이브러리별 이슈는 공식 문서 참조
- 큰 변경보다는 점진적 테스트

### 보안 모범 사례
- API 키나 민감한 정보 노출 금지
- 인증은 JWT 사용 (백엔드에서 처리)
- 사용자 입력 검증
- OWASP 가이드라인 준수

## 파일 임포트 패턴

```typescript
// Svelte 컴포넌트 (.svelte 확장자 필수)
import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
import Button from '$lib/components/ui/button/button.svelte';

// TypeScript 모듈 (확장자 생략)
import { theme } from '$lib/stores/theme';
import { cn } from '$lib/utils';
```

## 현재 상태

- ✅ **백엔드**: Spring Boot + Kotlin API 완료
- ✅ **프론트엔드 기반**: SvelteKit + Tailwind CSS 4.x 설정 완료
- ✅ **디자인 시스템**: shadcn-svelte 컴포넌트 통합 완료
- ✅ **테마 시스템**: CSS 변수를 이용한 라이트/다크 모드 완료
- ✅ **에디터 컴포넌트**: CodeMirror 6 기반 고급 MarkdownEditor 완료
- 🔄 **애플리케이션 기능**: 개발 중 (백엔드 API 연동)