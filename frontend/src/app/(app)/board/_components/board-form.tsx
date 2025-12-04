'use client';

import Link from 'next/link';
import { useRouter, type ReadonlyURLSearchParams } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';

import { ContentEditorSwitcher, type ContentEditorType } from '@/components/editor/content-editor-switcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createBoardArticle, updateBoardArticle } from '@/lib/api/board-article-api-client';
import type { BoardArticleResponse } from '@/lib/types/board-article-api';
import type { BoardCategory } from '@/lib/types/board';

type BoardFormMode = 'create' | 'edit';

type BoardFormProps = {
  category: BoardCategory;
  article?: BoardArticleResponse;
  mode: BoardFormMode;
  searchParams?: ReadonlyURLSearchParams;
};

export function BoardForm({ category, article, mode, searchParams }: BoardFormProps) {
  const router = useRouter();

  const initialEditorType: ContentEditorType = 'markdown';

  const [title, setTitle] = useState(article?.title ?? '');
  const [content, setContent] = useState(article?.content ?? '');
  const [password, setPassword] = useState('');
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [deleteAttachFileSeqList, setDeleteAttachFileSeqList] = useState<number[]>([]);
  const [editorType, setEditorType] = useState<ContentEditorType>(initialEditorType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleAttachmentChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    setNewFiles(files);
  }

  function handleRemoveExistingAttachment(attachFileSeq: number) {
    setDeleteAttachFileSeqList((prev) => [...prev, attachFileSeq]);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Build request object based on mode
      const request: any = {
        title,
        content,
        encryptF: !!password,
      };

      // Add boardCode only for create mode
      if (mode === 'create') {
        request.boardCode = category.code;
      }

      // Add password if provided
      if (password) {
        request.password = password;
      }

      // Add deleteAttachFileSeqList only for edit mode
      if (mode === 'edit' && deleteAttachFileSeqList.length > 0) {
        request.deleteAttachFileSeqList = deleteAttachFileSeqList;
      }

      if (mode === 'create') {
        await createBoardArticle(request, newFiles);
      } else if (article) {
        await updateBoardArticle(article.boardArticleSeq, request, newFiles);
      }

      // Navigate back to list page with cleared search params
      router.push(`/board/${category.code}`);
    } catch (err) {
      console.error('Failed to submit form:', err);

      // Extract error message from API error
      let errorMessage = '게시글 저장에 실패했습니다.';
      if (err instanceof Error) {
        errorMessage = err.message;
        // If it's an ApiError with data, try to extract the message
        if ((err as any).data) {
          const errorData = (err as any).data;
          if (typeof errorData === 'string') {
            errorMessage = errorData;
          } else if (errorData.message) {
            errorMessage = errorData.message;
          } else if (errorData.error) {
            errorMessage = errorData.error;
          }
        }
      }

      setError(errorMessage);
      setIsSubmitting(false);
    }
  }

  // Build query string to preserve search params
  const buildQueryString = () => {
    if (!searchParams) return '';

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
  const cancelHref = mode === 'edit' && article
    ? `/board/${category.code}/${article.boardArticleSeq}${queryString}`
    : `/board/${category.code}${queryString}`;

  // Filter out deleted attachments
  const existingAttachments = article?.attachFileList?.filter(
    (file) => !deleteAttachFileSeqList.includes(file.attachFileSeq)
  ) ?? [];

  return (
    <>
      {error && (
        <div className="rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-3xl border border-border bg-card shadow-sm transition-colors">
          <div className="space-y-6 p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="board-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="게시글 제목을 입력하세요"
                  className="text-base h-10"
                  required
                />
              </div>

              <ContentEditorSwitcher
                id="board-content"
                value={content}
                onChange={setContent}
                editorType={editorType}
                onEditorTypeChange={setEditorType}
                height="360px"
              />
            </div>

            {category.allowEncryptedPosts ? (
              <div className="space-y-2">
                <Label htmlFor="board-password" className="text-sm font-medium text-foreground">
                  암호 문자열
                </Label>
                <Input
                  id="board-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="암호를 입력하면 암호 게시글로 저장됩니다"
                />
              </div>
            ) : null}

            {category.allowFiles && (
              <div className="space-y-2">
                <Label htmlFor="board-attachments" className="text-sm font-medium text-foreground">
                  첨부파일
                </Label>
                <Input
                  id="board-attachments"
                  type="file"
                  multiple
                  onChange={handleAttachmentChange}
                  className="w-full text-sm h-10"
                />

                {/* Existing attachments (edit mode) */}
                {mode === 'edit' && existingAttachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">기존 첨부파일</p>
                    {existingAttachments.map((file) => (
                      <div
                        key={file.attachFileSeq}
                        className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{file.originalName}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingAttachment(file.attachFileSeq)}
                          className="text-xs text-destructive hover:underline"
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* New files */}
                {newFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">새 첨부파일</p>
                    {newFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-2"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(2)} KB)
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <footer className="border-t border-border bg-muted/30 p-6">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button variant="outline" asChild className="w-full sm:w-auto" disabled={isSubmitting}>
                <Link href={cancelHref}>취소</Link>
              </Button>
              <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
                {isSubmitting ? '저장 중...' : '확인'}
              </Button>
            </div>
          </footer>
        </section>
      </form>
    </>
  );
}
