<script lang="ts">
  // 에디터 통합 테스트 페이지
  // - 두 에디터 동시 테스트
  // - Markdown ↔ HTML 변환 기능
  // - 간이 성능 테스트(변환 시간 측정, 대용량 텍스트)

  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
  import HtmlEditor from '$lib/components/ui/HtmlEditor.svelte';
  import { renderMarkdown } from '$lib/utils/markdown-renderer';

  let md = $state<string>('# 통합 테스트\n\n- 항목 A\n- 항목 B\n\n```mermaid\ngraph TD; A-->B;\n```');
  let html = $state<string>('');
  let converting = $state<boolean>(false);
  let lastDurationMs = $state<number | null>(null);

  // Markdown → HTML
  async function convertMarkdownToHtml() {
    converting = true;
    const start = performance.now();
    html = await renderMarkdown(md);
    lastDurationMs = Math.round(performance.now() - start);
    converting = false;
  }

  // HTML → Markdown (간이 변환기 사용)
  async function convertHtmlToMarkdown() {
    converting = true;
    const start = performance.now();
    md = basicHtmlToMarkdown(html);
    lastDurationMs = Math.round(performance.now() - start);
    converting = false;
  }

  function basicHtmlToMarkdown(source: string): string {
    // 매우 단순한 대체 변환기 (테스트 용도)
    let out = source;
    out = out.replace(/\r\n/g, '\n');
    out = out.replace(/<br\s*\/>/gi, '\n');
    out = out.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n');
    out = out.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n');
    out = out.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n');
    out = out.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '#### $1\n\n');
    out = out.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
    out = out.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
    out = out.replace(/<b[^>]*>([\s\S]*?)<\/b>/gi, '**$1**');
    out = out.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
    out = out.replace(/<i[^>]*>([\s\S]*?)<\/i>/gi, '*$1*');
    out = out.replace(/<ul[^>]*>[\s\S]*?<\/ul>/gi, (m) => m.replace(/<\/?ul[^>]*>/gi, '').replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n'));
    out = out.replace(/<ol[^>]*>[\s\S]*?<\/ol>/gi, (m) => {
      let idx = 1;
      return m.replace(/<\/?ol[^>]*>/gi, '').replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${idx++}. $1\n`);
    });
    out = out.replace(/<a[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)');
    out = out.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, '`$1`');
    // 태그 제거
    out = out.replace(/<[^>]+>/g, '');
    return decodeEntities(out).trim();
  }

  function decodeEntities(text: string): string {
    if (typeof window === 'undefined') return text;
    const el = document.createElement('div');
    el.innerHTML = text;
    return el.textContent ?? text;
  }

  // 대용량 텍스트 샘플 생성 및 변환 시간 측정
  async function generateLargeSample(paragraphs: number = 100) {
    const sample =
      Array.from({ length: paragraphs })
        .map((_, i) => `### 섹션 ${i + 1}\n\n- 항목 A${i}\n- 항목 B${i}\n\n문단 내용 ${i} 입니다.\n\n`)
        .join('\n') + '\n```mermaid\nsequenceDiagram\n    Alice->>Bob: Hello Bob, how are you?\n    Bob-->>Alice: I am good thanks!\n```\n';
    md = `# 대용량 테스트\n\n${sample}`;
    await convertMarkdownToHtml();
  }

  // 초기 HTML 동기화
  $effect(() => {
    // 페이지 진입 시 1회 동기화
    if (!html) {
      convertMarkdownToHtml();
    }
  });
</script>

<section class="space-y-4">
  <h1 class="text-2xl font-bold">Editors Integration Test</h1>
  <div class="text-sm text-muted-foreground">MarkdownEditor ↔ HtmlEditor 동시 테스트 및 변환</div>

  <div class="flex flex-col gap-4 md:flex-row">
    <div class="flex-1 min-w-0">
      <div class="mb-2 font-medium">Markdown</div>
      <MarkdownEditor bind:value={md} class="min-h-80" />
    </div>
    <div class="flex-1 min-w-0 md:pl-4 md:border-l border-border">
      <div class="mb-2 font-medium">HTML</div>
      <HtmlEditor bind:value={html} height={360} />
    </div>
  </div>

  <div class="flex flex-wrap items-center gap-2">
    <button class="px-3 py-1 border rounded" type="button" onclick={() => convertMarkdownToHtml()} disabled={converting}>
      Markdown → HTML 변환
    </button>
    <button class="px-3 py-1 border rounded" type="button" onclick={() => convertHtmlToMarkdown()} disabled={converting}>
      HTML → Markdown 변환
    </button>
    <button class="px-3 py-1 border rounded" type="button" onclick={() => generateLargeSample(300)} disabled={converting}>
      대용량 샘플(≈300단락)
    </button>
    {#if converting}
      <span class="text-sm text-muted-foreground">변환 중…</span>
    {/if}
    {#if lastDurationMs !== null}
      <span class="text-sm text-muted-foreground">최근 변환 시간: {lastDurationMs} ms</span>
    {/if}
  </div>
</section>
