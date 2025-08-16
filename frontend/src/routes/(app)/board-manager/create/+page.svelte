<script lang="ts">
  import { goto } from '$app/navigation';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form';
  import { ArrowLeft, Save, X } from '@lucide/svelte';
  import type { BoardManager } from '$lib/types/boardManager';
  import { createBoardManager, checkBoardCodeDuplicate } from '$lib/mock/api/boardManagerApi';
  import { superForm } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { z } from 'zod';
  import { toast } from 'svelte-sonner';

  // Zod 스키마 정의 (체이닝 형태로 간결하게)
  const boardManagerSchema = z.object({
    boardCode: z
      .string({ required_error: '게시판 코드를 입력해주세요.' })
      .nonempty('게시판 코드를 입력해주세요.')
      .max(20, '게시판 코드는 20자 이하로 입력해주세요.')
      .regex(/^[A-Z0-9]+$/, '게시판 코드는 영문 대문자와 숫자만 사용할 수 있습니다.'),

    name: z
      .string({ required_error: '게시판 이름을 입력해주세요.' })
      .nonempty('게시판 이름을 입력해주세요.')
      .max(100, '게시판 이름은 100자 이하로 입력해주세요.'),

    uploadLimit: z
      .number()
      .min(0, '업로드 용량제한은 0 이상이어야 합니다.')
      .max(1000000, '업로드 용량제한은 1,000,000KB 이하로 설정해주세요.'),

    replyF: z.boolean(),
    commentF: z.boolean(),
    attachF: z.boolean(),
    encryptF: z.boolean()
  });

  type BoardManagerFormData = z.infer<typeof boardManagerSchema>;

  // 초기 폼 데이터
  const initialData: BoardManagerFormData = {
    boardCode: '',
    name: '',
    uploadLimit: 1000,
    replyF: false,
    commentF: true,
    attachF: true,
    encryptF: false
  };

  // Superforms 설정 (SPA 모드)
  const superform = superForm(initialData, {
    validators: zodClient(boardManagerSchema),
    SPA: true,
    validationMethod: 'oninput',
    clearOnSubmit: 'errors-and-message',
    async onUpdate({ form }) {
      if (form.valid) {
        if (!boardCodeChecked) {
          toast.error('게시판 코드 중복 확인을 해주세요.');
          return;
        }
        
        try {
          const boardData: Omit<BoardManager, 'deleteF'> = {
            boardCode: form.data.boardCode,
            name: form.data.name,
            uploadLimit: form.data.uploadLimit,
            replyF: form.data.replyF,
            commentF: form.data.commentF,
            attachF: form.data.attachF,
            encryptF: form.data.encryptF
          };
          
          await createBoardManager(boardData);
          toast.success('게시판이 성공적으로 생성되었습니다.');
          goto('/board-manager');
        } catch (error) {
          console.error('게시판 생성 실패:', error);
          toast.error('게시판 생성 중 오류가 발생했습니다.');
        }
      }
    },
    onError() {
      toast.error('게시판 생성 중 오류가 발생했습니다.', {
        description: '다시 시도해주세요.'
      });
    }
  });

  const { form, submitting, enhance } = superform;

  // 상태 관리
  let boardCodeChecking = $state(false);
  let boardCodeChecked = $state(false);

  // 게시판 코드 중복 확인
  async function checkDuplicateCode() {
    if (!$form.boardCode.trim()) {
      toast.error('게시판 코드를 입력해주세요.');
      return;
    }

    if (!/^[A-Z0-9]+$/.test($form.boardCode)) {
      toast.error('게시판 코드는 영문 대문자와 숫자만 사용할 수 있습니다.');
      return;
    }

    boardCodeChecking = true;
    try {
      const isDuplicate = await checkBoardCodeDuplicate($form.boardCode);
      if (isDuplicate) {
        toast.error('이미 사용 중인 게시판 코드입니다.');
        boardCodeChecked = false;
      } else {
        toast.success('사용 가능한 게시판 코드입니다.');
        boardCodeChecked = true;
      }
    } catch (error) {
      console.error('게시판 코드 중복 확인 실패:', error);
      toast.error('게시판 코드 확인 중 오류가 발생했습니다.');
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
    <Button variant="ghost" size="sm" onclick={() => goto('/board-manager')} class="text-foreground hover:text-foreground">
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
    <CardContent>
      <form 
        use:enhance 
        id="board-create-form" 
        class="space-y-6" 
        novalidate
      >
        <!-- 게시판 코드 -->
        <div class="space-y-2">
          <Form.Field form={superform} name="boardCode">
            <Form.Control>
              {#snippet children({ props }: { props: any })}
                <Form.Label class="mb-2 block">코드 <span class="text-red-500">*</span></Form.Label>
                <div class="flex gap-2">
                  <Input
                    {...props}
                    bind:value={$form.boardCode}
                    placeholder="게시판 코드 (영문 대문자, 숫자)"
                    class="flex-1"
                    oninput={handleBoardCodeChange}
                    disabled={$submitting}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onclick={checkDuplicateCode}
                    disabled={boardCodeChecking || !$form.boardCode.trim() || $submitting}
                    class="whitespace-nowrap"
                  >
                    {boardCodeChecking ? '확인 중...' : '중복 확인'}
                  </Button>
                </div>
                {#if boardCodeChecked}
                  <p class="text-sm text-green-600 mt-1">사용 가능한 게시판 코드입니다.</p>
                {/if}
                <p class="text-sm text-foreground/60 mt-1">영문 대문자와 숫자만 사용 가능 (최대 20자)</p>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors class="mt-1" />
          </Form.Field>
        </div>

        <!-- 게시판 이름 -->
        <div class="space-y-2">
          <Form.Field form={superform} name="name">
            <Form.Control>
              {#snippet children({ props }: { props: any })}
                <Form.Label class="mb-2 block">이름 <span class="text-red-500">*</span></Form.Label>
                <Input {...props} bind:value={$form.name} placeholder="게시판 이름" disabled={$submitting} />
              {/snippet}
            </Form.Control>
            <Form.FieldErrors class="mt-1" />
          </Form.Field>
        </div>

        <!-- 업로드 용량제한 -->
        <div class="space-y-2">
          <Form.Field form={superform} name="uploadLimit">
            <Form.Control>
              {#snippet children({ props }: { props: any })}
                <Form.Label class="mb-2 block">업로드 용량제한 (KB)</Form.Label>
                <Input {...props} type="number" bind:value={$form.uploadLimit} min="0" max="1000000" disabled={$submitting} />
                <p class="text-sm text-foreground/60 mt-1">0은 파일 업로드 비활성화, 최대 1,000,000KB</p>
              {/snippet}
            </Form.Control>
            <Form.FieldErrors class="mt-1" />
          </Form.Field>
        </div>

        <!-- 댓글 사용 -->
        <div class="space-y-3">
          <div class="text-sm font-medium text-foreground">댓글 사용</div>
          <div class="flex items-center space-x-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.replyF} value={true} disabled={$submitting} class="text-primary" />
              <span class="text-sm">예</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.replyF} value={false} disabled={$submitting} class="text-primary" />
              <span class="text-sm">아니오</span>
            </label>
          </div>
        </div>

        <!-- 파일 업로드 -->
        <div class="space-y-3">
          <div class="text-sm font-medium text-foreground">파일 업로드</div>
          <div class="flex items-center space-x-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.attachF} value={true} disabled={$submitting} class="text-primary" />
              <span class="text-sm">예</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.attachF} value={false} disabled={$submitting} class="text-primary" />
              <span class="text-sm">아니오</span>
            </label>
          </div>
        </div>

        <!-- 댓글 기능 -->
        <div class="space-y-3">
          <div class="text-sm font-medium text-foreground">댓글 기능</div>
          <div class="flex items-center space-x-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.commentF} value={true} disabled={$submitting} class="text-primary" />
              <span class="text-sm">예</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.commentF} value={false} disabled={$submitting} class="text-primary" />
              <span class="text-sm">아니오</span>
            </label>
          </div>
        </div>

        <!-- 암호화 글 등록 -->
        <div class="space-y-3">
          <div class="text-sm font-medium text-foreground">암호화 글 등록</div>
          <div class="flex items-center space-x-4">
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.encryptF} value={true} disabled={$submitting} class="text-primary" />
              <span class="text-sm">예</span>
            </label>
            <label class="flex items-center space-x-2 cursor-pointer">
              <input type="radio" bind:group={$form.encryptF} value={false} disabled={$submitting} class="text-primary" />
              <span class="text-sm">아니오</span>
            </label>
          </div>
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
      disabled={$submitting}
      class="border-foreground/50 text-foreground/80 hover:bg-accent hover:text-accent-foreground"
    >
      <X class="w-4 h-4" />
      취소
    </Button>
    <Button type="submit" form="board-create-form" disabled={$submitting}>
      <Save class="w-4 h-4" />
      {$submitting ? '저장 중...' : '확인'}
    </Button>
  </div>
</div>
