<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Progress } from '$lib/components/ui/progress';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  
  let progress1 = $state(33);
  let progress2 = $state(66);
  let progress3 = $state(88);
</script>

<svelte:head>
  <title>Progress - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Progress</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        작업의 진행 상황을 시각적으로 보여주는 진행률 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Feedback</Badge>
      <Badge variant="secondary">Loading</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>진행률 예시</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm">다운로드</span>
              <span class="text-sm">{progress1}%</span>
            </div>
            <Progress value={progress1} />
          </div>
          
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm">업로드</span>
              <span class="text-sm">{progress2}%</span>
            </div>
            <Progress value={progress2} />
          </div>
          
          <div>
            <div class="flex justify-between mb-2">
              <span class="text-sm">설치</span>
              <span class="text-sm">{progress3}%</span>
            </div>
            <Progress value={progress3} />
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
  import { Progress } from '$lib/components/ui/progress';
  
  let value = $state(50);
</script>

<Progress {value} />`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>