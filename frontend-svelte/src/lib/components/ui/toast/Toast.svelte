<script lang="ts">
  import { CheckCircle, XCircle, AlertTriangle, Info, X } from '@lucide/svelte';
  import { removeToast, type Toast } from '$lib/stores/toast';
  import { Button } from '$lib/components/ui/button/index.js';

  let { toast }: { toast: Toast } = $props();

  function getIcon(type: Toast['type']) {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return XCircle;
      case 'warning':
        return AlertTriangle;
      case 'info':
        return Info;
      default:
        return Info;
    }
  }

  function getColorClasses(type: Toast['type']) {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'info':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      default:
        return 'border-gray-200 bg-white text-gray-800';
    }
  }

  function getIconColorClass(type: Toast['type']) {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'warning':
        return 'text-yellow-500';
      case 'info':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  }

  const IconComponent = getIcon(toast.type);
</script>

<div class="flex items-start gap-3 rounded-lg border p-4 shadow-sm transition-all {getColorClasses(toast.type)}" role="alert">
  <IconComponent class="h-5 w-5 flex-shrink-0 {getIconColorClass(toast.type)}" />
  <div class="flex-1 space-y-1">
    <p class="font-medium text-sm">{toast.title}</p>
    {#if toast.description}
      <p class="text-sm opacity-90">{toast.description}</p>
    {/if}
  </div>
  <Button variant="ghost" size="sm" class="h-6 w-6 p-0 hover:bg-black/10" onclick={() => removeToast(toast.id)}>
    <X class="h-4 w-4" />
  </Button>
</div>
