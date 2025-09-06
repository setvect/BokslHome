# CLAUDE.md

이 파일은 Claude Code가 frontend 프로젝트에서 작업할 때 따라야 할 가이드라인을 제공합니다.

## 1. 기본 원칙

### 1.1 언어
- **소통**: 모든 답변은 기본적으로 한국어로 하되 전문 용어는 영어 사용 가능
- **코드 주석**: 한국어 선호
- **커밋 메시지**: 한국어

### 1.2 프로젝트 개요
**복슬홈 (BokslHome) React Frontend** - BokslPortal 프로젝트의 현대화 버전

## 2. 기술 스택

### 2.1 핵심 기술
- **프레임워크**: Next.js 14+ (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui
- **아이콘**: lucide-react
- **폼 처리**: React Hook Form + Zod
- **테마 관리**: next-themes
- **상태 관리**: React Context + useState/useReducer

## 3. 개발 명령어

### 3.1 기본 명령어
```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 검사
npm run format   # Prettier 포맷팅
npm run type-check # TypeScript 검사
```

## 4. 프로젝트 구조

### 4.1 폴더 구조
```
frontend/src/
├── app/                    # Next.js App Router
│   ├── (app)/             # 메인 애플리케이션
│   ├── (design)/          # 디자인 시스템
│   ├── layout.tsx         # 루트 레이아웃
│   └── globals.css        # 전역 스타일
├── components/
│   ├── layout/            # 레이아웃 컴포넌트
│   └── ui/                # shadcn/ui 컴포넌트
├── lib/
│   ├── utils.ts           # 유틸리티 함수
│   ├── types/             # TypeScript 타입
│   ├── hooks/             # 커스텀 훅
│   ├── contexts/          # React Context
│   ├── schemas/           # Zod 스키마
│   └── mock/              # Mock 데이터
└── providers/             # Provider 컴포넌트
```

## 5. 개발 가이드라인

### 5.1 컴포넌트 작성
- **함수형 컴포넌트** 사용 (React 18+)
- **TypeScript 인터페이스** 필수 정의
- **'use client'** directive 필요시에만 사용 (Server Components 우선)
- **Props 타입** 명시적 정의

### 5.2 파일 네이밍
- **컴포넌트**: PascalCase (예: `UserProfile.tsx`)
- **페이지**: kebab-case (예: `user-profile/page.tsx`)
- **유틸리티**: camelCase (예: `formatDate.ts`)
- **상수**: UPPER_SNAKE_CASE

### 5.3 스타일링 원칙
- **Tailwind CSS** 우선 사용
- **색상**: CSS 변수 기반 테마 시스템 활용
- **반응형**: 모바일 우선 설계
- **다크 모드**: 모든 컴포넌트에서 지원

## 6. 품질 관리

### 6.1 코드 검증 프로세스
1. **파일 수정 후 즉시**: TypeScript 오류 확인
2. **컴포넌트 작성 후**: ESLint 규칙 준수 확인  
3. **단계 완료 후**: 전체 빌드 테스트 실행
4. **기능 구현 후**: 브라우저에서 동작 확인

### 6.2 필수 검증 명령어
```bash
npm run type-check  # TypeScript 오류 0개 유지
npm run lint        # ESLint 경고 최소화
npm run build       # 빌드 성공 확인
```

## 7. 단계별 개발 계획

### 7.1 5단계 개발 프로세스
1. **Foundation**: Next.js 프로젝트 기반 설정
2. **UI Components**: shadcn/ui 컴포넌트 및 테마 시스템
3. **Layout**: 기본 레이아웃 구조 (Header + Sidebar + Content)
4. **Design System**: 디자인 토큰 + 폼 시스템 + 문서화
5. **Editor Components**: Markdown/HTML 에디터 고급 컴포넌트

### 7.2 각 단계별 완료 기준
- 모든 할일 항목 완료
- TypeScript 오류 0개
- ESLint 경고 최소화  
- 빌드 성공
- 브라우저 기능 검증

## 8. 중요 원칙

### 8.1 개발 우선순위
1. **타입 안전성**: TypeScript 엄격 모드 준수
2. **성능 최적화**: Next.js App Router 최대 활용
3. **접근성**: 기본적인 semantic HTML 사용
4. **반응형**: 모든 화면 크기 대응
5. **테마 호환성**: 라이트/다크 모드 완벽 지원

### 8.2 파일 관리 원칙
- **Git 버전 관리**: 프로젝트가 Git으로 관리되므로 백업 파일 생성 금지
- **파일 삭제/이동**: Git을 통한 버전 관리를 신뢰하고 직접 파일 조작
- **변경 추적**: 모든 변경사항은 Git 히스토리를 통해 추적 가능

### 8.3 개발 서버 관리 원칙
- **Claude Code 자동 관리**: Claude Code가 백그라운드에서 `npm run dev` 자동 실행
- **중복 실행 금지**: 추가로 `npm run dev` 실행하지 않기 (포트 충돌 방지)
- **빌드/검증만**: 필요시 `npm run build`, `npm run type-check`, `npm run lint`만 실행
- **포트 확인**: Claude Code가 관리하는 개발 서버 포트 사용 (보통 3000, 3001)

### 8.4 금지사항
- Svelte/Vue 등 다른 프레임워크 문법 사용 금지
- 하드코딩된 색상 값 사용 금지 (CSS 변수 사용)
- 접근성을 완전히 무시하는 구현 금지
- TypeScript any 타입 남용 금지
- **백업 파일 생성 금지**: `.backup`, `.bak`, `.old` 등의 백업 파일 생성하지 않기
- **개발 서버 중복 실행 금지**: Claude Code 자동 관리 개발 서버와 중복 실행하지 않기

## 9. 참고 문서
- **Next.js 공식 문서**: https://nextjs.org/docs
- **shadcn/ui 문서**: https://ui.shadcn.com
- **Tailwind CSS 문서**: https://tailwindcss.com/docs
- **React Hook Form 문서**: https://react-hook-form.com
- **Zod 문서**: https://zod.dev

---

**참고**: 이 가이드라인은 프로젝트 진행에 따라 업데이트됩니다.