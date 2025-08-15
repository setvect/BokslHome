# 게시판 관리 모듈 개발 TODO

## 📋 프로젝트 개요
복슬홈 프로젝트의 게시판 관리 모듈을 개발합니다.
- 게시판 설정 정보 CRUD 기능
- 검색 및 페이지네이션 지원
- Mock API를 통한 백엔드 연동 시뮬레이션

## 🎯 참고 자료
- **화면 구성**: `@./temp/bm` 디렉토리의 캡쳐 이미지
- **데이터 구조**: `@backend/doc/TABLE-SCHEMA.md` - TBBA_BOARD_MANAGER 테이블
- **기술 스택**: SvelteKit + TypeScript + Tailwind CSS 4.x + shadcn-svelte

## 📝 TODO 리스트 (5단계)

### 1️⃣ 데이터 구조 설계 및 타입 정의
**목표**: 게시판 관리에 필요한 TypeScript 인터페이스와 타입 정의
**세부 작업**:
- [x] TBBA_BOARD_MANAGER 테이블 기반 BoardManager 인터페이스 정의
- [x] 검색 조건을 위한 SearchFilter 타입 정의  
- [x] 페이지네이션을 위한 Pagination 타입 정의
- [x] 폼 검증을 위한 Validation 타입 정의

**예상 결과물**:
```typescript
interface BoardManager {
  boardCode: string;     // BOARD_CODE (PK)
  name: string;          // NAME
  uploadLimit: number;   // UPLOAD_LIMIT
  replyF: boolean;       // REPLY_F (DB: Y/N → boolean)
  commentF: boolean;     // COMMENT_F (DB: Y/N → boolean)
  attachF: boolean;      // ATTACH_F (DB: Y/N → boolean)
  encryptF: boolean;     // ENCRYPT_F (DB: Y/N → boolean)
  deleteF: boolean;      // DELETE_F (DB: Y/N → boolean)
}
```

### 2️⃣ 게시판 목록 페이지 UI 구현
**목표**: 게시판 관리 목록 화면 구현 (list.png 참고)

**세부 작업**:
- [x] 상단 검색 영역 구현 (이름 드롭다운 + 검색어 입력 + 검색/만들기 버튼)
- [x] 게시판 목록 테이블 구현 (코드, 바로가기, 게시판이름, 기능)
- [x] 하단 페이지네이션 구현
- [x] 반응형 레이아웃 적용
- [x] shadcn-svelte 컴포넌트 활용 (Table, Button, Input, Select)

**파일 위치**: `/frontend/src/routes/(app)/board-manager/+page.svelte`

### 3️⃣ 게시판 생성/수정 폼 페이지 구현  
**목표**: 게시판 설정 폼 화면 구현 (create.png 참고)

**세부 작업**:
- [ ] 폼 필드 구현 (코드, 이름, 업로드 용량제한)
- [ ] 라디오 버튼 그룹 구현 (댓글 사용, 파일 업로드, 암호화 글 등록)
- [ ] 폼 검증 로직 구현
- [ ] 취소/확인 버튼 액션 구현
- [ ] 생성/수정 모드 분기 처리

**파일 위치**: 
- `/frontend/src/routes/(app)/board-manager/create/+page.svelte`
- `/frontend/src/routes/(app)/board-manager/[boardCode]/edit/+page.svelte`

### 4️⃣ 게시판 상세 조회 페이지 구현
**목표**: 게시판 설정 상세 조회 화면 구현 (read.png 참고)

**세부 작업**:
- [ ] 읽기 전용 상세 정보 표시
- [ ] 수정/삭제 버튼 구현  
- [ ] 목록으로 돌아가기 기능
- [ ] 정보 레이아웃 구성 (Card 컴포넌트 활용)

**파일 위치**: `/frontend/src/routes/(app)/board-manager/[boardCode]/+page.svelte`

### 5️⃣ Mock API 서비스 구현 및 라우팅 설정
**목표**: API 연동 시뮬레이션 및 전체 기능 통합

**세부 작업**:
- [ ] Mock 데이터 생성 (샘플 게시판 설정 데이터)
- [ ] API 서비스 함수 구현 (CRUD 작업)
- [ ] Y/N ↔ boolean 변환 로직 구현 (DB 호환성)
- [ ] 라우팅 구조 설정 및 네비게이션 연결
- [ ] 에러 처리 및 로딩 상태 관리
- [ ] 전체 기능 테스트 및 버그 수정

**파일 위치**:
- `/frontend/src/lib/api/boardManager.ts` (Mock API)
- `/frontend/src/lib/types/boardManager.ts` (타입 정의)

## 🛠️ 기술 요구사항

### Svelte 5 Runes 문법 준수
- `$state`, `$derived`, `$effect` 사용
- `$props()` 문법으로 Props 정의
- `onclick` 이벤트 핸들러 사용

### shadcn-svelte 컴포넌트 활용
- **Table**: 게시판 목록 표시
- **Button**: 액션 버튼 (검색, 만들기, 수정, 삭제)
- **Input**: 검색어 입력, 폼 필드
- **Select**: 검색 조건 드롭다운
- **Card**: 상세 정보 표시
- **RadioGroup**: 설정 옵션 선택
- **Pagination**: 페이지 네비게이션

### 접근성 가이드라인
- 모든 폼 요소에 적절한 label 연결
- 키보드 네비게이션 지원
- ARIA 속성 적용
- 색상 대비 준수

## 📁 예상 파일 구조
```
frontend/src/routes/(app)/board-manager/
├── +page.svelte                    # 목록 페이지
├── create/
│   └── +page.svelte               # 생성 페이지  
└── [boardCode]/
    ├── +page.svelte               # 상세 조회 페이지
    └── edit/
        └── +page.svelte           # 수정 페이지

frontend/src/lib/
├── types/
│   └── boardManager.ts            # 타입 정의
└── api/
    └── boardManager.ts            # Mock API 서비스
```

## ✅ 완료 기준
- [ ] 모든 화면이 제공된 디자인과 일치
- [ ] CRUD 기능이 정상 동작 (Mock API)
- [ ] 검색 및 페이지네이션 기능 동작
- [ ] TypeScript 오류 없음
- [ ] 접근성 가이드라인 준수
- [ ] 반응형 레이아웃 지원
- [ ] Svelte 5 문법 완전 준수

## 🚀 다음 단계
게시판 관리 모듈 완료 후:
1. 게시글 관리 모듈 개발
2. 실제 백엔드 API 연동
3. 파일 업로드 기능 구현
4. 권한 관리 시스템 연동