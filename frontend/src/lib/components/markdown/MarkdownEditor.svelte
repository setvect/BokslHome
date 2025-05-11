<script lang="ts">
  import { onMount } from 'svelte';
  import { EditorView } from '@codemirror/view';
  import { markdown } from '@codemirror/lang-markdown';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { defaultKeymap } from '@codemirror/commands';
  import { syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';
  import { lineNumbers, keymap } from '@codemirror/view';
  // 코드 언어 지원을 위한 임포트 추가
  import { javascript } from '@codemirror/lang-javascript';
  import { java } from '@codemirror/lang-java';
  import { sql } from '@codemirror/lang-sql';
  import { LanguageDescription } from '@codemirror/language';
  import { indentWithTab } from '@codemirror/commands';
  import { EditorState } from '@codemirror/state';
  import { GFM } from '@lezer/markdown';

  export let value = '';
  let editorElement: HTMLElement;
  let editor: EditorView;

  // 단축키 적용을 위한 헬퍼 함수
  function applyShortcut(view: EditorView, prefix: string, suffix: string) {
    const selection = view.state.selection.main;
    const text = view.state.sliceDoc(selection.from, selection.to);
    const isApplied = text.startsWith(prefix) && text.endsWith(suffix);
    view.dispatch({
      changes: {
        from: selection.from,
        to: selection.to,
        insert: isApplied ? text.slice(prefix.length, -suffix.length) : prefix + text + suffix
      }
    });
    return true;
  }

  // 마크다운 단축키 정의
  const markdownKeymap = [
    // 굵게: Ctrl+B
    {
      key: 'Mod-b',
      run: (view: EditorView) => applyShortcut(view, '**', '**')
    },
    // 기울임: Ctrl+I
    {
      key: 'Mod-i',
      run: (view: EditorView) => applyShortcut(view, '_', '_')
    },
    // 코드: Ctrl+K
    {
      key: 'Mod-k',
      run: (view: EditorView) => applyShortcut(view, '`', '`')
    },
    // 취소선: Ctrl+Delete
    {
      key: 'Mod-Delete',
      run: (view: EditorView) => {
        const selection = view.state.selection.main;
        const text = view.state.sliceDoc(selection.from, selection.to);
        if (!text) return false;
        return applyShortcut(view, '~~', '~~');
      }
    }
  ];

  onMount(() => {
    editor = new EditorView({
      doc: value,
      extensions: [
        lineNumbers(),
        keymap.of([...defaultKeymap, ...markdownKeymap, indentWithTab]),
        EditorState.tabSize.of(2),
        markdown({
          // GFM 지원을 위한 설정
          extensions: [GFM],
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
        oneDark,
        syntaxHighlighting(defaultHighlightStyle),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            value = update.state.doc.toString();
          }
        })
      ],
      parent: editorElement
    });

    return () => {
      editor.destroy();
    };
  });
</script>

<div class="markdown-editor">
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
