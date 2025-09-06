// Mermaid 다이어그램 렌더링 유틸리티
import mermaid from 'mermaid';
import type { ThemeType } from '$lib/utils/theme';
import { ThemeUtils } from '$lib/utils/theme';

// Mermaid 초기화
export function initMermaid(theme: ThemeType) {
  try {
    // 항상 새로운 설정으로 초기화 (테마 변경 시)
    mermaid.initialize({
      startOnLoad: false,
      theme: ThemeUtils.isDark(theme) ? 'dark' : 'default',
      securityLevel: 'loose',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true
      },
      sequence: {
        useMaxWidth: true,
        actorMargin: 50,
        boxMargin: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35
      }
    });
  } catch (error) {
    console.error('Mermaid initialization error:', error);
  }
}

// Mermaid 다이어그램 렌더링
export async function renderMermaidDiagrams() {
  if (typeof window === 'undefined') {
    return;
  }

  // 다양한 선택자로 mermaid 요소 찾기
  const selectors = ['.preview-content .mermaid-diagram', '.mermaid-diagram', '[data-id*="mermaid"]'];

  let mermaidElements: NodeListOf<Element> | null = null;
  for (const selector of selectors) {
    mermaidElements = document.querySelectorAll(selector);
    if (mermaidElements.length > 0) {
      break;
    }
  }

  if (!mermaidElements || mermaidElements.length === 0) {
    return;
  }

  for (const element of mermaidElements) {
    const htmlElement = element as HTMLElement;
    // 원본 코드를 data-code 속성에서 가져옴
    const code = htmlElement.getAttribute('data-code') || htmlElement.textContent || '';
    const dataId = htmlElement.getAttribute('data-id') || `mermaid-${Date.now()}`;

    try {
      // 코드가 비어있지 않은지 확인
      if (!code.trim()) {
        continue;
      }

      // 기존 내용 제거 (SVG나 오류 메시지)
      htmlElement.innerHTML = '';

      // 로딩 상태로 설정
      htmlElement.classList.remove('mermaid-rendered', 'mermaid-error');
      htmlElement.classList.add('mermaid-loading');

      try {
        // HTML 엔티티 디코딩
        const decodedCode = code
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');

        // 새로운 ID로 렌더링 (테마 변경 시 충돌 방지)
        const renderId = `${dataId}-${Date.now()}`;

        // Mermaid 다이어그램 렌더링
        const { svg } = await mermaid.render(renderId, decodedCode.trim());
        htmlElement.innerHTML = svg;

        // 스타일 적용 및 로딩 클래스 제거
        htmlElement.classList.remove('mermaid-loading');
        htmlElement.classList.add('mermaid-rendered');
      } catch (renderError) {
        console.error('Mermaid diagram rendering failed:', renderError);
        // 렌더링 실패 시 원본 코드 표시
        const decodedCode = code
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
        const errorMessage = renderError instanceof Error ? renderError.message : String(renderError);
        htmlElement.innerHTML = `<pre style="color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 4px; border: 1px solid #ef4444; font-family: monospace; white-space: pre-wrap;">
❌ 다이어그램 렌더링 실패:
${errorMessage}

📝 원본 코드:
${decodedCode.trim()}
</pre>`;
        htmlElement.classList.remove('mermaid-loading');
        htmlElement.classList.add('mermaid-error');
      }
    } catch (error) {
      console.error('Mermaid rendering error:', error);
      htmlElement.innerHTML = `<div class="mermaid-error">다이어그램 렌더링 오류: ${error}</div>`;
      htmlElement.classList.remove('mermaid-loading');
      htmlElement.classList.add('mermaid-error');
    }
  }
}

// 테마 변경 시 Mermaid 재초기화 및 렌더링
export async function refreshMermaidTheme(theme: ThemeType) {
  initMermaid(theme);
  await renderMermaidDiagrams();
}
