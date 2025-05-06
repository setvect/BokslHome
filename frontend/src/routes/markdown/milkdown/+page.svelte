<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import { writable } from 'svelte/store';

  import '@milkdown/crepe/theme/common/style.css';
  import '@milkdown/crepe/theme/frame.css';
  import { Crepe } from '@milkdown/crepe';
  import { editorViewCtx, parserCtx } from '@milkdown/core';
  import { Slice } from '@milkdown/prose/model';
  import { Selection } from '@milkdown/prose/state';

  // CodeMirror 관련 임포트
  import { EditorState } from '@codemirror/state';
  import { EditorView, keymap } from '@codemirror/view';
  import { defaultKeymap } from '@codemirror/commands';
  import { markdown } from '@codemirror/lang-markdown';
  import { oneDark } from '@codemirror/theme-one-dark';

  // 상수 정의
  const INITIAL_MARKDOWN = 'Hello, Milkdown!';

  // 타입 정의
  type EditorFocusState = {
    crepe: boolean;
    codeMirror: boolean;
  };

  // 상태 관리
  const focusState = writable<EditorFocusState>({
    crepe: false,
    codeMirror: false
  });

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

  let editorElement: HTMLElement;
  let codeMirrorElement: HTMLElement;
  let crepe: Crepe;
  let codeMirrorView: EditorView;
  let markdownValue = INITIAL_MARKDOWN;

  // 포커스 상태 확인 함수
  function isCrepe() {
    return $focusState.crepe;
  }

  function isCodeMirror() {
    return $focusState.codeMirror;
  }

  // CodeMirror 초기화 함수
  function setupCodeMirror() {
    try {
      const startState = EditorState.create({
        doc: markdownValue,
        extensions: [
          markdown(),
          keymap.of(defaultKeymap),
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              markdownValue = update.state.doc.toString();
              updateCrepeFromCodeMirror();
            }
          }),
          EditorView.domEventHandlers({
            focus: () => {
              focusState.update((state) => ({ ...state, codeMirror: true, crepe: false }));
            },
            blur: () => {
              focusState.update((state) => ({ ...state, codeMirror: false }));
            }
          })
        ]
      });

      codeMirrorView = new EditorView({
        state: startState,
        parent: codeMirrorElement
      });
    } catch (error) {
      logger.error('CodeMirror 초기화 실패', error);
    }
  }

  // CodeMirror에서 Crepe로 업데이트
  function updateCrepeFromCodeMirror() {
    if (!isCodeMirror()) {
      return;
    }

    if (!crepe?.editor) {
      return;
    }

    try {
      updateCrepeContent();
    } catch (error) {
      logger.error('Crepe 업데이트 실패', error);
    }
  }

  // Crepe 컨텐츠 업데이트 함수
  function updateCrepeContent() {
    crepe.editor.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      const parser = ctx.get(parserCtx);

      if (!view || !parser) {
        return;
      }

      const doc = parser(markdownValue);
      if (!doc) {
        logger.error('마크다운 파싱 실패');
        return;
      }

      updateCrepeView(view, doc);
    });
  }

  // Crepe 뷰 업데이트 함수
  function updateCrepeView(view: any, doc: any) {
    const state = view.state;
    const selection = state.selection;
    const { from } = selection;

    let tr = state.tr;
    tr = tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0));
    tr = tr.setSelection(Selection.near(tr.doc.resolve(from)));
    view.dispatch(tr);
  }

  // CodeMirror 내용 업데이트 함수
  function updateCodeMirrorFromCrepe(newMarkdown: string) {
    if (!codeMirrorView) {
      logger.error('CodeMirror 뷰가 초기화되지 않음');
      return;
    }

    try {
      updateCodeMirrorContent(newMarkdown);
    } catch (error) {
      logger.error('CodeMirror 업데이트 실패', error);
    }
  }

  // CodeMirror 컨텐츠 업데이트 함수
  function updateCodeMirrorContent(newMarkdown: string) {
    codeMirrorView.dispatch({
      changes: {
        from: 0,
        to: codeMirrorView.state.doc.length,
        insert: newMarkdown
      }
    });
  }

  // 에디터 초기화 함수
  async function initializeEditors() {
    if (!browser) {
      return;
    }

    try {
      await initializeCrepe();
      setupCodeMirror();
    } catch (error) {
      logger.error('에디터 초기화 실패', error);
    }
  }

  // Crepe 초기화 함수
  async function initializeCrepe() {
    crepe = new Crepe({
      root: editorElement,
      defaultValue: markdownValue
    });

    await crepe.create();
    setupCrepeEventListeners();
    setupCrepeMarkdownListener();
  }

  // Crepe 이벤트 리스너 설정
  function setupCrepeEventListeners() {
    crepe.editor?.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      if (!view) {
        return;
      }

      view.dom.addEventListener('focus', () => {
        focusState.update((state) => ({ ...state, crepe: true, codeMirror: false }));
      });

      view.dom.addEventListener('blur', () => {
        focusState.update((state) => ({ ...state, crepe: false }));
      });
    });
  }

  // Crepe 마크다운 리스너 설정
  function setupCrepeMarkdownListener() {
    crepe.on((listener) => {
      listener.markdownUpdated((_, markdown: string, prevMarkdown: string) => {
        if (!isCrepe()) {
          return;
        }

        if (markdown !== prevMarkdown) {
          markdownValue = markdown;
          updateCodeMirrorFromCrepe(markdown);
        }
      });
    });
  }

  onMount(() => {
    initializeEditors();
  });

  onDestroy(() => {
    try {
      if (crepe) {
        crepe.destroy();
      }

      if (codeMirrorView) {
        codeMirrorView.destroy();
      }
    } catch (error) {
      logger.error('에디터 정리 실패', error);
    }
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4 bg-red-500 text-white p-2 rounded">Milkdown 에디터 테스트</h1>

  <div class="grid grid-cols-2 gap-4 h-[calc(100vh-8rem)] border-2 border-gray-200 rounded-lg p-4">
    <!-- Milkdown 에디터 -->
    <div class="border-2 border-blue-200 rounded-lg p-4 flex flex-col bg-blue-50" role="textbox" aria-label="Milkdown 에디터">
      <div class="text-sm font-medium mb-2 text-blue-700">Milkdown 에디터</div>
      <div class="flex-1 overflow-auto bg-white rounded" bind:this={editorElement}></div>
    </div>

    <!-- CodeMirror 에디터 -->
    <div class="border-2 border-green-200 rounded-lg p-4 flex flex-col bg-green-50" role="textbox" aria-label="CodeMirror 에디터">
      <div class="text-sm font-medium mb-2 text-green-700">CodeMirror 에디터</div>
      <div class="flex-1 overflow-auto rounded" bind:this={codeMirrorElement}></div>
    </div>
  </div>
</div>
