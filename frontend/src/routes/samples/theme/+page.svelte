<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import Button from "$lib/components/ui/button.svelte";
  import { theme } from "$lib/stores/theme";
  import { onMount } from "svelte";

  onMount(() => {
    theme.init();
  });
</script>

<div class="min-h-screen bg-background text-foreground">
  <div class="container mx-auto py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">🎨 Theme</h1>
      <p class="text-muted-foreground">테마 설정 및 다크/라이트 모드 전환</p>
    </div>

    <div class="space-y-8">
      <!-- Theme Controls -->
      <Card.Root>
        <Card.Header>
          <Card.Title>테마 설정</Card.Title>
          <Card.Description>
            라이트, 다크, 시스템 설정 중에서 선택하세요
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="flex gap-4">
            <Button 
              variant="outline"
              on:click={() => theme.setTheme('light')}
            >
              ☀️ 라이트
            </Button>
            <Button 
              variant="outline"
              on:click={() => theme.setTheme('dark')}
            >
              🌙 다크
            </Button>
            <Button 
              variant="outline"
              on:click={() => theme.setTheme('system')}
            >
              💻 시스템
            </Button>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Color Palette -->
      <Card.Root>
        <Card.Header>
          <Card.Title>컬러 팔레트</Card.Title>
          <Card.Description>
            현재 테마의 색상 변수들을 확인할 수 있습니다
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <!-- Background Colors -->
            <div class="space-y-2">
              <div class="h-16 bg-background border rounded-md flex items-center justify-center">
                <span class="text-xs">Background</span>
              </div>
              <div class="h-16 bg-card border rounded-md flex items-center justify-center">
                <span class="text-xs">Card</span>
              </div>
              <div class="h-16 bg-popover border rounded-md flex items-center justify-center">
                <span class="text-xs">Popover</span>
              </div>
            </div>

            <!-- Interactive Colors -->
            <div class="space-y-2">
              <div class="h-16 bg-primary text-primary-foreground rounded-md flex items-center justify-center">
                <span class="text-xs">Primary</span>
              </div>
              <div class="h-16 bg-secondary text-secondary-foreground rounded-md flex items-center justify-center">
                <span class="text-xs">Secondary</span>
              </div>
              <div class="h-16 bg-accent text-accent-foreground rounded-md flex items-center justify-center">
                <span class="text-xs">Accent</span>
              </div>
            </div>

            <!-- Utility Colors -->
            <div class="space-y-2">
              <div class="h-16 bg-muted text-muted-foreground rounded-md flex items-center justify-center">
                <span class="text-xs">Muted</span>
              </div>
              <div class="h-16 bg-destructive text-destructive-foreground rounded-md flex items-center justify-center">
                <span class="text-xs">Destructive</span>
              </div>
              <div class="h-16 border bg-card rounded-md flex items-center justify-center">
                <span class="text-xs">Border</span>
              </div>
            </div>

            <!-- Input & Ring -->
            <div class="space-y-2">
              <div class="h-16 bg-input rounded-md flex items-center justify-center border">
                <span class="text-xs">Input</span>
              </div>
              <div class="h-16 bg-ring rounded-md flex items-center justify-center">
                <span class="text-xs text-white">Ring</span>
              </div>
              <div class="h-16 bg-foreground text-background rounded-md flex items-center justify-center">
                <span class="text-xs">Foreground</span>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Theme Preview -->
      <Card.Root>
        <Card.Header>
          <Card.Title>컴포넌트 미리보기</Card.Title>
          <Card.Description>
            현재 테마에서 각 컴포넌트들이 어떻게 보이는지 확인하세요
          </Card.Description>
        </Card.Header>
        <Card.Content class="space-y-4">
          <!-- Buttons Preview -->
          <div>
            <h4 class="font-medium mb-3">버튼 스타일</h4>
            <div class="flex flex-wrap gap-2">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <!-- Text Styles -->
          <div>
            <h4 class="font-medium mb-3">텍스트 스타일</h4>
            <div class="space-y-2">
              <p class="text-foreground">기본 텍스트 (foreground)</p>
              <p class="text-muted-foreground">보조 텍스트 (muted-foreground)</p>
              <p class="text-accent-foreground">강조 텍스트 (accent-foreground)</p>
            </div>
          </div>

          <!-- Surface Examples -->
          <div>
            <h4 class="font-medium mb-3">배경 스타일</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div class="bg-muted p-4 rounded-md">
                <p class="text-sm">Muted 배경</p>
              </div>
              <div class="bg-accent p-4 rounded-md">
                <p class="text-sm">Accent 배경</p>
              </div>
              <div class="border-2 border-dashed border-border p-4 rounded-md">
                <p class="text-sm">Border 스타일</p>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Current Theme Info -->
      <Card.Root>
        <Card.Header>
          <Card.Title>현재 테마 정보</Card.Title>
        </Card.Header>
        <Card.Content>
          <div class="space-y-2">
            <p><strong>현재 테마:</strong> <span class="capitalize">{$theme}</span></p>
            <p><strong>CSS 클래스:</strong> {$theme === 'light' ? 'light (기본)' : 'dark'}</p>
            <p><strong>저장 위치:</strong> localStorage</p>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  </div>
</div>