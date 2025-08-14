# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**복슬홈 (BokslHome)** - BokslPortal 프로젝트의 현대화 버전으로 Spring Boot + Kotlin 백엔드와 SvelteKit + TypeScript 프론트엔드로 구성

### 주요 기능
- 게시판
- 복슬지식 
- 복슬노트  
- 복슬메모
- 복슬관계
- 댓글
- 첨부파일
- 로또번호 생성

## 기술 스택

### 백엔드 (완성됨)
- **언어**: Kotlin
- **프레임워크**: Spring Boot 3.4.0
- **데이터베이스**: H2 Database
- **보안**: JWT 인증
- **Java 버전**: 21

### 프론트엔드 (개발 중)
- **언어**: TypeScript
- **프레임워크**: SvelteKit + **Svelte 5 Runes** (`$state`, `$effect`, `$derived`) - **반드시 Svelte 5 문법 사용**
- **스타일링**: Tailwind CSS 4.x (`@import "tailwindcss"` 신규 문법)
- **UI 컴포넌트**: shadcn-svelte (헤드리스 UI 컴포넌트)
- **아이콘**: @lucide/svelte (이미 설치됨)
- **빌드 도구**: Vite
- **에디터 컴포넌트**: 
  - TinyMCE (HTML 편집)
  - CodeMirror 6 (마크다운 편집, Mermaid 다이어그램 지원)

## 개발 명령어

### 전체 프로젝트 빌드
```bash
# 전체 프로젝트 빌드 (프론트엔드 + 백엔드)
./backend/gradlew buildAll
```

### 백엔드 개발
```bash
cd backend
./gradlew bootRun
```

### 프론트엔드 개발
```bash
cd frontend
npm install  # 최초 한번만 실행
npm run dev
npm run dev -- --open  # 브라우저 자동 실행
```

### 코드 품질 관리
```bash
cd frontend
npm run check        # 타입 체크
npm run lint        # ESLint
npm run format      # Prettier 포맷팅
```

### Docker 배포
```bash
# Docker 이미지 빌드
docker build -t bokslhome .

# 컨테이너 실행 (프론트엔드:3000, 백엔드:8080 포트 노출)
docker run -p 3000:3000 -p 8080:8080 bokslhome
```

## 아키텍처 및 구조

### 모노레포 구조
- `backend/` - Spring Boot Kotlin 애플리케이션 (완성됨)
- `frontend/` - SvelteKit TypeScript 애플리케이션 (개발 중)
- `docs/` - 프로젝트 문서 및 TODO 가이드

### 백엔드 아키텍처 (참고용 - 완성됨)
```
backend/src/main/kotlin/com/setvect/bokslhome/
├── app/                    # 기능 모듈
│   ├── board/             # 게시판 시스템 (게시글, 관리)
│   ├── knowledge/         # 지식 베이스
│   ├── note/             # 노트 시스템 (카테고리 포함)
│   ├── memo/             # 메모 시스템 (카테고리 포함)
│   ├── network/          # 관계 관리
│   ├── comment/          # 댓글 시스템
│   ├── attach/           # 파일 첨부 처리
│   └── user/             # 사용자 관리 및 인증
├── config/               # 보안, 웹, Jackson 설정
├── filter/              # JWT 인증 필터
└── util/                # 공통 유틸리티, JWT 유틸
```

### 프론트엔드 아키텍처
```
frontend/src/
├── lib/
│   ├── components/
│   │   ├── layout/               # 레이아웃 컴포넌트 (완성됨)
│   │   │   ├── Header.svelte     # 상단 헤더 (Popover 기반 사용자 메뉴)
│   │   │   ├── Sidebar.svelte    # 좌측 사이드바 (2depth 메뉴)
│   │   │   └── MainContent.svelte # 메인 콘텐츠 영역
│   │   ├── ui/                   # shadcn-svelte 컴포넌트 (25개+)
│   │   │   ├── MarkdownEditor.svelte  # 고급 마크다운 에디터
│   │   │   └── HtmlEditor.svelte      # TinyMCE 래퍼
│   │   └── [공유 컴포넌트들]
│   ├── stores/
│   │   └── theme.ts              # 테마 관리 스토어
│   ├── types/
│   │   └── menu.ts               # 메뉴 타입 정의
│   └── utils.ts                  # 유틸리티 함수 (cn 등)
└── routes/
    ├── +layout.svelte            # 메인 레이아웃 (Header + Sidebar + MainContent)
    ├── design-system/            # 컴포넌트 문서
    └── [애플리케이션 라우트]
```

### 주요 기술 세부사항

#### **Svelte 5 Runes 문법 (필수)**
**이 프로젝트는 Svelte 5를 사용하므로 반드시 Runes 문법을 사용해야 합니다.**

```typescript
// ✅ 올바른 Svelte 5 Runes 문법 - 반드시 사용
let currentValue = $state(value);
let previewHtml = $state('');
let isDarkMode = $derived(detectTheme());

// Props 정의 (Svelte 5)
interface Props {
  children: any;
  title?: string;
}
let { children, title = 'Default' }: Props = $props();

// 이벤트 핸들러
function handleClick() {
  currentValue = 'new value';
}

$effect(() => {
  // 반응형 효과 로직
  console.log('Value changed:', currentValue);
});

// ❌ 절대 사용하지 말 것 - Svelte 4 문법
// export let value; 
// let: binding;
// on:click={handler}
```

**중요한 Svelte 5 변경사항:**
- `export let` 대신 `$props()` 사용
- `on:event` 대신 `onclick` 등의 속성 사용  
- `<slot>` 대신 `{@render children()}` 사용
- `<script>` 태그에 TypeScript 사용 시 `lang="ts"` 필수

#### 테마 시스템
- 자동 라이트/다크 모드 감지
- Tailwind CSS 4.x와 CSS 변수 통합
- localStorage 지속성
- 시스템 선호도 감지

#### 에디터 컴포넌트
- **MarkdownEditor**: CodeMirror 6 기반, 실시간 미리보기, Mermaid 다이어그램, 이미지 붙여넣기 지원
- **HtmlEditor**: TinyMCE 통합, 테마 지원

## 중요한 구현 참고사항

### Tailwind CSS 4.x
- 새로운 `@import "tailwindcss"` 문법 사용 (`@tailwind` 대신)
- `@theme` 지시어로 테마 변수 정의
- CSS 변수 통합: `--color-primary: var(--primary)`

### CodeMirror 통합  
```typescript
// CodeMirror API 접근하는 올바른 방법
let editorView: any;

// on:ready 이벤트를 통해 에디터 인스턴스 획득
<CodeMirror on:ready={(e) => editorView = e.detail} />

// 커서 위치에 텍스트 삽입
function insertAtCursor(text: string) {
  if (editorView) {
    const state = editorView.state;
    const cursorPos = state.selection.main.head;
    editorView.dispatch({
      changes: { from: cursorPos, to: cursorPos, insert: text },
      selection: { anchor: cursorPos + text.length }
    });
  }
}
```

### Mermaid 다이어그램
- `mermaid` 코드 블록을 위한 커스텀 marked.js 렌더러
- 테마 지원과 함께 동적 SVG 렌더링
- HTML 생성 후 DOM 기반 후처리

### API 문서 참조
외부 라이브러리 작업 시 항상 공식 문서 참조:
- **Tailwind CSS v4**: https://tailwindcss.com/docs
- **SvelteKit**: https://kit.svelte.dev/docs
- **shadcn-svelte**: https://shadcn-svelte.com/docs
- **CodeMirror 6**: https://codemirror.net/docs/
- **Mermaid**: https://mermaid.js.org/

## 소통 가이드라인

- **언어**: 모든 소통은 한국어로
- **기술 용어**: 한국어-영어 혼용 가능 (예: "컴포넌트(component)")
- **코드 주석**: 한국어 선호
- **커밋 메시지**: 한국어

## 개발 워크플로우

### TODO 관리
복잡한 다단계 작업에는 TodoWrite 도구를 사용하여 진행 상황을 추적하고 사용자에게 가시성 제공

### 프론트엔드 개발 시 주의사항
- **package.json 확인**: 새로운 라이브러리 설치 전 이미 설치된 패키지 확인 (예: @lucide/svelte)
- **Svelte 5 문법 준수**: 절대 Svelte 4 문법 사용하지 말 것
- **shadcn-svelte 컴포넌트**: 문제 발생 시 Popover 등 안정적인 대안 사용
- **타입스크립트**: `<script lang="ts">` 태그 필수
- **접근성 준수 (중요!)**: 
  - 클릭 가능한 모든 요소에는 키보드 지원 필수
  - `onclick` 속성이 있는 div에는 `onkeydown` 핸들러 추가
  - `role="button"`, `tabindex="0"` 속성 설정
  - 키보드 이벤트는 Enter키와 스페이스바 모두 처리 필수
- **색상 테마 호환성**: 
  - 모든 텍스트는 `text-foreground` 계열 클래스 사용
  - `text-muted-foreground`, 고정 색상 클래스 사용 금지
  - 새 컴포넌트 작성 후 라이트/다크 모드에서 가독성 확인 필수
  - 아이콘은 `text-current` 또는 `text-foreground` 사용

### 오류 처리  
- 단계별 디버깅 접근법
- 라이브러리별 이슈는 공식 문서 참조
- 큰 변경보다는 점진적 테스트

### 보안 모범 사례
- API 키나 민감한 정보 노출 금지
- 인증은 JWT 사용 (백엔드에서 처리)
- 사용자 입력 검증
- OWASP 가이드라인 준수

## 파일 임포트 패턴

```typescript
// Svelte 컴포넌트 (.svelte 확장자 필수)
import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
import Button from '$lib/components/ui/button/button.svelte';

// TypeScript 모듈 (확장자 생략)
import { theme } from '$lib/stores/theme';
import { cn } from '$lib/utils';
```

## 디자인 시스템 참고 가이드

### 컴포넌트 라이브러리 구조
프로젝트는 완전한 디자인 시스템을 포함하고 있으며, 모든 UI 컴포넌트는 `src/lib/components/ui/` 디렉토리에 정리되어 있습니다.

### 사용 가능한 컴포넌트 카테고리

#### Form 컴포넌트
- **Button**: 다양한 variant (default, outline, ghost, destructive, secondary)와 size (sm, default, lg) 지원
- **Input**: 표준 입력 필드, error 상태, disabled 상태 지원
- **Textarea**: 다중 라인 텍스트 입력, resize 옵션 지원
- **Label**: 접근성을 위한 라벨 컴포넌트
- **Checkbox**: 단일/다중 선택, indeterminate 상태 지원
- **Radio Group**: 라디오 버튼 그룹, 수직/수평 배치 지원
- **Select**: 드롭다운 선택 컴포넌트, 검색 가능한 옵션
- **Switch**: 토글 스위치, 크기 조절 가능
- **Slider**: 범위 선택, 단일/다중 값 지원

#### Layout 컴포넌트
- **Card**: CardHeader, CardTitle, CardDescription, CardContent, CardFooter 하위 컴포넌트
- **Table**: 정렬, 페이지네이션, 선택 기능을 포함한 완전한 테이블 시스템

#### Modal/Dialog
- **Dialog**: 모달 대화상자, 폼 통합 가능
- **Sheet**: 사이드 패널 형태의 모달
- **Drawer**: 모바일 친화적인 하단 시트
- **Popover**: 팝오버/툴팁 형태의 오버레이

#### Navigation
- **Breadcrumb**: 경로 표시, 자동 구분자 지원
- **Tabs**: 탭 네비게이션, 수직/수평 배치
- **Pagination**: 페이지네이션, 스마트 페이지 표시

#### Feedback/Status
- **Alert**: 경고/정보 메시지, variant 지원 (default, destructive)
- **Badge**: 상태 표시 배지, 다양한 색상 variant
- **Toast (Sonner)**: 알림 토스트, 자동 사라짐
- **Tooltip**: 호버 툴팁, 위치 조절 가능
- **Progress**: 진행률 표시바
- **Skeleton**: 로딩 스켈레톤 UI

### 컴포넌트 사용 패턴

#### 기본 import 패턴
```typescript
// 컴포넌트 import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
import { Button } from '$lib/components/ui/button';
import { Input } from '$lib/components/ui/input';
import { Label } from '$lib/components/ui/label';

// 아이콘 import - @lucide/svelte 사용 (이미 package.json에 설치됨)
import { Search, ChevronDown, Menu, User, Sun, Moon } from '@lucide/svelte';
```

#### 폼 구성 예시
```svelte
<Card>
  <CardHeader>
    <CardTitle>사용자 정보</CardTitle>
    <CardDescription>기본 정보를 입력해주세요</CardDescription>
  </CardHeader>
  <CardContent class="space-y-4">
    <div class="space-y-2">
      <Label for="name">이름</Label>
      <Input id="name" bind:value={name} placeholder="이름을 입력하세요" />
    </div>
    <div class="space-y-2">
      <Label for="email">이메일</Label>
      <Input id="email" type="email" bind:value={email} />
    </div>
  </CardContent>
  <CardFooter>
    <Button onclick={handleSubmit}>저장</Button>
  </CardFooter>
</Card>
```

#### 테이블 구성 예시
```svelte
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>이메일</TableHead>
      <TableHead class="text-right">액션</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {#each users as user}
      <TableRow>
        <TableCell class="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell class="text-right">
          <Button variant="ghost" size="sm">편집</Button>
        </TableCell>
      </TableRow>
    {/each}
  </TableBody>
</Table>
```

### Svelte 5 Runes와 컴포넌트 상태 관리

#### 올바른 $derived 사용법
```typescript
// ✅ 올바른 사용법 - 함수 없이 직접 계산
const filteredUsers = $derived(
  users.filter(user => user.name.includes(searchQuery))
);

// ❌ 잘못된 사용법 - 함수 형태로 반환
const filteredUsers = $derived(() => {
  return users.filter(user => user.name.includes(searchQuery));
});
```

#### 컴포넌트 간 상태 공유
```typescript
// 반응형 상태
let selectedItems = $state<number[]>([]);
let currentPage = $state(1);

// 계산된 값
const totalPages = $derived(Math.ceil(items.length / itemsPerPage));
const paginatedItems = $derived(
  items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
);
```

### 디자인 시스템 참고 위치
- **컴포넌트 문서**: `/design-system/components/[component-name]`
- **실제 사용 예시**: 각 컴포넌트 페이지에서 다양한 사용 사례와 props 확인 가능
- **색상 시스템**: `/design-system/colors`
- **타이포그래피**: `/design-system/typography` 
- **스페이싱**: `/design-system/spacing`

### 스타일링 가이드라인

#### Tailwind CSS 4.x 새 문법
- `@import "tailwindcss"` 사용 (기존 `@tailwind` 대신)
- CSS 변수와 통합된 색상 시스템
- `text-foreground`, `bg-background`, `border-border` 등 시맨틱 색상 클래스 사용

#### 다크모드 호환 색상 사용법 (중요!)
**모든 텍스트와 UI 요소는 다크모드에서도 가독성을 확보해야 합니다.**

```css
/* ✅ 올바른 색상 클래스 - 테마에 따라 자동 조정됨 */
text-foreground         /* 메인 텍스트 색상 */
text-foreground/80      /* 약간 투명한 메인 텍스트 */
text-foreground/70      /* 보조 텍스트 */
text-foreground/60      /* 더 연한 보조 텍스트 */
text-current            /* 아이콘에 현재 텍스트 색상 적용 */

bg-background           /* 배경색 */
bg-card                 /* 카드 배경색 */
bg-muted                /* 음소거된 배경색 */
border-border           /* 테두리 색상 */

/* ❌ 피해야 할 색상 클래스 - 다크모드에서 가독성 문제 */
text-muted-foreground   /* 다크모드에서 너무 어두움 */
text-gray-500           /* 고정 색상은 테마 변경 시 문제 */
text-black              /* 다크모드에서 보이지 않음 */
text-white              /* 라이트모드에서 보이지 않음 */
```

#### 컴포넌트별 권장 색상 패턴
```svelte
<!-- 제목 텍스트 -->
<h1 class="text-foreground">메인 제목</h1>
<h2 class="text-foreground">소제목</h2>

<!-- 본문 텍스트 -->
<p class="text-foreground/80">일반 본문 내용</p>
<span class="text-foreground/70">보조 설명 텍스트</span>

<!-- 아이콘 -->
<Icon class="text-foreground" />      <!-- 메인 아이콘 -->
<Icon class="text-current" />         <!-- 부모 텍스트 색상 상속 -->
<Icon class="text-foreground/60" />   <!-- 보조 아이콘 -->

<!-- 카드/패널 -->
<div class="bg-card border border-border">
  <h3 class="text-foreground">카드 제목</h3>
  <p class="text-foreground/70">카드 내용</p>
</div>
```

##### 테마 지원
- 모든 컴포넌트는 자동 라이트/다크 모드 지원
- CSS 변수 기반 색상 시스템으로 테마 전환 시 일관성 보장
- 새로운 컴포넌트 작성 시 반드시 시맨틱 색상 클래스 사용
- 텍스트 가독성 테스트: 라이트/다크 모드에서 모두 확인 필수

### 접근성 가이드라인 (필수 준수)

#### 클릭 가능한 요소의 키보드 접근성
**모든 클릭 가능한 요소는 키보드로도 조작 가능해야 합니다.**

```svelte
<!-- ✅ 올바른 접근성 패턴 -->
<div 
  onclick={handleClick}
  onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? handleClick() : null}
  role="button"
  tabindex="0"
  aria-label="설명적인 레이블"
>
  클릭 가능한 요소
</div>

<!-- 🚫 잘못된 패턴 - 키보드 접근성 누락 -->
<div onclick={handleClick}>
  클릭 가능한 요소
</div>

<!-- ✅ 더 나은 해결책 - 네이티브 button 사용 -->
<button onclick={handleClick} class="styled-button">
  클릭 가능한 요소
</button>
```

#### 필수 접근성 속성
- **`role="button"`**: div를 버튼으로 사용할 때 필수
- **`tabindex="0"`**: 키보드로 포커스 가능하게 설정
- **`aria-label`**: 시각적 텍스트가 없거나 불충분할 때
- **`aria-expanded`**: 접히는/펼쳐지는 요소에서 상태 표시
- **`aria-describedby`**: 추가 설명이 있을 때

#### 키보드 이벤트 처리 패턴
```typescript
// ✅ 표준 키보드 접근성 핸들러
function handleKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault(); // 스페이스바 스크롤 방지
    handleAction();
  }
}

// ✅ 화살표 키 네비게이션 (메뉴, 리스트 등)
function handleArrowKeys(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp':
      event.preventDefault();
      focusPrevious();
      break;
    case 'ArrowDown':
      event.preventDefault();
      focusNext();
      break;
    case 'Home':
      event.preventDefault();
      focusFirst();
      break;
    case 'End':
      event.preventDefault();
      focusLast();
      break;
  }
}
```

#### 포커스 관리
```svelte
<!-- ✅ 포커스 표시 스타일링 -->
<button class="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
  버튼
</button>

<!-- ✅ 모달/다이얼로그의 포커스 트랩 -->
<script>
  import { trapFocus } from '$lib/utils/focus';
  
  let dialogElement: HTMLElement;
  
  function openModal() {
    isOpen = true;
    // 모달 열릴 때 첫 번째 포커스 가능한 요소로 이동
    setTimeout(() => trapFocus(dialogElement), 0);
  }
</script>
```

#### 의미론적 HTML 사용
```svelte
<!-- ✅ 적절한 HTML 요소 선택 -->
<nav aria-label="메인 네비게이션">
  <ul>
    <li><a href="/">홈</a></li>
    <li><button aria-expanded="false">메뉴</button></li>
  </ul>
</nav>

<main>
  <h1>페이지 제목</h1>
  <article>
    <h2>섹션 제목</h2>
    <p>내용...</p>
  </article>
</main>

<!-- ✅ 폼 레이블 연결 -->
<div>
  <label for="email">이메일</label>
  <input id="email" type="email" required aria-describedby="email-error" />
  <div id="email-error" role="alert">유효하지 않은 이메일입니다</div>
</div>
```

#### 색상 대비와 텍스트 크기
- 최소 대비비 4.5:1 (일반 텍스트), 3:1 (큰 텍스트) 준수
- 색상만으로 정보를 전달하지 않음
- 텍스트 크기는 16px 이상 권장

#### 접근성 테스트 방법
1. **키보드만으로 탐색**: Tab, Shift+Tab, Enter, 스페이스바, 화살표 키로 모든 기능 사용 가능한지 확인
2. **스크린 리더 테스트**: NVDA, JAWS 또는 브라우저 내장 스크린 리더로 테스트
3. **자동 검사 도구**: axe-core, Lighthouse 접근성 감사 활용
4. **포커스 표시**: 포커스가 현재 어디에 있는지 명확히 보이는지 확인

## 현재 상태

- ✅ **백엔드**: Spring Boot + Kotlin API 완료
- ✅ **프론트엔드 기반**: SvelteKit + Tailwind CSS 4.x 설정 완료
- ✅ **레이아웃 시스템**: Header, Sidebar, MainContent 컴포넌트 완료
  - 반응형 3-영역 레이아웃 (헤더/사이드바/콘텐츠)
  - 2depth 메뉴 시스템 (@lucide/svelte 아이콘)
  - Popover 기반 사용자 액션 메뉴
  - 테마 토글 (라이트/다크/시스템)
- ✅ **디자인 시스템**: shadcn-svelte 컴포넌트 통합 완료 (25개+ 컴포넌트)
- ✅ **테마 시스템**: CSS 변수를 이용한 라이트/다크 모드 완료
- ✅ **에디터 컴포넌트**: CodeMirror 6 기반 고급 MarkdownEditor 완료
- ✅ **컴포넌트 문서**: 모든 UI 컴포넌트의 사용 예시와 가이드 완료
- 🔄 **애플리케이션 기능**: 개발 중 (백엔드 API 연동)