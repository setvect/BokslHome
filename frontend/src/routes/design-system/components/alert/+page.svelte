<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Alert - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Alert</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        사용자에게 중요한 정보를 전달하는 알림 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Feedback</Badge>
      <Badge variant="secondary">Status</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>다양한 알림 타입</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <Alert>
            <AlertTitle>기본 알림</AlertTitle>
            <AlertDescription>이것은 기본 알림 메시지입니다.</AlertDescription>
          </Alert>
          
          <Alert variant="destructive">
            <AlertTitle>오류 발생</AlertTitle>
            <AlertDescription>문제가 발생했습니다. 다시 시도해주세요.</AlertDescription>
          </Alert>
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
  import { Alert, AlertDescription, AlertTitle } from '$lib/components/ui/alert';
</script>

<Alert>
  <AlertTitle>알림 제목</AlertTitle>
  <AlertDescription>
    여기에 알림 내용을 작성합니다.
  </AlertDescription>
</Alert>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>