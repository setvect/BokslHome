'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/header';
import { DesignSystemSidebar } from '@/components/layout/design-system-sidebar';
import { MainContent } from '@/components/layout/main-content';

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-background">
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Header onMenuToggle={toggleSidebar} />
      </div>

      {/* 디자인 시스템 사이드바 */}
      <DesignSystemSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

      {/* 메인 콘텐츠 영역 */}
      <div className="flex flex-1 flex-col pt-14 lg:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
