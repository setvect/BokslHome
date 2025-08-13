<script lang="ts">
  // MarkdownEditor 컴포넌트 - 2단계: CodeMirror 통합
  import { onMount, onDestroy } from 'svelte';
  import CodeMirror from 'svelte-codemirror-editor';
  import { markdown } from '@codemirror/lang-markdown';
  import { EditorView } from '@codemirror/view';
  import { EditorState } from '@codemirror/state';
  
  // Props 정의
  let { 
    value = $bindable('# Hello Markdown!\n\n여기에 마크다운을 작성하세요...'), 
    readOnly = false,
    height = '400px',
    showPreview = true,
    onChange
  } = $props<{
    value?: string;
    readOnly?: boolean; 
    height?: string;
    showPreview?: boolean;
    onChange?: (value: string) => void;
  }>();
  
  // 상태 변수
  let currentValue = $state(value);
  let previewVisible = $state(showPreview);
  let editorView: EditorView | undefined;
  
  // CodeMirror 확장 설정
  const extensions = [
    markdown(),
    EditorView.theme({
      '&': {
        fontSize: '14px',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace'
      },
      '.cm-content': {
        padding: '12px',
        minHeight: 'calc(100% - 24px)'
      },
      '.cm-focused': {
        outline: 'none'
      },
      '.cm-editor': {
        height: '100%'
      },
      '.cm-scroller': {
        fontFamily: 'inherit'
      }
    })
  ];
  
  // 값 변경 핸들러
  function handleValueChange(newValue: string) {
    currentValue = newValue;
    value = newValue; // 양방향 바인딩
    onChange?.(newValue);
  }
  
  // value prop 변경 시 currentValue 동기화
  $effect(() => {
    if (currentValue !== value) {
      currentValue = value;
    }
  });
  
  // 미리보기 토글
  function togglePreview() {
    previewVisible = !previewVisible;
  }
</script>

<!-- 컴포넌트 구조 -->
<div class="markdown-editor" style="height: {height};">
  <!-- 툴바 -->
  <div class="markdown-toolbar">
    <button 
      class="toolbar-btn" 
      onclick={togglePreview}
      aria-label="미리보기 토글"
    >
      {previewVisible ? '📝 편집만' : '👁️ 미리보기'}
    </button>
    <span class="toolbar-title">Markdown Editor</span>
  </div>
  
  <!-- 메인 영역: 2단 레이아웃 -->
  <div class="markdown-content" class:preview-hidden={!previewVisible}>
    <!-- 에디터 패널 -->
    <div class="editor-panel">
      <div class="codemirror-container">
        <CodeMirror
          bind:value={currentValue}
          {extensions}
          {readOnly}
          on:change={(e) => handleValueChange(e.detail)}
          class="markdown-codemirror"
        />
      </div>
    </div>
    
    <!-- 분할자 -->
    {#if previewVisible}
      <div class="editor-divider"></div>
    {/if}
    
    <!-- 미리보기 패널 -->
    {#if previewVisible}
      <div class="preview-panel">
        <div class="preview-placeholder">
          <h3>👁️ 미리보기 영역</h3>
          <p>Marked 렌더링이 여기에 들어갑니다</p>
          <div class="preview-content">
            {currentValue}
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .markdown-editor {
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--background);
    color: var(--foreground);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  /* 툴바 */
  .markdown-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
    background: var(--muted);
    min-height: 40px;
  }
  
  .toolbar-btn {
    padding: 4px 8px;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--background);
    color: var(--foreground);
    cursor: pointer;
    font-size: 14px;
  }
  
  .toolbar-btn:hover {
    background: var(--accent);
  }
  
  .toolbar-title {
    font-weight: 500;
    color: var(--muted-foreground);
  }
  
  /* 메인 컨텐츠 영역 */
  .markdown-content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }
  
  .markdown-content.preview-hidden .editor-panel {
    flex: 1;
  }
  
  /* 에디터 패널 */
  .editor-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* flex 자식의 최소 너비 문제 해결 */
  }
  
  .codemirror-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
  }
  
  :global(.markdown-codemirror) {
    height: 100%;
    flex: 1;
  }
  
  :global(.markdown-codemirror .cm-editor) {
    height: 100%;
    background: var(--background) !important;
    color: var(--foreground) !important;
  }
  
  :global(.markdown-codemirror .cm-content) {
    background: var(--background) !important;
    color: var(--foreground) !important;
  }
  
  :global(.markdown-codemirror .cm-focused) {
    outline: 2px solid var(--ring);
    outline-offset: -2px;
  }
  
  :global(.markdown-codemirror .cm-activeLine) {
    background: var(--accent) !important;
  }
  
  :global(.markdown-codemirror .cm-selectionBackground) {
    background: var(--primary) !important;
    opacity: 0.3;
  }
  
  /* 분할자 */
  .editor-divider {
    width: 1px;
    background: var(--border);
    cursor: col-resize;
  }
  
  .editor-divider:hover {
    background: var(--ring);
  }
  
  /* 미리보기 패널 */
  .preview-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  
  .preview-placeholder {
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .preview-content {
    flex: 1;
    padding: 12px;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--muted);
    white-space: pre-wrap;
    font-family: monospace;
    font-size: 12px;
    overflow: auto;
  }
  
  /* 반응형 */
  @media (max-width: 768px) {
    .markdown-content {
      flex-direction: column;
    }
    
    .editor-divider {
      width: 100%;
      height: 1px;
      cursor: row-resize;
    }
  }
</style>