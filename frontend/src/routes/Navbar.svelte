<script>
  import { DarkMode, NavBrand, NavHamburger, Navbar, Search } from 'flowbite-svelte';
  import '../app.pcss';
  import UserMenu from './utils/widgets/UserMenu.svelte';
  import { Fa } from 'svelte-fa';
  import { faPaw } from '@fortawesome/free-solid-svg-icons';

  export let fluid = true;
  export let drawerHidden = false;
  export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
  <NavHamburger onClick={() => (drawerHidden = !drawerHidden)} class="m-0 me-3 md:block lg:hidden" />
  <NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
    <Fa icon={faPaw} class="me-2.5 text-4xl sm:text-4xl text-yellow-200" />
    <span class="ml-px self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white"> 복슬이네 </span>
  </NavBrand>
  <div class="ms-auto flex items-center text-gray-500 sm:order-2 dark:text-gray-400">
    <DarkMode />
    <UserMenu avatar={'neil-sims.png'} name={'boksl'} email={'boksl@gmail.com'} />
  </div>
</Navbar>
