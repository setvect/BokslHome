<script lang="ts">
	import { createDropdownMenu, melt } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';

	let { children, trigger, items = [] } = $props();

	const {
		elements: { trigger: triggerElement, menu, item },
		states: { open }
	} = createDropdownMenu();
</script>

{@render trigger?.(triggerElement)}

{#if $open}
	<div
		use:melt={$menu}
		class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-gray-800 dark:border-gray-700"
		transition:fade={{ duration: 100 }}
	>
		{#each items as menuItem}
			<button
				use:melt={$item}
				class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-gray-700 dark:focus:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left"
				onclick={menuItem.action}
				type="button"
			>
				{menuItem.label}
			</button>
		{/each}
		
		{@render children?.()}
	</div>
{/if}
