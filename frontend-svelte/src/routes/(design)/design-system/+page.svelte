<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import {
    Palette,
    Type,
    Layers,
    MessageSquare,
    Navigation,
    CheckSquare,
    FileText,
    Grid3x3,
    Archive,
    Zap,
    Users,
    Edit
  } from '@lucide/svelte';
  import { toast } from '$lib/stores/toast';

  // 컴포넌트 카테고리 데이터
  const categories = [
    {
      title: 'Data Display',
      description: '데이터를 표시하고 구성하는 컴포넌트들',
      icon: Grid3x3,
      components: [
        { name: 'Card', href: '/design-system/components/card', status: 'stable' },
        { name: 'Table', href: '/design-system/components/table', status: 'stable' },
        { name: 'Badge', href: '/design-system/components/badge', status: 'stable' },
        { name: 'Skeleton', href: '/design-system/components/skeleton', status: 'stable' },
        { name: 'Accordion', href: '/design-system/components/accordion', status: 'stable' }
      ]
    },
    {
      title: 'Navigation',
      description: '사용자 네비게이션을 위한 컴포넌트들',
      icon: Navigation,
      components: [
        { name: 'Breadcrumb', href: '/design-system/components/breadcrumb', status: 'stable' },
        { name: 'Pagination', href: '/design-system/components/pagination', status: 'stable' },
        { name: 'Tabs', href: '/design-system/components/tabs', status: 'stable' }
      ]
    },
    {
      title: 'Input & Feedback',
      description: '사용자 입력과 피드백을 위한 컴포넌트들',
      icon: MessageSquare,
      components: [
        { name: 'Button', href: '/design-system/components/buttons', status: 'stable' },
        { name: 'Select', href: '/design-system/components/select', status: 'stable' },
        { name: 'SearchBar', href: '/design-system/components/search', status: 'stable' },
        { name: 'Dialog', href: '/design-system/components/dialog', status: 'stable' },
        { name: 'Toast', href: '/design-system/components/toast', status: 'stable' }
      ]
    },
    {
      title: 'Editors',
      description: '콘텐츠 편집을 위한 고급 컴포넌트들',
      icon: Edit,
      components: [
        { name: 'MarkdownEditor', href: '/design-system/components/markdown', status: 'beta' },
        { name: 'HtmlEditor', href: '#', status: 'planned' }
      ]
    }
  ];

  const designTokens = [
    { name: 'Colors', href: '/design-system/colors', icon: Palette },
    { name: 'Typography', href: '/design-system/typography', icon: Type },
    { name: 'Spacing', href: '/design-system/spacing', icon: Layers }
  ];

  function getStatusBadge(status: string): { variant: 'default' | 'secondary' | 'outline' | 'destructive'; text: string } {
    switch (status) {
      case 'stable':
        return { variant: 'default', text: '안정' };
      case 'beta':
        return { variant: 'secondary', text: '베타' };
      case 'planned':
        return { variant: 'outline', text: '계획됨' };
      default:
        return { variant: 'outline', text: '미정' };
    }
  }
</script>

<div class="space-y-12">
  <!-- Hero Section -->
  <section class="space-y-6">
    <div class="flex items-center gap-4">
      <Palette class="h-8 w-8 text-primary" />
      <div>
        <h1 class="text-3xl font-bold">복슬홈 디자인 시스템</h1>
        <p class="text-lg text-muted-foreground">일관되고 확장 가능한 UI 컴포넌트 라이브러리</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-4">
      <Button variant="outline" onclick={() => window.open('https://shadcn-svelte.com', '_blank')}>
        <FileText class="h-4 w-4 mr-2" />
        shadcn-svelte 문서
      </Button>
    </div>
  </section>

  <Separator />

  <!-- Design Tokens -->
  <section class="space-y-4">
    <h2 class="text-2xl font-bold">디자인 토큰</h2>
    <p class="text-muted-foreground">디자인 시스템의 기본 요소들입니다.</p>

    <ul class="space-y-2">
      {#each designTokens as token}
        <li>
          <a href={token.href} class="flex items-center gap-3 p-2 rounded hover:bg-muted/50 transition-colors">
            <token.icon class="h-5 w-5 text-primary" />
            <span class="font-medium">{token.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  </section>

  <Separator />

  <!-- Component Categories -->
  <section class="space-y-6">
    <div>
      <h2 class="text-2xl font-bold">컴포넌트 라이브러리</h2>
      <p class="text-muted-foreground">카테고리별로 정리된 UI 컴포넌트들입니다.</p>
    </div>

    <div class="space-y-8">
      {#each categories as category}
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <category.icon class="h-5 w-5 text-primary" />
            <div>
              <h3 class="text-lg font-semibold">{category.title}</h3>
              <p class="text-sm text-muted-foreground">{category.description}</p>
            </div>
          </div>

          <ul class="space-y-1 ml-8">
            {#each category.components as component}
              <li class="flex items-center justify-between py-1">
                <div>
                  {#if component.href !== '#'}
                    <a href={component.href} class="font-medium hover:underline">
                      {component.name}
                    </a>
                  {:else}
                    <span class="font-medium text-muted-foreground">{component.name}</span>
                  {/if}
                </div>
                <Badge variant={getStatusBadge(component.status).variant} class="text-xs">
                  {getStatusBadge(component.status).text}
                </Badge>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </section>

  <Separator />

  <!-- Technology Stack -->
  <section class="space-y-4">
    <h2 class="text-2xl font-bold">기술 스택</h2>
    <p class="text-muted-foreground">복슬홈 디자인 시스템을 구성하는 핵심 기술들입니다.</p>

    <ul class="space-y-2">
      {#each [{ name: 'SvelteKit', version: '2.x', description: 'Svelte 5 Runes 기반 프레임워크' }, { name: 'Tailwind CSS', version: '4.x', description: '유틸리티 우선 CSS 프레임워크' }, { name: 'shadcn-svelte', version: 'latest', description: '접근성 중심 UI 컴포넌트' }, { name: 'Lucide Svelte', version: 'latest', description: '아름다운 오픈소스 아이콘' }] as tech}
        <li class="flex items-center justify-between py-2 border-b border-muted/30">
          <div>
            <span class="font-semibold">{tech.name}</span>
            <span class="text-sm text-muted-foreground ml-2">{tech.description}</span>
          </div>
          <Badge variant="secondary" class="text-xs">{tech.version}</Badge>
        </li>
      {/each}
    </ul>
  </section>

  <Separator />

  <!-- Getting Started -->
  <section class="space-y-4">
    <h2 class="text-2xl font-bold">시작하기</h2>
    <p class="text-muted-foreground">복슬홈 디자인 시스템 사용법을 알아보세요.</p>

    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-semibold mb-3">빠른 시작</h3>

        <div class="space-y-4">
          <div>
            <h4 class="font-medium mb-2">1. 컴포넌트 import</h4>
            <pre class="text-sm bg-muted p-3 rounded border"><code
                >{`import { Button } from '$lib/components/ui/button/index.js';
import { toast } from '$lib/stores/toast';`}</code
              ></pre>
          </div>

          <div>
            <h4 class="font-medium mb-2">2. 컴포넌트 사용</h4>
            <pre class="text-sm bg-muted p-3 rounded border"><code
                >{`<Button onclick={() => toast.success('Hello!')}>
  클릭해보세요
</Button>`}</code
              ></pre>
          </div>

          <div>
            <h4 class="font-medium mb-2">3. 스타일링</h4>
            <pre class="text-sm bg-muted p-3 rounded border"><code
                >{`<Button variant="outline" size="lg" class="custom-class">
  커스텀 버튼
</Button>`}</code
              ></pre>
          </div>
        </div>

        <div class="flex gap-4 mt-6">
          <Button onclick={() => toast.info('환영합니다!', { description: '디자인 시스템을 탐험해보세요.' })}>
            <CheckSquare class="h-4 w-4 mr-2" />
            예제 실행
          </Button>
          <Button variant="outline" onclick={() => (window.location.href = '/design-system/components/buttons')}>컴포넌트 문서 보기</Button>
        </div>
      </div>
    </div>
  </section>
</div>
