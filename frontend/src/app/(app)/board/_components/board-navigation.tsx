'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BOARD_CATEGORIES } from '@/lib/constants/board';
import { cn } from '@/lib/utils';

export function BoardNavigation() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {BOARD_CATEGORIES.map((category) => {
        const href = `/board/${category.code}`;
        const isActive = pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={category.code}
            href={href}
            className={cn(
              'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
              'border-border/70 bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              isActive && 'border-primary/60 bg-primary/10 text-primary dark:bg-primary/20'
            )}
          >
            {category.name}
          </Link>
        );
      })}
    </nav>
  );
}
