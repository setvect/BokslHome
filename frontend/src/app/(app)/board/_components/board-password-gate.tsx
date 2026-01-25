'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface BoardPasswordGateProps {
  onPasswordSubmit: (decryptKey: string) => Promise<void>;
  isLoading?: boolean;
  listUrl: string;
}

export function BoardPasswordGate({ onPasswordSubmit, isLoading, listUrl }: BoardPasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!password.trim()) {
      setError('암호 문자를 입력해주세요.');
      return;
    }

    setError(null);
    await onPasswordSubmit(password.trim());
  }

  return (
    <div className="space-y-6 rounded-3xl border border-border bg-card p-10 shadow-sm transition-colors">
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
          disabled={isLoading}
        />
        <Button type="submit" className="h-14 min-w-[120px] rounded-xl text-lg font-semibold" disabled={isLoading}>
          {isLoading ? '확인 중...' : '확인'}
        </Button>
      </form>
      {error ? <p className="text-center text-sm font-medium text-destructive">{error}</p> : null}

      <div className="flex justify-center pt-4">
        <Button variant="outline" asChild className="w-full max-w-xs sm:w-28">
          <Link href={listUrl}>목록</Link>
        </Button>
      </div>
    </div>
  );
}
