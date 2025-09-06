<script lang="ts">
  import HtmlEditor from '$lib/components/ui/HtmlEditor.svelte';
  import CodeBlock from '$lib/components/docs/CodeBlock.svelte';
  import PropsTable from '$lib/components/docs/PropsTable.svelte';
  let html = $state<string>('<p><strong>Hello</strong> HTML</p>');

  const example = `<script lang=\"ts\">\n  import HtmlEditor from '$lib/components/ui/HtmlEditor.svelte';\n  let html = $state('<p>Hello</p>');\n<\/script>\n\n<HtmlEditor bind:value={html} height={360} />`;

  const propsRows = [
    { name: 'value', type: 'string', default: "''", description: '양방향 바인딩 지원' },
    { name: 'onChange', type: '(v: string) => void', default: '—', description: '값 변경 콜백(선택)' },
    { name: 'height', type: 'number', default: '360', description: '에디터 높이' },
    { name: 'menubar', type: 'boolean', default: 'false', description: '상단 메뉴바 표시' },
    { name: 'toolbar', type: 'string', default: '기본 세트', description: '툴바 구성 문자열' },
    { name: 'class', type: 'string | undefined', default: 'undefined', description: '컨테이너 클래스' }
  ];
</script>

<section class="space-y-4">
  <h1 class="text-2xl font-bold">HTML Editor (TinyMCE)</h1>
  <HtmlEditor bind:value={html} height={360} />

  <div class="space-y-2 pt-4">
    <div class="text-sm text-muted-foreground">Usage</div>
    <CodeBlock code={example} language="svelte" />
  </div>
  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Props</div>
    <PropsTable rows={propsRows} />
  </div>
</section>
