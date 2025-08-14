<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Button } from '$lib/components/ui/button';
  import { Badge } from '$lib/components/ui/badge';
  import { layout } from '$lib/stores/layout';

  // 레이아웃 상태 구독
  let layoutState = $state({ isSidebarOpen: false, currentTheme: 'dark', mounted: false, currentMenu: { expandedMenus: [], activeMenuId: undefined, activeSubMenuId: undefined } });

  $effect(() => {
    const unsubscribe = layout.subscribe((state) => {
      layoutState = state;
    });

    return unsubscribe;
  });

  // 테스트 함수들
  function testSidebarToggle() {
    layout.toggleSidebar();
  }

  function testThemeToggle() {
    layout.toggleTheme();
  }

  function testMenuExpansion() {
    layout.toggleMenu('board');
    layout.toggleMenu('knowledge');
  }

  function testActiveMenu() {
    layout.setActiveMenu('note', 'note-personal');
  }

  function resetMenuState() {
    layout.resetMenuState();
  }
</script>

<svelte:head>
  <title>복슬홈 - 레이아웃 테스트</title>
  <meta name="description" content="복슬홈 메인 화면 및 레이아웃 시스템" />
</svelte:head>

<div class="container mx-auto py-8 space-y-8">
  <!-- 메인 제목 -->
  <div class="text-center space-y-4">
    <h1 class="text-4xl font-bold text-foreground">복슬홈</h1>
    <p class="text-xl text-muted-foreground">레이아웃 시스템 테스트</p>
  </div>

  <!-- 레이아웃 상태 정보 카드 -->
  <Card>
    <CardHeader>
      <CardTitle>현재 레이아웃 상태</CardTitle>
      <CardDescription>실시간 레이아웃 상태 모니터링</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="font-medium">사이드바:</span>
            <Badge variant={layoutState.isSidebarOpen ? "default" : "outline"}>
              {layoutState.isSidebarOpen ? '열림' : '닫힌'}
            </Badge>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium">테마:</span>
            <Badge variant="secondary">{layoutState.currentTheme}</Badge>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium">마운트 상태:</span>
            <Badge variant={layoutState.mounted ? "default" : "destructive"}>
              {layoutState.mounted ? '완료' : '로딩중'}
            </Badge>
          </div>
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <span class="font-medium">활성 메뉴:</span>
            <Badge variant="outline">{layoutState.currentMenu.activeMenuId || '없음'}</Badge>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium">활성 서브메뉴:</span>
            <Badge variant="outline">{layoutState.currentMenu.activeSubMenuId || '없음'}</Badge>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-medium">확장된 메뉴:</span>
            <div class="flex gap-1">
              {#each layoutState.currentMenu.expandedMenus as menuId}
                <Badge variant="secondary" size="sm">{menuId}</Badge>
              {:else}
                <Badge variant="outline" size="sm">없음</Badge>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>

  <!-- 테스트 기능 버튼들 -->
  <Card>
    <CardHeader>
      <CardTitle>레이아웃 테스트 기능</CardTitle>
      <CardDescription>각 기능을 테스트해보세요</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button onclick={testSidebarToggle} variant="outline">
          사이드바 토글
        </Button>
        <Button onclick={testThemeToggle} variant="outline">
          테마 변경
        </Button>
        <Button onclick={testMenuExpansion} variant="outline">
          메뉴 확장 테스트
        </Button>
        <Button onclick={testActiveMenu} variant="outline">
          활성 메뉴 설정
        </Button>
        <Button onclick={resetMenuState} variant="destructive">
          메뉴 상태 초기화
        </Button>
      </div>
    </CardContent>
  </Card>

  <!-- 반응형 테스트 안내 -->
  <Card>
    <CardHeader>
      <CardTitle>반응형 테스트 가이드</CardTitle>
      <CardDescription>다양한 화면 크기에서 테스트해보세요</CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold mb-2">모바일 (&lt; 768px)</h4>
          <ul class="text-sm space-y-1 text-muted-foreground">
            <li>• 사이드바는 오버레이로 표시</li>
            <li>• 햄버거 메뉴 버튼 활성화</li>
            <li>• 콘텐츠 영역 전체 폭 사용</li>
          </ul>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold mb-2">태블릿 (768px - 1024px)</h4>
          <ul class="text-sm space-y-1 text-muted-foreground">
            <li>• 사이드바는 오버레이로 표시</li>
            <li>• 반응형 그리드 조정</li>
            <li>• 적절한 패딩 및 마진</li>
          </ul>
        </div>
        <div class="p-4 border rounded-lg">
          <h4 class="font-semibold mb-2">데스크톱 (&gt; 1024px)</h4>
          <ul class="text-sm space-y-1 text-muted-foreground">
            <li>• 사이드바 항상 표시</li>
            <li>• 콘텐츠 영역에 좌측 마진</li>
            <li>• 최적화된 레이아웃</li>
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>


  <!-- 디자인 시스템 링크 -->
  <div class="mt-8 text-center">
    <a href="/design-system" 
       class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground 
              rounded-lg hover:bg-primary/90 transition-colors font-medium">
      📚 디자인 시스템 보러가기
    </a>
  </div>
</div>