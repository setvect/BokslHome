<script lang="ts">
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
  import CodeBlock from '$lib/components/docs/CodeBlock.svelte';
  import PropsTable from '$lib/components/docs/PropsTable.svelte';
  let value = $state<string>('# Hello Markdown\n\n- item 1\n- item 2\n\n```mermaid\ngraph TD; A-->B;\n```');

  const example = `<script lang=\"ts\">\n  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';\n  let value = $state<string>('# Title');\n<\/script>\n\n<MarkdownEditor bind:value preview placeholder=\"Write markdown...\" />`;

  const propsRows = [
    { name: 'value', type: 'string', default: "''", description: '양방향 바인딩 지원 (Svelte 5 $bindable)' },
    { name: 'onChange', type: '(v: string) => void', default: '—', description: '값 변경 콜백(선택)' },
    { name: 'preview', type: 'boolean', default: 'true', description: '우측 미리보기 표시 여부' },
    { name: 'placeholder', type: 'string | undefined', default: 'undefined', description: '에디터 placeholder' },
    { name: 'lineWrapping', type: 'boolean', default: 'true', description: '자동 줄바꿈' },
    { name: 'class', type: 'string | undefined', default: 'undefined', description: '컨테이너 추가 클래스' }
  ];
</script>

<section class="space-y-4">
  <h1 class="text-2xl font-bold">Markdown Editor</h1>
  <div class="text-sm text-muted-foreground">CodeMirror 6 + 미리보기</div>
  <MarkdownEditor bind:value class="min-h-80" />
  <div class="text-xs text-muted-foreground">
    Tip: 이미지 붙여넣기(Ctrl+V) 또는 파일 드래그 앤 드롭으로 본문 삽입이 가능합니다. Mermaid 블록(```mermaid)도 렌더링됩니다.
  </div>

  <div class="space-y-2 pt-4">
    <div class="text-sm text-muted-foreground">Usage</div>
    <CodeBlock code={example} language="svelte" />
  </div>
  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Props</div>
    <PropsTable rows={propsRows} />
  </div>
</section>
