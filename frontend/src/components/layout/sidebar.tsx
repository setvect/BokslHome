'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, Info, FileText, BookOpen, StickyNote, Users, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: '홈',
    href: '/',
    icon: Home,
  },
  {
    name: '소개',
    href: '/about',
    icon: Info,
  },
  {
    name: '게시판',
    href: '/board',
    icon: FileText,
  },
  {
    name: '복슬지식',
    href: '/knowledge',
    icon: BookOpen,
  },
  {
    name: '복슬노트',
    href: '/note',
    icon: StickyNote,
  },
  {
    name: '복슬관계',
    href: '/network',
    icon: Users,
  },
  {
    name: '설정',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

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
            <h2 className="text-lg font-semibold text-foreground">메뉴</h2>
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
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    // 모바일에서 메뉴 클릭 시 사이드바 자동 닫기
                    if (window.innerWidth < 1024) {
                      onClose();
                    }
                  }}
                  className={cn(
                    'flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}