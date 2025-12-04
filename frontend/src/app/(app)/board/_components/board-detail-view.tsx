'use client';

import Link from 'next/link';
import { useRouter, type ReadonlyURLSearchParams } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { deleteBoardArticle, getAttachmentDownloadUrl } from '@/lib/api/board-article-api-client';
import type { BoardArticleResponse } from '@/lib/types/board-article-api';
import type { BoardCategory } from '@/lib/types/board';

import { BoardPasswordGate } from './board-password-gate';

type BoardDetailViewProps = {
  category: BoardCategory;
  article: BoardArticleResponse;
  searchParams: ReadonlyURLSearchParams;
};

export function BoardDetailView({ category, article, searchParams }: BoardDetailViewProps) {
  const router = useRouter();
  const [unlocked, setUnlocked] = useState(!article.encryptF);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  if (!unlocked) {
    return <BoardPasswordGate expectedPassword="" onSuccess={() => setUnlocked(true)} />;
  }

  // Build query string to preserve search params
  const buildQueryString = () => {
    const params = new URLSearchParams();
    const searchType = searchParams.get('searchType');
    const word = searchParams.get('word');
    const page = searchParams.get('page');

    if (searchType) params.set('searchType', searchType);
    if (word) params.set('word', word);
    if (page) params.set('page', page);

    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
  };

  const queryString = buildQueryString();
  const listHref = `/board/${category.code}${queryString}`;

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteBoardArticle(article.boardArticleSeq);
      // Navigate back to list page with cleared search params
      router.push(`/board/${category.code}`);
    } catch (err) {
      console.error('Failed to delete article:', err);
      alert('게시글 삭제에 실패했습니다.');
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      <section className="rounded-3xl border border-border bg-card shadow-sm transition-colors">
        <div className="space-y-6 p-6">
          <header className="flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-foreground">{article.title}</h2>
            </div>
            <div className="text-right text-sm text-muted-foreground">
              <span className="font-medium text-foreground">등록일:</span>{' '}
              {(() => {
                const date = new Date(article.regDate);
                return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
              })()}
            </div>
          </header>

          <article
            className="prose prose-sm max-w-none rounded-3xl bg-muted/40 p-8 text-foreground transition-colors dark:bg-muted/60 dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.attachFileList && article.attachFileList.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">첨부파일</h3>
              <div className="space-y-2">
                {article.attachFileList.map((file) => (
                  <div
                    key={file.attachFileSeq}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">{file.originalName}</span>
                      <span className="text-xs text-muted-foreground">
                        ({(file.size / 1024).toFixed(2)} KB)
                      </span>
                    </div>
                    <a
                      href={getAttachmentDownloadUrl(article.boardArticleSeq, file.attachFileSeq)}
                      download
                      className="text-sm text-primary hover:underline"
                    >
                      다운로드
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <footer className="flex flex-col gap-3 border-t border-border bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href={listHref}>목록</Link>
          </Button>
          <div className="flex w-full justify-end gap-2 sm:w-auto">
            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <Link href={`/board/${category.code}/${article.boardArticleSeq}/edit${queryString}`}>수정</Link>
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="w-full sm:w-auto"
              onClick={() => setShowDeleteDialog(true)}
            >
              삭제
            </Button>
          </div>
        </footer>
      </section>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold text-foreground">게시글 삭제</h3>
            <p className="mb-6 text-sm text-muted-foreground">이 게시글을 삭제하시겠습니까?</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)} disabled={isDeleting}>
                취소
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? '삭제 중...' : '삭제'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
