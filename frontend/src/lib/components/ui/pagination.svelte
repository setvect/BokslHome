<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import type { Pagination } from '$lib/types/common';

	interface Props {
		pagination: Pagination;
		onPageChange: (page: number) => void;
		showFirstLast?: boolean;
		maxVisiblePages?: number;
	}

	let { 
		pagination, 
		onPageChange, 
		showFirstLast = true, 
		maxVisiblePages = 5 
	}: Props = $props();

	// 표시할 페이지 번호 계산
	const visiblePages = $derived.by(() => {
		const { currentPage, totalPages } = pagination;
		const pages: number[] = [];
		
		if (totalPages <= maxVisiblePages) {
			// 전체 페이지가 최대 표시 수보다 작으면 모든 페이지 표시
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			// 현재 페이지를 중심으로 표시할 페이지 계산
			const half = Math.floor(maxVisiblePages / 2);
			let start = Math.max(1, currentPage - half);
			let end = Math.min(totalPages, start + maxVisiblePages - 1);
			
			// 끝 페이지가 totalPages보다 작으면 시작 페이지 조정
			if (end - start + 1 < maxVisiblePages) {
				start = Math.max(1, end - maxVisiblePages + 1);
			}
			
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
		}
		
		return pages;
	});

	// 페이지 변경 핸들러
	function handlePageChange(page: number) {
		if (page >= 1 && page <= pagination.totalPages && page !== pagination.currentPage) {
			onPageChange(page);
		}
	}

</script>

{#if pagination.totalPages > 1}
	<nav aria-label="페이지네이션" class="flex items-center justify-center gap-2">
		{#if showFirstLast}
			<Button 
				variant="outline" 
				size="sm"
				onclick={() => handlePageChange(1)}
				disabled={pagination.currentPage === 1}
				aria-label="첫 페이지"
				class="border-foreground/50 text-foreground/80 hover:bg-accent hover:text-accent-foreground disabled:!opacity-100 disabled:!text-foreground/80 disabled:!border-foreground/60 disabled:!bg-muted/40"
			>
				≪
			</Button>
		{/if}
		
		<Button 
			variant="outline" 
			size="sm"
			onclick={() => handlePageChange(pagination.currentPage - 1)}
			disabled={pagination.currentPage === 1}
			aria-label="이전 페이지"
			class="border-foreground/50 text-foreground/80 hover:bg-accent hover:text-accent-foreground disabled:!opacity-100 disabled:!text-foreground/80 disabled:!border-foreground/60 disabled:!bg-muted/40"
		>
			‹
		</Button>
		
		{#each visiblePages as page}
			<Button 
				variant={pagination.currentPage === page ? 'default' : 'outline'}
				size="sm"
				onclick={() => handlePageChange(page)}
				aria-label="페이지 {page}"
				aria-current={pagination.currentPage === page ? 'page' : undefined}
				class={pagination.currentPage === page ? 'bg-primary text-primary-foreground' : 'hover:bg-accent hover:text-accent-foreground border-foreground/50 text-foreground/80'}
			>
				{page}
			</Button>
		{/each}
		
		<Button 
			variant="outline" 
			size="sm"
			onclick={() => handlePageChange(pagination.currentPage + 1)}
			disabled={pagination.currentPage === pagination.totalPages}
			aria-label="다음 페이지"
			class="border-foreground/50 text-foreground/80 hover:bg-accent hover:text-accent-foreground disabled:!opacity-100 disabled:!text-foreground/80 disabled:!border-foreground/60 disabled:!bg-muted/40"
		>
			›
		</Button>
		
		{#if showFirstLast}
			<Button 
				variant="outline" 
				size="sm"
				onclick={() => handlePageChange(pagination.totalPages)}
				disabled={pagination.currentPage === pagination.totalPages}
				aria-label="마지막 페이지"
				class="border-foreground/50 text-foreground/80 hover:bg-accent hover:text-accent-foreground disabled:!opacity-100 disabled:!text-foreground/80 disabled:!border-foreground/60 disabled:!bg-muted/40"
			>
				≫
			</Button>
		{/if}
	</nav>
	
	<!-- 페이지 정보 표시 -->
	<div class="text-sm text-foreground/60 text-center mt-2">
		총 {pagination.totalItems}개 항목 중 
		{((pagination.currentPage - 1) * pagination.pageSize) + 1}-{Math.min(pagination.currentPage * pagination.pageSize, pagination.totalItems)}개 표시
		(페이지 {pagination.currentPage} / {pagination.totalPages})
	</div>
{/if}