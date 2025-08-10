<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Dialog from '$lib/components/Dialog.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { createDialog, melt } from '@melt-ui/svelte';

	// 다크모드 토글 상태
	let isDarkMode = $state(false);

	// 다크모드 토글 함수
	function toggleDarkMode() {
		isDarkMode = !isDarkMode;
		if (isDarkMode) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	// 메뉴 항목들 (기존 복슬홈피 참고)
	const menuItems = [
		{ name: '게시판', description: '다양한 주제의 게시글을 작성하고 관리합니다', icon: '📝' },
		{ name: '복슬지식', description: '지식과 정보를 체계적으로 정리합니다', icon: '📚' },
		{ name: '복슬노트', description: '개인 노트와 메모를 관리합니다', icon: '📓' },
		{ name: '복슬메모', description: '간단한 메모와 할 일을 기록합니다', icon: '📋' },
		{ name: '복슬관계', description: '인맥과 관계를 관리합니다', icon: '🤝' },
		{ name: '이것저것', description: '로또 번호 생성 등 유틸리티 기능', icon: '🎲' }
	];

	// 드롭다운 메뉴 아이템
	const dropdownItems = [
		{ label: '프로필 보기', action: () => alert('프로필 보기') },
		{ label: '설정', action: () => alert('설정') },
		{ label: '로그아웃', action: () => alert('로그아웃') }
	];
</script>

<svelte:head>
	<title>복슬이네 - 홈</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<!-- 헤더 -->
	<header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- 로고 -->
				<div class="flex items-center">
					<span class="text-2xl">🐾</span>
					<h1 class="ml-2 text-xl font-bold text-gray-900 dark:text-white">복슬이네</h1>
				</div>

				<!-- 헤더 버튼들 -->
				<div class="flex items-center space-x-4">
					<!-- 다크모드 토글 -->
					<Button variant="ghost" size="icon" onclick={toggleDarkMode}>
						{#if isDarkMode}
							<span class="text-lg">☀️</span>
						{:else}
							<span class="text-lg">🌙</span>
						{/if}
					</Button>

					<!-- 사용자 메뉴 드롭다운 -->
					<Dropdown {dropdownItems}>
						{#snippet trigger(triggerAction)}
							<Button variant="outline" onclick={triggerAction}>
								사용자 메뉴
							</Button>
						{/snippet}
					</Dropdown>
				</div>
			</div>
		</div>
	</header>

	<!-- 메인 컨텐츠 -->
	<main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
		<!-- 환영 메시지 -->
		<div class="text-center mb-12">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
				복슬이네에 오신 것을 환영합니다! 🎉
			</h2>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
				Melt UI + Tailwind CSS로 새롭게 구축된 복슬홈피입니다.
			</p>
			
			<!-- 다이얼로그 데모 -->
			<Dialog title="복슬홈피 소개">
				{#snippet trigger(triggerAction)}
					<Button onclick={triggerAction}>
						소개 보기
					</Button>
				{/snippet}
				
				<div class="space-y-4">
					<p>복슬홈피는 개인 홈페이지 프로젝트입니다.</p>
					<p>Svelte + Melt UI + Tailwind CSS로 구축되었습니다.</p>
					<ul class="text-left space-y-2">
						<li>• 게시판 시스템</li>
						<li>• 지식 관리</li>
						<li>• 노트 및 메모</li>
						<li>• 인맥 관리</li>
						<li>• 유틸리티 기능</li>
					</ul>
				</div>
			</Dialog>
		</div>

		<!-- 메뉴 카드들 -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each menuItems as menu}
				<Card title={menu.name} class="hover:shadow-lg transition-shadow cursor-pointer">
					<div class="text-center">
						<div class="text-4xl mb-4">{menu.icon}</div>
						<p class="text-gray-600 dark:text-gray-300 mb-4">
							{menu.description}
						</p>
						<Button variant="outline" size="sm">
							{menu.name} 보기
						</Button>
					</div>
				</Card>
			{/each}
		</div>

		<!-- 기능 데모 섹션 -->
		<div class="mt-16">
			<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
				UI 컴포넌트 데모
			</h3>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
				<!-- 버튼 데모 -->
				<Card title="버튼 변형">
					<div class="space-y-4">
						<div class="flex flex-wrap gap-2">
							<Button>기본 버튼</Button>
							<Button variant="secondary">보조 버튼</Button>
							<Button variant="outline">아웃라인</Button>
							<Button variant="ghost">고스트</Button>
							<Button variant="destructive">삭제</Button>
						</div>
						<div class="flex flex-wrap gap-2">
							<Button size="sm">작은 버튼</Button>
							<Button size="default">기본 크기</Button>
							<Button size="lg">큰 버튼</Button>
						</div>
					</div>
				</Card>

				<!-- 상태 데모 -->
				<Card title="상태 관리">
					<div class="space-y-4">
						<p class="text-sm text-gray-600 dark:text-gray-300">
							현재 테마: <span class="font-semibold">{isDarkMode ? '다크 모드' : '라이트 모드'}</span>
						</p>
						<div class="flex gap-2">
							<Button onclick={() => isDarkMode = false} variant={!isDarkMode ? 'default' : 'outline'} size="sm">
								라이트
							</Button>
							<Button onclick={() => isDarkMode = true} variant={isDarkMode ? 'default' : 'outline'} size="sm">
								다크
							</Button>
						</div>
						<p class="text-xs text-gray-500 dark:text-gray-400">
							Melt UI의 상태 관리와 Tailwind의 다크모드가 완벽하게 연동됩니다.
						</p>
					</div>
				</Card>
			</div>
		</div>
	</main>

	<!-- 푸터 -->
	<footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
		<div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
			<div class="text-center text-gray-600 dark:text-gray-300">
				<p>© 2024 복슬이네. Melt UI + Tailwind CSS로 구축되었습니다.</p>
			</div>
		</div>
	</footer>
</div>