<script lang="ts">
  import { onMount } from 'svelte';
  import { Editor } from '@tiptap/core';
  import StarterKit from '@tiptap/starter-kit';

  // Props using Svelte 5 runes
  let {
    value = $bindable(''),
    placeholder = '내용을 입력하세요...',
    readonly = false,
    onchange
  }: {
    value?: string;
    placeholder?: string;
    readonly?: boolean;
    onchange?: (value: string) => void;
  } = $props();

  // 에디터 관련 변수들
  let editorElement: HTMLElement;
  let editor: Editor | null = null;

  // 에디터 인스턴스 생성
  onMount(() => {
    editor = new Editor({
      element: editorElement,
      extensions: [
        StarterKit,
      ],
      content: value,
      editable: !readonly,
      onTransaction: () => {
        // HTML 출력 업데이트
        if (editor) {
          const html = editor.getHTML();
          value = html;
          onchange?.(html);
        }
      }
    });
    
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  });

  // value prop이 변경되면 에디터 내용 업데이트
  $effect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  });

  // readonly prop이 변경되면 에디터 수정 가능 여부 업데이트
  $effect(() => {
    if (editor) {
      editor.setEditable(!readonly);
    }
  });
</script>

<div class="html-editor">
  <div bind:this={editorElement} class="editor-content"></div>
</div>

<style>
  .html-editor {
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    padding: 1rem;
    font-family: inherit;
    background: hsl(var(--card));
  }
  
  .editor-content {
    min-height: 200px;
    outline: none;
    border: 1px solid hsl(var(--border));
    border-radius: var(--radius);
    background: hsl(var(--background));
    overflow: hidden;
  }
</style>