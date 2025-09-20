import { notFound } from "next/navigation"

import { BOARD_CATEGORY_BY_CODE } from "@/lib/constants/board"
import { getMockBoardList } from "@/lib/mock/data/board"
import type { BoardCode } from "@/lib/types/board"

import { BoardListView } from "./board-list-view"

type BoardListTemplateProps = {
  code: string
}

export async function BoardListTemplate({ code }: BoardListTemplateProps) {
  const normalized = code.toUpperCase() as BoardCode
  const category = BOARD_CATEGORY_BY_CODE[normalized]

  if (!category) {
    notFound()
  }

  const list = getMockBoardList(normalized)

  return <BoardListView category={category} list={list} />
}
