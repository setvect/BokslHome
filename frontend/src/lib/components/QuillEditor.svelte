<svelte:options runes={true} />

<script module lang="ts">
  // 컴포넌트 타입 정의
  export type QuillEditorProps = {
    /** 에디터의 내용 (양방향 바인딩) */
    content?: string;
    /** 에디터 테마 ('snow' 또는 'bubble') */
    theme?: string;
    /** Quill 모듈 설정 (툴바 등) */
    modules?: any;
    /** 내용이 변경될 때 호출되는 콜백 함수 */
    onchange?: (content: string) => void;
    /** 에디터의 넓이 (CSS 값: '100%', '500px' 등) */
    width?: string;
    /** 에디터의 높이 (CSS 값: '300px', '50vh' 등) */
    height?: string;
    /** 다크모드 활성화 여부 */
    darkMode?: boolean;
  };

  // 컴포넌트 메서드 타입 정의
  export type QuillEditorMethods = {
    /** 현재 에디터의 HTML 내용을 반환 */
    getContent: () => string;
    /** 에디터의 내용을 설정 */
    setContent: (content: string) => void;
    /** 에디터의 텍스트만 반환 (HTML 태그 제외) */
    getText: () => string;
    /** 에디터의 길이를 반환 */
    getLength: () => number;
    /** 에디터에 포커스 설정 */
    focus: () => void;
    /** 에디터 비활성화/활성화 */
    enable: (enabled: boolean) => void;
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';

  // Props 정의 (Runes Mode)
  let {
    content = $bindable(''),
    theme = 'snow',
    modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video']
      ]
    },
    onchange = undefined,
    width = '100%',
    height = '300px',
    darkMode = false
  }: QuillEditorProps = $props();

  let editorContainer = $state<HTMLDivElement>();
  let quillEditor = $state<any>();
  let editorReadyPromise = $state<Promise<void>>();
  let resolveEditorReady: (() => void) | null = null;

  // 에디터 준비 완료 Promise 초기화
  $effect(() => {
    editorReadyPromise = new Promise<void>((resolve) => {
      resolveEditorReady = resolve;
    });
  });

  // 외부에서 content가 변경될 때 에디터에 반영
  $effect(() => {
    if (quillEditor && content !== quillEditor.root.innerHTML) {
      quillEditor.root.innerHTML = content || '';
    }
  });

  // 에디터의 HTML 내용을 반환하는 메서드
  export function getContent(): string {
    return quillEditor ? quillEditor.root.innerHTML : '';
  }

  // 에디터의 내용을 설정하는 메서드
  export function setContent(newContent: string): void {
    if (quillEditor) {
      quillEditor.root.innerHTML = newContent;
      content = newContent;
    }
  }

  // 에디터의 텍스트만 반환하는 메서드 (HTML 태그 제외)
  export function getText(): string {
    return quillEditor ? quillEditor.getText() : '';
  }

  // 에디터의 길이를 반환하는 메서드
  export function getLength(): number {
    return quillEditor ? quillEditor.getLength() : 0;
  }

  // 에디터에 포커스를 설정하는 메서드
  export async function focus(): Promise<void> {
    if (editorReadyPromise) {
      await editorReadyPromise;
      if (quillEditor) {
        quillEditor.focus();
      }
    }
  }

  // 에디터를 활성화/비활성화하는 메서드
  export function enable(enabled: boolean): void {
    if (quillEditor) {
      quillEditor.enable(enabled);
    }
  }

  onMount(() => {
    if (!editorContainer) return;

    (async () => {
      const QuillModule = await import('quill');
      const Quill = QuillModule.default;

      quillEditor = new Quill(editorContainer, {
        theme,
        modules
      });

      // 초기값 설정
      quillEditor.root.innerHTML = content || '';

      quillEditor.on('text-change', () => {
        content = quillEditor.root.innerHTML;
        onchange?.(content);
      });

      // 클립보드 붙여넣기 이벤트 리스너 등록
      const pasteEventHandler = (e: ClipboardEvent) => {
        handlePaste(e);
      };

      // capture 단계에서 등록하여 Quill보다 먼저 실행
      quillEditor.root.addEventListener('paste', pasteEventHandler, true);

      // 에디터 준비 완료 알림
      if (resolveEditorReady) {
        resolveEditorReady();
      }
    })();

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (quillEditor && quillEditor.root) {
        quillEditor.root.removeEventListener('paste', () => {});
      }
    };
  });

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

  // Quill 에디터에 이미지 삽입
  function insertImage(imageUrl: string) {
    if (!quillEditor) return;

    const range = quillEditor.getSelection();
    const index = range ? range.index : quillEditor.getLength();

    quillEditor.insertEmbed(index, 'image', imageUrl);
    quillEditor.setSelection(index + 1);
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

    // 이미지가 있으면 즉시 기본 동작 차단
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    // 클립보드에서 이미지 데이터 가져오기
    const blob = imageItem.getAsFile();
    if (!blob) return;

    try {
      // 이미지 업로드 및 URL 받기
      const imageUrl = await uploadImageFromClipboard(blob);

      // Quill 에디터에 이미지 삽입
      insertImage(imageUrl);
    } catch (error) {
      console.error('이미지 처리 중 오류 발생:', error);
    }
  }
</script>

<!-- 에디터가 렌더링될 영역 -->
<div class="quill-editor {darkMode ? 'quill-dark' : 'quill-light'}" style="width: {width}; --editor-height: {height};">
  <div bind:this={editorContainer}></div>
</div>

<style>
  /* 기본 에디터 스타일 */
  :global(.quill-editor) {
    border: 1px solid #e5e7eb;
    border-radius: 0.375rem;
  }

  /* 라이트 모드 스타일 */
  :global(.quill-light) {
    border-color: #e5e7eb;
  }

  :global(.quill-light .ql-toolbar) {
    background-color: #ffffff;
    border-color: #e5e7eb;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 0.375rem 0.375rem 0 0;
  }

  :global(.quill-light .ql-container) {
    background-color: #ffffff;
    color: #1f2937;
    border-color: #e5e7eb;
    border-top: none;
    border-radius: 0 0 0.375rem 0.375rem;
  }

  :global(.quill-light .ql-editor) {
    color: #1f2937;
    min-height: 150px;
    height: var(--editor-height, 300px);
  }

  :global(.quill-light .ql-toolbar button:hover) {
    background-color: #f3f4f6;
    border-radius: 0.25rem;
  }

  :global(.quill-light .ql-toolbar button.ql-active) {
    background-color: #e5e7eb;
    border-radius: 0.25rem;
  }

  /* 다크 모드 스타일 */
  :global(.quill-dark) {
    border-color: #4b5563;
  }

  :global(.quill-dark .ql-toolbar) {
    background-color: #374151;
    border-color: #4b5563;
    border-bottom: 1px solid #4b5563;
    border-radius: 0.375rem 0.375rem 0 0;
  }

  :global(.quill-dark .ql-container) {
    background-color: #1f2937;
    color: #f9fafb;
    border-color: #4b5563;
    border-top: none;
    border-radius: 0 0 0.375rem 0.375rem;
  }

  :global(.quill-dark .ql-editor) {
    color: #f9fafb;
    min-height: 150px;
    height: var(--editor-height, 300px);
  }

  :global(.quill-dark .ql-toolbar button) {
    color: #f3f4f6;
    border-radius: 0.25rem;
  }

  :global(.quill-dark .ql-toolbar button:hover) {
    background-color: #4b5563;
    border-radius: 0.25rem;
  }

  :global(.quill-dark .ql-toolbar button.ql-active) {
    background-color: #6b7280;
    border-radius: 0.25rem;
  }

  /* SVG 아이콘 스타일 */
  :global(.quill-editor.quill-dark .ql-toolbar svg .ql-stroke) {
    stroke: #f3f4f6 !important;
  }

  :global(.quill-editor.quill-dark .ql-toolbar svg .ql-fill) {
    fill: #f3f4f6 !important;
  }

  :global(.quill-editor.quill-light .ql-toolbar svg .ql-stroke) {
    stroke: #374151 !important;
  }

  :global(.quill-editor.quill-light .ql-toolbar svg .ql-fill) {
    fill: #374151 !important;
  }

  /* 드롭다운 메뉴 스타일 */
  :global(.quill-editor.quill-dark .ql-picker-options) {
    background-color: #374151 !important;
    border: 1px solid #4b5563 !important;
    border-radius: 0.25rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }

  :global(.quill-editor.quill-dark .ql-picker-item) {
    color: #f9fafb !important;
    background-color: transparent;
  }

  :global(.quill-editor.quill-dark .ql-picker-item:hover) {
    background-color: #4b5563 !important;
    color: #ffffff !important;
  }

  :global(.quill-editor.quill-dark .ql-picker-item.ql-selected) {
    background-color: #6b7280 !important;
    color: #ffffff !important;
  }

  :global(.quill-editor.quill-dark .ql-picker-label) {
    color: #f3f4f6 !important;
    border-color: #4b5563;
  }

  :global(.quill-editor.quill-light .ql-picker-options) {
    background-color: #ffffff !important;
    border: 1px solid #e5e7eb !important;
    border-radius: 0.25rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  :global(.quill-editor.quill-light .ql-picker-item) {
    color: #1f2937 !important;
    background-color: transparent;
  }

  :global(.quill-editor.quill-light .ql-picker-item:hover) {
    background-color: #f3f4f6 !important;
    color: #111827 !important;
  }

  :global(.quill-editor.quill-light .ql-picker-item.ql-selected) {
    background-color: #e5e7eb !important;
    color: #111827 !important;
  }

  :global(.quill-editor.quill-light .ql-picker-label) {
    color: #374151 !important;
    border-color: #d1d5db;
  }

  /* 툴팁 스타일 */
  :global(.quill-dark .ql-tooltip) {
    background-color: #374151;
    border: 1px solid #4b5563;
    color: #f9fafb;
    border-radius: 0.25rem;
  }

  :global(.quill-dark .ql-tooltip input) {
    background-color: #1f2937;
    color: #f9fafb;
    border: 1px solid #4b5563;
  }

  :global(.quill-light .ql-tooltip) {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    color: #1f2937;
    border-radius: 0.25rem;
  }

  :global(.quill-light .ql-tooltip input) {
    background-color: #ffffff;
    color: #1f2937;
    border: 1px solid #e5e7eb;
  }

  /* 선택 영역 스타일 */
  :global(.quill-dark .ql-editor ::selection) {
    background-color: #3b82f6;
  }

  :global(.quill-light .ql-editor ::selection) {
    background-color: #dbeafe;
  }

  /* 포커스 상태 */
  :global(.quill-light .ql-container.ql-focused) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }

  :global(.quill-dark .ql-container.ql-focused) {
    border-color: #60a5fa;
    box-shadow: 0 0 0 1px #60a5fa;
  }

  /* 플레이스홀더 스타일 */
  :global(.quill-editor .ql-editor.ql-blank::before) {
    color: #9ca3af;
    font-style: italic;
  }

  :global(.quill-dark .ql-editor.ql-blank::before) {
    color: #6b7280;
  }

  /* 에디터 컨테이너 정리 */
  :global(.quill-editor .ql-container) {
    font-family: inherit;
  }

  :global(.quill-editor .ql-tooltip) {
    z-index: 1000;
  }

  :global(.quill-editor .ql-hidden) {
    display: none !important;
  }
</style>
