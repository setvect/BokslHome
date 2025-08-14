<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Switch } from '$lib/components/ui/switch';
  import { Label } from '$lib/components/ui/label';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  
  let notifications = $state(false);
  let darkMode = $state(true);
  let autoSave = $state(false);
  
  const switchProps = [
    {
      name: 'checked',
      type: 'boolean',
      description: '스위치의 현재 상태입니다.',
      required: false
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: '스위치를 비활성화합니다.',
      required: false
    },
    {
      name: 'id',
      type: 'string',
      description: 'Label과 연결하기 위한 고유 식별자입니다.',
      required: false
    }
  ];
</script>

<svelte:head>
  <title>Switch - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Switch</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        켜기/끄기 상태를 제어할 수 있는 토글 스위치 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Form</Badge>
      <Badge variant="secondary">Toggle</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>빠른 미리보기</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label for="notifications">알림 받기</Label>
              <div class="text-sm text-muted-foreground">새로운 메시지 알림을 받습니다</div>
            </div>
            <Switch bind:checked={notifications} id="notifications" />
          </div>
          
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label for="dark-mode">다크 모드</Label>
              <div class="text-sm text-muted-foreground">어두운 테마를 사용합니다</div>
            </div>
            <Switch bind:checked={darkMode} id="dark-mode" />
          </div>
          
          <div class="flex items-center justify-between">
            <div class="space-y-0.5">
              <Label for="auto-save">자동 저장</Label>
              <div class="text-sm text-muted-foreground">변경사항을 자동으로 저장합니다</div>
            </div>
            <Switch bind:checked={autoSave} id="auto-save" />
          </div>
          
          <div class="flex items-center justify-between opacity-50">
            <div class="space-y-0.5">
              <Label for="disabled">비활성화됨</Label>
              <div class="text-sm text-muted-foreground">사용할 수 없는 기능</div>
            </div>
            <Switch disabled id="disabled" />
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
  import { Switch } from '$lib/components/ui/switch';
  import { Label } from '$lib/components/ui/label';
  
  let enabled = $state(false);
</script>

<div class="flex items-center space-x-2">
  <Switch bind:checked={enabled} id="feature" />
  <Label for="feature">기능 활성화</Label>
</div>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
  
  <PropsTable 
    props={switchProps} 
    title="속성 (Props)"
    description="Switch 컴포넌트에서 사용할 수 있는 속성들입니다."
  />
</div>