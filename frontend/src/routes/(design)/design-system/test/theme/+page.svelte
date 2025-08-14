<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { onMount } from 'svelte';
  
  interface TestResult {
    variable: string;
    value: string;
    isSet: boolean;
    isDark: boolean;
  }
  
  let testResults: TestResult[] = [];
  
  // 테마 검증 함수
  function checkThemeVariables() {
    if (typeof window === 'undefined') return;
    
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    
    const variables = [
      'background', 'foreground', 'primary', 'primary-foreground',
      'secondary', 'secondary-foreground', 'muted', 'muted-foreground',
      'accent', 'accent-foreground', 'destructive', 'destructive-foreground',
      'card', 'card-foreground', 'popover', 'popover-foreground',
      'border', 'input', 'ring'
    ];
    
    const results = variables.map(variable => {
      const value = computedStyle.getPropertyValue(`--${variable}`).trim();
      return {
        variable: `--${variable}`,
        value: value,
        isSet: !!value,
        isDark: root.classList.contains('dark')
      };
    });
    
    testResults = results;
  }
  
  onMount(() => {
    checkThemeVariables();
  });
  
  // 테마 변경 감지
  $: if ($theme) {
    setTimeout(checkThemeVariables, 100);
  }
</script>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-4xl mx-auto">
    <!-- 헤더 -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4 text-foreground">테마 시스템 검증</h1>
      <p class="text-lg text-muted-foreground">
        라이트/다크 테마 전환이 올바르게 작동하는지 확인하는 페이지입니다.
      </p>
    </div>
    
    <!-- 현재 테마 상태 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-card-foreground">현재 테마 상태</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-muted rounded-lg">
          <p class="text-sm font-medium text-muted-foreground">선택된 테마</p>
          <p class="text-lg font-bold text-foreground">{$theme}</p>
        </div>
        <div class="p-4 bg-muted rounded-lg">
          <p class="text-sm font-medium text-muted-foreground">HTML 클래스</p>
          <p class="text-lg font-bold text-foreground">
            {typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
          </p>
        </div>
        <div class="p-4 bg-muted rounded-lg">
          <p class="text-sm font-medium text-muted-foreground">시스템 테마</p>
          <p class="text-lg font-bold text-foreground">
            {typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
          </p>
        </div>
      </div>
    </div>
    
    <!-- 색상 변수 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-card-foreground">CSS 변수 값 검증</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-border">
              <th class="text-left p-2 text-muted-foreground">변수명</th>
              <th class="text-left p-2 text-muted-foreground">현재 값</th>
              <th class="text-center p-2 text-muted-foreground">상태</th>
            </tr>
          </thead>
          <tbody>
            {#each testResults as result}
              <tr class="border-b border-border">
                <td class="p-2 font-mono text-xs text-foreground">{result.variable}</td>
                <td class="p-2 font-mono text-xs text-muted-foreground">{result.value || 'undefined'}</td>
                <td class="p-2 text-center">
                  {#if result.isSet}
                    <span class="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">✓ 설정됨</span>
                  {:else}
                    <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">✗ 미설정</span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- 시각적 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-card-foreground">시각적 테스트</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- 배경/전경색 테스트 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-foreground">배경 & 전경색</h3>
          <div class="space-y-2">
            <div class="p-3 bg-background border border-border rounded">
              <span class="text-foreground">background + foreground</span>
            </div>
            <div class="p-3 bg-card border border-border rounded">
              <span class="text-card-foreground">card + card-foreground</span>
            </div>
          </div>
        </div>
        
        <!-- 인터랙션 색상 테스트 -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-foreground">인터랙션 색상</h3>
          <div class="space-y-2">
            <button class="w-full p-3 bg-primary text-primary-foreground rounded hover:opacity-90 transition-opacity">
              Primary Button
            </button>
            <button class="w-full p-3 bg-secondary text-secondary-foreground rounded hover:opacity-90 transition-opacity">
              Secondary Button
            </button>
            <button class="w-full p-3 bg-destructive text-destructive-foreground rounded hover:opacity-90 transition-opacity">
              Destructive Button
            </button>
          </div>
        </div>
        
      </div>
    </div>
    
    <!-- LocalStorage 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-4 text-card-foreground">LocalStorage 검증</h2>
      <div class="space-y-4">
        <div class="p-4 bg-muted rounded-lg">
          <p class="text-sm font-medium text-muted-foreground mb-2">저장된 테마 설정</p>
          <p class="font-mono text-sm text-foreground">
            {typeof localStorage !== 'undefined' ? localStorage.getItem('theme') || 'null' : 'N/A (서버)'}
          </p>
        </div>
        
        <div class="flex gap-2">
          <button
            class="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            on:click={() => theme.setTheme('light')}
          >
            라이트 테스트
          </button>
          <button
            class="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            on:click={() => theme.setTheme('dark')}
          >
            다크 테스트
          </button>
          <button
            class="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90"
            on:click={() => location.reload()}
          >
            새로고침 테스트
          </button>
        </div>
      </div>
    </div>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4">
      <a href="/" class="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-opacity">
        홈으로 돌아가기
      </a>
      <a href="/test-colors/custom" class="inline-flex items-center px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
        커스텀 색상 테스트
      </a>
    </div>
    
  </div>
</div>