<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { ArrowLeft, Save, X } from '@lucide/svelte';
	import type { BoardManager } from '$lib/types/boardManager';
	import { createBoardManager, checkBoardCodeDuplicate } from '$lib/mock/api/boardManagerApi';

	// 폼 데이터
	let formData = $state<Omit<BoardManager, 'deleteF'>>({
		boardCode: '',
		name: '',
		uploadLimit: 1000,
		replyF: false,
		commentF: true,
		attachF: true,
		encryptF: false
	});

	// 상태 관리
	let loading = $state(false);
	let submitting = $state(false);
	let errors = $state<Record<string, string>>({});
	let boardCodeChecking = $state(false);
	let boardCodeChecked = $state(false);

	// 폼 검증
	function validateForm(): boolean {
		const newErrors: Record<string, string> = {};

		if (!formData.boardCode.trim()) {
			newErrors.boardCode = '게시판 코드를 입력해주세요.';
		} else if (!/^[A-Z0-9]+$/.test(formData.boardCode)) {
			newErrors.boardCode = '게시판 코드는 영문 대문자와 숫자만 사용할 수 있습니다.';
		} else if (formData.boardCode.length > 20) {
			newErrors.boardCode = '게시판 코드는 20자 이하로 입력해주세요.';
		} else if (!boardCodeChecked) {
			newErrors.boardCode = '게시판 코드 중복 확인을 해주세요.';
		}

		if (!formData.name.trim()) {
			newErrors.name = '게시판 이름을 입력해주세요.';
		} else if (formData.name.length > 100) {
			newErrors.name = '게시판 이름은 100자 이하로 입력해주세요.';
		}

		if (formData.uploadLimit < 0) {
			newErrors.uploadLimit = '업로드 용량제한은 0 이상이어야 합니다.';
		} else if (formData.uploadLimit > 1000000) {
			newErrors.uploadLimit = '업로드 용량제한은 1,000,000KB 이하로 설정해주세요.';
		}

		errors = newErrors;
		return Object.keys(newErrors).length === 0;
	}

	// 게시판 코드 중복 확인
	async function checkDuplicateCode() {
		if (!formData.boardCode.trim()) {
			errors = { ...errors, boardCode: '게시판 코드를 입력해주세요.' };
			return;
		}

		if (!/^[A-Z0-9]+$/.test(formData.boardCode)) {
			errors = { ...errors, boardCode: '게시판 코드는 영문 대문자와 숫자만 사용할 수 있습니다.' };
			return;
		}

		boardCodeChecking = true;
		try {
			const isDuplicate = await checkBoardCodeDuplicate(formData.boardCode);
			if (isDuplicate) {
				errors = { ...errors, boardCode: '이미 사용 중인 게시판 코드입니다.' };
				boardCodeChecked = false;
			} else {
				// 중복 확인 성공 시 에러 제거
				const { boardCode, ...restErrors } = errors;
				errors = restErrors;
				boardCodeChecked = true;
			}
		} catch (error) {
			console.error('게시판 코드 중복 확인 실패:', error);
			errors = { ...errors, boardCode: '게시판 코드 확인 중 오류가 발생했습니다.' };
			boardCodeChecked = false;
		} finally {
			boardCodeChecking = false;
		}
	}

	// 게시판 코드 변경 시 중복 확인 상태 초기화
	function handleBoardCodeChange() {
		boardCodeChecked = false;
		if (errors.boardCode) {
			const { boardCode, ...restErrors } = errors;
			errors = restErrors;
		}
	}

	// 폼 제출
	async function handleSubmit() {
		if (!validateForm()) {
			return;
		}

		submitting = true;
		try {
			await createBoardManager(formData);
			alert('게시판이 성공적으로 생성되었습니다.');
			goto('/board-manager');
		} catch (error) {
			console.error('게시판 생성 실패:', error);
			alert('게시판 생성 중 오류가 발생했습니다.');
		} finally {
			submitting = false;
		}
	}

	// 취소
	function handleCancel() {
		if (confirm('작성 중인 내용이 사라집니다. 정말로 취소하시겠습니까?')) {
			goto('/board-manager');
		}
	}
</script>

<div class="container mx-auto py-6 space-y-6">
	<!-- 페이지 제목 -->
	<div class="flex items-center gap-4">
		<Button variant="ghost" size="sm" onclick={() => goto('/board-manager')}>
			<ArrowLeft class="w-4 h-4" />
			목록으로
		</Button>
		<h1 class="text-2xl font-bold text-foreground">게시판 만들기</h1>
	</div>

	<!-- 폼 영역 -->
	<Card>
		<CardHeader>
			<CardTitle>게시판 정보</CardTitle>
		</CardHeader>
		<CardContent class="space-y-6">
			<!-- 게시판 코드 -->
			<div class="space-y-2">
				<Label for="boardCode">코드 <span class="text-red-500">*</span></Label>
				<div class="flex gap-2">
					<Input
						id="boardCode"
						bind:value={formData.boardCode}
						placeholder="게시판 코드 (영문 대문자, 숫자)"
						class="flex-1 {errors.boardCode ? 'border-red-500' : ''}"
						oninput={handleBoardCodeChange}
						disabled={submitting}
					/>
					<Button 
						variant="outline" 
						onclick={checkDuplicateCode}
						disabled={boardCodeChecking || !formData.boardCode.trim() || submitting}
						class="whitespace-nowrap"
					>
						{boardCodeChecking ? '확인 중...' : '중복 확인'}
					</Button>
				</div>
				{#if errors.boardCode}
					<p class="text-sm text-red-500">{errors.boardCode}</p>
				{:else if boardCodeChecked}
					<p class="text-sm text-green-600">사용 가능한 게시판 코드입니다.</p>
				{/if}
				<p class="text-sm text-foreground/60">영문 대문자와 숫자만 사용 가능 (최대 20자)</p>
			</div>

			<!-- 게시판 이름 -->
			<div class="space-y-2">
				<Label for="name">이름 <span class="text-red-500">*</span></Label>
				<Input
					id="name"
					bind:value={formData.name}
					placeholder="게시판 이름"
					class="{errors.name ? 'border-red-500' : ''}"
					disabled={submitting}
				/>
				{#if errors.name}
					<p class="text-sm text-red-500">{errors.name}</p>
				{/if}
			</div>

			<!-- 업로드 용량제한 -->
			<div class="space-y-2">
				<Label for="uploadLimit">업로드 용량제한 (KB)</Label>
				<Input
					id="uploadLimit"
					type="number"
					bind:value={formData.uploadLimit}
					min="0"
					max="1000000"
					class="{errors.uploadLimit ? 'border-red-500' : ''}"
					disabled={submitting}
				/>
				{#if errors.uploadLimit}
					<p class="text-sm text-red-500">{errors.uploadLimit}</p>
				{/if}
				<p class="text-sm text-foreground/60">0은 파일 업로드 비활성화, 최대 1,000,000KB</p>
			</div>

			<!-- 댓글 사용 -->
			<div class="space-y-3">
				<Label>댓글 사용</Label>
				<div class="flex items-center space-x-4">
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.replyF}
							value={true}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">예</span>
					</label>
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.replyF}
							value={false}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">아니오</span>
					</label>
				</div>
			</div>

			<!-- 파일 업로드 -->
			<div class="space-y-3">
				<Label>파일 업로드</Label>
				<div class="flex items-center space-x-4">
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.attachF}
							value={true}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">예</span>
					</label>
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.attachF}
							value={false}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">아니오</span>
					</label>
				</div>
			</div>

			<!-- 댓글 기능 -->
			<div class="space-y-3">
				<Label>댓글 기능</Label>
				<div class="flex items-center space-x-4">
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.commentF}
							value={true}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">예</span>
					</label>
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.commentF}
							value={false}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">아니오</span>
					</label>
				</div>
			</div>

			<!-- 암호화 글 등록 -->
			<div class="space-y-3">
				<Label>암호화 글 등록</Label>
				<div class="flex items-center space-x-4">
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.encryptF}
							value={true}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">예</span>
					</label>
					<label class="flex items-center space-x-2">
						<input
							type="radio"
							bind:group={formData.encryptF}
							value={false}
							disabled={submitting}
							class="text-primary"
						/>
						<span class="text-sm">아니오</span>
					</label>
				</div>
			</div>
		</CardContent>
	</Card>

	<!-- 버튼 영역 -->
	<div class="flex items-center justify-end gap-4">
		<Button 
			variant="outline" 
			onclick={handleCancel} 
			disabled={submitting}
			class="border-foreground/50 text-foreground/80 hover:bg-accent hover:text-accent-foreground"
		>
			<X class="w-4 h-4" />
			취소
		</Button>
		<Button onclick={handleSubmit} disabled={submitting}>
			<Save class="w-4 h-4" />
			{submitting ? '저장 중...' : '확인'}
		</Button>
	</div>
</div>