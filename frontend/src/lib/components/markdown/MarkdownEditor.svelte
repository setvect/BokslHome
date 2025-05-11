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
  import { EditorView } from '@codemirror/view';
  import { markdown } from '@codemirror/lang-markdown';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
  import { lineNumbers, keymap } from '@codemirror/view';
  import { javascript } from '@codemirror/lang-javascript';
  import { java } from '@codemirror/lang-java';
  import { sql } from '@codemirror/lang-sql';
  import { LanguageDescription } from '@codemirror/language';
  import { EditorState } from '@codemirror/state';
  import { history } from '@codemirror/commands';
  import { allKeymaps } from './keymaps';

  // Props 정의
  export let value: MarkdownEditorProps['value'] = '';
  export let width: MarkdownEditorProps['width'] = '100%';
  export let height: MarkdownEditorProps['height'] = '100%';
  export let isDarkMode: MarkdownEditorProps['isDarkMode'] = true;
  export let onChange: MarkdownEditorProps['onChange'] = () => {};

  let editorElement: HTMLElement;
  let editor: EditorView;

  // 에디터 내용을 가져오는 메서드
  export function getContent(): string {
    return editor ? editor.state.doc.toString() : '';
  }

  let previousDarkMode = isDarkMode;

  $: {
    if (isDarkMode !== previousDarkMode && editor) {
      console.log('다크모드 변경:', isDarkMode);
      const currentValue = editor.state.doc.toString();
      editor.destroy();
      editor = createEditor(currentValue);
      previousDarkMode = isDarkMode;
    }
  }

  function createEditor(doc: string) {
    return new EditorView({
      doc,
      extensions: [
        lineNumbers(),
        history(),
        keymap.of(allKeymaps),
        EditorState.tabSize.of(2),
        markdown({
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
        }),
        isDarkMode ? oneDark : [],
        syntaxHighlighting(defaultHighlightStyle),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            value = update.state.doc.toString();
            onChange?.(value);
          }
        })
      ],
      parent: editorElement
    });
  }

  onMount(() => {
    editor = createEditor(value);
    return () => {
      editor.destroy();
    };
  });
</script>

<div class="markdown-editor" style="width: {width}; height: {height};">
  <div bind:this={editorElement} class="editor-container"></div>
</div>

<style>
  .markdown-editor {
    width: 100%;
    height: 100%;
  }

  .editor-container {
    height: 100%;
    overflow: auto;
  }

  :global(.cm-editor) {
    height: 100%;
    font-size: 1.3em;
  }
</style>
