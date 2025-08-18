<script lang="ts">
  import type { RenderFn } from '$lib/types/common';
  let props = $props<{ open?: boolean; onNavigate?: () => void; children?: RenderFn }>();
  // children은 부모에서 전달된 기본 콘텐츠를 렌더링하기 위한 함수
  function handleNavigate() {
    props.onNavigate?.();
  }
</script>

<aside class="w-64 border-r min-h-dvh p-4">
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
        <a href="/design-system/components/buttons" class="block hover:underline" onclick={handleNavigate}>Buttons</a>
        <a href="/design-system/components/forms" class="block hover:underline" onclick={handleNavigate}>Forms</a>
        <a href="/design-system/components/forms-raw" class="block hover:underline" onclick={handleNavigate}>Forms (Raw)</a>
      </div>
    </div>

    <div>
      <div class="mb-1 font-medium text-muted-foreground">Patterns</div>
      <div class="space-y-1">
        <a href="/design-system/patterns/forms" class="block hover:underline" onclick={handleNavigate}>Form Patterns</a>
        <a href="/design-system/components/interactions" class="block hover:underline" onclick={handleNavigate}>Interactions</a>
      </div>
    </div>
  </nav>
  {@render props.children?.()}
</aside>
