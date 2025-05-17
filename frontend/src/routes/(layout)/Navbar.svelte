<script>
  import { faPaw } from '@fortawesome/free-solid-svg-icons';
  import { DarkMode, NavBrand, NavHamburger, Navbar } from 'flowbite-svelte';
  import { Fa } from 'svelte-fa';
  import { onMount } from 'svelte';
  import { isDarkMode } from '$lib/stores/themeStore';

  import '../../app.pcss';

  export let fluid = true;
  export let drawerHidden = false;
  export let list = false;

  onMount(() => {
    // localStorage에서 초기 다크 모드 상태를 읽어 스토어에 반영
    const savedTheme = localStorage.getItem('color-theme');
    console.log('savedTheme', savedTheme);
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      isDarkMode.set(true);
    } else {
      isDarkMode.set(false);
    }

    // DarkMode 컴포넌트의 클릭 이벤트를 감지하기 어려우므로, localStorage 변경을 감지하여 스토어 업데이트
    // 또는 DarkMode 컴포넌트가 DOM에 클래스를 변경하는 것을 MutationObserver로 감지할 수도 있음.
    // 여기서는 localStorage를 주기적으로 확인하거나, DarkMode 컴포넌트의 내부 구현에 따라 더 나은 방법을 찾아야 할 수 있음.
    // 가장 간단한 방법은 DarkMode 컴포넌트의 변경이 html 태그의 class를 바꾸므로, 그것을 감지하는 것.

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const htmlClasses = document.documentElement.classList;
          isDarkMode.set(htmlClasses.contains('dark'));
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });

    // 스토어 변경 시 localStorage 업데이트 (DarkMode 컴포넌트가 이미 처리하므로 중복될 수 있음)
    // isDarkMode.subscribe(value => {
    //   if (value) {
    //     document.documentElement.classList.add('dark');
    //     localStorage.setItem('color-theme', 'dark');
    //   } else {
    //     document.documentElement.classList.remove('dark');
    //     localStorage.setItem('color-theme', 'light');
    //   }
    // });
  });
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
