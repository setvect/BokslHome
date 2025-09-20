"use client";

import { BoardForm } from "../_components/board-form";

export default function BoardCreatePage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">게시판 만들기</h1>
      </div>

      <BoardForm mode="create" />
    </div>
  );
}

