<script lang="ts">
  import { onMount } from 'svelte';
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
    Dice1
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
        { id: 'board-general', label: '일반 게시판', href: '/board/general' },
        { id: 'board-notice', label: '공지사항', href: '/board/notice' },
        { id: 'board-qna', label: 'Q&A', href: '/board/qna' }
      ]
    },
    {
      id: 'knowledge',
      label: '복슬지식',
      icon: 'BookOpen',
      children: [
        { id: 'knowledge-tech', label: '기술 지식', href: '/knowledge/tech' },
        { id: 'knowledge-life', label: '생활 정보', href: '/knowledge/life' },
        { id: 'knowledge-study', label: '학습 자료', href: '/knowledge/study' }
      ]
    },
    {
      id: 'note',
      label: '복슬노트',
      icon: 'StickyNote',
      children: [
        { id: 'note-personal', label: '개인 노트', href: '/note/personal' },
        { id: 'note-work', label: '업무 노트', href: '/note/work' },
        { id: 'note-project', label: '프로젝트 노트', href: '/note/project' }
      ]
    },
    {
      id: 'memo',
      label: '복슬메모',
      icon: 'ClipboardList',
      children: [
        { id: 'memo-quick', label: '빠른 메모', href: '/memo/quick' },
        { id: 'memo-todo', label: '할일 목록', href: '/memo/todo' },
        { id: 'memo-idea', label: '아이디어', href: '/memo/idea' }
      ]
    },
    {
      id: 'network',
      label: '복슬관계',
      icon: 'Users',
      href: '/network'
    },
    {
      id: 'lotto',
      label: '로또번호 생성',
      icon: 'Dice1',
      href: '/lotto'
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
    'Dice1': Dice1
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
      // 중앙화된 스토어의 토글 메뉴 함수 사용
      layout.toggleMenu(item.id);
    } else if (item.href) {
      // 활성 메뉴 설정
      layout.setActiveMenu(item.id);
      // 실제 네비게이션은 나중에 구현
      console.log('Navigate to:', item.href);
      if (onClose) onClose();
    }
  }

  // 서브메뉴 클릭 처리
  function handleSubMenuClick(parentId: string, subItem: MenuItem) {
    layout.setActiveMenu(parentId, subItem.id);
    console.log('Navigate to:', subItem.href);
    if (onClose) onClose();
  }

  onMount(() => {
    // 레이아웃 상태 구독
    const unsubscribe = layout.subscribe((state) => {
      layoutState = state;
    });
    
    return unsubscribe;
  });

</script>

<aside 
  class="fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-30 overflow-y-auto
         transition-transform duration-300 ease-in-out
         lg:translate-x-0 {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
  role="navigation"
  aria-label="메인 네비게이션"
>
  <nav class="p-4">
    <div class="space-y-2">
      <!-- 메뉴 제목 -->
      <div class="text-sm font-medium text-foreground/60 px-2 py-1">
        메뉴
      </div>
      
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
    onkeydown={(e) => e.key === 'Enter' && onClose?.()}
    role="button"
    tabindex="0"
    aria-label="사이드바 닫기"
  ></div>
{/if}