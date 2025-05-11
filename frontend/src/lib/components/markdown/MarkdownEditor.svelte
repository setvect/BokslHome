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

  export let value = '';
  let editorElement: HTMLElement;
  let editor: EditorView;

  onMount(() => {
    editor = new EditorView({
      doc: value,
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
