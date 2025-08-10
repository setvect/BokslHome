<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Button from '$lib/components/Button.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';

	// 탭 상태
	let activeTab = $state('tab1');

	// 브레드크럼 예시 데이터
	let breadcrumbs = [
		{ label: '홈', href: '/' },
		{ label: '프로젝트', href: '/projects' },
		{ label: '복슬홈', href: '/projects/bokslhome' },
		{ label: '설정', href: null } // 현재 페이지
	];

	// 페이지네이션 상태
	let currentPage = $state(1);
	let totalPages = 10;

	// 스텝 상태
	let currentStep = $state(2);
	let totalSteps = 4;

	// 드롭다운 아이템
	let dropdownItems = [
		{ label: '프로필 보기', action: () => alert('프로필 페이지로 이동') },
		{ label: '설정', action: () => alert('설정 페이지로 이동') },
		{ label: '로그아웃', action: () => alert('로그아웃 실행') }
	];

	// 탭 변경 함수
	function setTab(tabId: string) {
		activeTab = tabId;
	}

	// 페이지 변경 함수
	function goToPage(page: number) {
		if (page >= 1 && page <= totalPages) {
			currentPage = page;
		}
	}

	// 스텝 변경 함수
	function setStep(step: number) {
		if (step >= 1 && step <= totalSteps) {
			currentStep = step;
		}
	}
</script>

<svelte:head>
	<title>네비게이션 컴포넌트 - UI 스타일가이드</title>
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
				<span class="text-gray-900 dark:text-white">네비게이션 컴포넌트</span>
			</nav>
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">🧭 네비게이션 컴포넌트</h1>
			<p class="text-gray-600 dark:text-gray-300 mt-2">
				페이지 이동과 메뉴 구성을 위한 네비게이션 컴포넌트들을 확인하세요.
			</p>
		</div>

		<div class="space-y-8">
			
			<!-- Dropdown 컴포넌트 -->
			<Card title="🔽 Dropdown 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">드롭다운 메뉴</h3>
						<div class="flex flex-wrap gap-4 mb-4">
							
							<Dropdown items={dropdownItems}>
								{#snippet trigger()}
									<Button>사용자 메뉴</Button>
								{/snippet}
							</Dropdown>

							<Dropdown items={[
								{ label: '새 문서', action: () => alert('새 문서 생성') },
								{ label: '템플릿에서 생성', action: () => alert('템플릿 선택') },
								{ label: '파일 가져오기', action: () => alert('파일 선택') }
							]}>
								{#snippet trigger()}
									<Button variant="outline">+ 새로 만들기</Button>
								{/snippet}
							</Dropdown>

							<Dropdown items={[
								{ label: '이름순 정렬', action: () => alert('이름순 정렬 적용') },
								{ label: '날짜순 정렬', action: () => alert('날짜순 정렬 적용') },
								{ label: '크기순 정렬', action: () => alert('크기순 정렬 적용') }
							]}>
								{#snippet trigger()}
									<Button variant="ghost">
										정렬 옵션
										<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
										</svg>
									</Button>
								{/snippet}
							</Dropdown>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;Dropdown items={dropdownItems}&gt;
  &#123;#snippet trigger()&#125;
    &lt;Button&gt;메뉴 열기&lt;/Button&gt;
  &#123;/snippet&#125;
&lt;/Dropdown&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Breadcrumb 컴포넌트 -->
			<Card title="🍞 Breadcrumb 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">경로 탐색</h3>
						<div class="space-y-4 mb-4">
							
							<!-- 기본 브레드크럼 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">기본 브레드크럼</p>
								<nav class="flex" aria-label="브레드크럼">
									<ol class="flex items-center space-x-2">
										{#each breadcrumbs as item, index}
											<li class="flex items-center">
												{#if index > 0}
													<svg class="mx-2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
													</svg>
												{/if}
												{#if item.href}
													<a href={item.href} class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
														{item.label}
													</a>
												{:else}
													<span class="text-gray-500 dark:text-gray-400 text-sm">
														{item.label}
													</span>
												{/if}
											</li>
										{/each}
									</ol>
								</nav>
							</div>

							<!-- 다른 스타일의 브레드크럼 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">슬래시 구분자 사용</p>
								<nav class="flex" aria-label="브레드크럼">
									<ol class="flex items-center space-x-1">
										{#each breadcrumbs as item, index}
											{#if index > 0}
												<span class="text-gray-400 mx-2">/</span>
											{/if}
											<li>
												{#if item.href}
													<a href={item.href} class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm">
														{item.label}
													</a>
												{:else}
													<span class="text-gray-900 dark:text-white text-sm font-medium">
														{item.label}
													</span>
												{/if}
											</li>
										{/each}
									</ol>
								</nav>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;nav class="flex" aria-label="브레드크럼"&gt;
  &lt;ol class="flex items-center space-x-2"&gt;
    &#123;#each breadcrumbs as item, index&#125;
      &lt;li class="flex items-center"&gt;
        &#123;#if item.href&#125;
          &lt;a href={item.href}&gt;{item.label}&lt;/a&gt;
        &#123;:else&#125;
          &lt;span&gt;{item.label}&lt;/span&gt;
        &#123;/if&#125;
      &lt;/li&gt;
    &#123;/each&#125;
  &lt;/ol&gt;
&lt;/nav&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Tabs 컴포넌트 -->
			<Card title="📑 Tabs 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">탭 네비게이션</h3>
						<div class="mb-4">
							
							<!-- 탭 헤더 -->
							<div class="border-b border-gray-200 dark:border-gray-700">
								<nav class="-mb-px flex space-x-8" aria-label="탭">
									<button
										onclick={() => setTab('tab1')}
										class={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
											activeTab === 'tab1'
												? 'border-blue-500 text-blue-600 dark:text-blue-400'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
										}`}
									>
										일반 정보
									</button>
									<button
										onclick={() => setTab('tab2')}
										class={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
											activeTab === 'tab2'
												? 'border-blue-500 text-blue-600 dark:text-blue-400'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
										}`}
									>
										설정
									</button>
									<button
										onclick={() => setTab('tab3')}
										class={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
											activeTab === 'tab3'
												? 'border-blue-500 text-blue-600 dark:text-blue-400'
												: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
										}`}
									>
										고급 설정
									</button>
								</nav>
							</div>

							<!-- 탭 컨텐츠 -->
							<div class="mt-4">
								{#if activeTab === 'tab1'}
									<div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
										<h4 class="font-medium text-gray-900 dark:text-white mb-2">일반 정보</h4>
										<p class="text-sm text-gray-600 dark:text-gray-300">
											여기에 일반적인 정보와 기본 설정들이 표시됩니다. 사용자의 기본 프로필 정보나 계정 설정을 확인할 수 있습니다.
										</p>
									</div>
								{:else if activeTab === 'tab2'}
									<div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
										<h4 class="font-medium text-gray-900 dark:text-white mb-2">설정</h4>
										<p class="text-sm text-gray-600 dark:text-gray-300">
											여기에서 애플리케이션의 다양한 설정을 조정할 수 있습니다. 알림, 테마, 언어 등의 옵션을 변경할 수 있습니다.
										</p>
									</div>
								{:else if activeTab === 'tab3'}
									<div class="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
										<h4 class="font-medium text-gray-900 dark:text-white mb-2">고급 설정</h4>
										<p class="text-sm text-gray-600 dark:text-gray-300">
											고급 사용자를 위한 상세 설정 옵션들입니다. API 키 관리, 개발자 도구, 실험적 기능 등을 설정할 수 있습니다.
										</p>
									</div>
								{/if}
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;div class="border-b border-gray-200"&gt;
  &lt;nav class="-mb-px flex space-x-8"&gt;
    &lt;button
      onclick={() => setTab('tab1')}
      class={`py-2 px-1 border-b-2 font-medium text-sm ${
        activeTab === 'tab1' ? 'border-blue-500 text-blue-600' : '...'
      }`}
    &gt;
      탭 제목
    &lt;/button&gt;
  &lt;/nav&gt;
&lt;/div&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Pagination 컴포넌트 -->
			<Card title="📄 Pagination 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">페이지네이션</h3>
						<div class="space-y-4 mb-4">
							
							<!-- 기본 페이지네이션 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">기본 페이지네이션</p>
								<nav class="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3">
									<div class="flex flex-1 justify-between sm:hidden">
										<button
											onclick={() => goToPage(currentPage - 1)}
											disabled={currentPage <= 1}
											class="relative inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
										>
											이전
										</button>
										<button
											onclick={() => goToPage(currentPage + 1)}
											disabled={currentPage >= totalPages}
											class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
										>
											다음
										</button>
									</div>
									<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
										<div>
											<p class="text-sm text-gray-700 dark:text-gray-300">
												<span class="font-medium">{(currentPage - 1) * 10 + 1}</span>
												-
												<span class="font-medium">{Math.min(currentPage * 10, totalPages * 10)}</span>
												/ 총 
												<span class="font-medium">{totalPages * 10}</span>
												개 항목
											</p>
										</div>
										<div>
											<nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="페이지네이션">
												<button
													onclick={() => goToPage(currentPage - 1)}
													disabled={currentPage <= 1}
													class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													<span class="sr-only">이전</span>
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
														<path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
													</svg>
												</button>
												
												{#each Array.from({length: Math.min(5, totalPages)}, (_, i) => i + Math.max(1, currentPage - 2)) as pageNum}
													{#if pageNum <= totalPages}
														<button
															onclick={() => goToPage(pageNum)}
															class={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
																pageNum === currentPage
																	? 'z-10 bg-blue-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
																	: 'text-gray-900 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0'
															}`}
														>
															{pageNum}
														</button>
													{/if}
												{/each}
												
												<button
													onclick={() => goToPage(currentPage + 1)}
													disabled={currentPage >= totalPages}
													class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 dark:ring-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													<span class="sr-only">다음</span>
													<svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
														<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
													</svg>
												</button>
											</nav>
										</div>
									</div>
								</nav>
							</div>

							<!-- 간단한 페이지네이션 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-2">간단한 페이지네이션</p>
								<div class="flex items-center justify-center space-x-2">
									<Button 
										size="sm" 
										variant="outline" 
										onclick={() => goToPage(currentPage - 1)}
										disabled={currentPage <= 1}
									>
										이전
									</Button>
									<span class="px-3 py-1 text-sm text-gray-600 dark:text-gray-300">
										{currentPage} / {totalPages}
									</span>
									<Button 
										size="sm" 
										variant="outline" 
										onclick={() => goToPage(currentPage + 1)}
										disabled={currentPage >= totalPages}
									>
										다음
									</Button>
								</div>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;nav class="flex items-center justify-between"&gt;
  &lt;button 
    onclick={() => goToPage(currentPage - 1)}
    disabled={currentPage <= 1}
  &gt;
    이전
  &lt;/button&gt;
  &lt;span&gt;{currentPage} / {totalPages}&lt;/span&gt;
  &lt;button 
    onclick={() => goToPage(currentPage + 1)}
    disabled={currentPage >= totalPages}
  &gt;
    다음
  &lt;/button&gt;
&lt;/nav&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Steps 컴포넌트 -->
			<Card title="👣 Steps 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">단계 표시</h3>
						<div class="space-y-6 mb-4">
							
							<!-- 가로 스텝 -->
							<div>
								<p class="text-sm text-gray-600 dark:text-gray-300 mb-4">가로 스텝 표시</p>
								<nav aria-label="단계">
									<ol class="flex items-center">
										{#each Array.from({length: totalSteps}, (_, i) => i + 1) as step}
											<li class={`relative ${step < totalSteps ? 'pr-8 sm:pr-20' : ''}`}>
												{#if step < totalSteps}
													<div class="absolute inset-0 flex items-center" aria-hidden="true">
														<div class={`h-0.5 w-full ${step < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'}`}></div>
													</div>
												{/if}
												<div class="relative flex h-8 w-8 items-center justify-center rounded-full {
													step < currentStep ? 'bg-blue-600' :
													step === currentStep ? 'border-2 border-blue-600 bg-white dark:bg-gray-800' :
													'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
												}">
													{#if step < currentStep}
														<svg class="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
															<path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
														</svg>
													{:else}
														<span class={`text-sm font-medium ${
															step === currentStep ? 'text-blue-600' : 'text-gray-500 dark:text-gray-400'
														}`}>
															{step}
														</span>
													{/if}
												</div>
												<span class={`mt-2 block text-xs font-medium ${
													step <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
												}`}>
													{step === 1 ? '계정 정보' :
													 step === 2 ? '개인 정보' :
													 step === 3 ? '확인' : '완료'}
												</span>
											</li>
										{/each}
									</ol>
								</nav>
							</div>

							<!-- 스텝 제어 버튼 -->
							<div class="flex justify-center space-x-4">
								<Button 
									size="sm" 
									variant="outline" 
									onclick={() => setStep(currentStep - 1)}
									disabled={currentStep <= 1}
								>
									이전 단계
								</Button>
								<Button 
									size="sm"
									onclick={() => setStep(currentStep + 1)}
									disabled={currentStep >= totalSteps}
								>
									다음 단계
								</Button>
							</div>

							<!-- 현재 단계 정보 -->
							<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
								<p class="text-sm text-gray-600 dark:text-gray-300">
									현재 단계: <strong>{currentStep}/{totalSteps}</strong> - 
									<span class="text-blue-600 dark:text-blue-400">
										{currentStep === 1 ? '계정 정보 입력' :
										 currentStep === 2 ? '개인 정보 입력' :
										 currentStep === 3 ? '입력 내용 확인' : '가입 완료'}
									</span>
								</p>
							</div>
							
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;nav aria-label="단계"&gt;
  &lt;ol class="flex items-center"&gt;
    &#123;#each steps as step&#125;
      &lt;li class="relative"&gt;
        &lt;div class={`flex h-8 w-8 items-center justify-center rounded-full ${
          step === currentStep ? 'border-2 border-blue-600' : '...'
        }`}&gt;
          {step}
        &lt;/div&gt;
      &lt;/li&gt;
    &#123;/each&#125;
  &lt;/ol&gt;
&lt;/nav&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

		</div>

		<!-- 네비게이션 -->
		<div class="mt-8 flex justify-between">
			<a 
				href="/components/feedback" 
				class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				이전: 피드백 컴포넌트
			</a>
			<a 
				href="/components" 
				class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
			>
				컴포넌트 메인으로
				<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</div>
