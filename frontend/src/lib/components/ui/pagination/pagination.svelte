<script lang="ts">
	import Button from "$lib/components/ui/button/button.svelte";
	import ChevronLeftIcon from "@lucide/svelte/icons/chevron-left";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import { cn } from "$lib/utils";

	let {
		class: className,
		totalPages = 1,
		currentPage = $bindable(1),
		onPageChange,
		showPrevNext = true,
		maxVisible = 7,
		...restProps
	}: {
		class?: string;
		totalPages: number;
		currentPage?: number;
		onPageChange?: (page: number) => void;
		showPrevNext?: boolean;
		maxVisible?: number;
	} = $props();

	function handlePageChange(page: number) {
		if (page >= 1 && page <= totalPages && page !== currentPage) {
			currentPage = page;
			onPageChange?.(page);
		}
	}

	function getVisiblePages() {
		if (totalPages <= maxVisible) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const halfVisible = Math.floor((maxVisible - 3) / 2); // -3 for first, last, and ellipsis
		let start = Math.max(currentPage - halfVisible, 2);
		let end = Math.min(currentPage + halfVisible, totalPages - 1);

		if (currentPage <= halfVisible + 1) {
			end = maxVisible - 2;
		}
		if (currentPage >= totalPages - halfVisible) {
			start = totalPages - maxVisible + 3;
		}

		const pages = [];
		
		// Always show first page
		pages.push(1);
		
		// Add ellipsis if needed
		if (start > 2) {
			pages.push(-1); // -1 represents ellipsis
		}
		
		// Add visible pages
		for (let i = start; i <= end; i++) {
			if (i > 1 && i < totalPages) {
				pages.push(i);
			}
		}
		
		// Add ellipsis if needed
		if (end < totalPages - 1) {
			pages.push(-2); // -2 represents ellipsis
		}
		
		// Always show last page (if more than 1 page)
		if (totalPages > 1) {
			pages.push(totalPages);
		}
		
		return pages;
	}

	const visiblePages = $derived(getVisiblePages());
</script>

<nav
	class={cn("mx-auto flex w-full justify-center", className)}
	aria-label="페이지네이션"
	{...restProps}
>
	<div class="flex flex-row items-center gap-1">
		{#if showPrevNext}
			<Button
				variant="outline"
				size="sm"
				class="gap-1 pl-2.5"
				disabled={currentPage <= 1}
				onclick={() => handlePageChange(currentPage - 1)}
			>
				<ChevronLeftIcon class="h-4 w-4" />
				<span>이전</span>
			</Button>
		{/if}

		{#each visiblePages as page}
			{#if page === -1 || page === -2}
				<span class="flex h-9 w-9 items-center justify-center">
					<MoreHorizontalIcon class="h-4 w-4" />
					<span class="sr-only">더 많은 페이지</span>
				</span>
			{:else}
				<Button
					variant={page === currentPage ? "default" : "outline"}
					size="sm"
					class="h-9 w-9"
					onclick={() => handlePageChange(page)}
				>
					{page}
				</Button>
			{/if}
		{/each}

		{#if showPrevNext}
			<Button
				variant="outline"
				size="sm"
				class="gap-1 pr-2.5"
				disabled={currentPage >= totalPages}
				onclick={() => handlePageChange(currentPage + 1)}
			>
				<span>다음</span>
				<ChevronRightIcon class="h-4 w-4" />
			</Button>
		{/if}
	</div>
</nav>