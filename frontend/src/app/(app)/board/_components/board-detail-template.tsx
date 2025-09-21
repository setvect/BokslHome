import { notFound } from "next/navigation"

import { BOARD_CATEGORY_BY_CODE } from "@/lib/constants/board"
import { getMockBoardPost } from "@/lib/mock/data/board"
import type { BoardCode } from "@/lib/types/board"

import { BoardDetailView } from "./board-detail-view"

type BoardDetailTemplateProps = {
  code: BoardCode
  postId: number
}

export async function BoardDetailTemplate({ code, postId }: BoardDetailTemplateProps) {
  const category = BOARD_CATEGORY_BY_CODE[code]
  const post = getMockBoardPost(code, postId)

  if (!category || !post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
      </header>
      <section className="rounded-3xl border border-border bg-card p-6 shadow-sm transition-colors">
        <BoardDetailView category={category} post={post} />
      </section>
    </div>
  )
}
