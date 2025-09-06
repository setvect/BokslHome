<script lang="ts">
  import type { RenderFn } from '$lib/types/common';
  let props = $props<{
    id: string;
    label: string;
    required?: boolean;
    error?: string;
    children?: RenderFn;
  }>();
</script>

<div class="space-y-2">
  <label for={props.id} class="text-sm font-medium">
    {props.label}{props.required ? ' *' : ''}
  </label>
  {@render props.children?.()}
  {#if props.error}
    <p class="text-sm text-destructive">{props.error}</p>
  {/if}
</div>
