<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { ArrowLeft, Save, X } from '@lucide/svelte';
  import { createBoardManager, checkBoardCodeDuplicate } from '$lib/mock/api/boardManagerApi';
  import { z } from 'zod';
  import { superForm } from 'sveltekit-superforms';
  import { zod } from 'sveltekit-superforms/adapters';
  import { createFieldHandlers, shouldShowError, getAriaInvalid } from '$lib/utils/form';

  // Zod 스키마 정의
  const formSchema = z.object({
    boardCode: z
      .string()
      .min(1, '게시판 코드를 입력해주세요.')
      .max(20, '게시판 코드는 20자 이하로 입력해주세요.')
      .regex(/^[A-Z0-9]+$/, '게시판 코드는 영문 대문자와 숫자만 사용할 수 있습니다.'),
    name: z.string().min(1, '게시판 이름을 입력해주세요.').max(100, '게시판 이름은 100자 이하로 입력해주세요.'),
    uploadLimit: z
      .number()
      .min(0, '업로드 용량제한은 0 이상이어야 합니다.')
      .max(1000000, '업로드 용량제한은 1,000,000KB 이하로 설정해주세요.'),
    replyF: z.string(),
    commentF: z.string(),
    attachF: z.string(),
    encryptF: z.string()
  });

  // 초기 데이터
  const initialData = {
    boardCode: '',
    name: '',
    uploadLimit: 1000,
    replyF: 'false',
    commentF: 'true',
    attachF: 'true',
    encryptF: 'false'
  };

  // 포커스 상태 관리
  let focusedField = $state<string | null>(null);
  const focusedFieldRef = {
    get current() {
      return focusedField;
    },
    set current(value: string | null) {
      focusedField = value;
    }
  };

  // 상태 관리
  let boardCodeChecking = $state(false);
  let boardCodeChecked = $state(false);

  // Superform 설정
  const { form, errors, enhance, validate } = superForm(initialData, {
    SPA: true,
    validators: zod(formSchema),
    onUpdate: ({ form }) => {
      if (form.valid && boardCodeChecked) {
        handleFormSubmit();
      }
    }
  });

  // 폼 제출 처리
  async function handleFormSubmit() {
    if (!boardCodeChecked) {
      alert('게시판 코드 중복 확인을 해주세요.');
      return;
    }

    try {
      // string을 boolean으로 변환하여 API 호출
      const formData = {
        ...$form,
        replyF: $form.replyF === 'true',
        commentF: $form.commentF === 'true',
        attachF: $form.attachF === 'true',
        encryptF: $form.encryptF === 'true'
      };
      await createBoardManager(formData);
      alert('게시판이 성공적으로 생성되었습니다.');
      goto('/board-manager');
    } catch (error) {
      console.error('게시판 생성 실패:', error);
      alert('게시판 생성 중 오류가 발생했습니다.');
    }
  }

  // 게시판 코드 중복 확인
  async function checkDuplicateCode() {
    if (!$form.boardCode.trim()) {
      return;
    }

    // 먼저 기본 유효성 검사 수행
    await validate('boardCode');
    if ($errors.boardCode) {
      return;
    }

    boardCodeChecking = true;
    try {
      const isDuplicate = await checkBoardCodeDuplicate($form.boardCode);
      if (isDuplicate) {
        errors.update((errs) => ({
          ...errs,
          boardCode: ['이미 사용 중인 게시판 코드입니다.']
        }));
        boardCodeChecked = false;
      } else {
        // 중복 확인 성공 시 에러 제거
        errors.update((errs) => {
          const { boardCode, ...restErrors } = errs;
          return restErrors;
        });
        boardCodeChecked = true;
      }
    } catch (error) {
      console.error('게시판 코드 중복 확인 실패:', error);
      errors.update((errs) => ({
        ...errs,
        boardCode: ['게시판 코드 확인 중 오류가 발생했습니다.']
      }));
      boardCodeChecked = false;
    } finally {
      boardCodeChecking = false;
    }
  }

  // 게시판 코드 변경 시 중복 확인 상태 초기화
  function handleBoardCodeChange() {
    boardCodeChecked = false;
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
      <form id="board-manager-form" use:enhance>
        <!-- 게시판 코드 -->
        <div class="space-y-2">
          <Label for="boardCode">코드 <span class="text-destructive">*</span></Label>
          <div class="flex gap-2">
            <Input
              id="boardCode"
              name="boardCode"
              bind:value={$form.boardCode}
              placeholder="게시판 코드 (영문 대문자, 숫자)"
              class="flex-1"
              aria-invalid={getAriaInvalid($errors, 'boardCode', focusedField)}
              {...createFieldHandlers('boardCode', focusedFieldRef, errors, validate, handleBoardCodeChange)}
            />
            <Button
              type="button"
              variant="outline"
              onclick={checkDuplicateCode}
              disabled={boardCodeChecking || !$form.boardCode.trim()}
              class="whitespace-nowrap"
            >
              {boardCodeChecking ? '확인 중...' : '중복 확인'}
            </Button>
          </div>
          {#if shouldShowError($errors, 'boardCode', focusedField)}
            <p class="text-sm text-destructive">{$errors.boardCode?.[0]}</p>
          {:else if boardCodeChecked}
            <p class="text-sm text-green-600">사용 가능한 게시판 코드입니다.</p>
          {/if}
          <p class="text-sm text-foreground/60">영문 대문자와 숫자만 사용 가능 (최대 20자)</p>
        </div>

        <!-- 게시판 이름 -->
        <div class="space-y-2">
          <Label for="name">이름 <span class="text-destructive">*</span></Label>
          <Input
            id="name"
            name="name"
            bind:value={$form.name}
            placeholder="게시판 이름"
            aria-invalid={getAriaInvalid($errors, 'name', focusedField)}
            {...createFieldHandlers('name', focusedFieldRef, errors, validate)}
          />
          {#if shouldShowError($errors, 'name', focusedField)}
            <p class="text-sm text-destructive">{$errors.name?.[0]}</p>
          {/if}
        </div>

        <!-- 업로드 용량제한 -->
        <div class="space-y-2">
          <Label for="uploadLimit">업로드 용량제한 (KB)</Label>
          <Input
            id="uploadLimit"
            name="uploadLimit"
            type="number"
            bind:value={$form.uploadLimit}
            min="0"
            max="1000000"
            aria-invalid={getAriaInvalid($errors, 'uploadLimit', focusedField)}
            {...createFieldHandlers('uploadLimit', focusedFieldRef, errors, validate)}
          />
          {#if shouldShowError($errors, 'uploadLimit', focusedField)}
            <p class="text-sm text-destructive">{$errors.uploadLimit?.[0]}</p>
          {/if}
          <p class="text-sm text-foreground/60">0은 파일 업로드 비활성화, 최대 1,000,000KB</p>
        </div>

        <!-- 댓글 사용 -->
        <div class="space-y-3">
          <Label>댓글 사용</Label>
          <RadioGroup
            bind:value={$form.replyF}
            name="replyF"
            class="flex items-center space-x-4"
            {...createFieldHandlers('replyF', focusedFieldRef, errors, validate)}
          >
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="true" id="replyF-true" name="replyF" />
              <Label for="replyF-true" class="text-sm">예</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="false" id="replyF-false" name="replyF" />
              <Label for="replyF-false" class="text-sm">아니오</Label>
            </div>
          </RadioGroup>
        </div>

        <!-- 파일 업로드 -->
        <div class="space-y-3">
          <Label>파일 업로드</Label>
          <RadioGroup
            bind:value={$form.attachF}
            name="attachF"
            class="flex items-center space-x-4"
            {...createFieldHandlers('attachF', focusedFieldRef, errors, validate)}
          >
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="true" id="attachF-true" name="attachF" />
              <Label for="attachF-true" class="text-sm">예</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="false" id="attachF-false" name="attachF" />
              <Label for="attachF-false" class="text-sm">아니오</Label>
            </div>
          </RadioGroup>
        </div>

        <!-- 댓글 기능 -->
        <div class="space-y-3">
          <Label>댓글 기능</Label>
          <RadioGroup
            bind:value={$form.commentF}
            name="commentF"
            class="flex items-center space-x-4"
            {...createFieldHandlers('commentF', focusedFieldRef, errors, validate)}
          >
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="true" id="commentF-true" name="commentF" />
              <Label for="commentF-true" class="text-sm">예</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="false" id="commentF-false" name="commentF" />
              <Label for="commentF-false" class="text-sm">아니오</Label>
            </div>
          </RadioGroup>
        </div>

        <!-- 암호화 글 등록 -->
        <div class="space-y-3">
          <Label>암호화 글 등록</Label>
          <RadioGroup
            bind:value={$form.encryptF}
            name="encryptF"
            class="flex items-center space-x-4"
            {...createFieldHandlers('encryptF', focusedFieldRef, errors, validate)}
          >
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="true" id="encryptF-true" name="encryptF" />
              <Label for="encryptF-true" class="text-sm">예</Label>
            </div>
            <div class="flex items-center space-x-2">
              <RadioGroupItem value="false" id="encryptF-false" name="encryptF" />
              <Label for="encryptF-false" class="text-sm">아니오</Label>
            </div>
          </RadioGroup>
        </div>
      </form>
    </CardContent>
  </Card>

  <!-- 버튼 영역 -->
  <div class="flex items-center justify-end gap-4">
    <Button
      type="button"
      variant="outline"
      onclick={handleCancel}
      class="border-foreground/50 text-foreground/80 hover:bg-accent hover:text-accent-foreground"
    >
      <X class="w-4 h-4" />
      취소
    </Button>
    <Button type="submit" form="board-manager-form" disabled={!boardCodeChecked}>
      <Save class="w-4 h-4" />
      확인
    </Button>
  </div>
</div>
