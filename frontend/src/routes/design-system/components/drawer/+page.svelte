<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '$lib/components/ui/drawer';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Drawer - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Drawer</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        모바일 친화적인 하단 슬라이드 드로어 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Overlay</Badge>
      <Badge variant="secondary">Mobile Friendly</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>드로어 예시</CardTitle>
      </CardHeader>
      <CardContent>
        <Drawer>
          <DrawerTrigger asChild>
            <Button>드로어 열기</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>드로어 제목</DrawerTitle>
              <DrawerDescription>
                드로어의 설명입니다.
              </DrawerDescription>
            </DrawerHeader>
            <div class="p-4">
              <p>드로어의 내용이 여기에 들어갑니다.</p>
            </div>
          </DrawerContent>
        </Drawer>
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
  import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '$lib/components/ui/drawer';
</script>

<Drawer>
  <DrawerTrigger>
    <Button>드로어 열기</Button>
  </DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>제목</DrawerTitle>
      <DrawerDescription>
        설명
      </DrawerDescription>
    </DrawerHeader>
    <!-- 내용 -->
  </DrawerContent>
</Drawer>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>