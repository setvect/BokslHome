<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  let props = $props<{ visibleOnMobile?: boolean; onNavigate?: () => void } & { children?: unknown }>();
  const containerClass = $derived(() => (props.visibleOnMobile ? 'block' : 'hidden lg:block'));

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

<aside class={`w-64 border-r min-h-dvh p-4 ${containerClass}`}>
  <div class="mb-4 font-semibold">
    <a href="/" aria-label="BokslHome">BokslHome</a>
  </div>
  <nav class="space-y-2">
    {#each links as item}
      <a href={item.href} class={linkClass(item.href)} onclick={handleNavigate}>{item.label}</a>
    {/each}
  </nav>
  {@render (props as any).children?.()}
</aside>
