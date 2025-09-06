<script lang="ts">
  let tokens = $state([
    ['background', 'bg-background', 'text-foreground'],
    ['card', 'bg-card', 'text-card-foreground'],
    ['primary', 'bg-primary', 'text-primary-foreground'],
    ['secondary', 'bg-secondary', 'text-secondary-foreground'],
    ['muted', 'bg-muted', 'text-muted-foreground'],
    ['accent', 'bg-accent', 'text-accent-foreground'],
    ['destructive', 'bg-destructive', 'text-white'],
    ['success', 'bg-success', 'text-success-foreground']
  ] as const);
  function swatchClass(bg: string, fg: string): string {
    return `rounded border ${bg} ${fg} px-3 py-2`;
  }
</script>

<h2 class="text-xl font-semibold mb-4">Colors</h2>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each tokens as [name, bg, fg] (name)}
    <div class={swatchClass(bg, fg)}>
      <div class="text-sm opacity-80">--{name}</div>
      <div class="font-medium">{name}</div>
    </div>
  {/each}
  <div class="rounded border p-3">
    <div class="text-sm opacity-80">Sidebar</div>
    <div class="space-y-2">
      <div class="rounded border bg-sidebar text-sidebar-foreground px-3 py-2">sidebar</div>
      <div class="rounded border bg-sidebar-primary text-sidebar-primary-foreground px-3 py-2">sidebar-primary</div>
      <div class="rounded border bg-sidebar-accent text-sidebar-accent-foreground px-3 py-2">sidebar-accent</div>
    </div>
  </div>
</div>
