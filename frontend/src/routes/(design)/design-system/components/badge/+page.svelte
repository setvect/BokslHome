<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
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
  
  const badgeVariants = [
    { 
      variant: 'default', 
      description: '주요 정보를 나타내는 기본 배지',
      code: '&lt;Badge variant="default"&gt;Default&lt;/Badge&gt;',
      usage: '중요한 상태, 새로운 기능'
    },
    { 
      variant: 'secondary', 
      description: '보조 정보를 나타내는 배지',
      code: '&lt;Badge variant="secondary"&gt;Secondary&lt;/Badge&gt;',
      usage: '카테고리, 태그, 분류'
    },
    { 
      variant: 'destructive', 
      description: '위험하거나 부정적인 상태를 나타내는 배지',
      code: '&lt;Badge variant="destructive"&gt;Destructive&lt;/Badge&gt;',
      usage: '오류, 경고, 삭제 상태'
    },
    { 
      variant: 'outline', 
      description: '테두리만 있는 최소한의 배지',
      code: '&lt;Badge variant="outline"&gt;Outline&lt;/Badge&gt;',
      usage: '선택적 정보, 임시 상태'
    }
  ];
  
  const examples = [
    {
      title: '상태 표시',
      description: '다양한 상태를 나타내는 배지들',
      code: `&lt;div class="flex flex-wrap gap-2"&gt;
  &lt;Badge variant="default"&gt;진행중&lt;/Badge&gt;
  &lt;Badge variant="secondary"&gt;완료&lt;/Badge&gt;
  &lt;Badge variant="destructive"&gt;오류&lt;/Badge&gt;
  &lt;Badge variant="outline"&gt;대기&lt;/Badge&gt;
&lt;/div&gt;`
    },
    {
      title: '카테고리 태그',
      description: '콘텐츠 분류를 위한 배지 사용',
      code: `&lt;div class="space-y-4"&gt;
  &lt;div class="flex flex-wrap gap-2"&gt;
    &lt;Badge variant="secondary"&gt;프론트엔드&lt;/Badge&gt;
    &lt;Badge variant="secondary"&gt;React&lt;/Badge&gt;
    &lt;Badge variant="secondary"&gt;TypeScript&lt;/Badge&gt;
  &lt;/div&gt;
  &lt;div class="flex flex-wrap gap-2"&gt;
    &lt;Badge variant="outline"&gt;백엔드&lt;/Badge&gt;
    &lt;Badge variant="outline"&gt;Node.js&lt;/Badge&gt;
    &lt;Badge variant="outline"&gt;데이터베이스&lt;/Badge&gt;
  &lt;/div&gt;
&lt;/div&gt;`
    },
    {
      title: '숫자가 포함된 배지',
      description: '카운터나 숫자 정보가 있는 배지',
      code: `&lt;div class="flex items-center gap-4"&gt;
  &lt;div class="flex items-center gap-2"&gt;
    &lt;span&gt;메시지&lt;/span&gt;
    &lt;Badge variant="destructive"&gt;5&lt;/Badge&gt;
  &lt;/div&gt;
  &lt;div class="flex items-center gap-2"&gt;
    &lt;span&gt;알림&lt;/span&gt;
    &lt;Badge variant="default"&gt;12&lt;/Badge&gt;
  &lt;/div&gt;
  &lt;div class="flex items-center gap-2"&gt;
    &lt;span&gt;새 댓글&lt;/span&gt;
    &lt;Badge variant="secondary"&gt;3&lt;/Badge&gt;
  &lt;/div&gt;
&lt;/div&gt;`
    },
    {
      title: '링크 배지',
      description: '클릭 가능한 배지',
      code: `&lt;div class="flex flex-wrap gap-2"&gt;
  &lt;Badge href="/design-system" variant="default"&gt;디자인 시스템&lt;/Badge&gt;
  &lt;Badge href="/components" variant="secondary"&gt;컴포넌트&lt;/Badge&gt;
  &lt;Badge href="/guides" variant="outline"&gt;가이드&lt;/Badge&gt;
&lt;/div&gt;`
    },
    {
      title: '아이콘과 함께',
      description: '아이콘이 포함된 배지',
      code: `&lt;div class="flex flex-wrap gap-2"&gt;
  &lt;Badge variant="default"&gt;⭐ 추천&lt;/Badge&gt;
  &lt;Badge variant="secondary"&gt;🔥 인기&lt;/Badge&gt;
  &lt;Badge variant="destructive"&gt;⚠️ 주의&lt;/Badge&gt;
  &lt;Badge variant="outline"&gt;🆕 새로운&lt;/Badge&gt;
&lt;/div&gt;`
    },
    {
      title: '프로필/사용자 정보',
      description: '사용자 정보를 표시하는 배지',
      code: `&lt;div class="space-y-4"&gt;
  &lt;div class="flex items-center gap-3"&gt;
    &lt;div class="w-10 h-10 bg-muted rounded-full"&gt;&lt;/div&gt;
    &lt;div&gt;
      &lt;p class="font-medium"&gt;홍길동&lt;/p&gt;
      &lt;div class="flex gap-2 mt-1"&gt;
        &lt;Badge variant="default"&gt;관리자&lt;/Badge&gt;
        &lt;Badge variant="secondary"&gt;프리미엄&lt;/Badge&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;`
    }
  ];
</script>

<svelte:head>
  <title>Badge - 디자인 시스템</title>
  <meta name="description" content="Badge 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Badge</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        작은 정보나 상태를 표시하기 위한 컴포넌트입니다. 
        태그, 라벨, 상태 표시기 등으로 활용하여 사용자에게 중요한 정보를 간결하게 전달할 수 있습니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Label</Badge>
      <Badge variant="secondary">Status</Badge>
      <Badge variant="outline">Indicator</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 배지 스타일을 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div class="flex flex-wrap gap-3">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <Badge variant="default">⭐ 추천</Badge>
            <Badge variant="secondary">🔥 인기</Badge>
            <Badge variant="destructive">⚠️ 주의</Badge>
            <Badge variant="outline">🆕 새로운</Badge>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <Badge href="#" variant="default">클릭 가능한 배지</Badge>
            <Badge variant="secondary">12</Badge>
            <Badge variant="outline">Beta</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 배지 변형 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">배지 변형 (Variants)</h2>
      <p class="text-muted-foreground">
        용도에 따라 선택할 수 있는 다양한 배지 스타일입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each badgeVariants as variant}
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
                <Badge variant={variant.variant}>
                  {variant.variant === 'default' ? 'Default' :
                   variant.variant === 'secondary' ? 'Secondary' :
                   variant.variant === 'destructive' ? 'Destructive' :
                   variant.variant === 'outline' ? 'Outline' : variant.variant}
                </Badge>
                <Badge href="#" variant={variant.variant}>
                  Link Badge
                </Badge>
              </div>
              
              <div class="space-y-2">
                <div class="text-xs text-muted-foreground">사용 예시: {variant.usage}</div>
                <div class="bg-muted rounded p-3">
                  <code class="text-sm">{@html variant.code}</code>
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
        실제 상황에서 Badge를 어떻게 사용하는지 확인해보세요.
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
                  {#if example.title === '상태 표시'}
                    <div class="flex flex-wrap gap-2">
                      <Badge variant="default">진행중</Badge>
                      <Badge variant="secondary">완료</Badge>
                      <Badge variant="destructive">오류</Badge>
                      <Badge variant="outline">대기</Badge>
                    </div>
                  {:else if example.title === '카테고리 태그'}
                    <div class="space-y-4">
                      <div class="flex flex-wrap gap-2">
                        <Badge variant="secondary">프론트엔드</Badge>
                        <Badge variant="secondary">React</Badge>
                        <Badge variant="secondary">TypeScript</Badge>
                      </div>
                      <div class="flex flex-wrap gap-2">
                        <Badge variant="outline">백엔드</Badge>
                        <Badge variant="outline">Node.js</Badge>
                        <Badge variant="outline">데이터베이스</Badge>
                      </div>
                    </div>
                  {:else if example.title === '숫자가 포함된 배지'}
                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-2">
                        <span class="text-sm">메시지</span>
                        <Badge variant="destructive">5</Badge>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm">알림</span>
                        <Badge variant="default">12</Badge>
                      </div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm">새 댓글</span>
                        <Badge variant="secondary">3</Badge>
                      </div>
                    </div>
                  {:else if example.title === '링크 배지'}
                    <div class="flex flex-wrap gap-2">
                      <Badge href="/design-system" variant="default">디자인 시스템</Badge>
                      <Badge href="/components" variant="secondary">컴포넌트</Badge>
                      <Badge href="/guides" variant="outline">가이드</Badge>
                    </div>
                  {:else if example.title === '아이콘과 함께'}
                    <div class="flex flex-wrap gap-2">
                      <Badge variant="default">⭐ 추천</Badge>
                      <Badge variant="secondary">🔥 인기</Badge>
                      <Badge variant="destructive">⚠️ 주의</Badge>
                      <Badge variant="outline">🆕 새로운</Badge>
                    </div>
                  {:else if example.title === '프로필/사용자 정보'}
                    <div class="space-y-4">
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 bg-muted rounded-full"></div>
                        <div>
                          <p class="font-medium text-sm">홍길동</p>
                          <div class="flex gap-2 mt-1">
                            <Badge variant="default">관리자</Badge>
                            <Badge variant="secondary">프리미엄</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
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
  
  <!-- 크기와 스타일링 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">크기와 스타일링</h2>
      <p class="text-muted-foreground">
        CSS 클래스를 사용하여 배지의 크기와 스타일을 조절할 수 있습니다.
      </p>
    </div>
    
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">크기 조절</CardTitle>
          <CardDescription>text 클래스를 사용하여 배지 크기를 조절할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-4 flex-wrap">
            <Badge class="text-xs" variant="secondary">작은 크기</Badge>
            <Badge variant="secondary">기본 크기</Badge>
            <Badge class="text-sm py-1 px-3" variant="secondary">큰 크기</Badge>
          </div>
          <div class="mt-4 bg-muted rounded p-3">
            <pre class="text-sm"><code>{@html `<Badge class="text-xs" variant="secondary">작은 크기</Badge>
<Badge variant="secondary">기본 크기</Badge>
<Badge class="text-sm py-1 px-3" variant="secondary">큰 크기</Badge>`}</code></pre>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">색상 커스터마이징</CardTitle>
          <CardDescription>배경색과 텍스트 색상을 자유롭게 조절할 수 있습니다</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center gap-4 flex-wrap">
            <Badge class="bg-purple-100 text-purple-800 border-purple-200">보라색</Badge>
            <Badge class="bg-green-100 text-green-800 border-green-200">초록색</Badge>
            <Badge class="bg-yellow-100 text-yellow-800 border-yellow-200">노란색</Badge>
            <Badge class="bg-pink-100 text-pink-800 border-pink-200">분홍색</Badge>
          </div>
          <div class="mt-4 bg-muted rounded p-3">
            <pre class="text-sm"><code>{@html `<Badge class="bg-purple-100 text-purple-800 border-purple-200">보라색</Badge>
<Badge class="bg-green-100 text-green-800 border-green-200">초록색</Badge>`}</code></pre>
          </div>
        </CardContent>
      </Card>
    </div>
  </section>
  
  <!-- 속성 (Props) -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">속성 (Props)</h2>
      <p class="text-muted-foreground">
        Badge 컴포넌트에서 사용할 수 있는 모든 속성들입니다.
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
                <td class="py-3 font-mono">variant</td>
                <td class="py-3 text-muted-foreground">'default' | 'secondary' | 'destructive' | 'outline'</td>
                <td class="py-3 font-mono">'default'</td>
                <td class="py-3">배지의 시각적 스타일</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">href</td>
                <td class="py-3 text-muted-foreground">string</td>
                <td class="py-3 text-muted-foreground">-</td>
                <td class="py-3">링크 URL (설정 시 a 태그로 렌더링)</td>
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
                <td class="py-3">배지 내부 콘텐츠</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 디자인 가이드라인 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">디자인 가이드라인</h2>
      <p class="text-muted-foreground">
        효과적인 배지 사용을 위한 디자인 가이드라인입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg text-green-600">권장사항</CardTitle>
          <CardDescription>배지 사용 시 권장되는 방법들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">간결한 텍스트 사용</p>
                <p class="text-sm text-muted-foreground">배지에는 1-2개의 단어만 사용하여 간결하게 표현합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">의미에 맞는 색상 선택</p>
                <p class="text-sm text-muted-foreground">빨간색은 오류나 경고, 초록색은 성공이나 완료를 나타냅니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">일관된 사용</p>
                <p class="text-sm text-muted-foreground">같은 의미의 정보는 동일한 스타일의 배지를 사용합니다.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-lg text-red-600">주의사항</CardTitle>
          <CardDescription>배지 사용 시 피해야 할 사항들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">너무 많은 배지 사용 금지</p>
                <p class="text-sm text-muted-foreground">한 영역에 너무 많은 배지를 사용하면 시각적 혼란을 초래합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">긴 텍스트 사용 금지</p>
                <p class="text-sm text-muted-foreground">배지에 긴 문장이나 여러 줄의 텍스트는 적합하지 않습니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">대화형 요소로 오해 금지</p>
                <p class="text-sm text-muted-foreground">링크가 아닌 배지는 클릭 가능해 보이는 스타일을 피합니다.</p>
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
        Badge 컴포넌트는 웹 접근성 표준을 준수합니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">색상 접근성</CardTitle>
          <CardDescription>색상에만 의존하지 않는 정보 전달</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm">
            <li>• 충분한 색상 대비 제공</li>
            <li>• 색맹 사용자를 위한 색상 선택</li>
            <li>• 텍스트와 아이콘으로 의미 보완</li>
            <li>• 색상 외 다른 구별 요소 제공</li>
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
            <li>• 명확한 텍스트 제공</li>
            <li>• 링크 배지의 적절한 레이블</li>
            <li>• 상태 변화 시 알림 제공</li>
            <li>• 의미론적 HTML 구조 사용</li>
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