<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  import { onMount } from 'svelte';
  
  // 색상 팔레트 정의
  const semanticColors = [
    {
      name: 'Primary',
      cssVar: '--color-primary',
      lightValue: 'oklch(20.8% 0.042 264.6)',
      darkValue: 'oklch(87.1% 0.042 264.6)',
      description: '주요 브랜드 색상, 중요한 액션 버튼',
      usage: ['Button primary', 'Link colors', 'Active states']
    },
    {
      name: 'Secondary',
      cssVar: '--color-secondary',
      lightValue: 'oklch(96.1% 0.013 286.3)',
      darkValue: 'oklch(15.7% 0.013 286.3)',
      description: '보조 색상, 덜 중요한 요소',
      usage: ['Button secondary', 'Background accents']
    },
    {
      name: 'Destructive',
      cssVar: '--color-destructive',
      lightValue: 'oklch(60% 0.196 17.38)',
      darkValue: 'oklch(60% 0.196 17.38)',
      description: '경고, 삭제, 오류 상태',
      usage: ['Delete buttons', 'Error messages', 'Warnings']
    },
    {
      name: 'Background',
      cssVar: '--color-background',
      lightValue: 'oklch(98% 0.01 220)',
      darkValue: 'oklch(9% 0.01 220)',
      description: '페이지 배경색',
      usage: ['Page background', 'Main container']
    },
    {
      name: 'Foreground',
      cssVar: '--color-foreground',
      lightValue: 'oklch(15% 0.01 220)',
      darkValue: 'oklch(98% 0.01 220)',
      description: '기본 텍스트 색상',
      usage: ['Body text', 'Headers', 'Primary content']
    },
    {
      name: 'Card',
      cssVar: '--color-card',
      lightValue: 'oklch(100% 0 0)',
      darkValue: 'oklch(12% 0.01 220)',
      description: '카드, 모달 배경색',
      usage: ['Card backgrounds', 'Modal backgrounds']
    },
    {
      name: 'Border',
      cssVar: '--color-border',
      lightValue: 'oklch(89.5% 0.005 286.3)',
      darkValue: 'oklch(17.9% 0.013 286.3)',
      description: '테두리, 구분선',
      usage: ['Input borders', 'Card borders', 'Dividers']
    },
    {
      name: 'Muted',
      cssVar: '--color-muted',
      lightValue: 'oklch(96.1% 0.013 286.3)',
      darkValue: 'oklch(15.7% 0.013 286.3)',
      description: '배경 강조, 미묘한 영역',
      usage: ['Subtle backgrounds', 'Code blocks']
    },
    {
      name: 'Accent',
      cssVar: '--color-accent',
      lightValue: 'oklch(96.1% 0.013 286.3)',
      darkValue: 'oklch(15.7% 0.013 286.3)',
      description: '강조, 호버 상태',
      usage: ['Hover states', 'Focus indicators']
    }
  ];
  
  const tailwindColors = [
    { name: 'Red', prefix: 'red', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Orange', prefix: 'orange', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Yellow', prefix: 'yellow', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Green', prefix: 'green', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Blue', prefix: 'blue', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Purple', prefix: 'purple', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Pink', prefix: 'pink', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] }
  ];
  
  let copiedColor = '';
  
  async function copyToClipboard(text: string, colorName: string) {
    try {
      await navigator.clipboard.writeText(text);
      copiedColor = colorName;
      setTimeout(() => {
        copiedColor = '';
      }, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }
  
  function getComputedColorValue(cssVar: string): string {
    if (typeof window !== 'undefined') {
      const rootStyles = getComputedStyle(document.documentElement);
      return rootStyles.getPropertyValue(cssVar).trim();
    }
    return '';
  }
  
  // 명시적 클래스 선언 (Tailwind 생성 보장)
  const explicitClasses = [
    'bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900',
    'bg-orange-50', 'bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900',
    'bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900',
    'bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900',
    'bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900',
    'bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900',
    'bg-pink-50', 'bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900'
  ];
</script>

<svelte:head>
  <title>색상 시스템 - 디자인 시스템</title>
  <meta name="description" content="디자인 시스템의 색상 팔레트와 사용 가이드라인" />
</svelte:head>

<!-- 명시적 클래스 선언 (숨김) -->
<div class="hidden">
  {#each explicitClasses as className}
    <div class={className}></div>
  {/each}
</div>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">색상 시스템</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        일관된 디자인과 접근성을 보장하는 색상 팔레트입니다. 
        모든 색상은 WCAG 2.1 AA 표준을 준수하며 라이트/다크 테마를 모두 지원합니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>WCAG AA 준수</Badge>
      <Badge variant="secondary">oklch 색상 공간</Badge>
      <Badge variant="outline">라이트/다크 테마</Badge>
    </div>
  </section>
  
  <!-- 시맨틱 색상 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">시맨틱 색상</h2>
      <p class="text-muted-foreground">
        의미를 가지는 색상들입니다. 테마에 따라 자동으로 변경되며 컴포넌트에서 직접 사용됩니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {#each semanticColors as color}
        <Card class="overflow-hidden">
          <div class="h-20 relative" style="background-color: var({color.cssVar})">
            <div class="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="sm"
                class="h-8 w-8 p-0 bg-black/10 hover:bg-black/20 backdrop-blur-sm"
                onclick={() => copyToClipboard(`var(${color.cssVar})`, color.name)}
              >
                {#if copiedColor === color.name}
                  ✓
                {:else}
                  📋
                {/if}
              </Button>
            </div>
          </div>
          
          <CardHeader class="pb-3">
            <CardTitle class="text-lg flex items-center justify-between">
              {color.name}
              <Badge variant="outline" class="text-xs">
                {color.cssVar.replace('--color-', '')}
              </Badge>
            </CardTitle>
            <CardDescription class="text-sm">
              {color.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent class="pt-0">
            <div class="space-y-3">
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div class="text-muted-foreground mb-1">Light:</div>
                  <code class="bg-muted px-2 py-1 rounded text-xs">{color.lightValue}</code>
                </div>
                <div>
                  <div class="text-muted-foreground mb-1">Dark:</div>
                  <code class="bg-muted px-2 py-1 rounded text-xs">{color.darkValue}</code>
                </div>
              </div>
              
              {#if color.usage}
                <div>
                  <div class="text-muted-foreground text-xs mb-1">사용 예:</div>
                  <div class="flex flex-wrap gap-1">
                    {#each color.usage as usage}
                      <Badge variant="secondary" class="text-xs px-1.5 py-0.5">
                        {usage}
                      </Badge>
                    {/each}
                  </div>
                </div>
              {/if}
              
              <div class="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  class="w-full text-xs"
                  onclick={() => copyToClipboard(`var(${color.cssVar})`, color.name)}
                >
                  {copiedColor === color.name ? '복사됨!' : 'CSS 변수 복사'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- Tailwind 기본 색상 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">Tailwind 색상 팔레트</h2>
      <p class="text-muted-foreground mb-4">
        Tailwind CSS에서 제공하는 기본 색상들입니다. 일러스트레이션, 아이콘, 특별한 강조 등에 사용할 수 있습니다.
      </p>
      <div class="bg-muted/50 border border-border rounded-lg p-4">
        <div class="text-sm text-muted-foreground">
          💡 <strong>팁:</strong> 색상 박스를 클릭하면 Tailwind 클래스명이 클립보드에 복사됩니다.
        </div>
      </div>
    </div>
    
    <div class="space-y-8">
      {#each tailwindColors as colorGroup}
        <Card>
          <CardHeader class="pb-4">
            <CardTitle class="text-xl">{colorGroup.name}</CardTitle>
            <CardDescription>
              {colorGroup.prefix}-[shade] 형태로 사용 (예: bg-{colorGroup.prefix}-500)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-5 md:grid-cols-10 gap-2">
              {#each colorGroup.shades as shade}
                <div class="text-center">
                  <button
                    class="w-full h-16 rounded-lg shadow-sm border border-border hover:scale-105 transition-transform bg-{colorGroup.prefix}-{shade} cursor-pointer"
                    onclick={() => copyToClipboard(`bg-${colorGroup.prefix}-${shade}`, `${colorGroup.prefix}-${shade}`)}
                    title="클릭하여 복사: bg-{colorGroup.prefix}-{shade}"
                  ></button>
                  <div class="mt-2 text-xs text-muted-foreground">
                    {shade}
                  </div>
                  {#if copiedColor === `${colorGroup.prefix}-${shade}`}
                    <div class="text-xs text-green-600 mt-1">복사됨!</div>
                  {/if}
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 색상 사용 가이드라인 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">사용 가이드라인</h2>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- 올바른 사용법 -->
      <Card>
        <CardHeader>
          <CardTitle class="text-green-600 flex items-center gap-2">
            ✅ 올바른 사용법
          </CardTitle>
          <CardDescription>권장되는 색상 사용 패턴</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-medium text-sm">시맨틱 색상 우선 사용</h4>
            <div class="bg-muted rounded p-3">
              <code class="text-sm">bg-primary text-primary-foreground</code>
            </div>
            <p class="text-xs text-muted-foreground">테마에 자동 대응됩니다</p>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">적절한 대비율 유지</h4>
            <div class="flex gap-2">
              <div class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
                좋은 대비
              </div>
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">일관된 색상 사용</h4>
            <div class="flex gap-2">
              <Button size="sm">Primary 액션</Button>
              <Button variant="outline" size="sm">Secondary 액션</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <!-- 피해야 할 사용법 -->
      <Card>
        <CardHeader>
          <CardTitle class="text-destructive flex items-center gap-2">
            ❌ 피해야 할 사용법
          </CardTitle>
          <CardDescription>권장하지 않는 색상 사용 패턴</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-medium text-sm">하드코딩된 색상</h4>
            <div class="bg-muted rounded p-3">
              <code class="text-sm line-through opacity-50">bg-blue-500</code>
            </div>
            <p class="text-xs text-muted-foreground">테마 변경 시 문제 발생</p>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">낮은 대비율</h4>
            <div class="flex gap-2">
              <div class="bg-yellow-200 text-yellow-300 px-3 py-1 rounded text-sm">
                읽기 어려움
              </div>
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">색상 의미 혼동</h4>
            <div class="flex gap-2">
              <Button variant="destructive" size="sm">저장하기</Button>
              <span class="text-xs text-muted-foreground self-center">❌ 빨간색 = 저장?</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 색상 테스트 도구 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">색상 테스트</h2>
      <p class="text-muted-foreground">
        실제 컴포넌트에서 색상이 어떻게 보이는지 테스트해보세요.
      </p>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle>컴포넌트 색상 미리보기</CardTitle>
        <CardDescription>테마를 변경하면서 색상 변화를 확인하세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <!-- 버튼 미리보기 -->
          <div>
            <h4 class="font-medium mb-3">Buttons</h4>
            <div class="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          
          <!-- 카드 미리보기 -->
          <div>
            <h4 class="font-medium mb-3">Cards</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card class="bg-card">
                <CardContent class="pt-4">
                  <div class="text-sm font-medium text-card-foreground">기본 카드</div>
                  <div class="text-xs text-muted-foreground mt-1">card 배경색 사용</div>
                </CardContent>
              </Card>
              
              <Card class="bg-accent">
                <CardContent class="pt-4">
                  <div class="text-sm font-medium text-accent-foreground">강조 카드</div>
                  <div class="text-xs text-muted-foreground mt-1">accent 배경색 사용</div>
                </CardContent>
              </Card>
              
              <Card class="bg-muted">
                <CardContent class="pt-4">
                  <div class="text-sm font-medium text-foreground">Muted 카드</div>
                  <div class="text-xs text-muted-foreground mt-1">muted 배경색 사용</div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <!-- 배지 미리보기 -->
          <div>
            <h4 class="font-medium mb-3">Badges</h4>
            <div class="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 빠른 링크 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-foreground mb-4">더 많은 색상 테스트</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/test/colors" variant="outline">
              전체 색상 팔레트 테스트
            </Button>
            <Button href="/design-system/test/colors/custom" variant="outline">
              커스텀 색상 변수 테스트
            </Button>
            <Button href="/design-system/test/theme" variant="outline">
              테마 시스템 검증
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</div>