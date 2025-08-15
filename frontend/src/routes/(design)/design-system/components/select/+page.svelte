<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';
  import { Label } from '$lib/components/ui/label';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';

  let selectedValue = $state('');

  const fruitItems = [
    { value: 'apple', label: '사과' },
    { value: 'banana', label: '바나나' },
    { value: 'orange', label: '오렌지' },
    { value: 'grape', label: '포도' }
  ];

  const selectProps = [
    {
      name: 'value',
      type: 'string',
      description: '현재 선택된 값입니다.',
      required: false
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '셀렉트를 비활성화합니다.',
      required: false
    },
    {
      name: 'placeholder',
      type: 'string',
      description: '값이 선택되지 않았을 때 표시할 텍스트입니다.',
      required: false
    }
  ];
</script>

<svelte:head>
  <title>Select - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Select</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        드롭다운으로 옵션을 선택할 수 있는 셀렉트 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Dropdown</Badge>
    </div>
  </section>

  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <Label class="mb-2 block">과일 선택</Label>
              <Select type="single" bind:value={selectedValue}>
                <SelectTrigger>
                  <SelectValue 
                    placeholder="과일을 선택하세요"
                    value={selectedValue ? fruitItems.find(item => item.value === selectedValue)?.label : ''}
                  />
                </SelectTrigger>
                <SelectContent>
                  {#each fruitItems as item}
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  {/each}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label class="mb-2 block">비활성화된 셀렉트</Label>
              <Select type="single" disabled>
                <SelectTrigger>
                  <SelectValue placeholder="선택할 수 없음" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="disabled">비활성화</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label class="mb-2 block">고정 너비 셀렉트 (w-48)</Label>
              <Select type="single">
                <SelectTrigger class="w-48">
                  <SelectValue placeholder="고정 너비 예제" />
                </SelectTrigger>
                <SelectContent>
                  {#each fruitItems as item}
                    <SelectItem value={item.value}>{item.label}</SelectItem>
                  {/each}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <p class="text-sm text-muted-foreground">
              선택된 값: <code class="bg-muted px-1 rounded">{selectedValue || '없음'}</code>
            </p>
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
        <CodeBlock code={`<` + `script>
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '$lib/components/ui/select';

  let selected = $state('');

  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ];
<` + `/script>

<!-- 기본 사용법 -->
<Select type="single" bind:value={selected}>
  <SelectTrigger>
    <SelectValue 
      placeholder="옵션을 선택하세요"
      value={selected ? options.find(opt => opt.value === selected)?.label : ''}
    />
  </SelectTrigger>
  <SelectContent>
    {#each options as option}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}
  </SelectContent>
</Select>

<!-- 너비 고정 -->
<Select type="single">
  <SelectTrigger class="w-48">
    <SelectValue 
      placeholder="고정 너비"
      value={selected ? options.find(opt => opt.value === selected)?.label : ''}
    />
  </SelectTrigger>
  <SelectContent>
    {#each options as option}
      <SelectItem value={option.value}>{option.label}</SelectItem>
    {/each}
  </SelectContent>
</Select>`} language="svelte" />
      </CardContent>
    </Card>
  </section>

  <PropsTable
    props={selectProps}
    title="속성 (Props)"
    description="Select 컴포넌트에서 사용할 수 있는 속성들입니다."
  />
</div>