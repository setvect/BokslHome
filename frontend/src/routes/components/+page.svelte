<script lang="ts">
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>UI 컴포넌트 스타일가이드 - 복슬홈</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="container mx-auto py-8 px-4">
		<!-- 헤더 섹션 -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				🎨 UI 컴포넌트 스타일가이드
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300 mb-2">
				복슬홈 프로젝트의 일관된 UI 컴포넌트 라이브러리
			</p>
			<p class="text-sm text-gray-500 dark:text-gray-400">
				SvelteKit + Tailwind CSS 4.x + Melt UI 기반
			</p>
		</div>

		<!-- 컴포넌트 카테고리 그리드 -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
			
			<!-- 기본 컴포넌트 -->
			<Card>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
							<span class="text-2xl">🔘</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">기본 컴포넌트</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">Basic Components</p>
						</div>
					</div>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						버튼, 입력 필드, 체크박스 등 가장 기본이 되는 UI 요소들
					</p>
					<ul class="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
						<li>• Button (Primary, Secondary, Outline 등)</li>
						<li>• Input (Text, Email, Password 등)</li>
						<li>• Checkbox, Radio, Switch</li>
						<li>• Select, Textarea</li>
					</ul>
					<a 
						href="/components/basic" 
						class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
					>
						보기 
						<svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</Card>

			<!-- 레이아웃 컴포넌트 -->
			<Card>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
							<span class="text-2xl">📐</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">레이아웃 컴포넌트</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">Layout Components</p>
						</div>
					</div>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						페이지 구조와 콘텐츠 배치를 위한 레이아웃 컴포넌트들
					</p>
					<ul class="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
						<li>• Card (기본, 그림자, 테두리 등)</li>
						<li>• Container, Section</li>
						<li>• Grid, Flex 레이아웃</li>
						<li>• Divider, Spacer</li>
					</ul>
					<a 
						href="/components/layout" 
						class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
					>
						보기 
						<svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</Card>

			<!-- 피드백 컴포넌트 -->
			<Card>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-4">
							<span class="text-2xl">💬</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">피드백 컴포넌트</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">Feedback Components</p>
						</div>
					</div>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						사용자와의 상호작용과 피드백을 제공하는 컴포넌트들
					</p>
					<ul class="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
						<li>• Dialog, Modal</li>
						<li>• Alert (Success, Warning, Error)</li>
						<li>• Toast, Notification</li>
						<li>• Loading, Progress</li>
					</ul>
					<a 
						href="/components/feedback" 
						class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
					>
						보기 
						<svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</Card>

			<!-- 네비게이션 컴포넌트 -->
			<Card>
				<div class="p-6">
					<div class="flex items-center mb-4">
						<div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-4">
							<span class="text-2xl">🧭</span>
						</div>
						<div>
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">네비게이션 컴포넌트</h3>
							<p class="text-sm text-gray-500 dark:text-gray-400">Navigation Components</p>
						</div>
					</div>
					<p class="text-gray-600 dark:text-gray-300 mb-4">
						페이지 이동과 메뉴 구성을 위한 네비게이션 컴포넌트들
					</p>
					<ul class="text-sm text-gray-500 dark:text-gray-400 mb-4 space-y-1">
						<li>• Dropdown, Menu</li>
						<li>• Navbar, Sidebar</li>
						<li>• Breadcrumb, Pagination</li>
						<li>• Tabs, Steps</li>
					</ul>
					<a 
						href="/components/navigation" 
						class="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
					>
						보기 
						<svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
						</svg>
					</a>
				</div>
			</Card>

		</div>

		<!-- 사용 가이드라인 섹션 -->
		<div class="mt-12">
			<Card>
				<div class="p-6">
					<h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
						📋 사용 가이드라인
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
						<div>
							<h3 class="font-medium text-gray-900 dark:text-white mb-2">🎨 디자인 원칙</h3>
							<ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
								<li>• 일관된 색상 및 타이포그래피</li>
								<li>• 접근성을 고려한 디자인</li>
								<li>• 반응형 웹 지원</li>
							</ul>
						</div>
						<div>
							<h3 class="font-medium text-gray-900 dark:text-white mb-2">⚙️ 기술 스택</h3>
							<ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
								<li>• SvelteKit + TypeScript</li>
								<li>• Tailwind CSS 4.x</li>
								<li>• Melt UI (헤드리스 UI)</li>
							</ul>
						</div>
						<div>
							<h3 class="font-medium text-gray-900 dark:text-white mb-2">📖 컴포넌트 규칙</h3>
							<ul class="text-sm text-gray-600 dark:text-gray-300 space-y-1">
								<li>• Props 타입 명시</li>
								<li>• 한국어 주석 작성</li>
								<li>• Dark 모드 지원</li>
							</ul>
						</div>
					</div>
				</div>
			</Card>
		</div>

		<!-- 네비게이션 -->
		<div class="mt-8 flex justify-center">
			<a 
				href="/" 
				class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				홈으로 돌아가기
			</a>
		</div>
	</div>
</div>
