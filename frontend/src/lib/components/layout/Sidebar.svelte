<script lang="ts">
  let props = $props<{ open?: boolean; children?: unknown }>();
</script>

<aside class="w-64 border-r min-h-dvh p-4 hidden lg:block">
  <div class="font-semibold mb-4">BokslHome</div>
  <nav class="space-y-2">
    <a href="/" class="block hover:underline">Home</a>
    <a href="/test-ui" class="block hover:underline">UI Test</a>
  </nav>
  {@render (props as any).children?.()}
</aside>
