<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    code: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
  }

  let { code, language = 'javascript', title, showLineNumbers = true }: Props = $props();
  
  let codeElement: HTMLElement;
  
  onMount(async () => {
    try {
      // 동적으로 prismjs 로드
      const Prism = await import('prismjs');
      
      // 언어별 하이라이팅 지원
      if (language !== 'javascript') {
        try {
          await import(`prismjs/components/prism-${language}` as any);
        } catch (e) {
          // 지원하지 않는 언어는 기본 텍스트로 처리
          console.warn(`Language ${language} not supported, using plain text`);
        }
      }
      
      if (codeElement) {
        Prism.highlightElement(codeElement);
      }
    } catch (error) {
      console.error('Failed to load syntax highlighting:', error);
    }
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(code).then(() => {
      // TODO: 토스트 알림 추가
    });
  }
</script>

<div class="relative rounded-lg border border-border bg-muted/20 overflow-hidden">
  {#if title}
    <div class="flex items-center justify-between px-4 py-2 bg-muted/30 border-b border-border">
      <span class="text-sm font-medium text-foreground">{title}</span>
      <button
        onclick={copyToClipboard}
        class="p-1.5 text-foreground/60 hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
        aria-label="코드 복사"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    </div>
  {/if}
  
  <div class="relative">
    <pre class="overflow-x-auto p-4 text-sm {showLineNumbers ? 'line-numbers' : ''}"><code 
      bind:this={codeElement}
      class="language-{language} text-foreground">{code}</code></pre>
    
    {#if !title}
      <button
        onclick={copyToClipboard}
        class="absolute top-2 right-2 p-1.5 text-foreground/60 hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
        aria-label="코드 복사"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      </button>
    {/if}
  </div>
</div>

<style>
  :global(.line-numbers .line-numbers-rows) {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    width: 3em;
    letter-spacing: -1px;
    border-right: 1px solid hsl(var(--border));
    user-select: none;
    counter-reset: linenumber;
  }

  :global(.line-numbers .line-numbers-rows > span) {
    pointer-events: none;
    display: block;
    counter-increment: linenumber;
  }

  :global(.line-numbers .line-numbers-rows > span:before) {
    content: counter(linenumber);
    color: hsl(var(--foreground) / 0.4);
    display: block;
    padding-right: 0.8em;
    text-align: right;
  }

  :global(.line-numbers pre) {
    padding-left: 3.8em;
  }
</style>