import { keymap } from '@codemirror/view';
import { undo, redo } from '@codemirror/commands';
import type { Extension } from '@codemirror/state';
import type { EditorView } from '@codemirror/view';

// 커스텀 히스토리 키맵
const customHistoryKeymap = keymap.of([
  { key: 'Mod-z', run: undo },
  { key: 'Mod-y', run: redo },
  { key: 'Mod-Shift-z', run: redo }
]);

// 마크다운 토글 헬퍼 함수
function toggleMarkdown(view: EditorView, prefix: string, suffix: string): boolean {
  const { main } = view.state.selection;
  const doc = view.state.doc;

  // 선택 영역 앞뒤로 마크다운 문법이 있는지 확인
  const beforeText = doc.sliceString(Math.max(0, main.from - prefix.length), main.from);
  const afterText = doc.sliceString(main.to, Math.min(doc.length, main.to + suffix.length));

  // 이미 마크다운 문법이 적용되어 있는지 확인
  const isApplied = beforeText === prefix && afterText === suffix;

  if (isApplied) {
    // 마크다운 문법 제거
    view.dispatch({
      changes: [
        { from: main.from - prefix.length, to: main.from, insert: '' },
        { from: main.to, to: main.to + suffix.length, insert: '' }
      ],
      selection: {
        anchor: main.from - prefix.length,
        head: main.to - prefix.length
      }
    });
  } else {
    // 마크다운 문법 추가
    view.dispatch({
      changes: [
        { from: main.from, insert: prefix },
        { from: main.to, insert: suffix }
      ],
      selection: {
        anchor: main.from + prefix.length,
        head: main.to + prefix.length
      }
    });
  }

  return true;
}

// 마크다운 키맵
const markdownKeymap = keymap.of([
  {
    key: 'Mod-b',
    run: (view: EditorView) => toggleMarkdown(view, '**', '**')
  },
  {
    key: 'Mod-i',
    run: (view: EditorView) => toggleMarkdown(view, '*', '*')
  },
  {
    key: 'Mod-k',
    run: (view: EditorView) => toggleMarkdown(view, '`', '`')
  },
  {
    key: 'Mod-d',
    run: (view: EditorView) => toggleMarkdown(view, '~~', '~~')
  }
]);

// 모든 키맵을 하나의 배열로 결합
export const allKeymaps: Extension[] = [customHistoryKeymap, markdownKeymap];
