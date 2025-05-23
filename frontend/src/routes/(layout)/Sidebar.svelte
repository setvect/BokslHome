<svelte:options runes={true} />

<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { page } from '$app/stores';

  import { Sidebar, SidebarDropdownWrapper, SidebarGroup, SidebarItem, SidebarWrapper } from 'flowbite-svelte';
  import { AngleDownOutline, AngleUpOutline, WandMagicSparklesOutline } from 'flowbite-svelte-icons';

  let { drawerHidden = $bindable(false) } = $props();

  const closeDrawer = () => {
    drawerHidden = true;
  };

  let iconClass =
    'flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white';
  let itemClass =
    'flex items-center p-2 text-base text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group dark:text-gray-200 dark:hover:bg-gray-700';
  let groupClass = 'pt-2 space-y-2';

  let mainSidebarUrl = $derived($page.url.pathname);
  let activeMainSidebar = $state('');

  afterNavigate((navigation) => {
    // this fixes https://github.com/themesberg/flowbite-svelte/issues/364
    document.getElementById('svelte')?.scrollTo({ top: 0 });
    closeDrawer();

    activeMainSidebar = navigation.to?.url.pathname ?? '';
  });

  let posts = [
    {
      name: '게시판',
      icon: WandMagicSparklesOutline,
      children: [
        { name: '게시판 관리', link: '/board/manager' },
        { name: '글', link: '/board/article' },
        { name: '책', link: '' },
        { name: '음악', link: '' },
        { name: '영화', link: '' },
        { name: '사진', link: '' },
        { name: '기억', link: '' },
        { name: '인연', link: '' },
        { name: '잡담', link: '' },
        { name: '꿈', link: '' },
        { name: '기술사', link: '' },
        { name: '소설', link: '' },
        { name: '운동', link: '' }
      ]
    },
    {
      name: '지식',
      icon: WandMagicSparklesOutline,
      href: '/settings'
    },
    {
      name: '노트',
      icon: WandMagicSparklesOutline
    },
    {
      name: '메모',
      icon: WandMagicSparklesOutline
    },
    {
      name: '관계',
      icon: WandMagicSparklesOutline
    },
    {
      name: '이것저것',
      icon: WandMagicSparklesOutline,
      children: [{ name: '로또', link: '/playground/stacked' }]
    }
  ];

  let dropdowns = $state(Object.fromEntries(Object.keys(posts).map((x) => [x, false])));
</script>

<Sidebar
  class={drawerHidden ? 'hidden' : ''}
  activeUrl={mainSidebarUrl}
  activeClass="bg-gray-100 dark:bg-gray-700"
  asideClass="fixed inset-0 z-30 flex-none h-full w-64 lg:h-auto border-e border-gray-200 dark:border-gray-600 lg:overflow-y-visible lg:pt-16 lg:block"
>
  <h4 class="sr-only">Main menu</h4>
  <SidebarWrapper
    divClass="overflow-y-auto px-3 pt-20 lg:pt-5 h-full bg-white scrolling-touch max-w-2xs lg:h-[calc(100vh-4rem)] lg:block dark:bg-gray-800 lg:me-0 lg:sticky top-2"
  >
    <nav class="divide-y divide-gray-200 dark:divide-gray-700">
      <SidebarGroup ulClass={groupClass} class="mb-3">
        {#each posts as { name, icon: IconComponent, href, children } (name)}
          {#if children}
            <SidebarDropdownWrapper bind:isOpen={dropdowns[name]} label={name} class="pr-3">
              <AngleDownOutline slot="arrowdown" strokeWidth="3.3" size="sm" />
              <AngleUpOutline slot="arrowup" strokeWidth="3.3" size="sm" />
              <IconComponent slot="icon" class={iconClass} />

              {#each children as child}
                <SidebarItem label={child.name} href={child.link} spanClass="ml-9" class={itemClass} />
              {/each}
            </SidebarDropdownWrapper>
          {:else}
            <SidebarItem label={name} {href} spanClass="ml-3" class={itemClass}>
              <IconComponent slot="icon" class={iconClass} />
            </SidebarItem>
          {/if}
        {/each}
      </SidebarGroup>
    </nav>
  </SidebarWrapper>
</Sidebar>

<div
  hidden={drawerHidden}
  class="fixed inset-0 z-20 bg-gray-900/50 dark:bg-gray-900/60"
  onclick={closeDrawer}
  onkeydown={closeDrawer}
  role="presentation"
></div>
