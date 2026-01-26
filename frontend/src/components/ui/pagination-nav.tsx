'use client';

import { useMemo } from 'react';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

const DOTS = '…';

type PaginationNavProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
  siblingCount?: number;
  getHref?: (page: number) => string;
  className?: string;
  disabled?: boolean;
};

export function PaginationNav({
  page,
  pageSize,
  total,
  onPageChange,
  siblingCount = 1,
  getHref,
  className,
  disabled = false,
}: PaginationNavProps) {
  const paginationRange = usePaginationRange({
    currentPage: page,
    totalCount: total,
    pageSize,
    siblingCount,
  });

  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const canGoPrevious = page > 1 && !disabled;
  const canGoNext = page < pageCount && !disabled;

  function handleChange(targetPage: number) {
    if (targetPage === page || targetPage < 1 || targetPage > pageCount) {
      return;
    }
    if (disabled) {
      return;
    }
    onPageChange?.(targetPage);
  }

  const prevHref = getHref?.(page - 1) ?? '#';
  const nextHref = getHref?.(page + 1) ?? '#';

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={prevHref}
            aria-disabled={!canGoPrevious}
            onClick={(event) => {
              if (!canGoPrevious) {
                event.preventDefault();
                return;
              }
              if (onPageChange) {
                event.preventDefault();
                handleChange(page - 1);
              }
            }}
          />
        </PaginationItem>

        {paginationRange.map((item, index) => {
          if (item === DOTS) {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const targetPage = item as number;
          const href = getHref?.(targetPage) ?? '#';

          return (
            <PaginationItem key={targetPage}>
              <PaginationLink
                href={href}
                isActive={targetPage === page}
                aria-current={targetPage === page ? 'page' : undefined}
                onClick={(event) => {
                  if (onPageChange) {
                    event.preventDefault();
                    handleChange(targetPage);
                  }
                }}
              >
                {targetPage}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href={nextHref}
            aria-disabled={!canGoNext}
            onClick={(event) => {
              if (!canGoNext) {
                event.preventDefault();
                return;
              }
              if (onPageChange) {
                event.preventDefault();
                handleChange(page + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

type PaginationRangeConfig = {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
};

function usePaginationRange({ totalCount, pageSize, siblingCount, currentPage }: PaginationRangeConfig) {
  return useMemo(() => {
    const totalPageCount = Math.max(1, Math.ceil(totalCount / pageSize));
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [1, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPageCount];
    }

    return range(1, totalPageCount);
  }, [totalCount, pageSize, siblingCount, currentPage]);
}

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

type PaginationInfoProps = {
  page: number;
  pageSize: number;
  total: number;
  className?: string;
  label?: string;
};

export function PaginationInfo({ page, pageSize, total, className, label }: PaginationInfoProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className={cn('text-sm text-muted-foreground', className)}>
      {label ? <span className="mr-2 text-foreground font-medium">{label}</span> : null}
      {total.toLocaleString()}건 중 {start.toLocaleString()}–{end.toLocaleString()} 표시 (페이지 {page}/{pageCount})
    </div>
  );
}
