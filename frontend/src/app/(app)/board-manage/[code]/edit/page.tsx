import { BoardForm } from "../../_components/board-form";
import { getBoardDetail } from "../../_data/board-details";

const toYesNo = (value: boolean) => (value ? "yes" : "no");

export default function BoardEditPage({
  params,
}: {
  params: { code: string };
}) {
  const detail = getBoardDetail(params.code);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">게시판 수정</h1>
      </div>

      <BoardForm
        mode="edit"
        submitLabel="저장"
        initialValues={{
          code: detail.code,
          name: detail.name,
          uploadLimit: String(detail.uploadLimit ?? ""),
          allowComments: toYesNo(detail.allowComments),
          allowFiles: toYesNo(detail.allowFiles),
          allowEncryptedPosts: toYesNo(detail.allowEncryptedPosts),
        }}
      />
    </div>
  );
}

