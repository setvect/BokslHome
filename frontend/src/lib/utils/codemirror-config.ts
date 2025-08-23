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

// CodeMirror 확장 생성
export function createEditorExtensions(isDarkMode: boolean) {
  return [
    markdown({
      codeLanguages: codeLanguages
    }),
    ...(isDarkMode ? [oneDark] : [])
  ];
}
