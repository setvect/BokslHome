<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$lib/components/ui/tooltip';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Tooltip - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Tooltip</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        요소에 마우스를 올렸을 때 추가 정보를 보여주는 툴팁 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Overlay</Badge>
      <Badge variant="secondary">Hover</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>툴팁 예시</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="outline">툴팁 보기</Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>이것은 툴팁 메시지입니다</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '$lib/components/ui/tooltip';
</script>

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>
      툴팁을 보여줄 요소
    </TooltipTrigger>
    <TooltipContent>
      툴팁 내용
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>