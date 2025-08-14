<script lang="ts">
  import { Menu, User, Sun, Moon, Settings, LogOut, KeyRound } from '@lucide/svelte';
  import { Popover, PopoverContent, PopoverTrigger } from '$lib/components/ui/popover';
  import { Button } from '$lib/components/ui/button';

  interface Props {
    currentTheme: string;
    mounted: boolean;
    onToggleSidebar: () => void;
    onToggleTheme: () => void;
  }

  let { currentTheme, mounted, onToggleSidebar, onToggleTheme }: Props = $props();

  // 사용자 액션 핸들러들
  function handleLogout() {
    console.log('로그아웃 처리');
    // TODO: 실제 로그아웃 로직 구현
  }

  function handlePasswordChange() {
    console.log('비밀번호 변경');
    // TODO: 비밀번호 변경 페이지로 이동
  }

  function handleSettings() {
    console.log('설정 페이지');
    // TODO: 설정 페이지로 이동
  }
</script>

<header class="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40">
  <div class="flex items-center justify-between h-full px-4">
    <!-- 좌측: 메뉴 토글 + 로고 -->
    <div class="flex items-center gap-4">
      <Button
        variant="ghost"
        size="sm"
        class="lg:hidden p-2"
        onclick={mounted ? onToggleSidebar : undefined}
        aria-label="메뉴 토글"
      >
        <Menu class="w-5 h-5 text-foreground" />
      </Button>
      
      <!-- 로고/타이틀 영역 -->
      <a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
        <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span class="text-primary-foreground font-bold text-sm">복</span>
        </div>
        <h1 class="text-xl font-bold text-foreground">복슬홈</h1>
      </a>
    </div>
    
    <!-- 우측: 액션 버튼들 -->
    <div class="flex items-center gap-2">
      <!-- 테마 토글 버튼 -->
      <Button
        variant="ghost"
        size="sm"
        class="p-2"
        onclick={mounted ? onToggleTheme : undefined}
        aria-label="테마 변경"
        title={mounted ? `테마: ${currentTheme}` : "테마 변경"}
      >
        {#if mounted && currentTheme === 'light'}
          <Sun class="w-5 h-5 text-foreground" />
        {:else}
          <Moon class="w-5 h-5 text-foreground" />
        {/if}
      </Button>
      
      <!-- 사용자 메뉴 -->
      {#if mounted}
        <!-- 클라이언트에서만 Popover 렌더링 -->
        <Popover>
          <PopoverTrigger>
            <Button
              variant="ghost"
              size="sm"
              class="p-2"
              aria-label="사용자 메뉴"
            >
              <User class="w-5 h-5 text-foreground" />
            </Button>
          </PopoverTrigger>
          
          <PopoverContent align="end" class="w-56 p-0">
            <!-- 사용자 정보 섹션 -->
            <div class="px-3 py-3 border-b border-border">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                  <User class="w-4 h-4 text-muted-foreground" />
                </div>
                <div class="flex flex-col">
                  <span class="text-sm font-medium">관리자</span>
                  <span class="text-xs text-muted-foreground">admin@example.com</span>
                </div>
              </div>
            </div>
            
            <!-- 메뉴 항목들 -->
            <div class="py-1">
              <button 
                onclick={handleSettings}
                class="w-full flex items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Settings class="w-4 h-4 mr-2 text-current" />
                설정
              </button>
              
              <button 
                onclick={handlePasswordChange}
                class="w-full flex items-center px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <KeyRound class="w-4 h-4 mr-2 text-current" />
                비밀번호 변경
              </button>
              
              <div class="border-t border-border my-1"></div>
              
              <button 
                onclick={handleLogout}
                class="w-full flex items-center px-3 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
              >
                <LogOut class="w-4 h-4 mr-2 text-current" />
                로그아웃
              </button>
            </div>
          </PopoverContent>
        </Popover>
      {:else}
        <!-- SSR용 기본 사용자 버튼 -->
        <Button
          variant="ghost"
          size="sm"
          class="p-2"
          aria-label="사용자 메뉴"
        >
          <User class="w-5 h-5 text-foreground" />
        </Button>
      {/if}
    </div>
  </div>
</header>