<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import type { RenderFn } from '$lib/types/common';
  let props = $props<{ onNavigate?: () => void; children?: RenderFn }>();

  let pathname = $state('');
  $effect(() => {
    if (typeof window === 'undefined') return;
    const setPath = () => (pathname = window.location.pathname);
    setPath();
    afterNavigate(setPath);
  });

  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/test-ui', label: 'UI Test' }
  ];

  function linkClass(href: string): string {
    const current = typeof pathname === 'string' ? pathname : '';
    const isActive = current === href || (href !== '/' && current.startsWith(href));
    return `block rounded px-2 py-1 hover:underline ${isActive ? 'font-semibold text-primary' : ''}`;
  }
  function handleNavigate() {
    props.onNavigate?.();
  }
</script>

<aside class="w-64 border-r min-h-dvh p-4">
  <div class="mb-4 font-semibold">
    <a href="/" aria-label="BokslHome">BokslHome</a>
  </div>
  <nav class="space-y-2">
    {#each links as item (item.href)}
      <a href={item.href} class={linkClass(item.href)} aria-current={pathname === item.href ? 'page' : undefined} onclick={handleNavigate}
        >{item.label}</a
      >
    {/each}
  </nav>
  {@render props.children?.()}
</aside>
