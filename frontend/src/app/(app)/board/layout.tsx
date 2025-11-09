import type { ReactNode } from 'react';

export const dynamic = 'force-static';

export default function BoardLayout({ children }: { children: ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}
