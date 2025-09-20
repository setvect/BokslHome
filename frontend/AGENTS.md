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

---

필요 시 이 문서를 업데이트하여 Codex 작업 지침을 최신 상태로 유지한다.
