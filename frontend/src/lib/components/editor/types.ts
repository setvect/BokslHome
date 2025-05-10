export interface EditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
  height?: string;
  width?: string;
}

export interface EditorFocusState {
  crepe: boolean;
  codeMirror: boolean;
}

export interface EditorError {
  message: string;
  code: string;
  details?: unknown;
}

export type EditorTheme = 'light' | 'dark';
