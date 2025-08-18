// Mermaid 렌더 유틸 (동적 import)
let mermaidPromise: Promise<any> | null = null;

async function getMermaid() {
    if (!mermaidPromise) {
        mermaidPromise = import('mermaid').then((m) => m.default ?? m);
    }
    return mermaidPromise;
}

export async function renderMermaid(id: string, code: string, theme: 'light' | 'dark' = 'light'): Promise<string> {
    const mermaid = await getMermaid();
    mermaid.initialize({ startOnLoad: false, theme: theme === 'dark' ? 'dark' : 'default' });
    const { svg } = await mermaid.render(id, code);
    return svg as string;
}


