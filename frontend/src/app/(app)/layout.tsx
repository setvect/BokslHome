import { cookies } from 'next/headers';
import { ReactNode } from 'react';
import { ClientAppLayout } from './client-layout';

const SIDEBAR_COOKIE_NAME = 'sidebar-state';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const savedState = cookieStore.get(SIDEBAR_COOKIE_NAME)?.value;
  const initialSidebarOpen = savedState ? savedState === 'true' : true;

  return <ClientAppLayout initialSidebarOpen={initialSidebarOpen}>{children}</ClientAppLayout>;
}
