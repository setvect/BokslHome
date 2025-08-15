<script lang="ts">
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  import type { MenuItem } from '$lib/types/menu';
  import { layout, type LayoutState } from '$lib/stores/layout';
  import { 
    ChevronDown, 
    ChevronRight, 
    FileText, 
    BookOpen, 
    StickyNote, 
    ClipboardList, 
    Users, 
    Dice1,
    PawPrint,
    Settings,
    PenTool,
    Book,
    Music,
    Film,
    Camera,
    Heart,
    MessageCircle,
    Lightbulb,
    Moon,
    GraduationCap,
    BookMarked,
    Dumbbell,
    Brain,
    NotebookPen,
    Network,
    MoreHorizontal
  } from '@lucide/svelte';

  interface Props {
    isSidebarOpen?: boolean;
    onClose?: () => void;
  }

  let { isSidebarOpen = false, onClose }: Props = $props();

  // 레이아웃 상태 구독  
  let layoutState = $state<LayoutState>({
    isSidebarOpen: false,
    currentTheme: 'dark',
    mounted: false,
    currentMenu: {
      expandedMenus: [],
      activeMenuId: undefined,
      activeSubMenuId: undefined
    }
  });

  // 메뉴 데이터 정의 (정적 구조)
  const baseMenuItems: MenuItem[] = [
    {
      id: 'board',
      label: '게시판',
      icon: 'FileText',
      children: [
        { id: 'board-manage', label: '게시판 관리', href: '/board-manager' },
        { id: 'board-writing', label: '글', href: '/board/writing' },
        { id: 'board-book', label: '책', href: '/board/book' },
        { id: 'board-music', label: '음악', href: '/board/music' },
        { id: 'board-movie', label: '영화', href: '/board/movie' },
        { id: 'board-photo', label: '사진', href: '/board/photo' },
        { id: 'board-memory', label: '기억', href: '/board/memory' },
        { id: 'board-relationship', label: '인연', href: '/board/relationship' },
        { id: 'board-talk', label: '잡담', href: '/board/talk' },
        { id: 'board-dream', label: '꿈', href: '/board/dream' },
        { id: 'board-tech', label: '기술사', href: '/board/tech' },
        { id: 'board-novel', label: '소설', href: '/board/novel' },
        { id: 'board-exercise', label: '운동', href: '/board/exercise' }
      ]
    },
    {
      id: 'knowledge',
      label: '지식',
      icon: 'Brain',
      href: '/knowledge'
    },
    {
      id: 'note',
      label: '노트',
      icon: 'NotebookPen',
      href: '/note'
    },
    {
      id: 'memo',
      label: '메모',
      icon: 'StickyNote',
      href: '/memo'
    },
    {
      id: 'network',
      label: '관계',
      icon: 'Network',
      href: '/network'
    },
    {
      id: 'etc',
      label: '이것저것',
      icon: 'MoreHorizontal',
      children: [
        { id: 'etc-lotto', label: '로또', href: '/etc/lotto' }
      ]
    }
  ];

  // 동적 메뉴 아이템 (확장 상태 포함)
  const menuItems = $derived(
    baseMenuItems.map(item => ({
      ...item,
      isExpanded: layoutState.currentMenu.expandedMenus.includes(item.id),
      isActive: layoutState.currentMenu.activeMenuId === item.id,
      children: item.children?.map(child => ({
        ...child,
        isActive: layoutState.currentMenu.activeSubMenuId === child.id
      }))
    }))
  );


  // 아이콘 컴포넌트 매핑
  const iconMap = {
    'FileText': FileText,
    'BookOpen': BookOpen,
    'StickyNote': StickyNote,
    'ClipboardList': ClipboardList,
    'Users': Users,
    'Dice1': Dice1,
    'Settings': Settings,
    'PenTool': PenTool,
    'Book': Book,
    'Music': Music,
    'Film': Film,
    'Camera': Camera,
    'Heart': Heart,
    'MessageCircle': MessageCircle,
    'Lightbulb': Lightbulb,
    'Moon': Moon,
    'GraduationCap': GraduationCap,
    'BookMarked': BookMarked,
    'Dumbbell': Dumbbell,
    'Brain': Brain,
    'NotebookPen': NotebookPen,
    'Network': Network,
    'MoreHorizontal': MoreHorizontal
  };

  // 아이콘 렌더링 헬퍼 함수
  function getIconComponent(iconName: string | undefined) {
    if (!iconName || !iconMap[iconName as keyof typeof iconMap]) {
      return null;
    }
    return iconMap[iconName as keyof typeof iconMap];
  }

  // 메뉴 클릭 처리
  function handleMenuClick(item: MenuItem) {
    if (item.children) {
      // 하위 메뉴가 있는 경우: 토글만 함
      layout.toggleMenu(item.id);
    } else if (item.href) {
      // 링크가 있는 메뉴: 네비게이션 실행
      layout.setActiveMenu(item.id);
      console.log('Navigate to:', item.href);
      goto(item.href);
    }
  }

  // 서브메뉴 클릭 처리
  function handleSubMenuClick(parentId: string, subItem: MenuItem) {
    if (subItem.href) {
      layout.setActiveMenu(parentId, subItem.id);
      console.log('Navigate to:', subItem.href);
      goto(subItem.href);
    }
  }

  // 현재 경로에 따른 활성 메뉴 설정
  function setActiveMenuFromPath(pathname: string) {
    // 홈 페이지인 경우 모든 메뉴 비활성화
    if (pathname === '/') {
      const currentMenu = layoutState.currentMenu;
      if (currentMenu.activeMenuId || currentMenu.activeSubMenuId) {
        layout.setActiveMenu('', ''); // 빈 문자열로 모든 메뉴 비활성화
      }
      return;
    }

    // 경로별 메뉴 매핑
    const pathMenuMap: Record<string, { parentId: string; subMenuId?: string }> = {
      '/board-manager': { parentId: 'board', subMenuId: 'board-manage' },
      '/board/writing': { parentId: 'board', subMenuId: 'board-writing' },
      '/board/book': { parentId: 'board', subMenuId: 'board-book' },
      '/board/music': { parentId: 'board', subMenuId: 'board-music' },
      '/board/movie': { parentId: 'board', subMenuId: 'board-movie' },
      '/board/photo': { parentId: 'board', subMenuId: 'board-photo' },
      '/board/memory': { parentId: 'board', subMenuId: 'board-memory' },
      '/board/relationship': { parentId: 'board', subMenuId: 'board-relationship' },
      '/board/talk': { parentId: 'board', subMenuId: 'board-talk' },
      '/board/dream': { parentId: 'board', subMenuId: 'board-dream' },
      '/board/tech': { parentId: 'board', subMenuId: 'board-tech' },
      '/board/novel': { parentId: 'board', subMenuId: 'board-novel' },
      '/board/exercise': { parentId: 'board', subMenuId: 'board-exercise' },
      '/knowledge': { parentId: 'knowledge' },
      '/note': { parentId: 'note' },
      '/memo': { parentId: 'memo' },
      '/network': { parentId: 'network' }
    };

    const menuInfo = pathMenuMap[pathname];
    if (menuInfo) {
      // 현재 활성 메뉴와 다른 경우에만 업데이트
      const currentMenu = layoutState.currentMenu;
      const needsUpdate = 
        currentMenu.activeMenuId !== menuInfo.parentId || 
        currentMenu.activeSubMenuId !== menuInfo.subMenuId;
      
      if (needsUpdate) {
        layout.setActiveMenu(menuInfo.parentId, menuInfo.subMenuId);
        
        // 서브메뉴가 있는 경우 부모 메뉴 확장
        if (menuInfo.subMenuId && !currentMenu.expandedMenus.includes(menuInfo.parentId)) {
          layout.toggleMenu(menuInfo.parentId);
        }
      }
    } else {
      // 매핑되지 않은 경로인 경우 모든 메뉴 비활성화
      const currentMenu = layoutState.currentMenu;
      if (currentMenu.activeMenuId || currentMenu.activeSubMenuId) {
        layout.setActiveMenu('', '');
      }
    }
  }

  // 경로 추적용 변수
  let currentPath = $state('');

  // 경로 변경 감지하여 활성 메뉴 자동 설정
  $effect(() => {
    const pathname = page?.url?.pathname;
    if (pathname && pathname !== currentPath) {
      currentPath = pathname;
      setActiveMenuFromPath(pathname);
    }
  });

  onMount(() => {
    // 레이아웃 상태 구독
    const unsubscribe = layout.subscribe((state) => {
      layoutState = state;
    });
    
    return unsubscribe;
  });

</script>

<aside 
  class="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-30 overflow-y-auto
         transition-transform duration-300 ease-in-out
         {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
  role="navigation"
  aria-label="메인 네비게이션"
>
  <!-- 로고 영역 -->
  <div class="h-16 flex items-center px-4 border-b border-border">
    <!-- 로고 -->
    <a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <PawPrint class="w-5 h-5 text-primary-foreground" />
      </div>
      <span class="font-semibold text-foreground">복슬이네</span>
    </a>
  </div>

  <nav class="p-4">
    <div class="space-y-2">
      <!-- 메뉴 리스트 -->
      <div class="space-y-1">
        {#each menuItems as item (item.id)}
          <div>
            <!-- 1depth 메뉴 -->
            <button 
              class="w-full flex items-center gap-3 px-3 py-2 rounded-md 
                     hover:bg-accent hover:text-accent-foreground
                     transition-colors duration-200
                     {item.isActive ? 'bg-accent text-accent-foreground' : 'text-foreground'}"
              onclick={() => handleMenuClick(item)}
              aria-expanded={item.children ? item.isExpanded : undefined}
            >
              <!-- 아이콘 -->
              {#if getIconComponent(item.icon)}
                {@const IconComponent = getIconComponent(item.icon)}
                <IconComponent class="w-4 h-4 flex-shrink-0 text-current" />
              {:else}
                <div class="w-4 h-4 bg-muted rounded flex-shrink-0"></div>
              {/if}
              
              <!-- 라벨 -->
              <span class="flex-1 text-left">{item.label}</span>
              
              <!-- 확장/축소 아이콘 -->
              {#if item.children}
                {#if item.isExpanded}
                  <ChevronDown class="w-4 h-4 text-muted-foreground" />
                {:else}
                  <ChevronRight class="w-4 h-4 text-muted-foreground" />
                {/if}
              {/if}
            </button>
            
            <!-- 2depth 서브메뉴 -->
            {#if item.children && item.isExpanded}
              <div class="ml-7 mt-1 space-y-1" role="group">
                {#each item.children as subItem (subItem.id)}
                  <button 
                    class="w-full text-left px-3 py-2 rounded-md text-sm
                           hover:bg-accent hover:text-accent-foreground
                           transition-colors duration-200
                           {subItem.isActive ? 'bg-accent text-accent-foreground' : 'text-foreground/70'}"
                    onclick={() => handleSubMenuClick(item.id, subItem)}
                  >
                    {subItem.label}
                  </button>
                {/each}
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </nav>
</aside>

<!-- 모바일 오버레이 -->
{#if isSidebarOpen}
  <div 
    class="fixed inset-0 bg-background/80 backdrop-blur-sm z-20 lg:hidden"
    onclick={onClose}
    onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? onClose?.() : null}
    role="button"
    tabindex="0"
    aria-label="사이드바 닫기"
  ></div>
{/if}