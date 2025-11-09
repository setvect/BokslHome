'use client';

import React from 'react';
import { Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

export interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 w-full items-center justify-between px-4">
        {/* 좌측: 메뉴 버튼 + 로고 */}
        <div className="flex items-center space-x-2">
          {showMenuButton && (
            <Button variant="ghost" size="sm" onClick={onMenuToggle} className="w-9 px-0" aria-label="메뉴 토글">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center space-x-2">
            <Home className="h-5 w-5 text-foreground" />
            <span className="font-bold text-foreground">복슬홈</span>
          </div>
        </div>

        {/* 우측: 테마 토글 */}
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
