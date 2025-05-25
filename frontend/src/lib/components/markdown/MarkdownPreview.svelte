<svelte:options runes={true} />

<script lang="ts">
  import { onMount } from 'svelte';
  import { parseMarkdown, setMarkdownTheme } from '$lib/utils/markdown';
  // 기본 테마 스타일 import
  import 'highlight.js/styles/github.css';
  import 'highlight.js/styles/github-dark.css';

  // Props 정의 (Runes Mode)
  let {
    content = '',
    isDarkMode = true
  }: {
    content?: string;
    isDarkMode?: boolean;
  } = $props();

  let previewHtml = $state('');
  let previewContainer = $state<HTMLDivElement>();
  let isInitialized = $state(false);

  // 마크다운을 HTML로 변환
  async function updatePreview(markdownText: string) {
    try {
      previewHtml = await parseMarkdown(markdownText);
    } catch (error) {
      console.error('미리보기 업데이트 오류:', error);
      previewHtml = '<p>미리보기 업데이트 중 오류가 발생했습니다.</p>';
    }
  }

  // content가 변경될 때마다 미리보기 업데이트
  $effect(() => {
    if (isInitialized) {
      updatePreview(content);
    }
  });

  /**
   * 스크롤 위치를 비율에 따라 설정하는 메서드
   * @param positionRatio 0~1 사이의 값으로, 문서 내에서의 상대적 위치
   */
  export function scrollToPosition(positionRatio: number) {
    if (!previewContainer) return;

    // 스크롤 가능한 높이 계산
    const scrollHeight = previewContainer.scrollHeight - previewContainer.clientHeight;

    // 비율에 따른 스크롤 위치 계산
    const targetScrollTop = scrollHeight * positionRatio;

    // 부드러운 스크롤 적용
    previewContainer.scrollTo({
      top: targetScrollTop,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    // 다크모드 테마 적용
    setMarkdownTheme(isDarkMode);

    // 초기화 완료 상태로 설정
    isInitialized = true;

    // 컴포넌트가 마운트된 후에 content가 있다면 업데이트
    if (content) {
      updatePreview(content);
    }
  });

  // isDarkMode가 변경될 때마다 테마 업데이트
  $effect(() => {
    if (isDarkMode !== undefined) {
      setMarkdownTheme(isDarkMode);
    }
  });
</script>

<div class="preview-container" class:dark={isDarkMode} bind:this={previewContainer}>
  {@html previewHtml}
</div>

<style>
  .preview-container {
    flex: 1;
    height: 100%;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    overflow: auto;
    background-color: white;
    color: #1a202c;
    scroll-behavior: smooth;
  }

  .preview-container.dark {
    background-color: #1a202c;
    color: #e2e8f0;
    border-color: #4a5568;
  }

  /* 마크다운 스타일 */
  .preview-container :global(h1) {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  .preview-container :global(h2) {
    font-size: 1.5em;
    margin-bottom: 0.5em;
  }

  .preview-container :global(h3) {
    font-size: 1.25em;
    margin-bottom: 0.5em;
  }

  .preview-container :global(p) {
    margin-bottom: 1em;
  }

  .preview-container :global(ul),
  .preview-container :global(ol) {
    margin-bottom: 1em;
    padding-left: 2em;
  }

  .preview-container :global(li) {
    margin-bottom: 0.5em;
  }

  /* 코드 하이라이팅 관련 스타일 */
  :global(html[data-theme='light']) :global(.hljs) {
    display: block;
    background: #f7fafc;
  }

  :global(html[data-theme='dark']) :global(.hljs) {
    display: block;
    background: #2d3748;
  }

  .preview-container :global(code) {
    padding: 0.2em 0.4em;
    border-radius: 0.25em;
  }

  .preview-container :global(pre) {
    padding: 1em;
    border-radius: 0.375rem;
    overflow-x: auto;
    margin-bottom: 1em;
  }

  .preview-container :global(pre code) {
    padding: 0;
    border-radius: 0;
    background-color: transparent;
  }

  .preview-container :global(blockquote) {
    border-left: 4px solid #e2e8f0;
    padding-left: 1em;
    margin-left: 0;
    margin-bottom: 1em;
    color: #4a5568;
  }

  .preview-container.dark :global(blockquote) {
    border-left-color: #4a5568;
    color: #a0aec0;
  }

  .preview-container :global(table) {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1em;
  }

  .preview-container :global(th),
  .preview-container :global(td) {
    border: 1px solid #e2e8f0;
    padding: 0.5em;
  }

  .preview-container.dark :global(th),
  .preview-container.dark :global(td) {
    border-color: #4a5568;
  }

  .preview-container :global(th) {
    background-color: #f7fafc;
  }

  .preview-container.dark :global(th) {
    background-color: #2d3748;
  }
</style>
