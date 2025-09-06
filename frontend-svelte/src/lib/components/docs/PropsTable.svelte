<script lang="ts">
  // 컴포넌트 Props 표 컴포넌트
  type Row = { name: string; type: string; required?: boolean; default?: string; description?: string };
  let props = $props<{ rows: Row[] }>();
</script>

<div class="overflow-auto border rounded-md">
  <table class="w-full text-sm">
    <thead class="bg-muted/50">
      <tr>
        <th class="text-left p-2 whitespace-nowrap">Name</th>
        <th class="text-left p-2 whitespace-nowrap">Type</th>
        <th class="text-left p-2 whitespace-nowrap">Required</th>
        <th class="text-left p-2 whitespace-nowrap">Default</th>
        <th class="text-left p-2">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each props.rows as r (r.name)}
        <tr class="border-t">
          <td class="p-2 font-mono text-xs">{r.name}</td>
          <td class="p-2 font-mono text-xs">{r.type}</td>
          <td class="p-2">{r.required ? 'Yes' : 'No'}</td>
          <td class="p-2 font-mono text-xs">{r.default ?? '-'}</td>
          <td class="p-2 text-foreground/90">{r.description ?? ''}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
