'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { MemoItem } from '@/lib/types/memo';

type MemoListViewProps = {
  items: MemoItem[];
  categories: string[];
};

export function MemoListView({ items, categories }: MemoListViewProps) {
  const initialCategory = categories[0] ?? '';
  const [category, setCategory] = useState(initialCategory);
  const [keyword, setKeyword] = useState('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const categoryMatch = category ? item.category === category : true;
      const keywordMatch = keyword.trim().length === 0 ? true : item.content.toLowerCase().includes(keyword.trim().toLowerCase());
      return categoryMatch && keywordMatch;
    });
  }, [category, items, keyword]);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-10 w-40">
            <SelectValue placeholder="카테고리" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input value={keyword} onChange={(event) => setKeyword(event.target.value)} placeholder="검색어" className="h-10 flex-1 min-w-[200px]" />

        <Button type="button" className="h-10 bg-sky-500 text-white hover:bg-sky-600">
          검색
        </Button>

        <Button asChild type="button" className="h-10 bg-teal-500 text-white hover:bg-teal-600">
          <Link href="/memo/create">만들기</Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-16 text-center">#</TableHead>
              <TableHead>내용</TableHead>
              <TableHead className="w-32 text-center">수정일</TableHead>
              <TableHead className="w-24 text-center">삭제</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.id} className="text-sm">
                <TableCell className="text-center font-semibold text-muted-foreground">{item.id}</TableCell>
                <TableCell>
                  <Link href={`/memo/${item.id}`} className="text-sky-600 hover:underline">
                    {item.content}
                  </Link>
                </TableCell>
                <TableCell className="text-center text-muted-foreground">{item.updatedAt}</TableCell>
                <TableCell className="text-center">
                  <button type="button" className="text-sky-600 hover:underline">
                    삭제
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}

