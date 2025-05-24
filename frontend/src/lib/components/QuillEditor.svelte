<script context="module" lang="ts">
  // 컴포넌트 타입 정의
  export type QuillEditorProps = {
    /** 에디터의 내용 */
    content?: string;
    /** 에디터 테마 ('snow' 또는 'bubble') */
    theme?: string;
    /** Quill 모듈 설정 (툴바 등) */
    modules?: any;
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
  import { onMount, createEventDispatcher } from 'svelte';

  // Props 정의
  export let content: string = '';
  export let theme: QuillEditorProps['theme'] = 'snow';
  // 기본 툴바 옵션 (props로 전달받거나 수정 가능)
  export let modules: QuillEditorProps['modules'] = {
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
  };

  const dispatch = createEventDispatcher();
  let editorContainer: HTMLDivElement;
  let quillEditor: any;

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
  export function focus(): void {
    if (quillEditor) {
      quillEditor.focus();
    }
  }

  // 에디터를 활성화/비활성화하는 메서드
  export function enable(enabled: boolean): void {
    if (quillEditor) {
      quillEditor.enable(enabled);
    }
  }

  onMount(async () => {
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
      dispatch('change', content);
    });
  });
</script>

<!-- 에디터가 렌더링될 영역 -->
<div bind:this={editorContainer} class="quill-editor"></div>
