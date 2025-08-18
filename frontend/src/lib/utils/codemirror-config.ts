import type { Extension } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';
import { markdown } from '@codemirror/lang-markdown';

export function createMarkdownExtensions(options?: { dark?: boolean }): Extension[] {
    const exts: Extension[] = [markdown()];
    if (options?.dark) exts.push(oneDark);
    return exts;
}

export function createEditorConfig(options?: { dark?: boolean }): { tabSize: number; extensions: Extension[] } {
    return {
        tabSize: 2,
        extensions: createMarkdownExtensions({ dark: options?.dark }),
    };
}


