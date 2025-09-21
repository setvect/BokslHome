import { notFound } from "next/navigation"

import { BOARD_CATEGORY_BY_CODE } from "@/lib/constants/board"
import { getMockBoardPost } from "@/lib/mock/data/board"
import type { BoardCode } from "@/lib/types/board"

import { BoardForm } from "./board-form"

type BoardEditorTemplateProps = {
  code: BoardCode
  postId?: number
}

export async function BoardEditorTemplate({ code, postId }: BoardEditorTemplateProps) {
  const category = BOARD_CATEGORY_BY_CODE[code]

  if (!category) {
    notFound()
  }

  const post = postId ? getMockBoardPost(code, postId) : undefined

  if (postId && !post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{category.name}</h1>
      </header>
      <BoardForm category={category} post={post} mode={post ? "edit" : "create"} />
    </div>
  )
}
