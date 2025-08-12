<script lang="ts">
  import { page } from '$app/stores';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Badge } from '$lib/components/ui/badge';
  import { Card, CardContent } from '$lib/components/ui/card';
  
  // 모바일 네비게이션 콜백
  export let onNavigate: (() => void) | undefined = undefined;
  
  // 네비게이션 메뉴 구조
  const navItems = [
    {
      title: '시작하기',
      items: [
        { name: '소개', href: '/design-system', badge: 'v2.1' },
        { name: '설치 가이드', href: '/design-system/installation' },
        { name: '색상 시스템', href: '/design-system/colors' }
      ]
    },
    {
      title: '디자인 토큰',
      items: [
        { name: 'Typography', href: '/design-system/typography' },
        { name: 'Spacing', href: '/design-system/spacing' }
      ]
    },
    {
      title: '컴포넌트',
      items: [
        { name: 'Button', href: '/design-system/components/button', badge: 'stable' },
        { name: 'Card', href: '/design-system/components/card', badge: 'stable' },
        { name: 'Input', href: '/design-system/components/input', badge: 'stable' },
        { name: 'Label', href: '/design-system/components/label', badge: 'stable' },
        { name: 'Badge', href: '/design-system/components/badge', badge: 'stable' },
        { name: 'Breadcrumb', href: '/design-system/components/breadcrumb', badge: 'stable' },
        // 신규: HtmlEditor 컴포넌트 미리보기
        { name: 'HtmlEditor', href: '/design-system/components/editor', badge: 'beta' }
      ]
    },
    {
      title: '테스트',
      items: [
        { name: '컴포넌트 테스트', href: '/design-system/test/components' },
        { name: '색상 팔레트 테스트', href: '/design-system/test/colors' },
        { name: '커스텀 색상 테스트', href: '/design-system/test/colors/custom' },
        { name: '테마 시스템 검증', href: '/design-system/test/theme' }
      ]
    }
  ];
  
  $: currentPath = $page.url.pathname;
  
  function isActive(href: string): boolean {
    // 정확한 경로 매칭
    return currentPath === href;
  }
  
  function isParentActive(items: any[]): boolean {
    return items.some(item => isActive(item.href));
  }
  
  
  function getBadgeVariant(badge: string) {
    switch (badge) {
      case 'stable': return 'default';
      case 'beta': return 'secondary';
      case 'alpha': return 'destructive';
      default: return 'outline';
    }
  }
</script>

<nav class="w-64 bg-card border-r border-border h-full overflow-y-auto">
  <div class="p-6">
    <div class="mb-6">
      <h2 class="text-lg font-semibold text-foreground mb-2">디자인 시스템</h2>
      <p class="text-sm text-muted-foreground">현대적인 UI 컴포넌트 라이브러리</p>
    </div>
    
    <div class="space-y-8">
      {#each navItems as section (section.title)}
        <div>
          <!-- 섹션 제목 - 시각적으로 더 강조 -->
          <div class="flex items-center gap-2 mb-4 px-2">
            <div class="w-1 h-4 bg-primary rounded-full"></div>
            <h3 class="text-sm font-semibold text-foreground uppercase tracking-wider">
              {section.title}
            </h3>
          </div>
          
          <!-- 하위 항목들 - 들여쓰기와 시각적 계층 -->
          <div class="space-y-1 ml-2 border-l border-border pl-4">
            {#each section.items as item (item.href)}
              {@const itemActive = currentPath === item.href}
              <Button
                href={item.href}
                variant={itemActive ? 'default' : 'ghost'}
                size="sm"
                class={`w-full justify-start text-left h-auto py-2.5 px-3 rounded-md transition-all ${
                  itemActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:translate-x-1'
                }`}
                onclick={() => onNavigate?.()}
              >
                <div class="flex items-center justify-between w-full">
                  <div class="flex items-center gap-2">
                    <!-- 하위 항목 표시용 점 -->
                    <div class={`w-1.5 h-1.5 rounded-full transition-colors ${
                      itemActive ? 'bg-primary-foreground' : 'bg-muted-foreground/40'
                    }`}></div>
                    <span class="text-sm">{item.name}</span>
                  </div>
                  {#if item.badge}
                    <Badge 
                      variant={getBadgeVariant(item.badge)} 
                      class="text-xs px-1.5 py-0.5 ml-2"
                    >
                      {item.badge}
                    </Badge>
                  {/if}
                </div>
              </Button>
            {/each}
          </div>
        </div>
      {/each}
    </div>
    
    <!-- 유용한 링크들 -->
    <div class="mt-8 pt-6 border-t">
      <h3 class="text-sm font-medium text-foreground mb-3">유용한 링크</h3>
      <div class="space-y-2">
        <Button
          href="https://tailwindcss.com/docs"
          variant="ghost"
          size="sm"
          target="_blank"
          class="w-full justify-start text-left h-auto py-2 px-2 text-muted-foreground hover:text-foreground"
        >
          <span class="flex items-center gap-2">
            🎨 Tailwind CSS
            <span class="text-xs">↗</span>
          </span>
        </Button>
        
        <Button
          href="https://shadcn-svelte.com"
          variant="ghost"
          size="sm"
          target="_blank"
          class="w-full justify-start text-left h-auto py-2 px-2 text-muted-foreground hover:text-foreground"
        >
          <span class="flex items-center gap-2">
            🧩 shadcn-svelte
            <span class="text-xs">↗</span>
          </span>
        </Button>
        
        <Button
          href="https://kit.svelte.dev"
          variant="ghost"
          size="sm"
          target="_blank"
          class="w-full justify-start text-left h-auto py-2 px-2 text-muted-foreground hover:text-foreground"
        >
          <span class="flex items-center gap-2">
            ⚡ SvelteKit
            <span class="text-xs">↗</span>
          </span>
        </Button>
      </div>
    </div>
  </div>
</nav>