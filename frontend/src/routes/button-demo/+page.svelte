<script lang="ts">
  import Button from "$lib/components/ui/button.svelte";
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
  <h1 class="text-2xl font-bold mb-4">shadcn-svelte Button Demo</h1>
  <Button>Click Me</Button>
  <Button variant="outline" class="mt-2">Outline Button</Button>
  <Button variant="secondary" size="sm" class="mt-2">Small Secondary</Button>
</div>
