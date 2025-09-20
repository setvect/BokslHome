## 1단계: 카테고리/라우트 기본 골격
- [x] 게시판 캡처 이미지(`temp/board/*.png`)를 기준으로 UI 스타일 가이드 초안 작성
- [x] 게시판 카테고리 메타(`BOARD_CATEGORIES`)와 목업 데이터 구조 정의
- [x] `app/(app)/board/layout.tsx`에 공통 헤더·탭을 배치하고 메인 콘텐츠 래퍼 구성
- [x] `app/(app)/board/[code]/page.tsx` 동적 라우트 생성하고 기존 개별 페이지(`app/(app)/board/*/page.tsx`) 제거

## 2단계: 목록 화면 구성
- [x] 캡처(`list.png`)와 동일한 레이아웃을 참고해 `BoardListTemplate` 뷰 구성
- [x] `BoardListFilterBar`, `BoardTable`, `PaginationNav` 등 하위 UI 컴포넌트 구현
- [x] 목업 데이터를 연결해 카테고리/페이지 전환 시 UI만으로 상태 변화를 확인

## 3단계: 상세/암호 확인 화면
- [x] 캡처(`decrypt.png`, `read.png`) 스타일을 반영한 `BoardPasswordGate`와 `BoardDetailTemplate` UI 작성
- [x] 암호 입력 성공/실패를 로컬 상태로 시뮬레이션하고 버튼/메시지 배치 확인
- [x] 상세 콘텐츠, 첨부파일, 액션 버튼이 캡처 레이아웃과 일치하도록 조정

## 4단계: 글쓰기 화면
- [x] 캡처(`write.png`) 레이아웃을 반영한 `BoardEditorTemplate`와 `BoardForm` 작성
- [x] `BoardTitleInput`, `BoardRichEditorWrapper`, `BoardAttachmentList`, `BoardPasswordField`, `BoardFormActions` 등 하위 컴포넌트 구성
- [x] 목업 데이터를 이용해 초기 값/임시 저장 흐름(프론트 전용) 검증
