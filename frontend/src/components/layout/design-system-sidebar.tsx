'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Palette, Type, Space, Layers, Code2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export interface DesignSystemSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    category: '디자인 토큰',
    items: [
      {
        name: '색상',
        href: '/design-system/colors',
        icon: Palette,
      },
      {
        name: '타이포그래피',
        href: '/design-system/typography',
        icon: Type,
      },
      {
        name: '스페이싱',
        href: '/design-system/spacing',
        icon: Space,
      },
    ],
  },
  {
    category: '컴포넌트',
    items: [
      {
        name: '컴포넌트 개요',
        href: '/design-system/components',
        icon: Layers,
      },
      {
        name: '버튼',
        href: '/design-system/components/buttons',
        icon: Code2,
      },
      {
        name: '폼',
        href: '/design-system/components/forms',
        icon: Code2,
      },
      {
        name: 'Dialog & Modal',
        href: '/design-system/components/dialog',
        icon: Code2,
      },
      {
        name: 'Table',
        href: '/design-system/components/table',
        icon: Code2,
      },
      {
        name: 'Alert & Toast',
        href: '/design-system/components/alert',
        icon: Code2,
      },
      {
        name: 'Navigation',
        href: '/design-system/components/navigation',
        icon: Code2,
      },
      {
        name: 'Data Display',
        href: '/design-system/components/data-display',
        icon: Code2,
      },
    ],
  },
  {
    category: '패턴',
    items: [
      {
        name: '상호작용',
        href: '/design-system/patterns/interactions',
        icon: Zap,
      },
    ],
  },
];

export function DesignSystemSidebar({ isOpen, onClose }: DesignSystemSidebarProps) {
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
            <h2 className="text-lg font-semibold text-foreground">디자인 시스템</h2>
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
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-6">
              {navigation.map((section) => (
                <div key={section.category}>
                  <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {section.category}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item) => {
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
                  </div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}