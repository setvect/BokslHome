import { BoardManageListView } from './_components/board-manage-list-view';
import { BOARD_MANAGE_LIST } from './_data/board-list';

export default function BoardAdminPage() {
  return (
    <>
      <header>
        <h1 className="text-3xl font-semibold text-foreground">게시판 관리</h1>
      </header>

      <BoardManageListView boards={BOARD_MANAGE_LIST} />
    </>
  );
}
