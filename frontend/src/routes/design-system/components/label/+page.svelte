<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  
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
  
  const labelVariants = [
    { 
      variant: 'basic', 
      description: '기본 라벨',
      code: '&lt;Label for="example"&gt;라벨 텍스트&lt;/Label&gt;',
      usage: '단순한 텍스트 라벨'
    },
    { 
      variant: 'required', 
      description: '필수 필드 라벨',
      code: '&lt;Label for="example"&gt;이름 &lt;span class="text-destructive"&gt;*&lt;/span&gt;&lt;/Label&gt;',
      usage: '필수 입력 필드'
    },
    { 
      variant: 'disabled', 
      description: '비활성화된 라벨',
      code: '&lt;Label class="opacity-50"&gt;비활성화된 라벨&lt;/Label&gt;',
      usage: '비활성화된 필드용'
    }
  ];
  
  const examples = [
    {
      title: '기본 폼 라벨',
      description: '입력 필드와 함께 사용하는 기본 라벨',
      code: `&lt;div class="space-y-2"&gt;
  &lt;Label for="username"&gt;사용자명&lt;/Label&gt;
  &lt;Input id="username" type="text" placeholder="사용자명을 입력하세요" /&gt;
&lt;/div&gt;`
    },
    {
      title: '필수 필드',
      description: '필수 입력을 나타내는 라벨',
      code: `&lt;div class="space-y-2"&gt;
  &lt;Label for="email"&gt;
    이메일 주소 &lt;span class="text-destructive"&gt;*&lt;/span&gt;
  &lt;/Label&gt;
  &lt;Input id="email" type="email" required placeholder="이메일을 입력하세요" /&gt;
&lt;/div&gt;`
    },
    {
      title: '설명이 있는 라벨',
      description: '추가 설명이 포함된 라벨',
      code: `&lt;div class="space-y-2"&gt;
  &lt;div&gt;
    &lt;Label for="bio"&gt;자기소개&lt;/Label&gt;
    &lt;p class="text-sm text-muted-foreground"&gt;
      간단히 자신을 소개해주세요
    &lt;/p&gt;
  &lt;/div&gt;
  &lt;textarea 
    id="bio" 
    class="w-full min-h-[100px] px-3 py-2 border rounded-md" 
    placeholder="자기소개를 입력하세요"
  &gt;&lt;/textarea&gt;
&lt;/div&gt;`
    },
    {
      title: '그룹 라벨',
      description: '여러 관련 필드를 그룹화하는 라벨',
      code: `&lt;fieldset class="space-y-4 border rounded-lg p-4"&gt;
  &lt;legend class="text-sm font-medium px-2"&gt;연락처 정보&lt;/legend&gt;
  &lt;div class="space-y-2"&gt;
    &lt;Label for="phone"&gt;전화번호&lt;/Label&gt;
    &lt;Input id="phone" type="tel" placeholder="010-0000-0000" /&gt;
  &lt;/div&gt;
  &lt;div class="space-y-2"&gt;
    &lt;Label for="address"&gt;주소&lt;/Label&gt;
    &lt;Input id="address" placeholder="주소를 입력하세요" /&gt;
  &lt;/div&gt;
&lt;/fieldset&gt;`
    },
    {
      title: '체크박스 라벨',
      description: '체크박스와 함께 사용하는 라벨',
      code: `&lt;div class="flex items-center space-x-2"&gt;
  &lt;input id="terms" type="checkbox" class="rounded border-input" /&gt;
  &lt;Label for="terms" class="cursor-pointer"&gt;
    이용약관에 동의합니다
  &lt;/Label&gt;
&lt;/div&gt;`
    },
    {
      title: '라디오 버튼 그룹',
      description: '라디오 버튼 그룹과 함께 사용하는 라벨',
      code: `&lt;fieldset class="space-y-3"&gt;
  &lt;legend class="text-sm font-medium"&gt;선호하는 테마&lt;/legend&gt;
  &lt;div class="flex items-center space-x-2"&gt;
    &lt;input id="light" type="radio" name="theme" value="light" /&gt;
    &lt;Label for="light" class="cursor-pointer"&gt;라이트 모드&lt;/Label&gt;
  &lt;/div&gt;
  &lt;div class="flex items-center space-x-2"&gt;
    &lt;input id="dark" type="radio" name="theme" value="dark" /&gt;
    &lt;Label for="dark" class="cursor-pointer"&gt;다크 모드&lt;/Label&gt;
  &lt;/div&gt;
  &lt;div class="flex items-center space-x-2"&gt;
    &lt;input id="auto" type="radio" name="theme" value="auto" /&gt;
    &lt;Label for="auto" class="cursor-pointer"&gt;자동&lt;/Label&gt;
  &lt;/div&gt;
&lt;/fieldset&gt;`
    }
  ];
</script>

<svelte:head>
  <title>Label - 디자인 시스템</title>
  <meta name="description" content="Label 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Label</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        폼 요소에 텍스트 라벨을 제공하는 컴포넌트입니다. 
        접근성을 위해 입력 필드와 의미론적으로 연결되며, 사용자 경험을 향상시킵니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Accessible</Badge>
      <Badge variant="outline">Typography</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 라벨 사용법을 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="space-y-2">
              <Label for="demo1">기본 라벨</Label>
              <Input id="demo1" placeholder="입력하세요" />
            </div>
            
            <div class="space-y-2">
              <Label for="demo2">
                필수 필드 <span class="text-destructive">*</span>
              </Label>
              <Input id="demo2" placeholder="필수 입력" />
            </div>
            
            <div class="space-y-2">
              <Label class="opacity-50">비활성화된 라벨</Label>
              <Input disabled placeholder="비활성화됨" />
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <input id="checkbox-demo" type="checkbox" class="rounded border-input" />
            <Label for="checkbox-demo" class="cursor-pointer">
              체크박스 라벨 (클릭 가능)
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 라벨 변형 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">라벨 변형 (Variants)</h2>
      <p class="text-muted-foreground">
        용도에 따라 선택할 수 있는 다양한 라벨 스타일입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {#each labelVariants as variant}
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
                  <Label for={`example-${variant.variant}`}>라벨 텍스트</Label>
                {:else if variant.variant === 'required'}
                  <Label for={`example-${variant.variant}`}>이름 <span class="text-destructive">*</span></Label>
                {:else if variant.variant === 'disabled'}
                  <Label class="opacity-50">비활성화된 라벨</Label>
                {/if}
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
        실제 상황에서 Label을 어떻게 사용하는지 확인해보세요.
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
                  {#if example.title === '기본 폼 라벨'}
                    <div class="space-y-2">
                      <Label for="username">사용자명</Label>
                      <Input id="username" type="text" placeholder="사용자명을 입력하세요" />
                    </div>
                  {:else if example.title === '필수 필드'}
                    <div class="space-y-2">
                      <Label for="email">
                        이메일 주소 <span class="text-destructive">*</span>
                      </Label>
                      <Input id="email" type="email" required placeholder="이메일을 입력하세요" />
                    </div>
                  {:else if example.title === '설명이 있는 라벨'}
                    <div class="space-y-2">
                      <div>
                        <Label for="bio">자기소개</Label>
                        <p class="text-sm text-muted-foreground">
                          간단히 자신을 소개해주세요
                        </p>
                      </div>
                      <textarea 
                        id="bio" 
                        class="w-full min-h-[100px] px-3 py-2 border rounded-md text-sm" 
                        placeholder="자기소개를 입력하세요"
                      ></textarea>
                    </div>
                  {:else if example.title === '그룹 라벨'}
                    <fieldset class="space-y-4 border rounded-lg p-4">
                      <legend class="text-sm font-medium px-2">연락처 정보</legend>
                      <div class="space-y-2">
                        <Label for="phone">전화번호</Label>
                        <Input id="phone" type="tel" placeholder="010-0000-0000" />
                      </div>
                      <div class="space-y-2">
                        <Label for="address">주소</Label>
                        <Input id="address" placeholder="주소를 입력하세요" />
                      </div>
                    </fieldset>
                  {:else if example.title === '체크박스 라벨'}
                    <div class="flex items-center space-x-2">
                      <input id="terms" type="checkbox" class="rounded border-input" />
                      <Label for="terms" class="cursor-pointer">
                        이용약관에 동의합니다
                      </Label>
                    </div>
                  {:else if example.title === '라디오 버튼 그룹'}
                    <fieldset class="space-y-3">
                      <legend class="text-sm font-medium">선호하는 테마</legend>
                      <div class="flex items-center space-x-2">
                        <input id="light" type="radio" name="theme" value="light" />
                        <Label for="light" class="cursor-pointer">라이트 모드</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <input id="dark" type="radio" name="theme" value="dark" />
                        <Label for="dark" class="cursor-pointer">다크 모드</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <input id="auto" type="radio" name="theme" value="auto" />
                        <Label for="auto" class="cursor-pointer">자동</Label>
                      </div>
                    </fieldset>
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
  
  <!-- 속성 (Props) -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">속성 (Props)</h2>
      <p class="text-muted-foreground">
        Label 컴포넌트에서 사용할 수 있는 모든 속성들입니다.
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
                <td class="py-3 font-mono">for</td>
                <td class="py-3 text-muted-foreground">string</td>
                <td class="py-3 text-muted-foreground">-</td>
                <td class="py-3">연결할 폼 요소의 ID</td>
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
                <td class="py-3">라벨 내부 콘텐츠</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 접근성 가이드라인 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">접근성 가이드라인</h2>
      <p class="text-muted-foreground">
        Label을 사용할 때 지켜야 할 접근성 가이드라인입니다.
      </p>
    </div>
    
    <div class="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">필수 사항</CardTitle>
          <CardDescription>접근성을 위해 반드시 지켜야 할 사항들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">for 속성 사용</p>
                <p class="text-sm text-muted-foreground">라벨은 반드시 for 속성을 통해 해당 입력 요소와 연결되어야 합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">명확한 텍스트</p>
                <p class="text-sm text-muted-foreground">라벨 텍스트는 해당 필드의 용도를 명확하게 설명해야 합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">항상 표시</p>
                <p class="text-sm text-muted-foreground">라벨은 숨겨지지 않고 항상 사용자에게 표시되어야 합니다.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">권장사항</CardTitle>
          <CardDescription>더 나은 사용자 경험을 위한 권장사항들</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">필수 필드 표시</p>
                <p class="text-sm text-muted-foreground">필수 입력 필드는 시각적 표시(*)와 함께 표시하는 것이 좋습니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">클릭 가능한 라벨</p>
                <p class="text-sm text-muted-foreground">체크박스나 라디오 버튼의 경우 라벨을 클릭해도 선택될 수 있도록 구현합니다.</p>
              </div>
            </div>
            
            <div class="flex items-start gap-3">
              <div class="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <div>
                <p class="font-medium">그룹화</p>
                <p class="text-sm text-muted-foreground">관련된 필드들은 fieldset과 legend를 사용해 그룹화합니다.</p>
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
        Label 컴포넌트는 웹 접근성 표준을 준수합니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">키보드 지원</CardTitle>
          <CardDescription>키보드 네비게이션 지원</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm">
            <li>• 라벨 클릭 시 연결된 요소로 포커스 이동</li>
            <li>• 논리적인 탭 순서 제공</li>
            <li>• 키보드만으로 모든 기능 사용 가능</li>
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
            <li>• 라벨과 입력 요소의 의미론적 연결</li>
            <li>• 명확한 필드 설명 제공</li>
            <li>• 필수 필드 상태 알림</li>
            <li>• 적절한 그룹화 정보</li>
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
            <Button href="/design-system/components/input" variant="outline">
              Input 컴포넌트
            </Button>
            <Button href="/design-system/components/button" variant="outline">
              Button 컴포넌트
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