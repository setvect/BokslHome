<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  
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
  
  const cardVariants = [
    { 
      variant: 'basic', 
      description: '가장 기본적인 카드 형태',
      code: `&lt;Card&gt;
  &lt;CardContent class="pt-6"&gt;
    &lt;p&gt;카드 내용입니다.&lt;/p&gt;
  &lt;/CardContent&gt;
&lt;/Card&gt;`,
      usage: '간단한 정보 표시'
    },
    { 
      variant: 'with-header', 
      description: '제목이 있는 카드',
      code: `&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;카드 제목&lt;/CardTitle&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;p&gt;카드 내용입니다.&lt;/p&gt;
  &lt;/CardContent&gt;
&lt;/Card&gt;`,
      usage: '제목이 필요한 콘텐츠'
    },
    { 
      variant: 'with-description', 
      description: '제목과 설명이 있는 카드',
      code: `&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;카드 제목&lt;/CardTitle&gt;
    &lt;CardDescription&gt;카드에 대한 간단한 설명&lt;/CardDescription&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;p&gt;카드 내용입니다.&lt;/p&gt;
  &lt;/CardContent&gt;
&lt;/Card&gt;`,
      usage: '상세한 정보가 필요한 경우'
    },
    { 
      variant: 'with-footer', 
      description: '액션 버튼이 있는 카드',
      code: `&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;카드 제목&lt;/CardTitle&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;p&gt;카드 내용입니다.&lt;/p&gt;
  &lt;/CardContent&gt;
  &lt;CardFooter&gt;
    &lt;Button&gt;액션&lt;/Button&gt;
  &lt;/CardFooter&gt;
&lt;/Card&gt;`,
      usage: '액션이 필요한 카드'
    }
  ];
  
  const examples = [
    {
      title: '프로필 카드',
      description: '사용자 프로필을 표시하는 카드',
      code: `&lt;Card class="w-full max-w-sm"&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;홍길동&lt;/CardTitle&gt;
    &lt;CardDescription&gt;프론트엔드 개발자&lt;/CardDescription&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;div class="flex items-center space-x-4"&gt;
      &lt;div class="w-16 h-16 bg-muted rounded-full"&gt;&lt;/div&gt;
      &lt;div&gt;
        &lt;p class="text-sm font-medium"&gt;3년 경력&lt;/p&gt;
        &lt;p class="text-sm text-muted-foreground"&gt;React, Svelte 전문&lt;/p&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/CardContent&gt;
  &lt;CardFooter&gt;
    &lt;Button class="w-full"&gt;연락하기&lt;/Button&gt;
  &lt;/CardFooter&gt;
&lt;/Card&gt;`
    },
    {
      title: '통계 카드',
      description: '데이터와 통계를 표시하는 카드',
      code: `&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;월간 방문자&lt;/CardTitle&gt;
    &lt;CardDescription&gt;최근 30일 통계&lt;/CardDescription&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent&gt;
    &lt;div class="text-2xl font-bold"&gt;12,345&lt;/div&gt;
    &lt;div class="text-xs text-muted-foreground"&gt;
      +20% from last month
    &lt;/div&gt;
  &lt;/CardContent&gt;
&lt;/Card&gt;`
    },
    {
      title: '설정 카드',
      description: '설정 옵션을 포함한 카드',
      code: `&lt;Card&gt;
  &lt;CardHeader&gt;
    &lt;CardTitle&gt;알림 설정&lt;/CardTitle&gt;
    &lt;CardDescription&gt;알림 수신 방법을 선택하세요&lt;/CardDescription&gt;
  &lt;/CardHeader&gt;
  &lt;CardContent class="space-y-4"&gt;
    &lt;div class="flex items-center justify-between"&gt;
      &lt;label for="email-notif" class="text-sm font-medium"&gt;이메일 알림&lt;/label&gt;
      &lt;input id="email-notif" type="checkbox" /&gt;
    &lt;/div&gt;
    &lt;div class="flex items-center justify-between"&gt;
      &lt;label for="push-notif" class="text-sm font-medium"&gt;푸시 알림&lt;/label&gt;
      &lt;input id="push-notif" type="checkbox" /&gt;
    &lt;/div&gt;
  &lt;/CardContent&gt;
  &lt;CardFooter&gt;
    &lt;Button&gt;저장&lt;/Button&gt;
  &lt;/CardFooter&gt;
&lt;/Card&gt;`
    }
  ];
</script>

<svelte:head>
  <title>Card - 디자인 시스템</title>
  <meta name="description" content="Card 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Card</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        콘텐츠를 그룹화하고 구조화하는 컨테이너 컴포넌트입니다. 
        다양한 구성 요소(Header, Content, Footer)를 조합하여 유연한 레이아웃을 만들 수 있습니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Layout</Badge>
      <Badge variant="secondary">Container</Badge>
      <Badge variant="outline">Flexible</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 카드 구성을 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- 기본 카드 -->
          <Card>
            <CardContent class="pt-6">
              <p class="text-sm">기본 카드</p>
            </CardContent>
          </Card>
          
          <!-- 헤더가 있는 카드 -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-lg">제목</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm">헤더가 있는 카드</p>
            </CardContent>
          </Card>
          
          <!-- 전체 구성 카드 -->
          <Card>
            <CardHeader class="pb-3">
              <CardTitle class="text-lg">제목</CardTitle>
              <CardDescription class="text-sm">설명</CardDescription>
            </CardHeader>
            <CardContent>
              <p class="text-sm">내용</p>
            </CardContent>
            <CardFooter class="pt-3">
              <Button size="sm">액션</Button>
            </CardFooter>
          </Card>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 카드 변형 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">카드 변형 (Variants)</h2>
      <p class="text-muted-foreground">
        용도에 따라 선택할 수 있는 다양한 카드 구성입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each cardVariants as variant}
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
                {#if variant.variant === 'basic'}
                  <Card>
                    <CardContent class="pt-6">
                      <p>카드 내용입니다.</p>
                    </CardContent>
                  </Card>
                {:else if variant.variant === 'with-header'}
                  <Card>
                    <CardHeader>
                      <CardTitle>카드 제목</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>카드 내용입니다.</p>
                    </CardContent>
                  </Card>
                {:else if variant.variant === 'with-description'}
                  <Card>
                    <CardHeader>
                      <CardTitle>카드 제목</CardTitle>
                      <CardDescription>카드에 대한 간단한 설명</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>카드 내용입니다.</p>
                    </CardContent>
                  </Card>
                {:else if variant.variant === 'with-footer'}
                  <Card>
                    <CardHeader>
                      <CardTitle>카드 제목</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>카드 내용입니다.</p>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm">액션</Button>
                    </CardFooter>
                  </Card>
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
        실제 상황에서 카드를 어떻게 사용하는지 확인해보세요.
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
                  {#if example.title === '프로필 카드'}
                    <Card class="w-full max-w-sm">
                      <CardHeader>
                        <CardTitle>홍길동</CardTitle>
                        <CardDescription>프론트엔드 개발자</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div class="flex items-center space-x-4">
                          <div class="w-16 h-16 bg-muted rounded-full"></div>
                          <div>
                            <p class="text-sm font-medium">3년 경력</p>
                            <p class="text-sm text-muted-foreground">React, Svelte 전문</p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button class="w-full" size="sm">연락하기</Button>
                      </CardFooter>
                    </Card>
                  {:else if example.title === '통계 카드'}
                    <Card>
                      <CardHeader>
                        <CardTitle>월간 방문자</CardTitle>
                        <CardDescription>최근 30일 통계</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div class="text-2xl font-bold">12,345</div>
                        <div class="text-xs text-muted-foreground">
                          +20% from last month
                        </div>
                      </CardContent>
                    </Card>
                  {:else if example.title === '설정 카드'}
                    <Card>
                      <CardHeader>
                        <CardTitle>알림 설정</CardTitle>
                        <CardDescription>알림 수신 방법을 선택하세요</CardDescription>
                      </CardHeader>
                      <CardContent class="space-y-4">
                        <div class="flex items-center justify-between">
                          <label for="email-notifications" class="text-sm font-medium">이메일 알림</label>
                          <input id="email-notifications" type="checkbox" />
                        </div>
                        <div class="flex items-center justify-between">
                          <label for="push-notifications" class="text-sm font-medium">푸시 알림</label>
                          <input id="push-notifications" type="checkbox" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm">저장</Button>
                      </CardFooter>
                    </Card>
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
        Card는 여러 하위 컴포넌트로 구성됩니다.
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
                <td class="py-3 font-mono">Card</td>
                <td class="py-3">카드의 루트 컨테이너</td>
                <td class="py-3">전체 카드를 감싸는 기본 컨테이너</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">CardHeader</td>
                <td class="py-3">카드 상단 헤더 영역</td>
                <td class="py-3">제목, 설명 등 헤더 정보</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">CardTitle</td>
                <td class="py-3">카드 제목</td>
                <td class="py-3">카드의 주요 제목</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">CardDescription</td>
                <td class="py-3">카드 설명</td>
                <td class="py-3">카드에 대한 부가 설명</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">CardContent</td>
                <td class="py-3">카드 본문 내용</td>
                <td class="py-3">주요 콘텐츠 영역</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">CardFooter</td>
                <td class="py-3">카드 하단 푸터 영역</td>
                <td class="py-3">액션 버튼, 부가 정보</td>
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
        Card 컴포넌트에서 사용할 수 있는 모든 속성들입니다.
      </p>
    </div>
    
    <Card>
      <CardContent class="pt-6">
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
                <td class="py-3">카드 내부 콘텐츠</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 접근성 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">접근성 (Accessibility)</h2>
      <p class="text-muted-foreground">
        Card 컴포넌트는 웹 접근성 표준을 준수합니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">구조적 접근성</CardTitle>
          <CardDescription>명확한 컨텐츠 구조</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm">
            <li>• 의미론적 HTML 구조 사용</li>
            <li>• 제목 계층구조 준수</li>
            <li>• 명확한 콘텐츠 구분</li>
            <li>• 적절한 랜드마크 제공</li>
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
            <li>• 적절한 heading 레벨 사용</li>
            <li>• 명확한 콘텐츠 레이블</li>
            <li>• 논리적 읽기 순서</li>
            <li>• 대체 텍스트 제공</li>
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