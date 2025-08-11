<div class="min-h-screen bg-background text-foreground">
  <div class="container mx-auto py-16">
    <div class="text-center mb-16">
      <h1 class="text-5xl font-bold mb-6">
        Welcome to BokslHome
      </h1>
      <p class="text-xl text-muted-foreground mb-8">
        SvelteKit + shadcn-svelte로 구축된 웹 애플리케이션
      </p>
      <div class="flex justify-center gap-4">
        <a 
          href="/samples" 
          class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          🎨 컴포넌트 샘플 보기
        </a>
        <a 
          href="/about" 
          class="inline-flex items-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
        >
          📋 프로젝트 정보
        </a>
      </div>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
      <!-- Tech Stack -->
      <div class="text-center p-6">
        <div class="text-4xl mb-4">⚡</div>
        <h3 class="text-xl font-semibold mb-2">SvelteKit</h3>
        <p class="text-muted-foreground text-sm">
          현대적이고 빠른 웹 프레임워크
        </p>
      </div>

      <!-- UI Library -->
      <div class="text-center p-6">
        <div class="text-4xl mb-4">🎨</div>
        <h3 class="text-xl font-semibold mb-2">shadcn-svelte</h3>
        <p class="text-muted-foreground text-sm">
          커스터마이징 가능한 UI 컴포넌트
        </p>
      </div>

      <!-- Styling -->
      <div class="text-center p-6">
        <div class="text-4xl mb-4">🎭</div>
        <h3 class="text-xl font-semibold mb-2">Tailwind CSS</h3>
        <p class="text-muted-foreground text-sm">
          유틸리티 우선 CSS 프레임워크
        </p>
      </div>
    </div>
  </div>
</div>
