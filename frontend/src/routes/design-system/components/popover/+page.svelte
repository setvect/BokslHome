<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Popover - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Popover</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        특정 요소 근처에 나타나는 작은 오버레이 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Overlay</Badge>
      <Badge variant="secondary">Positioned</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>팝오버 예시</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">팝오버 열기</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div class="space-y-2">
                <h4 class="font-medium">팝오버 제목</h4>
                <p class="text-sm text-muted-foreground">
                  여기에 팝오버의 내용을 작성합니다.
                </p>
              </div>
            </PopoverContent>
          </Popover>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button>메뉴</Button>
            </PopoverTrigger>
            <PopoverContent class="w-56">
              <div class="space-y-1">
                <Button variant="ghost" class="w-full justify-start">옵션 1</Button>
                <Button variant="ghost" class="w-full justify-start">옵션 2</Button>
                <Button variant="ghost" class="w-full justify-start">옵션 3</Button>
              </div>
            </PopoverContent>
          </Popover>
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
  import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
</script>

<Popover>
  <PopoverTrigger>
    <Button>팝오버 열기</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>팝오버 내용</p>
  </PopoverContent>
</Popover>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>