# BokslHome Frontend Rulebook
_Last updated: 2025-11-23_

이 문서는 Cursor에서 `frontend/` 작업 시 참고해야 할 시스템 구조와 규칙을 요약합니다. `frontend/AGENTS.md`에 정의된 일반 지침을 보완하며, 도메인별 맥락과 구현 디테일을 한눈에 파악할 수 있도록 정리했습니다.

## 1. 기술 스택 & 런타임
- **Framework**: Next.js 15 App Router (React 19). 모든 페이지는 `src/app` 경로에 있으며, Route Group을 적극 활용합니다.
- **언어/스타일**: TypeScript(strict) + Tailwind CSS v4. shadcn/ui 컴포넌트를 `src/components/ui`에서 래핑하여 사용합니다.
- **테마/글꼴**: `src/app/layout.tsx`에서 Geist Sans/Mono 폰트를 설정하고 `next-themes` 기반 `ThemeProvider`로 라이트/다크 모드를 지원합니다. `sonner` 토스터가 전역으로 포함되어 있으므로 알림은 `toast` API를 사용합니다.
- **상태 관리**: 기본은 React state/hooks. 도메인별 전역 상태가 필요할 경우 Context/hooks를 `src/lib/hooks`/`contexts` 하위에 정의합니다.

## 2. 레이아웃 & 인증 흐름
- `/src/app/(app)/layout.tsx`는 서버 컴포넌트로 쿠키(`sidebar-state`)를 읽어 사이드바 초기 상태를 계산하고, 클라이언트 레이아웃에 전달합니다.
- `ClientAppLayout` (`client-layout.tsx`)는 **클라이언트 컴포넌트**로 헤더·사이드바·메인 컨테이너를 구성하며, `localStorage`의 `auth_token` 존재 여부를 확인합니다. 토큰이 없으면 `/login`으로 리다이렉트합니다.
- 헤더(`components/layout/header.tsx`)는 메뉴 토글/비밀번호 변경/로그아웃/테마 토글을 제공하고, 사이드바(`components/layout/sidebar.tsx`)는 BOARD 카테고리와 각 기능 라우트를 중첩 메뉴 형태로 보여줍니다. 사이드바는 cookie + viewport 기반으로 열린 상태를 관리합니다.
- 로그인 페이지(`src/app/login/page.tsx`)는 현재 Mock 토큰을 저장하는 수준이며, 실제 인증 API 연동 시 이 구조를 교체해야 합니다.

## 3. 데이터 소스 & 타입 체계
- **Mock 데이터**: 아직 백엔드 연동 전이라 `src/lib/mock/data/*` 에 게시판·노트·메모·지식·네트워크 샘플이 정의되어 있습니다. 페이지/컴포넌트는 동기 함수(`getMockNotes`, `getMockBoardList` 등)로 데이터를 읽습니다.
- **타입 정의**: `src/lib/types`에 도메인별 타입이 모여 있습니다. 예) `types/board.ts` 는 `BoardCode`, `BoardPostMock` 등을 정의하고, `types/network.ts` 는 관계 그래프 노드/엣지 정보를 제공합니다.
- **상수 & 유틸**:
  - `lib/constants/board.ts`에서 게시판 카테고리 정보/맵을 제공합니다.
  - `lib/utils/markdown-renderer.ts`는 `marked` + `DOMPurify` + `Prism/Mermaid` 를 한 번에 설정합니다.
  - `lib/utils/mock-upload-api.ts`는 첨부파일 업로드 Mock를 제공하며, 실제 API 연동 전에 인터페이스를 유지해야 합니다.
  - `lib/utils/cookie.ts`는 `js-cookie` 래퍼 (sidebar state 등에서 사용).

## 4. 모듈별 개요
| 경로/기능                | 주요 컴포넌트                                         | 데이터/특징                                                                                  |
| ------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `(app)/page.tsx`         | 홈 대시보드 카드                                      | 기능 링크 카드, Tailwind 카드 UI                                                             |
| `(app)/board`            | `board-list`, `[code]/page.tsx`                       | BOARD_CATEGORIES + mock posts. 게시판 관리(`board-manage`) 파트에는 폼/표/필터 템플릿이 존재 |
| `(app)/knowledge`        | 지식 카드/타임라인 컴포넌트                           | `lib/mock/data/knowledge` 참조                                                               |
| `(app)/note`             | `note-list-view` (client) + `[noteId]`                | 검색/필터/페이지네이션, 상세 화면은 mock 데이터를 기반으로 markdown 렌더링                   |
| `(app)/memo`             | 칸반/카테고리/메모 보드                               | Drag 없이 상태 기반 카드 나열, mock 메모                                                     |
| `(app)/network`          | `network-editor`, `relationship-graph`, `[networkId]` | `vis-network` 를 활용한 관계 그래프, theme-aware 색상/폰트, 노드·엣지 편집 모드              |
| `(app)/misc/lotto`       | `useLotto` hook                                       | localStorage client-id + 날짜 기반 시드로 pseudo RNG, 숫자 뱃지 UI                           |
| `(design)/design-system` | 디자인 시스템 쇼케이스                                | shadcn 컴포넌트 데모                                                                         |

> 새로운 페이지를 만들 때는 위 패턴(페이지는 서버 컴포넌트, UI/상호작용은 `_components` 디렉터리에서 클라이언트로 분리)을 유지하세요.

## 5. UI 빌딩 블록
- `src/components/ui` 안에 shadcn 기반 버튼, 입력, 표, 드로어, 에디터 등이 모두 래핑되어 있습니다. 추가 컴포넌트 작성 시 동일한 폴더 구조/네이밍을 따릅니다.
- 폼은 React Hook Form + Zod (`components/ui/form.tsx`, `lib/schemas/form-schemas.ts`) 조합으로 작성하며, `FormField`/`FormControl`/`FormMessage` 패턴을 지킵니다.
- 텍스트 편집기:
  - `ui/html-editor.tsx` 는 Quill 기반 WYSIWYG.
  - `ui/markdown-editor.tsx` 는 CodeMirror + Preview.
- 공통 레이아웃 `MainContent`는 내부에 에러 바운더리(`components/layout/ErrorBoundary`)를 감싸고 있으므로 페이지에서 try/catch보다 Suspense/error boundary를 활용합니다.

## 6. 그래프/시각화 모듈
- `RelationshipGraph`는 `vis-network/standalone`을 직접 제어합니다. Theme (light/dark)에 따라 폰트/선 색상을 재설정하므로, 노드/엣지 스타일을 수정할 때 `useTheme` 연동을 고려해야 합니다.
- 그래프는 dragEnd 이벤트로 노드 좌표를 콜백에 전달하고, 편집 모드(`NetworkEditorMode`)에 따라 커서/interaction 옵션을 바꿉니다. 새로운 그래프 기능을 추가할 때는 `syncDataSet` 로직을 재사용하세요.

## 7. 인증·세션 처리
- 현재는 **모의 토큰**(`auth_token`)을 localStorage에 저장하는 방식입니다. `ClientAppLayout`가 존재 유무만 확인하므로, 추후 백엔드 JWT와 연동 시에도 키 이름과 존재 여부 검사 방식을 우선 유지하거나 레이아웃 로직을 함께 업데이트해야 합니다.
- 헤더의 `ChangePasswordDialog`는 아직 Mock이며, 추후 실제 API를 붙일 때 `components/user` 하위 로직을 확장합니다.

## 8. 개발 시 유의할 사항
1. **서버/클라이언트 분리**: 데이터 준비는 가능한 서버 컴포넌트에서, 상호작용은 `_components` 폴더 내 `"use client"` 컴포넌트로 나눕니다.
2. **라우팅 규칙**: 동적 세그먼트 `[id]`, 병렬 라우트 등 Next App Router 문법을 따른다. 이동 링크는 `next/link`.
3. **스타일 유지**: Tailwind 유틸리티 + CSS 변수(`bg-background`, `text-muted-foreground` 등)를 사용하고, border는 `border-border` 토큰으로 맞춥니다.
4. **Mock → API 전환 대비**: `lib/mock` 함수와 동일한 반환 타입을 유지하면서 fetch로 교체할 계획이므로, 새 기능도 mock 레이어를 통해 데이터를 주입하세요.
5. **접근성 정책**: AGENTS 문서에 명시된 대로 스크린 리더 속성은 필요 시 제거 가능. 대신 기본적인 aria-label 정도만 유지합니다.

## 9. 알려진 공통 TODO
1. **실제 백엔드 연동**: 현재 모든 모듈이 Mock 데이터로만 동작. API 클라이언트 계층을 신설하고 mock을 대체해야 합니다.
2. **실제 로그인/JWT**: 로컬 토큰→실제 로그인 폼 & 토큰 저장 방식으로 교체.
3. **파일 업로드**: `mockUploadFile` → 백엔드 `/attach` 연동 준비.
4. **라우팅 정리**: 홈 기능 카드에 `/lotto` 등 잘못된 경로가 있으므로 `sidebar`와 실제 페이지 경로를 동기화.
5. **테스트/검증**: 현재 Storybook/테스트 없음. 핵심 컴포넌트에 Playwright 혹은 Jest/React Testing Library 추가 계획.

필요 시 이 Rulebook을 업데이트해 새로운 규칙/패턴을 공유해 주세요. (수정 시 날짜를 갱신)*** End Patch***

