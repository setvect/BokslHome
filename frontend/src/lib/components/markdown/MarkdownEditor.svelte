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
  import { onMount } from 'svelte';
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

  // Props 정의
  export let value: MarkdownEditorProps['value'] = '';
  export let width: MarkdownEditorProps['width'] = '100%';
  export let height: MarkdownEditorProps['height'] = '100%';
  export let isDarkMode: MarkdownEditorProps['isDarkMode'] = true;
  export let onChange: MarkdownEditorProps['onChange'] = () => {};

  let editorView: EditorView;

  // DOM 참조
  let editorContainer: HTMLDivElement;
  let previewContainer: HTMLDivElement;
  let markdownEditorDiv: HTMLDivElement;

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
</script>

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
  <div class="preview-outer">
    <MarkdownPreview content={value} {isDarkMode} />
  </div>
</div>

<style>
  .markdown-editor {
    width: 100%;
    height: 100%;
    min-height: 0;
    display: flex;
    gap: 1rem;
    align-items: stretch;
    transition: height 0.2s;
  }

  .editor-container {
    flex: 1 1 0%;
    height: 100%;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .preview-outer {
    flex: 1 1 0%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
</style>
