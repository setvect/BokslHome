<script>
  import { faPaw } from '@fortawesome/free-solid-svg-icons';
  import { DarkMode, NavBrand, NavHamburger, Navbar } from 'flowbite-svelte';
  import { Fa } from 'svelte-fa';

  import '../app.pcss';

  export let fluid = true;
  export let drawerHidden = false;
  export let list = false;
</script>

<Navbar {fluid} class="text-black min-h-[68px] py-3" color="default" let:NavContainer>
  <NavHamburger onClick={() => (drawerHidden = !drawerHidden)} class="m-0 me-3 md:block lg:hidden" />
  <NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
    <Fa icon={faPaw} class="me-2.5 text-4xl sm:text-4xl text-yellow-200" />
    <span class="ml-px self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white"> 복슬이네 </span>
  </NavBrand>
  <div class="hidden lg:block lg:ps-3"></div>
  <div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
    <DarkMode />
  </div>
</Navbar>
