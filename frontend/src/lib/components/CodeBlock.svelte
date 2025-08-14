<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  
  export let code: string;
  export let language: string = 'html';
  export let title: string = '';
  export let showCopy: boolean = true;
  
  let codeElement: HTMLElement;
  let copied = false;
  
  onMount(async () => {
    if (browser) {
      // Prism.js 동적 로드
      const Prism = await import('prismjs');
      
      // 필요한 언어 로드
      if (language === 'svelte') {
        await import('prismjs/components/prism-javascript' as any);
        await import('prismjs/components/prism-typescript' as any);
        // Svelte는 HTML과 유사하게 처리
        language = 'markup';
      } else if (language === 'typescript' || language === 'ts') {
        await import('prismjs/components/prism-typescript' as any);
        language = 'typescript';
      } else if (language === 'javascript' || language === 'js') {
        await import('prismjs/components/prism-javascript' as any);
        language = 'javascript';
      } else if (language === 'css') {
        await import('prismjs/components/prism-css' as any);
      }
      
      if (codeElement) {
        codeElement.innerHTML = Prism.highlight(code, Prism.languages[language] || Prism.languages.markup, language);
      }
    }
  });
  
  async function copyCode() {
    if (browser && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => copied = false, 2000);
      } catch (err) {
        console.error('클립보드 복사 실패:', err);
      }
    }
  }
</script>

<div class="relative group">
  {#if title}
    <div class="flex items-center justify-between bg-muted px-4 py-2 border-b border-border">
      <span class="text-sm font-medium text-foreground">{title}</span>
      {#if showCopy}
        <button
          class="opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 bg-background border border-border rounded hover:bg-accent"
          onclick={copyCode}
        >
          {copied ? '복사됨!' : '복사'}
        </button>
      {/if}
    </div>
  {:else if showCopy}
    <button
      class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 bg-background border border-border rounded hover:bg-accent z-10"
      onclick={copyCode}
    >
      {copied ? '복사됨!' : '복사'}
    </button>
  {/if}
  
  <pre class="overflow-x-auto bg-card border border-border rounded-md {title ? 'rounded-t-none' : ''}"><code 
    bind:this={codeElement}
    class="language-{language} text-sm block p-4"
  >{code}</code></pre>
</div>

<style>
  /* Prism.js 기본 테마 (라이트 모드) */
  
  :global(.token.comment),
  :global(.token.prolog),
  :global(.token.doctype),
  :global(.token.cdata) {
    color: hsl(var(--muted-foreground));
  }
  
  :global(.token.punctuation) {
    color: hsl(var(--foreground));
  }
  
  :global(.token.property),
  :global(.token.tag),
  :global(.token.boolean),
  :global(.token.number),
  :global(.token.constant),
  :global(.token.symbol),
  :global(.token.deleted) {
    color: hsl(var(--destructive));
  }
  
  :global(.token.selector),
  :global(.token.attr-name),
  :global(.token.string),
  :global(.token.char),
  :global(.token.builtin),
  :global(.token.inserted) {
    color: #22c55e;
  }
  
  :global(.token.operator),
  :global(.token.entity),
  :global(.token.url),
  :global(.language-css .token.string),
  :global(.style .token.string) {
    color: hsl(var(--primary));
  }
  
  :global(.token.atrule),
  :global(.token.attr-value),
  :global(.token.keyword) {
    color: #3b82f6;
  }
  
  :global(.token.function),
  :global(.token.class-name) {
    color: #f59e0b;
  }
  
  :global(.token.regex),
  :global(.token.important),
  :global(.token.variable) {
    color: #ec4899;
  }
  
  /* 다크 모드 조정 */
  :global(.dark) :global(.token.property),
  :global(.dark) :global(.token.tag),
  :global(.dark) :global(.token.boolean),
  :global(.dark) :global(.token.number),
  :global(.dark) :global(.token.constant),
  :global(.dark) :global(.token.symbol),
  :global(.dark) :global(.token.deleted) {
    color: #f87171;
  }
  
  :global(.dark) :global(.token.selector),
  :global(.dark) :global(.token.attr-name),
  :global(.dark) :global(.token.string),
  :global(.dark) :global(.token.char),
  :global(.dark) :global(.token.builtin),
  :global(.dark) :global(.token.inserted) {
    color: #4ade80;
  }
  
  :global(.dark) :global(.token.atrule),
  :global(.dark) :global(.token.attr-value),
  :global(.dark) :global(.token.keyword) {
    color: #60a5fa;
  }
  
  :global(.dark) :global(.token.function),
  :global(.dark) :global(.token.class-name) {
    color: #fbbf24;
  }
</style>