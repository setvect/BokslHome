import { EditorView } from '@codemirror/view';
import { defaultKeymap, redo, undo } from '@codemirror/commands';
import { indentWithTab } from '@codemirror/commands';

// 실행 취소/다시 실행 단축키
const customHistoryKeymap = [
  { key: 'Mod-z', run: undo },
  { key: 'Mod-y', run: redo },
  { key: 'Mod-Shift-z', run: redo }
];

// 마크다운 단축키
const markdownKeymap = [
  // 굵게: Ctrl+B
  {
    key: 'Mod-b',
    run: (view: EditorView) => applyShortcut(view, '**', '**')
  },
  // 기울임: Ctrl+I
  {
    key: 'Mod-i',
    run: (view: EditorView) => applyShortcut(view, '_', '_')
  },
  // 코드: Ctrl+K
  {
    key: 'Mod-k',
    run: (view: EditorView) => applyShortcut(view, '`', '`')
  },
  // 취소선: Ctrl+Delete
  {
    key: 'Mod-Delete',
    run: (view: EditorView) => {
      const selection = view.state.selection.main;
      const text = view.state.sliceDoc(selection.from, selection.to);
      if (!text) return false;
      return applyShortcut(view, '~~', '~~');
    }
  }
];

// 단축키 적용을 위한 헬퍼 함수
function applyShortcut(view: EditorView, prefix: string, suffix: string) {
  const selection = view.state.selection.main;
  const text = view.state.sliceDoc(selection.from, selection.to);
  const isApplied = text.startsWith(prefix) && text.endsWith(suffix);
  view.dispatch({
    changes: {
      from: selection.from,
      to: selection.to,
      insert: isApplied ? text.slice(prefix.length, -suffix.length) : prefix + text + suffix
    }
  });
  return true;
}

// 모든 단축키를 하나의 배열로 결합
export const allKeymaps = [...defaultKeymap, ...customHistoryKeymap, ...markdownKeymap, indentWithTab];
