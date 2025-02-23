declare module '@toast-ui/editor' {
  export interface EditorOptions {
    el: HTMLElement;
    initialEditType: 'markdown' | 'wysiwyg';
    previewStyle?: 'vertical' | 'tab';
    height?: string;
    initialValue?: string;
    theme?: string;
    events?: { [key: string]: () => void };
    // 필요에 따라 다른 옵션들도 추가하세요.
  }

  export class Editor {
    constructor(options: EditorOptions);
    getMarkdown(): string;
    destroy(): void;
    // 아래 메서드를 추가 (반환 타입은 필요에 맞게 수정 가능)
    getCurrentModeEditor?(): { replaceSelection: (value: string) => void };
  }
}
