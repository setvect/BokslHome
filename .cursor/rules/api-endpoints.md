# Backend API Endpoints

## Authentication (`/api`)
- `POST /api/login`
  - **Request**: `LoginRequest` (`username`, `password`)
  - **Response**: `LoginResponse` (`token`)
  - **Auth**: Public
  - **Desc**: 사용자 로그인 및 JWT 토큰 발급

## User (`/api/user`)
*Note: Currently no User Controller exposed other than login*

## Luck (`/luck`)
- `GET /luck/lotto`
  - **Response**: `LottoResponse` (`setList`: `[{ numberList: [...] }]`)
  - **Auth**: Admin
  - **Desc**: 로또 번호 생성 (1~5게임)

## Code (`/api/code`)
- `POST /api/code`
  - **Request**: `CodeRequest`
  - **Response**: `CodeResponse`
  - **Auth**: Admin
- `PUT /api/code/{codeSeq}`
  - **Request**: `CodeRequest`
- `DELETE /api/code/{codeSeq}`
- `GET /api/code/{codeSeq}`
- `GET /api/code/page`
  - **Query**: `majorCode` (optional), `page`, `size`, `sort`
  - **Response**: `PagedModel<CodeResponse>`
- `GET /api/code/majorCode`
  - **Response**: `List<CodeMajorGroupResponse>`
  - **Desc**: 대분류 코드 그룹 목록 조회

## Knowledge (`/api/knowledge`)
- `POST /api/knowledge`
  - **Request**: `KnowledgeRequest`
  - **Response**: `KnowledgeResponse`
- `PUT /api/knowledge/{knowledgeSeq}`
- `DELETE /api/knowledge/{knowledgeSeq}`
- `GET /api/knowledge/{knowledgeSeq}`
- `GET /api/knowledge/page`
  - **Query**: `classifyC` (required), `content` (optional)
  - **Response**: `PagedModel<KnowledgeResponse>`

## Network (`/api/network`)
- `POST /api/network`
  - **Request**: `NetworkRequest`
  - **Response**: `NetworkResponse`
- `PUT /api/network/{networkSeq}`
- `DELETE /api/network/{networkSeq}`
- `GET /api/network/{networkSeq}`
- `GET /api/network/page`
  - **Query**: `title` (optional)
  - **Response**: `PagedModel<NetworkResponse>`

## Memo (`/api/memo`)
- `POST /api/memo`
  - **Request**: `MemoRequest`
  - **Response**: `MemoResponse`
- `PUT /api/memo/{memoSeq}`
- `DELETE /api/memo/{memoSeq}`
- `GET /api/memo/{memoSeq}`
- `GET /api/memo/category/{categorySeq}`
  - **Response**: `List<MemoResponse>`

## Memo Category (`/api/memo-category`)
- `POST /api/memo-category`
  - **Request**: `MemoCategoryRequest`
  - **Response**: `MemoCategoryResponse`
- `PUT /api/memo-category/{memoCategorySeq}`
- `DELETE /api/memo-category/{memoCategorySeq}`
- `GET /api/memo-category`
  - **Response**: `List<MemoCategoryResponse>`

## Note (`/api/note`)
- `POST /api/note`
  - **Request**: Multipart (`request`: `NoteCreateRequest`, `attachFileList`: `File[]`)
  - **Response**: `NoteResponse`
- `PUT /api/note/{noteSeq}`
  - **Request**: Multipart (`request`: `NoteModifyRequest`, `attachFileList`: `File[]`)
- `DELETE /api/note/{noteSeq}`
- `GET /api/note/{noteSeq}`
- `GET /api/note/page`
  - **Query**: `noteCategorySeq`, `title`, `content`
  - **Response**: `PagedModel<NoteResponse>`
- `GET /api/note/download/{noteSeq}/{attachFileSeq}`
  - **Desc**: 첨부파일 다운로드

## Note Category (`/api/note-category`)
- `POST /api/note-category`
  - **Request**: `NoteCategoryRequest`
  - **Response**: `NoteCategoryResponse`
- `PUT /api/note-category/{noteCategorySeq}`
- `DELETE /api/note-category/{noteCategorySeq}`
- `GET /api/note-category/{noteCategorySeq}`
- `GET /api/note-category`
  - **Response**: `List<NoteCategoryResponse>`
- `GET /api/note-category/tree`
  - **Response**: `List<TreeNode<NoteCategoryResponse>>`

## Board Manager (`/api/board-manager`)
- `POST /api/board-manager`
  - **Request**: `BoardManagerCreateRequest`
  - **Response**: `BoardManagerResponse`
- `PUT /api/board-manager/{boardCode}`
- `DELETE /api/board-manager/{boardCode}`
- `GET /api/board-manager/{boardCode}`
- `GET /api/board-manager/page`
  - **Query**: `BoardManagerSearchRequest` (`name`, `code` etc.)
  - **Response**: `PagedModel<BoardManagerResponse>`

## Board Article (`/api/board-article`)
- `POST /api/board-article`
  - **Request**: Multipart (`request`: `BoardArticleCreateRequest`, `attachFileList`)
  - **Response**: `BoardArticleResponse`
- `PUT /api/board-article/{boardArticleSeq}`
  - **Request**: Multipart (`request`: `BoardArticleModifyRequest`, `attachFileList`)
- `DELETE /api/board-article/{boardArticleSeq}`
- `GET /api/board-article/{boardArticleSeq}`
- `GET /api/board-article/page`
  - **Query**: `BoardArticleSearchRequest` (`boardCode`, `word` etc.)
  - **Response**: `PagedModel<BoardArticleResponse>`
- `GET /api/board-article/download/{boardArticleSeq}/{attachFileSeq}`

## Comment (`/api/comments`)
- `POST /api/comments`
  - **Query**: `module`, `moduleId`
  - **Request**: `CommentRequest`
  - **Response**: `CommentResponse`
- `PUT /api/comments/{commentId}`
- `DELETE /api/comments/{commentId}`
- `GET /api/comments`
  - **Query**: `module`, `moduleId`, `page`
  - **Response**: `PagedModel<CommentResponse>`

## Hello (`/hello`)
- `GET /hello/echo`
  - **Query**: `message`
  - **Response**: `String`

