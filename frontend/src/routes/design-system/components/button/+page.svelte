<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  import AccessibilityGuide from '$lib/components/AccessibilityGuide.svelte';
  
  let copiedCode = $state('');
  
  async function copyCode(code: string, id: string) {
    try {
      await navigator.clipboard.writeText(code);
      copiedCode = id;
      setTimeout(() => {
        copiedCode = '';
      }, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }
  
  const buttonVariants = [
    { 
      variant: 'default', 
      description: '주요 액션에 사용하는 기본 버튼',
      code: '<Button variant="default">Default</Button>',
      usage: '폼 제출, 주요 액션'
    },
    { 
      variant: 'secondary', 
      description: '보조 액션에 사용하는 버튼',
      code: '<Button variant="secondary">Secondary</Button>',
      usage: '취소, 뒤로가기'
    },
    { 
      variant: 'destructive', 
      description: '삭제나 위험한 액션에 사용',
      code: '<Button variant="destructive">Destructive</Button>',
      usage: '삭제, 로그아웃'
    },
    { 
      variant: 'outline', 
      description: '테두리만 있는 버튼',
      code: '<Button variant="outline">Outline</Button>',
      usage: '필터, 옵션 선택'
    },
    { 
      variant: 'ghost', 
      description: '배경이 없는 최소한의 버튼',
      code: '<Button variant="ghost">Ghost</Button>',
      usage: '네비게이션, 메뉴'
    },
    { 
      variant: 'link', 
      description: '링크처럼 보이는 버튼',
      code: '<Button variant="link">Link</Button>',
      usage: '외부 링크, 관련 페이지'
    }
  ];
  
  const buttonSizes = [
    { size: 'sm', description: '작은 버튼', code: '<Button size="sm">Small</Button>' },
    { size: 'default', description: '기본 버튼', code: '<Button>Default</Button>' },
    { size: 'lg', description: '큰 버튼', code: '<Button size="lg">Large</Button>' },
    { size: 'icon', description: '아이콘 전용 버튼', code: '<Button size="icon">🎨</Button>' }
  ];
  
  const examples = [
    {
      title: '기본 사용법',
      description: '가장 기본적인 버튼 사용 방법',
      code: `<` + `script>
  import Button from '$lib/components/ui/button/button.svelte';
<` + `/script>

<Button onclick={() => alert('클릭됨!')}>
  클릭하세요
</Button>`
    },
    {
      title: '링크 버튼',
      description: '다른 페이지로 이동하는 버튼',
      code: `<Button href="/about">
  소개 페이지로 이동
</Button>`
    },
    {
      title: '비활성화된 버튼',
      description: '조건에 따라 비활성화되는 버튼',
      code: `<Button disabled>
  비활성화된 버튼
</Button>`
    },
    {
      title: '아이콘이 있는 버튼',
      description: '텍스트와 아이콘을 함께 사용',
      code: `<Button>
  📄 문서 다운로드
</Button>`
    },
    {
      title: '전체 폭 버튼',
      description: '컨테이너 전체 폭을 차지하는 버튼',
      code: `<Button class="w-full">
  전체 폭 버튼
</Button>`
    }
  ];
  
  const buttonProps = [
    {
      name: 'variant',
      type: "'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'",
      defaultValue: "'default'",
      description: '버튼의 시각적 스타일을 결정합니다.',
      required: false
    },
    {
      name: 'size',
      type: "'sm' | 'default' | 'lg' | 'icon'",
      defaultValue: "'default'",
      description: '버튼의 크기를 결정합니다.',
      required: false
    },
    {
      name: 'href',
      type: 'string',
      description: '링크 URL을 설정하면 a 태그로 렌더링됩니다.',
      required: false
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '버튼을 비활성화합니다.',
      required: false
    },
    {
      name: 'onclick',
      type: '() => void',
      description: '버튼 클릭 시 실행될 함수입니다.',
      required: false
    },
    {
      name: 'type',
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "'button'",
      description: '버튼의 HTML 타입 속성입니다.',
      required: false
    },
    {
      name: 'class',
      type: 'string',
      description: '추가 CSS 클래스를 적용합니다.',
      required: false
    }
  ];
  
  const accessibilityGuidelines = [
    {
      title: '키보드 내비게이션',
      description: '키보드만으로도 완전히 조작 가능합니다',
      level: 'AA' as const,
      items: [
        'Tab 키로 버튼에 포커스를 이동할 수 있습니다',
        'Enter 키 또는 Space 키로 버튼을 활성화할 수 있습니다', 
        '포커스 시 명확한 시각적 표시기를 제공합니다',
        'disabled 상태일 때 포커스를 받지 않습니다'
      ]
    },
    {
      title: '스크린 리더 지원',
      description: '스크린 리더 사용자를 위한 최적화',
      level: 'AA' as const,
      items: [
        '적절한 role="button" 또는 링크 의미를 전달합니다',
        '버튼의 목적을 명확하게 설명하는 레이블을 제공합니다',
        'disabled 상태를 스크린 리더에 알립니다',
        'aria-pressed 등 필요한 ARIA 속성을 지원합니다'
      ]
    },
    {
      title: '시각적 접근성',
      description: '시각 장애가 있는 사용자를 위한 고려사항',
      level: 'AA' as const,
      items: [
        'WCAG AA 기준 4.5:1 대비율을 준수합니다',
        '색상에만 의존하지 않고 텍스트로도 정보를 전달합니다',
        '충분한 크기의 클릭 영역을 제공합니다 (최소 44x44px)',
        '브라우저 확대 시에도 가독성을 유지합니다'
      ]
    },
    {
      title: '운동 장애 지원',
      description: '손목이나 손가락 사용이 어려운 사용자를 위한 배려',
      level: 'A' as const,
      items: [
        '마우스 호버 없이도 모든 기능에 접근할 수 있습니다',
        '실수로 클릭하기 어려운 적절한 간격을 유지합니다',
        '드래그 동작이 필요하지 않습니다',
        '타이머나 시간 제한이 없습니다'
      ]
    }
  ];
</script>

<svelte:head>
  <title>Button - 디자인 시스템</title>
  <meta name="description" content="Button 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Button</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        사용자 인터랙션을 위한 가장 기본적인 컴포넌트입니다. 
        다양한 스타일과 크기를 제공하여 모든 상황에 적절한 버튼을 만들 수 있습니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Interactive</Badge>
      <Badge variant="secondary">Accessible</Badge>
      <Badge variant="outline">Customizable</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 버튼 스타일을 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex flex-wrap gap-3">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <div class="flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🎨</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 버튼 변형 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">버튼 변형 (Variants)</h2>
      <p class="text-muted-foreground">
        용도에 따라 선택할 수 있는 다양한 버튼 스타일입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each buttonVariants as variant}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg capitalize">{variant.variant}</CardTitle>
                <CardDescription class="text-sm">{variant.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyCode(variant.code, variant.variant)}
              >
                {copiedCode === variant.variant ? '✓' : '📋'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <Button variant={variant.variant}>
                  {variant.variant === 'icon' ? '🎨' : variant.variant.charAt(0).toUpperCase() + variant.variant.slice(1)}
                </Button>
                <Button variant={variant.variant} disabled>
                  Disabled
                </Button>
              </div>
              
              <div class="space-y-2">
                <div class="text-xs text-muted-foreground">사용 예시: {variant.usage}</div>
                <CodeBlock code={variant.code} language="svelte" showCopy={false} />
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 버튼 크기 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">버튼 크기 (Sizes)</h2>
      <p class="text-muted-foreground">
        상황에 맞는 적절한 크기의 버튼을 선택하세요.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each buttonSizes as size}
        <Card>
          <CardContent class="pt-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="font-medium capitalize">{size.size} Button</h3>
                <p class="text-sm text-muted-foreground">{size.description}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyCode(size.code, size.size + '-size')}
              >
                {copiedCode === size.size + '-size' ? '✓' : '📋'}
              </Button>
            </div>
            
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <Button size={size.size}>
                  {size.size === 'icon' ? '🎨' : size.size.charAt(0).toUpperCase() + size.size.slice(1)}
                </Button>
              </div>
              
              <CodeBlock code={size.code} language="svelte" showCopy={false} />
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 사용 예시 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">사용 예시</h2>
      <p class="text-muted-foreground">
        실제 상황에서 버튼을 어떻게 사용하는지 확인해보세요.
      </p>
    </div>
    
    <div class="space-y-6">
      {#each examples as example}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg">{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyCode(example.code, example.title)}
              >
                {copiedCode === example.title ? '✓' : '📋'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 class="font-medium text-sm mb-3">미리보기</h4>
                <div class="border rounded p-4 bg-muted/30">
                  {#if example.title === '기본 사용법'}
                    <Button onclick={() => alert('클릭됨!')}>클릭하세요</Button>
                  {:else if example.title === '링크 버튼'}
                    <Button href="/design-system">소개 페이지로 이동</Button>
                  {:else if example.title === '비활성화된 버튼'}
                    <Button disabled>비활성화된 버튼</Button>
                  {:else if example.title === '아이콘이 있는 버튼'}
                    <Button>📄 문서 다운로드</Button>
                  {:else if example.title === '전체 폭 버튼'}
                    <Button class="w-full">전체 폭 버튼</Button>
                  {/if}
                </div>
              </div>
              
              <div>
                <h4 class="font-medium text-sm mb-3">코드</h4>
                <CodeBlock code={example.code} language="svelte" />
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 속성 (Props) -->
  <PropsTable 
    props={buttonProps} 
    title="속성 (Props)"
    description="Button 컴포넌트에서 사용할 수 있는 모든 속성들입니다."
  />
  
  <!-- 접근성 -->
  <AccessibilityGuide 
    guidelines={accessibilityGuidelines}
    title="접근성 (Accessibility)"
    description="Button 컴포넌트는 WCAG 2.1 접근성 표준을 준수합니다."
  />
  
  <!-- 관련 컴포넌트 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-foreground mb-4">관련 컴포넌트</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/test/components/button" variant="outline">
              라이브 테스트
            </Button>
            <Button href="/design-system/components/card" variant="outline">
              Card 컴포넌트
            </Button>
            <Button href="/design-system/components" variant="outline">
              모든 컴포넌트 보기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</div>