<!-- src/lib/components/editor/MarkdownEditor.svelte -->
<script lang="ts">
  import { writable } from 'svelte/store';
  import MilkdownEditor from './MilkdownEditor.svelte';
  import CodeMirrorEditor from './CodeMirrorEditor.svelte';
  import type { EditorProps, EditorFocusState } from './types';

  export let initialValue = '';
  export let onChange: ((value: string) => void) | undefined = undefined;
  export let readOnly = false;
  export let theme: 'light' | 'dark' = 'light';
  export let height = '100%';
  export let width = '100%';
  export let showPreview = true;

  const focusState = writable<EditorFocusState>({
    crepe: false,
    codeMirror: false
  });

  let markdownValue = initialValue;

  function handleChange(newValue: string) {
    markdownValue = newValue;
    onChange?.(newValue);
  }
</script>

<div class="markdown-editor-container" style="height: {height}; width: {width};">
  <div class="grid {showPreview ? 'grid-cols-2' : 'grid-cols-1'} gap-4 h-full">
    <!-- Milkdown 에디터 -->
    <div class="editor-wrapper">
      <MilkdownEditor {initialValue} onChange={handleChange} {readOnly} {theme} height="100%" width="100%" />
    </div>

    <!-- CodeMirror 에디터 -->
    {#if showPreview}
      <div class="editor-wrapper">
        <CodeMirrorEditor {initialValue} onChange={handleChange} {readOnly} {theme} height="100%" width="100%" />
      </div>
    {/if}
  </div>
</div>

<style>
  .markdown-editor-container {
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .editor-wrapper {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background-color: var(--editor-bg, #ffffff);
  }

  :global(.milkdown-editor),
  :global(.codemirror-editor) {
    flex: 1;
    overflow: auto;
    min-height: 0;
  }

  /* 스크롤바 스타일링 */
  :global(.milkdown-editor::-webkit-scrollbar),
  :global(.codemirror-editor::-webkit-scrollbar) {
    width: 8px;
    height: 8px;
  }

  :global(.milkdown-editor::-webkit-scrollbar-track),
  :global(.codemirror-editor::-webkit-scrollbar-track) {
    background: #f1f1f1;
    border-radius: 4px;
  }

  :global(.milkdown-editor::-webkit-scrollbar-thumb),
  :global(.codemirror-editor::-webkit-scrollbar-thumb) {
    background: #888;
    border-radius: 4px;
  }

  :global(.milkdown-editor::-webkit-scrollbar-thumb:hover),
  :global(.codemirror-editor::-webkit-scrollbar-thumb:hover) {
    background: #555;
  }
</style>
