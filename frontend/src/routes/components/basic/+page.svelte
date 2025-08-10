<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';

	// 폼 상태
	let textValue = $state('');
	let emailValue = $state('');
	let passwordValue = $state('');
	let numberValue = $state(0);
	let selectValue = $state('option1');
	let textareaValue = $state('');
	let checkboxValue = $state(false);
	let radioValue = $state('radio1');
	let rangeValue = $state(50);
</script>

<svelte:head>
	<title>기본 컴포넌트 - UI 스타일가이드</title>
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
				<span class="text-gray-900 dark:text-white">기본 컴포넌트</span>
			</nav>
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white">🔘 기본 컴포넌트</h1>
			<p class="text-gray-600 dark:text-gray-300 mt-2">
				버튼, 입력 필드, 체크박스 등 가장 기본이 되는 UI 요소들을 확인하세요.
			</p>
		</div>

		<div class="space-y-8">
			
			<!-- 버튼 컴포넌트 -->
			<Card title="🔘 Button 컴포넌트">
				<div class="space-y-6">
					
					<!-- 버튼 variants -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Variants (변형)</h3>
						<div class="flex flex-wrap gap-3 mb-4">
							<Button>Primary 버튼</Button>
							<Button variant="secondary">Secondary 버튼</Button>
							<Button variant="outline">Outline 버튼</Button>
							<Button variant="ghost">Ghost 버튼</Button>
							<Button variant="destructive">Destructive 버튼</Button>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;Button&gt;Primary 버튼&lt;/Button&gt;
&lt;Button variant="secondary"&gt;Secondary 버튼&lt;/Button&gt;
&lt;Button variant="outline"&gt;Outline 버튼&lt;/Button&gt;</code></pre>
						</div>
					</div>

					<!-- 버튼 sizes -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">Sizes (크기)</h3>
						<div class="flex flex-wrap items-center gap-3 mb-4">
							<Button size="sm">작은 버튼</Button>
							<Button size="default">기본 버튼</Button>
							<Button size="lg">큰 버튼</Button>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;Button size="sm"&gt;작은 버튼&lt;/Button&gt;
&lt;Button size="default"&gt;기본 버튼&lt;/Button&gt;
&lt;Button size="lg"&gt;큰 버튼&lt;/Button&gt;</code></pre>
						</div>
					</div>

					<!-- 버튼 상태 -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">States (상태)</h3>
						<div class="flex flex-wrap gap-3 mb-4">
							<Button>일반 상태</Button>
							<Button disabled>비활성화됨</Button>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;Button&gt;일반 상태&lt;/Button&gt;
&lt;Button disabled&gt;비활성화됨&lt;/Button&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- 입력 필드 컴포넌트 -->
			<Card title="📝 Input 컴포넌트">
				<div class="space-y-6">
					
					<!-- 기본 입력 필드들 -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">기본 입력 필드</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label for="text-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									텍스트 입력
								</label>
								<input
									id="text-input"
									type="text"
									bind:value={textValue}
									placeholder="텍스트를 입력하세요"
									class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
							</div>
							<div>
								<label for="email-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									이메일 입력
								</label>
								<input
									id="email-input"
									type="email"
									bind:value={emailValue}
									placeholder="email@example.com"
									class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
							</div>
							<div>
								<label for="password-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									비밀번호 입력
								</label>
								<input
									id="password-input"
									type="password"
									bind:value={passwordValue}
									placeholder="비밀번호를 입력하세요"
									class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
							</div>
							<div>
								<label for="number-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									숫자 입력
								</label>
								<input
									id="number-input"
									type="number"
									bind:value={numberValue}
									placeholder="숫자를 입력하세요"
									class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								/>
							</div>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;input
  type="text"
  placeholder="텍스트를 입력하세요"
  class="w-full px-3 py-2 border border-gray-300..."
/&gt;</code></pre>
						</div>
					</div>

					<!-- 입력 상태 표시 -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">현재 입력 값</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div class="space-y-2">
								<p class="text-sm"><strong>텍스트:</strong> {textValue || '(비어있음)'}</p>
								<p class="text-sm"><strong>이메일:</strong> {emailValue || '(비어있음)'}</p>
							</div>
							<div class="space-y-2">
								<p class="text-sm"><strong>비밀번호 길이:</strong> {passwordValue.length}자</p>
								<p class="text-sm"><strong>숫자:</strong> {numberValue}</p>
							</div>
						</div>
					</div>
				</div>
			</Card>

			<!-- Select 컴포넌트 -->
			<Card title="🔽 Select 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">드롭다운 선택</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label for="select-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									옵션 선택
								</label>
								<select
									id="select-input"
									bind:value={selectValue}
									class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
								>
									<option value="option1">옵션 1</option>
									<option value="option2">옵션 2</option>
									<option value="option3">옵션 3</option>
									<option value="option4">옵션 4</option>
								</select>
							</div>
							<div class="flex items-end">
								<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg w-full">
									<p class="text-sm">선택된 값: <strong>{selectValue}</strong></p>
								</div>
							</div>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;select bind:value={selectValue} class="w-full px-3 py-2..."&gt;
  &lt;option value="option1"&gt;옵션 1&lt;/option&gt;
  &lt;option value="option2"&gt;옵션 2&lt;/option&gt;
&lt;/select&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Textarea 컴포넌트 -->
			<Card title="📄 Textarea 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">텍스트 영역</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label for="textarea-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									긴 텍스트 입력
								</label>
								<textarea
									id="textarea-input"
									bind:value={textareaValue}
									placeholder="여러 줄의 텍스트를 입력하세요..."
									rows="4"
									class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-vertical"
								></textarea>
							</div>
							<div class="flex items-center">
								<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg w-full h-fit">
									<p class="text-sm mb-2">입력된 내용:</p>
									<div class="text-sm text-gray-600 dark:text-gray-300 max-h-20 overflow-y-auto">
										{textareaValue || '(비어있음)'}
									</div>
									<p class="text-xs text-gray-500 mt-2">길이: {textareaValue.length}자</p>
								</div>
							</div>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;textarea
  bind:value={textareaValue}
  rows="4"
  class="w-full px-3 py-2 border..."
&gt;&lt;/textarea&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Checkbox & Radio 컴포넌트 -->
			<Card title="☑️ Checkbox & Radio 컴포넌트">
				<div class="space-y-6">
					
					<!-- Checkbox -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">체크박스</h3>
						<div class="space-y-3 mb-4">
							<div class="flex items-center">
								<input
									id="checkbox-main"
									type="checkbox"
									bind:checked={checkboxValue}
									class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label for="checkbox-main" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
									메인 체크박스 (현재: {checkboxValue ? '체크됨' : '체크 안됨'})
								</label>
							</div>
							<div class="flex items-center">
								<input
									id="checkbox-2"
									type="checkbox"
									class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label for="checkbox-2" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
									추가 체크박스 옵션
								</label>
							</div>
							<div class="flex items-center">
								<input
									id="checkbox-3"
									type="checkbox"
									disabled
									class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
								/>
								<label for="checkbox-3" class="ml-2 block text-sm text-gray-500">
									비활성화된 체크박스
								</label>
							</div>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;input
  type="checkbox"
  bind:checked={checkboxValue}
  class="h-4 w-4 text-blue-600..."
/&gt;</code></pre>
						</div>
					</div>

					<!-- Radio buttons -->
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">라디오 버튼</h3>
						<div class="space-y-3 mb-4">
							<div class="flex items-center">
								<input
									id="radio-1"
									name="radio-group"
									type="radio"
									value="radio1"
									bind:group={radioValue}
									class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
								/>
								<label for="radio-1" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
									라디오 옵션 1
								</label>
							</div>
							<div class="flex items-center">
								<input
									id="radio-2"
									name="radio-group"
									type="radio"
									value="radio2"
									bind:group={radioValue}
									class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
								/>
								<label for="radio-2" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
									라디오 옵션 2
								</label>
							</div>
							<div class="flex items-center">
								<input
									id="radio-3"
									name="radio-group"
									type="radio"
									value="radio3"
									bind:group={radioValue}
									class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
								/>
								<label for="radio-3" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
									라디오 옵션 3
								</label>
							</div>
						</div>
						<div class="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
							<p class="text-sm">선택된 값: <strong>{radioValue}</strong></p>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;input
  name="radio-group"
  type="radio" 
  value="radio1"
  bind:group={radioValue}
/&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

			<!-- Range 컴포넌트 -->
			<Card title="🎚️ Range 컴포넌트">
				<div class="space-y-6">
					<div>
						<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-3">범위 슬라이더</h3>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							<div>
								<label for="range-input" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
									값 선택 (0-100)
								</label>
								<input
									id="range-input"
									type="range"
									bind:value={rangeValue}
									min="0"
									max="100"
									class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
								/>
								<div class="flex justify-between text-xs text-gray-500 mt-1">
									<span>0</span>
									<span>50</span>
									<span>100</span>
								</div>
							</div>
							<div class="flex items-center">
								<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg w-full text-center">
									<div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
										{rangeValue}
									</div>
									<div class="text-sm text-gray-500">현재 값</div>
								</div>
							</div>
						</div>
						<div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
							<pre class="text-sm text-gray-700 dark:text-gray-300"><code>&lt;input
  type="range"
  bind:value={rangeValue}
  min="0"
  max="100"
  class="w-full h-2 bg-gray-200..."
/&gt;</code></pre>
						</div>
					</div>
				</div>
			</Card>

		</div>

		<!-- 네비게이션 -->
		<div class="mt-8 flex justify-between">
			<a 
				href="/components" 
				class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium transition-colors"
			>
				<svg class="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
				</svg>
				컴포넌트 메인
			</a>
			<a 
				href="/components/layout" 
				class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
			>
				다음: 레이아웃 컴포넌트
				<svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
				</svg>
			</a>
		</div>
	</div>
</div>
