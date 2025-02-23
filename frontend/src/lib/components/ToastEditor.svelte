<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import type { EditorOptions, Editor as ToastEditorType } from '@toast-ui/editor';
  import '@toast-ui/editor/dist/toastui-editor.css';
  import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

  export let content: string = '';

  const dispatch = createEventDispatcher();
  let editorContainer: HTMLDivElement;
  let editor: ToastEditorType;

  const handlePaste = (event: ClipboardEvent) => {
    console.log('Paste event detected:', event);
    const clipboardData = event.clipboardData;
    if (!clipboardData) {
      return;
    }

    // 만약 clipboardData에 파일이 포함되어 있다면
    const items = clipboardData.items;
    let isImage = false;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      // 붙여넣기된 항목이 이미지인 경우 검사
      if (item.type.indexOf('image') !== -1) {
        isImage = true;
        // 이미지 붙여넣기일 경우 기본 동작 취소
        event.preventDefault();
        event.stopPropagation();
        const file = item.getAsFile();
        console.log('Pasted image file:', file);
        if (editor && typeof editor.getCurrentModeEditor === 'function') {
          const modeEditor = editor.getCurrentModeEditor();
          modeEditor.replaceSelection('서버에 업로드된 이미지 URL');
        }

        break;
      }
    }

    if (!isImage) {
      // 텍스트 붙여넣기인 경우
      const pastedText = clipboardData.getData('text/plain');
      console.log('Pasted text:', pastedText);
    }
  };

  onMount(async () => {
    const { Editor } = await import('@toast-ui/editor');
    const options: EditorOptions = {
      el: editorContainer,
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '700px',
      initialValue: content,
      theme: 'dark',
      events: {
        change: () => {
          const updatedContent = editor.getMarkdown();
          dispatch('change', updatedContent);
        }
      }
    };
    editor = new Editor(options);

    editorContainer.addEventListener('paste', handlePaste, true);
  });

  onDestroy(() => {
    editor && editor.destroy();
    if (editorContainer) {
      editorContainer.removeEventListener('paste', handlePaste);
    }
  });
</script>

<div bind:this={editorContainer}></div>
