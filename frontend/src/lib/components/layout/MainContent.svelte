<script lang="ts">
  import { layout } from '$lib/stores/layout';

  interface Props {
    children: any;
  }

  let { children }: Props = $props();
  
  // 사이드바 상태 구독
  let isSidebarOpen = $state(false);
  
  // 사이드바 상태에 따른 반응형 마진 계산
  const contentMargin = $derived(
    // 데스크톱에서는 사이드바가 항상 표시되므로 ml-64
    // 모바일에서는 오버레이이므로 ml-0
    'lg:ml-64 ml-0'
  );

  layout.subscribe((state) => {
    isSidebarOpen = state.isSidebarOpen;
  });
</script>

<!-- 메인 콘텐츠 영역 -->
<main class="flex-1 pt-16 transition-all duration-300 {contentMargin}">
  <div class="min-h-[calc(100vh-4rem)] bg-background">
    <!-- 콘텐츠 컨테이너 with 향상된 스크롤 처리 -->
    <div class="p-6 max-w-full overflow-x-auto">
      <div class="mx-auto max-w-7xl">
        {@render children()}
      </div>
    </div>
  </div>
</main>