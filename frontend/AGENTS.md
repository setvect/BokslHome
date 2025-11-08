# AGENTS.md

이 문서는 Codex가 `frontend/` 디렉터리 이하에서 작업할 때 따라야 할 지침을 정의합니다.

## 1. 기본 원칙

### 1.1 언어
- **응답**: 모든 설명과 결과 보고는 한국어로 작성한다. (전문 용어·영문 약어는 원어 사용 가능)
- **코드 주석**: 가능하면 한국어를 사용하되, 기존 영어 주석 스타일을 유지해야 할 경우에는 존중한다.
- **커밋 메시지**: 한국어 작성 (사용자가 직접 커밋을 요청한 경우 해당 지침을 다시 확인할 것).

### 1.2 프로젝트 개요
**복슬홈 (BokslHome) React Frontend** — BokslPortal의 현대화 버전이며 Next.js App Router 기반으로 동작한다.

## 2. 기술 스택

- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript (엄격 모드)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **아이콘**: lucide-react
- **폼 처리**: React Hook Form + Zod
- **폼 유효성 검사**: React Hook Form + Zod 조합으로 스키마를 정의하고, `FormField`/`FormControl`/`FormMessage` 컴포넌트로 에러 메시지를 표준화한다. 기본 예시는 게시판 관리 폼(`frontend/src/app/(app)/board-manage/_components/board-form.tsx`)에 있으며, 다른 모듈에서도 동일한 패턴을 확장해 사용한다.
- **테마 관리**: next-themes
- **상태 관리**: React Context + useState/useReducer

## 3. 개발 명령어

```bash
npm run dev        # 개발 서버 실행 (Codex가 직접 실행하지 않는다)
npm run build      # 프로덕션 빌드
npm run start      # 프로덕션 서버 실행
npm run lint       # ESLint 검사
npm run format     # Prettier 포맷팅
npm run type-check # TypeScript 검사
```

## 4. 프로젝트 구조 요약

```
frontend/src/
├── app/                    # Next.js App Router 엔트리
│   ├── (app)/              # 메인 애플리케이션 루트
│   ├── (design)/           # 디자인 시스템 관련 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   └── globals.css         # 전역 스타일
├── components/
│   ├── layout/             # 레이아웃 컴포넌트
│   └── ui/                 # shadcn/ui 래핑 컴포넌트
├── lib/
│   ├── utils.ts            # 공용 유틸리티
│   ├── types/              # 타입 정의 모음
│   ├── hooks/              # 커스텀 훅
│   ├── contexts/           # React Context
│   ├── schemas/            # Zod 스키마
│   └── mock/               # Mock 데이터
└── providers/              # 전역 Provider 컴포넌트
```

## 5. 구현 가이드라인

- **컴포넌트**: 함수형 컴포넌트만 사용한다.
- **서버 컴포넌트 우선**: `"use client"` 지시문은 필요한 경우에만 추가한다.
- **Props 타입**: 모든 컴포넌트 Props에 명시적인 TypeScript 타입(인터페이스 또는 타입 alias)을 선언한다.
- **파일 네이밍**:
  - 컴포넌트: PascalCase (`UserProfile.tsx`)
  - 페이지 세그먼트: kebab-case (`user-profile/page.tsx`)
  - 유틸리티: camelCase (`formatDate.ts`)
  - 상수: UPPER_SNAKE_CASE
- **스타일링**: Tailwind CSS utility class 사용을 기본으로 하고, 색상은 CSS 변수 기반 테마 시스템을 따른다.
- **반응형 & 테마**: 모든 신규 UI는 모바일 우선, 라이트/다크 모드 모두 테스트한다.
- **접근성**: 접근성 요구 사항은 적용하지 않으며, 스크린 리더용 라벨/속성은 필요 시 제거한다.

## 6. 품질 확인

1. TypeScript 오류가 없는지 확인한다 (`npm run type-check`).
2. ESLint 경고를 최소화한다 (`npm run lint`).
3. 큰 변경을 마친 경우 빌드가 성공하는지 확인한다 (`npm run build`).
4. 가능하다면 브라우저 동작도 가정하고 설명한다.

## 7. 작업 흐름 주의사항

- Git으로 추적되는 파일에 불필요한 백업 파일을 만들지 않는다 (`.bak`, `.old` 등 금지).
- 기존 개발 서버(`npm run dev`)는 사용자가 관리하므로 Codex는 중복 실행을 시도하지 않는다.
- Next.js, Tailwind, shadcn/ui 외 프레임워크 문법이나 스타일 시스템을 도입하지 않는다.
- TypeScript `any` 남용 금지: 불가피한 경우 명확히 이유를 설명한다.

## 8. 참고 문서

- Next.js: https://nextjs.org/docs
- shadcn/ui: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com/docs
- React Hook Form: https://react-hook-form.com
- Zod: https://zod.dev

## 9. 모듈 작업 가이드라인

- **레이아웃**: 각 세그먼트(예: `board`, `board-manage`, 신규 모듈)는 `layout.tsx`를 통해 공통 래퍼와 메타 구성을 정의한다. 하위 `page.tsx`는 비즈니스 로직과 템플릿 조합에 집중한다.
- **템플릿 구조**: 목록·상세·폼 등 화면 단위는 `_components/templates` 또는 역할별 하위 디렉터리로 분리해 재사용한다. 페이지는 템플릿에 데이터만 주입하도록 얇게 유지한다.
- **라우팅 패턴**: `create`, `[code]`, `[code]/edit`, `[code]/[postId]` 등 세그먼트 네이밍을 공통 규칙으로 삼고, 가능하면 `generateStaticParams`, `dynamicParams`, `generateMetadata`를 활용해 정적/동적 처리를 통일한다.
- **컴포넌트 타입**: 서버 컴포넌트를 기본으로 하고, 상태·이벤트 처리가 필요한 최소 범위만 클라이언트 컴포넌트(`"use client"`)로 분리한다.
- **스타일 가이드**: Tailwind 유틸리티와 프로젝트 공통 토큰(`space-y-*`, `rounded-*`, `border-border`, `bg-card` 등)을 우선 사용한다. 반복되는 구조는 공통 컴포넌트나 클래스 추출을 우선 검토한다.
- **데이터 계층**: 상수·타입·목데이터는 `src/lib/` 하위 도메인 폴더(`constants`, `types`, `mock`)에 위치시키고, 페이지 내부 선언을 피한다.
- **명명 규칙**: 컴포넌트는 PascalCase, 세그먼트는 kebab-case, 유틸 함수는 camelCase, 상수는 UPPER_SNAKE_CASE로 통일하며, 도메인 접두사(예: `BoardListTemplate`)를 활용해 충돌을 방지한다.
- **검증 책임 분리**: 파라미터 검증과 예외 처리(`notFound`, `redirect`)는 페이지 수준에서 수행하고, 템플릿 컴포넌트는 표현 로직에 집중한다. 폼 검증은 React Hook Form + Zod 패턴을 기본으로 한다.
- **확장성 기록**: 신규 모듈을 추가할 때는 위 규칙을 적용한 기본 디렉터리 구조를 먼저 마련하고, 의도적으로 다른 구성이 필요한 경우 해당 이유를 주석 또는 문서화한다.

---

필요 시 이 문서를 업데이트하여 Codex 작업 지침을 최신 상태로 유지한다.
