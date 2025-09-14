'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  X, 
  Home, 
  FileText, 
  BookOpen, 
  StickyNote, 
  Users, 
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Settings,
  Music,
  Film,
  Camera,
  Heart,
  MessageCircle,
  Sparkles,
  GraduationCap,
  BookOpenCheck,
  Activity,
  Dice6,
  Code2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  name: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

const navigation: MenuItem[] = [
  {
    name: '홈',
    href: '/',
    icon: Home,
  },
  {
    name: '게시판',
    href: '/board',
    icon: FileText,
    children: [
      { name: '게시판 관리', href: '/board-manage', icon: Settings },
      { name: '글', href: '/board/posts', icon: FileText },
      { name: '책', href: '/board/books', icon: BookOpen },
      { name: '음악', href: '/board/music', icon: Music },
      { name: '영화', href: '/board/movies', icon: Film },
      { name: '사진', href: '/board/photos', icon: Camera },
      { name: '기억', href: '/board/memories', icon: Heart },
      { name: '인연', href: '/board/relationships', icon: Users },
      { name: '잡담', href: '/board/chat', icon: MessageCircle },
      { name: '꿈', href: '/board/dreams', icon: Sparkles },
      { name: '기술사', href: '/board/tech', icon: GraduationCap },
      { name: '소설', href: '/board/novels', icon: BookOpenCheck },
      { name: '운동', href: '/board/exercise', icon: Activity },
    ],
  },
  {
    name: '지식',
    href: '/knowledge',
    icon: BookOpen,
  },
  {
    name: '노트',
    href: '/note',
    icon: StickyNote,
  },
  {
    name: '메모',
    href: '/memo',
    icon: StickyNote,
  },
  {
    name: '관계',
    href: '/network',
    icon: Users,
  },
  {
    name: '이것저것',
    href: '/misc',
    icon: MoreHorizontal,
    children: [
      { name: '로또', href: '/misc/lotto', icon: Dice6 },
    ],
  },
];

function MenuItemComponent({ item, level = 0, onClose }: { item: MenuItem; level?: number; onClose: () => void }) {
  const pathname = usePathname();
  
  // 현재 경로가 이 메뉴나 하위 메뉴에 해당하는지 확인
  const isCurrentPath = item.href && pathname === item.href;
  const isChildActive = item.children?.some(child => 
    child.href && pathname === child.href
  );
  
  // 현재 경로가 이 메뉴의 하위 경로인지 확인 (예: /board/posts는 /board의 하위)
  const isSubPath = item.href && pathname.startsWith(item.href + '/');
  const shouldBeExpanded = isChildActive || isSubPath;
  
  // 초기 상태: 현재 경로가 하위 메뉴에 있으면 자동으로 열림
  const [isExpanded, setIsExpanded] = useState(shouldBeExpanded);
  
  const isActive = isCurrentPath;
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;
  
  const paddingLeft = `${(level + 1) * 12}px`;

  // 경로가 변경될 때마다 확장 상태 업데이트
  React.useEffect(() => {
    if (shouldBeExpanded) {
      setIsExpanded(true);
    }
  }, [shouldBeExpanded]);

  const handleClick = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (window.innerWidth < 1024) {
      // 모바일에서 메뉴 클릭 시 사이드바 자동 닫기
      onClose();
    }
  };

  const content = (
    <div
      className={cn(
        'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors cursor-pointer',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
      )}
      style={{ paddingLeft }}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-4 w-4" />
        <span>{item.name}</span>
      </div>
      {hasChildren && (
        <div className="ml-auto">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      )}
    </div>
  );

  return (
    <div>
      {item.href && !hasChildren ? (
        <Link href={item.href} className="block" onClick={handleClick}>
          {content}
        </Link>
      ) : (
        content
      )}
      
      {hasChildren && isExpanded && (
        <div className="mt-1 space-y-1">
          {item.children!.map((child) => (
            <MenuItemComponent key={child.name} item={child} level={level + 1} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 사이드바 */}
      <div
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 transform border-r border-border bg-background transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          {/* 헤더 영역 */}
          <div className="flex h-14 items-center justify-between px-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Code2 className="h-5 w-5 text-foreground" />
              <h2 className="text-lg font-semibold text-foreground">복슬홈</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="w-9 px-0 lg:hidden"
              aria-label="사이드바 닫기"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* 네비게이션 */}
          <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
            {navigation.map((item) => (
              <MenuItemComponent key={item.name} item={item} onClose={onClose} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}