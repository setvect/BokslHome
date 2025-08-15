/**
 * 게시판 관리 Mock API
 * 실제 백엔드 API 연동 전 테스트용
 */

import type { 
  BoardManager, 
  BoardManagerSearchFilter, 
  BoardManagerListResponse,
  BoardManagerQuery 
} from '$lib/types/boardManager';
import type { Pagination } from '$lib/types/common';
import mockData from '../data/boardManager.json';

// 로딩 시뮬레이션 지연 시간 (ms)
const MOCK_DELAY = 500;

/**
 * 로딩 지연 시뮬레이션
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 검색 필터링 적용
 */
function applySearchFilter(data: BoardManager[], filter?: BoardManagerSearchFilter): BoardManager[] {
  if (!filter?.searchKeyword?.trim()) {
    return data;
  }

  return data.filter(item => {
    const keyword = filter.searchKeyword.toLowerCase();
    
    if (filter.searchType === 'name') {
      return item.name.toLowerCase().includes(keyword);
    } else if (filter.searchType === 'boardCode') {
      return item.boardCode.toLowerCase().includes(keyword);
    }
    
    return false;
  });
}

/**
 * 페이지네이션 적용
 */
function applyPagination<T>(data: T[], pagination: Pick<Pagination, 'currentPage' | 'pageSize'>): {
  items: T[];
  pagination: Pagination;
} {
  const { currentPage, pageSize } = pagination;
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const items = data.slice(startIndex, endIndex);

  return {
    items,
    pagination: {
      currentPage,
      pageSize,
      totalItems,
      totalPages
    }
  };
}

/**
 * 게시판 목록 조회 (검색 + 페이지네이션)
 */
export async function getBoardManagerList(query: BoardManagerQuery): Promise<BoardManagerListResponse> {
  await delay(MOCK_DELAY);

  // 1. 검색 필터링
  const filteredData = applySearchFilter(mockData as BoardManager[], query.search);
  
  // 2. 페이지네이션 적용
  const result = applyPagination(filteredData, query.pagination);

  return result;
}

/**
 * 게시판 단일 조회
 */
export async function getBoardManager(boardCode: string): Promise<BoardManager | null> {
  await delay(MOCK_DELAY);

  const board = mockData.find(item => item.boardCode === boardCode);
  return board ? (board as BoardManager) : null;
}

/**
 * 게시판 생성
 */
export async function createBoardManager(boardData: Omit<BoardManager, 'deleteF'>): Promise<BoardManager> {
  await delay(MOCK_DELAY);

  // 실제 구현에서는 서버에서 생성하고 ID를 반환받음
  const newBoard: BoardManager = {
    ...boardData,
    deleteF: false
  };

  // Mock 데이터에 추가 (실제로는 서버 DB에 저장됨)
  console.log('생성된 게시판:', newBoard);
  
  return newBoard;
}

/**
 * 게시판 수정
 */
export async function updateBoardManager(boardCode: string, boardData: Partial<BoardManager>): Promise<BoardManager> {
  await delay(MOCK_DELAY);

  const existingBoard = mockData.find(item => item.boardCode === boardCode);
  if (!existingBoard) {
    throw new Error(`게시판을 찾을 수 없습니다: ${boardCode}`);
  }

  const updatedBoard: BoardManager = {
    ...(existingBoard as BoardManager),
    ...boardData,
    boardCode // boardCode는 변경 불가
  };

  console.log('수정된 게시판:', updatedBoard);
  
  return updatedBoard;
}

/**
 * 게시판 삭제 (논리적 삭제)
 */
export async function deleteBoardManager(boardCode: string): Promise<void> {
  await delay(MOCK_DELAY);

  const board = mockData.find(item => item.boardCode === boardCode);
  if (!board) {
    throw new Error(`게시판을 찾을 수 없습니다: ${boardCode}`);
  }

  console.log('삭제된 게시판:', boardCode);
  // 실제로는 deleteF를 true로 설정하거나 DB에서 제거
}

/**
 * 게시판 코드 중복 확인
 */
export async function checkBoardCodeDuplicate(boardCode: string): Promise<boolean> {
  await delay(200); // 빠른 확인을 위해 짧은 지연

  const exists = mockData.some(item => item.boardCode === boardCode);
  return exists;
}