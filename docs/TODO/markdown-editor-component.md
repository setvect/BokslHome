# Markdown 에디터 컴포넌트 구현 계획

## 핵심 요구사항
- **2단 레이아웃**: 왼쪽 CodeMirror 에디터, 오른쪽 marked 미리보기
- **테마 연동**: 디자인 시스템 라이트/다크 테마 자동 전환
- **클립보드 이미지**: 붙여넣기 시 서버 업로드 후 URL 반환 (백엔드 모킹)
- **다이어그램**: Mermaid 지원
- **전체화면**: 모달 형태 전체화면 편집 모드

## 기술 스택
```bash
# 설치 필요
npm install svelte-codemirror-editor @codemirror/lang-markdown marked mermaid

# 기존 설치됨
prismjs (코드 하이라이트)
```

## 단계별 작업 계획 (8단계)

### 1단계: 의존성 설치 및 기본 구조 ✅
- [x] npm 패키지 설치
- [x] `MarkdownEditor.svelte` 기본 컴포넌트 생성
- [x] 2단 레이아웃 CSS 구조 구현

### 2단계: CodeMirror 에디터 구현 ✅
- [x] CodeMirror 6 설정 및 markdown 언어 지원
- [x] 에디터 기본 기능 (입력, 편집)
- [x] 실시간 내용 변경 감지

### 3단계: Marked 미리보기 구현
- [ ] marked를 이용한 markdown → HTML 변환
- [ ] 미리보기 패널 렌더링
- [ ] 에디터-미리보기 실시간 동기화

### 4단계: 테마 시스템 연동
- [ ] 기존 theme store와 연동
- [ ] CodeMirror 테마 설정 (라이트/다크)
- [ ] 미리보기 영역 테마 스타일 적용

### 5단계: Mermaid 다이어그램 지원
- [ ] marked 커스텀 렌더러 구현
- [ ] mermaid 라이브러리 통합
- [ ] 다이어그램 렌더링 및 테스트

### 6단계: 클립보드 이미지 처리
- [ ] 클립보드 paste 이벤트 핸들링
- [ ] 이미지 파일 백엔드 모킹 업로드
- [ ] 업로드된 URL을 markdown 형태로 에디터에 삽입

### 7단계: 전체화면 모드
- [ ] 전체화면 모달 컴포넌트
- [ ] 전체화면 토글 기능
- [ ] ESC 키로 전체화면 해제

### 8단계: 디자인 시스템 통합
- [ ] `/design-system/components/markdown` 페이지 추가
- [ ] 컴포넌트 문서 및 사용 예제
- [ ] Props 설명 및 데모

## 컴포넌트 구조
```
src/lib/components/ui/
└── MarkdownEditor.svelte  # 단일 컴포넌트로 구현
```

## Props 인터페이스
```typescript
interface MarkdownEditorProps {
  value?: string;                    // 초기 내용
  readOnly?: boolean;                // 읽기 전용
  height?: string;                   // 높이 (기본: '400px')
  showPreview?: boolean;             // 미리보기 초기 표시 (기본: true)
  onChange?: (value: string) => void; // 내용 변경 콜백
}
```

## 예상 작업 시간
**총 2-3일** (각 단계당 2-4시간)