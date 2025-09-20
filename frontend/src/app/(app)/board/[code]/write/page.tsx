import { notFound } from "next/navigation"

import { BOARD_CATEGORIES, BOARD_CATEGORY_BY_CODE } from "@/lib/constants/board"
import type { BoardCode } from "@/lib/types/board"

import { BoardEditorTemplate } from "../../_components/board-editor-template"

interface BoardWritePageProps {
  params: {
    code: string
  }
}

export const dynamicParams = false

export function generateStaticParams() {
  return BOARD_CATEGORIES.map((category) => ({ code: category.code }))
}

export default function BoardWritePage({ params }: BoardWritePageProps) {
  const normalizedCode = params.code.toUpperCase() as BoardCode

  if (!BOARD_CATEGORY_BY_CODE[normalizedCode]) {
    notFound()
  }

  return <BoardEditorTemplate code={normalizedCode} />
}
