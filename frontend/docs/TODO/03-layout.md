# 3단계: 기본 레이아웃 (Simple Layout)

## 목표
- 단순하고 안정적인 반응형 레이아웃 구조 구축
- 기본 헤더 + 메인 콘텐츠 구조 구현
- 복잡한 전역 상태 관리 피하고 단순한 로컬 상태부터 시작
- Next.js App Router를 활용한 레이아웃 네스팅

## 할일 목록

### 3.1 기본 레이아웃 구조 설계
- [ ] `src/components/layout/` 디렉토리 생성
- [ ] 레이아웃 컴포넌트 파일 구조 계획:
  - [ ] `header.tsx` - 상단 헤더 (모든 그룹에서 공유)
  - [ ] `sidebar.tsx` - 메인 앱용 좌측 사이드바
  - [ ] `design-system-sidebar.tsx` - 디자인 시스템용 사이드바 (4단계에서 구현)
  - [ ] `main-content.tsx` - 메인 콘텐츠 영역

### 3.2 기본 헤더 컴포넌트 구현
- [ ] `src/components/layout/header.tsx` 생성
- [ ] 헤더 기본 구조: 좌측(메뉴 버튼 + 로고), 우측(테마 토글)
- [ ] sticky 위치, backdrop-blur 효과 적용
- [ ] HeaderProps 인터페이스 정의

### 3.3 사이드바 컴포넌트 구현
- [ ] `src/components/layout/sidebar.tsx` 생성
- [ ] SidebarProps 인터페이스 정의 (isOpen, onClose)
- [ ] 모바일 오버레이 및 배경 클릭 닫기 기능
- [ ] 네비게이션 메뉴 배열 정의 (홈, 소개 등)
- [ ] usePathname으로 활성 페이지 표시
- [ ] 반응형 애니메이션 적용

### 3.4 메인 콘텐츠 컴포넌트 구현
- [ ] `src/components/layout/main-content.tsx` 생성
- [ ] MainContentProps 인터페이스 정의 (children, className)
- [ ] flex-1 레이아웃 및 overflow-auto 설정
- [ ] container 래퍼와 패딩 적용

### 3.5 루트 레이아웃 구성
- [ ] `src/app/layout.tsx` 수정
- [ ] Inter 폰트 설정 및 메타데이터 정의
- [ ] ThemeProvider 래핑
- [ ] suppressHydrationWarning 속성 추가
- [ ] lang="ko" 설정

### 3.6 앱 레이아웃 그룹 생성
- [ ] `src/app/(app)/layout.tsx` 생성
- [ ] useState로 sidebarOpen 상태 관리
- [ ] Header + Sidebar + MainContent 조합 레이아웃
- [ ] flex h-screen 전체 화면 레이아웃
- [ ] 데스크톱에서 lg:ml-64 마진 적용

### 3.7 상태 관리 (Context API 사용)
- [ ] `src/lib/contexts/layout-context.tsx` 생성 (선택사항)
- [ ] LayoutContextType 인터페이스 정의
- [ ] LayoutProvider 및 useLayout 커스텀 훅 구현
- [ ] sidebarOpen 상태 및 toggleSidebar 기능

### 3.8 기본 페이지들 생성
- [ ] `src/app/(app)/page.tsx` - 홈페이지 생성
- [ ] Card 컴포넌트로 기능 소개 섹션 구성
- [ ] 그리드 레이아웃 적용 (md:grid-cols-2, lg:grid-cols-3)
- [ ] `src/app/(app)/about/page.tsx` - 소개 페이지

### 3.9 반응형 동작 구현
- [ ] 모바일 (< 1024px): 사이드바 오버레이 모드
  - [ ] 사이드바 기본 닫힘 상태
  - [ ] 햄버거 버튼으로 토글
  - [ ] 배경 클릭 시 닫기
- [ ] 데스크톱 (≥ 1024px): 사이드바 고정 모드
  - [ ] 사이드바 기본 표시 상태
  - [ ] 메인 콘텐츠 자동 마진 조정

### 3.10 기본 로딩 상태 처리
- [ ] Suspense 경계 설정
- [ ] Loading UI 컴포넌트 생성
- [ ] 테마 로딩 상태 관리 (next-themes)

### 3.11 코드 품질 검증
- [ ] TypeScript 오류 해결
- [ ] ESLint 경고 해결
- [ ] 컴포넌트 간 Props 타입 정의

---

## 사용자 확인 필요 항목

### 개발 서버 및 빌드 테스트
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] 개발 서버 콘솔 오류 없음 확인

### 레이아웃 시각적 확인
- [ ] 헤더가 상단에 고정되어 표시되는지 확인
- [ ] 사이드바가 좌측에 적절히 배치되는지 확인
- [ ] 메인 콘텐츠가 헤더 아래, 사이드바 우측에 배치되는지 확인
- [ ] 테마 전환 시 색상이 올바르게 변경되는지 확인

### 반응형 동작 테스트
- [ ] 모바일: 사이드바가 기본적으로 숨겨져 있는지 확인
- [ ] 모바일: 햄버거 버튼 클릭 시 사이드바가 나타나는지 확인
- [ ] 모바일: 배경 클릭 시 사이드바가 닫히는지 확인
- [ ] 데스크톱: 사이드바가 기본적으로 표시되는지 확인
- [ ] 화면 크기 변경 시 부드럽게 전환되는지 확인

### 기능적 확인 항목
- [ ] 사이드바 토글 버튼 정상 작동 확인
- [ ] 테마 토글 버튼 정상 작동 확인
- [ ] 사이드바 메뉴 링크 클릭 시 페이지 이동 확인
- [ ] 활성 페이지가 사이드바에서 시각적으로 구분되는지 확인
- [ ] 모바일에서 메뉴 클릭 시 사이드바 자동 닫힘 확인

### 성능 및 사용성 테스트
- [ ] 페이지 로딩 속도 확인
- [ ] Hydration 오류 없음 확인
- [ ] 스크롤 동작 부드러움 확인
- [ ] 터치 기기에서 버튼 크기 적절함 확인

## Next.js 특화 고려사항

### 3.12 App Router 최적화
- [ ] 레이아웃 네스팅 활용
- [ ] 라우트 그룹 (`(app)`, `(design)`) 설정
- [ ] 메타데이터 API 활용

### 3.13 서버/클라이언트 컴포넌트 분리
- [ ] 서버 컴포넌트 최대 활용
- [ ] 'use client' 최소화
- [ ] 인터랙션 필요 부분만 클라이언트 컴포넌트

## 완료 기준
- [ ] 모든 작업 항목 완료
- [ ] 모든 사용자 확인 항목 통과
- [ ] TypeScript 오류 0개
- [ ] ESLint 경고 최소화
- [ ] 반응형 레이아웃 정상 동작
- [ ] 테마 전환 기능 정상 작동