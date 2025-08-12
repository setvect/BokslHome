<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  
  const features = [
    {
      title: '현대적인 디자인',
      description: 'Tailwind CSS v4.1과 최신 디자인 트렌드를 반영한 컴포넌트들',
      icon: '🎨'
    },
    {
      title: 'TypeScript 지원',
      description: '완전한 타입 안정성과 개발자 경험을 위한 TypeScript 지원',
      icon: '📝'
    },
    {
      title: '테마 시스템',
      description: 'Light/Dark 모드와 커스텀 색상을 지원하는 유연한 테마 시스템',
      icon: '🌓'
    },
    {
      title: '접근성 우선',
      description: 'WCAG 가이드라인을 준수하는 접근 가능한 컴포넌트들',
      icon: '♿'
    },
    {
      title: 'Svelte 5 최적화',
      description: '최신 Svelte 5 문법과 성능 최적화가 적용된 컴포넌트들',
      icon: '⚡'
    },
    {
      title: '완전한 문서화',
      description: '실제 코드 예시와 함께 제공되는 상세한 사용 가이드',
      icon: '📚'
    }
  ];
  
  const stats = [
    { label: '컴포넌트', value: '6+', description: '핵심 UI 컴포넌트' },
    { label: '테마', value: '2', description: 'Light & Dark 모드' },
    { label: '테스트', value: '100%', description: '완전한 테스트 커버리지' },
    { label: '성능', value: 'A+', description: '최적화된 번들 크기' }
  ];
</script>

<svelte:head>
  <title>디자인 시스템 - 현대적인 UI 컴포넌트 라이브러리</title>
  <meta name="description" content="Svelte 5와 Tailwind CSS v4.1 기반의 현대적인 디자인 시스템" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 히어로 섹션 -->
  <section class="text-center py-16 mb-16">
    <div class="mb-6">
      <Badge class="mb-4 bg-primary/10 text-primary border-primary/20">v2.1.0</Badge>
      <h1 class="text-5xl font-bold text-foreground mb-6">
        현대적인 <span class="text-primary">디자인 시스템</span>
      </h1>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        Svelte 5와 Tailwind CSS v4.1을 기반으로 한 아름답고 접근 가능하며 완전히 커스터마이징 가능한 
        UI 컴포넌트 라이브러리입니다.
      </p>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
      <Button size="lg" href="/design-system/installation">
        시작하기
      </Button>
      <Button variant="outline" size="lg" href="/design-system/test/components">
        컴포넌트 둘러보기
      </Button>
      <Button variant="ghost" size="lg" href="https://github.com" target="_blank">
        GitHub 보기 ↗
      </Button>
    </div>
  </section>
  
  <!-- 주요 특징 -->
  <section class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-foreground mb-4">주요 특징</h2>
      <p class="text-lg text-muted-foreground">
        개발자와 디자이너를 위한 강력하고 유연한 도구들
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {#each features as feature}
        <Card class="h-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <div class="text-3xl mb-3">{feature.icon}</div>
            <CardTitle class="text-lg">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription class="text-base leading-relaxed">
              {feature.description}
            </CardDescription>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 통계 -->
  <section class="mb-16">
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/10">
      <CardContent class="pt-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {#each stats as stat}
            <div>
              <div class="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div class="font-medium text-foreground mb-1">{stat.label}</div>
              <div class="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          {/each}
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 빠른 시작 -->
  <section class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-foreground mb-4">빠른 시작</h2>
      <p class="text-lg text-muted-foreground">
        몇 분 안에 디자인 시스템을 프로젝트에 적용해보세요
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 설치 -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            📦 설치
          </CardTitle>
          <CardDescription>
            필요한 패키지들을 설치하고 기본 설정을 구성합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="bg-muted rounded-lg p-4 font-mono text-sm mb-4">
            <div class="text-muted-foreground mb-2"># 패키지 설치</div>
            <div>npm install @tailwindcss/postcss tailwindcss</div>
          </div>
          <Button href="/design-system/installation" variant="outline" class="w-full">
            자세한 설치 가이드 보기
          </Button>
        </CardContent>
      </Card>
      
      <!-- 첫 번째 컴포넌트 -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            🧩 첫 번째 컴포넌트
          </CardTitle>
          <CardDescription>
            간단한 Button 컴포넌트로 시작해보세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="bg-muted rounded-lg p-4 font-mono text-sm mb-4">
            <div class="text-muted-foreground mb-2">// 컴포넌트 사용</div>
            <div>&lt;Button variant="default"&gt;</div>
            <div class="ml-2">Hello World</div>
            <div>&lt;/Button&gt;</div>
          </div>
          <Button href="/design-system/components/button" variant="outline" class="w-full">
            Button 컴포넌트 문서 보기
          </Button>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 컴포넌트 미리보기 -->
  <section class="mb-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-foreground mb-4">컴포넌트 미리보기</h2>
      <p class="text-lg text-muted-foreground">
        다양한 컴포넌트들을 실제로 체험해보세요
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Button 미리보기 -->
      <Card>
        <CardHeader>
          <CardTitle>Button</CardTitle>
          <CardDescription>다양한 스타일과 크기의 버튼 컴포넌트</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-2 mb-4">
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
          </div>
          <Button href="/design-system/components/button" variant="ghost" size="sm">
            자세히 보기 →
          </Button>
        </CardContent>
      </Card>
      
      <!-- Card 미리보기 -->
      <Card>
        <CardHeader>
          <CardTitle>Card</CardTitle>
          <CardDescription>콘텐츠를 담는 유연한 컨테이너</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="mb-4">
            <Card class="p-4 bg-accent/50">
              <div class="text-sm font-medium">예시 카드</div>
              <div class="text-xs text-muted-foreground mt-1">카드 내용</div>
            </Card>
          </div>
          <Button href="/design-system/components/card" variant="ghost" size="sm">
            자세히 보기 →
          </Button>
        </CardContent>
      </Card>
      
      <!-- Badge 미리보기 -->
      <Card>
        <CardHeader>
          <CardTitle>Badge</CardTitle>
          <CardDescription>상태와 라벨을 표시하는 작은 컴포넌트</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-2 mb-4">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <Button href="/design-system/components/badge" variant="ghost" size="sm">
            자세히 보기 →
          </Button>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- CTA 섹션 -->
  <section class="text-center py-16 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl">
    <h2 class="text-3xl font-bold text-foreground mb-4">
      지금 시작해보세요
    </h2>
    <p class="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
      현대적이고 아름다운 사용자 인터페이스를 빠르게 구축하세요. 
      우리의 디자인 시스템으로 개발 속도를 높이고 일관된 디자인을 유지할 수 있습니다.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <Button size="lg" href="/design-system/installation">
        설치 가이드 보기
      </Button>
      <Button variant="outline" size="lg" href="/design-system/test/components">
        라이브 데모 체험
      </Button>
    </div>
  </section>
</div>