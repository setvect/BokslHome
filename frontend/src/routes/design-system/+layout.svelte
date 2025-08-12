<script lang="ts">
  import DesignSystemNav from '$lib/components/DesignSystemNav.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { page } from '$app/stores';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '$lib/components/ui/breadcrumb';
  import Button from '$lib/components/ui/button/button.svelte';
  
  let sidebarOpen = false;
  
  function toggleSidebar() {
    sidebarOpen = !sidebarOpen;
  }
  
  function closeSidebar() {
    sidebarOpen = false;
  }
  
  // 페이지 경로를 기반으로 브레드크럼 생성
  $: pathSegments = $page.url.pathname.split('/').filter(Boolean);
  
  function generateBreadcrumbs(segments: string[]) {
    const breadcrumbs = [];
    let currentPath = '';
    
    for (let i = 0; i < segments.length; i++) {
      currentPath += '/' + segments[i];
      const isLast = i === segments.length - 1;
      
      // 경로를 사용자 친화적인 이름으로 변환
      let displayName = segments[i];
      switch (segments[i]) {
        case 'design-system':
          displayName = '디자인 시스템';
          break;
        case 'components':
          displayName = '컴포넌트';
          break;
        case 'installation':
          displayName = '설치 가이드';
          break;
        case 'colors':
          displayName = '색상 시스템';
          break;
        case 'button':
          displayName = 'Button';
          break;
        case 'card':
          displayName = 'Card';
          break;
        case 'input':
          displayName = 'Input';
          break;
        case 'label':
          displayName = 'Label';
          break;
        case 'badge':
          displayName = 'Badge';
          break;
        case 'breadcrumb':
          displayName = 'Breadcrumb';
          break;
        case 'test':
          displayName = '테스트';
          break;
        case 'theme':
          displayName = '테마 검증';
          break;
        case 'custom':
          displayName = '커스텀 색상';
          break;
        case 'typography':
          displayName = 'Typography';
          break;
        case 'spacing':
          displayName = 'Spacing';
          break;
      }
      
      breadcrumbs.push({
        name: displayName,
        href: currentPath,
        isLast
      });
    }
    
    return breadcrumbs;
  }
  
  $: breadcrumbs = generateBreadcrumbs(pathSegments);
</script>

<div class="min-h-screen bg-background text-foreground flex">
  <!-- 모바일 오버레이 -->
  {#if sidebarOpen}
    <div 
      class="fixed inset-0 z-40 bg-black/50 lg:hidden"
      role="button"
      tabindex="0"
      aria-label="사이드바 닫기"
      on:click={closeSidebar}
      on:keydown={(e) => e.key === 'Escape' && closeSidebar()}
    ></div>
  {/if}
  
  <!-- 사이드바 네비게이션 -->
  <div class={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-300 ease-in-out ${
    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
  }`}>
    <DesignSystemNav onNavigate={closeSidebar} />
  </div>
  
  <!-- 메인 콘텐츠 영역 -->
  <div class="flex-1 lg:ml-64">
    <!-- 헤더 -->
    <header class="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
      <div class="flex items-center justify-between px-4 lg:px-6 py-4">
        <!-- 햄버거 메뉴 버튼 (모바일) -->
        <Button 
          variant="ghost" 
          size="sm"
          class="lg:hidden"
          onclick={toggleSidebar}
        >
          <svg 
            class="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
        
        <!-- 브레드크럼 -->
        <div class="flex-1 ml-4 lg:ml-0">
          {#if breadcrumbs.length > 0}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {#each breadcrumbs as crumb}
                  <BreadcrumbItem>
                    {#if crumb.isLast}
                      <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                    {:else}
                      <BreadcrumbLink href={crumb.href}>{crumb.name}</BreadcrumbLink>
                    {/if}
                  </BreadcrumbItem>
                  {#if !crumb.isLast}
                    <BreadcrumbSeparator />
                  {/if}
                {/each}
              </BreadcrumbList>
            </Breadcrumb>
          {/if}
        </div>
        
        <!-- 테마 토글 -->
        <ThemeToggle />
      </div>
    </header>
    
    <!-- 페이지 콘텐츠 -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</div>

<style>
  /* 사이드바가 고정되어 있을 때 스크롤 처리 */
  :global(body) {
    overflow-x: hidden;
  }
</style>