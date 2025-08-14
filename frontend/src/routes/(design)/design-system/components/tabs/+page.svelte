<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Tabs - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Tabs</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        관련된 콘텐츠를 탭으로 구분하여 표시하는 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Navigation</Badge>
      <Badge variant="secondary">Content Organization</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>기본 탭</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value="account" class="w-full">
          <TabsList class="grid w-full grid-cols-3">
            <TabsTrigger value="account">계정</TabsTrigger>
            <TabsTrigger value="password">비밀번호</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>
          <TabsContent value="account" class="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>계정 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <p>계정 관련 설정을 여기서 관리할 수 있습니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password" class="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
              </CardHeader>
              <CardContent>
                <p>비밀번호를 안전하게 변경할 수 있습니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" class="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>일반 설정</CardTitle>
              </CardHeader>
              <CardContent>
                <p>애플리케이션의 일반적인 설정을 관리합니다.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
</script>

<Tabs value="tab1">
  <TabsList>
    <TabsTrigger value="tab1">탭 1</TabsTrigger>
    <TabsTrigger value="tab2">탭 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    첫 번째 탭의 내용
  </TabsContent>
  <TabsContent value="tab2">
    두 번째 탭의 내용
  </TabsContent>
</Tabs>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>