import { DEFAULT_BOARD_CODE } from "@/lib/constants/board"
import type { BoardCode } from "@/lib/types/board"

import { BoardListTemplate } from "./_components/board-list-template"

export default function BoardPage() {
  const code = DEFAULT_BOARD_CODE.toUpperCase() as BoardCode

  return <BoardListTemplate code={code} />
}
