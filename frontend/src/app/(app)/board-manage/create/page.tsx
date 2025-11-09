'use client';

import { BoardForm } from '../_components/board-form';

export default function BoardCreatePage() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold text-foreground">게시판 만들기</h1>
      </header>

      <BoardForm mode="create" />
    </>
  );
}
