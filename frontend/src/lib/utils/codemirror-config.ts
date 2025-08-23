// CodeMirror 설정 유틸리티
import { markdown } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { json } from '@codemirror/lang-json';
import { EditorView } from '@codemirror/view';
import { StreamLanguage } from '@codemirror/language';
import { yaml } from '@codemirror/legacy-modes/mode/yaml';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { go } from '@codemirror/legacy-modes/mode/go';
import { rust } from '@codemirror/legacy-modes/mode/rust';

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

// CodeMirror 테마 생성
export function createEditorTheme(isDarkMode: boolean) {
  return EditorView.theme({
    // 커서 깜빡임 애니메이션 키프레임
    '@keyframes cm-blink': {
      '0%, 50%': { opacity: '1' },
      '51%, 100%': { opacity: '0' }
    },
    '&': {
      fontSize: '14px',
      fontFamily: '"JetBrains Mono", "Fira Code", monospace',
      backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff'
    },
    '.cm-content': {
      padding: '12px',
      minHeight: 'calc(100% - 24px)',
      backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
      color: isDarkMode ? '#fafafa' : '#09090b'
    },
    '.cm-focused': {
      outline: 'none'
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeft: isDarkMode ? '2px solid #60a5fa' : '2px solid #2563eb',
      borderRadius: '1px'
    },
    '.cm-cursor': {
      animation: 'cm-blink 1.2s infinite'
    },
    '.cm-editor': {
      height: '100%',
      backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff'
    },
    '.cm-scroller': {
      fontFamily: 'inherit',
      overflow: 'auto',
      maxHeight: '100%'
    },
    '.cm-activeLine': {
      backgroundColor: isDarkMode ? '#1c1c1c' : '#f1f5f9'
    },
    '.cm-selectionBackground': {
      backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
      opacity: '0.3'
    },
    '&.cm-focused .cm-selectionBackground': {
      backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
      opacity: '0.3'
    },
    '.cm-selection': {
      backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
      opacity: '0.3'
    },
    '.cm-gutters': {
      backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
      color: isDarkMode ? '#71717a' : '#71717a',
      border: 'none'
    },
    '.cm-lineNumbers .cm-gutterElement': {
      color: isDarkMode ? '#52525b' : '#a1a1aa'
    },
    // Markdown 구문 하이라이트 색상
    '.cm-header': {
      color: isDarkMode ? '#60a5fa' : '#2563eb',
      fontWeight: '600'
    },
    '.cm-strong': {
      color: isDarkMode ? '#fbbf24' : '#d97706',
      fontWeight: '600'
    },
    '.cm-emphasis': {
      color: isDarkMode ? '#a78bfa' : '#7c3aed',
      fontStyle: 'italic'
    },
    '.cm-monospace': {
      color: isDarkMode ? '#34d399' : '#059669',
      backgroundColor: isDarkMode ? '#1c1c1c' : '#f1f5f9',
      padding: '2px 4px',
      borderRadius: '3px'
    },
    '.cm-link': {
      color: isDarkMode ? '#60a5fa' : '#2563eb',
      textDecoration: 'underline'
    },
    '.cm-quote': {
      color: isDarkMode ? '#9ca3af' : '#6b7280',
      fontStyle: 'italic'
    }
  });
}

// CodeMirror 확장 생성
export function createEditorExtensions(isDarkMode: boolean) {
  return [
    markdown({
      codeLanguages: codeLanguages
    }),
    createEditorTheme(isDarkMode)
  ];
}
