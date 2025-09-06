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
- [x] CodeMirror 6 패키지 설치: `npm install svelte-codemirror-editor @codemirror/lang-markdown @codemirror/theme-one-dark`
- [x] 마크다운 처리 패키지 설치: `npm install marked prismjs mermaid`
- [x] 타입 정의 설치: `npm install -D @types/marked @types/prismjs`

### A.2 유틸리티 모듈 구현
- [x] `src/lib/utils/theme-detector.ts` - 테마 감지 로직
- [x] `src/lib/utils/prism-highlighter.ts` - 문법 강조
- [x] `src/lib/utils/mermaid-renderer.ts` - Mermaid 다이어그램 렌더링
- [x] `src/lib/utils/codemirror-config.ts` - CodeMirror 설정
- [x] `src/lib/utils/markdown-renderer.ts` - Markdown → HTML 변환

### A.3 MarkdownEditor 컴포넌트 구현
- [x] `src/lib/components/ui/MarkdownEditor.svelte` 기본 구조 생성
- [x] CodeMirror 6 통합 및 마크다운 문법 강조
- [x] 실시간 미리보기 기능 구현
- [x] Mermaid 다이어그램 지원 (```mermaid 코드 블록)
- [x] 이미지 붙여넣기 및 드래그 앤 드롭 기능
- [x] 전체화면 모드 및 미리보기 토글
- [x] 테마 시스템 통합 (라이트/다크 모드)

### A.4 MarkdownEditor 최적화 및 마무리
- [x] **번들 최적화 전략**:
  - [x] Mermaid 동적 import: `import('mermaid').then(m => m.default)`
  - [x] Prism.js 언어별 동적 로딩: `import('prismjs/components/prism-{language}')`
  - [x] CodeMirror 확장 기능 지연 로딩
  - [x] 번들 분할을 위한 별도 chunk 설정 (`vite.config.js` 수정)
- [x] 메모리 관리 (언마운트 시 정리)
- [x] 반응형 레이아웃 (모바일/데스크톱)
- [x] 이미지 업로드 시스템 (드래그 앤 드롭, 클립보드)
- [x] 타입 정의 (`src/lib/types/editor.ts` - MarkdownEditor 부분)

### A.5 MarkdownEditor 문서화
- [x] `/design-system/components/markdown/+page.svelte` 생성
- [x] 기본 사용법 및 Props 설명
- [x] Mermaid 다이어그램 예시
- [x] 이미지 업로드 예시
- [x] 라이브 데모 구현

## B. HtmlEditor 구현

### B.1 기본 환경 설정
- [x] TinyMCE 패키지 설치: `npm install tinymce`
- [x] SSR 안전성을 위한 동적 import 설정

### B.2 HtmlEditor 컴포넌트 구현
- [x] `src/lib/components/ui/HtmlEditor.svelte` 기본 구조 생성
- [x] TinyMCE 동적 import 및 초기화
- [x] 기본 플러그인 설정 (code, table, link, lists, image)
- [x] 테마 시스템 연동 (라이트/다크 모드)
- [x] 커스텀 툴바 및 한국어 지원
- [x] HTML 소스 편집 모드
- [x] 이미지 업로드 핸들링

### B.3 HtmlEditor 최적화 및 마무리
- [x] **번들 최적화 전략**:
  - [x] TinyMCE 완전 동적 import: `import('tinymce/tinymce')`
  - [x] TinyMCE 플러그인 온디맨드 로딩
  - [x] TinyMCE CDN 옵션 고려 (번들 크기 최소화)
  - [x] 별도 chunk 설정으로 초기 로딩 시간 단축
- [x] 메모리 관리 (언마운트 시 정리)
- [x] 반응형 레이아웃 (모바일/데스크톱)
- [x] 타입 정의 확장 (`src/lib/types/editor.ts` - HtmlEditor 부분)

### B.4 HtmlEditor 문서화
- [x] `/design-system/components/editor/+page.svelte` 생성
- [x] 기본 사용법 및 TinyMCE 설정 옵션
- [x] 플러그인 활용 예시
- [x] 라이브 데모 구현

## C. 통합 마무리

### C.1 DesignSystemSidebar 메뉴 추가
- [x] Editors 카테고리 추가
- [x] Markdown Editor, HTML Editor 링크 추가
- [x] 통합 테스트 페이지 링크 추가

### C.2 통합 테스트 페이지
- [x] `/design-system/components/editors/test/+page.svelte` 생성
- [x] 두 에디터 동시 테스트
- [x] Markdown ↔ HTML 변환 기능 (turndown 미설치 시 기본 변환기 fallback)
- [x] 성능 테스트 (대용량 텍스트, 변환 시간 측정)

### C.3 최종 점검 및 번들 최적화 검증
- [ ] **Vite 번들 분석 및 최적화**:
  - [ ] `npm run build -- --mode analyze` 실행
  - [ ] 에디터 관련 chunk 크기 확인
  - [ ] Tree-shaking 효과 검증
  - [ ] 초기 로딩 시간 측정 및 개선
- [ ] TypeScript 오류 해결
- [ ] ESLint 경고 해결 (접근성 제외)
- [ ] 전체 기능 통합 테스트

---

## 사용자 확인 필요 항목

다음 항목들은 실제 브라우저에서 시각적/기능적 확인이 필요하여 사용자가 직접 테스트해야 합니다:

### 개발 서버 및 빌드 테스트
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] 개발 서버 콘솔 오류 없음 확인

### MarkdownEditor 기능 테스트
- [ ] 마크다운 문법 강조가 올바르게 표시되는지 확인
- [ ] 실시간 미리보기가 정상 작동하는지 확인
- [ ] Mermaid 다이어그램이 올바르게 렌더링되는지 확인
- [ ] 이미지 붙여넣기 기능 확인
- [ ] 전체화면 모드 전환 확인
- [ ] 테마 전환 시 에디터 색상 변경 확인

### HtmlEditor 기능 테스트
- [ ] TinyMCE 에디터 정상 로딩 확인
- [ ] 기본 텍스트 편집 기능 확인
- [ ] 테이블, 링크, 이미지 삽입 기능 확인
- [ ] HTML 소스 편집 모드 전환 확인
- [ ] 테마 전환 시 에디터 스타일 변경 확인

### 반응형 동작 테스트
- [ ] 모바일에서 에디터 레이아웃 확인
- [ ] 태블릿에서 미리보기 분할 화면 확인
- [ ] 데스크톱에서 전체화면 모드 확인
- [ ] 터치 기기에서 버튼 조작 편의성 확인

### 성능 테스트
- [ ] 에디터 초기 로딩 속도 확인
- [ ] 대용량 텍스트 입력 시 성능 확인
- [ ] 복잡한 Mermaid 다이어그램 렌더링 속도 확인
- [ ] 다중 이미지 업로드 시 성능 확인

### 문서화 페이지 테스트
- [ ] 에디터 문서 페이지 접근성 확인
- [ ] 예시 코드가 올바르게 표시되는지 확인
- [ ] 라이브 데모 정상 작동 확인
- [ ] 코드 복사 기능 확인

## 5단계 완료 기준
- [ ] 모든 작업 항목 완료
- [ ] 모든 사용자 확인 항목 통과
- [ ] TypeScript 오류 0개
- [ ] ESLint 경고 0개 (접근성 경고 제외)
- [ ] MarkdownEditor 완전 기능 구현
- [ ] HtmlEditor 완전 기능 구현
- [ ] 에디터 문서화 완료
- [ ] 테마 시스템 완전 통합
- [ ] 반응형 동작 정상 작동