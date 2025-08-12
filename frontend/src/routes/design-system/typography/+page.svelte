<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  
  let copiedText = '';
  
  async function copyToClipboard(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      copiedText = id;
      setTimeout(() => {
        copiedText = '';
      }, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }
  
  const headingStyles = [
    { tag: 'h1', class: 'text-4xl font-bold', description: '페이지 메인 제목' },
    { tag: 'h2', class: 'text-3xl font-bold', description: '섹션 제목' },
    { tag: 'h3', class: 'text-2xl font-semibold', description: '하위 섹션 제목' },
    { tag: 'h4', class: 'text-xl font-semibold', description: '작은 제목' },
    { tag: 'h5', class: 'text-lg font-medium', description: '카드 제목' },
    { tag: 'h6', class: 'text-base font-medium', description: '작은 레이블' }
  ];
  
  const textStyles = [
    { name: 'Body Large', class: 'text-lg text-foreground', description: '큰 본문 텍스트' },
    { name: 'Body Default', class: 'text-base text-foreground', description: '기본 본문 텍스트' },
    { name: 'Body Small', class: 'text-sm text-foreground', description: '작은 본문 텍스트' },
    { name: 'Caption', class: 'text-xs text-muted-foreground', description: '캡션, 부가 정보' },
    { name: 'Muted', class: 'text-sm text-muted-foreground', description: '보조 설명 텍스트' },
    { name: 'Link', class: 'text-sm text-primary underline hover:no-underline', description: '링크 텍스트' }
  ];
  
  const fontWeights = [
    { name: 'Light', class: 'font-light', weight: '300' },
    { name: 'Regular', class: 'font-normal', weight: '400' },
    { name: 'Medium', class: 'font-medium', weight: '500' },
    { name: 'Semibold', class: 'font-semibold', weight: '600' },
    { name: 'Bold', class: 'font-bold', weight: '700' }
  ];
</script>

<svelte:head>
  <title>Typography - 디자인 시스템</title>
  <meta name="description" content="디자인 시스템의 타이포그래피 가이드와 텍스트 스타일" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Typography</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        일관성 있고 읽기 쉬운 텍스트를 위한 타이포그래피 시스템입니다. 
        적절한 크기, 무게, 색상을 사용하여 정보 계층을 명확하게 표현하세요.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Inter 폰트</Badge>
      <Badge variant="secondary">Tailwind Typography</Badge>
      <Badge variant="outline">반응형 크기</Badge>
    </div>
  </section>
  
  <!-- 제목 스타일 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">제목 스타일</h2>
      <p class="text-muted-foreground">
        페이지와 섹션의 계층 구조를 명확하게 보여주는 제목 스타일들입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      {#each headingStyles as heading}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg">{heading.tag.toUpperCase()}</CardTitle>
                <CardDescription>{heading.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyToClipboard(heading.class, heading.tag)}
              >
                {copiedText === heading.tag ? '✓' : '📋'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class={heading.class + ' text-foreground'}>
                {heading.tag === 'h1' ? '메인 페이지 제목' : 
                 heading.tag === 'h2' ? '섹션 제목 예시' :
                 heading.tag === 'h3' ? '하위 섹션 제목' :
                 heading.tag === 'h4' ? '작은 제목 예시' :
                 heading.tag === 'h5' ? '카드 제목' : '작은 레이블'}
              </div>
              
              <div class="bg-muted rounded p-3">
                <code class="text-sm">&lt;{heading.tag} class="{heading.class}"&gt;</code>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 본문 텍스트 스타일 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">본문 텍스트 스타일</h2>
      <p class="text-muted-foreground">
        다양한 용도에 맞는 본문 텍스트 스타일들입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each textStyles as textStyle}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-base">{textStyle.name}</CardTitle>
                <CardDescription class="text-sm">{textStyle.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyToClipboard(textStyle.class, textStyle.name)}
              >
                {copiedText === textStyle.name ? '✓' : '📋'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              <p class={textStyle.class}>
                {textStyle.name === 'Body Large' ? '큰 본문 텍스트입니다. 중요한 내용이나 소개 문구에 사용됩니다.' :
                 textStyle.name === 'Body Default' ? '기본 본문 텍스트입니다. 대부분의 내용에 사용되는 기본 스타일입니다.' :
                 textStyle.name === 'Body Small' ? '작은 본문 텍스트입니다. 부가적인 설명에 사용됩니다.' :
                 textStyle.name === 'Caption' ? '캡션이나 작은 정보를 표시할 때 사용합니다.' :
                 textStyle.name === 'Muted' ? '보조적인 설명이나 덜 중요한 정보에 사용됩니다.' :
                 '링크 텍스트 스타일입니다. 클릭 가능한 요소를 나타냅니다.'}
              </p>
              
              <div class="bg-muted rounded p-2">
                <code class="text-xs">{textStyle.class}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 폰트 굵기 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">폰트 굵기</h2>
      <p class="text-muted-foreground">
        텍스트의 중요도와 계층을 표현하는 다양한 폰트 굵기입니다.
      </p>
    </div>
    
    <Card>
      <CardContent class="pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {#each fontWeights as weight}
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-foreground">{weight.name}</span>
                <span class="text-xs text-muted-foreground">{weight.weight}</span>
              </div>
              
              <p class={weight.class + ' text-lg text-foreground'}>
                Sample Text 예시 텍스트
              </p>
              
              <div class="bg-muted rounded p-2">
                <code class="text-xs">{weight.class}</code>
              </div>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 사용 가이드라인 -->
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
          <CardDescription>권장되는 타이포그래피 패턴</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-medium text-sm">계층적 제목 사용</h4>
            <div class="space-y-1">
              <h1 class="text-2xl font-bold">H1 메인 제목</h1>
              <h2 class="text-xl font-semibold">H2 섹션 제목</h2>
              <h3 class="text-lg font-medium">H3 하위 제목</h3>
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">적절한 색상 대비</h4>
            <p class="text-foreground">높은 대비의 기본 텍스트</p>
            <p class="text-muted-foreground">낮은 대비의 보조 텍스트</p>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">일관된 간격</h4>
            <div class="space-y-2">
              <p class="text-base">첫 번째 문단입니다.</p>
              <p class="text-base">두 번째 문단입니다.</p>
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
          <CardDescription>권장하지 않는 타이포그래피 패턴</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-medium text-sm">제목 계층 건너뛰기</h4>
            <div class="space-y-1 opacity-50">
              <h1 class="text-2xl font-bold">H1 메인 제목</h1>
              <h4 class="text-base font-medium line-through">H4 제목 (H2, H3 건너뜀)</h4>
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">과도한 굵기 사용</h4>
            <p class="font-bold opacity-50 line-through">모든 텍스트가 굵게</p>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">너무 작은 텍스트</h4>
            <p class="text-xs opacity-50 line-through">읽기 어려운 작은 텍스트</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 실제 예시 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">실제 사용 예시</h2>
      <p class="text-muted-foreground">
        실제 콘텐츠에서 타이포그래피가 어떻게 사용되는지 확인해보세요.
      </p>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle class="text-xl font-semibold">블로그 포스트 예시</CardTitle>
        <CardDescription>실제 콘텐츠에서의 타이포그래피 적용</CardDescription>
      </CardHeader>
      <CardContent>
        <article class="prose prose-slate max-w-none">
          <h1 class="text-3xl font-bold text-foreground mb-4">디자인 시스템 구축하기</h1>
          
          <p class="text-lg text-muted-foreground mb-6">
            현대적인 웹 개발에서 디자인 시스템의 중요성과 구축 방법에 대해 알아보겠습니다.
          </p>
          
          <h2 class="text-2xl font-semibold text-foreground mb-4 mt-8">디자인 시스템이란?</h2>
          
          <p class="text-base text-foreground mb-4">
            디자인 시스템은 일관된 사용자 경험을 제공하기 위한 재사용 가능한 컴포넌트들과 
            가이드라인의 집합입니다. 이는 개발 효율성을 높이고 브랜드 일관성을 유지하는 데 
            도움이 됩니다.
          </p>
          
          <h3 class="text-xl font-semibold text-foreground mb-3 mt-6">주요 구성 요소</h3>
          
          <ul class="space-y-2 mb-4">
            <li class="text-base text-foreground">• 색상 팔레트와 테마 시스템</li>
            <li class="text-base text-foreground">• 타이포그래피 가이드라인</li>
            <li class="text-base text-foreground">• 재사용 가능한 UI 컴포넌트</li>
            <li class="text-base text-foreground">• 간격과 레이아웃 시스템</li>
          </ul>
          
          <p class="text-sm text-muted-foreground mt-6">
            마지막 업데이트: 2024년 1월 • 작성자: 디자인 시스템 팀
          </p>
        </article>
      </CardContent>
    </Card>
  </section>
  
  <!-- 빠른 참조 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-foreground mb-4">타이포그래피 빠른 참조</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/components" variant="outline">
              컴포넌트에서 사용 보기
            </Button>
            <Button href="/design-system/test/components" variant="outline">
              라이브 테스트
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</div>