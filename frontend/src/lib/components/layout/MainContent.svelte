<script lang="ts">
  import { onMount } from 'svelte';
  import { layout } from '$lib/stores/layout';

  interface Props {
    children: any;
  }

  let { children }: Props = $props();
  
  // 레이아웃 상태 구독
  let layoutState = $state({ isSidebarOpen: false, mounted: false });
  let isDesktop = $state(false);

  // 화면 크기 감지
  function updateScreenSize() {
    if (typeof window !== 'undefined') {
      isDesktop = window.innerWidth >= 1024;
    }
  }

  // 동적 마진 계산 - 사이드바 상태와 화면 크기에 따라 조정
  const contentMargin = $derived(() => {
    if (!layoutState.mounted) return 'lg:ml-64 ml-0'; // 기본값
    
    // 데스크톱: 사이드바 상태에 따라 마진 조정
    // 모바일/태블릿: 사이드바는 오버레이이므로 마진 없음
    if (isDesktop) {
      return layoutState.isSidebarOpen ? 'ml-64' : 'ml-0';
    }
    return 'ml-0';
  });

  onMount(() => {
    // 초기 화면 크기 설정
    updateScreenSize();

    // 레이아웃 상태 구독
    const unsubscribe = layout.subscribe((state) => {
      layoutState = state;
    });

    // 화면 크기 변경 감지
    const handleResize = () => {
      updateScreenSize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  });
</script>

<!-- 메인 콘텐츠 영역 -->
<main class="flex-1 pt-16 transition-all duration-300 ease-in-out {contentMargin()}">
  <div class="min-h-[calc(100vh-4rem)] bg-background">
    <!-- 콘텐츠 컨테이너 with 향상된 스크롤 및 반응형 처리 -->
    <div class="p-4 sm:p-6 max-w-full overflow-x-auto">
      <div class="mx-auto max-w-7xl">
        {@render children()}
      </div>
    </div>
  </div>
</main>