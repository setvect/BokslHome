<!-- src/lib/components/editor/CodeMirrorEditor.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { EditorState } from '@codemirror/state';
  import { EditorView, keymap } from '@codemirror/view';
  import { defaultKeymap } from '@codemirror/commands';
  import { markdown } from '@codemirror/lang-markdown';
  import { oneDark } from '@codemirror/theme-one-dark';
  import type { EditorProps } from './types';

  export let initialValue = '';
  export let onChange: ((value: string) => void) | undefined = undefined;
  export let readOnly = false;
  export let theme: 'light' | 'dark' = 'light';
  export let height = '100%';
  export let width = '100%';

  let editorElement: HTMLElement;
  let codeMirrorView: EditorView;

  // 로깅 유틸리티
  const logger = {
    info: (message: string, data?: any) => {
      if (import.meta.env.DEV) {
        console.log(`[INFO] ${message}`, data || '');
      }
    },
    error: (message: string, error?: any) => {
      console.error(`[ERROR] ${message}`, error || '');
    }
  };

  // CodeMirror 초기화 함수
  function setupCodeMirror() {
    try {
      const startState = EditorState.create({
        doc: initialValue,
        extensions: [
          markdown(),
          keymap.of(defaultKeymap),
          theme === 'dark' ? oneDark : [],
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newValue = update.state.doc.toString();
              onChange?.(newValue);
            }
          }),
          EditorView.domEventHandlers({
            focus: () => {
              // 포커스 이벤트 처리
            },
            blur: () => {
              // 블러 이벤트 처리
            }
          })
        ]
      });

      codeMirrorView = new EditorView({
        state: startState,
        parent: editorElement
      });
    } catch (error) {
      logger.error('CodeMirror 초기화 실패', error);
    }
  }

  onMount(() => {
    if (browser) {
      setupCodeMirror();
    }
  });

  onDestroy(() => {
    try {
      if (codeMirrorView) {
        codeMirrorView.destroy();
      }
    } catch (error) {
      logger.error('에디터 정리 실패', error);
    }
  });
</script>

<div
  class="codemirror-editor {theme === 'dark' ? 'dark' : 'light'}"
  style="height: {height}; width: {width};"
  bind:this={editorElement}
></div>

<style>
  .codemirror-editor {
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .codemirror-editor.dark {
    background-color: #1a1a1a;
    color: #ffffff;
  }

  .codemirror-editor.light {
    background-color: #ffffff;
    color: #000000;
  }

  :global(.codemirror-editor .cm-editor) {
    flex: 1;
    overflow: auto;
    height: 100%;
  }

  :global(.codemirror-editor .cm-scroller) {
    overflow: auto;
  }
</style>
