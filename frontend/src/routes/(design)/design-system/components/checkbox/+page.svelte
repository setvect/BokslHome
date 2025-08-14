<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  
  let copiedCode = $state('');
  let checked1 = $state(false);
  let checked2 = $state(true);
  let indeterminate = $state('indeterminate');
  
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
  
  const checkboxProps = [
    {
      name: 'checked',
      type: 'boolean | "indeterminate"',
      description: '체크박스의 상태입니다.',
      required: false
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '체크박스를 비활성화합니다.',
      required: false
    },
    {
      name: 'id',
      type: 'string',
      description: 'Label과 연결하기 위한 고유 식별자입니다.',
      required: false
    },
    {
      name: 'class',
      type: 'string',
      description: '추가 CSS 클래스를 적용합니다.',
      required: false
    }
  ];
</script>

<svelte:head>
  <title>Checkbox - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Checkbox</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        다중 선택이 가능한 체크박스 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Multi Selection</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
            <Checkbox bind:checked={checked1} id="c1" />
            <Label for="c1">기본 체크박스</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox bind:checked={checked2} id="c2" />
            <Label for="c2">체크된 상태</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox checked={indeterminate} id="c3" />
            <Label for="c3">중간 상태</Label>
          </div>
          <div class="flex items-center space-x-2">
            <Checkbox disabled id="c4" />
            <Label for="c4">비활성화</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>

  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>기본 사용법</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock code={`<script>
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Label } from '$lib/components/ui/label';
  
  let checked = $state(false);
</script>

<div class="flex items-center space-x-2">
  <Checkbox bind:checked id="terms" />
  <Label for="terms">약관에 동의합니다</Label>
</div>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
  
  <PropsTable 
    props={checkboxProps} 
    title="속성 (Props)"
    description="Checkbox 컴포넌트에서 사용할 수 있는 속성들입니다."
  />
</div>