<svelte:options runes={true} />

<script lang="ts">
  import { goto } from '$app/navigation';
  import QuillEditor, { type QuillEditorMethods } from '$lib/components/QuillEditor.svelte';
  import MarkdownEditor, { type MarkdownEditorMethods } from '$lib/components/markdown/MarkdownEditor.svelte';
  import { useForm } from '$lib/utils/formUtils';
  import { showConfirmAlert } from '$lib/utils/alertUtils';
  import { Button, Input, ButtonGroup } from 'flowbite-svelte';
  import { CodeBranchOutline, PenOutline } from 'flowbite-svelte-icons';
  import 'quill/dist/quill.snow.css';
  import { z } from 'zod';
  import { isDarkMode } from '$lib/stores/themeStore';
  import { tick } from 'svelte';

  // 타입 정의
  type FormData = {
    title: string;
    content: string;
  };

  type EditorType = 'markdown' | 'quill';

  // 상수 정의
  const EDITOR_HEIGHT = '50vh';
  const MARKDOWN_EDITOR_SELECTOR = '.markdown-editor .cm-editor .cm-content';

  // 상태 변수
  let quillEditor = $state<QuillEditorMethods>();
  let markdownEditor = $state<MarkdownEditorMethods>();
  let editorContent = $state('');
  let selectedEditor = $state<EditorType>('markdown');

  // 폼 스키마 및 초기값
  const formSchema = z.object({
    title: z.string().trim().min(1, '제목을 입력해주세요.'),
    content: z.string().refine(
      (value) => {
        const strippedValue = value.replace(/<[^>]*>/g, '').trim();
        const hasImage = /<img[^>]*>/.test(value);
        return strippedValue.length > 0 || hasImage;
      },
      { message: '내용을 입력하세요.' }
    )
  });

  const initialValues: FormData = {
    title: '',
    content: ''
  };

  // 폼 관리
  const { form, errors, touched, setFieldValue } = useForm(formSchema, initialValues, handleSubmit);

  // 에디터 내용 동기화
  $effect(() => {
    setFieldValue('content', editorContent);
  });

  // 이벤트 핸들러
  function handleSubmit(values: FormData) {
    console.log('Title:', values.title);
    console.log('Content:', values.content);
  }

  function handleCancel() {
    goto('/board/article');
  }

  async function handleEditorTypeChange(newEditorType: EditorType) {
    const hasContent = editorContent.trim().length > 0;

    if (hasContent && newEditorType !== selectedEditor) {
      const confirmed = await showConfirmAlert(
        '편집기 변경 확인',
        '편집기를 변경하면 현재 작성된 내용이 모두 삭제됩니다.\n계속하시겠습니까?'
      );

      if (confirmed) {
        changeEditor(newEditorType);
      }
    } else {
      changeEditor(newEditorType);
    }
  }

  async function changeEditor(newEditorType: EditorType) {
    selectedEditor = newEditorType;
    editorContent = '';

    await tick();
    await focusEditor(newEditorType);
  }

  async function focusEditor(editorType: EditorType) {
    if (editorType === 'markdown' && markdownEditor) {
      const editorElement = document.querySelector(MARKDOWN_EDITOR_SELECTOR);
      if (editorElement) {
        (editorElement as HTMLElement).focus();
      }
    } else if (editorType === 'quill' && quillEditor) {
      await quillEditor.focus();
    }
  }

  // 에디터 설정 객체
  const editorConfigs = {
    markdown: {
      icon: CodeBranchOutline,
      label: '마크다운 에디터'
    },
    quill: {
      icon: PenOutline,
      label: '리치 텍스트 에디터'
    }
  } as const;
</script>

<div>
  <form use:form>
    <!-- 제목 입력 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 pb-4">
      <div class="flex-1">
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="제목을 입력하세요"
          color={$touched.title && $errors.title ? 'red' : 'base'}
        />
        {#if $touched.title && $errors.title}
          <p class="error-text">{$errors.title}</p>
        {/if}
      </div>
    </div>

    <!-- 편집기 선택 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <div class="flex gap-6">
        <ButtonGroup>
          {#each Object.entries(editorConfigs) as [type, config]}
            {@const isSelected = selectedEditor === type}
            {@const IconComponent = config.icon}
            <Button
              color={isSelected ? 'blue' : 'light'}
              on:click={() => handleEditorTypeChange(type as EditorType)}
              class={isSelected ? 'editor-button-active' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}
            >
              <IconComponent class="mr-2 h-4 w-4" />
              {config.label}
            </Button>
          {/each}
        </ButtonGroup>
      </div>
    </div>

    <!-- 에디터 영역 -->
    <div class="flex items-center border-b border-gray-200 dark:border-gray-700 py-4">
      <div class="flex-1">
        {#if selectedEditor === 'markdown'}
          <MarkdownEditor bind:this={markdownEditor} bind:value={editorContent} height={EDITOR_HEIGHT} isDarkMode={$isDarkMode} />
        {:else}
          <QuillEditor bind:this={quillEditor} bind:content={editorContent} height={EDITOR_HEIGHT} darkMode={$isDarkMode} />
        {/if}
        {#if $touched.content && $errors.content}
          <p class="error-text">{$errors.content}</p>
        {/if}
      </div>
    </div>

    <!-- 액션 버튼 -->
    <div class="flex justify-end gap-2 mt-6">
      <Button type="submit" color="green">저장</Button>
      <Button onclick={handleCancel} color="light">취소</Button>
    </div>
  </form>
</div>
