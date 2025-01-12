<script>
  import '../app.pcss';
  import Navbar from './Navbar.svelte';
  import Sidebar from './Sidebar.svelte';
  import MetaTag from './utils/MetaTag.svelte';
  let drawerHidden = false;
</script>

<MetaTag title="복슬이네" />

<header class="fixed top-0 z-40 mx-auto w-full flex-none border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800">
  <Navbar bind:drawerHidden />
</header>
<div class="overflow-hidden lg:flex">
  <Sidebar bind:drawerHidden />
  <div class="relative h-[calc(100vh)] w-full overflow-y-auto pt-[70px] lg:ml-64">
    <slot />
  </div>
</div>
