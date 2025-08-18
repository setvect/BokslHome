import { marked } from 'marked';
import { renderMermaid } from './mermaid-renderer';

// 기본 마크다운 → HTML 변환 (비동기 안전)
export async function renderMarkdown(md: string, theme: 'light' | 'dark' = 'light'): Promise<string> {
    // Mermaid 코드블록을 사전 치환 (클라이언트 환경에서만)
    if (typeof window !== 'undefined') {
        let idx = 0;
        const mermaidBlock = /```mermaid\n([\s\S]*?)```/g;
        let match: RegExpExecArray | null;
        while ((match = mermaidBlock.exec(md)) !== null) {
            const id = `mermaid-${Date.now()}-${idx++}`;
            const code = match[1];
            try {
                const svg = await renderMermaid(id, code, theme);
                md = md.replace(match[0], svg);
            } catch {
                // 실패 시 원본 유지
            }
        }
    }
    const html = await marked.parse(md);
    return String(html);
}


