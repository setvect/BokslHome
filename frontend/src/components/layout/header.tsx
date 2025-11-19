'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, Home, LogOut, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { ChangePasswordDialog } from '@/components/user/change-password-dialog';

export interface HeaderProps {
  onMenuToggle?: () => void;
  showMenuButton?: boolean;
}

export function Header({ onMenuToggle, showMenuButton = true }: HeaderProps) {
  const router = useRouter();
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    router.push('/login');
  };

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

        {/* 우측: 비밀번호 변경 + 로그아웃 + 테마 토글 */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setIsChangePasswordOpen(true)} aria-label="비밀번호 변경">
            <Lock className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">비밀번호 변경</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={handleLogout} aria-label="로그아웃">
            <LogOut className="h-5 w-5 mr-2" />
            <span className="hidden sm:inline">로그아웃</span>
          </Button>
          <ThemeToggle />
        </div>
      </div>
      <ChangePasswordDialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen} />
    </header>
  );
}
