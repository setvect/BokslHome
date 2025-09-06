<script lang="ts">
  import { Dialog as DialogPrimitive } from 'bits-ui';

  // children/child 스니펫을 모두 허용하여 커스텀 트리거를 지원
  let {
    ref = $bindable(null),
    children,
    child,
    ...restProps
  }: DialogPrimitive.TriggerProps & {
    // 래퍼에서 스니펫 전달 허용
    children?: any;
    child?: any;
  } = $props();
</script>

<DialogPrimitive.Trigger bind:ref data-slot="dialog-trigger" {...restProps}>
  {#if child}
    {#snippet child(args: unknown)}{@render child(args)}{/snippet}
  {/if}
  {@render children?.()}
</DialogPrimitive.Trigger>
