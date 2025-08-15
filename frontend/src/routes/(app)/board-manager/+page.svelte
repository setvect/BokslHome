<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
	import { Badge } from '$lib/components/ui/badge';
	import Pagination from '$lib/components/ui/pagination.svelte';
	import { Search, Plus, ExternalLink, Edit, Trash2 } from '@lucide/svelte';
	import type { BoardManager, BoardManagerSearchFilter, BoardManagerQuery } from '$lib/types/boardManager';
	import type { Pagination as PaginationType } from '$lib/types/common';
	import { BOARD_MANAGER_CONSTANTS } from '$lib/types/boardManager';
	import { formatUploadLimit, formatFeatureStatus } from '$lib/utils/boardManager';
	import { getBoardManagerList, deleteBoardManager } from '$lib/mock/api/boardManagerApi';

	// 상태 관리
	let boardList = $state<BoardManager[]>([]);
	let pagination = $state<PaginationType>({
		currentPage: 1,
		pageSize: 6, // 페이지네이션 테스트를 위해 6개로 줄임
		totalItems: 0,
		totalPages: 0
	});
	let loading = $state(false);
	let searchFilter = $state<BoardManagerSearchFilter>({
		searchType: 'name',
		searchKeyword: ''
	});


	// 페이지 로드 시 데이터 조회
	onMount(() => {
		loadBoardList();
	});

	// 게시판 목록 조회
	async function loadBoardList() {
		loading = true;
		try {
			// Mock API 호출
			const query: BoardManagerQuery = {
				search: searchFilter.searchKeyword.trim() ? searchFilter : undefined,
				pagination: {
					currentPage: pagination.currentPage,
					pageSize: pagination.pageSize
				}
			};

			const response = await getBoardManagerList(query);
			
			// 응답 데이터 설정
			boardList = response.items;
			pagination = response.pagination;
		} catch (error) {
			console.error('게시판 목록 조회 실패:', error);
			// 에러 발생 시 빈 목록으로 설정
			boardList = [];
			pagination = {
				...pagination,
				totalItems: 0,
				totalPages: 0
			};
		} finally {
			loading = false;
		}
	}

	// 검색 실행
	function handleSearch() {
		pagination.currentPage = 1; // 검색 시 첫 페이지로 이동
		loadBoardList();
	}

	// 엔터키 검색
	function handleSearchKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	}

	// 페이지 변경
	function changePage(newPage: number) {
		if (newPage >= 1 && newPage <= pagination.totalPages) {
			pagination.currentPage = newPage;
			loadBoardList();
		}
	}

	// 게시판 삭제
	async function deleteBoard(boardCode: string) {
		if (confirm('정말로 삭제하시겠습니까?')) {
			try {
				await deleteBoardManager(boardCode);
				await loadBoardList(); // 목록 새로고침
			} catch (error) {
				console.error('게시판 삭제 실패:', error);
				alert('삭제 중 오류가 발생했습니다.');
			}
		}
	}

	// 게시판 바로가기 (임시)
	function openBoard(boardCode: string) {
		// TODO: 실제 게시판 페이지로 이동
		alert(`게시판 ${boardCode} 바로가기`);
	}
</script>

<div class="container mx-auto py-6 space-y-6">
	<!-- 페이지 제목 -->
	<div class="flex items-center justify-between">
		<h1 class="text-2xl font-bold text-foreground">게시판 관리</h1>
		<Button onclick={() => window.location.href = '/board-manager/create'}>
			<Plus class="w-4 h-4" />
			만들기
		</Button>
	</div>

	<!-- 검색 영역 -->
	<Card>
		<CardContent class="pt-6">
			<div class="flex items-center gap-4">
				<div class="flex items-center gap-2">
					<select 
						bind:value={searchFilter.searchType}
						class="w-32 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						{#each BOARD_MANAGER_CONSTANTS.SEARCH_TYPES as searchType}
							<option value={searchType.value}>{searchType.label}</option>
						{/each}
					</select>
					<Input
						bind:value={searchFilter.searchKeyword}
						placeholder="검색어"
						class="w-80"
						onkeydown={handleSearchKeydown}
					/>
				</div>
				<Button onclick={handleSearch} disabled={loading}>
					<Search class="w-4 h-4" />
					검색
				</Button>
			</div>
		</CardContent>
	</Card>

	<!-- 게시판 목록 테이블 -->
	<Card>
		<CardHeader>
			<CardTitle>게시판 목록</CardTitle>
		</CardHeader>
		<CardContent>
			{#if loading}
				<div class="flex items-center justify-center py-8">
					<div class="text-foreground/60">로딩 중...</div>
				</div>
			{:else if boardList.length === 0}
				<div class="flex items-center justify-center py-8">
					<div class="text-foreground/60">게시판이 없습니다.</div>
				</div>
			{:else}
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead class="w-32 text-center">코드</TableHead>
							<TableHead class="w-32 text-center">바로가기</TableHead>
							<TableHead class="text-center">게시판이름</TableHead>
							<TableHead class="w-32 text-center">업로드 제한</TableHead>
							<TableHead class="w-20 text-center">댓글</TableHead>
							<TableHead class="w-20 text-center">파일</TableHead>
							<TableHead class="w-20 text-center">암호화</TableHead>
							<TableHead class="w-32 text-center">기능</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{#each boardList as board}
							<TableRow>
								<TableCell class="font-mono text-blue-600 text-center">
									<a 
										href="/board-manager/{board.boardCode}" 
										class="hover:underline"
									>
										{board.boardCode}
									</a>
								</TableCell>
								<TableCell>
									<Button 
										variant="ghost" 
										size="sm"
										onclick={() => openBoard(board.boardCode)}
										class="text-blue-600 hover:text-blue-800"
									>
										<ExternalLink class="w-4 h-4" />
										바로가기
									</Button>
								</TableCell>
								<TableCell class="font-medium text-foreground">
									{board.name}
								</TableCell>
								<TableCell class="text-foreground/80 text-center">
									{formatUploadLimit(board.uploadLimit)}
								</TableCell>
								<TableCell class="text-center">
									<Badge variant={board.replyF ? 'default' : 'secondary'}>
										{formatFeatureStatus(board.replyF)}
									</Badge>
								</TableCell>
								<TableCell class="text-center">
									<Badge variant={board.attachF ? 'default' : 'secondary'}>
										{formatFeatureStatus(board.attachF)}
									</Badge>
								</TableCell>
								<TableCell class="text-center">
									<Badge variant={board.encryptF ? 'default' : 'secondary'}>
										{formatFeatureStatus(board.encryptF)}
									</Badge>
								</TableCell>
								<TableCell class="text-right">
									<div>
										<Button 
											variant="ghost" 
											size="sm"
											onclick={() => window.location.href = `/board-manager/${board.boardCode}/edit`}
											class="text-blue-600 hover:text-blue-800"
										>
											<Edit class="w-4 h-4" />
										</Button>
										<Button 
											variant="ghost" 
											size="sm"
											onclick={() => deleteBoard(board.boardCode)}
											class="text-red-600 hover:text-red-800"
										>
											<Trash2 class="w-4 h-4" />
										</Button>
									</div>
								</TableCell>
							</TableRow>
						{/each}
					</TableBody>
				</Table>
			{/if}
		</CardContent>
	</Card>

	<!-- 페이지네이션 -->
	<Pagination {pagination} onPageChange={changePage} />
</div>