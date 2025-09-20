import { notFound } from "next/navigation"

import { BOARD_CATEGORY_BY_CODE } from "@/lib/constants/board"
import { BOARD_LIST_MOCK, getMockBoardPost } from "@/lib/mock/data/board"
import type { BoardCode } from "@/lib/types/board"

import { BoardEditorTemplate } from "../../../_components/board-editor-template"

interface BoardEditPageProps {
  params: {
    code: string
    postId: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return BOARD_LIST_MOCK.flatMap((list) =>
    list.posts.map((post) => ({ code: post.code, postId: String(post.id) }))
  )
}

export default function BoardEditPage({ params }: BoardEditPageProps) {
  const normalizedCode = params.code.toUpperCase() as BoardCode
  const postId = Number(params.postId)

  if (!BOARD_CATEGORY_BY_CODE[normalizedCode] || Number.isNaN(postId)) {
    notFound()
  }

  const post = getMockBoardPost(normalizedCode, postId)
  if (!post) {
    notFound()
  }

  return <BoardEditorTemplate code={normalizedCode} postId={postId} />
}
