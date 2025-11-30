/**
 * Note API 요청/응답 타입 정의
 * 백엔드 API와 매핑되는 타입들
 */

/**
 * 노트 첨부파일
 */
export interface NoteAttachFile {
    attachFileSeq: number;
    fileName: string;
    saveFileName: string;
    fileSize: number;
}

/**
 * 노트 응답
 */
export interface NoteResponse {
    noteSeq: number;
    title: string;
    content: string;
    noteCategorySeq: number;
    markdownF: boolean;
    regDate: string; // ISO 8601 format
    modDate: string; // ISO 8601 format
    attachFileList: NoteAttachFile[];
}

/**
 * 노트 카테고리 응답
 */
export interface NoteCategoryResponse {
    noteCategorySeq: number;
    name: string;
    parentCategorySeq: number | null;
    deleteF: boolean;
}

/**
 * 트리 노드 (카테고리 트리용)
 */
export interface TreeNode<T> {
    data: T;
    children: TreeNode<T>[];
}

/**
 * 노트 카테고리 트리 데이터
 */
export interface NoteCategoryTreeData {
    id: number;
    parentId?: number;
    name: string;
}

/**
 * 페이징된 노트 목록 응답
 */
export interface NotePageResponse {
    content: NoteResponse[];
    page: {
        size: number;
        number: number;
        totalElements: number;
        totalPages: number;
    };
}
