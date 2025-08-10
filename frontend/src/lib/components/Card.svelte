<script lang="ts">
	let { children, title, class: className = '' } = $props();
</script>

<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 {className}">
	{#if title}
		<div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
		</div>
	{/if}
	<div class="p-6">
		{@render children?.()}
	</div>
</div>
