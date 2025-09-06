<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import CodeBlock from '$lib/components/docs/CodeBlock.svelte';
  import PropsTable from '$lib/components/docs/PropsTable.svelte';
  const example = `<script lang=\"ts\">\n  import { Button } from '$lib/components/ui/button';\n<\/script>\n\n<Button>Default</Button>\n<Button variant=\"secondary\">Secondary<\/Button>\n<Button variant=\"outline\">Outline<\/Button>\n<Button variant=\"destructive\">Destructive<\/Button>\n<Button variant=\"ghost\">Ghost<\/Button>\n<Button variant=\"link\">Link<\/Button>\n\n<Button size=\"sm\">Small<\/Button>\n<Button size=\"default\">Default<\/Button>\n<Button size=\"lg\">Large<\/Button>\n<Button size=\"icon\" aria-label=\"Icon\">☆<\/Button>`;
  const propsRows = [
    {
      name: 'variant',
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      default: '"default"',
      description: '스타일 변형'
    },
    { name: 'size', type: '"sm" | "default" | "lg" | "icon"', default: '"default"', description: '버튼 크기' },
    { name: 'href', type: 'string | undefined', default: 'undefined', description: '앵커 역할로 렌더' },
    { name: 'disabled', type: 'boolean | undefined', default: 'false', description: '비활성화' }
  ];
</script>

<h1 class="text-2xl font-bold mb-4">Buttons</h1>

<div class="space-y-6">
  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Variants</div>
    <div class="flex flex-wrap gap-2 items-center">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  </div>

  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Sizes</div>
    <div class="flex flex-wrap gap-2 items-center">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Icon">☆</Button>
    </div>
  </div>

  <CodeBlock code={example} language="svelte" />

  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Props</div>
    <PropsTable rows={propsRows} />
  </div>
</div>
