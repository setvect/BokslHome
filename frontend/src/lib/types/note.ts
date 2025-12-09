export type NoteCategoryCode =
  | '00'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '99';

export interface NoteCategory {
  code: NoteCategoryCode;
  name: string;
}

export interface NoteAttachment {
  id: string;
  url: string;
  description?: string;
}

export interface NoteDocument {
  id: number;
  category: string;
  title: string;
  markdown: boolean;
  createdAt: string;
  updatedAt: string;
  summary: string;
  content: string;
  links?: Array<{
    label: string;
    url: string;
  }>;
  attachments?: NoteAttachment[];
}
