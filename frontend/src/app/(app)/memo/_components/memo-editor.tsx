'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { MemoItem } from '@/lib/types/memo';

type MemoEditorProps = {
  memo?: MemoItem;
  categories: string[];
  mode: 'create' | 'edit';
};

export function MemoEditor({ memo, categories, mode }: MemoEditorProps) {
  const initialCategory = memo?.category ?? categories[0] ?? '';
  const [category, setCategory] = useState(initialCategory);
  const [content, setContent] = useState(memo?.content ?? '');

  const isEdit = mode === 'edit';

  const selectableCategories = useMemo(() => {
    return Array.from(new Set([initialCategory, ...categories].filter(Boolean)));
  }, [categories, initialCategory]);

  return (
    <section className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="memo-editor-category" className="text-sm font-semibold text-muted-foreground">
            카테고리
          </Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="memo-editor-category" className="h-10">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              {selectableCategories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="memo-editor-content" className="text-sm font-semibold text-muted-foreground">
            내용
          </Label>
          <Textarea
            id="memo-editor-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="min-h-[280px]"
            placeholder="메모를 입력하세요."
          />
        </div>
      </div>

      <footer className="flex flex-wrap justify-end gap-2 border-t border-border pt-4">
        <Button variant="outline" asChild className="w-full sm:w-28">
          <Link href="/memo">목록</Link>
        </Button>
        <Button
          variant="destructive"
          className={`w-full sm:w-28 ${isEdit ? '' : 'hidden sm:inline-flex sm:opacity-50 sm:pointer-events-none'}`}
        >
          삭제
        </Button>
        <Button type="button" className="w-full bg-teal-500 text-white hover:bg-teal-600 sm:w-28">
          확인
        </Button>
      </footer>
    </section>
  );
}

