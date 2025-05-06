<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

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

  let editorElement: HTMLElement;
  let codeMirrorElement: HTMLElement;
  let crepe: Crepe;
  let codeMirrorView: EditorView;
  let markdownValue = 'Hello, Milkdown!';

  // 포커스 상태 추적을 위한 변수
  let isCrepeFocused = false;
  let isCodeMirrorFocused = false;

  // 포커스 상태 확인 함수
  function isCrepe() {
    return isCrepeFocused;
  }

  function isCodeMirror() {
    return isCodeMirrorFocused;
  }

  // CodeMirror 초기화 함수
  function setupCodeMirror() {
    const startState = EditorState.create({
      doc: markdownValue,
      extensions: [
        markdown(),
        keymap.of(defaultKeymap),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            markdownValue = update.state.doc.toString();
            updateCrepeFromCodeMirror();
          }
        }),
        // CodeMirror 포커스 이벤트 리스너 추가
        EditorView.domEventHandlers({
          focus: () => {
            isCodeMirrorFocused = true;
            isCrepeFocused = false;
            console.log('CodeMirror 포커스됨');
          },
          blur: () => {
            isCodeMirrorFocused = false;
            console.log('CodeMirror 포커스 해제됨');
          }
        })
      ]
    });

    codeMirrorView = new EditorView({
      state: startState,
      parent: codeMirrorElement
    });
  }

  // CodeMirror 내용 업데이트 함수
  function updateCodeMirrorFromCrepe(newMarkdown: string) {
    if (!codeMirrorView) return;

    codeMirrorView.dispatch({
      changes: {
        from: 0,
        to: codeMirrorView.state.doc.length,
        insert: newMarkdown
      }
    });
  }

  // CodeMirror에서 Crepe로 업데이트
  function updateCrepeFromCodeMirror() {
    if (!isCodeMirrorFocused) {
      return; // CodeMirror에 포커스가 없으면 업데이트하지 않음
    }

    console.log('CodeMirror 변경 감지:', markdownValue);

    if (crepe && crepe.editor) {
      crepe.editor.action((ctx) => {
        const view = ctx.get(editorViewCtx);
        const parser = ctx.get(parserCtx);

        if (view && parser) {
          const doc = parser(markdownValue);
          if (!doc) return;

          const state = view.state;
          const selection = state.selection;
          const { from } = selection;

          let tr = state.tr;
          // 기존 내용을 새 마크다운으로 대체
          tr = tr.replace(0, state.doc.content.size, new Slice(doc.content, 0, 0));
          // 커서 위치 유지
          tr = tr.setSelection(Selection.near(tr.doc.resolve(from)));
          // 트랜잭션 적용
          view.dispatch(tr);

          console.log('crepe 업데이트되었습니다.');
        }
      });
    }
  }

  onMount(async () => {
    if (!browser) {
      return;
    }

    // Crepe 에디터 초기화
    crepe = new Crepe({
      root: editorElement,
      defaultValue: markdownValue
    });

    await crepe.create();

    // Crepe 포커스 이벤트 리스너 추가
    crepe.editor?.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      if (view) {
        view.dom.addEventListener('focus', () => {
          isCrepeFocused = true;
          isCodeMirrorFocused = false;
          console.log('Crepe 포커스됨');
        });
        view.dom.addEventListener('blur', () => {
          isCrepeFocused = false;
          console.log('Crepe 포커스 해제됨');
        });
      }
    });

    // Crepe에서 CodeMirror로 업데이트
    crepe.on((listener: any) => {
      listener.markdownUpdated((_: any, markdown: string, prevMarkdown: string) => {
        if (!isCrepeFocused) {
          return; // Crepe에 포커스가 없으면 업데이트하지 않음
        }
        console.log('crepe 변경 감지:', markdown);
        if (markdown !== prevMarkdown) {
          markdownValue = markdown;
          updateCodeMirrorFromCrepe(markdown);
        }
        console.log('crepe 변경 감지 완료:', markdown);
      });
    });

    // CodeMirror 설정
    setupCodeMirror();
  });

  // 컴포넌트가 파괴될 때 에디터도 정리
  onDestroy(() => {
    if (crepe) {
      crepe.destroy();
    }

    if (codeMirrorView) {
      codeMirrorView.destroy();
    }
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Milkdown 에디터 테스트</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- Milkdown 에디터 -->
    <div class="border rounded-lg p-4 min-h-[400px]">
      <div class="milkdown h-full" bind:this={editorElement}></div>
    </div>

    <!-- CodeMirror 에디터 -->
    <div class="border rounded-lg p-4">
      <div class="codemirror h-[400px]" bind:this={codeMirrorElement}></div>
    </div>
  </div>
</div>
