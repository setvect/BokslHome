<script lang="ts">
  import { FieldErrors } from 'formsnap';
  import { cn } from '$lib/utils.js';

  interface Props {
    class?: string;
  }
  let { class: className, ...restProps }: Props = $props();
</script>

<FieldErrors
  class={cn('text-sm font-medium text-destructive', className)}
  {...restProps}
/>