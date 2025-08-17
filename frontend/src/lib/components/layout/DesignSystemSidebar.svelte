<script lang="ts">
  let props = $props<{ open?: boolean; children?: () => unknown }>();
  // children은 부모에서 전달된 기본 콘텐츠를 렌더링하기 위한 함수
</script>

<aside class="w-64 border-r min-h-dvh p-4 hidden lg:block">
  <div class="font-semibold mb-4">Design System</div>
  <nav class="space-y-2">
    <a href="/design-system" class="block hover:underline">Overview</a>
    <a href="/design-system/colors" class="block hover:underline">Colors</a>
    <a href="/design-system/typography" class="block hover:underline">Typography</a>
    <a href="/design-system/spacing" class="block hover:underline">Spacing</a>
  </nav>
  {@render props.children?.()}
</aside>
