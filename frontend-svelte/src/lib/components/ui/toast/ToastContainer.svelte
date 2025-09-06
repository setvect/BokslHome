<script lang="ts">
  import { toasts } from '$lib/stores/toast';
  import Toast from './Toast.svelte';

  let { position = 'top-right' }: { position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' } = $props();

  function getPositionClasses(pos: string) {
    switch (pos) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      default:
        return 'top-4 right-4';
    }
  }
</script>

<div class="fixed {getPositionClasses(position)} z-50 flex w-full max-w-sm flex-col gap-2 pointer-events-none">
  {#each $toasts as toast (toast.id)}
    <div class="pointer-events-auto animate-in slide-in-from-right-full">
      <Toast {toast} />
    </div>
  {/each}
</div>
