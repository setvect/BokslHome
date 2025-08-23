<script lang="ts">
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
  import CodeBlock from '$lib/components/docs/CodeBlock.svelte';
  import PropsTable from '$lib/components/docs/PropsTable.svelte';
  let value = $state<string>('# Hello Markdown\n\n- item 1\n- item 2\n\n```mermaid\ngraph TD; A-->B;\n```');

  const example = `<script lang=\"ts\">\n  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';\n  let value = $state<string>('# Title');\n<\/script>\n\n<MarkdownEditor bind:value preview placeholder=\"Write markdown...\" />`;
</script>

<section class="space-y-4">
  <h1 class="text-2xl font-bold">Markdown Editor</h1>
  <MarkdownEditor height="600px" showPreview={true} {value} />
  <div class="text-xs text-muted-foreground">
    Tip: 이미지 붙여넣기(Ctrl+V) 또는 파일 드래그 앤 드롭으로 본문 삽입이 가능합니다. Mermaid 블록(```mermaid)도 렌더링됩니다.
  </div>
</section>
