<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { Options } from 'easymde';
  import 'easymde/dist/easymde.min.css'; // CSS import 추가

  export let value: string = '';
  export let darkMode: boolean = false;

  let element: HTMLElement;
  let editor: EasyMDE | null = null;

  const options: Partial<Options> = {
    autofocus: true,
    spellChecker: false,
    status: false,
    toolbar: [
      'bold',
      'italic',
      'heading',
      '|',
      'quote',
      'unordered-list',
      'ordered-list',
      '|',
      'link',
      'image',
      '|',
      'preview',
      'side-by-side',
      'fullscreen',
      '|',
      'guide'
    ]
  };

  onMount(async () => {
    if (typeof window !== 'undefined') {
      const EasyMDE = (await import('easymde')).default;
      editor = new EasyMDE({
        element,
        initialValue: value,
        ...options
      });

      editor.codemirror.on('change', () => {
        value = editor?.value() || '';
      });
    }
  });

  onDestroy(() => {
    if (editor) {
      editor.toTextArea();
      editor = null;
    }
  });

  $: if (editor && value !== editor.value()) {
    editor.value(value);
  }
</script>

<div class="simplemde-wrapper" class:dark-mode={darkMode}>
  <textarea bind:this={element}></textarea>
</div>

<style>
  .simplemde-wrapper {
    width: 100%;
  }

  /* 다크모드 전체 배경 및 텍스트 */
  :global(.dark-mode .EasyMDEContainer),
  :global(.dark-mode .CodeMirror),
  :global(.dark-mode .editor-preview),
  :global(.dark-mode .editor-preview-side) {
    background-color: #1a1a1a !important;
    color: #fff !important;
  }

  /* 툴바 배경 및 구분선 */
  :global(.dark-mode .editor-toolbar) {
    background-color: #232323 !important;
    border-color: #444 !important;
  }

  /* 툴바 아이콘(버튼) 기본 상태 */
  :global(.dark-mode .editor-toolbar button) {
    color: #fff !important;
    opacity: 1 !important;
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    transition: outline 0.1s;
  }

  /* 툴바 아이콘(버튼) 하이라이트(선택/포커스/활성화) - 배경색 변경 없이 외곽선만 */
  :global(.dark-mode .editor-toolbar button.selected),
  :global(.dark-mode .editor-toolbar button:focus),
  :global(.dark-mode .editor-toolbar button:active) {
    outline: 2px solid #fff !important;
    outline-offset: 0px !important;
    border-radius: 4px !important;
    color: #fff !important;
    background: none !important;
  }

  /* 툴바 아이콘(버튼) hover */
  :global(.dark-mode .editor-toolbar button:hover:not(.selected)) {
    color: #fff !important;
    background: none !important;
  }

  /* 코드미러 커서, 선택영역, 라인넘버 등 */
  :global(.dark-mode .CodeMirror-cursor) {
    border-left: 1px solid #fff !important;
  }
  :global(.dark-mode .CodeMirror-selected) {
    background-color: #333 !important;
  }
  :global(.dark-mode .CodeMirror-gutters) {
    background-color: #232323 !important;
    border-right: 1px solid #444 !important;
  }
  :global(.dark-mode .CodeMirror-linenumber) {
    color: #888 !important;
  }

  /* 상태바 */
  :global(.dark-mode .editor-statusbar) {
    background-color: #232323 !important;
    color: #aaa !important;
    border-top: 1px solid #444 !important;
  }
</style>
