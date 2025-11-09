// MarkdownEditor 관련 타입 정의
export interface MarkdownEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
  className?: string;
  readOnly?: boolean;
  showPreview?: boolean;
  enableMermaid?: boolean;
  enableImageUpload?: boolean;
}

// Markdown 렌더링 옵션
export interface MarkdownRenderOptions {
  enableMermaid?: boolean;
  enablePrism?: boolean;
  sanitize?: boolean;
}

// Mermaid 다이어그램 설정
export interface MermaidConfig {
  theme?: 'default' | 'dark' | 'forest' | 'base';
  startOnLoad?: boolean;
  fontFamily?: string;
}

// 이미지 업로드 핸들러
export interface ImageUploadHandler {
  (file: File): Promise<string>;
}

// HtmlEditor 관련 타입 정의 (나중에 구현될 예정)
export interface HtmlEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  height?: string;
  className?: string;
  readOnly?: boolean;
  plugins?: string[];
  toolbar?: string;
}

// 에디터 공통 테마 타입
export type EditorTheme = 'light' | 'dark' | 'system';
