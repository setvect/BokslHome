<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
</script>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-4xl mx-auto">
    <!-- 헤더 -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-4 text-foreground">shadcn-svelte 컴포넌트 테스트</h1>
        <p class="text-lg text-muted-foreground">
          shadcn-svelte 컴포넌트가 커스텀 색상 변수와 올바르게 연동되는지 확인하는 페이지입니다.
        </p>
      </div>
      
      <ThemeToggle />
    </div>
    
    <!-- Button 컴포넌트 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">Button 컴포넌트 테스트</h2>
      
      <!-- 기본 변형들 -->
      <div class="space-y-6">
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-foreground">버튼 변형 (Variants)</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="default">
              Default Button
            </Button>
            
            <Button variant="secondary">
              Secondary Button
            </Button>
            
            <Button variant="destructive">
              Destructive Button
            </Button>
            
            <Button variant="outline">
              Outline Button
            </Button>
            
            <Button variant="ghost">
              Ghost Button
            </Button>
            
            <Button variant="link">
              Link Button
            </Button>
          </div>
        </div>
        
        <!-- 크기 변형들 -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-foreground">버튼 크기 (Sizes)</h3>
          <div class="flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🎨</Button>
          </div>
        </div>
        
        <!-- 상태 테스트 -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-foreground">버튼 상태</h3>
          <div class="flex gap-3">
            <Button variant="default">Normal</Button>
            <Button variant="default" disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 색상 연동 확인 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">테마별 색상 연동 확인</h2>
      
      <div class="space-y-4">
        <p class="text-muted-foreground">
          테마를 전환하여 각 버튼의 색상이 올바르게 변경되는지 확인하세요:
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h3 class="text-base font-medium text-foreground">Primary Colors</h3>
            <div class="space-y-2">
              <Button variant="default" class="w-full">
                Primary (bg-primary + text-primary-foreground)
              </Button>
              <Button variant="secondary" class="w-full">
                Secondary (bg-secondary + text-secondary-foreground)
              </Button>
            </div>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-base font-medium text-foreground">Interactive Colors</h3>
            <div class="space-y-2">
              <Button variant="outline" class="w-full">
                Outline (bg-background + hover:bg-accent)
              </Button>
              <Button variant="destructive" class="w-full">
                Destructive (bg-destructive + text-white)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4">
      <Button href="/" variant="secondary">
        홈으로 돌아가기
      </Button>
      <Button href="/test-colors/custom" variant="outline">
        커스텀 색상 테스트
      </Button>
      <Button href="/test-theme" variant="ghost">
        테마 검증 페이지
      </Button>
    </div>
  </div>
</div>