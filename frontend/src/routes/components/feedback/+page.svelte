<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Dialog from '$lib/components/Dialog.svelte';

	// Alert 상태
	let showSuccessAlert = $state(true);
	let showWarningAlert = $state(true);
	let showErrorAlert = $state(true);
	let showInfoAlert = $state(true);

	// Toast 상태 (시뮬레이션)
	let toastMessage = $state('');
	let toastType = $state<'success' | 'warning' | 'error' | 'info'>('success');
	let showToast = $state(false);

	// Progress 상태
	let progressValue = $state(45);
	let isLoading = $state(false);

	// 토스트 표시 함수
	function showToastMessage(message: string, type: 'success' | 'warning' | 'error' | 'info') {
		toastMessage = message;
		toastType = type;
		showToast = true;
		// 3초 후 자동 숨기기
		setTimeout(() => {
			showToast = false;
		}, 3000);
	}

	// 로딩 시뮬레이션
	function simulateLoading() {
		isLoading = true;
		setTimeout(() => {
			isLoading = false;
			showToastMessage('로딩이 완료되었습니다!', 'success');
		}, 2000);
	}
</script>

<svelte:head>
	<title>피드백 컴포넌트 - UI 스타일가이드</title>
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
				<span class="text-gray-900 dark:text-white">피드백 컴포넌트</span>
			</nav>
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">💬 피드백 컴포넌트</h1>
			<p class="text-gray-600 dark:text-gray-300 mt-2">
				사용자와의 상호작용과 피드백을 제공하는 컴포넌트들을 확인하세요.
			</p>
		</div>

		<div class="space-y-8">
			
			<!-- Dialog 컴포넌트 -->
			<Card title="🗨️ Dialog 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">대화상자 예시</h3>
						<div class="flex flex-wrap gap-3 mb-4">
							
							<Dialog title="알림 대화상자">
								{#snippet trigger()}
									<Button>기본 대화상자</Button>
								{/snippet}
								<div class="p-4">
									<p class="text-gray-600 dark:text-gray-300 mb-4">
										이것은 기본적인 대화상자입니다. 사용자에게 중요한 정보를 전달하거나 확인을 받을 때 사용합니다.
									</p>
									<div class="flex justify-end space-x-2">
										<Button variant="outline" size="sm">취소</Button>
										<Button size="sm">확인</Button>
									</div>
								</div>
							</Dialog>

							<Dialog title="확인 대화상자">
								{#snippet trigger()}
									<Button variant="destructive">삭제 확인</Button>
								{/snippet}
								<div class="p-4">
									<div class="flex items-center space-x-3 mb-4">
										<div class="flex-shrink-0">
											<div class="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
												<span class="text-red-600 dark:text-red-400">⚠️</span>
											</div>
										</div>
										<div>
											<h4 class="text-lg font-medium text-gray-900 dark:text-white">정말로 삭제하시겠습니까?</h4>
											<p class="text-sm text-gray-500 dark:text-gray-400">이 작업은 되돌릴 수 없습니다.</p>
										</div>
									</div>
									<div class="flex justify-end space-x-2">
										<Button variant="outline" size="sm">취소</Button>
										<Button variant="destructive" size="sm">삭제</Button>
									</div>
								</div>
							</Dialog>

							<Dialog title="폼 대화상자">
								{#snippet trigger()}
									<Button variant="outline">폼 대화상자</Button>
								{/snippet}
								<div class="p-4">
									<form class="space-y-4">
										<div>
											<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												이름
											</label>
											<input
												type="text"
												placeholder="이름을 입력하세요"
												class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											/>
										</div>
										<div>
											<label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
												메모
											</label>
											<textarea
												placeholder="메모를 입력하세요..."
												rows="3"
												class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
											></textarea>
										</div>
										<div class="flex justify-end space-x-2">
											<Button variant="outline" size="sm">취소</Button>
											<Button size="sm">저장</Button>
										</div>
									</form>
								</div>
							</Dialog>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;Dialog title="대화상자 제목"&gt;
  &#123;#snippet trigger()&#125;
    &lt;Button&gt;열기&lt;/Button&gt;
  &#123;/snippet&#125;
  &lt;div class="p-4"&gt;
    &lt;p&gt;대화상자 내용&lt;/p&gt;
  &lt;/div&gt;
&lt;/Dialog&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Alert 컴포넌트 -->
			<Card title="⚠️ Alert 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">다양한 알림 메시지</h3>
						<div class="space-y-4 mb-4">
							
							<!-- Success Alert -->
							{#if showSuccessAlert}
								<div class="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<span class="text-green-600 dark:text-green-400">✅</span>
										</div>
										<div>
											<h4 class="text-green-800 dark:text-green-200 font-medium">성공!</h4>
											<p class="text-green-700 dark:text-green-300 text-sm">작업이 성공적으로 완료되었습니다.</p>
										</div>
									</div>
									<button
										onclick={() => showSuccessAlert = false}
										class="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200"
									>
										<span class="sr-only">닫기</span>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</button>
								</div>
							{/if}

							<!-- Warning Alert -->
							{#if showWarningAlert}
								<div class="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<span class="text-yellow-600 dark:text-yellow-400">⚠️</span>
										</div>
										<div>
											<h4 class="text-yellow-800 dark:text-yellow-200 font-medium">주의!</h4>
											<p class="text-yellow-700 dark:text-yellow-300 text-sm">이 작업은 신중하게 진행해주세요.</p>
										</div>
									</div>
									<button
										onclick={() => showWarningAlert = false}
										class="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200"
									>
										<span class="sr-only">닫기</span>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</button>
								</div>
							{/if}

							<!-- Error Alert -->
							{#if showErrorAlert}
								<div class="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<span class="text-red-600 dark:text-red-400">❌</span>
										</div>
										<div>
											<h4 class="text-red-800 dark:text-red-200 font-medium">오류!</h4>
											<p class="text-red-700 dark:text-red-300 text-sm">작업을 처리하는 중에 문제가 발생했습니다.</p>
										</div>
									</div>
									<button
										onclick={() => showErrorAlert = false}
										class="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
									>
										<span class="sr-only">닫기</span>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</button>
								</div>
							{/if}

							<!-- Info Alert -->
							{#if showInfoAlert}
								<div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
									<div class="flex items-center space-x-3">
										<div class="flex-shrink-0">
											<span class="text-blue-600 dark:text-blue-400">ℹ️</span>
										</div>
										<div>
											<h4 class="text-blue-800 dark:text-blue-200 font-medium">정보</h4>
											<p class="text-blue-700 dark:text-blue-300 text-sm">새로운 기능이 추가되었습니다. 확인해보세요!</p>
										</div>
									</div>
									<button
										onclick={() => showInfoAlert = false}
										class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
									>
										<span class="sr-only">닫기</span>
										<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
										</svg>
									</button>
								</div>
							{/if}
							
						</div>
						<div class="flex gap-2 mb-4">
							<Button size="sm" variant="outline" onclick={() => showSuccessAlert = true}>성공 알림 표시</Button>
							<Button size="sm" variant="outline" onclick={() => showWarningAlert = true}>경고 알림 표시</Button>
							<Button size="sm" variant="outline" onclick={() => showErrorAlert = true}>에러 알림 표시</Button>
							<Button size="sm" variant="outline" onclick={() => showInfoAlert = true}>정보 알림 표시</Button>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;div class="p-4 bg-green-50 border border-green-200 rounded-lg"&gt;
  &lt;div class="flex items-center space-x-3"&gt;
    &lt;span class="text-green-600"&gt;✅&lt;/span&gt;
    &lt;div&gt;
      &lt;h4 class="text-green-800 font-medium"&gt;성공!&lt;/h4&gt;
      &lt;p class="text-green-700 text-sm"&gt;메시지 내용&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Toast 컴포넌트 -->
			<Card title="🍞 Toast 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">토스트 알림</h3>
						<div class="flex flex-wrap gap-2 mb-4">
							<Button size="sm" onclick={() => showToastMessage('성공 메시지입니다!', 'success')}>성공 토스트</Button>
							<Button size="sm" variant="outline" onclick={() => showToastMessage('경고 메시지입니다.', 'warning')}>경고 토스트</Button>
							<Button size="sm" variant="destructive" onclick={() => showToastMessage('오류가 발생했습니다.', 'error')}>에러 토스트</Button>
							<Button size="sm" variant="ghost" onclick={() => showToastMessage('정보 메시지입니다.', 'info')}>정보 토스트</Button>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>// 토스트 표시 함수
function showToast(message: string, type: 'success' | 'error') &#123;
  // 토스트 구현 로직
&#125;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Loading & Progress -->
			<Card title="⏳ Loading & Progress">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">로딩 및 진행률 표시</h3>
						<div class="space-y-6 mb-4">
							
							<!-- 기본 로딩 스피너 -->
							<div>
								<h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">로딩 스피너</h4>
								<div class="flex items-center space-x-4">
									<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
									<div class="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
									<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
									<span class="text-sm text-gray-600 dark:text-gray-300">로딩 중...</span>
								</div>
							</div>

							<!-- 진행률 표시줄 -->
							<div>
								<h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">진행률 표시줄</h4>
								<div class="space-y-3">
									<div>
										<div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
											<span>진행률</span>
											<span>{progressValue}%</span>
										</div>
										<div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
											<div 
												class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
												style="width: {progressValue}%"
											></div>
										</div>
									</div>
									<div class="flex gap-2">
										<Button size="sm" variant="outline" onclick={() => progressValue = Math.max(0, progressValue - 10)}>-10%</Button>
										<Button size="sm" variant="outline" onclick={() => progressValue = Math.min(100, progressValue + 10)}>+10%</Button>
										<Button size="sm" variant="ghost" onclick={() => progressValue = 0}>리셋</Button>
									</div>
								</div>
							</div>

							<!-- 다양한 색상의 진행률 -->
							<div>
								<h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">다양한 스타일</h4>
								<div class="space-y-2">
									<div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
										<div class="bg-green-600 h-2 rounded-full" style="width: 85%"></div>
									</div>
									<div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
										<div class="bg-yellow-600 h-2 rounded-full" style="width: 60%"></div>
									</div>
									<div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
										<div class="bg-red-600 h-2 rounded-full" style="width: 30%"></div>
									</div>
								</div>
							</div>

							<!-- 로딩 상태 시뮬레이션 -->
							<div>
								<h4 class="text-md font-medium text-gray-900 dark:text-white mb-2">로딩 시뮬레이션</h4>
								<div class="flex items-center space-x-4">
									<Button 
										onclick={simulateLoading} 
										disabled={isLoading}
									>
										{#if isLoading}
											<div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
											로딩 중...
										{:else}
											로딩 시작
										{/if}
									</Button>
									{#if isLoading}
										<span class="text-sm text-gray-600 dark:text-gray-300">데이터를 불러오는 중입니다...</span>
									{/if}
								</div>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;!-- 로딩 스피너 --&gt;
&lt;div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"&gt;&lt;/div&gt;

&lt;!-- 진행률 표시줄 --&gt;
&lt;div class="w-full bg-gray-200 rounded-full h-2"&gt;
  &lt;div class="bg-blue-600 h-2 rounded-full" style="width: 45%"&gt;&lt;/div&gt;
&lt;/div&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

		</div>

		<!-- 네비게이션 -->
		<div class="mt-8 flex justify-between">
			<a 
				href="/components/layout" 
				class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				이전: 레이아웃 컴포넌트
			</a>
			<a 
				href="/components/navigation" 
				class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
			>
				다음: 네비게이션 컴포넌트
				<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</div>

<!-- Toast 컴포넌트 (고정 위치) -->
{#if showToast}
	<div class="fixed top-4 right-4 z-50 transition-all duration-300 ease-in-out">
		<div class={`flex items-center p-4 rounded-lg shadow-lg ${
			toastType === 'success' ? 'bg-green-50 border border-green-200 dark:bg-green-900 dark:border-green-800' :
			toastType === 'warning' ? 'bg-yellow-50 border border-yellow-200 dark:bg-yellow-900 dark:border-yellow-800' :
			toastType === 'error' ? 'bg-red-50 border border-red-200 dark:bg-red-900 dark:border-red-800' :
			'bg-blue-50 border border-blue-200 dark:bg-blue-900 dark:border-blue-800'
		}`}>
			<div class="flex-shrink-0 mr-3">
				{#if toastType === 'success'}
					<span class="text-green-600 dark:text-green-400">✅</span>
				{:else if toastType === 'warning'}
					<span class="text-yellow-600 dark:text-yellow-400">⚠️</span>
				{:else if toastType === 'error'}
					<span class="text-red-600 dark:text-red-400">❌</span>
				{:else}
					<span class="text-blue-600 dark:text-blue-400">ℹ️</span>
				{/if}
			</div>
			<div class={`mr-3 ${
				toastType === 'success' ? 'text-green-800 dark:text-green-200' :
				toastType === 'warning' ? 'text-yellow-800 dark:text-yellow-200' :
				toastType === 'error' ? 'text-red-800 dark:text-red-200' :
				'text-blue-800 dark:text-blue-200'
			}`}>
				<p class="text-sm font-medium">{toastMessage}</p>
			</div>
			<button
				onclick={() => showToast = false}
				class={`${
					toastType === 'success' ? 'text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200' :
					toastType === 'warning' ? 'text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200' :
					toastType === 'error' ? 'text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200' :
					'text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200'
				}`}
			>
				<span class="sr-only">닫기</span>
				<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
				</svg>
			</button>
		</div>
	</div>
{/if}
