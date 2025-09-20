'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { BoardCategory } from '@/lib/types/board';

const SEARCH_FIELDS = [
  { label: '제목', value: 'title' },
  { label: '내용', value: 'content' },
];

type BoardListFilterBarProps = {
  category: BoardCategory;
  onSearch?: (field: string, keyword: string) => void;
};

export function BoardListFilterBar({
  category,
  onSearch,
}: BoardListFilterBarProps) {
  const [field, setField] = useState(SEARCH_FIELDS[0].value);
  const [keyword, setKeyword] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch?.(field, keyword);
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <form
        onSubmit={handleSubmit}
        className="grid w-full gap-4 sm:grid-cols-[150px_minmax(220px,1fr)_auto] sm:items-end"
      >
        <div className="flex flex-col gap-0">
          <Label htmlFor="board-search-field" className="sr-only">
            검색 항목
          </Label>
          <Select value={field} onValueChange={setField}>
            <SelectTrigger id="board-search-field" className="h-10 w-full">
              <SelectValue placeholder="검색 항목" />
            </SelectTrigger>
            <SelectContent>
              {SEARCH_FIELDS.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-0">
          <Label htmlFor="board-search-input" className="sr-only">
            검색어
          </Label>
          <Input
            id="board-search-input"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="검색어"
            className="h-10"
          />
        </div>
        <Button type="submit" className="h-10 px-6 sm:self-end">
          검색
        </Button>
      </form>

      <Button
        asChild
        variant="secondary"
        className="h-10 px-6 sm:w-auto lg:self-end"
      >
        <Link href={`/board/${category.code}/write`}>만들기</Link>
      </Button>
    </div>
  );
}
