import { redirect } from "next/navigation"

import { DEFAULT_BOARD_CODE } from "@/lib/constants/board"

export default function BoardPage() {
  redirect(`/board/${DEFAULT_BOARD_CODE}`)
}
