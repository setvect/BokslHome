import type { NoteCollectionMock, NoteDocument } from '@/lib/types/note';

export const NOTE_DOCUMENTS: NoteDocument[] = [
  {
    id: 294,
    category: '05.투자',
    title: '책 - 주식 투자 ETF로 시작하라',
    markdown: true,
    createdAt: '2021-07-09',
    updatedAt: '2021-07-23',
    summary: 'ETF로 분산 투자하는 방법을 메모한 노트',
    content: `### 정리

- ETF는 지수 추종 상품으로 분산 효과가 즉시 생김
- 자동 이체로 매월 소액을 꾸준히 투자할 것
- 변동성에 흔들리지 않도록 리밸런싱 기준을 미리 세워둘 것`,
  },
  {
    id: 293,
    category: '01.주식',
    title: '월가 아재의 행복한 투자',
    markdown: true,
    createdAt: '2022-04-17',
    updatedAt: '2022-04-17',
    summary: '장기 투자를 강조하는 책에서 인상 깊었던 문장을 기록',
    content: `- 시장은 단기적으로 예측이 불가능
- 충분한 예비자금을 확보한 뒤 나머지를 시장에 맡기는 태도가 필요`,
  },
  {
    id: 292,
    category: '02.부동산',
    title: '허그 안심전세 신청',
    markdown: true,
    createdAt: '2024-10-19',
    updatedAt: '2024-10-19',
    summary: '전세자금보증 신청 과정과 필요한 서류를 기록',
    links: [{ label: 'https://www.khug.or.kr/jeonse/web/s07/s070103.jsp?dt=20241007&no=2023272473', url: 'https://www.khug.or.kr/jeonse/web/s07/s070103.jsp?dt=20241007&no=2023272473' }],
    attachments: [
      {
        id: 'att-hug-01',
        url: 'https://images.unsplash.com/photo-1495510096450-17f5f04b19c2?auto=format&fit=crop&w=1200&q=80',
        description: '허그 안심전세 신청 화면 캡처',
      },
    ],
    content: `모집공고문 입주자 모집공고문

주소 서울 구로구 구로동 109-1, 109-2 태형팰리스 102동 6층 603호

청약일정 모집공고일 2024년 10월 07일 청약접수 기간 2024년 10월 07일 10시 00분 ~ 2024년 10월 21일 17시 00분 서류제출 대상자 발표일 2024년 10월 23일 추정 안내사항 임대보증금 248,400,000 연락처 주택도시보증공사 콜센터 1566-9009 》 ARS 연결 후 [6. 그 외보증 및 기타 문의] -> [5. 기타 문의]로 문의하여주시기 바랍니다. ※ 공사 홈페이지에서도 문의상담 접수가 가능하며, 접수 순으로 답변을 드립니다.`,
  },
  {
    id: 291,
    category: '99.이것 저것',
    title: '핸드폰 가입, 알뜰폰 [1]',
    markdown: false,
    createdAt: '2020-10-21',
    updatedAt: '2020-10-21',
    summary: '알뜰폰 요금제 비교 기록',
    content: `- 기본료 10,000원 이하 요금제 위주로 비교
- 데이터 5GB 이상 사용 시 A 통신사 추천`,
  },
  {
    id: 290,
    category: '21.여기어때',
    title: '회사 업무를 위한 기술',
    markdown: true,
    createdAt: '2021-09-24',
    updatedAt: '2021-09-24',
    summary: '업무 자동화에 쓰이는 도구 목록',
    content: `- 슬랙 워크플로
- 노션 데이터베이스 템플릿
- 구글 앱스 스크립트`,
  },
  {
    id: 289,
    category: '99.이것 저것',
    title: '웃사기',
    markdown: true,
    createdAt: '2024-01-17',
    updatedAt: '2024-01-17',
    summary: '기억하고 싶은 이야기 모음',
    content: `재미있었던 대화와 게시물 스크랩.`,
  },
  {
    id: 288,
    category: '05.투자',
    title: '정리글, 각종 메모, 레버리지 교육 이슈 확인',
    markdown: true,
    createdAt: '2022-08-28',
    updatedAt: '2022-08-28',
    summary: '레버리지 교육 관련 체크리스트',
    content: `1. 기본 개념 정리
2. 레버리지 상품 사례 조사
3. 리스크 브리핑`,
  },
  {
    id: 287,
    category: '99.기타',
    title: 'OS 관련 팁들',
    markdown: false,
    createdAt: '2020-11-05',
    updatedAt: '2020-11-05',
    summary: 'macOS, Windows 문제 해결 노트',
    content: `터미널에서 zip 압축 풀 때 한글 깨짐 방지: \`unzip -O cp949 file.zip\``,
  },
  {
    id: 286,
    category: '05.투자',
    title: '금융관련 물어보기',
    markdown: true,
    createdAt: '2023-03-12',
    updatedAt: '2023-03-12',
    summary: '세무사와 상담 시 물어볼 항목들',
    content: `- 연금저축 납입 한도
- ISA 계좌 활용법`,
  },
  {
    id: 285,
    category: '05.투자',
    title: '[강의] 유튜브 투자 강의 모음',
    markdown: true,
    createdAt: '2021-07-23',
    updatedAt: '2021-07-23',
    summary: '괜찮았던 유튜브 강의 링크 정리',
    content: `- 링크 1
- 링크 2`,
  },
];

export function getMockNotes(): NoteCollectionMock {
  return { notes: NOTE_DOCUMENTS };
}

export function getMockNote(id: number): NoteDocument | undefined {
  return NOTE_DOCUMENTS.find((note) => note.id === id);
}

export function getNoteCategories(): string[] {
  return Array.from(new Set(NOTE_DOCUMENTS.map((note) => note.category)));
}

