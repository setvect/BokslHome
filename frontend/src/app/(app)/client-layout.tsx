'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { MainContent } from '@/components/layout/main-content';
import { apiClient } from '@/lib/api-client';
import { getCookie, setCookie } from '@/lib/utils/cookie';

const SIDEBAR_COOKIE_NAME = 'sidebar-state';

interface ClientAppLayoutProps {
  initialSidebarOpen: boolean;
  children: React.ReactNode;
}

export function ClientAppLayout({ initialSidebarOpen, children }: ClientAppLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(initialSidebarOpen);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const verifyAuth = async () => {
      try {
        await apiClient.get('/api/auth/me');
        if (!cancelled) {
          setIsInitialized(true);
        }
      } catch (error) {
        if (!cancelled) {
          router.replace('/login');
        }
      }
    };

    void verifyAuth();

    return () => {
      cancelled = true;
    };
  }, [router]);

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      const savedState = getCookie(SIDEBAR_COOKIE_NAME);
      const savedStateBoolean = savedState === 'true';

      if (!isDesktop && sidebarOpen) {
        setSidebarOpen(false);
      } else if (isDesktop && !sidebarOpen && savedStateBoolean) {
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

  if (!isInitialized) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background" suppressHydrationWarning>
      <div className="fixed top-0 left-0 right-0 z-40">
        <Header onMenuToggle={toggleSidebar} />
      </div>

      <div suppressHydrationWarning>
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} isInitialized={isInitialized} />
      </div>

      <div
        className={`flex flex-1 flex-col pt-14 ${isInitialized ? 'transition-all duration-300' : ''} ${
          sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
        suppressHydrationWarning
      >
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
