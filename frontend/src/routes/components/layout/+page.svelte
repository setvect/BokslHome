<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
	<title>레이아웃 컴포넌트 - UI 스타일가이드</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="container mx-auto py-8 px-4">
		
		<!-- 브레드크럼 + 헤더 -->
		<div class="mb-8">
			<nav class="text-sm text-gray-500 dark:text-gray-400 mb-4">
				<a href="/" class="hover:text-gray-700 dark:hover:text-gray-300">홈</a>
				<span class="mx-2">/</span>
				<a href="/components" class="hover:text-gray-700 dark:hover:text-gray-300">컴포넌트</a>
				<span class="mx-2">/</span>
				<span class="text-gray-900 dark:text-white">레이아웃 컴포넌트</span>
			</nav>
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">📐 레이아웃 컴포넌트</h1>
			<p class="text-gray-600 dark:text-gray-300 mt-2">
				페이지 구조와 콘텐츠 배치를 위한 레이아웃 컴포넌트들을 확인하세요.
			</p>
		</div>

		<div class="space-y-8">
			
			<!-- Card 컴포넌트 -->
			<Card title="🃏 Card 컴포넌트">
				<div class="space-y-6">
					
					<!-- 기본 카드 -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">기본 카드</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
							
							<!-- 간단한 카드 -->
							<Card>
								<div class="p-4">
									<h4 class="font-semibold text-gray-900 dark:text-white mb-2">간단한 카드</h4>
									<p class="text-gray-600 dark:text-gray-300 text-sm">
										제목 없이 내용만 담긴 기본 카드입니다.
									</p>
								</div>
							</Card>

							<!-- 제목이 있는 카드 -->
							<Card title="제목이 있는 카드">
								<div class="p-4">
									<p class="text-gray-600 dark:text-gray-300 text-sm">
										제목이 포함된 카드로 구조화된 콘텐츠에 유용합니다.
									</p>
								</div>
							</Card>

							<!-- 액션 버튼이 있는 카드 -->
							<Card title="액션 카드">
								<div class="p-4">
									<p class="text-gray-600 dark:text-gray-300 text-sm mb-4">
										버튼과 함께 사용하는 카드입니다.
									</p>
									<Button size="sm">액션 버튼</Button>
								</div>
							</Card>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;Card title="카드 제목"&gt;
  &lt;div class="p-4"&gt;
    &lt;p&gt;카드 내용&lt;/p&gt;
  &lt;/div&gt;
&lt;/Card&gt;</code></pre>
						</div>
					</div>

					<!-- 다양한 카드 스타일 -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">다양한 활용 예시</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							
							<!-- 통계 카드 -->
							<Card>
								<div class="p-6">
									<div class="flex items-center">
										<div class="flex-shrink-0">
											<div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
												<span class="text-blue-600 dark:text-blue-400 text-sm">👥</span>
											</div>
										</div>
										<div class="ml-4">
											<p class="text-sm font-medium text-gray-500 dark:text-gray-400">전체 사용자</p>
											<p class="text-2xl font-semibold text-gray-900 dark:text-white">1,247</p>
										</div>
									</div>
									<div class="mt-4">
										<div class="flex items-center text-sm">
											<span class="text-green-600 dark:text-green-400">↗ +12%</span>
											<span class="text-gray-500 dark:text-gray-400 ml-2">지난 주 대비</span>
										</div>
									</div>
								</div>
							</Card>

							<!-- 프로필 카드 -->
							<Card>
								<div class="p-6">
									<div class="flex items-center">
										<div class="flex-shrink-0">
											<div class="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
												<span class="text-gray-600 dark:text-gray-300">👤</span>
											</div>
										</div>
										<div class="ml-4 flex-1">
											<h4 class="text-lg font-medium text-gray-900 dark:text-white">김복슬</h4>
											<p class="text-sm text-gray-500 dark:text-gray-400">개발자</p>
										</div>
									</div>
									<div class="mt-4 flex space-x-2">
										<Button size="sm" variant="outline">프로필</Button>
										<Button size="sm" variant="ghost">메시지</Button>
									</div>
								</div>
							</Card>
							
						</div>
					</div>
				</div>
			</Card>

			<!-- Container 컴포넌트 -->
			<Card title="📦 Container 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">다양한 컨테이너 크기</h3>
						<div class="space-y-4 mb-4">
							
							<!-- 작은 컨테이너 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">작은 컨테이너 (max-w-md)</p>
								<div class="max-w-md mx-auto">
									<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
										<p class="text-center text-blue-800 dark:text-blue-200 text-sm">
											좁은 콘텐츠를 위한 작은 컨테이너입니다.
										</p>
									</div>
								</div>
							</div>

							<!-- 중간 컨테이너 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">중간 컨테이너 (max-w-2xl)</p>
								<div class="max-w-2xl mx-auto">
									<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
										<p class="text-center text-green-800 dark:text-green-200 text-sm">
											일반적인 콘텐츠를 위한 중간 크기 컨테이너입니다.
										</p>
									</div>
								</div>
							</div>

							<!-- 큰 컨테이너 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">큰 컨테이너 (max-w-6xl)</p>
								<div class="max-w-6xl mx-auto">
									<div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
										<p class="text-center text-purple-800 dark:text-purple-200 text-sm">
											넓은 레이아웃을 위한 큰 컨테이너입니다.
										</p>
									</div>
								</div>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;div class="container mx-auto"&gt;...&lt;/div&gt;
&lt;div class="max-w-md mx-auto"&gt;...&lt;/div&gt;
&lt;div class="max-w-2xl mx-auto"&gt;...&lt;/div&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Grid 레이아웃 -->
			<Card title="🔳 Grid 레이아웃">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">반응형 그리드</h3>
						<div class="mb-4">
							
							<!-- 2열 그리드 -->
							<div class="mb-6">
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">2열 그리드</p>
								<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
										<span class="text-blue-800 dark:text-blue-200 text-sm">그리드 아이템 1</span>
									</div>
									<div class="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
										<span class="text-blue-800 dark:text-blue-200 text-sm">그리드 아이템 2</span>
									</div>
								</div>
							</div>

							<!-- 3열 그리드 -->
							<div class="mb-6">
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">3열 그리드</p>
								<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
									<div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
										<span class="text-green-800 dark:text-green-200 text-sm">그리드 아이템 1</span>
									</div>
									<div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
										<span class="text-green-800 dark:text-green-200 text-sm">그리드 아이템 2</span>
									</div>
									<div class="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
										<span class="text-green-800 dark:text-green-200 text-sm">그리드 아이템 3</span>
									</div>
								</div>
							</div>

							<!-- 4열 그리드 -->
							<div class="mb-6">
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">4열 그리드</p>
								<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
									<div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
										<span class="text-purple-800 dark:text-purple-200 text-sm">아이템 1</span>
									</div>
									<div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
										<span class="text-purple-800 dark:text-purple-200 text-sm">아이템 2</span>
									</div>
									<div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
										<span class="text-purple-800 dark:text-purple-200 text-sm">아이템 3</span>
									</div>
									<div class="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
										<span class="text-purple-800 dark:text-purple-200 text-sm">아이템 4</span>
									</div>
								</div>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;div class="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
  &lt;div&gt;그리드 아이템 1&lt;/div&gt;
  &lt;div&gt;그리드 아이템 2&lt;/div&gt;
&lt;/div&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Flexbox 레이아웃 -->
			<Card title="↔️ Flexbox 레이아웃">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Flex 정렬 방식</h3>
						<div class="space-y-4 mb-4">
							
							<!-- Justify center -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">가로 중앙 정렬 (justify-center)</p>
								<div class="flex justify-center space-x-2 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
									<div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs">1</div>
									<div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs">2</div>
									<div class="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xs">3</div>
								</div>
							</div>

							<!-- Justify between -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">양끝 정렬 (justify-between)</p>
								<div class="flex justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
									<div class="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs">1</div>
									<div class="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs">2</div>
									<div class="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white text-xs">3</div>
								</div>
							</div>

							<!-- Items center -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">세로 중앙 정렬 (items-center)</p>
								<div class="flex items-center justify-center h-24 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
									<div class="px-4 py-2 bg-purple-500 text-white rounded">세로 중앙에 위치</div>
								</div>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;div class="flex justify-center space-x-2"&gt;...&lt;/div&gt;
&lt;div class="flex justify-between"&gt;...&lt;/div&gt;
&lt;div class="flex items-center justify-center"&gt;...&lt;/div&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Divider & Spacer -->
			<Card title="➖ Divider & Spacer">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">구분선과 여백</h3>
						<div class="space-y-6 mb-4">
							
							<!-- 수평 구분선 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">수평 구분선</p>
								<div class="space-y-2">
									<p class="text-sm">첫 번째 섹션</p>
									<hr class="border-gray-200 dark:border-gray-700" />
									<p class="text-sm">두 번째 섹션</p>
									<div class="border-t border-gray-300 dark:border-gray-600 my-4"></div>
									<p class="text-sm">세 번째 섹션</p>
								</div>
							</div>

							<!-- 여백 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">다양한 여백 크기</p>
								<div class="space-y-1">
									<div class="bg-orange-200 dark:bg-orange-800 p-2 rounded text-center text-sm">
										작은 여백 (space-y-1)
									</div>
									<div class="bg-orange-200 dark:bg-orange-800 p-2 rounded text-center text-sm">
										아이템 2
									</div>
								</div>
								<div class="space-y-4 mt-4">
									<div class="bg-red-200 dark:bg-red-800 p-2 rounded text-center text-sm">
										큰 여백 (space-y-4)
									</div>
									<div class="bg-red-200 dark:bg-red-800 p-2 rounded text-center text-sm">
										아이템 2
									</div>
								</div>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;hr class="border-gray-200 dark:border-gray-700" /&gt;
&lt;div class="border-t border-gray-300"&gt;&lt;/div&gt;
&lt;div class="space-y-4"&gt;...&lt;/div&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

		</div>

		<!-- 네비게이션 -->
		<div class="mt-8 flex justify-between">
			<a 
				href="/components/basic" 
				class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				이전: 기본 컴포넌트
			</a>
			<a 
				href="/components/feedback" 
				class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
			>
				다음: 피드백 컴포넌트
				<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</div>
