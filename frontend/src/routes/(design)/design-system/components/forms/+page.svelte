<script lang="ts">
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Button } from '$lib/components/ui/button';
  import CodeBlock from '$lib/components/docs/CodeBlock.svelte';
  const example = `<script lang=\"ts\">\n  import { Input } from '$lib/components/ui/input';\n  import { Label } from '$lib/components/ui/label';\n  import { Button } from '$lib/components/ui/button';\n<\/script>\n\n<div class=\"space-y-2\">\n  <Label for=\"email\">Email<\/Label>\n  <Input id=\"email\" type=\"email\" placeholder=\"you@example.com\" />\n<\/div>\n\n<Button>Submit<\/Button>`;
</script>

<h1 class="text-2xl font-bold mb-4">Forms</h1>

<div class="space-y-6">
  <div class="space-y-2">
    <div class="text-sm text-muted-foreground">Example</div>
    <div class="space-y-2 max-w-sm">
      <Label for="email">Email</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  </div>

  <CodeBlock code={example} language="svelte" />
</div>
