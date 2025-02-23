<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';

  export let content: string = '';
  export let theme: string = 'snow';
  // 기본 툴바 옵션 (props로 전달받거나 수정 가능)
  export let modules: any = {
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

  onMount(async () => {
    const QuillModule = await import('quill');
    const Quill = QuillModule.default;
    quillEditor = new Quill(editorContainer, {
      theme,
      modules
    });
    // 초기값 설정
    quillEditor.root.innerHTML = content;
    quillEditor.on('text-change', () => {
      content = quillEditor.root.innerHTML;
      dispatch('change', content);
    });
  });
</script>

<!-- 에디터가 렌더링될 영역 -->
<div bind:this={editorContainer} class="quill-editor"></div>

<style>
  :global(.ql-editor) {
    height: 450px;
    overflow-y: auto;
  }
  :global(.dark .ql-toolbar) {
    background-color: #1d1d1d;
    border-color: #444;
  }
  :global(.dark .ql-container) {
    border: 1px solid #444;
  }
  :global(.dark .ql-editor) {
    background-color: #2d2d2d;
    color: #ddd;
  }
</style>
