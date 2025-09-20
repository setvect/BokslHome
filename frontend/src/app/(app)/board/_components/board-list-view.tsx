"use client"

import { useMemo, useState } from "react"

import { PaginationInfo, PaginationNav } from "@/components/ui/pagination-nav"
import type { BoardCategory, BoardListMock, BoardPostMock } from "@/lib/types/board"

import { BoardListFilterBar } from "./board-list-filter-bar"
import { BoardTable } from "./board-table"

type BoardListViewProps = {
  category: BoardCategory
  list: BoardListMock
}

export function BoardListView({ category, list }: BoardListViewProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * list.pageSize
    return (list.posts ?? []).slice(startIndex, startIndex + list.pageSize)
  }, [currentPage, list.pageSize, list.posts])

  function handlePageChange(page: number) {
    setCurrentPage(page)
  }

  function handleSearch(_field: string, _keyword: string) {
    // UI 전용 목업이므로 검색은 나중에 백엔드 연동 시 구현한다.
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
      <section className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors">
        <BoardListFilterBar category={category} onSearch={handleSearch} />
        <BoardTable
          category={category}
          posts={paginatedPosts as BoardPostMock[]}
          page={currentPage}
          pageSize={list.pageSize}
          totalCount={list.totalCount}
        />
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <PaginationNav
            page={currentPage}
            total={list.totalCount}
            pageSize={list.pageSize}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  )
}
