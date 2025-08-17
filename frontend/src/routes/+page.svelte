<script lang="ts">
  let props = $props<{}>();
  import { Button } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { Input } from '$lib/components/ui/input';
  import { Github } from '@lucide/svelte';
</script>

<section class="p-6 space-y-4">
  <h1 class="text-2xl font-bold">BokslHome</h1>
  <p class="mt-2 text-muted-foreground">SvelteKit + Tailwind CSS 4.x 초기 설정이 완료되었습니다.</p>
  <div class="flex items-center gap-2">
    <Button>Button</Button>
    <Separator orientation="vertical" />
    <Input placeholder="Input" class="w-60" />
    <Github size={18} />
  </div>
</section>
