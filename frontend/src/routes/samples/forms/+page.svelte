<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";
  import Button from "$lib/components/ui/button.svelte";

  let formData = {
    name: "",
    email: "",
    message: "",
    subscribe: false
  };
</script>

<div class="min-h-screen bg-background text-foreground">
  <div class="container mx-auto py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">📝 Forms</h1>
      <p class="text-muted-foreground">폼 관련 컴포넌트들의 다양한 사용 예제</p>
    </div>

    <div class="grid gap-8">
      <!-- Basic Form Example -->
      <Card.Root>
        <Card.Header>
          <Card.Title>기본 폼 예제</Card.Title>
          <Card.Description>
            Input, Label, Button을 조합한 기본적인 폼 구성
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-4">
          <div class="space-y-2">
            <Label for="name">이름</Label>
            <Input
              id="name"
              placeholder="홍길동"
              bind:value={formData.name}
            />
          </div>
          
          <div class="space-y-2">
            <Label for="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              bind:value={formData.email}
            />
          </div>
          
          <div class="space-y-2">
            <Label for="message">메시지</Label>
            <Input
              id="message"
              placeholder="메시지를 입력하세요"
              bind:value={formData.message}
            />
          </div>
        </Card.Content>
        <Card.Footer class="flex gap-2">
          <Button>제출</Button>
          <Button variant="outline">취소</Button>
        </Card.Footer>
      </Card.Root>

      <!-- Button Variants -->
      <Card.Root>
        <Card.Header>
          <Card.Title>버튼 변형</Card.Title>
          <Card.Description>
            다양한 버튼 스타일과 크기 변형
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="flex flex-wrap gap-4 mb-6">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          
          <div class="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🎨</Button>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Form State Preview -->
      {#if formData.name || formData.email || formData.message}
        <Card.Root>
          <Card.Header>
            <Card.Title>실시간 미리보기</Card.Title>
            <Card.Description>입력된 폼 데이터 실시간 표시</Card.Description>
          </Card.Header>
          <Card.Content>
            <div class="bg-muted p-4 rounded-md space-y-2">
              {#if formData.name}
                <p><strong>이름:</strong> {formData.name}</p>
              {/if}
              {#if formData.email}
                <p><strong>이메일:</strong> {formData.email}</p>
              {/if}
              {#if formData.message}
                <p><strong>메시지:</strong> {formData.message}</p>
              {/if}
            </div>
          </Card.Content>
        </Card.Root>
      {/if}
    </div>
  </div>
</div>