<script>
  import { DarkMode, NavBrand, NavHamburger, Navbar, Search } from 'flowbite-svelte';
  import '../../app.pcss';
  import UserMenu from '../utils/widgets/UserMenu.svelte';

  export let fluid = true;
  export let drawerHidden = false;
  export let list = false;
</script>

<Navbar {fluid} class="text-black" color="default" let:NavContainer>
  <NavHamburger
    onClick={() => (drawerHidden = !drawerHidden)}
    class="m-0 me-3 md:block lg:hidden"
  />
  <NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
    <img
      src="/images/flowbite-svelte-icon-logo.svg"
      class="me-2.5 h-6 sm:h-8"
      alt="Flowbite Logo"
    />
    <span
      class="ml-px self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white"
    >
      Flowbite
    </span>
  </NavBrand>
  <div class="hidden lg:block lg:ps-3">
    <form>
      <Search size="md" class="mt-1 w-96 border focus:outline-none" />
    </form>
  </div>
  <div class="ms-auto flex items-center text-gray-500 sm:order-2 dark:text-gray-400">
    <DarkMode />
    <UserMenu avatar={'neil-sims.png'} name={'boksl'} email={'boksl@gmail.com'} />
  </div>
</Navbar>
