// CodeMirror 설정 유틸리티
import { markdown } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { sql } from '@codemirror/lang-sql';
import { StreamLanguage } from '@codemirror/language';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { go } from '@codemirror/legacy-modes/mode/go';
import { rust } from '@codemirror/legacy-modes/mode/rust';
import { oneDark } from '@codemirror/theme-one-dark';
import { keymap } from '@codemirror/view';

// 언어 맵 함수 생성 (CodeMirror가 요구하는 형식)
export const codeLanguages = (info: string) => {
  const lang = info.toLowerCase();

  switch (lang) {
    case 'javascript':
    case 'js':
      return javascript().language;
    case 'typescript':
    case 'ts':
      return javascript({ typescript: true }).language;
    case 'python':
    case 'py':
      return python().language;
    case 'java':
      return java().language;
    case 'html':
      return html().language;
    case 'css':
      return css().language;
    case 'json':
      return json().language;
    case 'sql':
      return sql().language;
    case 'yaml':
    case 'yml':
      return StreamLanguage.define(yaml);
    case 'bash':
    case 'sh':
    case 'shell':
      return StreamLanguage.define(shell);
    case 'go':
      return StreamLanguage.define(go);
    case 'rust':
      return StreamLanguage.define(rust);
    default:
      return null;
  }
};

// 마크다운 단축키 설정
export const markdownKeymap = keymap.of([
  {
    key: 'Mod-b', // Ctrl (Windows/Linux) / Cmd (macOS)
    preventDefault: true,
    run: (view) => {
      const { state } = view;
      const selection = state.selection.main;
      const selectedText = state.doc.sliceString(selection.from, selection.to);

      let newText: string;
      let cursorOffset = 0;

      if (selectedText) {
        // 선택된 텍스트가 있는 경우
        if (selectedText.startsWith('**') && selectedText.endsWith('**')) {
          // 이미 볼드인 경우 제거
          newText = selectedText.slice(2, -2);
          cursorOffset = -4;
        } else {
          // 볼드 적용
          newText = `**${selectedText}**`;
          cursorOffset = 4;
        }
      } else {
        // 선택된 텍스트가 없는 경우
        newText = '**텍스트**';
        cursorOffset = 2; // 커서를 "텍스트" 앞에 위치
      }

      view.dispatch({
        changes: { from: selection.from, to: selection.to, insert: newText },
        selection: selectedText
          ? { anchor: selection.from + newText.length }
          : { anchor: selection.from + cursorOffset, head: selection.from + cursorOffset + 3 }
      });

      return true;
    }
  },
  {
    key: 'Mod-Shift-i', // Ctrl+Shift+I (Windows/Linux) / Cmd+Shift+I (macOS)
    preventDefault: true,
    run: (view) => {
      const { state } = view;
      const selection = state.selection.main;
      const selectedText = state.doc.sliceString(selection.from, selection.to);

      let newText: string;
      let cursorOffset = 0;

      if (selectedText) {
        // 선택된 텍스트가 있는 경우
        if (selectedText.startsWith('*') && selectedText.endsWith('*') && !selectedText.startsWith('**')) {
          // 이미 이탤릭인 경우 제거
          newText = selectedText.slice(1, -1);
          cursorOffset = -2;
        } else {
          // 이탤릭 적용
          newText = `*${selectedText}*`;
          cursorOffset = 2;
        }
      } else {
        // 선택된 텍스트가 없는 경우
        newText = '*텍스트*';
        cursorOffset = 1; // 커서를 "텍스트" 앞에 위치
      }

      view.dispatch({
        changes: { from: selection.from, to: selection.to, insert: newText },
        selection: selectedText
          ? { anchor: selection.from + newText.length }
          : { anchor: selection.from + cursorOffset, head: selection.from + cursorOffset + 3 }
      });

      return true;
    }
  },
  {
    key: 'Mod-k', // Ctrl (Windows/Linux) / Cmd (macOS)
    preventDefault: true,
    run: (view) => {
      const { state } = view;
      const selection = state.selection.main;
      const selectedText = state.doc.sliceString(selection.from, selection.to);

      let newText: string;

      if (selectedText) {
        // 선택된 텍스트가 있는 경우 링크로 변환
        newText = `[${selectedText}](url)`;
      } else {
        // 선택된 텍스트가 없는 경우
        newText = '[텍스트](url)';
      }

      view.dispatch({
        changes: { from: selection.from, to: selection.to, insert: newText },
        selection: { anchor: selection.from + newText.length - 4, head: selection.from + newText.length - 1 } // "url" 선택
      });

      return true;
    }
  },
  {
    key: 'Mod-`', // Ctrl (Windows/Linux) / Cmd (macOS)
    preventDefault: true,
    run: (view) => {
      const { state } = view;
      const selection = state.selection.main;
      const selectedText = state.doc.sliceString(selection.from, selection.to);

      let newText: string;

      if (selectedText) {
        if (selectedText.startsWith('`') && selectedText.endsWith('`')) {
          // 이미 코드인 경우 제거
          newText = selectedText.slice(1, -1);
        } else {
          // 코드 적용
          newText = `\`${selectedText}\``;
        }
      } else {
        // 선택된 텍스트가 없는 경우
        newText = '`코드`';
      }

      view.dispatch({
        changes: { from: selection.from, to: selection.to, insert: newText },
        selection: { anchor: selection.from + newText.length }
      });

      return true;
    }
  }
]);

// CodeMirror 확장 생성
export function createEditorExtensions(isDarkMode: boolean) {
  return [
    markdown({
      codeLanguages: codeLanguages
    }),
    markdownKeymap,
    ...(isDarkMode ? [oneDark] : [])
  ];
}
