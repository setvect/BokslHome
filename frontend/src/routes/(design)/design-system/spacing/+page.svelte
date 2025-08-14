<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  
  let copiedClass = '';
  
  async function copyToClipboard(text: string, id: string) {
    try {
      await navigator.clipboard.writeText(text);
      copiedClass = id;
      setTimeout(() => {
        copiedClass = '';
      }, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }
  
  const spacingScale = [
    { value: '0', px: '0px', class: '0', description: '공간 없음' },
    { value: '0.5', px: '2px', class: '0.5', description: '최소 간격' },
    { value: '1', px: '4px', class: '1', description: '매우 작은 간격' },
    { value: '1.5', px: '6px', class: '1.5', description: '작은 간격' },
    { value: '2', px: '8px', class: '2', description: '작은 간격' },
    { value: '2.5', px: '10px', class: '2.5', description: '작은-보통 간격' },
    { value: '3', px: '12px', class: '3', description: '보통 간격' },
    { value: '3.5', px: '14px', class: '3.5', description: '보통 간격' },
    { value: '4', px: '16px', class: '4', description: '기본 간격' },
    { value: '5', px: '20px', class: '5', description: '보통-큰 간격' },
    { value: '6', px: '24px', class: '6', description: '큰 간격' },
    { value: '7', px: '28px', class: '7', description: '큰 간격' },
    { value: '8', px: '32px', class: '8', description: '매우 큰 간격' },
    { value: '10', px: '40px', class: '10', description: '섹션 간격' },
    { value: '12', px: '48px', class: '12', description: '섹션 간격' },
    { value: '16', px: '64px', class: '16', description: '페이지 간격' },
    { value: '20', px: '80px', class: '20', description: '큰 섹션 간격' },
    { value: '24', px: '96px', class: '24', description: '페이지 구분' }
  ];
  
  const paddingExamples = [
    { class: 'p-2', description: '컴포넌트 내부 작은 패딩', usage: 'Badge, 작은 버튼' },
    { class: 'p-3', description: '컴포넌트 내부 기본 패딩', usage: 'Button, Input' },
    { class: 'p-4', description: '컴포넌트 내부 편안한 패딩', usage: 'Card 내용' },
    { class: 'p-6', description: '섹션 내부 패딩', usage: 'Card, Modal' },
    { class: 'p-8', description: '페이지 메인 패딩', usage: '페이지 컨테이너' }
  ];
  
  const marginExamples = [
    { class: 'mb-2', description: '요소 간 작은 간격', usage: '라벨-입력 필드' },
    { class: 'mb-4', description: '요소 간 기본 간격', usage: '문단, 컴포넌트' },
    { class: 'mb-6', description: '섹션 내 그룹 간격', usage: '폼 그룹' },
    { class: 'mb-8', description: '섹션 간 간격', usage: '메인 섹션' },
    { class: 'mb-12', description: '큰 섹션 간격', usage: '페이지 주요 구역' }
  ];
</script>

<svelte:head>
  <title>Spacing - 디자인 시스템</title>
  <meta name="description" content="디자인 시스템의 간격 시스템과 레이아웃 가이드" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Spacing System</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        일관된 레이아웃과 시각적 리듬을 만드는 간격 시스템입니다. 
        8px 기반의 간격 체계로 조화로운 디자인을 구현하세요.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>8px 기반</Badge>
      <Badge variant="secondary">Tailwind Spacing</Badge>
      <Badge variant="outline">반응형 지원</Badge>
    </div>
  </section>
  
  <!-- 간격 스케일 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">간격 스케일</h2>
      <p class="text-muted-foreground">
        Tailwind CSS의 기본 간격 체계를 기반으로 한 일관된 간격 값들입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {#each spacingScale as space}
        <Card class="overflow-hidden">
          <CardContent class="p-4">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-3">
                <div class="w-12 h-8 bg-primary rounded flex items-center justify-center">
                  <div class="bg-primary-foreground" style="width: {space.px}; height: 4px;"></div>
                </div>
                <div>
                  <div class="font-medium text-sm">{space.value}</div>
                  <div class="text-xs text-muted-foreground">{space.px}</div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyToClipboard(space.class, space.value)}
              >
                {copiedClass === space.value ? '✓' : '📋'}
              </Button>
            </div>
            
            <div class="space-y-2">
              <p class="text-sm text-foreground">{space.description}</p>
              <div class="bg-muted rounded p-2">
                <code class="text-xs">space-{space.class}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 패딩 예시 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">패딩 (Padding)</h2>
      <p class="text-muted-foreground">
        컴포넌트 내부 공간을 조절하는 패딩 사용 예시입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      {#each paddingExamples as example}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg">{example.class}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyToClipboard(example.class, example.class)}
              >
                {copiedClass === example.class ? '✓' : '📋'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="border-2 border-dashed border-primary/30 rounded">
                <div class={example.class + ' bg-accent/50 rounded-sm'}>
                  <div class="bg-primary/20 rounded text-center text-sm font-medium py-2">
                    내용 영역
                  </div>
                </div>
              </div>
              
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">사용 예시: {example.usage}</span>
                <code class="bg-muted px-2 py-1 rounded">{example.class}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 마진 예시 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">마진 (Margin)</h2>
      <p class="text-muted-foreground">
        요소 간의 간격을 조절하는 마진 사용 예시입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      {#each marginExamples as example}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg">{example.class}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyToClipboard(example.class, example.class + '-margin')}
              >
                {copiedClass === example.class + '-margin' ? '✓' : '📋'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="border-2 border-dashed border-primary/30 rounded p-2">
                <div class="bg-accent/50 rounded p-2 text-center text-sm">첫 번째 요소</div>
                <div class={example.class + ' bg-accent/50 rounded p-2 text-center text-sm'}>
                  두 번째 요소 (마진 적용)
                </div>
              </div>
              
              <div class="flex items-center justify-between text-sm">
                <span class="text-muted-foreground">사용 예시: {example.usage}</span>
                <code class="bg-muted px-2 py-1 rounded">{example.class}</code>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 간격 조합 예시 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">실제 레이아웃 예시</h2>
      <p class="text-muted-foreground">
        실제 인터페이스에서 간격 시스템이 어떻게 사용되는지 확인해보세요.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 카드 레이아웃 -->
      <Card>
        <CardHeader>
          <CardTitle>카드 컴포넌트 간격</CardTitle>
          <CardDescription>카드 내부 요소들의 간격 적용</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="bg-muted/30 rounded p-1">
            <div class="bg-card border rounded p-6">
              <h3 class="text-lg font-semibold mb-2">카드 제목</h3>
              <p class="text-muted-foreground mb-4">카드 설명 텍스트입니다.</p>
              <div class="flex gap-2">
                <Button size="sm">주요 액션</Button>
                <Button variant="outline" size="sm">보조 액션</Button>
              </div>
            </div>
          </div>
          
          <div class="mt-4 space-y-1 text-sm text-muted-foreground">
            <div>• 제목 하단: mb-2 (8px)</div>
            <div>• 설명 하단: mb-4 (16px)</div>
            <div>• 버튼 간격: gap-2 (8px)</div>
            <div>• 카드 패딩: p-6 (24px)</div>
          </div>
        </CardContent>
      </Card>
      
      <!-- 폼 레이아웃 -->
      <Card>
        <CardHeader>
          <CardTitle>폼 컴포넌트 간격</CardTitle>
          <CardDescription>폼 요소들의 간격 적용</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="bg-muted/30 rounded p-1">
            <div class="bg-card border rounded p-6">
              <div class="space-y-4">
                <div class="space-y-2">
                  <label class="text-sm font-medium">이메일</label>
                  <input type="email" class="w-full p-2 border rounded" placeholder="example@email.com" />
                </div>
                
                <div class="space-y-2">
                  <label class="text-sm font-medium">비밀번호</label>
                  <input type="password" class="w-full p-2 border rounded" placeholder="••••••••" />
                </div>
                
                <Button class="w-full mt-6">로그인</Button>
              </div>
            </div>
          </div>
          
          <div class="mt-4 space-y-1 text-sm text-muted-foreground">
            <div>• 라벨-입력: space-y-2 (8px)</div>
            <div>• 입력 필드 그룹: space-y-4 (16px)</div>
            <div>• 버튼 상단: mt-6 (24px)</div>
            <div>• 입력 필드 패딩: p-2 (8px)</div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 반응형 간격 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">반응형 간격</h2>
      <p class="text-muted-foreground">
        화면 크기에 따라 적절한 간격을 적용하는 방법입니다.
      </p>
    </div>
    
    <Card>
      <CardContent class="pt-6">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="text-center">
              <h4 class="font-medium mb-2">모바일</h4>
              <div class="bg-muted/50 rounded p-3">
                <code class="text-sm">p-4 mb-6</code>
                <p class="text-xs text-muted-foreground mt-1">작은 화면용 간격</p>
              </div>
            </div>
            
            <div class="text-center">
              <h4 class="font-medium mb-2">태블릿</h4>
              <div class="bg-muted/50 rounded p-3">
                <code class="text-sm">md:p-6 md:mb-8</code>
                <p class="text-xs text-muted-foreground mt-1">중간 화면용 간격</p>
              </div>
            </div>
            
            <div class="text-center">
              <h4 class="font-medium mb-2">데스크톱</h4>
              <div class="bg-muted/50 rounded p-3">
                <code class="text-sm">lg:p-8 lg:mb-12</code>
                <p class="text-xs text-muted-foreground mt-1">큰 화면용 간격</p>
              </div>
            </div>
          </div>
          
          <div class="bg-accent/20 rounded p-4">
            <h4 class="font-medium mb-2">반응형 간격 예시</h4>
            <code class="text-sm bg-muted px-2 py-1 rounded">
              class="p-4 md:p-6 lg:p-8 mb-6 md:mb-8 lg:mb-12"
            </code>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 가이드라인 -->
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
          <CardDescription>권장되는 간격 패턴</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-medium text-sm">일관된 간격 사용</h4>
            <div class="space-y-2">
              <div class="bg-accent/30 p-2 rounded">mb-4 (16px)</div>
              <div class="bg-accent/30 p-2 rounded">mb-4 (16px)</div>
              <div class="bg-accent/30 p-2 rounded">mb-4 (16px)</div>
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">8px 배수 사용</h4>
            <div class="text-sm text-muted-foreground">
              8px, 16px, 24px, 32px...
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">계층적 간격</h4>
            <div class="text-sm text-muted-foreground">
              요소 간격 &lt; 그룹 간격 &lt; 섹션 간격
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
          <CardDescription>권장하지 않는 간격 패턴</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <div class="space-y-2">
            <h4 class="font-medium text-sm">불규칙한 간격</h4>
            <div class="space-y-1 opacity-50">
              <div class="bg-destructive/20 p-2 rounded text-xs">mb-3 (12px)</div>
              <div class="bg-destructive/20 p-2 rounded text-xs">mb-7 (28px)</div>
              <div class="bg-destructive/20 p-2 rounded text-xs">mb-5 (20px)</div>
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">과도한 간격</h4>
            <div class="text-sm text-muted-foreground line-through opacity-50">
              mb-20 (80px) 과도한 간격
            </div>
          </div>
          
          <div class="space-y-2">
            <h4 class="font-medium text-sm">간격 부족</h4>
            <div class="text-sm text-muted-foreground line-through opacity-50">
              mb-0.5 (2px) 너무 좁은 간격
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 빠른 참조 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-foreground mb-4">간격 시스템 빠른 참조</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/typography" variant="outline">
              Typography 보기
            </Button>
            <Button href="/design-system/test/components" variant="outline">
              컴포넌트에서 확인
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</div>