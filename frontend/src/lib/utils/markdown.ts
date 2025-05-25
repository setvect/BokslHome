import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

// 자주 사용되는 언어 패키지 import
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import markdown from 'highlight.js/lib/languages/markdown';
import sql from 'highlight.js/lib/languages/sql';
import java from 'highlight.js/lib/languages/java';
import python from 'highlight.js/lib/languages/python';
import json from 'highlight.js/lib/languages/json';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import yaml from 'highlight.js/lib/languages/yaml';
import bash from 'highlight.js/lib/languages/bash';

// 전역 초기화 플래그
let isMarkdownInitialized = false;

/**
 * 마크다운 파서 초기화 (한 번만 실행)
 */
export function initializeMarkdown(): void {
  if (isMarkdownInitialized) {
    return;
  }

  try {
    // highlight.js 언어 등록
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    hljs.registerLanguage('markdown', markdown);
    hljs.registerLanguage('sql', sql);
    hljs.registerLanguage('java', java);
    hljs.registerLanguage('python', python);
    hljs.registerLanguage('json', json);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('yaml', yaml);
    hljs.registerLanguage('bash', bash);

    // marked 설정
    marked.use(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(code, { language: lang }).value;
            } catch (err) {
              console.error('하이라이팅 오류:', err);
              return hljs.highlightAuto(code).value;
            }
          }
          return hljs.highlightAuto(code).value;
        }
      })
    );

    // marked 기본 옵션 설정
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown 활성화
      breaks: true, // 줄바꿈을 <br>로 변환
      pedantic: false // 엄격한 마크다운 규칙 비활성화 (더 유연한 파싱)
    });

    isMarkdownInitialized = true;
  } catch (error) {
    console.error('마크다운 초기화 오류:', error);
  }
}

/**
 * 마크다운 텍스트를 HTML로 변환
 * @param markdownText 변환할 마크다운 텍스트
 * @returns 변환된 HTML 문자열
 */
export async function parseMarkdown(markdownText: string): Promise<string> {
  // 초기화 확인
  initializeMarkdown();

  // 빈 문자열 처리
  if (!markdownText.trim()) {
    return '';
  }

  try {
    return await marked.parse(markdownText);
  } catch (error) {
    console.error('마크다운 파싱 오류:', error);
    return '<p>마크다운 파싱 중 오류가 발생했습니다.</p>';
  }
}

/**
 * 다크모드 테마 설정
 * @param isDarkMode 다크모드 여부
 */
export function setMarkdownTheme(isDarkMode: boolean): void {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }
}
