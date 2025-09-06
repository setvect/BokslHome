# 2단계: 기본 UI 컴포넌트 (Basic UI Components)

## 목표
- shadcn/ui 설치 및 기본 컴포넌트 구축
- 테마 시스템 (라이트/다크 모드) 구축
- 핵심 UI 컴포넌트들 설치 및 설정
- 아이콘 시스템 설정

## 할일 목록

### 2.1 shadcn/ui 설치 및 초기 설정
- [ ] shadcn/ui CLI 설치: `npx shadcn-ui@latest init`
- [ ] 설정 선택:
  - [ ] TypeScript 사용
  - [ ] 스타일: Default (or New York)
  - [ ] base color: Slate 선택
  - [ ] CSS variables: yes
- [ ] `src/components/ui/` 디렉토리 생성 확인
- [ ] `components.json` 설정 파일 확인
- [ ] `src/lib/utils.ts` cn 함수 자동 생성 확인

### 2.2 기본 테마 시스템 구축
- [ ] 라이트/다크 모드 지원 구현
- [ ] `next-themes` 패키지 설치: `npm install next-themes`
- [ ] Theme Provider 설정 (`src/providers/theme-provider.tsx` 생성)
- [ ] 루트 레이아웃에 Theme Provider 적용
- [ ] localStorage 지속성 자동 처리 확인

### 2.3 shadcn/ui 컴포넌트 설치 (의존성 기준 최적화)

#### 1차: 기본 컴포넌트 (Base Components) - 다른 컴포넌트의 기반
- [ ] Button 컴포넌트: `npx shadcn-ui@latest add button`
- [ ] Label 컴포넌트: `npx shadcn-ui@latest add label`
- [ ] Separator 컴포넌트: `npx shadcn-ui@latest add separator`

#### 2차: 입력 컴포넌트 (Input Components) - Button, Label 의존
- [ ] Input 컴포넌트: `npx shadcn-ui@latest add input`
- [ ] Textarea 컴포넌트: `npx shadcn-ui@latest add textarea`
- [ ] Checkbox 컴포넌트: `npx shadcn-ui@latest add checkbox`
- [ ] Switch 컴포넌트: `npx shadcn-ui@latest add switch`

#### 3차: 고급 입력 컴포넌트 (Advanced Input) - 기본 입력 컴포넌트 의존
- [ ] RadioGroup 컴포넌트: `npx shadcn-ui@latest add radio-group`
- [ ] Slider 컴포넌트: `npx shadcn-ui@latest add slider`
- [ ] Select 컴포넌트: `npx shadcn-ui@latest add select`

#### 4차: 레이아웃 컴포넌트 (Layout Components) - 기본 컴포넌트 의존
- [ ] Card 컴포넌트: `npx shadcn-ui@latest add card`
- [ ] Table 컴포넌트: `npx shadcn-ui@latest add table`
- [ ] Tabs 컴포넌트: `npx shadcn-ui@latest add tabs`

#### 5차: 피드백 컴포넌트 (Feedback Components) - 독립적이거나 Button 의존
- [ ] Alert 컴포넌트: `npx shadcn-ui@latest add alert`
- [ ] Badge 컴포넌트: `npx shadcn-ui@latest add badge`
- [ ] Progress 컴포넌트: `npx shadcn-ui@latest add progress`
- [ ] Skeleton 컴포넌트: `npx shadcn-ui@latest add skeleton`
- [ ] Tooltip 컴포넌트: `npx shadcn-ui@latest add tooltip`

#### 6차: 오버레이 컴포넌트 (Overlay Components) - Button, Card 등 의존
- [ ] Popover 컴포넌트: `npx shadcn-ui@latest add popover` (먼저 설치 - 다른 오버레이의 기반)
- [ ] Dialog 컴포넌트: `npx shadcn-ui@latest add dialog`
- [ ] Sheet 컴포넌트: `npx shadcn-ui@latest add sheet`
- [ ] Drawer 컴포넌트: `npx shadcn-ui@latest add drawer`

#### 7차: 고급 기능 컴포넌트 (Advanced Features) - 여러 컴포넌트 의존
- [ ] Form 컴포넌트: `npx shadcn-ui@latest add form`
- [ ] Toast/Sonner 컴포넌트: `npx shadcn-ui@latest add toast` 또는 `npx shadcn-ui@latest add sonner`
- [ ] Breadcrumb 컴포넌트: `npx shadcn-ui@latest add breadcrumb`
- [ ] Pagination 컴포넌트: `npx shadcn-ui@latest add pagination`

### 2.4 아이콘 시스템 설정
- [ ] Lucide React 설치: `npm install lucide-react`
- [ ] 기본 아이콘들 import 확인
- [ ] 아이콘 사용 패턴 확립 (Menu, X, Sun, Moon 등 기본 아이콘)

### 2.5 테마 토글 컴포넌트 구현
- [ ] `src/components/theme-toggle.tsx` 생성 (Sun/Moon 아이콘 사용)
- [ ] useTheme 훅 활용하여 라이트/다크 모드 토글 기능 구현
- [ ] 애니메이션 효과 적용

### 2.6 기본 컴포넌트 쇼케이스 페이지 생성
- [ ] `src/app/showcase/page.tsx` 생성
- [ ] 설치된 모든 컴포넌트 예시 코드 작성
- [ ] 각 컴포넌트별 사용법 예시 구현 (Button, Card, Input, Label 등)

### 2.7 React 18+ 호환성 확인
- [ ] 모든 컴포넌트에서 React 18 기능 호환성 확인
- [ ] 'use client' directive 적절한 사용 확인
- [ ] Server/Client Components 구분 확인
- [ ] Hydration 오류 없음 확인

### 2.8 코드 품질 검증
- [ ] `npm run type-check` TypeScript 오류 해결
- [ ] `npm run lint` ESLint 경고 해결
- [ ] `npm run format` 코드 포맷팅 적용
- [ ] 컴포넌트별 Props 타입 정의 확인

---

## 사용자 확인 필요 항목

다음 항목들은 실제 브라우저에서 시각적/기능적 확인이 필요하여 사용자가 직접 확인해야 합니다:

### 개발 서버 및 빌드
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] 개발 서버 콘솔 오류 없음 확인

### 시각적 확인 항목
- [ ] 모든 컴포넌트 정상 렌더링 확인
- [ ] 테마 전환 정상 동작 확인 (라이트/다크 모드)
- [ ] 반응형 동작 확인 (모바일/태블릿/데스크톱)
- [ ] 색상 대비 확인 (라이트/다크 모드에서 가독성)

### 기능적 확인 항목
- [ ] 키보드 네비게이션 확인
- [ ] 폼 컴포넌트 상호작용 확인
- [ ] 오버레이 컴포넌트 동작 확인
- [ ] Toast 알림 표시 확인

### 브라우저 호환성 확인
- [ ] Chrome/Edge 확인
- [ ] Firefox 확인
- [ ] Safari 확인 (가능한 경우)

## React 특화 고려사항

### 2.9 Next.js 최적화
- [ ] 컴포넌트 코드 스플리팅 확인
- [ ] 이미지 최적화 (next/image) 적용 준비
- [ ] Font 최적화 (next/font) 적용 준비

