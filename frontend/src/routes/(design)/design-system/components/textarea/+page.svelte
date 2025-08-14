<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Textarea } from '$lib/components/ui/textarea';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  import AccessibilityGuide from '$lib/components/AccessibilityGuide.svelte';
  
  let copiedCode = $state('');
  let sampleText = $state('');
  let resizableText = $state('');
  let disabledText = $state('샘플 텍스트 (수정 불가)');
  
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
      description: '가장 기본적인 텍스트 영역 사용 방법',
      code: `<` + `script>
  import { Textarea } from '$lib/components/ui/textarea';
  
  let text = $state('');
<` + `/script>

<Textarea 
  bind:value={text} 
  placeholder="여기에 입력하세요..." 
/>`
    },
    {
      title: '플레이스홀더',
      description: '사용자에게 힌트를 제공하는 플레이스홀더',
      code: `<Textarea 
  placeholder="긴 텍스트를 입력해주세요..." 
/>`
    },
    {
      title: '비활성화된 상태',
      description: '편집할 수 없는 읽기 전용 텍스트 영역',
      code: `<Textarea 
  disabled 
  value="편집할 수 없는 텍스트" 
/>`
    },
    {
      title: '크기 조절 제한',
      description: 'CSS로 크기 조절을 제한하는 방법',
      code: `<Textarea 
  class="resize-none" 
  placeholder="크기 조절이 비활성화된 텍스트 영역" 
/>`
    },
    {
      title: '최소/최대 길이',
      description: '입력 텍스트의 길이를 제한',
      code: `<Textarea 
  minlength={10}
  maxlength={200}
  placeholder="10-200자 사이로 입력해주세요" 
/>`
    }
  ];
  
  const textareaProps = [
    {
      name: 'value',
      type: 'string',
      description: '텍스트 영역의 현재 값입니다.',
      required: false
    },
    {
      name: 'placeholder',
      type: 'string',
      description: '사용자에게 표시될 힌트 텍스트입니다.',
      required: false
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '텍스트 영역을 비활성화합니다.',
      required: false
    },
    {
      name: 'readonly',
      type: 'boolean',
      defaultValue: 'false',
      description: '읽기 전용으로 설정합니다.',
      required: false
    },
    {
      name: 'rows',
      type: 'number',
      defaultValue: '3',
      description: '텍스트 영역의 행 수를 설정합니다.',
      required: false
    },
    {
      name: 'cols',
      type: 'number',
      description: '텍스트 영역의 열 수를 설정합니다.',
      required: false
    },
    {
      name: 'minlength',
      type: 'number',
      description: '최소 입력 길이를 제한합니다.',
      required: false
    },
    {
      name: 'maxlength',
      type: 'number',
      description: '최대 입력 길이를 제한합니다.',
      required: false
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: 'false',
      description: '필수 입력 필드로 설정합니다.',
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
        'Tab 키로 텍스트 영역에 포커스를 이동할 수 있습니다',
        '화살표 키로 텍스트 내에서 커서를 이동할 수 있습니다',
        'Ctrl+A로 전체 텍스트를 선택할 수 있습니다',
        'disabled 상태일 때 포커스를 받지 않습니다'
      ]
    },
    {
      title: '스크린 리더 지원',
      description: '스크린 리더 사용자를 위한 최적화',
      level: 'AA' as const,
      items: [
        '적절한 role="textbox"와 multiline 속성을 제공합니다',
        'placeholder 텍스트를 스크린 리더에 전달합니다',
        'required, disabled 상태를 명확히 알립니다',
        'aria-describedby로 관련 설명과 연결할 수 있습니다'
      ]
    },
    {
      title: '시각적 접근성',
      description: '시각 장애가 있는 사용자를 위한 고려사항',
      level: 'AA' as const,
      items: [
        'WCAG AA 기준 4.5:1 대비율을 준수합니다',
        '포커스 시 명확한 테두리 표시를 제공합니다',
        '플레이스홀더와 입력 텍스트 간 충분한 대비를 유지합니다',
        '브라우저 확대 시에도 가독성을 유지합니다'
      ]
    },
    {
      title: '운동 장애 지원',
      description: '손목이나 손가락 사용이 어려운 사용자를 위한 배려',
      level: 'A' as const,
      items: [
        '드래그나 복잡한 제스처가 필요하지 않습니다',
        '충분한 클릭 영역을 제공합니다',
        '실수로 다른 요소를 클릭하기 어려운 적절한 간격을 유지합니다',
        '긴 텍스트 입력에도 타이머나 시간 제한이 없습니다'
      ]
    }
  ];
</script>

<svelte:head>
  <title>Textarea - 디자인 시스템</title>
  <meta name="description" content="Textarea 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Textarea</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        여러 줄의 텍스트를 입력받을 수 있는 폼 컴포넌트입니다. 
        댓글, 메모, 긴 설명 등을 작성할 때 사용합니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Multiline</Badge>
      <Badge variant="outline">Accessible</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 텍스트 영역 상태를 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium mb-2 block">기본 텍스트 영역</label>
              <Textarea bind:value={sampleText} placeholder="여기에 입력하세요..." />
            </div>
            
            <div>
              <label class="text-sm font-medium mb-2 block">크기 조절 가능</label>
              <Textarea bind:value={resizableText} placeholder="모서리를 드래그하여 크기를 조절하세요" class="resize" />
            </div>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium mb-2 block">비활성화됨</label>
              <Textarea disabled bind:value={disabledText} />
            </div>
            
            <div>
              <label class="text-sm font-medium mb-2 block">크기 조절 제한</label>
              <Textarea placeholder="크기 조절이 제한된 텍스트 영역" class="resize-none" />
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
        실제 상황에서 텍스트 영역을 어떻게 사용하는지 확인해보세요.
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
                    <Textarea placeholder="여기에 입력하세요..." />
                  {:else if example.title === '플레이스홀더'}
                    <Textarea placeholder="긴 텍스트를 입력해주세요..." />
                  {:else if example.title === '비활성화된 상태'}
                    <Textarea disabled value="편집할 수 없는 텍스트" />
                  {:else if example.title === '크기 조절 제한'}
                    <Textarea class="resize-none" placeholder="크기 조절이 비활성화된 텍스트 영역" />
                  {:else if example.title === '최소/최대 길이'}
                    <Textarea minlength={10} maxlength={200} placeholder="10-200자 사이로 입력해주세요" />
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
    props={textareaProps} 
    title="속성 (Props)"
    description="Textarea 컴포넌트에서 사용할 수 있는 모든 속성들입니다."
  />
  
  <!-- 접근성 -->
  <AccessibilityGuide 
    guidelines={accessibilityGuidelines}
    title="접근성 (Accessibility)"
    description="Textarea 컴포넌트는 WCAG 2.1 접근성 표준을 준수합니다."
  />
  
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
            <Button href="/design-system/components/label" variant="outline">
              Label 컴포넌트
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