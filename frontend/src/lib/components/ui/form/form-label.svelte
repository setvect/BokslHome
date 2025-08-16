<script lang="ts">
  import { Label as FormSnapLabel } from 'formsnap';
  import { cn } from '$lib/utils.js';

  interface Props {
    class?: string;
    children?: any;
  }
  let { class: className, children, ...restProps }: Props = $props();
</script>

<FormSnapLabel
  class={cn(
    'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    className
  )}
  {...restProps}
>
  {#if children}
    {@render children()}
  {/if}
</FormSnapLabel>