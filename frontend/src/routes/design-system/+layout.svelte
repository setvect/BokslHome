<script lang="ts">
  import DesignSystemNav from '$lib/components/DesignSystemNav.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import { page } from '$app/stores';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '$lib/components/ui/breadcrumb';
  
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
  <!-- 사이드바 네비게이션 -->
  <div class="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
    <DesignSystemNav />
  </div>
  
  <!-- 메인 콘텐츠 영역 -->
  <div class="flex-1 ml-64">
    <!-- 헤더 -->
    <header class="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
      <div class="flex items-center justify-between px-6 py-4">
        <!-- 브레드크럼 -->
        <div class="flex-1">
          {#if breadcrumbs.length > 0}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {#each breadcrumbs as crumb, index}
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
  
  /* 반응형 처리를 위한 미디어 쿼리 (모바일에서는 사이드바 숨김) */
  @media (max-width: 1024px) {
    .ml-64 {
      margin-left: 0;
    }
    
    .fixed.inset-y-0.left-0 {
      transform: translateX(-100%);
    }
  }
</style>