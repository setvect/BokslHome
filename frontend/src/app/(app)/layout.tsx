'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MainContent } from '@/components/layout/main-content';
import { getCookie, setCookie } from '@/lib/utils/cookie';

const SIDEBAR_COOKIE_NAME = 'sidebar-state';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  // 초기값을 쿠키 기반으로 설정 (깜박임 방지를 위해 동기적으로 읽기)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === 'undefined') return false;

    const savedState = getCookie(SIDEBAR_COOKIE_NAME);
    if (savedState !== undefined) {
      return savedState === 'true';
    }

    // 기본값: 데스크톱에서는 열림
    return window.innerWidth >= 1024;
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // 초기 마운트 후 트랜지션 활성화
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // 윈도우 리사이즈 이벤트 처리
  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      const savedState = getCookie(SIDEBAR_COOKIE_NAME);
      const savedStateBoolean = savedState === 'true';

      if (!isDesktop && sidebarOpen) {
        // 모바일로 전환될 때 사이드바 자동으로 닫기
        setSidebarOpen(false);
      } else if (isDesktop && !sidebarOpen && savedStateBoolean) {
        // 데스크톱으로 전환될 때 저장된 상태가 열림이면 복원
        setSidebarOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const toggleSidebar = () => {
    const newState = !sidebarOpen;
    setSidebarOpen(newState);
    setCookie(SIDEBAR_COOKIE_NAME, String(newState));
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
    setCookie(SIDEBAR_COOKIE_NAME, 'false');
  };

  return (
    <div className="flex h-screen bg-background" suppressHydrationWarning>
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Header onMenuToggle={toggleSidebar} />
      </div>

      {/* 사이드바 */}
      <div suppressHydrationWarning>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isInitialized={isInitialized} />
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div
        className={`flex flex-1 flex-col pt-14 ${isInitialized ? 'transition-all duration-300' : ''} ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}
        suppressHydrationWarning
      >
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
