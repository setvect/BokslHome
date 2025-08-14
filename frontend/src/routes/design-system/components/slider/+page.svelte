<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Slider } from '$lib/components/ui/slider';
  import { Label } from '$lib/components/ui/label';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  
  let volume = $state([50]);
  let brightness = $state([75]);
  let range = $state([20, 80]);
  
  const sliderProps = [
    {
      name: 'value',
      type: 'number[]',
      description: '슬라이더의 현재 값 배열입니다.',
      required: false
    },
    {
      name: 'min',
      type: 'number',
      defaultValue: '0',
      description: '최소값을 설정합니다.',
      required: false
    },
    {
      name: 'max',
      type: 'number',
      defaultValue: '100',
      description: '최대값을 설정합니다.',
      required: false
    },
    {
      name: 'step',
      type: 'number',
      defaultValue: '1',
      description: '값의 증감 단위를 설정합니다.',
      required: false
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '슬라이더를 비활성화합니다.',
      required: false
    }
  ];
</script>

<svelte:head>
  <title>Slider - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Slider</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        범위 내에서 값을 선택할 수 있는 슬라이더 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Range Input</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-8">
          <div>
            <div class="flex items-center justify-between mb-4">
              <Label>볼륨</Label>
              <span class="text-sm text-muted-foreground">{volume[0]}%</span>
            </div>
            <Slider bind:value={volume} max={100} step={1} />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-4">
              <Label>밝기</Label>
              <span class="text-sm text-muted-foreground">{brightness[0]}%</span>
            </div>
            <Slider bind:value={brightness} max={100} step={5} />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-4">
              <Label>가격 범위</Label>
              <span class="text-sm text-muted-foreground">${range[0]} - ${range[1]}</span>
            </div>
            <Slider bind:value={range} max={100} step={1} />
          </div>
          
          <div>
            <div class="flex items-center justify-between mb-4">
              <Label>비활성화됨</Label>
              <span class="text-sm text-muted-foreground">30%</span>
            </div>
            <Slider value={[30]} disabled />
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
  import { Slider } from '$lib/components/ui/slider';
  
  let value = $state([50]);
</script>

<div class="space-y-4">
  <div class="flex items-center justify-between">
    <Label>값: {value[0]}</Label>
  </div>
  <Slider bind:value min={0} max={100} step={1} />
</div>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
  
  <PropsTable 
    props={sliderProps} 
    title="속성 (Props)"
    description="Slider 컴포넌트에서 사용할 수 있는 속성들입니다."
  />
</div>