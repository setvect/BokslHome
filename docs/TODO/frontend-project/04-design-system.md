# 4단계: 디자인 시스템 + 폼 및 상호작용 (Design System & Forms)

## 목표
- 체계적인 디자인 시스템 구축 (색상, 타이포그래피, 스페이싱)
- Superforms + Zod + Formsnap v2 폼 시스템 통합
- 유효성 검사 패턴 확립
- 컴포넌트 문서화 페이지 구축
- 고급 UI 상호작용 처리 및 반응형 설계

## 4.1 디자인 시스템 기반 구조 설정
- [x] `src/routes/(design)/` 그룹 라우팅 생성
- [x] 그룹 라우팅 구조:
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
- [x] `src/routes/(design)/+layout.svelte` 생성 (디자인 시스템 전용 레이아웃)
- [x] 헤더 컴포넌트 재사용 (기존 `Header.svelte`)
- [x] 사이드바 컴포넌트 생성: `src/lib/components/layout/DesignSystemSidebar.svelte`
  - [x] 기존 Sidebar 스타일 재사용, 메뉴는 다르게 구성
  - [x] 디자인 토큰 섹션 (색상, 타이포, 스페이싱)
  - [x] 컴포넌트 섹션 (카테고리별)
  - [x] 패턴 섹션 (폼, 상호작용)
- [x] 레이아웃 상태 관리 연결 (사이드바 토글, 테마)

## 4.2 디자인 토큰
- [x] 색상 시스템
  - [x] `src/app.css`에 CSS 변수 기반 팔레트 정의
  - [x] Primary/Secondary, Background/Foreground, Muted/Accent, Destructive/Success, Border/Input 색상
  - [x] 라이트/다크 모드 대응
  - [x] `/design-system/colors` 페이지에서 색상 미리보기
- [x] 타이포그래피 시스템 (기본)
  - [x] Tailwind 폰트 크기 커스터마이징
  - [x] Heading(h1–h4), Body/Label 정의 (h5–h6는 이후 확장)
  - [x] 행간(line-height), 자간(letter-spacing) 샘플 추가
  - [x] `/design-system/typography` 페이지에서 예시 확인
- [x] 스페이싱 시스템 (기본)
  - [x] Tailwind spacing scale 일부 커스터마이징
  - [x] 컴포넌트별 표준 여백 정의
  - [x] 레이아웃 그리드 미니 가이드
  - [x] `/design-system/spacing` 페이지에서 가이드 확인

## 4.3 컴포넌트 문서화 시스템
- [x] `/design-system/components` 메인 페이지
- [x] 각 컴포넌트별 문서 페이지 (초기)
  - [x] 사용법 예시 코드 (버튼, 폼 필드)
  - [x] Props 설명 (버튼, FormField)
  - [x] Variant 모음 (버튼)
  - [x] 실제 동작 데모 (버튼)
  - [x] 코드 복사 기능 (공용 `CodeBlock`)
- [x] 컴포넌트 검색 기능

## 4.4 폼 시스템 (기본) — CSR 기반 유효성 검증
- [x] 필요 패키지 설치:
  ```bash
  npm install zod
  ```
- [x] 기본 폼 스키마 작성 (페이지 인라인 스키마)
- [x] 표준 폼 컴포넌트 생성 (경량, 컨텍스트 비의존)
  - [x] FormField 래퍼
  - [x] FormLabel (FormField 내 라벨 처리)
  - [x] FormError 표시 (FormField 내 에러 처리)
- [x] 유효성 검사 패턴 확립 (CSR)
  - [x] Zod 스키마 작성 패턴 정의
  - [x] 에러 메시지 우선순위 로직 (필드당 첫 메시지 고정)
  - [x] 실시간 검증 vs 제출 시 검증 (입력 시 재검증 + 제출 후 표시)
  - [x] 복합 검증 패턴 (비밀번호 확인)

### 폼 구현 비교 (디자인 시스템)

| 항목           | Form 컴포넌트 사용 (`/design-system/components/forms`)             | Raw 마크업 (`/design-system/components/forms-raw`)                         |
| -------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| 구성 방식      | 경량 `FormField` 래퍼 사용(라벨·에러 포함)                         | 순수 `label + input` + 조건부 `<p>`                                        |
| 검증 방식      | zod 기반 CSR 검증(동일)                                            | zod 기반 CSR 검증(동일)                                                    |
| 에러 표시      | `error` prop로 전달해 내부에서 렌더                                | 제출/입력 조건에 따라 조건부 렌더                                          |
| 접근성(ARIA)   | 라벨/`aria-invalid` 패턴 일관화 용이                               | 수동으로 속성 부여 필요                                                    |
| 마크업 양      | 더 적음(반복 제거)                                                 | 다소 많음(필드마다 라벨/에러 반복)                                         |
| 재사용성       | 높음(스타일/패턴 캡슐화)                                           | 페이지 한정, 복사-붙여넣기 위주                                            |
| 러닝 커브/의존 | 컴포넌트 API 숙지 필요, 의존성 낮음                                | 추가 추상화 없음, 즉시 사용                                                |
| 데모 라우트    | [/design-system/components/forms](/design-system/components/forms) | [/design-system/components/forms-raw](/design-system/components/forms-raw) |

## 4.5 폼 시스템 (고급)
- [x] 로그인/회원가입 폼 예시
- [x] 다중 단계 폼 (Step Form) 패턴
- [x] 파일 업로드 컴포넌트
- [x] 동적 폼 필드 추가/제거
- [x] 폼 상태 관리 (로딩, 성공, 실패)

## 4.6 상호작용 컴포넌트
- [x] Toast 알림 시스템 (Sonner) 통합
- [x] Modal/Dialog 표준 패턴
- [x] Tooltip 및 Popover 사용 패턴
- [x] 드롭다운 메뉴 및 Select 컴포넌트 (단일 선택)
- [x] 테이블 샘플 (정렬/필터 확장 전 베이스)

## 4.7 반응형 컴포넌트 패턴
- [x] 모바일 우선 컴포넌트 설계
- [x] 브레이크포인트별 컴포넌트 변화
- [x] 터치 친화적 인터랙션 크기
- [x] 데스크톱/모바일 다른 컴포넌트 변형

## 4.8 코드 품질 및 표준화
- [ ] 컴포넌트 네이밍 컨벤션 정의
- [ ] Props 타입 표준화
- [ ] 컴포넌트 재사용성 가이드라인
- [ ] TypeScript 오류 해결
- [ ] ESLint 경고 해결 (접근성 제외)

## 사용자 확인 필요 항목

### 개발 서버 및 빌드 테스트
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] 개발 서버 콘솔 오류 없음 확인

### 디자인 시스템 시각적 확인
- [ ] 색상 팔레트 라이트/다크 모드 확인
- [ ] 타이포그래피 계층 구분 확인
- [ ] 스페이싱 일관성 확인
- [ ] 컴포넌트 디자인 언어 일치 확인

### 폼 기능 테스트
- [ ] 폼 유효성 검사 실시간 동작 확인
- [ ] 에러 메시지 표시 확인
- [ ] 제출 시 로딩 상태 확인
- [ ] 성공/실패 Toast 알림 확인

### 상호작용 컴포넌트 테스트
- [ ] Modal/Dialog 열기/닫기 정상 작동
- [ ] Tooltip/Popover 위치/표시 정상 작동
- [ ] 드롭다운 메뉴 선택 기능 확인
- [ ] 테이블 정렬/필터 기능 확인

### 반응형 동작 테스트
- [ ] 모바일에서 폼 컴포넌트 크기 적절성 확인
- [ ] 태블릿 레이아웃 확인
- [ ] 데스크톱 컴포넌트 가독성 확인
- [ ] 터치 기기 인터랙션 크기 확인

### 문서화 시스템 테스트
- [ ] 컴포넌트 예시 코드 표시 확인
- [ ] 코드 복사 기능 확인
- [ ] 검색 기능 확인
- [ ] 네비게이션 편의성 확인

## 완료 기준
- [ ] 모든 작업 항목 완료
- [ ] 모든 사용자 확인 항목 통과
- [ ] TypeScript 오류 0개
- [ ] ESLint 경고 0개 (접근성 제외)
- [ ] 디자인 시스템 문서화 100% 완료
- [ ] 폼 시스템 정상 작동
- [ ] 모든 UI 컴포넌트 문서 및 예시 완료
- [ ] 반응형 동작 정상 작동
