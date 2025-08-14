<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '$lib/components/ui/sheet';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Sheet - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Sheet</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        화면 가장자리에서 슬라이드되어 나오는 패널 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Overlay</Badge>
      <Badge variant="secondary">Slide Panel</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>시트 예시</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">오른쪽 시트</Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>제목</SheetTitle>
                <SheetDescription>
                  시트의 설명입니다.
                </SheetDescription>
              </SheetHeader>
              <div class="mt-4">
                <p>시트의 내용이 여기에 들어갑니다.</p>
              </div>
            </SheetContent>
          </Sheet>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">왼쪽 시트</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>왼쪽 시트</SheetTitle>
                <SheetDescription>
                  왼쪽에서 열리는 시트입니다.
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
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
  import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '$lib/components/ui/sheet';
</script>

<Sheet>
  <SheetTrigger>
    <Button>시트 열기</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>제목</SheetTitle>
      <SheetDescription>
        설명
      </SheetDescription>
    </SheetHeader>
    <!-- 내용 -->
  </SheetContent>
</Sheet>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>