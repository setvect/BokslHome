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

### 2.3 핵심 UI 컴포넌트 설치
- [ ] Button 컴포넌트: `npx shadcn-svelte@latest add button`
- [ ] Input 컴포넌트: `npx shadcn-svelte@latest add input`
- [ ] Label 컴포넌트: `npx shadcn-svelte@latest add label`
- [ ] Card 컴포넌트: `npx shadcn-svelte@latest add card`
- [ ] Badge 컴포넌트: `npx shadcn-svelte@latest add badge`
- [ ] Alert 컴포넌트: `npx shadcn-svelte@latest add alert`

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
- [ ] 설치된 모든 컴포넌트 테스트
- [ ] 테마 전환 테스트
- [ ] 반응형 동작 테스트

### 2.7 Svelte 5 Runes 호환성 확인
- [ ] 모든 컴포넌트에서 Svelte 5 문법 사용 확인
- [ ] `$props()`, `$state()`, `$derived()` 올바른 사용
- [ ] `on:` 이벤트 대신 `onclick` 등 속성 사용 확인

### 2.8 접근성 기본 설정
- [ ] 모든 버튼에 적절한 aria-label 설정
- [ ] 키보드 네비게이션 테스트
- [ ] 색상 대비 확인 (라이트/다크 모드)
- [ ] 포커스 표시 스타일 확인

### 2.9 최종 검증
- [ ] `npm run dev` 정상 실행 확인
- [ ] `npm run build` 성공 확인
- [ ] `npm run check` TypeScript 오류 0개 확인
- [ ] 모든 컴포넌트 정상 렌더링 확인
- [ ] 테마 전환 정상 동작 확인