# 5단계: 에디터 컴포넌트 (Editor Components)

## 목표
- 고급 MarkdownEditor 컴포넌트 구현 (CodeMirror 6 기반)
- HtmlEditor 컴포넌트 구현 (TinyMCE 기반)
- 실시간 미리보기 및 Mermaid 다이어그램 지원
- 에디터 컴포넌트 문서화 페이지 구축
- 테마 시스템과 완전 통합

## 할일 목록

## A. MarkdownEditor 구현

### A.1 기본 환경 설정
- [ ] CodeMirror 6 패키지 설치 (@uiw/react-codemirror, @codemirror/lang-markdown, @codemirror/theme-one-dark)
- [ ] 마크다운 처리 패키지 설치 (marked, prismjs, mermaid)
- [ ] 타입 정의 등 개발 의존성 설치

### A.2 기본 MarkdownEditor 컴포넌트 구현
- [ ] `src/components/ui/markdown-editor.tsx` 기본 구조 생성
- [ ] MarkdownEditorProps 인터페이스 정의
- [ ] 기본 CodeMirror 에디터 설정 및 렌더링
- [ ] 기본 툴바 영역 구성
- [ ] 기본 레이아웃 구조 (에디터 영역)

### A.3 테마 시스템 연동
- [ ] 테마 감지 로직 구현 (`src/lib/utils/theme-detector.ts`)
- [ ] useTheme 훅 활용하여 isDarkMode 상태 반환
- [ ] system 테마 고려한 다크 모드 감지
- [ ] 테마에 따른 CodeMirror 테마 적용
- [ ] 라이트/다크 모드에서 에디터 스타일 검증

### A.4 미리보기 기능 구현
- [ ] showPreview 상태 관리 추가
- [ ] 마크다운 렌더링 유틸리티 구현 (`src/lib/utils/markdown-renderer.ts`)
- [ ] Marked 라이브러리 설정 및 기본 HTML 변환
- [ ] 에디터/미리보기 분할 레이아웃 구성
- [ ] prose 스타일링으로 미리보기 표시
- [ ] 실시간 미리보기 기능 (타이핑 시 자동 업데이트)
- [ ] 미리보기 토글 버튼 구현

### A.5 Mermaid 다이어그램 지원
- [ ] Mermaid 렌더링 유틸리티 구현 (`src/lib/utils/mermaid-renderer.ts`)
- [ ] ```mermaid 코드 블록 감지 및 처리
- [ ] 다이어그램 테마 적용 (라이트/다크 모드)
- [ ] 다이어그램 렌더링 오류 처리

### A.6 고급 기능 구현
- [ ] 전체화면 모드 상태 관리 (isFullscreen)
- [ ] 전체화면 모드 토글 및 스타일링
- [ ] 이미지 붙여넣기 기능 구현
- [ ] 드래그 앤 드롭 이미지 업로드 처리
- [ ] 문법 강조 최적화 (`src/lib/utils/prism-highlighter.ts`)
- [ ] CodeMirror 확장 설정 (`src/lib/utils/codemirror-config.ts`)


## B. HtmlEditor 구현

### B.1 기본 환경 설정
- [ ] TinyMCE React 패키지 설치 (@tinymce/tinymce-react)
- [ ] TinyMCE 타입 정의 설치
- [ ] SSR 안전성을 위한 동적 import 설정

### B.2 HtmlEditor 컴포넌트 구현
- [ ] `src/components/ui/html-editor.tsx` 기본 구조 생성
- [ ] HtmlEditorProps 인터페이스 정의
- [ ] TinyMCE Editor 컴포넌트 래핑
- [ ] 기본 플러그인 설정 (advlist, autolink, lists, link 등)
- [ ] 툴바 구성 (undo/redo, 서식, 정렬, 리스트 등)
- [ ] 테마에 따른 skin 및 content_css 설정
- [ ] placeholder 지원
- [ ] TinyMCE 동적 import 및 초기화
- [ ] 커스텀 툴바 및 한국어 지원
- [ ] HTML 소스 편집 모드
- [ ] 이미지 업로드 핸들링

### B.3 HtmlEditor 최적화 및 마무리
- [ ] 동적 import 활용:
  - [ ] TinyMCE 동적 import
  - [ ] TinyMCE 플러그인 온디맨드 로딩
  - [ ] TinyMCE CDN 옵션 고려
- [ ] 메모리 관리 (언마운트 시 정리)
- [ ] 반응형 레이아웃 (모바일/데스크톱)
- [ ] 타입 정의 확장 (`src/lib/types/editor.ts` - HtmlEditor 부분)

### B.4 HtmlEditor 문서화
- [ ] `/design-system/components/editor/page.tsx` 생성
- [ ] 기본 사용법 및 TinyMCE 설정 옵션
- [ ] 플러그인 활용 예시
- [ ] 라이브 데모 구현

## C. 통합 마무리

### C.1 DesignSystemSidebar 메뉴 추가
- [ ] `design-system-sidebar.tsx`에 Editors 카테고리 추가
- [ ] Markdown Editor, HTML Editor, Editor Compare 링크 추가
- [ ] navigation 배열에 에디터 메뉴 아이템 추가

### C.2 통합 비교 페이지
- [ ] `/design-system/components/editors/compare/page.tsx` 생성
- [ ] 에디터 비교 페이지 구성
- [ ] 그리드 레이아웃으로 두 에디터 동시 비교 영역
- [ ] Markdown ↔ HTML 변환 기능 구현

### C.3 최종 점검
- [ ] TypeScript 오류 해결
- [ ] ESLint 경고 해결
- [ ] 전체 기능 동작 확인

---

## 사용자 확인 필요 항목

다음 항목들은 실제 브라우저에서 시각적/기능적 확인이 필요하여 사용자가 직접 확인해야 합니다:

### 개발 서버 및 빌드
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] 개발 서버 콘솔 오류 없음 확인

### MarkdownEditor 기능 확인
- [ ] 마크다운 문법 강조가 올바르게 표시되는지 확인
- [ ] 실시간 미리보기가 정상 작동하는지 확인
- [ ] Mermaid 다이어그램이 올바르게 렌더링되는지 확인
- [ ] 이미지 붙여넣기 기능 확인
- [ ] 전체화면 모드 전환 확인
- [ ] 테마 전환 시 에디터 색상 변경 확인

### HtmlEditor 기능 확인
- [ ] TinyMCE 에디터 정상 로딩 확인
- [ ] 기본 텍스트 편집 기능 확인
- [ ] 테이블, 링크, 이미지 삽입 기능 확인
- [ ] HTML 소스 편집 모드 전환 확인
- [ ] 테마 전환 시 에디터 스타일 변경 확인

### 반응형 동작 확인
- [ ] 모바일에서 에디터 레이아웃 확인
- [ ] 태블릿에서 미리보기 분할 화면 확인
- [ ] 데스크톱에서 전체화면 모드 확인
- [ ] 터치 기기에서 버튼 조작 편의성 확인

### 문서화 페이지 확인
- [ ] 에디터 문서 페이지 접근성 확인
- [ ] 예시 코드가 올바르게 표시되는지 확인
- [ ] 라이브 데모 정상 작동 확인
- [ ] 코드 복사 기능 확인

## React/Next.js 특화 고려사항

### C.4 Next.js App Router 설정
- [ ] 에디터 컴포넌트 lazy loading 적용
- [ ] 서버 컴포넌트에서 클라이언트 컴포넌트 분리
- [ ] Suspense 경계 설정

## 5단계 완료 기준
- [ ] 모든 작업 항목 완료
- [ ] 모든 사용자 확인 항목 통과
- [ ] TypeScript 오류 0개
- [ ] ESLint 경고 최소화
- [ ] MarkdownEditor 완전 기능 구현
- [ ] HtmlEditor 완전 기능 구현
- [ ] 에디터 문서화 완료
- [ ] 테마 시스템 완전 통합
- [ ] 반응형 동작 정상 작동