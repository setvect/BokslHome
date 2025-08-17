<script lang="ts">
  const headings = $state([
    ['H1', 'text-3xl font-bold'],
    ['H2', 'text-2xl font-semibold'],
    ['H3', 'text-xl font-semibold'],
    ['H4', 'text-lg font-medium']
  ] as const);
  const bodies = $state([
    ['Body', 'text-base'],
    ['Body (muted)', 'text-sm text-muted-foreground'],
    ['Label', 'text-xs uppercase tracking-wide']
  ] as const);
  const leadings = $state([
    ['leading-none', 'leading-none'],
    ['leading-tight', 'leading-tight'],
    ['leading-normal', 'leading-normal'],
    ['leading-relaxed', 'leading-relaxed']
  ] as const);
  const trackings = $state([
    ['tracking-tight', 'tracking-tight'],
    ['tracking-normal', 'tracking-normal'],
    ['tracking-wide', 'tracking-wide']
  ] as const);
</script>

<h2 class="text-xl font-semibold mb-4">Typography</h2>
<div class="space-y-6">
  <div class="space-y-1">
    {#each headings as [label, klass] (label)}
      <div class={klass}>{label} — {klass}</div>
    {/each}
  </div>
  <div class="space-y-1">
    {#each bodies as [label, klass] (label)}
      <p class={klass}>{label} — {klass}</p>
    {/each}
  </div>
  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Line-height (leading)</div>
    {#each leadings as [label, klass] (label)}
      <p class={`max-w-prose ${klass}`}>
        {label} — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in libero vitae dolor luctus.
      </p>
    {/each}
  </div>
  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Letter-spacing (tracking)</div>
    {#each trackings as [label, klass] (label)}
      <p class={klass}>{label} — ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
    {/each}
  </div>
</div>
