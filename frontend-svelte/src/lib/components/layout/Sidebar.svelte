<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { PawPrint } from '@lucide/svelte';
  import type { RenderFn } from '$lib/types/common';
  let props = $props<{ onNavigate?: () => void; children?: RenderFn }>();

  let pathname = $state('');
  $effect(() => {
    if (typeof window === 'undefined') {
      return;
    }
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

<aside class="w-64 border-r min-h-dvh pt-0">
  <div class="h-14 flex items-center px-4 border-b border-border">
    <a
      href="/"
      class="flex items-center gap-3 text-lg font-bold text-primary hover:text-primary/80 transition-colors group"
      aria-label="복슬홈"
    >
      <PawPrint class="w-6 h-6 group-hover:scale-110 transition-transform" />
      <span class="tracking-wide">복슬홈</span>
    </a>
  </div>
  <nav class="space-y-2 p-4">
    {#each links as item (item.href)}
      <a href={item.href} class={linkClass(item.href)} aria-current={pathname === item.href ? 'page' : undefined} onclick={handleNavigate}
        >{item.label}</a
      >
    {/each}
  </nav>
  {@render props.children?.()}
</aside>
