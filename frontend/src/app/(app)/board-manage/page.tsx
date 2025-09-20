"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaginationInfo, PaginationNav } from "@/components/ui/pagination-nav";
import { BoardDeleteDialog } from "./_components/board-delete-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const searchFields = [
  { label: "이름", value: "name" },
  { label: "코드", value: "code" },
];

const boardList = [
  { code: "BDAAAA00", name: "메인화면" },
  { code: "BDAAAA01", name: "글" },
  { code: "BDAAAA02", name: "책" },
  { code: "BDAAAA03", name: "음악" },
  { code: "BDAAAA04", name: "영화" },
  { code: "BDAAAA05", name: "사진" },
  { code: "BDAAAA06", name: "기억" },
  { code: "BDAAAA07", name: "인연" },
  { code: "BDAAAA08", name: "잡담" },
  { code: "BDAAAA09", name: "꿈" },
];

export default function BoardAdminPage() {
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const totalCount = boardList.length;

  const paginatedBoards = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    return boardList.slice(startIndex, startIndex + pageSize);
  }, [page]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">게시판 관리</h1>
      </div>

      <Card>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid w-full gap-4 sm:grid-cols-[150px_minmax(220px,1fr)_auto] sm:items-end">
              <div className="space-y-2">
                <Select defaultValue={searchFields[0].value}>
                  <SelectTrigger id="board-search-field" className="w-full">
                    <SelectValue placeholder="검색 항목" />
                  </SelectTrigger>
                  <SelectContent>
                    {searchFields.map((field) => (
                      <SelectItem key={field.value} value={field.value}>
                        {field.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="board-search-input" className="sr-only">
                  검색어
                </Label>
                <Input
                  id="board-search-input"
                  placeholder="검색어"
                  className="h-10"
                />
              </div>
              <Button type="button" className="sm:self-end">
                검색
              </Button>
            </div>
            <Button
              type="button"
              variant="secondary"
              className="sm:w-auto lg:self-end"
              asChild
            >
              <Link href="/board-manage/create">만들기</Link>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[140px]">코드</TableHead>
                  <TableHead className="min-w-[120px]">바로가기</TableHead>
                  <TableHead>게시판 이름</TableHead>
                  <TableHead className="min-w-[160px] text-right">
                    기능
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedBoards.map((board) => {
                  const detailPath = `/board-manage/${board.code}`;
                  return (
                    <TableRow key={board.code}>
                      <TableCell className="font-medium">
                        <Link
                          href={detailPath}
                          className="text-primary hover:underline"
                        >
                          {board.code}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="h-auto px-0" asChild>
                          <Link href={detailPath}>바로가기</Link>
                        </Button>
                      </TableCell>
                      <TableCell>{board.name}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="link" className="h-auto px-0" asChild>
                            <Link href={`/board-manage/${board.code}/edit`}>수정</Link>
                          </Button>
                          <BoardDeleteDialog
                            boardName={board.name}
                            trigger={
                              <Button
                                variant="link"
                                className="h-auto px-0 text-destructive"
                              >
                                삭제
                              </Button>
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 pt-2 lg:flex-row lg:items-center lg:justify-between">
            <PaginationNav
              page={page}
              total={totalCount}
              pageSize={pageSize}
              onPageChange={setPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
