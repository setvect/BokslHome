import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import { getBoardDetail } from "../_data/board-details";

const booleanToText = (value: boolean) => (value ? "true" : "false");

export default function BoardDetailPage({
  params,
}: {
  params: { code: string };
}) {
  const detail = getBoardDetail(params.code);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">{detail.name}</h1>
      </div>

      <Card>
        <CardContent className="space-y-6 py-6">
          <div className="space-y-4">
            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                코드
              </span>
              <span className="text-sm font-semibold text-foreground md:text-base">
                {detail.code}
              </span>
            </div>

            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                이름
              </span>
              <span className="text-sm text-foreground md:text-base">
                {detail.name}
              </span>
            </div>

            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                업로드 용량제한
              </span>
              <span className="text-sm text-foreground md:text-base">
                {detail.uploadLimit}
              </span>
            </div>

            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                댓글 사용
              </span>
              <span className="text-sm text-foreground md:text-base">
                {booleanToText(detail.allowComments)}
              </span>
            </div>

            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                파일 업로드
              </span>
              <span className="text-sm text-foreground md:text-base">
                {booleanToText(detail.allowFiles)}
              </span>
            </div>

            <div className="grid gap-2 md:grid-cols-[160px_1fr]">
              <span className="text-sm font-medium text-muted-foreground md:text-base">
                암호화 글
              </span>
              <span className="text-sm text-foreground md:text-base">
                {booleanToText(detail.allowEncryptedPosts)}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 border-t bg-muted/30 p-6 sm:flex-row sm:items-center sm:justify-between">
          <Button variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/board-manage">목록</Link>
          </Button>
          <div className="flex w-full justify-end gap-2 sm:w-auto">
            <Button variant="secondary" asChild className="w-full sm:w-auto">
              <Link href={`/board-manage/${detail.code}/edit`}>수정</Link>
            </Button>
            <Button variant="destructive" className="w-full sm:w-auto">
              삭제
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

