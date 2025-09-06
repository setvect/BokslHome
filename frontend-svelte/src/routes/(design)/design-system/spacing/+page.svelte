<script lang="ts">
  let sizes = $state([0, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12]);
</script>

<h2 class="text-xl font-semibold mb-4">Spacing</h2>
<div class="space-y-3 mb-8">
  {#each sizes as s (s)}
    <div class="flex items-center gap-3">
      <div class="w-24 text-sm text-muted-foreground">{s} rem</div>
      <div class="h-4 bg-primary/20" style={`width: ${s}rem`}></div>
    </div>
  {/each}
</div>

<h3 class="text-lg font-semibold mb-2">Component Margins</h3>
<div class="space-y-2 text-sm">
  <div>- Button group gap: <code>gap-2</code></div>
  <div>- Form field spacing: <code>space-y-2</code></div>
  <div>- Card padding: <code>p-4</code> (compact), <code>p-6</code> (default)</div>
  <div>- Section vertical: <code>py-8</code> / <code>py-12</code></div>
  <div>- Layout padding: <code>px-4</code> (mobile) → <code>px-6</code> (tablet) → <code>px-8</code> (desktop)</div>
</div>

<h3 class="text-lg font-semibold mt-8 mb-2">Grid</h3>
<div class="grid grid-cols-6 gap-2">
  {#each Array.from({ length: 12 }) as _, i}
    <div class="h-6 bg-border"></div>
  {/each}
  <!-- 12칸 예시 시각화 -->
</div>
