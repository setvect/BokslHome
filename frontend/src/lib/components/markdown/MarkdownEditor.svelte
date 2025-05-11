<script context="module" lang="ts">
  // 컴포넌트 타입 정의
  export type MarkdownEditorProps = {
    /** 에디터의 내용 */
    value: string;
    /** 에디터의 너비 (기본값: '100%') */
    width?: string;
    /** 에디터의 높이 (기본값: '100%') */
    height?: string;
    /** 다크모드 여부 (기본값: true) */
    isDarkMode?: boolean;
    /** 내용이 변경될 때 호출되는 콜백 함수 */
    onChange?: (value: string) => void;
  };

  // 컴포넌트 메서드 타입 정의
  export type MarkdownEditorMethods = {
    /** 현재 에디터의 내용을 반환 */
    getContent: () => string;
  };
</script>

<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { markdown } from '@codemirror/lang-markdown';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { javascript } from '@codemirror/lang-javascript';
  import { java } from '@codemirror/lang-java';
  import { sql } from '@codemirror/lang-sql';
  import { LanguageDescription } from '@codemirror/language';
  import { EditorView } from '@codemirror/view';
  import { allKeymaps } from './keymaps';
  import MarkdownPreview from './MarkdownPreview.svelte';
  import { Button, ButtonGroup } from 'flowbite-svelte';
  import { EyeOutline, EyeSolid, ExpandOutline, MinimizeOutline } from 'flowbite-svelte-icons';
  import { onMount, onDestroy } from 'svelte';

  // Props 정의
  export let value: MarkdownEditorProps['value'] = '';
  export let width: MarkdownEditorProps['width'] = '100%';
  export let height: MarkdownEditorProps['height'] = '100%';
  export let isDarkMode: MarkdownEditorProps['isDarkMode'] = true;
  export let onChange: MarkdownEditorProps['onChange'] = () => {};

  let editorView: EditorView;

  // 제어 옵션 상태
  let showPreview = true;
  let isFullscreen = false;

  // 에디터 내용을 가져오는 메서드
  export function getContent(): string {
    return editorView ? editorView.state.doc.toString() : '';
  }

  function handleReady(event: CustomEvent<EditorView>) {
    editorView = event.detail;
  }

  function handleChange(event: CustomEvent<string>) {
    const newValue = event.detail;
    onChange?.(newValue);
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
  }

  // 단축키 핸들러
  function handleKeydown(e: KeyboardEvent) {
    // Ctrl+Alt+P: 미리보기 토글
    if (e.ctrlKey && e.altKey && (e.key === 'p' || e.key === 'P')) {
      e.preventDefault();
      showPreview = !showPreview;
    }
    // Ctrl+Alt+F: 전체화면 토글
    if (e.ctrlKey && e.altKey && (e.key === 'f' || e.key === 'F')) {
      e.preventDefault();
      toggleFullscreen();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeydown);
  });
  onDestroy(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
</script>

<div class="markdown-editor-wrapper {isFullscreen ? 'fullscreen' : ''}">
  <div class="editor-controls">
    <ButtonGroup>
      <Button color={showPreview ? 'green' : 'light'} on:click={() => (showPreview = !showPreview)} size="sm">
        {#if showPreview}
          <EyeOutline class="icon" />
        {:else}
          <EyeSolid class="icon" />
        {/if}
      </Button>
      <Button color={isFullscreen ? 'yellow' : 'light'} on:click={toggleFullscreen} size="sm">
        {#if isFullscreen}
          <MinimizeOutline class="icon" />
        {:else}
          <ExpandOutline class="icon" />
        {/if}
      </Button>
    </ButtonGroup>
  </div>

  <div class="markdown-editor" style="width: {width}; height: {height}; min-height: 0;">
    <div class="editor-container">
      <CodeMirror
        bind:value
        lang={markdown({
          codeLanguages: [
            LanguageDescription.of({
              name: 'javascript',
              alias: ['js'],
              support: javascript()
            }),
            LanguageDescription.of({
              name: 'typescript',
              alias: ['ts'],
              support: javascript({ typescript: true })
            }),
            LanguageDescription.of({
              name: 'java',
              support: java()
            }),
            LanguageDescription.of({
              name: 'sql',
              support: sql()
            })
          ]
        })}
        theme={isDarkMode ? oneDark : undefined}
        extensions={allKeymaps}
        on:ready={handleReady}
        on:change={handleChange}
        styles={{
          '&': {
            height: '100%',
            fontSize: '1.3em'
          }
        }}
      />
    </div>
    {#if showPreview}
      <div class="preview-outer">
        <MarkdownPreview content={value} {isDarkMode} />
      </div>
    {/if}
  </div>
</div>

<style>
  .markdown-editor-wrapper {
    width: 100%;
    position: relative;
  }
  .markdown-editor-wrapper.fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    min-height: 0 !important;
    background: #1a202c;
    z-index: 9999;
    border-radius: 0;
    margin: 0;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
  .editor-controls {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
    gap: 0.5rem;
    z-index: 10000;
    position: relative;
    background: transparent;
  }
  .markdown-editor {
    width: 100%;
    height: 100%;
    min-height: 0;
    display: flex;
    gap: 1rem;
    align-items: stretch;
    transition: height 0.2s;
    background: none;
    position: relative;
    z-index: 1;
    flex: 1 1 0%;
  }
  .markdown-editor-wrapper.fullscreen .markdown-editor {
    height: 100%;
    min-height: 0;
  }
  .icon {
    width: 1em;
    height: 1em;
    margin-right: 0.3em;
    vertical-align: middle;
  }
  .editor-container {
    flex: 1 1 0%;
    height: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    background: none;
  }
  .preview-outer {
    flex: 1 1 0%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
</style>
