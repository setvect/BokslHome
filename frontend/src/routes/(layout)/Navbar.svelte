<svelte:options runes={true} />

<script>
  import { faPaw } from '@fortawesome/free-solid-svg-icons';
  import { DarkMode, NavBrand, NavHamburger, Navbar } from 'flowbite-svelte';
  import { Fa } from 'svelte-fa';
  import { onMount } from 'svelte';
  import { isDarkMode, setDarkMode } from '$lib/stores/themeStore';

  import '../../app.pcss';

  let { fluid = true, drawerHidden = $bindable(false), list = false } = $props();

  onMount(() => {
    // DarkMode 컴포넌트가 DOM에 클래스를 변경하는 것을 MutationObserver로 감지
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const htmlClasses = document.documentElement.classList;
          const isDark = htmlClasses.contains('dark');

          // 스토어 상태와 DOM 상태가 다르면 스토어 업데이트
          if ($isDarkMode !== isDark) {
            setDarkMode(isDark);
          }
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  });
</script>

<Navbar {fluid} class="text-black min-h-[68px] py-3" color="default" let:NavContainer>
  <NavHamburger onclick={() => (drawerHidden = !drawerHidden)} class="m-0 me-3 md:block lg:hidden" />
  <NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
    <Fa icon={faPaw} class="me-2.5 text-4xl sm:text-4xl text-yellow-200" />
    <span class="ml-px self-center whitespace-nowrap text-xl font-semibold sm:text-2xl dark:text-white"> 복슬이네 </span>
  </NavBrand>
  <div class="hidden lg:block lg:ps-3"></div>
  <div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
    <DarkMode />
  </div>
</Navbar>
