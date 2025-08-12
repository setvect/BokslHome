<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  import Input from '$lib/components/ui/input/input.svelte';
  import Label from '$lib/components/ui/label/label.svelte';
  
  let copiedCode = '';
  let sampleValues = {
    text: '',
    email: '',
    password: '',
    number: '',
    search: '',
    url: ''
  };
  
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
  
  const inputTypes = [
    { 
      type: 'text', 
      description: '일반 텍스트 입력',
      code: '&lt;Input type="text" placeholder="텍스트를 입력하세요" /&gt;',
      usage: '이름, 제목 등 일반 텍스트'
    },
    { 
      type: 'email', 
      description: '이메일 주소 입력',
      code: '&lt;Input type="email" placeholder="이메일을 입력하세요" /&gt;',
      usage: '이메일 주소 입력'
    },
    { 
      type: 'password', 
      description: '비밀번호 입력',
      code: '&lt;Input type="password" placeholder="비밀번호를 입력하세요" /&gt;',
      usage: '비밀번호, 보안 정보'
    },
    { 
      type: 'number', 
      description: '숫자 입력',
      code: '&lt;Input type="number" placeholder="숫자를 입력하세요" /&gt;',
      usage: '나이, 수량, 가격 등'
    },
    { 
      type: 'search', 
      description: '검색어 입력',
      code: '&lt;Input type="search" placeholder="검색어를 입력하세요" /&gt;',
      usage: '검색 기능'
    },
    { 
      type: 'url', 
      description: 'URL 주소 입력',
      code: '&lt;Input type="url" placeholder="URL을 입력하세요" /&gt;',
      usage: '웹사이트 주소'
    }
  ];
  
  const inputStates = [
    { 
      state: 'default', 
      description: '기본 상태',
      code: '&lt;Input placeholder="기본 상태" /&gt;',
      usage: '일반적인 입력 상태'
    },
    { 
      state: 'disabled', 
      description: '비활성화된 상태',
      code: '&lt;Input disabled placeholder="비활성화됨" /&gt;',
      usage: '편집할 수 없는 필드'
    },
    { 
      state: 'invalid', 
      description: '유효하지 않은 상태',
      code: '&lt;Input aria-invalid="true" placeholder="유효하지 않음" /&gt;',
      usage: '검증 실패 시'
    }
  ];
  
  const examples = [
    {
      title: '라벨이 있는 입력',
      description: '접근성을 위한 라벨과 함께 사용',
      code: `&lt;div class="space-y-2"&gt;
  &lt;Label for="username"&gt;사용자명&lt;/Label&gt;
  &lt;Input id="username" type="text" placeholder="사용자명을 입력하세요" /&gt;
&lt;/div&gt;`
    },
    {
      title: '폼 그룹',
      description: '여러 입력 필드를 그룹으로 구성',
      code: `&lt;form class="space-y-4"&gt;
  &lt;div class="space-y-2"&gt;
    &lt;Label for="firstName"&gt;이름&lt;/Label&gt;
    &lt;Input id="firstName" placeholder="이름" /&gt;
  &lt;/div&gt;
  &lt;div class="space-y-2"&gt;
    &lt;Label for="lastName"&gt;성&lt;/Label&gt;
    &lt;Input id="lastName" placeholder="성" /&gt;
  &lt;/div&gt;
  &lt;div class="space-y-2"&gt;
    &lt;Label for="email"&gt;이메일&lt;/Label&gt;
    &lt;Input id="email" type="email" placeholder="이메일 주소" /&gt;
  &lt;/div&gt;
&lt;/form&gt;`
    },
    {
      title: '검증과 함께 사용',
      description: '입력 검증 상태를 표시',
      code: `&lt;div class="space-y-2"&gt;
  &lt;Label for="validatedInput"&gt;검증된 입력&lt;/Label&gt;
  &lt;Input 
    id="validatedInput" 
    aria-invalid="true"
    placeholder="유효하지 않은 입력"
  /&gt;
  &lt;p class="text-sm text-destructive"&gt;올바른 형식으로 입력해주세요.&lt;/p&gt;
&lt;/div&gt;`
    },
    {
      title: '크기 조절',
      description: '다양한 크기의 입력 필드',
      code: `&lt;div class="space-y-3"&gt;
  &lt;Input class="h-8 text-sm" placeholder="작은 크기" /&gt;
  &lt;Input placeholder="기본 크기" /&gt;
  &lt;Input class="h-11 text-lg" placeholder="큰 크기" /&gt;
&lt;/div&gt;`
    }
  ];
</script>

<svelte:head>
  <title>Input - 디자인 시스템</title>
  <meta name="description" content="Input 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Input</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        사용자로부터 데이터를 입력받기 위한 기본 컴포넌트입니다. 
        다양한 입력 타입과 상태를 지원하여 모든 폼 상황에 적합하게 사용할 수 있습니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Input</Badge>
      <Badge variant="outline">Interactive</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 입력 타입과 상태를 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input bind:value={sampleValues.text} placeholder="텍스트 입력" />
            <Input bind:value={sampleValues.email} type="email" placeholder="이메일 주소" />
            <Input bind:value={sampleValues.password} type="password" placeholder="비밀번호" />
            <Input bind:value={sampleValues.number} type="number" placeholder="숫자" />
            <Input bind:value={sampleValues.search} type="search" placeholder="검색어" />
            <Input disabled placeholder="비활성화됨" />
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 입력 타입 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">입력 타입 (Types)</h2>
      <p class="text-muted-foreground">
        용도에 따라 선택할 수 있는 다양한 입력 타입입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {#each inputTypes as inputType}
        <Card>
          <CardHeader class="pb-4">
            <div class="flex items-center justify-between">
              <div>
                <CardTitle class="text-lg capitalize">{inputType.type}</CardTitle>
                <CardDescription class="text-sm">{inputType.description}</CardDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onclick={() => copyCode(inputType.code, inputType.type)}
              >
                {copiedCode === inputType.type ? '✓' : '📋'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <Input type={inputType.type} placeholder={inputType.type === 'password' ? '••••••••' : `${inputType.type} 입력`} />
                <Input type={inputType.type} disabled placeholder="비활성화" />
              </div>
              
              <div class="space-y-2">
                <div class="text-xs text-muted-foreground">사용 예시: {inputType.usage}</div>
                <div class="bg-muted rounded p-3">
                  <code class="text-sm">{inputType.code}</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 입력 상태 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">입력 상태 (States)</h2>
      <p class="text-muted-foreground">
        다양한 상황에서 사용할 수 있는 입력 필드의 상태입니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {#each inputStates as state}
        <Card>
          <CardContent class="pt-6">
            <div class="space-y-4">
              <div>
                <h3 class="font-medium capitalize mb-2">{state.state.replace('-', ' ')}</h3>
                <p class="text-sm text-muted-foreground mb-4">{state.description}</p>
              </div>
              
              <div class="space-y-3">
                <div>
                  {#if state.state === 'default'}
                    <Input placeholder="기본 상태" />
                  {:else if state.state === 'disabled'}
                    <Input disabled placeholder="비활성화됨" />
                  {:else if state.state === 'invalid'}
                    <Input aria-invalid="true" placeholder="유효하지 않음" />
                  {/if}
                </div>
                
                <div class="text-xs text-muted-foreground">{state.usage}</div>
                
                <div class="flex justify-between items-center">
                  <div class="bg-muted rounded p-3 flex-1 mr-2">
                    <code class="text-sm">{state.code}</code>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onclick={() => copyCode(state.code, state.state + '-state')}
                  >
                    {copiedCode === state.state + '-state' ? '✓' : '📋'}
                  </Button>
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
        실제 상황에서 Input을 어떻게 사용하는지 확인해보세요.
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
                  {#if example.title === '라벨이 있는 입력'}
                    <div class="space-y-2">
                      <Label for="username">사용자명</Label>
                      <Input id="username" type="text" placeholder="사용자명을 입력하세요" />
                    </div>
                  {:else if example.title === '폼 그룹'}
                    <div class="space-y-4">
                      <div class="space-y-2">
                        <Label for="firstName">이름</Label>
                        <Input id="firstName" placeholder="이름" />
                      </div>
                      <div class="space-y-2">
                        <Label for="lastName">성</Label>
                        <Input id="lastName" placeholder="성" />
                      </div>
                      <div class="space-y-2">
                        <Label for="email">이메일</Label>
                        <Input id="email" type="email" placeholder="이메일 주소" />
                      </div>
                    </div>
                  {:else if example.title === '검증과 함께 사용'}
                    <div class="space-y-2">
                      <Label for="validatedInput">검증된 입력</Label>
                      <Input 
                        id="validatedInput" 
                        aria-invalid="true"
                        placeholder="유효하지 않은 입력"
                      />
                      <p class="text-sm text-destructive">올바른 형식으로 입력해주세요.</p>
                    </div>
                  {:else if example.title === '크기 조절'}
                    <div class="space-y-3">
                      <Input class="h-8 text-sm" placeholder="작은 크기" />
                      <Input placeholder="기본 크기" />
                      <Input class="h-11 text-lg" placeholder="큰 크기" />
                    </div>
                  {/if}
                </div>
              </div>
              
              <div>
                <h4 class="font-medium text-sm mb-3">코드</h4>
                <div class="bg-muted rounded p-4">
                  <pre class="text-sm overflow-x-auto"><code>{example.code}</code></pre>
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
        Input 컴포넌트에서 사용할 수 있는 모든 속성들입니다.
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
                <td class="py-3 font-mono">type</td>
                <td class="py-3 text-muted-foreground">'text' | 'email' | 'password' | 'number' | 'search' | 'url' | 등</td>
                <td class="py-3 font-mono">'text'</td>
                <td class="py-3">입력 필드의 타입</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">value</td>
                <td class="py-3 text-muted-foreground">string</td>
                <td class="py-3 text-muted-foreground">-</td>
                <td class="py-3">입력 값 (양방향 바인딩)</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">placeholder</td>
                <td class="py-3 text-muted-foreground">string</td>
                <td class="py-3 text-muted-foreground">-</td>
                <td class="py-3">플레이스홀더 텍스트</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">disabled</td>
                <td class="py-3 text-muted-foreground">boolean</td>
                <td class="py-3 font-mono">false</td>
                <td class="py-3">입력 필드 비활성화 여부</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">required</td>
                <td class="py-3 text-muted-foreground">boolean</td>
                <td class="py-3 font-mono">false</td>
                <td class="py-3">필수 입력 여부</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">readonly</td>
                <td class="py-3 text-muted-foreground">boolean</td>
                <td class="py-3 font-mono">false</td>
                <td class="py-3">읽기 전용 여부</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">aria-invalid</td>
                <td class="py-3 text-muted-foreground">boolean</td>
                <td class="py-3 text-muted-foreground">-</td>
                <td class="py-3">유효성 검사 실패 표시</td>
              </tr>
              <tr class="border-b">
                <td class="py-3 font-mono">class</td>
                <td class="py-3 text-muted-foreground">string</td>
                <td class="py-3 text-muted-foreground">-</td>
                <td class="py-3">추가 CSS 클래스</td>
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
        Input 컴포넌트는 웹 접근성 표준을 준수합니다.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle class="text-lg">키보드 지원</CardTitle>
          <CardDescription>키보드만으로도 완전히 조작 가능</CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm">
            <li>• <kbd class="bg-muted px-1.5 py-0.5 rounded">Tab</kbd> - 포커스 이동</li>
            <li>• <kbd class="bg-muted px-1.5 py-0.5 rounded">Shift + Tab</kbd> - 역방향 포커스 이동</li>
            <li>• <kbd class="bg-muted px-1.5 py-0.5 rounded">Enter</kbd> - 폼 제출 (해당되는 경우)</li>
            <li>• <kbd class="bg-muted px-1.5 py-0.5 rounded">Escape</kbd> - 입력 취소</li>
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
            <li>• 적절한 aria 속성 사용</li>
            <li>• 라벨과의 연결 (for/id)</li>
            <li>• 유효성 검사 상태 알림</li>
            <li>• 명확한 플레이스홀더 제공</li>
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
            <Button href="/design-system/components/label" variant="outline">
              Label 컴포넌트
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