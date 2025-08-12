<script>
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="flex justify-between items-start mb-8">
    <div>
      <h1 class="text-4xl font-bold text-primary">Welcome to SvelteKit</h1>
      <p class="text-lg text-muted-foreground mt-4">Visit <a href="https://kit.svelte.dev" class="text-primary underline">kit.svelte.dev</a> to read the documentation</p>
    </div>
    
    <!-- 테마 토글 -->
    <ThemeToggle />
  </div>

  <!-- Tailwind 테스트용 -->
  <div class="mt-8 p-6 bg-red-500 text-white rounded-lg">
    <h2 class="text-2xl font-semibold">Tailwind CSS v4.1 테스트</h2>
    <p class="mt-2">이 박스가 빨간 배경색으로 표시되면 Tailwind가 정상 작동합니다!</p>
  </div>

  <!-- 색상 테스트 페이지 링크 -->
  <div class="mt-8 space-y-4">
    <div class="space-x-4">
      <a href="/test-colors" class="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
        🎨 Tailwind 색상 팔레트 테스트
      </a>
      <a href="/test-colors/custom" class="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
        🎭 커스텀 색상 변수 테스트
      </a>
    </div>
    
    <div class="space-x-4">
      <a href="/test-theme" class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
        🔍 테마 시스템 검증 페이지
      </a>
      <a href="/test-components" class="inline-flex items-center px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium">
        🧩 shadcn-svelte 컴포넌트 테스트
      </a>
    </div>
  </div>
</div>