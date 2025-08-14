<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Badge } from '$lib/components/ui/badge';
  
  let clickCount = 0;
  let loadingStates = {
    default: false,
    secondary: false,
    destructive: false
  };
  
  function handleClick(variant: string) {
    clickCount++;
    alert(`${variant} 버튼이 클릭되었습니다! (총 ${clickCount}회)`);
  }
  
  async function handleAsyncAction(variant: 'default' | 'secondary' | 'destructive') {
    loadingStates[variant] = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    loadingStates[variant] = false;
    alert(`${variant} 비동기 작업 완료!`);
  }
</script>

<svelte:head>
  <title>Button 컴포넌트 테스트 - 디자인 시스템</title>
</svelte:head>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-6xl mx-auto">
    <!-- 헤더 -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4 text-foreground">Button 컴포넌트 테스트</h1>
      <p class="text-lg text-muted-foreground">
        Button 컴포넌트의 모든 variant, 크기, 상태를 종합적으로 테스트하는 페이지입니다.
      </p>
      <div class="mt-4 flex gap-2">
        <Badge>총 클릭: {clickCount}</Badge>
        <Badge variant="secondary">테마 변경으로 색상 확인 가능</Badge>
      </div>
    </div>
    
    <!-- 필수 클래스 명시 -->
    <div class="hidden">
      <div class="cursor-pointer cursor-not-allowed disabled:cursor-not-allowed opacity-50 hover:opacity-75"></div>
      <div class="hover:bg-primary/90 hover:bg-secondary/80 hover:bg-destructive/90 hover:bg-accent hover:text-accent-foreground"></div>
      <div class="animate-spin border-2 border-current border-t-transparent rounded-full"></div>
    </div>
    
    <!-- 기본 Variant 테스트 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">기본 Variant</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">Default</h3>
          <div class="space-y-3">
            <Button variant="default" onclick={() => handleClick('Default')}>
              클릭해보세요
            </Button>
            <Button variant="default" disabled>
              비활성화됨
            </Button>
            <Button variant="default" class="w-full">
              전체 너비
            </Button>
          </div>
        </div>
        
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">Secondary</h3>
          <div class="space-y-3">
            <Button variant="secondary" onclick={() => handleClick('Secondary')}>
              클릭해보세요
            </Button>
            <Button variant="secondary" disabled>
              비활성화됨
            </Button>
            <Button variant="secondary" class="w-full">
              전체 너비
            </Button>
          </div>
        </div>
        
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">Destructive</h3>
          <div class="space-y-3">
            <Button variant="destructive" onclick={() => handleClick('Destructive')}>
              삭제하기
            </Button>
            <Button variant="destructive" disabled>
              비활성화됨
            </Button>
            <Button variant="destructive" class="w-full">
              전체 너비
            </Button>
          </div>
        </div>
        
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">Outline</h3>
          <div class="space-y-3">
            <Button variant="outline" onclick={() => handleClick('Outline')}>
              외곽선 버튼
            </Button>
            <Button variant="outline" disabled>
              비활성화됨
            </Button>
            <Button variant="outline" class="w-full">
              전체 너비
            </Button>
          </div>
        </div>
        
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">Ghost</h3>
          <div class="space-y-3">
            <Button variant="ghost" onclick={() => handleClick('Ghost')}>
              투명 버튼
            </Button>
            <Button variant="ghost" disabled>
              비활성화됨
            </Button>
            <Button variant="ghost" class="w-full">
              전체 너비
            </Button>
          </div>
        </div>
        
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">Link</h3>
          <div class="space-y-3">
            <Button variant="link" onclick={() => handleClick('Link')}>
              링크 스타일
            </Button>
            <Button variant="link" disabled>
              비활성화됨
            </Button>
            <Button variant="link" class="w-full">
              전체 너비
            </Button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 크기 테스트 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">크기 Variant</h2>
      <div class="bg-card rounded-lg border p-6">
        <div class="space-y-6">
          <div>
            <h3 class="text-lg font-medium mb-3 text-card-foreground">Small (sm)</h3>
            <div class="flex flex-wrap gap-3">
              <Button size="sm" variant="default">Small Default</Button>
              <Button size="sm" variant="secondary">Small Secondary</Button>
              <Button size="sm" variant="outline">Small Outline</Button>
              <Button size="sm" variant="ghost">Small Ghost</Button>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-3 text-card-foreground">Default</h3>
            <div class="flex flex-wrap gap-3">
              <Button size="default" variant="default">Default Default</Button>
              <Button size="default" variant="secondary">Default Secondary</Button>
              <Button size="default" variant="outline">Default Outline</Button>
              <Button size="default" variant="ghost">Default Ghost</Button>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-3 text-card-foreground">Large (lg)</h3>
            <div class="flex flex-wrap gap-3">
              <Button size="lg" variant="default">Large Default</Button>
              <Button size="lg" variant="secondary">Large Secondary</Button>
              <Button size="lg" variant="outline">Large Outline</Button>
              <Button size="lg" variant="ghost">Large Ghost</Button>
            </div>
          </div>
          
          <div>
            <h3 class="text-lg font-medium mb-3 text-card-foreground">Icon</h3>
            <div class="flex flex-wrap gap-3">
              <Button size="icon" variant="default">🏠</Button>
              <Button size="icon" variant="secondary">⚙️</Button>
              <Button size="icon" variant="outline">❤️</Button>
              <Button size="icon" variant="ghost">🔍</Button>
              <Button size="icon" variant="destructive">🗑️</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 링크 버튼 테스트 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">링크 버튼 (href)</h2>
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground mb-4">href prop을 사용하면 &lt;a&gt; 태그로 렌더링됩니다.</p>
        <div class="space-y-3">
          <div class="flex flex-wrap gap-3">
            <Button href="/" variant="default">홈으로 가기</Button>
            <Button href="/design-system/test/components" variant="secondary">컴포넌트 테스트</Button>
            <Button href="/design-system/test/colors" variant="outline">색상 테스트</Button>
            <Button href="https://svelte.dev" variant="link" target="_blank">
              외부 링크 (새 창)
            </Button>
          </div>
          
          <div class="flex flex-wrap gap-3">
            <Button href="/disabled-link" variant="default" disabled>
              비활성화된 링크
            </Button>
            <Button href="/should-not-work" variant="secondary" disabled>
              작동하지 않는 링크
            </Button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 로딩 상태 시뮬레이션 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">로딩 상태 시뮬레이션</h2>
      <div class="bg-card rounded-lg border p-6">
        <p class="text-muted-foreground mb-4">버튼 클릭 시 2초간 로딩 상태를 시뮬레이션합니다.</p>
        <div class="space-y-3">
          <div class="flex flex-wrap gap-3">
            <Button 
              variant="default" 
              disabled={loadingStates.default}
              onclick={() => handleAsyncAction('default')}
            >
              {#if loadingStates.default}
                <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                로딩 중...
              {:else}
                비동기 작업 실행
              {/if}
            </Button>
            
            <Button 
              variant="secondary" 
              disabled={loadingStates.secondary}
              onclick={() => handleAsyncAction('secondary')}
            >
              {#if loadingStates.secondary}
                <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                처리중...
              {:else}
                데이터 저장
              {/if}
            </Button>
            
            <Button 
              variant="destructive" 
              disabled={loadingStates.destructive}
              onclick={() => handleAsyncAction('destructive')}
            >
              {#if loadingStates.destructive}
                <span class="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></span>
                삭제중...
              {:else}
                항목 삭제
              {/if}
            </Button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 실용적인 사용 예시 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">실용적 사용 예시</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- 폼 버튼 그룹 -->
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">폼 액션 버튼</h3>
          <div class="space-y-4">
            <div class="flex gap-2">
              <Button variant="default" size="sm">저장</Button>
              <Button variant="outline" size="sm">취소</Button>
            </div>
            <div class="flex gap-2">
              <Button variant="default">제출하기</Button>
              <Button variant="secondary">임시저장</Button>
              <Button variant="outline">초기화</Button>
            </div>
            <div class="flex gap-2">
              <Button variant="destructive" size="sm">삭제</Button>
              <Button variant="ghost" size="sm">되돌리기</Button>
            </div>
          </div>
        </div>
        
        <!-- 네비게이션 버튼 -->
        <div class="bg-card rounded-lg border p-6">
          <h3 class="text-xl font-medium mb-4 text-card-foreground">네비게이션</h3>
          <div class="space-y-4">
            <div class="flex gap-2">
              <Button variant="outline" size="sm">← 이전</Button>
              <Button variant="default" size="sm">다음 →</Button>
            </div>
            <div class="flex gap-2">
              <Button variant="ghost" size="icon">🏠</Button>
              <Button variant="ghost" size="icon">📝</Button>
              <Button variant="ghost" size="icon">⚙️</Button>
              <Button variant="ghost" size="icon">👤</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4 pt-8 border-t">
      <Button href="/design-system/test/components" variant="secondary">
        ← 전체 컴포넌트 테스트
      </Button>
      <Button href="/design-system/test/components/card" variant="outline">
        Card 테스트 →
      </Button>
    </div>
  </div>
</div>