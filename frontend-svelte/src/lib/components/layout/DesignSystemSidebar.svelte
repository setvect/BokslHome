<script lang="ts">
  import { PawPrint } from '@lucide/svelte';
  import type { RenderFn } from '$lib/types/common';
  let props = $props<{ open?: boolean; onNavigate?: () => void; children?: RenderFn }>();
  // children은 부모에서 전달된 기본 콘텐츠를 렌더링하기 위한 함수
  function handleNavigate() {
    props.onNavigate?.();
  }
</script>

<aside class="w-64 border-r min-h-dvh pt-0">
  <div class="h-14 flex items-center px-4 border-b border-border">
    <a
      href="/"
      class="flex items-center gap-3 text-lg font-bold text-primary hover:text-primary/80 transition-colors group"
      aria-label="복슬홈"
    >
      <PawPrint class="w-6 h-6 group-hover:scale-110 transition-transform" />
      <span class="tracking-wide">복슬홈</span>
    </a>
  </div>
  <div class="p-4">
    <div class="font-semibold mb-4">Design System</div>
  <nav class="space-y-4 text-sm">
    <div>
      <div class="mb-1 font-medium text-muted-foreground">Overview</div>
      <a href="/design-system" class="block hover:underline" onclick={handleNavigate}>Intro</a>
    </div>

    <div>
      <div class="mb-1 font-medium text-muted-foreground">Tokens</div>
      <div class="space-y-1">
        <a href="/design-system/colors" class="block hover:underline" onclick={handleNavigate}>Colors</a>
        <a href="/design-system/typography" class="block hover:underline" onclick={handleNavigate}>Typography</a>
        <a href="/design-system/spacing" class="block hover:underline" onclick={handleNavigate}>Spacing</a>
      </div>
    </div>

    <div>
      <div class="mb-1 font-medium text-muted-foreground">Components</div>
      <div class="space-y-1">
        <a href="/design-system/components" class="block hover:underline" onclick={handleNavigate}>Overview</a>

        <!-- 기본 컴포넌트 -->
        <a href="/design-system/components/buttons" class="block hover:underline" onclick={handleNavigate}>Buttons</a>
        <a href="/design-system/components/forms" class="block hover:underline" onclick={handleNavigate}>Forms</a>
        <a href="/design-system/components/forms-raw" class="block hover:underline" onclick={handleNavigate}>Forms (Raw)</a>

        <!-- 핵심 데이터 컴포넌트 -->
        <div class="mt-2 text-xs text-muted-foreground">Data Display</div>
        <a href="/design-system/components/table" class="block hover:underline" onclick={handleNavigate}>Table</a>
        <a href="/design-system/components/card" class="block hover:underline" onclick={handleNavigate}>Card</a>
        <a href="/design-system/components/pagination" class="block hover:underline" onclick={handleNavigate}>Pagination</a>
        <a href="/design-system/components/badge" class="block hover:underline" onclick={handleNavigate}>Badge</a>

        <!-- 네비게이션 & 인터랙션 -->
        <div class="mt-2 text-xs text-muted-foreground">Navigation</div>
        <a href="/design-system/components/breadcrumb" class="block hover:underline" onclick={handleNavigate}>Breadcrumb</a>
        <a href="/design-system/components/tabs" class="block hover:underline" onclick={handleNavigate}>Tabs</a>
        <a href="/design-system/components/accordion" class="block hover:underline" onclick={handleNavigate}>Accordion</a>

        <!-- 입력 & 피드백 -->
        <div class="mt-2 text-xs text-muted-foreground">Input & Feedback</div>
        <a href="/design-system/components/search" class="block hover:underline" onclick={handleNavigate}>Search Bar</a>
        <a href="/design-system/components/select" class="block hover:underline" onclick={handleNavigate}>Select</a>
        <a href="/design-system/components/dialog" class="block hover:underline" onclick={handleNavigate}>Dialog</a>
        <a href="/design-system/components/toast" class="block hover:underline" onclick={handleNavigate}>Toast</a>
        <a href="/design-system/components/skeleton" class="block hover:underline" onclick={handleNavigate}>Skeleton</a>

        <!-- 에디터 -->
        <div class="mt-2 text-xs text-muted-foreground">Editors</div>
        <a href="/design-system/components/markdown" class="block hover:underline" onclick={handleNavigate}>Markdown Editor</a>
        <a href="/design-system/components/editor" class="block hover:underline" onclick={handleNavigate}>HTML Editor</a>
      </div>
    </div>

    <div>
      <div class="mb-1 font-medium text-muted-foreground">Patterns</div>
      <div class="space-y-1">
        <a href="/design-system/patterns/forms" class="block hover:underline" onclick={handleNavigate}>Form Patterns</a>
        <a href="/design-system/patterns/responsive" class="block hover:underline" onclick={handleNavigate}>Responsive</a>
        <a href="/design-system/components/interactions" class="block hover:underline" onclick={handleNavigate}>Interactions</a>
      </div>
    </div>
  </nav>
  </div>
  {@render props.children?.()}
</aside>
