<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	let { children, title, trigger } = $props();

	const {
		elements: { trigger: triggerElement, overlay, content, close, portalled },
		states: { open }
	} = createDialog();
</script>

{@render trigger?.(triggerElement)}

{#if $open}
	<div use:melt={$portalled}>
		<div 
			use:melt={$overlay} 
			class="fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
			transition:fade={{ duration: 150 }}
		></div>
		<div
			use:melt={$content}
			class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:bg-gray-800 dark:border-gray-700"
			transition:fade={{ duration: 200 }}
		>
			{#if title}
				<div class="flex flex-col space-y-1.5 text-center sm:text-left">
					<h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
				</div>
			{/if}
			
			<div class="text-gray-600 dark:text-gray-300">
				{@render children?.()}
			</div>

			<button
				use:melt={$close}
				class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
			>
				<span class="sr-only">닫기</span>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
		</div>
	</div>
{/if}
