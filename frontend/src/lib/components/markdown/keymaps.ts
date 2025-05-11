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

// 마크다운 키맵
const markdownKeymap = keymap.of([
  {
    key: 'Mod-b',
    run: (view: EditorView) => {
      const { main } = view.state.selection;
      const text = view.state.sliceDoc(main.from, main.to);
      view.dispatch({
        changes: { from: main.from, to: main.to, insert: `**${text}**` },
        selection: { anchor: main.from + 2, head: main.to + 2 }
      });
      return true;
    }
  },
  {
    key: 'Mod-i',
    run: (view: EditorView) => {
      const { main } = view.state.selection;
      const text = view.state.sliceDoc(main.from, main.to);
      view.dispatch({
        changes: { from: main.from, to: main.to, insert: `*${text}*` },
        selection: { anchor: main.from + 1, head: main.to + 1 }
      });
      return true;
    }
  },
  {
    key: 'Mod-`',
    run: (view: EditorView) => {
      const { main } = view.state.selection;
      const text = view.state.sliceDoc(main.from, main.to);
      view.dispatch({
        changes: { from: main.from, to: main.to, insert: `\`${text}\`` },
        selection: { anchor: main.from + 1, head: main.to + 1 }
      });
      return true;
    }
  },
  {
    key: 'Mod-Shift-s',
    run: (view: EditorView) => {
      const { main } = view.state.selection;
      const text = view.state.sliceDoc(main.from, main.to);
      view.dispatch({
        changes: { from: main.from, to: main.to, insert: `~~${text}~~` },
        selection: { anchor: main.from + 2, head: main.to + 2 }
      });
      return true;
    }
  }
]);

// 모든 키맵을 하나의 배열로 결합
export const allKeymaps: Extension[] = [customHistoryKeymap, markdownKeymap];
