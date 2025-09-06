# 4단계: 디자인 시스템 + 폼 및 상호작용 (Design System & Forms)

## 목표
- 체계적인 디자인 시스템 구축 (색상, 타이포그래피, 스페이싱)
- React Hook Form + Zod 폼 시스템 통합
- 유효성 검사 패턴 확립
- 컴포넌트 문서화 페이지 구축
- 고급 UI 상호작용 처리 및 반응형 설계

## 4.1 디자인 시스템 기반 구조 설정
- [ ] `src/app/(design)/` 그룹 라우팅 생성
- [ ] 그룹 라우팅 구조:
  ```
  src/app/
  ├── (app)/                    # 메인 앱 (헤더 + 앱 사이드바)
  │   ├── layout.tsx
  │   ├── page.tsx              # 홈 (/)
  │   └── about/page.tsx        # 소개 (/about)
  └── (design)/                 # 디자인 시스템 (헤더 + 디자인 사이드바)
      ├── layout.tsx
      └── design-system/
          ├── page.tsx                  # 디자인 시스템 홈 (/design-system)
          ├── colors/page.tsx           # 색상 시스템
          ├── typography/page.tsx       # 타이포그래피
          ├── spacing/page.tsx          # 스페이싱
          └── components/
              ├── page.tsx              # 컴포넌트 목록
              ├── buttons/page.tsx      # 버튼 컴포넌트
              ├── forms/page.tsx        # 폼 컴포넌트
              └── ...                   # 기타 컴포넌트들
  ```
- [ ] `src/app/(design)/layout.tsx` 생성 (디자인 시스템 전용 레이아웃)
- [ ] 헤더 컴포넌트 재사용 (기존 `Header` 컴포넌트)
- [ ] 사이드바 컴포넌트 생성: `src/components/layout/design-system-sidebar.tsx`
  - [ ] 기존 Sidebar 스타일 재사용, 메뉴는 다르게 구성
  - [ ] 디자인 토큰 섹션 (색상, 타이포, 스페이싱)
  - [ ] 컴포넌트 섹션 (카테고리별)
  - [ ] 패턴 섹션 (폼, 상호작용)

## 4.2 디자인 토큰
- [ ] 색상 시스템
  - [ ] `src/app/globals.css`에 CSS 변수 기반 팔레트 정의
  - [ ] Primary/Secondary, Background/Foreground, Muted/Accent, Destructive/Success, Border/Input 색상
  - [ ] 라이트/다크 모드 대응
  - [ ] `/design-system/colors` 페이지에서 색상 미리보기
- [ ] 타이포그래피 시스템
  - [ ] Tailwind 폰트 크기 커스터마이징
  - [ ] Heading(h1–h4), Body/Label 정의
  - [ ] 행간(line-height), 자간(letter-spacing) 정의
  - [ ] `/design-system/typography` 페이지에서 예시 확인
- [ ] 스페이싱 시스템
  - [ ] Tailwind spacing scale 커스터마이징
  - [ ] 컴포넌트별 표준 여백 정의
  - [ ] 레이아웃 그리드 가이드
  - [ ] `/design-system/spacing` 페이지에서 가이드 확인

## 4.3 컴포넌트 문서화 시스템
- [ ] `/design-system/components` 메인 페이지
- [ ] 각 컴포넌트별 문서 페이지
  - [ ] 사용법 예시 코드
  - [ ] Props 설명
  - [ ] Variant 모음
  - [ ] 실제 동작 데모
  - [ ] 코드 복사 기능
- [ ] 컴포넌트 검색 기능
- [ ] 공용 `CodeBlock` 컴포넌트 생성

## 4.4 폼 시스템 (기본) — React Hook Form + Zod
- [ ] 필요 패키지 설치:
  ```bash
  npm install react-hook-form @hookform/resolvers zod
  npm install -D @types/react-hook-form
  ```
- [ ] 기본 폼 스키마 작성 (`src/lib/schemas/form-schemas.ts`)
- [ ] loginSchema 등 기본 스키마 정의
- [ ] Zod 타입 추론 활용
- [ ] 표준 폼 컴포넌트 생성 (`src/components/ui/form-field.tsx`)
- [ ] FormFieldProps 인터페이스 정의
- [ ] Label, children, error 렇더링 여역 구성
- [ ] 에러 메시지 스타일링 적용
- [ ] 유효성 검사 패턴 확립
  - [ ] Zod 스키마 작성 패턴 정의
  - [ ] 에러 메시지 표준화
  - [ ] 실시간 검증 vs 제출 시 검증
  - [ ] 복합 검증 패턴 (비밀번호 확인)

## 4.5 폼 시스템 (고급)
- [ ] 로그인/회원가입 폼 예시 구현
- [ ] useForm 훅 및 zodResolver 사용
- [ ] 에러 상태에 따른 border 스타일링
- [ ] isSubmitting 상태에 따른 버튼 비활성화
- [ ] 폼 제출 처리 로직 구현
- [ ] 다중 단계 폼 (Step Form) 패턴
- [ ] 파일 업로드 컴포넌트
- [ ] 동적 폼 필드 추가/제거
- [ ] 폼 상태 관리 (로딩, 성공, 실패)

## 4.6 상호작용 컴포넌트
- [ ] Toast 알림 시스템 통합
- [ ] sonner 또는 shadcn/ui toast 설치
- [ ] ToastProvider 설정 및 루트 레이아웃에 적용
- [ ] Modal/Dialog 표준 패턴
- [ ] Tooltip 및 Popover 사용 패턴
- [ ] 드롭다운 메뉴 및 Select 컴포넌트
- [ ] 테이블 기본 구현 (정렬/필터 확장 전 베이스)

## 4.7 반응형 컴포넌트 패턴
- [ ] 모바일 우선 컴포넌트 설계
- [ ] 브레이크포인트별 컴포넌트 변화
- [ ] 터치 친화적 인터랙션 크기
- [ ] 데스크톱/모바일 다른 컴포넌트 변형

## 4.8 코드 품질 및 표준화
- [ ] 컴포넌트 네이밍 컨벤션 정의
- [ ] Props 타입 표준화 (`src/lib/types/component-types.ts`)
- [ ] ComponentBaseProps 및 FieldBaseProps 인터페이스 정의
- [ ] 공통 속성들 표준화 (className, children, error 등)
- [ ] 컴포넌트 재사용성 가이드라인
- [ ] TypeScript 오류 해결
- [ ] ESLint 경고 해결

## 사용자 확인 필요 항목

### 개발 서버 및 빌드
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] 개발 서버 콘솔 오류 없음 확인

### 디자인 시스템 시각적 확인
- [ ] 색상 팔레트 라이트/다크 모드 확인
- [ ] 타이포그래피 계층 구분 확인
- [ ] 스페이싱 일관성 확인
- [ ] 컴포넌트 디자인 언어 일치 확인

### 폼 기능 확인
- [ ] 폼 유효성 검사 실시간 동작 확인
- [ ] 에러 메시지 표시 확인
- [ ] 제출 시 로딩 상태 확인
- [ ] 성공/실패 Toast 알림 확인

### 상호작용 컴포넌트 확인
- [ ] Modal/Dialog 열기/닫기 정상 작동
- [ ] Tooltip/Popover 위치/표시 정상 작동
- [ ] 드롭다운 메뉴 선택 기능 확인
- [ ] 테이블 정렬/필터 기능 확인

### 반응형 동작 확인
- [ ] 모바일에서 폼 컴포넌트 크기 적절성 확인
- [ ] 태블릿 레이아웃 확인
- [ ] 데스크톱 컴포넌트 가독성 확인
- [ ] 터치 기기 인터랙션 크기 확인

### 문서화 시스템 확인
- [ ] 컴포넌트 예시 코드 표시 확인
- [ ] 코드 복사 기능 확인
- [ ] 검색 기능 확인
- [ ] 네비게이션 편의성 확인

## React 특화 고려사항


### 4.9 Next.js 통합
- [ ] Server Actions 활용 (폼 제출)
- [ ] 클라이언트/서버 컴포넌트 최적화
- [ ] 메타데이터 API 활용 (문서 페이지)

## 완료 기준
- [ ] 모든 작업 항목 완료
- [ ] 모든 사용자 확인 항목 통과
- [ ] TypeScript 오류 0개
- [ ] ESLint 경고 최소화
- [ ] 디자인 시스템 문서화 100% 완료
- [ ] 폼 시스템 정상 작동
- [ ] 모든 UI 컴포넌트 문서 및 예시 완료
- [ ] 반응형 동작 정상 작동