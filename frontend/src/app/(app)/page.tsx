'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Trash2 } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { createComment, deleteComment, getCommentPage } from '@/lib/api/comment-api-client';
import type { CommentPageResponse, CommentResponse } from '@/lib/types/comment';
import { formatRelativeDate } from '@/lib/utils/date';

const MAIN_MODULE = {
  module: 'MAIN' as const,
  moduleId: '1',
};

const PAGE_SIZE = 10;

export default function HomePage() {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [pageInfo, setPageInfo] = useState({
    number: 0,
    size: PAGE_SIZE,
    totalElements: 0,
    totalPages: 0,
  });
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CommentResponse | null>(null);
  const [deleting, setDeleting] = useState(false);

  const loadComments = async (page = 0, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      const response: CommentPageResponse = await getCommentPage({
        ...MAIN_MODULE,
        page,
        size: PAGE_SIZE,
      });

      setPageInfo(response.page);

      if (append) {
        setComments((prev) => {
          const existingIds = new Set(prev.map((c) => c.commentSeq));
          const merged = [...prev, ...response.content.filter((c) => !existingIds.has(c.commentSeq))];
          return merged;
        });
      } else {
        setComments(response.content);
      }
    } catch (error) {
      console.error('Failed to load comments', error);
    } finally {
      if (append) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadComments();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newComment.trim();
    if (!trimmed) {
      return;
    }

    try {
      setSubmitting(true);
      const created = await createComment({ content: trimmed }, MAIN_MODULE.module, MAIN_MODULE.moduleId);
      setComments((prev) => [created, ...prev]);
      setPageInfo((prev) => {
        const totalElements = prev.totalElements + 1;
        const totalPages = Math.max(prev.totalPages, Math.ceil(totalElements / prev.size));
        return { ...prev, totalElements, totalPages };
      });
      setNewComment('');
    } catch (error) {
      console.error('Failed to create comment', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: number) => {
    try {
      setDeleting(true);
      await deleteComment(commentId);
      setComments((prev) => prev.filter((comment) => comment.commentSeq !== commentId));
      setPageInfo((prev) => {
        const totalElements = Math.max(prev.totalElements - 1, 0);
        const totalPages = Math.max(Math.ceil(totalElements / prev.size), 0);
        return { ...prev, totalElements, totalPages };
      });
    } catch (error) {
      console.error('Failed to delete comment', error);
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const hasMore = !loading && comments.length < pageInfo.totalElements;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4">
      <h1 className="text-5xl font-semibold tracking-tight text-slate-700 dark:text-slate-100">내 사랑 복슬이</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 rounded-xl border border-border bg-card/80 p-5 shadow-sm sm:flex-row sm:items-start"
      >
        <Textarea
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="써라"
          className="min-h-[80px] flex-1 text-base"
          disabled={submitting}
        />
        <Button type="submit" className="h-12 px-6 sm:h-[52px] sm:min-w-[96px]" disabled={submitting}>
          {submitting ? '등록 중...' : '확인'}
        </Button>
      </form>

      <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        {loading ? (
          <div className="px-5 py-8 text-center text-muted-foreground">댓글을 불러오는 중...</div>
        ) : comments.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted-foreground">아직 댓글이 없습니다.</div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.commentSeq}
              className="flex flex-col gap-3 border-t border-border/70 px-5 py-4 first:border-0 sm:flex-row sm:items-start sm:gap-6"
            >
              <p className="flex-1 whitespace-pre-line text-base leading-relaxed text-foreground">{comment.content}</p>
              <div className="flex items-center gap-3 text-sm text-muted-foreground sm:justify-end">
                <span className="font-medium">{formatRelativeDate(comment.regDate)}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="댓글 삭제"
                  onClick={() => setDeleteTarget(comment)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {hasMore && (
        <Button
          variant="outline"
          className="w-full justify-center"
          disabled={loadingMore}
          onClick={() => loadComments(pageInfo.number + 1, true)}
        >
          {loadingMore ? '불러오는 중...' : `더 보기 (${comments.length}/${pageInfo.totalElements || comments.length})`}
        </Button>
      )}

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="댓글을 삭제할까요?"
        confirmLabel={deleting ? '삭제 중...' : '삭제'}
        cancelLabel="취소"
        onConfirm={() => {
          if (deleteTarget) {
            handleDelete(deleteTarget.commentSeq);
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
