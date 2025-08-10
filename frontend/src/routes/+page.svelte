<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';

	// 폼 데이터
	let name = $state('');
	let email = $state('');
	let password = $state('');
	let message = $state('');
	let isChecked = $state(false);
	let selectedOption = $state('option1');
	let count = $state(0);

	// 폼 제출 함수
	function handleSubmit() {
		alert(`폼 제출!\n이름: ${name}\n이메일: ${email}\n메시지: ${message}\n체크: ${isChecked}\n선택: ${selectedOption}`);
	}

	// 카운터 함수들
	function increment() {
		count++;
	}

	function decrement() {
		count--;
	}

	function reset() {
		count = 0;
		name = '';
		email = '';
		password = '';
		message = '';
		isChecked = false;
		selectedOption = 'option1';
	}
</script>

<svelte:head>
	<title>Hello World - 샘플 페이지</title>
</svelte:head>

<div class="min-h-screen bg-gray-50 dark:bg-gray-900">
	<div class="container mx-auto py-8 px-4">
		<!-- Hello World 섹션 -->
		<div class="text-center mb-12">
			<h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
				👋 Hello World!
			</h1>
			<p class="text-lg text-gray-600 dark:text-gray-300">
				SvelteKit + Tailwind CSS 4.x + Melt UI 샘플 페이지입니다.
			</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
			<!-- 버튼 예시 섹션 -->
			<Card title="🔘 버튼 예시">
				<div class="space-y-4">
					<div class="flex flex-wrap gap-2">
						<Button onclick={increment}>카운트 증가</Button>
						<Button variant="secondary" onclick={decrement}>카운트 감소</Button>
						<Button variant="destructive" onclick={reset}>리셋</Button>
					</div>
					
					<div class="flex flex-wrap gap-2">
						<Button variant="outline" size="sm">작은 버튼</Button>
						<Button variant="ghost" size="default">중간 버튼</Button>
						<Button variant="outline" size="lg">큰 버튼</Button>
					</div>

					<div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
						<p class="text-center text-xl font-semibold">
							카운터: <span class="text-blue-600 dark:text-blue-400">{count}</span>
						</p>
					</div>
				</div>
			</Card>

			<!-- 폼 입력 예시 섹션 -->
			<Card title="📝 폼 입력 예시">
				<form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }} class="space-y-4">
					<!-- 텍스트 입력 -->
					<div>
						<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							이름
						</label>
						<input
							id="name"
							type="text"
							bind:value={name}
							placeholder="이름을 입력하세요"
							class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						/>
					</div>

					<!-- 이메일 입력 -->
					<div>
						<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							이메일
						</label>
						<input
							id="email"
							type="email"
							bind:value={email}
							placeholder="email@example.com"
							class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						/>
					</div>

					<!-- 비밀번호 입력 -->
					<div>
						<label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							비밀번호
						</label>
						<input
							id="password"
							type="password"
							bind:value={password}
							placeholder="비밀번호를 입력하세요"
							class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						/>
					</div>

					<!-- 셀렉트 박스 -->
					<div>
						<label for="select" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							옵션 선택
						</label>
						<select
							id="select"
							bind:value={selectedOption}
							class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						>
							<option value="option1">옵션 1</option>
							<option value="option2">옵션 2</option>
							<option value="option3">옵션 3</option>
						</select>
					</div>

					<!-- 텍스트 영역 -->
					<div>
						<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
							메시지
						</label>
						<textarea
							id="message"
							bind:value={message}
							placeholder="메시지를 입력하세요..."
							rows="3"
							class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
						></textarea>
					</div>

					<!-- 체크박스 -->
					<div class="flex items-center">
						<input
							id="checkbox"
							type="checkbox"
							bind:checked={isChecked}
							class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
						/>
						<label for="checkbox" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
							동의합니다
						</label>
					</div>

					<!-- 제출 버튼 -->
					<Button onclick={handleSubmit} class="w-full">
						폼 제출하기
					</Button>
				</form>
			</Card>
		</div>

		<!-- 현재 상태 표시 -->
		<Card title="📊 현재 상태" class="mt-8">
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div class="space-y-2">
					<p><strong>이름:</strong> {name || '(입력 안됨)'}</p>
					<p><strong>이메일:</strong> {email || '(입력 안됨)'}</p>
					<p><strong>체크박스:</strong> {isChecked ? '체크됨' : '체크 안됨'}</p>
				</div>
				<div class="space-y-2">
					<p><strong>선택된 옵션:</strong> {selectedOption}</p>
					<p><strong>카운터:</strong> {count}</p>
					<p><strong>메시지 길이:</strong> {message.length}자</p>
				</div>
			</div>
		</Card>

		<!-- 기술 정보 -->
		<div class="mt-8 text-center">
			<div class="inline-flex items-center space-x-4 px-6 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
				<span class="text-sm text-gray-600 dark:text-gray-300">
					🚀 SvelteKit 2.27.3
				</span>
				<span class="text-sm text-gray-600 dark:text-gray-300">
					🎨 Tailwind CSS 4.1.11
				</span>
				<span class="text-sm text-gray-600 dark:text-gray-300">
					🔧 Melt UI 0.86.6
				</span>
			</div>
		</div>
	</div>
</div>