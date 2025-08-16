<script lang="ts">
  import { Description } from 'formsnap';
  import { cn } from '$lib/utils.js';

  interface Props {
    class?: string;
    children?: any;
  }
  let { class: className, children, ...restProps }: Props = $props();
</script>

<Description
  class={cn('text-sm text-muted-foreground', className)}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</Description>