export type BoardDetail = {
  code: string;
  name: string;
  uploadLimit: number;
  allowComments: boolean;
  allowFiles: boolean;
  allowEncryptedPosts: boolean;
};

const EMPTY_DETAIL: BoardDetail = {
  code: '',
  name: '게시판',
  uploadLimit: 0,
  allowComments: false,
  allowFiles: false,
  allowEncryptedPosts: false,
};

export const BOARD_DETAILS: Record<string, BoardDetail> = {
  BDAAAA00: {
    code: 'BDAAAA00',
    name: '메인화면',
    uploadLimit: 0,
    allowComments: false,
    allowFiles: true,
    allowEncryptedPosts: false,
  },
  BDAAAA01: {
    code: 'BDAAAA01',
    name: '글',
    uploadLimit: 100,
    allowComments: true,
    allowFiles: false,
    allowEncryptedPosts: false,
  },
  BDAAAA02: {
    code: 'BDAAAA02',
    name: '책',
    uploadLimit: 300,
    allowComments: false,
    allowFiles: true,
    allowEncryptedPosts: true,
  },
  BDAAAA03: {
    code: 'BDAAAA03',
    name: '음악',
    uploadLimit: 200,
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: false,
  },
  BDAAAA04: {
    code: 'BDAAAA04',
    name: '영화',
    uploadLimit: 150,
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: false,
  },
  BDAAAA05: {
    code: 'BDAAAA05',
    name: '사진',
    uploadLimit: 500,
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: false,
  },
  BDAAAA06: {
    code: 'BDAAAA06',
    name: '기억',
    uploadLimit: 80,
    allowComments: false,
    allowFiles: false,
    allowEncryptedPosts: true,
  },
  BDAAAA07: {
    code: 'BDAAAA07',
    name: '인연',
    uploadLimit: 0,
    allowComments: true,
    allowFiles: false,
    allowEncryptedPosts: false,
  },
  BDAAAA08: {
    code: 'BDAAAA08',
    name: '잡담',
    uploadLimit: 50,
    allowComments: true,
    allowFiles: false,
    allowEncryptedPosts: false,
  },
  BDAAAA09: {
    code: 'BDAAAA09',
    name: '꿈',
    uploadLimit: 120,
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: true,
  },
};

export function getBoardDetail(code?: string): BoardDetail {
  if (!code) {
    return EMPTY_DETAIL;
  }

  const normalized = code.toUpperCase();
  return (
    BOARD_DETAILS[normalized] ?? {
      ...EMPTY_DETAIL,
      code: normalized,
    }
  );
}
