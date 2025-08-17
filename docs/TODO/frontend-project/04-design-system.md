# 4단계: 디자인 시스템 + 폼 및 상호작용 (Design System & Forms)

## 목표
- 체계적인 디자인 시스템 구축 (색상, 타이포그래피, 스페이싱)
- Superforms + Zod + Formsnap v2 폼 시스템 통합
- 유효성 검사 패턴 확립
- 컴포넌트 문서화 페이지 구축
- 고급 UI 상호작용 처리

## 할일 목록

### 4.1 디자인 시스템 기반 구조 설정
- [ ] `src/routes/(design)/` 그룹 라우팅 생성
- [ ] 그룹 라우팅 구조:
  ```
  src/routes/
  ├── (app)/                    # 메인 앱 (헤더 + 앱 사이드바)
  │   ├── +layout.svelte
  │   ├── +page.svelte          # 홈 (/)
  │   └── about/+page.svelte    # 소개 (/about)
  └── (design)/                 # 디자인 시스템 (헤더 + 디자인 사이드바)
      ├── +layout.svelte
      └── design-system/
          ├── +page.svelte              # 디자인 시스템 홈 (/design-system)
          ├── colors/+page.svelte       # 색상 시스템
          ├── typography/+page.svelte   # 타이포그래피
          ├── spacing/+page.svelte      # 스페이싱
          └── components/
              ├── +page.svelte          # 컴포넌트 목록
              ├── buttons/+page.svelte  # 버튼 컴포넌트
              ├── forms/+page.svelte    # 폼 컴포넌트
              └── ...                   # 기타 컴포넌트들
  ```

### 4.2 색상 시스템 구축
- [ ] `src/app.css`에 완전한 테마 변수 정의
- [ ] CSS 변수 기반 색상 팔레트:
  - [ ] Primary/Secondary 색상
  - [ ] Background/Foreground 색상
  - [ ] Muted/Accent 색상
  - [ ] Destructive/Success 색상
  - [ ] Border/Input 색상
- [ ] 라이트/다크 모드 대응 색상값
- [ ] `/design-system/colors` 페이지에서 색상 미리보기

### 4.3 타이포그래피 시스템
- [ ] Tailwind CSS 폰트 크기 커스터마이징
- [ ] 텍스트 계층 구조 정의:
  - [ ] Heading (h1-h6)
  - [ ] Body text (large, default, small)
  - [ ] Caption/Label
- [ ] 행간(line-height) 및 자간(letter-spacing) 설정
- [ ] `/design-system/typography` 페이지에서 타이포그래피 예시

### 4.4 스페이싱 시스템
- [ ] Tailwind spacing 스케일 커스터마이징
- [ ] 컴포넌트별 표준 여백 정의
- [ ] 레이아웃 그리드 시스템
- [ ] `/design-system/spacing` 페이지에서 스페이싱 가이드

### 4.5 폼 시스템 통합 (Superforms + Zod + Formsnap v2)
- [ ] 필요 패키지 설치:
  ```bash
  npm install sveltekit-superforms zod formsnap
  ```
- [ ] 기본 폼 스키마 예시 작성 (`src/lib/schemas/`)
- [ ] Formsnap v2 + Svelte 5 패턴 확립
- [ ] 표준 폼 컴포넌트 생성:
  - [ ] FormField 래퍼
  - [ ] FormError 표시
  - [ ] FormLabel 컴포넌트

### 4.6 유효성 검사 패턴 확립
- [ ] Zod 스키마 작성 패턴 정의
- [ ] 에러 메시지 우선순위 로직
- [ ] 실시간 검증 vs 제출 시 검증
- [ ] 다국어 에러 메시지 구조 (한국어)
- [ ] 복합 검증 (비밀번호 확인 등) 패턴

### 4.7 고급 폼 컴포넌트 구현
- [ ] 로그인/회원가입 폼 예시
- [ ] 다중 단계 폼 (Step Form) 패턴
- [ ] 파일 업로드 컴포넌트
- [ ] 동적 폼 필드 추가/제거
- [ ] 폼 상태 관리 (로딩, 성공, 실패)

### 4.8 상호작용 컴포넌트 구현
- [ ] Toast 알림 시스템 (Sonner) 통합
- [ ] Modal/Dialog 표준 패턴
- [ ] Tooltip 및 Popover 사용 패턴
- [ ] 드롭다운 메뉴 및 Select 컴포넌트
- [ ] 테이블 정렬/필터링 기능

### 4.9 컴포넌트 문서화 시스템
- [ ] `/design-system/components` 메인 페이지
- [ ] 각 컴포넌트별 문서 페이지:
  - [ ] 사용법 예시 코드
  - [ ] Props 설명
  - [ ] Variant 모음
  - [ ] 실제 동작 데모
- [ ] 코드 복사 기능
- [ ] 컴포넌트 검색 기능

### 4.10 디자인 시스템 레이아웃
- [ ] `src/routes/(design)/+layout.svelte` 생성
- [ ] 헤더 컴포넌트 재사용 (기존 Header.svelte)
- [ ] 디자인 시스템 전용 사이드바 컴포넌트 생성:
  - [ ] `src/lib/components/layout/DesignSystemSidebar.svelte` 생성
  - [ ] 기존 Sidebar.svelte와 동일한 스타일/구조, 메뉴만 다르게 구성
  - [ ] 디자인 토큰 섹션 (색상, 타이포그래피, 스페이싱)
  - [ ] 컴포넌트 섹션 (카테고리별 정리)
  - [ ] 패턴 섹션 (폼, 상호작용)
- [ ] 레이아웃 상태 관리 연결 (사이드바 토글, 테마)

### 4.11 반응형 컴포넌트 패턴
- [ ] 모바일 우선 컴포넌트 설계
- [ ] 브레이크포인트별 컴포넌트 변화
- [ ] 터치 친화적 인터랙션 크기
- [ ] 데스크톱/모바일 다른 컴포넌트 변형

### 4.12 코드 품질 및 표준화
- [ ] 컴포넌트 네이밍 컨벤션 정의
- [ ] Props 타입 표준화
- [ ] 컴포넌트 재사용성 가이드라인
- [ ] TypeScript 오류 해결
- [ ] ESLint 경고 해결 (접근성 제외)

---

## 사용자 확인 필요 항목

다음 항목들은 실제 브라우저에서 시각적/기능적 확인이 필요하여 사용자가 직접 테스트해야 합니다:

### 개발 서버 및 빌드 테스트
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] 개발 서버 콘솔 오류 없음 확인

### 디자인 시스템 시각적 확인
- [ ] 색상 팔레트가 라이트/다크 모드에서 올바르게 표시되는지 확인
- [ ] 타이포그래피 계층이 명확히 구분되는지 확인
- [ ] 스페이싱이 일관성 있게 적용되는지 확인
- [ ] 컴포넌트들이 통일된 디자인 언어를 따르는지 확인

### 폼 기능 테스트
- [ ] 폼 유효성 검사가 실시간으로 작동하는지 확인
- [ ] 에러 메시지가 적절히 표시되는지 확인
- [ ] 폼 제출 시 로딩 상태 표시 확인
- [ ] 성공/실패 Toast 알림 표시 확인

### 상호작용 컴포넌트 테스트
- [ ] Modal/Dialog 열기/닫기 정상 작동 확인
- [ ] Tooltip/Popover 위치 및 표시 확인
- [ ] 드롭다운 메뉴 선택 기능 확인
- [ ] 테이블 정렬/필터 기능 확인

### 반응형 동작 테스트
- [ ] 모바일에서 폼 컴포넌트 크기 적절성 확인
- [ ] 태블릿에서 디자인 시스템 페이지 레이아웃 확인
- [ ] 데스크톱에서 컴포넌트 문서 가독성 확인
- [ ] 터치 기기에서 인터랙티브 요소 크기 확인

### 문서화 시스템 테스트
- [ ] 컴포넌트 예시 코드가 올바르게 표시되는지 확인
- [ ] 코드 복사 기능 작동 확인
- [ ] 컴포넌트 검색 기능 확인
- [ ] 디자인 시스템 네비게이션 편의성 확인

## 4단계 완료 기준
- [ ] 모든 작업 항목 완료
- [ ] 모든 사용자 확인 항목 통과
- [ ] TypeScript 오류 0개
- [ ] ESLint 경고 0개 (접근성 경고 제외)
- [ ] 완전한 디자인 시스템 문서화 완료
- [ ] 폼 시스템 정상 작동
- [ ] 모든 UI 컴포넌트 문서 및 예시 완료
- [ ] 반응형 동작 정상 작동