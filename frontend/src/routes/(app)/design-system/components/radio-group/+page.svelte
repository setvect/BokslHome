<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  import AccessibilityGuide from '$lib/components/AccessibilityGuide.svelte';
  
  let copiedCode = $state('');
  let selectedOption = $state('option1');
  let selectedSize = $state('medium');
  let selectedTheme = $state('light');
  let selectedPlan = $state('');
  
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
  
  const examples = [
    {
      title: '기본 사용법',
      description: '가장 기본적인 라디오 그룹 사용 방법',
      code: `<` + `script>
  import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
  import { Label } from '$lib/components/ui/label';
  
  let selected = $state('option1');
<` + `/script>

<RadioGroup bind:value={selected}>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option1" id="option1" />
    <Label for="option1">옵션 1</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="option2" id="option2" />
    <Label for="option2">옵션 2</Label>
  </div>
</RadioGroup>`
    },
    {
      title: '세로 배치',
      description: '라디오 버튼을 세로로 배치하는 방법',
      code: `<RadioGroup bind:value={selected} class="space-y-2">
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="small" id="small" />
    <Label for="small">Small</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="medium" id="medium" />
    <Label for="medium">Medium</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="large" id="large" />
    <Label for="large">Large</Label>
  </div>
</RadioGroup>`
    },
    {
      title: '가로 배치',
      description: '라디오 버튼을 가로로 배치하는 방법',
      code: `<RadioGroup bind:value={selected} class="flex space-x-6">
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="light" id="light" />
    <Label for="light">라이트</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="dark" id="dark" />
    <Label for="dark">다크</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="auto" id="auto" />
    <Label for="auto">자동</Label>
  </div>
</RadioGroup>`
    },
    {
      title: '비활성화된 옵션',
      description: '특정 옵션을 비활성화하는 방법',
      code: `<RadioGroup bind:value={selected}>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="free" id="free" />
    <Label for="free">무료 플랜</Label>
  </div>
  <div class="flex items-center space-x-2 opacity-50">
    <RadioGroupItem value="pro" id="pro" disabled />
    <Label for="pro" class="cursor-not-allowed">프로 플랜 (곧 출시)</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroupItem value="enterprise" id="enterprise" />
    <Label for="enterprise">엔터프라이즈</Label>
  </div>
</RadioGroup>`
    }
  ];
  
  const radioGroupProps = [
    {
      name: 'value',
      type: 'string',
      description: '현재 선택된 라디오 버튼의 값입니다.',
      required: false
    },
    {
      name: 'defaultValue',
      type: 'string',
      description: '초기 선택될 라디오 버튼의 값입니다.',
      required: false
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '전체 라디오 그룹을 비활성화합니다.',
      required: false
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: 'false',
      description: '필수 선택 필드로 설정합니다.',
      required: false
    },
    {
      name: 'name',
      type: 'string',
      description: '폼 제출 시 사용될 name 속성입니다.',
      required: false
    },
    {
      name: 'class',
      type: 'string',
      description: '추가 CSS 클래스를 적용합니다.',
      required: false
    }
  ];
  
  const radioItemProps = [
    {
      name: 'value',
      type: 'string',
      description: '라디오 버튼의 값입니다.',
      required: true
    },
    {
      name: 'id',
      type: 'string',
      description: 'Label과 연결하기 위한 고유 식별자입니다.',
      required: true
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '개별 라디오 버튼을 비활성화합니다.',
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
        'Tab 키로 라디오 그룹에 포커스를 이동할 수 있습니다',
        '화살표 키로 라디오 버튼 간 이동할 수 있습니다',
        'Space 키로 라디오 버튼을 선택할 수 있습니다',
        'disabled 상태일 때 포커스를 받지 않습니다'
      ]
    },
    {
      title: '스크린 리더 지원',
      description: '스크린 리더 사용자를 위한 최적화',
      level: 'AA' as const,
      items: [
        '적절한 role="radiogroup"과 role="radio"를 제공합니다',
        'aria-checked 상태를 정확히 전달합니다',
        'Label과 라디오 버튼이 올바르게 연결됩니다',
        '그룹의 목적을 설명하는 범례를 제공할 수 있습니다'
      ]
    },
    {
      title: '시각적 접근성',
      description: '시각 장애가 있는 사용자를 위한 고려사항',
      level: 'AA' as const,
      items: [
        'WCAG AA 기준 4.5:1 대비율을 준수합니다',
        '포커스 시 명확한 표시기를 제공합니다',
        '선택/비선택 상태를 색상 외의 방법으로도 구분합니다',
        '브라우저 확대 시에도 가독성을 유지합니다'
      ]
    },
    {
      title: '운동 장애 지원',
      description: '손목이나 손가락 사용이 어려운 사용자를 위한 배려',
      level: 'A' as const,
      items: [
        '충분한 클릭 영역을 제공합니다 (최소 44x44px)',
        '라벨 클릭으로도 라디오 버튼을 선택할 수 있습니다',
        '드래그나 복잡한 제스처가 필요하지 않습니다',
        '실수로 다른 옵션을 선택하기 어려운 적절한 간격을 유지합니다'
      ]
    }
  ];
</script>

<svelte:head>
  <title>Radio Group - 디자인 시스템</title>
  <meta name="description" content="Radio Group 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Radio Group</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        여러 옵션 중 하나만 선택할 수 있는 라디오 버튼 그룹입니다.
        설정 변경, 플랜 선택, 옵션 선택 등에 사용합니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Single Selection</Badge>
      <Badge variant="outline">Accessible</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 라디오 그룹 스타일을 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-3">기본 라디오 그룹</h4>
              <RadioGroup bind:value={selectedOption} class="space-y-2">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="option1" id="r1" />
                  <Label for="r1">옵션 1</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="option2" id="r2" />
                  <Label for="r2">옵션 2</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="option3" id="r3" />
                  <Label for="r3">옵션 3</Label>
                </div>
              </RadioGroup>
              <p class="text-sm text-muted-foreground mt-2">선택된 값: {selectedOption}</p>
            </div>
            
            <div>
              <h4 class="font-medium mb-3">크기 선택</h4>
              <RadioGroup bind:value={selectedSize} class="space-y-2">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="small" id="s1" />
                  <Label for="s1">Small</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="s2" />
                  <Label for="s2">Medium</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="large" id="s3" />
                  <Label for="s3">Large</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div class="space-y-6">
            <div>
              <h4 class="font-medium mb-3">가로 배치</h4>
              <RadioGroup bind:value={selectedTheme} class="flex space-x-6">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="t1" />
                  <Label for="t1">라이트</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="t2" />
                  <Label for="t2">다크</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="auto" id="t3" />
                  <Label for="t3">자동</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div>
              <h4 class="font-medium mb-3">비활성화 옵션 포함</h4>
              <RadioGroup bind:value={selectedPlan} class="space-y-2">
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="free" id="p1" />
                  <Label for="p1">무료 플랜</Label>
                </div>
                <div class="flex items-center space-x-2 opacity-50">
                  <RadioGroupItem value="pro" id="p2" disabled />
                  <Label for="p2" class="cursor-not-allowed">프로 플랜 (곧 출시)</Label>
                </div>
                <div class="flex items-center space-x-2">
                  <RadioGroupItem value="enterprise" id="p3" />
                  <Label for="p3">엔터프라이즈</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 사용 예시 -->
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">사용 예시</h2>
      <p class="text-muted-foreground">
        실제 상황에서 라디오 그룹을 어떻게 사용하는지 확인해보세요.
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
                    <RadioGroup value="option1">
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="option1" id="ex1-1" />
                        <Label for="ex1-1">옵션 1</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="option2" id="ex1-2" />
                        <Label for="ex1-2">옵션 2</Label>
                      </div>
                    </RadioGroup>
                  {:else if example.title === '세로 배치'}
                    <RadioGroup value="medium" class="space-y-2">
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="small" id="ex2-1" />
                        <Label for="ex2-1">Small</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="ex2-2" />
                        <Label for="ex2-2">Medium</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="large" id="ex2-3" />
                        <Label for="ex2-3">Large</Label>
                      </div>
                    </RadioGroup>
                  {:else if example.title === '가로 배치'}
                    <RadioGroup value="light" class="flex space-x-6">
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="light" id="ex3-1" />
                        <Label for="ex3-1">라이트</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="dark" id="ex3-2" />
                        <Label for="ex3-2">다크</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="auto" id="ex3-3" />
                        <Label for="ex3-3">자동</Label>
                      </div>
                    </RadioGroup>
                  {:else if example.title === '비활성화된 옵션'}
                    <RadioGroup value="free">
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="free" id="ex4-1" />
                        <Label for="ex4-1">무료 플랜</Label>
                      </div>
                      <div class="flex items-center space-x-2 opacity-50">
                        <RadioGroupItem value="pro" id="ex4-2" disabled />
                        <Label for="ex4-2" class="cursor-not-allowed">프로 플랜 (곧 출시)</Label>
                      </div>
                      <div class="flex items-center space-x-2">
                        <RadioGroupItem value="enterprise" id="ex4-3" />
                        <Label for="ex4-3">엔터프라이즈</Label>
                      </div>
                    </RadioGroup>
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
  <section class="mb-16">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">속성 (Props)</h2>
    </div>
    
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4">RadioGroup 속성</h3>
        <PropsTable 
          props={radioGroupProps} 
          description="RadioGroup 컴포넌트에서 사용할 수 있는 속성들입니다."
        />
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4">RadioGroupItem 속성</h3>
        <PropsTable 
          props={radioItemProps} 
          description="RadioGroupItem 컴포넌트에서 사용할 수 있는 속성들입니다."
        />
      </div>
    </div>
  </section>
  
  <!-- 접근성 -->
  <AccessibilityGuide 
    guidelines={accessibilityGuidelines}
    title="접근성 (Accessibility)"
    description="Radio Group 컴포넌트는 WCAG 2.1 접근성 표준을 준수합니다."
  />
  
  <!-- 관련 컴포넌트 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-foreground mb-4">관련 컴포넌트</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/components/checkbox" variant="outline">
              Checkbox 컴포넌트
            </Button>
            <Button href="/design-system/components/select" variant="outline">
              Select 컴포넌트
            </Button>
            <Button href="/design-system/components/label" variant="outline">
              Label 컴포넌트
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</div>