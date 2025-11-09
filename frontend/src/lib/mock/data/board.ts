import { BOARD_CATEGORIES } from '../../constants/board';
import type { BoardCode, BoardListMock, BoardPostMock } from '../../types/board';

const BASE_POSTS: Record<BoardCode, BoardPostMock[]> = {
  BDAAAA01: [
    {
      id: 21,
      code: 'BDAAAA01',
      title: 'ㅋㅋㅋㅋ',
      summary: '세금 납부 내역을 정리한 문서를 공유합니다.',
      content: '세부 항목과 납부 금액을 정리해두었습니다.',
      createdAt: '2024-06-24',
    },
    {
      id: 20,
      code: 'BDAAAA01',
      title: '명세표(2024.01 ~)(암호화)',
      summary: '암호로 보호된 명세표 파일입니다.',
      content: '암호 입력 후 확인할 수 있습니다.',
      createdAt: '2024-01-25',
      isEncrypted: true,
      password: '202401',
      attachments: [{ id: 'att-100', filename: 'statement-202401.xlsx', size: 128_000 }],
    },
    {
      id: 19,
      code: 'BDAAAA01',
      title: 'github, 깃헙',
      summary: '깃허브 설정과 팁 정리',
      content: '자주 쓰는 명령어와 설정을 정리했습니다.',
      createdAt: '2023-09-09',
    },
  ],
  BDAAAA02: [
    {
      id: 11,
      code: 'BDAAAA02',
      title: '파친코',
      summary: '재일교포 가족사를 그린 소설',
      content: '책의 인상 깊었던 장면과 느낀점 기록',
      createdAt: '2023-08-15',
      isEncrypted: true,
      password: 'book',
    },
    {
      id: 10,
      code: 'BDAAAA02',
      title: '미드나잇 라이브러리',
      summary: '인생의 갈림길을 다룬 소설 리뷰',
      content: '마음에 남은 문장을 적어두었습니다.',
      createdAt: '2023-05-02',
    },
  ],
  BDAAAA03: [
    {
      id: 31,
      code: 'BDAAAA03',
      title: '요즘 듣는 재즈 플레이리스트',
      summary: '비오는 날 듣기 좋은 곡들',
      content: '곡별 간단 소개와 유튜브 링크 정리',
      createdAt: '2024-04-02',
    },
  ],
  BDAAAA04: [
    {
      id: 41,
      code: 'BDAAAA04',
      title: '듄 파트2 감상',
      summary: '아이맥스 관람 후기',
      content: '서사와 시각 효과가 훌륭했다는 감상',
      createdAt: '2024-03-18',
    },
  ],
  BDAAAA05: [
    {
      id: 51,
      code: 'BDAAAA05',
      title: '봄 소풍 사진첩',
      summary: '벚꽃 사진 모음',
      content: '사진 10장을 업로드 예정',
      createdAt: '2024-04-12',
      attachments: [{ id: 'img-500', filename: 'spring-park-01.jpg', size: 2_560_000 }],
    },
  ],
  BDAAAA06: [
    {
      id: 61,
      code: 'BDAAAA06',
      title: '어릴 적 동네',
      summary: '기억 속 풍경 정리',
      content: '집 주변을 떠올리며 기록',
      createdAt: '2023-11-01',
      isEncrypted: true,
      password: 'memoir',
    },
  ],
  BDAAAA07: [
    {
      id: 71,
      code: 'BDAAAA07',
      title: '대학교 동기 모임',
      summary: '10년 만의 재회 기록',
      content: '만남에서 나눈 이야기 정리',
      createdAt: '2024-02-10',
    },
  ],
  BDAAAA08: [
    {
      id: 81,
      code: 'BDAAAA08',
      title: '새 프로젝트 이름 고민',
      summary: '아이디어 브레인스토밍',
      content: '후보 이름들을 나열하고 의견 요청',
      createdAt: '2024-05-01',
    },
  ],
  BDAAAA09: [
    {
      id: 91,
      code: 'BDAAAA09',
      title: '물 위를 걷는 꿈',
      summary: '신기한 꿈 기록',
      content: '상세 묘사와 느낌 기록',
      createdAt: '2024-06-01',
      isEncrypted: true,
      password: 'dream',
    },
  ],
};

export const BOARD_LIST_MOCK: BoardListMock[] = BOARD_CATEGORIES.map((category) => {
  const posts = BASE_POSTS[category.code] ?? [];

  return {
    code: category.code,
    totalCount: posts.length,
    pageSize: 10,
    posts,
  };
});

export function getMockBoardList(code: BoardCode): BoardListMock {
  const normalized = code.toUpperCase() as BoardCode;
  const posts = BASE_POSTS[normalized] ?? [];

  return {
    code: normalized,
    totalCount: posts.length,
    pageSize: 10,
    posts,
  };
}

export function getMockBoardPost(code: BoardCode, postId: number): BoardPostMock | undefined {
  return (BASE_POSTS[code] ?? []).find((post) => post.id === postId);
}
