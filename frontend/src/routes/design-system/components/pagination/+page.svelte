<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Pagination } from '$lib/components/ui/pagination';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  import AccessibilityGuide from '$lib/components/AccessibilityGuide.svelte';
  
  let copiedCode = $state('');
  let currentPage1 = $state(1);
  let currentPage2 = $state(5);
  let currentPage3 = $state(1);
  
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
      description: '가장 기본적인 페이지네이션 사용 방법',
      code: `<` + `script>
  import { Pagination } from '$lib/components/ui/pagination';
  
  let currentPage = $state(1);
  const totalPages = 10;
  
  function handlePageChange(page: number) {
    currentPage = page;
    console.log('페이지 변경:', page);
  }
<` + `/script>

<Pagination 
  bind:currentPage 
  {totalPages} 
  onPageChange={handlePageChange} 
/>`
    },
    {
      title: '많은 페이지',
      description: '페이지 수가 많을 때 생략 표시(...) 사용',
      code: `<Pagination 
  bind:currentPage 
  totalPages={100} 
  maxVisible={7}
/>`
    },
    {
      title: '이전/다음 버튼 숨김',
      description: '이전/다음 버튼을 숨기고 페이지 번호만 표시',
      code: `<Pagination 
  bind:currentPage 
  totalPages={5} 
  showPrevNext={false}
/>`
    },
    {
      title: '커스텀 스타일',
      description: '사용자 정의 클래스로 스타일 조정',
      code: `<Pagination 
  bind:currentPage 
  totalPages={10} 
  class="border-t pt-4"
/>`
    }
  ];
  
  const paginationProps = [
    {
      name: 'totalPages',
      type: 'number',
      description: '전체 페이지 수입니다.',
      required: true
    },
    {
      name: 'currentPage',
      type: 'number',
      defaultValue: '1',
      description: '현재 페이지 번호입니다. bind:currentPage로 바인딩할 수 있습니다.',
      required: false
    },
    {
      name: 'onPageChange',
      type: '(page: number) => void',
      description: '페이지가 변경될 때 호출되는 콜백 함수입니다.',
      required: false
    },
    {
      name: 'showPrevNext',
      type: 'boolean',
      defaultValue: 'true',
      description: '이전/다음 버튼 표시 여부입니다.',
      required: false
    },
    {
      name: 'maxVisible',
      type: 'number',
      defaultValue: '7',
      description: '한 번에 표시할 최대 페이지 수입니다.',
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
        'Tab 키로 페이지네이션 버튼들에 포커스를 이동할 수 있습니다',
        'Enter 키 또는 Space 키로 페이지를 변경할 수 있습니다',
        '비활성화된 버튼은 포커스를 받지 않습니다',
        '포커스 시 명확한 시각적 표시기를 제공합니다'
      ]
    },
    {
      title: '스크린 리더 지원',
      description: '스크린 리더 사용자를 위한 최적화',
      level: 'AA' as const,
      items: [
        '적절한 aria-label로 페이지네이션임을 알립니다',
        '현재 페이지 상태를 스크린 리더에 전달합니다',
        '비활성화된 버튼의 상태를 명확히 알립니다',
        '생략 표시(...)의 의미를 screen reader에게 설명합니다'
      ]
    },
    {
      title: '시각적 접근성',
      description: '시각 장애가 있는 사용자를 위한 고려사항',
      level: 'AA' as const,
      items: [
        'WCAG AA 기준 4.5:1 대비율을 준수합니다',
        '현재 페이지를 색상과 텍스트로 구분합니다',
        '충분한 크기의 클릭 영역을 제공합니다',
        '브라우저 확대 시에도 가독성을 유지합니다'
      ]
    },
    {
      title: '운동 장애 지원',
      description: '손목이나 손가락 사용이 어려운 사용자를 위한 배려',
      level: 'A' as const,
      items: [
        '충분한 클릭 영역을 제공합니다 (최소 44x44px)',
        '버튼 간 적절한 간격을 유지합니다',
        '드래그나 복잡한 제스처가 필요하지 않습니다',
        '실수로 다른 페이지를 클릭하기 어려운 적절한 간격을 유지합니다'
      ]
    }
  ];
</script>

<svelte:head>
  <title>Pagination - 디자인 시스템</title>
  <meta name="description" content="Pagination 컴포넌트 사용법과 예시" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Pagination</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        여러 페이지로 분할된 콘텐츠를 탐색할 수 있는 페이지네이션 컴포넌트입니다.
        목록, 검색 결과, 테이블 등에서 사용합니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>Navigation</Badge>
      <Badge variant="secondary">Page Control</Badge>
      <Badge variant="outline">Accessible</Badge>
    </div>
  </section>
  
  <!-- 빠른 미리보기 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
        <CardDescription>다양한 페이지네이션 스타일을 한눈에 확인해보세요</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-8">
          <div>
            <h4 class="font-medium mb-3">기본 페이지네이션 (10페이지)</h4>
            <Pagination bind:currentPage={currentPage1} totalPages={10} />
            <p class="text-sm text-muted-foreground mt-2">현재 페이지: {currentPage1}</p>
          </div>
          
          <div>
            <h4 class="font-medium mb-3">많은 페이지 (100페이지, 생략 표시 포함)</h4>
            <Pagination bind:currentPage={currentPage2} totalPages={100} />
            <p class="text-sm text-muted-foreground mt-2">현재 페이지: {currentPage2}</p>
          </div>
          
          <div>
            <h4 class="font-medium mb-3">이전/다음 버튼 없음</h4>
            <Pagination bind:currentPage={currentPage3} totalPages={5} showPrevNext={false} />
            <p class="text-sm text-muted-foreground mt-2">현재 페이지: {currentPage3}</p>
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
        실제 상황에서 페이지네이션을 어떻게 사용하는지 확인해보세요.
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
                    <Pagination totalPages={10} />
                  {:else if example.title === '많은 페이지'}
                    <Pagination currentPage={25} totalPages={100} maxVisible={7} />
                  {:else if example.title === '이전/다음 버튼 숨김'}
                    <Pagination totalPages={5} showPrevNext={false} />
                  {:else if example.title === '커스텀 스타일'}
                    <Pagination totalPages={10} class="border-t pt-4" />
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
    props={paginationProps} 
    title="속성 (Props)"
    description="Pagination 컴포넌트에서 사용할 수 있는 모든 속성들입니다."
  />
  
  <!-- 접근성 -->
  <AccessibilityGuide 
    guidelines={accessibilityGuidelines}
    title="접근성 (Accessibility)"
    description="Pagination 컴포넌트는 WCAG 2.1 접근성 표준을 준수합니다."
  />
  
  <!-- 관련 컴포넌트 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-lg font-semibold text-foreground mb-4">관련 컴포넌트</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/components/table" variant="outline">
              Table 컴포넌트
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