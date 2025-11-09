export type BoardCode = 'BDAAAA01' | 'BDAAAA02' | 'BDAAAA03' | 'BDAAAA04' | 'BDAAAA05' | 'BDAAAA06' | 'BDAAAA07' | 'BDAAAA08' | 'BDAAAA09';

export interface BoardCategory {
  code: BoardCode;
  slug: string;
  name: string;
  description: string;
  allowComments: boolean;
  allowFiles: boolean;
  allowEncryptedPosts: boolean;
}

export interface BoardAttachmentMock {
  id: string;
  filename: string;
  size: number;
}

export interface BoardPostMock {
  id: number;
  code: BoardCode;
  title: string;
  summary: string;
  content: string;
  createdAt: string;
  isEncrypted?: boolean;
  attachments?: BoardAttachmentMock[];
  password?: string;
}

export interface BoardListMock {
  code: BoardCode;
  totalCount: number;
  pageSize: number;
  posts: BoardPostMock[];
}
