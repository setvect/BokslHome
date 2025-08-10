# 복슬홈피 프론트엔드 마이그레이션 가이드

## 1. 현재 메뉴 구조

### 1.1. 사이드바 메뉴
```
복슬이네 (브랜드명)
├── 게시판
│   ├── 게시판 관리 (/board/manager)
│   ├── 글 (/board/article)
│   ├── 책 (미구현)
│   ├── 음악 (미구현)
│   ├── 영화 (미구현)
│   ├── 사진 (미구현)
│   ├── 기억 (미구현)
│   ├── 인연 (미구현)
│   ├── 잡담 (미구현)
│   ├── 꿈 (미구현)
│   ├── 기술사 (미구현)
│   ├── 소설 (미구현)
│   └── 운동 (미구현)
├── 지식 (/settings)
├── 노트 (미구현)
├── 메모 (미구현)
├── 관계 (미구현)
└── 이것저것
    └── 로또 (/playground/stacked)
```

### 1.2. 상단 네비게이션
- 브랜드 로고: 발톱 아이콘 (Font Awesome)
- 브랜드명: "복슬이네"
- 다크모드 토글 버튼
- 모바일 햄버거 메뉴

## 2. 현재 라우팅 구조

### 2.1. 메인 레이아웃 `(layout)`
```
/                          # 홈페이지
/board/
├── article/               # 게시글 목록
│   └── write/            # 게시글 작성
└── manager/              # 게시판 관리
    ├── edit/             # 게시판 편집
    ├── read/             # 게시판 상세
    └── write/            # 게시판 생성
```

### 2.2. 기타 레이아웃
- `(no-layout)/blank/` - 빈 레이아웃 페이지
- `markdown/test/` - 마크다운 테스트 페이지

## 3. 현재 사용 라이브러리

### 3.1. 프레임워크 & 빌드 도구
- **SvelteKit 2.20.2** - 메인 프레임워크
- **Svelte 5.0.0** - 최신 Svelte (Runes 문법 사용)
- **Vite 6.2.2** - 빌드 도구
- **TypeScript** - 타입 시스템

### 3.2. UI 라이브러리
- **Flowbite Svelte 0.47.4** - 메인 UI 컴포넌트 라이브러리
- **Flowbite 2.5.2** - CSS 프레임워크
- **Flowbite Svelte Icons 2.0.2** - 아이콘
- **TailwindCSS 3.4.17** - CSS 프레임워크

### 3.3. 아이콘 라이브러리
- **Font Awesome 6.7.2** - 메인 아이콘 (발톱 아이콘 등)
- **Lucide Svelte 0.462.0** - 추가 아이콘
- **Svelte Heros v2 2.0.1** - Hero Icons

### 3.4. 에디터 & 마크다운
- **CodeMirror 6.x** - 코드 에디터
- **Quill 2.0.3** - 리치 텍스트 에디터
- **EasyMDE 2.20.0** - 마크다운 에디터
- **Marked 15.0.11** - 마크다운 파서
- **Turndown 7.2.0** - HTML → 마크다운 변환

### 3.5. 폼 & 검증
- **Felte** - 폼 관리
- **Zod 3.24.1** - 스키마 검증

### 3.6. 유틸리티
- **Axios 1.7.8** - HTTP 클라이언트
- **DayJS 1.11.13** - 날짜 처리
- **Lodash-ES 4.17.21** - 유틸리티
- **SweetAlert2 11.22.0** - 알림/모달

## 4. 주요 컴포넌트 구조

### 4.1. 레이아웃 컴포넌트
- `Navbar.svelte` - 상단 네비게이션
- `Sidebar.svelte` - 사이드바 메뉴
- `Footer.svelte` - 하단
- `+layout.svelte` - 메인 레이아웃

### 4.2. 게시판 컴포넌트
```
board/
├── article/
│   ├── BoardArticleList.svelte    # 게시글 목록
│   └── BoardArticleWrite.svelte   # 게시글 작성
└── manager/
    ├── BoardManagerEdit.svelte    # 게시판 편집
    ├── BoardManagerList.svelte    # 게시판 목록
    ├── BoardManagerRead.svelte    # 게시판 상세
    └── BoardManagerWrite.svelte   # 게시판 생성
```

### 4.3. 에디터 컴포넌트
- `MarkdownEditor.svelte` - 마크다운 에디터
- `MarkdownPreview.svelte` - 마크다운 미리보기
- `QuillEditor.svelte` - 리치 텍스트 에디터

## 5. 스타일링 설정

### 5.1. 색상 테마
- **기본 폰트**: Pretendard Variable
- **다크모드**: selector 방식
- **주요 색상**: Blue 계열 (링크, 버튼)

### 5.2. 커스텀 스타일
- 스크롤바 커스터마이징 (6px 너비)
- SweetAlert2 다크모드 지원
- 에디터 버튼 활성 상태 스타일
- 폼 요소 포커스 스타일 (그레이 계열)

## 6. API 구조

### 6.1. 기본 설정
- **Base URL**: 환경변수 `VITE_API_BASE_URL`
- **Timeout**: 10초
- **헤더**: `application/json`

### 6.2. 백엔드 REST API 엔드포인트

#### 게시판 관련
- `POST /api/board/manager` - 게시판 생성
- `PUT /api/board/manager/{seq}` - 게시판 수정
- `DELETE /api/board/manager/{seq}` - 게시판 삭제
- `GET /api/board/manager/{seq}` - 게시판 상세
- `GET /api/board/manager/page` - 게시판 목록

- `POST /api/board/article` - 게시글 생성
- `PUT /api/board/article/{seq}` - 게시글 수정
- `DELETE /api/board/article/{seq}` - 게시글 삭제
- `GET /api/board/article/{seq}` - 게시글 상세
- `GET /api/board/article/page` - 게시글 목록

#### 지식 관리
- `POST /api/knowledge` - 지식 생성
- `PUT /api/knowledge/{knowledgeSeq}` - 지식 수정
- `DELETE /api/knowledge/{knowledgeSeq}` - 지식 삭제
- `GET /api/knowledge/{knowledgeSeq}` - 지식 상세
- `GET /api/knowledge/page` - 지식 목록 (classifyC, content 검색)

#### 노트 관리
- `POST /api/note` - 노트 생성 (첨부파일 지원)
- `PUT /api/note/{noteSeq}` - 노트 수정
- `DELETE /api/note/{noteSeq}` - 노트 삭제
- `GET /api/note/{noteSeq}` - 노트 상세
- `GET /api/note/page` - 노트 목록

#### 노트 카테고리
- `POST /api/note/category` - 카테고리 생성
- `PUT /api/note/category/{categorySeq}` - 카테고리 수정
- `DELETE /api/note/category/{categorySeq}` - 카테고리 삭제
- `GET /api/note/category/{categorySeq}` - 카테고리 상세
- `GET /api/note/category/page` - 카테고리 목록

#### 메모 관리
- `POST /api/memo` - 메모 생성
- `PUT /api/memo/{memoSeq}` - 메모 수정
- `DELETE /api/memo/{memoSeq}` - 메모 삭제
- `GET /api/memo/{memoSeq}` - 메모 상세
- `GET /api/memo/page` - 메모 목록

#### 메모 카테고리
- `POST /api/memo/category` - 카테고리 생성
- `PUT /api/memo/category/{categorySeq}` - 카테고리 수정
- `DELETE /api/memo/category/{categorySeq}` - 카테고리 삭제
- `GET /api/memo/category/{categorySeq}` - 카테고리 상세
- `GET /api/memo/category/page` - 카테고리 목록

#### 관계 관리 (Network)
- `POST /api/network` - 관계 생성
- `PUT /api/network/{networkSeq}` - 관계 수정
- `DELETE /api/network/{networkSeq}` - 관계 삭제
- `GET /api/network/{networkSeq}` - 관계 상세
- `GET /api/network/page` - 관계 목록 (title 검색)

#### 댓글 관리
- `POST /api/comment` - 댓글 생성
- `PUT /api/comment/{commentSeq}` - 댓글 수정
- `DELETE /api/comment/{commentSeq}` - 댓글 삭제
- `GET /api/comment/{commentSeq}` - 댓글 상세
- `GET /api/comment/page` - 댓글 목록

#### 코드 관리
- `POST /api/code` - 코드 생성
- `PUT /api/code/{codeSeq}` - 코드 수정
- `DELETE /api/code/{codeSeq}` - 코드 삭제
- `GET /api/code/{codeSeq}` - 코드 상세
- `GET /api/code/page` - 코드 목록 (majorCode 검색)
- `GET /api/code/majorCode` - 주요 코드 그룹 목록

### 6.3. 프론트엔드 API 모듈
- `board/boardManage.ts` - 게시판 관리 API
- `user/` - 사용자 관련 API (폴더만 존재)

## 7. 상태 관리

### 7.1. 테마 스토어
- `themeStore.ts` - 다크모드 상태 관리
- localStorage 연동
- MutationObserver를 통한 DOM 변경 감지

## 8. 유틸리티 함수

### 8.1. 알림 관리 (`alertUtils.ts`)
- `showConfirmAlert()` - 확인/취소 모달
- `showSuccessAlert()` - 성공 알림
- `showErrorAlert()` - 에러 알림  
- `showInfoAlert()` - 정보 알림
- 모든 알림에 다크모드 스타일 적용

### 8.2. 폼 관리 (`formUtils.ts`)
- `useForm()` - Felte + Zod 기반 폼 관리
- 실시간 검증 지원
- 에러 핸들링 내장
- 필드별 개별 관리 함수 제공

### 8.3. 마크다운 관리 (`markdown.ts`)
- 마크다운 파싱 및 렌더링 로직

## 9. 개발 환경 설정

### 9.1. 빌드 도구
- **어댑터**: `@sveltejs/adapter-auto` (배포용)
- **프리프로세서**: vitePreprocess
- **별칭**: `$lib` → `./src/lib`

### 9.2. 개발 스크립트
```json
{
  "dev": "vite dev",
  "build": "vite build", 
  "preview": "vite preview",
  "start": "node build/index.js"
}
```

## 10. 마이그레이션 시 고려사항

### 10.1. 꼭 보존해야 할 기능
1. **메뉴 구조** - 현재 계층적 메뉴 구조
2. **다크모드** - 완전히 구현된 다크모드 토글
3. **게시판 시스템** - 게시판 관리 + 게시글 작성/편집
4. **마크다운 지원** - 다양한 에디터 지원
5. **반응형 디자인** - 모바일/데스크톱 지원

### 10.2. 개선 가능한 부분
1. **미구현 메뉴들** - 책, 음악, 영화 등 빈 링크들
2. **API 모듈화** - 더 체계적인 API 구조
3. **컴포넌트 재사용성** - 공통 컴포넌트 추출
4. **상태 관리** - 전역 상태 관리 도구 고려

### 10.3. 라이브러리 선택 시 고려사항
- **UI 프레임워크**: Flowbite-Svelte는 잘 구성되어 있음
- **상태 관리**: 현재는 Svelte Store만 사용, 복잡도에 따라 Pinia/Zustand 고려
- **에디터**: 3개의 에디터가 있는데 통합 고려 필요
- **아이콘**: 3개 라이브러리 사용 중, 통합 고려

## 11. 백엔드 연동 정보

### 11.1. 주요 엔드포인트 (추정)
- 게시판 관리: `/api/board/manager`
- 게시글: `/api/board/article`
- 사용자: `/api/user`
- 지식: `/api/knowledge`
- 노트: `/api/note`
- 메모: `/api/memo`
- 관계: `/api/network`

## 12. 프로젝트 특징

### 12.1. 한국어 중심
- 모든 메뉴와 UI가 한국어
- 한국 폰트 사용 (Pretendard)

### 12.2. 개인 홈페이지 성격
- 다양한 개인 활동 관리 (게시판, 메모, 노트 등)
- 로또 번호 생성 같은 유틸리티 기능

## 13. 추가로 저장할 중요한 정보

### 13.1. 환경 설정 파일
```bash
# .env 또는 환경변수
VITE_API_BASE_URL=http://localhost:8080
```

### 13.2. 디자인 시스템 정보
- **색상 팔레트**: Tailwind 기본 색상 + Blue 계열 강조
- **간격**: Tailwind 표준 간격 체계
- **Typography**: Pretendard Variable 폰트
- **레이아웃**: 64px 사이드바, 70px 상단바

### 13.3. 접근성 고려사항
- 다크모드 완전 지원
- 키보드 네비게이션
- 스크린리더 지원 (`sr-only` 클래스 사용)
- 모바일 반응형 (햄버거 메뉴)

### 13.4. 성능 최적화 요소
- Vite 번들링
- 코드 스플리팅 (SvelteKit 기본)
- 이미지 최적화 필요시 고려

### 13.5. 보안 관련
- CSRF 보호 (Spring Security)
- JWT 토큰 기반 인증 (백엔드)
- XSS 방지를 위한 입력 검증

### 13.6. 폴더 구조 규칙
```
src/
├── api/           # API 클라이언트 코드
├── lib/           # 재사용 가능한 라이브러리
│   ├── components/  # 공통 컴포넌트
│   ├── stores/      # 상태 관리
│   ├── utils/       # 유틸리티 함수
│   └── styles/      # 스타일 관련
├── routes/        # 페이지 라우팅
│   ├── (layout)/    # 기본 레이아웃
│   ├── (no-layout)/ # 레이아웃 없는 페이지
│   └── utils/       # 유틸리티 페이지
└── types/         # TypeScript 타입 정의
```

### 13.7. 에디터 기능 상세
- **Quill**: 리치 텍스트 편집
- **EasyMDE**: 마크다운 편집 (WYSIWYG)
- **CodeMirror**: 코드 편집 (Java, JS, Python, SQL, Markdown 지원)
- **문법 하이라이팅**: highlight.js 사용

### 13.8. 마이그레이션 시 체크리스트
- [ ] 메뉴 구조 재구현
- [ ] 다크모드 토글 기능
- [ ] 게시판 CRUD 기능
- [ ] 파일 첨부 기능
- [ ] 마크다운 에디터
- [ ] 반응형 레이아웃
- [ ] 알림 시스템 (SweetAlert2)
- [ ] 폼 검증 시스템
- [ ] API 클라이언트 설정
- [ ] 상태 관리 시스템
- [ ] 한국어 UI/UX
