// Markdown 렌더러 설정 유틸리티
import { marked } from 'marked';

// 커스텀 렌더러 생성
export function createMarkdownRenderer() {
  const renderer = new marked.Renderer();

  // 코드 블록 커스텀 렌더러 (Mermaid + Prism.js 지원)
  renderer.code = function (token: any) {
    const { text, lang } = token || {};

    try {
      const codeText = text || '';
      const actualLanguage = lang || '';

      if (actualLanguage === 'mermaid') {
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        // 원본 코드를 data-code 속성에 저장하고, div 내부는 비워둠
        const html = `<div class="mermaid-diagram mermaid-loading" data-id="${id}" data-code="${codeText.replace(/"/g, '&quot;')}"></div>`;
        return html;
      }

      // 일반 코드 블록 - Prism.js 클래스 추가
      const escapedCode = codeText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');

      // Prism.js가 인식할 수 있도록 language- 클래스 추가
      const languageClass = actualLanguage ? `language-${actualLanguage}` : 'language-text';
      return `<pre class="code-block ${languageClass}"><code class="${languageClass}" data-lang="${actualLanguage}">${escapedCode}</code></pre>`;
    } catch (error) {
      console.error('Code renderer error:', error, { token });
      return `<pre><code style="color: red;">코드 렌더링 오류: ${error}</code></pre>`;
    }
  };

  return renderer;
}

// Marked 설정 초기화
export function setupMarkdown() {
  marked.setOptions({
    breaks: false,
    gfm: true,
    renderer: createMarkdownRenderer()
  });
}

// Markdown → HTML 변환
export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await marked.parse(markdown);
    return result;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    // 에러 발생 시 원본 텍스트를 pre 태그로 감싸서 반환
    const escapedMarkdown = markdown.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `<pre style="color: red; background: #fef2f2; padding: 12px; border-radius: 4px; border: 1px solid #fecaca;">
마크다운 파싱 오류: ${error}

원본 내용:
${escapedMarkdown}
</pre>`;
  }
}
