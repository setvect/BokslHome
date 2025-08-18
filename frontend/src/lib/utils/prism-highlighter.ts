// Prism 하이라이터 유틸 (언어별 동적 로딩 최소화 버전)
import type { Grammar } from 'prismjs';

let prismPromise: Promise<typeof import('prismjs')> | null = null;

async function getPrism() {
    if (!prismPromise) {
        prismPromise = import('prismjs');
        // 기본 마크업/JS/TS만 우선 로드, 필요 시 동적 로딩 확장
        await prismPromise;
        // 타입 선언이 없는 모듈들이 있어 any로 처리
        await import('prismjs/components/prism-typescript' as any);
        await import('prismjs/components/prism-jsx' as any);
        await import('prismjs/components/prism-tsx' as any);
        await import('prismjs/components/prism-markup' as any);
        await import('prismjs/components/prism-json' as any);
        await import('prismjs/components/prism-bash' as any);
    }
    return prismPromise;
}

export async function highlight(code: string, language: string): Promise<string> {
    const Prism = await getPrism();
    const lang = (Prism.languages as Record<string, Grammar>)[language] || Prism.languages.markup;
    return Prism.highlight(code, lang, language);
}


