# 프론트엔드 디자인 시스템 구축 가이드

## 1단계: 프로젝트 초기화 및 기본 설정

### 1.1 SvelteKit 프로젝트 생성
- [x] `npm create svelte@latest frontend` - 새 SvelteKit 프로젝트 생성
- [x] TypeScript 옵션 선택
- [x] ESLint, Prettier 옵션 선택
- [x] 프로젝트 디렉토리 이동 및 의존성 설치

### 1.2 개발 환경 설정
- [x] ESLint 설정 확인 및 커스터마이징
- [x] Prettier 설정 파일 생성 (`.prettierrc`)
- [x] VS Code 설정 파일 생성 (`.vscode/settings.json`)
- [x] Git 설정 확인 (`.gitignore` 검토)

### 1.3 Tailwind CSS v4.1 설치 및 설정
- [x] `npm install -D tailwindcss@4.1.1 @tailwindcss/postcss@4.1.1 autoprefixer postcss`
- [x] PostCSS 설정 파일 생성 (`postcss.config.js`):
  ```js
  export default {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  }
  ```
- [x] Tailwind 설정 파일 생성 (`tailwind.config.ts`):
  ```ts
  import type { Config } from "tailwindcss";

  export default {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    darkMode: ["class"]
  } satisfies Config;
  ```
- [x] `src/app.css` 파일에 Tailwind 지시어 추가:
  ```css
  @import "tailwindcss";
  ```

### 1.4 기본 설정 파일들 생성
- [x] `.prettierrc` 파일 생성:
  ```json
  {
    "useTabs": false,
    "singleQuote": true,
    "trailingComma": "none",
    "printWidth": 140,
    "semi": true
  }
  ```
- [x] `.vscode/settings.json` 파일 생성:
  ```json
  {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
  ```

### 1.5 Tailwind CSS v4.1 기본 설정 검증
- [x] 개발 서버 실행 (`npm run dev`)
- [x] 가장 간단한 Tailwind 클래스 테스트 (`bg-red-500`, `text-blue-600`)
- [x] 브라우저에서 색상이 정상적으로 표시되는지 확인
- [x] Vite 빌드 정상 작동 확인 (`npm run build`)

## 2단계: 기본 색상 시스템 구축

### 2.1 순수 Tailwind 색상 테스트
- [x] 기본 Tailwind 색상 팔레트 작동 확인
- [x] 간단한 테스트 페이지 생성 (`/test-colors`)
- [x] 모든 기본 색상들이 정상 렌더링되는지 확인

### 2.2 커스텀 색상 변수 도입
- [x] `src/app.css`에 `@theme` 지시어로 색상 변수 정의:
  ```css
  @theme {
    --color-border: var(--border);
    --color-input: var(--input);
    --color-ring: var(--ring);
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --color-primary: var(--primary);
    --color-primary-foreground: var(--primary-foreground);
  }
  ```
- [x] CSS 변수 기본값 정의 (light/dark 테마용)
- [x] 색상 변수와 Tailwind 클래스 연동 테스트

## 3단계: 테마 시스템 구현

### 3.1 기본 테마 관리
- [x] 라이트/다크 테마 CSS 변수 정의
- [x] Svelte store를 이용한 테마 상태 관리
- [x] 테마 전환 기능 구현 및 테스트

### 3.2 테마 적용 검증
- [x] 각 테마에서 색상이 올바르게 변경되는지 확인
- [x] localStorage를 이용한 테마 설정 저장
- [x] 시스템 선호도 자동 감지 기능

## 4단계: shadcn-svelte 통합

### 4.1 shadcn-svelte 설치 및 설정
- [x] shadcn-svelte CLI 설치: `npx shadcn-svelte@latest init`
- [x] 설치 프롬프트 옵션 선택:
  - TypeScript: Yes
  - Style: Default
  - Base color: Slate
  - CSS variables: Yes
- [x] 기본 설정 파일 생성됨 확인 (`components.json`)
- [x] 첫 번째 컴포넌트 설치: `npx shadcn-svelte@latest add button`

### 4.2 컴포넌트 색상 연동 테스트
- [x] Button 컴포넌트가 커스텀 색상 변수를 올바르게 사용하는지 확인
- [x] 테마 변경 시 컴포넌트 색상이 정상 변경되는지 테스트
- [x] 필요시 컴포넌트 스타일 조정

## 5단계: 핵심 UI 컴포넌트 구축

### 5.1 기본 컴포넌트 설치
- [x] Card 컴포넌트: `npx shadcn-svelte@latest add card`
- [x] Input 컴포넌트: `npx shadcn-svelte@latest add input`
- [x] Label 컴포넌트: `npx shadcn-svelte@latest add label`
- [x] Breadcrumb 컴포넌트: `npx shadcn-svelte@latest add breadcrumb`
- [x] Badge 컴포넌트: `npx shadcn-svelte@latest add badge`
- [x] 각 컴포넌트의 색상 적용 확인

### 5.2 컴포넌트 테스트 페이지 작성
- [ ] 각 컴포넌트별 테스트 페이지 생성
- [ ] 다양한 variant와 상태별 테스트
- [ ] 테마 변경 시 정상 작동 확인

## 6단계: 디자인 시스템 문서 페이지 구축

### 6.1 기본 문서 구조 생성
- [ ] `/design-system` 메인 인덱스 페이지
- [ ] 네비게이션 및 레이아웃 컴포넌트
- [ ] Breadcrumb 네비게이션 시스템

### 6.2 색상 문서 페이지
- [ ] 색상 팔레트 표시 페이지
- [ ] 색상 코드 복사 기능
- [ ] 라이트/다크 테마별 색상 표시
- [ ] 사용 예시 및 가이드라인

## 7단계: 고급 기능 및 최적화

### 7.1 추가 문서 페이지들
- [ ] Typography 가이드
- [ ] Spacing 시스템
- [ ] 컴포넌트별 상세 문서 (Buttons, Forms, Navigation, Feedback)

### 7.2 개발자 경험 개선
- [ ] 코드 하이라이팅
- [ ] 라이브 코드 에디터 (선택사항)
- [ ] 컴포넌트 속성 문서화
- [ ] 접근성 가이드라인

## 8단계: 품질 검증 및 최종 점검

### 8.1 기능 검증
- [ ] 모든 색상이 올바르게 표시되는지 확인
- [ ] 테마 전환이 모든 페이지에서 정상 작동하는지 확인
- [ ] 반응형 디자인 테스트
- [ ] 접근성 검사 (contrast ratio 등)

### 8.2 성능 최적화
- [ ] 번들 크기 확인 및 최적화
- [ ] 불필요한 CSS 제거
- [ ] 로딩 성능 테스트

## 중요한 파일 위치 및 구조 참고

### 예상 프로젝트 구조
```
frontend/
├── src/
│   ├── lib/
│   │   ├── components/ui/     # shadcn-svelte 컴포넌트들
│   │   └── stores/           # Svelte 스토어 (테마 등)
│   ├── routes/
│   │   ├── +layout.svelte    # 루트 레이아웃
│   │   ├── +page.svelte      # 홈 페이지
│   │   ├── design-system/    # 디자인 시스템 문서
│   │   └── test-colors/      # 색상 테스트 페이지
│   └── app.css              # 글로벌 스타일 및 Tailwind
├── components.json          # shadcn-svelte 설정
├── tailwind.config.ts       # Tailwind 설정
└── postcss.config.js        # PostCSS 설정
```

### 주요 임포트 패턴
```typescript
// 컴포넌트 임포트 (Svelte 파일은 .svelte 확장자 필요)
import Button from "$lib/components/ui/button.svelte";
import Card from "$lib/components/ui/card.svelte";

// TypeScript 파일 임포트 (확장자 생략)
import { theme } from "$lib/stores/theme";
```

## 주요 주의사항 및 학습 내용

### 최신 기술 문서 참조 필수
- [ ] **Tailwind CSS v4.1 공식 문서**: https://tailwindcss.com/docs 최신 설정 방법 확인
- [ ] **SvelteKit 공식 문서**: https://kit.svelte.dev/docs 최신 라우팅 및 설정 방법
- [ ] **shadcn-svelte 공식 문서**: https://shadcn-svelte.com/docs 최신 컴포넌트 사용법
- [ ] **Vite 공식 문서**: https://vitejs.dev/guide 빌드 도구 최신 설정법
- [ ] **PostCSS 플러그인 문서**: @tailwindcss/postcss 최신 사용법 확인
- [ ] 각 단계 진행 전 해당 라이브러리 공식 문서에서 최신 정보 확인 필수

### Tailwind CSS v4.1 특이사항
- **중요**: v4는 v3와 완전히 다른 설정 방식 사용
- `@import "tailwindcss"` 새로운 지시어 (기존 `@tailwind` 대신)
- `@theme` 지시어를 이용한 색상 변수 정의 방식
- CSS 변수와 Tailwind 클래스의 올바른 연동 방법
- PostCSS 플러그인이 `@tailwindcss/postcss@4.1.1`로 변경됨

### shadcn-svelte 통합 시 고려사항
- 컴포넌트의 CSS 변수 의존성
- Tailwind 클래스와 shadcn 스타일의 우선순위
- 테마 변경 시 컴포넌트 반응성

### 개발 workflow
- 각 단계별로 충분한 테스트 진행
- 문제 발생 시 이전 단계로 롤백 가능하도록 커밋 단위 관리
- 브라우저 개발자 도구를 이용한 CSS 변수 및 클래스 적용 확인

## 예상 소요 시간
- 1-3단계: 2-3시간 (기본 설정 및 색상 시스템)
- 4-5단계: 2-3시간 (컴포넌트 통합)
- 6-7단계: 3-4시간 (문서 페이지 구축)
- 8단계: 1-2시간 (품질 검증)

**총 예상 시간: 8-12시간**