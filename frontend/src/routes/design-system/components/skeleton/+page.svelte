<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Skeleton } from '$lib/components/ui/skeleton';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Skeleton - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Skeleton</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        콘텐츠가 로딩되는 동안 표시되는 스켈레톤 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Loading</Badge>
      <Badge variant="secondary">Placeholder</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>스켈레톤 예시</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-6">
          <div class="flex items-center space-x-4">
            <Skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </div>
          
          <div class="space-y-2">
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-3/4" />
          </div>
          
          <div class="grid grid-cols-3 gap-4">
            <Skeleton class="h-24 w-full" />
            <Skeleton class="h-24 w-full" />
            <Skeleton class="h-24 w-full" />
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
  import { Skeleton } from '$lib/components/ui/skeleton';
</script>

<div class="space-y-2">
  <Skeleton class="h-4 w-full" />
  <Skeleton class="h-4 w-3/4" />
  <Skeleton class="h-4 w-1/2" />
</div>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>