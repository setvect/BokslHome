import { marked } from 'marked';
import DOMPurify from 'dompurify';

type MarkdownToken = {
  raw?: string;
  text?: string;
  type?: string;
};

/**
 * Marked 라이브러리 기본 설정
 */
const configureMarked = () => {
  marked.setOptions({
    gfm: true, // GitHub Flavored Markdown
    breaks: true, // 개행을 <br>로 변환
    pedantic: false,
  });

  // 코드 블록 렌더러 커스터마이징
  const renderer = new marked.Renderer();

  // 코드 블록 렌더링 (PrismJS 클래스 추가)
  renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
    const language = lang || 'text';
    return `<pre class="language-${language}"><code class="language-${language}">${escapeHtml(text)}</code></pre>`;
  };

  // 인라인 코드 렌더링
  renderer.codespan = ({ text }: { text: string }) => {
    return `<code class="inline-code">${escapeHtml(text)}</code>`;
  };

  // 링크 렌더링 (외부 링크는 새 탭에서 열기)
  renderer.link = ({ href, title, tokens }: { href: string; title?: string | null; tokens: MarkdownToken[] }) => {
    const text = tokens.map((token) => token.raw || token.text || '').join('');
    const isExternal = href.startsWith('http') || href.startsWith('https');
    const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
    const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
    return `<a href="${escapeHtml(href)}"${titleAttr}${target}>${text}</a>`;
  };

  // 테이블 렌더링 (Tailwind 클래스 추가)
  renderer.table = ({ header, rows }: { header: MarkdownToken[]; rows: MarkdownToken[][] }) => {
    const headerHtml = header.map((cell) => `<th>${cell.text}</th>`).join('');
    const bodyHtml = rows.map((row) => `<tr>${row.map((cell) => `<td>${cell.text}</td>`).join('')}</tr>`).join('');

    return `<div class="table-wrapper overflow-x-auto">
      <table class="markdown-table">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>`;
  };

  // 인용문 렌더링
  renderer.blockquote = ({ tokens }: { tokens: MarkdownToken[] }) => {
    const content = tokens
      .map((token) => {
        if (token.type === 'paragraph') {
          return token.text;
        }
        return token.raw || '';
      })
      .join('');
    return `<blockquote class="markdown-blockquote">${content}</blockquote>`;
  };

  marked.use({ renderer });
};

/**
 * HTML 문자 이스케이프 함수
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * 마크다운을 HTML로 변환하는 함수
 */
export function renderMarkdown(
  markdown: string,
  options: {
    sanitize?: boolean;
    enableMermaid?: boolean;
  } = {}
): string {
  const { sanitize = true, enableMermaid = false } = options;

  // Marked 설정
  configureMarked();

  // 마크다운을 HTML로 변환
  let html = marked(markdown) as string;

  // Mermaid 다이어그램 처리
  if (enableMermaid) {
    html = processMermaidDiagrams(html);
  }

  // HTML 정화 (XSS 방지)
  if (sanitize && typeof window !== 'undefined') {
    html = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'br',
        'strong',
        'em',
        'u',
        's',
        'del',
        'a',
        'img',
        'ul',
        'ol',
        'li',
        'blockquote',
        'pre',
        'code',
        'table',
        'thead',
        'tbody',
        'tr',
        'td',
        'th',
        'div',
        'span',
        'hr',
      ],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'title', 'alt', 'src', 'class', 'id', 'data-*'],
      ALLOW_DATA_ATTR: true,
    });
  }

  return html;
}

/**
 * Mermaid 다이어그램 코드 블록을 처리하는 함수
 */
function processMermaidDiagrams(html: string): string {
  return html.replace(/<pre class="language-mermaid"><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
    const decodedCode = decodeHtmlEntities(code.trim());
    return `<div class="mermaid-diagram" data-mermaid="${encodeURIComponent(decodedCode)}">${decodedCode}</div>`;
  });
}

/**
 * HTML 엔티티를 디코딩하는 함수
 */
function decodeHtmlEntities(text: string): string {
  const map: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
  };
  return text.replace(/&[#\w]+;/g, (entity) => map[entity] || entity);
}

/**
 * 마크다운 헤딩에서 앵커 ID를 생성하는 함수
 */
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-가-힣]/g, '') // 특수문자 제거 (한글 유지)
    .replace(/\s+/g, '-') // 공백을 대시로 변경
    .trim();
}

/**
 * 마크다운 텍스트에서 목차(TOC)를 생성하는 함수
 */
export function generateTableOfContents(markdown: string): Array<{
  level: number;
  text: string;
  id: string;
}> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: Array<{ level: number; text: string; id: string }> = [];

  let match;
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = generateHeadingId(text);

    toc.push({ level, text, id });
  }

  return toc;
}
