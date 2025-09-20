"use client"

import { FormEvent, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BoardPasswordGateProps {
  onSuccess: () => void
  expectedPassword?: string
}

export function BoardPasswordGate({ onSuccess, expectedPassword }: BoardPasswordGateProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!password.trim()) {
      setError("암호 문자를 입력해주세요.")
      return
    }

    if (expectedPassword && password.trim() !== expectedPassword) {
      setError("암호 문자가 일치하지 않습니다.")
      return
    }

    setError(null)
    onSuccess()
  }

  return (
    <div className="space-y-6 rounded-3xl border border-border bg-muted/40 p-10 transition-colors dark:bg-muted/60">
      <header className="space-y-2 text-center">
        <h2 className="text-2xl font-semibold text-foreground">암호문 입력</h2>
        <p className="text-sm text-muted-foreground">보호된 게시글입니다. 암호를 입력해 내용을 확인하세요.</p>
      </header>
      <form onSubmit={handleSubmit} className="mx-auto flex max-w-3xl gap-4">
        <Input
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="암호문자를 입력해라."
          className="h-14 flex-1 rounded-xl text-lg"
        />
        <Button
          type="submit"
          className="h-14 min-w-[120px] rounded-xl text-lg font-semibold"
        >
          확인
        </Button>
      </form>
      {error ? <p className="text-center text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  )
}
