import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import type { BoardCategory, BoardPostMock } from "@/lib/types/board"

type BoardTableProps = {
  category: BoardCategory
  posts: BoardPostMock[]
  page: number
  pageSize: number
  totalCount: number
}

export function BoardTable({ category, posts, page, pageSize, totalCount }: BoardTableProps) {
  if (totalCount === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
        게시글이 없습니다.
      </div>
    )
  }

  const startNumber = totalCount - (page - 1) * pageSize

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">#</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-40 text-center">날짜</TableHead>
            <TableHead className="w-32 text-center">기능</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post, index) => {
            const number = startNumber - index
            const detailHref = `/board/${category.code}/${post.id}`
            return (
              <TableRow key={post.id} className="transition-colors hover:bg-muted/60 dark:hover:bg-muted/30">
                <TableCell className="text-center text-sm text-muted-foreground">
                  {number}
                </TableCell>
                <TableCell>
                  <Link
                    href={detailHref}
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <span>{post.title}</span>
                    {post.isEncrypted ? (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
                        암호화
                      </span>
                    ) : null}
                  </Link>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground">
                  {post.createdAt}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Link
                      href={`${detailHref}/edit`}
                      className="text-primary hover:underline"
                    >
                      수정
                    </Link>
                    <span className="text-muted-foreground/40">|</span>
                    <button
                      type="button"
                      className={cn(
                        "text-destructive transition-colors hover:text-destructive/80"
                      )}
                    >
                      삭제
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
