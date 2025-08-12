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

  <!-- 디자인 시스템 링크 -->
  <div class="mt-8">
    <a href="/design-system" class="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg text-lg">
      📚 디자인 시스템 보러가기
    </a>
  </div>
</div>