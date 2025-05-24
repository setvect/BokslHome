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
  };

  // 컴포넌트 메서드 타입 정의
  export type MarkdownEditorMethods = {
    /** 현재 에디터의 내용을 반환 */
    getContent: () => string;
  };
</script>

<script lang="ts">
  import { indentWithTab } from '@codemirror/commands';
  import { java } from '@codemirror/lang-java';
  import { javascript } from '@codemirror/lang-javascript';
  import { markdown } from '@codemirror/lang-markdown';
  import { sql } from '@codemirror/lang-sql';
  import { bracketMatching, LanguageDescription } from '@codemirror/language';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { EditorView, keymap, ViewPlugin, ViewUpdate } from '@codemirror/view';
  import { Button, ButtonGroup } from 'flowbite-svelte';
  import { ExpandOutline, EyeOutline, EyeSolid, MinimizeOutline } from 'flowbite-svelte-icons';
  import { onMount, createEventDispatcher } from 'svelte';
  import CodeMirror from 'svelte-codemirror-editor';
  import { allKeymaps } from './keymaps';
  import MarkdownPreview from './MarkdownPreview.svelte';

  const dispatch = createEventDispatcher();

  // Props 정의
  export let value: MarkdownEditorProps['value'] = '';
  export let width: MarkdownEditorProps['width'] = '100%';
  export let height: MarkdownEditorProps['height'] = '100%';
  export let isDarkMode: MarkdownEditorProps['isDarkMode'] = true;

  let editorView: EditorView;
  let editorElement: HTMLElement;
  let previewComponent: MarkdownPreview;

  // 제어 옵션 상태
  let showPreview = true;
  let isFullscreen = false;

  // 커서 위치 추적 변수
  let currentCursorLine = 0;
  let currentCursorPosition = 0;

  // 언어 지원 사전 정의
  const languageSupport = [
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
    }),
    LanguageDescription.of({
      name: 'markdown',
      alias: ['md'],
      support: markdown()
    })
  ];

  // 커서 위치 변경 감지 플러그인 생성
  const cursorTrackPlugin = ViewPlugin.fromClass(
    class {
      update(update: ViewUpdate) {
        if (update.selectionSet || update.docChanged) {
          const selection = update.state.selection.main;
          const doc = update.state.doc;

          // 현재 커서 위치 저장
          currentCursorPosition = selection.from;

          // 현재 커서의 라인 번호 계산 (0-based)
          currentCursorLine = doc.lineAt(selection.from).number - 1;

          // 미리보기 스크롤 위치 동기화
          syncPreviewScroll();
        }
      }
    }
  );

  // 에디터 추가 확장 기능
  const editorExtensions = [...allKeymaps, bracketMatching(), keymap.of([indentWithTab]), cursorTrackPlugin];

  // 에디터 내용을 가져오는 메서드
  export function getContent(): string {
    return editorView ? editorView.state.doc.toString() : '';
  }

  function handleReady(event: CustomEvent<EditorView>) {
    editorView = event.detail;
    // 에디터 뷰에서 DOM 엘리먼트 가져오기
    editorElement = editorView.dom;
  }

  function handleChange(event: CustomEvent<string>) {
    const newValue = event.detail;
    value = newValue;
    dispatch('change', newValue);
  }

  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
  }

  // 미리보기 스크롤 위치 동기화 함수
  function syncPreviewScroll() {
    if (!showPreview || !previewComponent) return;

    // 전체 라인 수
    const totalLines = editorView ? editorView.state.doc.lines : 0;
    if (totalLines === 0) return;

    // 현재 커서 라인 비율 계산 (0~1 사이 값)
    const lineRatio = currentCursorLine / totalLines;

    // 미리보기 스크롤 위치 동기화 요청
    previewComponent.scrollToPosition(lineRatio);
  }

  // 클립보드 이미지 업로드 처리 함수
  async function uploadImageFromClipboard(imageBlob: Blob): Promise<string> {
    try {
      // 이미지 파일 데이터를 FormData로 준비
      const formData = new FormData();
      formData.append('image', imageBlob, 'clipboard-image.png');

      // 실제 API 호출은 생략하고 임의의 URL 반환
      // API 호출 예시:
      // const response = await fetch('/api/upload/image', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      // return data.imageUrl;

      // 임의의 URL 반환 (실제 구현 시 위 주석 코드로 대체)
      return Promise.resolve(`https://example.com/images/${Date.now()}.png`);
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      throw error;
    }
  }

  // 마크다운 에디터에 이미지 태그 삽입
  function insertImageMarkdown(imageUrl: string) {
    if (!editorView) return;

    const cursor = editorView.state.selection.main.head;
    const imageMarkdown = `![이미지](${imageUrl})`;

    const transaction = editorView.state.update({
      changes: { from: cursor, insert: imageMarkdown }
    });

    editorView.dispatch(transaction);
  }

  // 클립보드 붙여넣기 이벤트 처리 함수
  async function handlePaste(event: ClipboardEvent) {
    // 클립보드에 이미지가 있는지 확인
    const items = event.clipboardData?.items;
    if (!items) return;

    let imageItem = null;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        imageItem = items[i];
        break;
      }
    }

    // 이미지가 아니면 기본 붙여넣기 동작 실행
    if (!imageItem) return;

    // 기본 붙여넣기 동작 방지
    event.preventDefault();

    // 클립보드에서 이미지 데이터 가져오기
    const blob = imageItem.getAsFile();
    if (!blob) return;

    try {
      // 이미지 업로드 및 URL 받기
      const imageUrl = await uploadImageFromClipboard(blob);

      // 마크다운 이미지 태그 삽입
      insertImageMarkdown(imageUrl);
    } catch (error) {
      console.error('이미지 처리 중 오류 발생:', error);
    }
  }

  // 마운트 시 붙여넣기 이벤트 리스너 등록
  onMount(() => {
    const pasteEventHandler = (e: ClipboardEvent) => {
      handlePaste(e);
    };

    // CodeMirror 초기화 후 이벤트 리스너 등록을 위한 지연 처리
    const setupPasteListener = () => {
      if (editorElement) {
        editorElement.addEventListener('paste', pasteEventHandler);
        return () => {
          editorElement.removeEventListener('paste', pasteEventHandler);
        };
      }
    };

    // editorElement가 준비되면 이벤트 리스너 설정
    const interval = setInterval(() => {
      if (editorElement) {
        setupPasteListener();
        clearInterval(interval);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (editorElement) {
        editorElement.removeEventListener('paste', pasteEventHandler);
      }
    };
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
      {#key isDarkMode}
        <CodeMirror
          bind:value
          lang={markdown({
            codeLanguages: languageSupport
          })}
          theme={isDarkMode ? oneDark : undefined}
          extensions={editorExtensions}
          on:ready={handleReady}
          on:change={handleChange}
          styles={{
            '&': {
              height: '100%',
              fontSize: '1.3em'
            }
          }}
        />
      {/key}
    </div>
    {#if showPreview}
      <div class="preview-outer">
        <MarkdownPreview content={value} {isDarkMode} bind:this={previewComponent} />
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
