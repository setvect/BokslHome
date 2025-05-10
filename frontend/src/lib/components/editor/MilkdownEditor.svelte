<!-- src/lib/components/editor/MilkdownEditor.svelte -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { Crepe } from '@milkdown/crepe';
  import { editorViewCtx, parserCtx } from '@milkdown/core';
  import { Slice } from '@milkdown/prose/model';
  import { Selection } from '@milkdown/prose/state';
  import type { EditorProps } from './types';

  import '@milkdown/crepe/theme/common/style.css';
  import '@milkdown/crepe/theme/frame.css';

  export let initialValue = '';
  export let onChange: ((value: string) => void) | undefined = undefined;
  export let readOnly = false;
  export let theme: 'light' | 'dark' = 'light';
  export let height = '100%';
  export let width = '100%';

  let editorElement: HTMLElement;
  let crepe: Crepe;
  let markdownValue = initialValue;

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

  // Crepe 초기화 함수
  async function initializeCrepe() {
    try {
      crepe = new Crepe({
        root: editorElement,
        defaultValue: markdownValue
      });

      await crepe.create();
      setupCrepeEventListeners();
      setupCrepeMarkdownListener();
    } catch (error) {
      logger.error('Crepe 초기화 실패', error);
    }
  }

  // Crepe 이벤트 리스너 설정
  function setupCrepeEventListeners() {
    crepe.editor?.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      if (!view) return;

      view.dom.addEventListener('focus', () => {
        // 포커스 이벤트 처리
      });

      view.dom.addEventListener('blur', () => {
        // 블러 이벤트 처리
      });
    });
  }

  // Crepe 마크다운 리스너 설정
  function setupCrepeMarkdownListener() {
    crepe.on((listener) => {
      listener.markdownUpdated((_, markdown: string, prevMarkdown: string) => {
        if (markdown !== prevMarkdown) {
          markdownValue = markdown;
          onChange?.(markdown);
        }
      });
    });
  }

  onMount(() => {
    if (browser) {
      initializeCrepe();
    }
  });

  onDestroy(() => {
    try {
      if (crepe) {
        crepe.destroy();
      }
    } catch (error) {
      logger.error('에디터 정리 실패', error);
    }
  });
</script>

<div
  class="milkdown-editor {theme === 'dark' ? 'dark' : 'light'}"
  style="height: {height}; width: {width};"
  bind:this={editorElement}
></div>

<style>
  .milkdown-editor {
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }

  .milkdown-editor.dark {
    background-color: #1a1a1a;
    color: #ffffff;
  }

  .milkdown-editor.light {
    background-color: #ffffff;
    color: #000000;
  }

  :global(.milkdown-editor .ProseMirror) {
    flex: 1;
    overflow: auto;
    padding: 5rem;
  }
</style>
