<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Separator } from '$lib/components/ui/separator';
</script>

<section class="p-6 space-y-6">
  <h1 class="text-2xl font-bold">UI Test</h1>

  <div class="space-y-3">
    <h2 class="font-semibold">Button</h2>
    <div class="flex gap-2">
      <Button
        aria-label="기본 버튼"
        onclick={() => console.log('clicked')}
        onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && console.log('activate')}
      >
        Default
      </Button>
      <Button disabled>Disabled</Button>
    </div>
  </div>

  <Separator />

  <div class="space-y-3">
    <h2 class="font-semibold">Input + Label</h2>
    <div class="flex items-center gap-3">
      <Label for="email">Email</Label>
      <Input id="email" placeholder="you@example.com" class="w-80" />
    </div>
  </div>

  <Separator />

  <div class="space-y-3">
    <h2 class="font-semibold">Separator</h2>
    <div class="flex items-center gap-3">
      <span>Item A</span>
      <Separator orientation="vertical" />
      <span>Item B</span>
    </div>
  </div>
</section>
