"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { HtmlEditor } from "@/components/ui/html-editor"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { BoardAttachmentMock, BoardCategory, BoardPostMock } from "@/lib/types/board"

import { BoardAttachmentList } from "./board-attachment-list"

type BoardFormMode = "create" | "edit"

type BoardFormProps = {
  category: BoardCategory
  post?: BoardPostMock
  mode: BoardFormMode
}

export function BoardForm({ category, post, mode }: BoardFormProps) {
  const router = useRouter()

  const [title, setTitle] = useState(post?.title ?? "")
  const [content, setContent] = useState(post?.content ?? "")
  const [password, setPassword] = useState(post?.password ?? "")
  const [attachments, setAttachments] = useState<BoardAttachmentMock[]>(post?.attachments ?? [])

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    const mapped = files.map((file, index) => ({
      id: `${file.name}-${index}`,
      filename: file.name,
      size: file.size,
    }))
    setAttachments(mapped)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // 후속 API 연동 전까지는 콘솔/알림으로 확인만 한다.
    console.info("게시판 폼 제출", {
      code: category.code,
      mode,
      title,
      content,
      password,
      attachments,
    })
    router.back()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <Input
            id="board-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="게시글 제목을 입력하세요"
            className="h-12 rounded-xl text-lg"
          />
        </div>

        <div className="space-y-2">
          <HtmlEditor value={content} onChange={setContent} height="360px" />
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
        {category.allowEncryptedPosts ? (
          <div className="space-y-2">
            <Label htmlFor="board-password" className="text-sm font-medium text-foreground">
              암호 문자열
            </Label>
            <Input
              id="board-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="암호를 입력하면 암호 게시글로 저장됩니다"
              className="h-11 rounded-xl"
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <Label htmlFor="board-attachments" className="text-sm font-medium text-foreground">
            첨부파일
          </Label>
          <Input
            id="board-attachments"
            type="file"
            multiple
            onChange={handleAttachmentChange}
            className="h-11 w-full rounded-xl text-sm"
          />
          <BoardAttachmentList attachments={attachments} />
        </div>
      </section>

      <footer className="flex flex-col-reverse gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
        <Button
          asChild
          variant="outline"
          className="h-12 min-w-[120px] rounded-xl px-6 text-base font-semibold"
        >
          <Link href={`/board/${category.code}`}>취소</Link>
        </Button>
        <div className="flex gap-3">
          <Button
            type="submit"
            className="h-12 min-w-[120px] rounded-xl text-base font-semibold"
          >
            확인
          </Button>
        </div>
      </footer>
    </form>
  )
}
