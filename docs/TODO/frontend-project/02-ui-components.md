# 2단계: 기본 UI 컴포넌트 (Basic UI Components)

## 목표
- shadcn-svelte 설치 및 기본 컴포넌트 구축
- 테마 시스템 (라이트/다크 모드) 구축
- 핵심 UI 컴포넌트들 설치 및 설정
- 아이콘 시스템 설정

## 할일 목록

### 2.1 shadcn-svelte 설치 및 초기 설정
- [ ] shadcn-svelte CLI 설치: `npx shadcn-svelte@latest init`
- [ ] 설정 선택:
  - [ ] TypeScript 사용
  - [ ] style: new-york 또는 default 선택
  - [ ] base color: slate 선택
  - [ ] CSS variables: yes
- [ ] `src/lib/components/ui/` 디렉토리 생성 확인
- [ ] `components.json` 설정 파일 확인

### 2.2 기본 테마 시스템 구축
- [ ] `src/lib/stores/theme.ts` 생성
  - [ ] 라이트/다크/시스템 모드 지원
  - [ ] localStorage 지속성
  - [ ] 시스템 선호도 감지
- [ ] `src/app.css`에 테마 CSS 변수 정의
- [ ] 테마 토글 기능 구현

### 2.3 shadcn-svelte 컴포넌트 설치 (의존성 기준 최적화)

#### 1차: 기본 컴포넌트 (Base Components) - 다른 컴포넌트의 기반
- [ ] Button 컴포넌트: `npx shadcn-svelte@latest add button`
- [ ] Label 컴포넌트: `npx shadcn-svelte@latest add label` 
- [ ] Separator 컴포넌트: `npx shadcn-svelte@latest add separator`

#### 2차: 입력 컴포넌트 (Input Components) - Button, Label 의존
- [ ] Input 컴포넌트: `npx shadcn-svelte@latest add input`
- [ ] Textarea 컴포넌트: `npx shadcn-svelte@latest add textarea`
- [ ] Checkbox 컴포넌트: `npx shadcn-svelte@latest add checkbox`
- [ ] Switch 컴포넌트: `npx shadcn-svelte@latest add switch`

#### 3차: 고급 입력 컴포넌트 (Advanced Input) - 기본 입력 컴포넌트 의존
- [ ] Radio Group 컴포넌트: `npx shadcn-svelte@latest add radio-group`
- [ ] Slider 컴포넌트: `npx shadcn-svelte@latest add slider`
- [ ] Select 컴포넌트: `npx shadcn-svelte@latest add select`

#### 4차: 레이아웃 컴포넌트 (Layout Components) - 기본 컴포넌트 의존
- [ ] Card 컴포넌트: `npx shadcn-svelte@latest add card`
- [ ] Table 컴포넌트: `npx shadcn-svelte@latest add table`
- [ ] Tabs 컴포넌트: `npx shadcn-svelte@latest add tabs`

#### 5차: 피드백 컴포넌트 (Feedback Components) - 독립적이거나 Button 의존
- [ ] Alert 컴포넌트: `npx shadcn-svelte@latest add alert`
- [ ] Badge 컴포넌트: `npx shadcn-svelte@latest add badge`
- [ ] Progress 컴포넌트: `npx shadcn-svelte@latest add progress`
- [ ] Skeleton 컴포넌트: `npx shadcn-svelte@latest add skeleton`
- [ ] Tooltip 컴포넌트: `npx shadcn-svelte@latest add tooltip`

#### 6차: 오버레이 컴포넌트 (Overlay Components) - Button, Card 등 의존
- [ ] Popover 컴포넌트: `npx shadcn-svelte@latest add popover` (먼저 설치 - 다른 오버레이의 기반)
- [ ] Dialog 컴포넌트: `npx shadcn-svelte@latest add dialog`
- [ ] Sheet 컴포넌트: `npx shadcn-svelte@latest add sheet`
- [ ] Drawer 컴포넌트: `npx shadcn-svelte@latest add drawer`

#### 7차: 고급 기능 컴포넌트 (Advanced Features) - 여러 컴포넌트 의존
- [ ] Form 컴포넌트: `npx shadcn-svelte@latest add form`
- [ ] Sonner (Toast) 컴포넌트: `npx shadcn-svelte@latest add sonner`
- [ ] Breadcrumb 컴포넌트: `npx shadcn-svelte@latest add breadcrumb`
- [ ] Pagination 컴포넌트: `npx shadcn-svelte@latest add pagination`

#### 커스텀 컴포넌트 (Custom Components)
- [ ] pagination.svelte 파일 별도 생성 (기존 프로젝트 참조)

### 2.4 아이콘 시스템 설정
- [ ] Lucide Svelte 설치: `npm install @lucide/svelte`
- [ ] 기본 아이콘들 import 테스트
- [ ] 아이콘 사용 패턴 확립

### 2.5 공통 유틸리티 함수 확장
- [ ] `src/lib/utils/index.ts`에 `cn` 함수 추가 (clsx + tailwind-merge)
- [ ] 필요 패키지 설치: `npm install clsx tailwind-merge`
- [ ] 타입 정의 추가

### 2.6 기본 컴포넌트 테스트 페이지 생성
- [ ] `src/routes/test-ui/+page.svelte` 생성
- [ ] 설치된 모든 컴포넌트 예시 코드 작성
- [ ] 각 컴포넌트별 사용법 예시 구현

### 2.7 Svelte 5 Runes 호환성 확인
- [ ] 모든 컴포넌트에서 Svelte 5 문법 사용 확인
- [ ] `$props()`, `$state()`, `$derived()` 올바른 사용
- [ ] `on:` 이벤트 대신 `onclick` 등 속성 사용 확인
- [ ] deprecated 경고 해결

### 2.8 접근성 기본 설정
- [ ] 모든 버튼에 적절한 aria-label 설정
- [ ] 키보드 이벤트 핸들러 추가 (Enter, Space)
- [ ] role, tabindex 속성 적절히 설정
- [ ] 포커스 표시 스타일 확인

### 2.9 코드 품질 검증
- [ ] `npm run check` TypeScript 오류 해결
- [ ] `npm run lint` ESLint 경고 해결
- [ ] `npm run format` 코드 포맷팅 적용

---

## 사용자 확인 필요 항목

다음 항목들은 실제 브라우저에서 시각적/기능적 확인이 필요하여 사용자가 직접 테스트해야 합니다:

### 개발 서버 및 빌드 테스트
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인  
- [ ] 개발 서버 콘솔 오류 없음 확인

### 시각적 확인 항목
- [ ] 모든 컴포넌트 정상 렌더링 확인
- [ ] 테마 전환 정상 동작 확인 (라이트/다크 모드)
- [ ] 반응형 동작 테스트 (모바일/태블릿/데스크톱)
- [ ] 색상 대비 확인 (라이트/다크 모드에서 가독성)

### 기능적 확인 항목  
- [ ] 키보드 네비게이션 테스트 (Tab, Enter, Space, 화살표)
- [ ] 폼 컴포넌트 상호작용 테스트 (입력, 선택, 토글)
- [ ] 오버레이 컴포넌트 동작 테스트 (Dialog, Sheet, Popover)
- [ ] Toast 알림 표시 테스트

### 브라우저 호환성 테스트
- [ ] Chrome/Edge 테스트
- [ ] Firefox 테스트  
- [ ] Safari 테스트 (가능한 경우)