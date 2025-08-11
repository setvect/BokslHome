<script>
  // SvelteKit에서 자동으로 전달하는 모든 props를 무시
  $: void $$restProps;
</script>

<div class="min-h-screen bg-background text-foreground">
  <div class="container mx-auto py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">📊 Data Display</h1>
      <p class="text-muted-foreground">데이터 표시 관련 컴포넌트들 (개발 예정)</p>
    </div>
    
    <div class="bg-muted p-8 rounded-lg text-center">
      <h2 class="text-xl font-semibold mb-2">🚧 개발 중</h2>
      <p class="text-muted-foreground">
        Table, Badge, Avatar 등의 데이터 표시 컴포넌트들이 곧 추가될 예정입니다.
      </p>
    </div>
  </div>
</div>