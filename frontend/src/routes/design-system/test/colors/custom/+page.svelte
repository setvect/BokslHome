<script>
  
  // Tailwind가 감지할 수 있도록 모든 커스텀 색상 클래스들을 명시적으로 나열
  const customClasses = [
    'bg-background', 'text-foreground', 'bg-card', 'text-card-foreground',
    'bg-primary', 'text-primary-foreground', 'bg-secondary', 'text-secondary-foreground', 
    'bg-accent', 'text-accent-foreground', 'bg-muted', 'text-muted-foreground',
    'bg-destructive', 'text-destructive-foreground', 'bg-popover', 'text-popover-foreground',
    'border-border', 'bg-input', 'ring-ring'
  ];
</script>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="mb-8">
    <h1 class="text-4xl font-bold mb-4 text-foreground">커스텀 색상 변수 테스트</h1>
    <p class="text-lg text-muted-foreground">
      @theme 지시어로 정의한 커스텀 색상 변수들이 정상적으로 작동하는지 확인하는 페이지입니다.
    </p>
  </div>

  <!-- 기본 색상들 -->
  <div class="space-y-8">
    <!-- Background & Foreground -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Background & Foreground</h2>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 rounded bg-background border-border border">
          <span class="text-foreground">background + foreground</span>
        </div>
        <div class="p-4 rounded bg-card border-border border">
          <span class="text-card-foreground">card + card-foreground</span>
        </div>
      </div>
    </div>

    <!-- Primary Colors -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Primary Colors</h2>
      
      <div class="grid grid-cols-3 gap-4">
        <div class="p-4 rounded bg-primary">
          <span class="text-primary-foreground font-medium">Primary</span>
        </div>
        <div class="p-4 rounded bg-secondary">
          <span class="text-secondary-foreground font-medium">Secondary</span>
        </div>
        <div class="p-4 rounded bg-accent">
          <span class="text-accent-foreground font-medium">Accent</span>
        </div>
      </div>
    </div>

    <!-- Utility Colors -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Utility Colors</h2>
      
      <div class="grid grid-cols-2 gap-4">
        <div class="p-4 rounded bg-muted">
          <span class="text-muted-foreground font-medium">Muted</span>
        </div>
        <div class="p-4 rounded bg-destructive">
          <span class="text-destructive-foreground font-medium">Destructive</span>
        </div>
      </div>
    </div>

    <!-- Border & Input -->
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h2 class="text-2xl font-semibold mb-4 text-gray-800">Interactive Elements</h2>
      
      <div class="space-y-4">
        <div class="p-3 rounded border-2 border-border bg-background">
          <span class="text-foreground">Border 색상 테스트</span>
        </div>
        
        <input 
          type="text" 
          placeholder="Input 색상 테스트"
          class="w-full p-3 rounded bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        
        <div class="p-3 rounded bg-popover border border-border">
          <span class="text-popover-foreground">Popover 색상 테스트</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 네비게이션 -->
  <div class="mt-12 text-center space-x-4">
    <a href="/test-colors" class="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
      기본 색상 테스트로
    </a>
    <a href="/" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      홈으로 돌아가기
    </a>
  </div>
</div>

<!-- 숨겨진 클래스들 - Tailwind가 감지하도록 -->
<div class="hidden">
  {#each customClasses as cls}
    <div class="{cls}"></div>
  {/each}
</div>