'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { createBoardManager } from '@/lib/api/board-manage-api-client';

import { BoardForm, type BoardFormValues } from '../_components/board-manage-form';

export default function BoardCreatePage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const PAGE_TITLE = '게시판 관리';

  const handleSubmit = async (values: BoardFormValues) => {
    try {
      // Convert form values to API format
      await createBoardManager({
        boardCode: values.code,
        name: values.name,
        uploadLimit: Number(values.uploadLimit),
        replyF: false, // Not in form, default to false
        commentF: values.allowComments === 'yes',
        attachF: values.allowFiles === 'yes',
        encryptF: values.allowEncryptedPosts === 'yes',
        deleteF: false,
      });

      // Navigate to list page on success
      router.push('/board-manage');
    } catch (err) {
      console.error('Failed to create board:', err);
      setError(err instanceof Error ? err.message : '게시판 생성에 실패했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-semibold text-foreground">{PAGE_TITLE}</h1>
      </header>

      {error && (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <BoardForm mode="create" onSubmit={handleSubmit} />
    </div>
  );
}
