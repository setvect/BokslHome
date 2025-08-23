<script lang="ts">
  type Item = { href: string; label: string; keywords: string[] };
  let components = $state<Item[]>([
    { href: '/design-system/components/buttons', label: 'Buttons', keywords: ['button', '버튼'] },
    { href: '/design-system/components/forms', label: 'Forms', keywords: ['form', 'input', 'label', '폼'] },
    { href: '/design-system/components/markdown', label: 'Markdown Editor', keywords: ['markdown', 'editor', 'md', '에디터'] },
    { href: '/design-system/components/editor', label: 'HTML Editor', keywords: ['html', 'tinymce', 'editor', '에디터'] }
  ]);
  let query = $state('');
  let filtered: Item[] = $derived(
    (() => {
      const q = query.trim().toLowerCase();
      if (!q) {
        return components;
      }
      return components.filter((c) => [c.label.toLowerCase(), ...(c.keywords ?? [])].some((k) => k.toLowerCase().includes(q)));
    })()
  );
  function onInput(e: Event) {
    const t = e.target as HTMLInputElement;
    query = t.value ?? '';
  }
</script>

<section class="space-y-4">
  <h1 class="text-2xl font-bold">Components</h1>
  <div class="max-w-md">
    <input
      type="text"
      placeholder="Search components..."
      class="w-full border rounded px-3 py-2 bg-background"
      value={query}
      oninput={onInput}
      aria-label="검색"
    />
  </div>
  <ul class="list-disc pl-6 space-y-1">
    {#each filtered as item (item.href)}
      <li><a class="underline" href={item.href}>{item.label}</a></li>
    {/each}
  </ul>
</section>
