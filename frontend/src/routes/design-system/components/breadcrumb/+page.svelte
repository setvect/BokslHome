<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbPage, 
    BreadcrumbSeparator,
    BreadcrumbEllipsis
  } from '$lib/components/ui/breadcrumb';
  
  let copiedCode = '';
  
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
  
  const breadcrumbVariants = [
    { 
      variant: 'simple', 
      description: '간단한 브레드크럼',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/"&gt;홈&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;현재 페이지&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`,
      usage: '간단한 2단계 네비게이션'
    },
    { 
      variant: 'multiple', 
      description: '다단계 브레드크럼',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/"&gt;홈&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/products"&gt;제품&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/products/electronics"&gt;전자제품&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;스마트폰&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`,
      usage: '깊은 계층 구조의 네비게이션'
    },
    { 
      variant: 'with-ellipsis', 
      description: '생략 표시가 있는 브레드크럼',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/"&gt;홈&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbEllipsis /&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/category"&gt;카테고리&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;현재 페이지&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`,
      usage: '긴 경로에서 중간 단계 생략'
    }
  ];
  
  const examples = [
    {
      title: '기본 사용법',
      description: '가장 일반적인 브레드크럼 사용 방법',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/"&gt;홈&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/blog"&gt;블로그&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;게시물 제목&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`
    },
    {
      title: '전자상거래 사이트',
      description: '상품 카테고리 네비게이션',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/"&gt;홈&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/categories"&gt;카테고리&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/categories/electronics"&gt;전자제품&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/categories/electronics/phones"&gt;휴대폰&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;iPhone 15 Pro&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`
    },
    {
      title: '긴 경로 축약',
      description: '깊은 계층구조에서 중간 경로 생략',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/"&gt;홈&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbEllipsis /&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/docs/components"&gt;컴포넌트&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/docs/components/navigation"&gt;네비게이션&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;브레드크럼&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`
    },
    {
      title: '대시보드 네비게이션',
      description: '관리자 대시보드에서의 브레드크럼',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/dashboard"&gt;대시보드&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/dashboard/users"&gt;사용자 관리&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;사용자 편집&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`
    },
    {
      title: '파일 시스템 탐색',
      description: '폴더 구조를 나타내는 브레드크럼',
      code: `&lt;Breadcrumb&gt;
  &lt;BreadcrumbList&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/files"&gt;파일&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/files/documents"&gt;문서&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbLink href="/files/documents/projects"&gt;프로젝트&lt;/BreadcrumbLink&gt;
    &lt;/BreadcrumbItem&gt;
    &lt;BreadcrumbSeparator /&gt;
    &lt;BreadcrumbItem&gt;
      &lt;BreadcrumbPage&gt;디자인-시스템.pdf&lt;/BreadcrumbPage&gt;
    &lt;/BreadcrumbItem&gt;
  &lt;/BreadcrumbList&gt;
&lt;/Breadcrumb&gt;`
    }
  ];
</script>

<svelte:head>
  <title>Breadcrumb - 디자인 시스템</title>
  <meta name="description" content="Breadcrumb 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Breadcrumb</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        사용자의 현재 위치를 표시하고 상위 페이지로 쉽게 이동할 수 있도록 도와주는 네비게이션 컴포넌트입니다. 
        계층적 구조를 가진 웹사이트에서 사용자 경험을 향상시킵니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Navigation</Badge>
      <Badge variant="secondary">Hierarchical</Badge>
      <Badge variant="outline">Accessible</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 브레드크럼 구성을 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <!-- 간단한 브레드크럼 -->
          <div>
            <p class="text-sm text-muted-foreground mb-2">간단한 브레드크럼</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>현재 페이지</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <!-- 다단계 브레드크럼 -->
          <div>
            <p class="text-sm text-muted-foreground mb-2">다단계 브레드크럼</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/design-system">디자인 시스템</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/design-system/components">컴포넌트</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>브레드크럼</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <!-- 생략 표시가 있는 브레드크럼 -->
          <div>
            <p class="text-sm text-muted-foreground mb-2">생략 표시가 있는 브레드크럼</p>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbEllipsis />
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">컴포넌트</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>브레드크럼</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 브레드크럼 변형 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">브레드크럼 변형 (Variants)</h2>
      <p class="text-muted-foreground">
        용도에 따라 선택할 수 있는 다양한 브레드크럼 구성입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      {#each breadcrumbVariants as variant}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg capitalize">{variant.variant.replace('-', ' ')}</CardTitle>
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
              <div class="border rounded p-4 bg-muted/30">
                {#if variant.variant === 'simple'}
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">홈</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>현재 페이지</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                {:else if variant.variant === 'multiple'}
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">홈</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/products">제품</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/products/electronics">전자제품</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>스마트폰</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                {:else if variant.variant === 'with-ellipsis'}
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">홈</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/category">카테고리</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>현재 페이지</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                {/if}
              </div>
              
              <div class="space-y-2">
                <div class="text-xs text-muted-foreground">사용 예시: {variant.usage}</div>
                <div class="bg-muted rounded p-3">
                  <pre class="text-sm overflow-x-auto"><code>{@html variant.code}</code></pre>
                </div>
              </div>
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
        실제 상황에서 Breadcrumb을 어떻게 사용하는지 확인해보세요.
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
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">홈</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/blog">블로그</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>게시물 제목</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  {:else if example.title === '전자상거래 사이트'}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">홈</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/categories">카테고리</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/categories/electronics">전자제품</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/categories/electronics/phones">휴대폰</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>iPhone 15 Pro</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  {:else if example.title === '긴 경로 축약'}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">홈</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbEllipsis />
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/docs/components">컴포넌트</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/docs/components/navigation">네비게이션</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>브레드크럼</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  {:else if example.title === '대시보드 네비게이션'}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/dashboard">대시보드</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/dashboard/users">사용자 관리</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>사용자 편집</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  {:else if example.title === '파일 시스템 탐색'}
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/files">파일</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/files/documents">문서</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/files/documents/projects">프로젝트</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>디자인-시스템.pdf</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  {/if}
                </div>
              </div>
              
              <div>
                <h4 class="font-medium text-sm mb-3">코드</h4>
                <div class="bg-muted rounded p-4">
                  <pre class="text-sm overflow-x-auto"><code>{@html example.code}</code></pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 구성 요소 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">구성 요소 (Components)</h2>
      <p class="text-muted-foreground">
        Breadcrumb은 여러 하위 컴포넌트로 구성됩니다.
      </p>
    </div>
    
    <Card>
      <CardContent class="pt-6">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="border-b">
                <th class="text-left py-3 font-medium">컴포넌트</th>
                <th class="text-left py-3 font-medium">설명</th>
                <th class="text-left py-3 font-medium">용도</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr class="border-b">
                <td class="py-3 font-mono">Breadcrumb</td>
                <td class="py-3">브레드크럼의 루트 컨테이너</td>
                <td class="py-3">전체 브레드크럼을 감싸는 기본 컨테이너</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">BreadcrumbList</td>
                <td class="py-3">브레드크럼 항목들의 리스트</td>
                <td class="py-3">순서가 있는 네비게이션 항목 목록</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">BreadcrumbItem</td>
                <td class="py-3">개별 브레드크럼 항목</td>
                <td class="py-3">각각의 네비게이션 단계를 나타냄</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">BreadcrumbLink</td>
                <td class="py-3">클릭 가능한 링크 항목</td>
                <td class="py-3">이전 페이지로 이동할 수 있는 링크</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">BreadcrumbPage</td>
                <td class="py-3">현재 페이지를 나타내는 항목</td>
                <td class="py-3">현재 위치 표시 (링크가 아님)</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">BreadcrumbSeparator</td>
                <td class="py-3">항목 사이의 구분자</td>
                <td class="py-3">브레드크럼 항목들을 시각적으로 구분</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">BreadcrumbEllipsis</td>
                <td class="py-3">생략된 항목을 나타내는 표시</td>
                <td class="py-3">긴 경로에서 중간 단계 생략 표시</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 속성 (Props) -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">속성 (Props)</h2>
      <p class="text-muted-foreground">
        Breadcrumb 컴포넌트에서 사용할 수 있는 모든 속성들입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">BreadcrumbLink</CardTitle>
          <CardDescription>클릭 가능한 링크 항목의 속성</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 font-medium">속성</th>
                  <th class="text-left py-3 font-medium">타입</th>
                  <th class="text-left py-3 font-medium">기본값</th>
                  <th class="text-left py-3 font-medium">설명</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b">
                  <td class="py-3 font-mono">href</td>
                  <td class="py-3 text-muted-foreground">string</td>
                  <td class="py-3 text-muted-foreground">-</td>
                  <td class="py-3">링크 URL</td>
                </tr>
                <tr class="border-b">
                  <td class="py-3 font-mono">class</td>
                  <td class="py-3 text-muted-foreground">string</td>
                  <td class="py-3 text-muted-foreground">-</td>
                  <td class="py-3">추가 CSS 클래스</td>
                </tr>
                <tr class="border-b">
                  <td class="py-3 font-mono">children</td>
                  <td class="py-3 text-muted-foreground">Snippet</td>
                  <td class="py-3 text-muted-foreground">-</td>
                  <td class="py-3">링크 내부 콘텐츠</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">BreadcrumbPage</CardTitle>
          <CardDescription>현재 페이지를 나타내는 항목의 속성</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 font-medium">속성</th>
                  <th class="text-left py-3 font-medium">타입</th>
                  <th class="text-left py-3 font-medium">기본값</th>
                  <th class="text-left py-3 font-medium">설명</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b">
                  <td class="py-3 font-mono">class</td>
                  <td class="py-3 text-muted-foreground">string</td>
                  <td class="py-3 text-muted-foreground">-</td>
                  <td class="py-3">추가 CSS 클래스</td>
                </tr>
                <tr class="border-b">
                  <td class="py-3 font-mono">children</td>
                  <td class="py-3 text-muted-foreground">Snippet</td>
                  <td class="py-3 text-muted-foreground">-</td>
                  <td class="py-3">페이지 제목 텍스트</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 사용 가이드라인 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">사용 가이드라인</h2>
      <p class="text-muted-foreground">
        효과적인 브레드크럼 사용을 위한 가이드라인입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg text-green-600">권장사항</CardTitle>
          <CardDescription>브레드크럼 사용 시 권장되는 방법들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">논리적 계층 구조 반영</p>
                <p class="text-sm text-muted-foreground">웹사이트의 실제 정보 구조를 정확하게 반영해야 합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">홈페이지부터 시작</p>
                <p class="text-sm text-muted-foreground">브레드크럼은 일반적으로 홈페이지에서 시작하는 것이 좋습니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">현재 페이지는 링크로 만들지 않기</p>
                <p class="text-sm text-muted-foreground">현재 페이지는 BreadcrumbPage를 사용하여 링크가 아닌 텍스트로 표시합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">긴 경로는 축약하기</p>
                <p class="text-sm text-muted-foreground">5단계 이상의 긴 경로는 BreadcrumbEllipsis를 사용해 중간 단계를 생략합니다.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-lg text-red-600">주의사항</CardTitle>
          <CardDescription>브레드크럼 사용 시 피해야 할 사항들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">단일 레벨 페이지에서는 사용하지 않기</p>
                <p class="text-sm text-muted-foreground">홈페이지나 단일 레벨 페이지에서는 브레드크럼이 불필요합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">브라우저 히스토리와 혼동 금지</p>
                <p class="text-sm text-muted-foreground">브레드크럼은 사이트 구조를 나타내며, 사용자의 방문 히스토리가 아닙니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">너무 많은 레벨 표시 금지</p>
                <p class="text-sm text-muted-foreground">한 화면에 표시되는 브레드크럼 레벨은 7개를 넘지 않는 것이 좋습니다.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 접근성 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">접근성 (Accessibility)</h2>
      <p class="text-muted-foreground">
        Breadcrumb 컴포넌트는 웹 접근성 표준을 준수합니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">키보드 네비게이션</CardTitle>
          <CardDescription>키보드만으로도 완전히 조작 가능</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm">
            <li>• <kbd class="bg-muted px-1.5 py-0.5 rounded">Tab</kbd> - 링크 간 이동</li>
            <li>• <kbd class="bg-muted px-1.5 py-0.5 rounded">Enter</kbd> - 링크 활성화</li>
            <li>• <kbd class="bg-muted px-1.5 py-0.5 rounded">Space</kbd> - 링크 활성화</li>
            <li>• 논리적인 탭 순서 제공</li>
          </ul>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">스크린 리더</CardTitle>
          <CardDescription>스크린 리더 친화적인 구조</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm">
            <li>• nav 요소로 네비게이션 식별</li>
            <li>• aria-label로 브레드크럼 설명</li>
            <li>• ol 요소로 순서 있는 목록 구성</li>
            <li>• 현재 페이지는 aria-current 사용</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 관련 컴포넌트 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-foreground mb-4">관련 컴포넌트</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/components/button" variant="outline">
              Button 컴포넌트
            </Button>
            <Button href="/design-system/components/badge" variant="outline">
              Badge 컴포넌트
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