<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Toaster } from '$lib/components/ui/sonner';
  import Button from '$lib/components/ui/button/button.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import { toast } from 'svelte-sonner';
</script>

<svelte:head>
  <title>Toast (Sonner) - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Toast (Sonner)</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        사용자에게 짧은 알림 메시지를 보여주는 토스트 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Notification</Badge>
      <Badge variant="secondary">Temporary</Badge>
    </div>
  </section>
  
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>토스트 예시</CardTitle>
      </CardHeader>
      <CardContent>
        <div class="flex flex-wrap gap-4">
          <Button onclick={() => toast('기본 토스트 메시지')}>            기본 토스트
          </Button>
          
          <Button onclick={() => toast.success('성공적으로 저장되었습니다!')} variant="outline">
            성공 토스트
          </Button>
          
          <Button onclick={() => toast.error('오류가 발생했습니다.')} variant="destructive">
            오류 토스트
          </Button>
          
          <Button onclick={() => toast.info('정보: 새로운 업데이트가 있습니다.')} variant="secondary">
            정보 토스트
          </Button>
          
          <Button onclick={() => toast.warning('경고: 작업을 완료해주세요.')} variant="outline">
            경고 토스트
          </Button>
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
  import { Toaster } from '$lib/components/ui/sonner';
  import { toast } from 'svelte-sonner';
</script>

<!-- 애플리케이션 루트에 추가 -->
<Toaster />

<!-- 토스트 호출 -->
<Button onclick={() => toast('메시지')}>
  토스트 보이기
</Button>

<!-- 다양한 타입 -->
<Button onclick={() => toast.success('성공!')}>성공</Button>
<Button onclick={() => toast.error('오류!')}>오류</Button>
<Button onclick={() => toast.info('정보')}>정보</Button>
<Button onclick={() => toast.warning('경고')}>경고</Button>`} language="svelte" />
      </CardContent>
    </Card>
  </section>
</div>

<!-- Toaster 컴포넌트 -->
<Toaster />