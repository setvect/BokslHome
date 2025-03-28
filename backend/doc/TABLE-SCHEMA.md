복슬포털 - 테이블 설계서
=========================

### 회원관리
- TBAA_USER: 회원

| Column Name | Attribute Name | Key | Type    | Len | Not Null | Description |
| ----------- | -------------- | --- | ------- | --- | -------- | ----------- |
| USER_ID     | 아아디         | PK  | varchar | 20  | N        |             |
| NAME        | 이름           |     | varchar | 50  | N        |             |
| PASSWD      | 비밀번호       |     | varchar | 60  | N        |             |
| EMAIL       | 이메일         |     | varchar | 100 | N        |             |
| DELETE_F    | 삭제 여부      |     | char    | 1   | N        | Y, N        |

- TBAB_ROLE: 권한

| Column Name | Attribute Name | Key | Type    | Len | Not Null | Description      |
| ----------- | -------------- | --- | ------- | --- | -------- | ---------------- |
| ROLE_SEQ    | 일련번호       | PK  | integer |     | Y        |                  |
| USER_ID     | 아아디         | FK  | varchar | 20  | Y        | TBAA_USER 외래키 |
| ROLE        | 권한 이름      |     | varchar | 50  | Y        |                  |


### 게시판
- TBBA_BOARD_MANAGER: 게시판 설정 정보

| Column Name  | Attribute Name  | Key | Type    | Len | Not Null | Description                    |
| ------------ | --------------- | --- | ------- | --- | -------- | ------------------------------ |
| BOARD_CODE   | 키              |     | varchar | 20  | Y        | BDMAIN01 이런식으로            |
| NAME         | 게시판이름      |     | varchar | 50  | Y        |                                |
| UPLOAD_LIMIT | 업로드 제한     |     | integer | 4   | Y        | 단위 Kbyte<br>0 이면 제안 없음 |
| REPLY_F      | 답변 여부       |     | varchar | 1   | Y        | Y, N                           |
| COMMENT_F    | 코멘트 여부     |     | varchar | 1   | Y        | Y, N                           |
| ATTACH_F     | 자료실 여부     |     | varchar | 1   | Y        | Y, N                           |
| ENCRYPT_F    | 암호화 사용여부 |     | varchar | 1   | Y        | Y, N                           |
| DELETE_F     | 삭제여부        |     | varchar | 1   | Y        | Y, N                           |

- TBBB_BOARD_ARTICLE: 게시판 항목

| Column Name  | Attribute Name | Key | Type     | Len | Not Null | Description            |
|--------------|----------------| --- | -------- |-----| -------- |------------------------|
| ARTICLE_SEQ  | 키              | PK  | integer  | 4   | Y        |                        |
| BOARD_CODE   | 게시판 코드         | FK  | varchar  | 20  | Y        | TBBA_BOARD_MANAGER 외래키 |
| USER_ID      | 아이디            |     | varchar  | 20  | Y        | TBAA_USER 외래키          |
| TITLE        | 제목             |     | varchar  | 200 | Y        |                        |
| CONTENT      | 본문             |     | TEXT     |     | Y        |                        |
| IP           | 아이피            |     | varchar  | 20  | Y        |                        |
| HIT_COUNT    | 조회수            |     | integer  |     | Y        |                        |
| ENCRYPT_F    | 암호화 여부       |     | varchar  | 1   | Y        | Y, N                   |
| ENCRYPT_TYPE | 암호화 유형       |     | varchar  | 20  | Y        | HEX, AES               |
| REG_DATE     | 등록일            |     | datetime |     | Y        |                        |
| DELETE_F     | 삭제여부           |     | varchar  | 1   | Y        | Y, N                   |

### 복슬메모

- TBCA_MEMO_CATEGORY: 메모장 워크스페이스

| Column Name  | Attribute Name    | Key | Type    | Len | Not Null | Description |
| ------------ | ----------------- | --- | ------- | --- | -------- | ----------- |
| CATEGORY_SEQ | 카테고리 일련번호 | PK  | integer |     | Y        |             |
| NAME         | 이름              |     | varchar | 200 | Y        |             |

- TBCB_MEMO: 메모장

| Column Name  | Attribute Name    | Key  | Type    | Len     | Not Null | Description                |
| ------------ | ----------------- | ---- | ------- | ------- | -------- | -------------------------- |
| MEMO_SEQ     | 일련번호          | PK   | integer |         | Y        |                            |
| CONTENT      |                   | 내용 |         | varchar | 4000     | Y                          |
| FONT_COLOR   | 글자색            |      | varchar | 20      | Y        | css 클래스명               |
| BG_COLOR     | 배경색            |      | varchar | 20      | Y        | css 클래스명               |
| Z_INDEX      | Z-INDEX           |      | integer | 1       | Y        | HTML 레이어에서 Z-INDEX 값 |
| WIDTH        | 넓이(픽셀)        |      | varchar | 1       | Y        |                            |
| HEIGHT       | 높이(픽셀)        |      | varchar | 1       | Y        |                            |
| POSITION_X   | 좌표 X            |      | integer | 1       | Y        | 레이어 left 속성 값        |
| POSITION_Y   | 좌표 Y            |      | integer | 1       | Y        | 레이어 top 소성 값         |
| EDIT_DATE    | 마지막 수정일     |      | DATE    | 1       |          |                            |
| REG_DATE     | 처음 등록일       |      | DATE    | 1       |          |                            |
| DELETE_F     | 삭제여부          |      | varchar | 1       | Y        | Y, N                       |
| CATEGORY_SEQ | 카테고리 일련번호 |      | integer |         | Y        |                            |


### 복슬노트
- TBDA_NOTE_CATEGORY: 카테고리

| Column Name  | Attribute Ntame | Key | Type     | Len | Not Null | Description               |
| ------------ | --------------- | --- | -------- | --- | -------- | ------------------------- |
| CATEGORY_SEQ | 일련번호        | PK  | integer  |     | Y        |                           |
| PARENT_ID    | 부모 카테고리   | FK  | integer  |     | Y        | TBCA_NOTE_CATEGORY 외래키 |
| NAME         | 카테고리 이름   |     | varchar  | 50  | Y        |                           |
| REG_DATE     | 등록일          |     | datetime |     | Y        |                           |
| DELETE_F     | 삭제여부        |     | varchar  | 1   | Y        | Y, N                      |

- TBDB_NOTE: 노트 내용

| Column Name  | Attribute Name    | Key | Type     | Len | Not Null | Description               |
| ------------ | ----------------- | --- | -------- | --- | -------- | ------------------------- |
| NOTE_SEQ     | 일련번호          | PK  | integer  |     | Y        |                           |
| CATEGORY_SEQ | 카테고리 일련번호 | FK  | integer  |     | Y        | TBCA_NOTE_CATEGORY 외래키 |
| TITLE        | 제목              |     | varchar  | 200 | Y        |                           |
| CONTENT      | 본문              |     | TEXT     |     | Y        |                           |
| EDIT_DATE    | 마지막 수정일     |     | datetime | 1   |          |                           |
| REG_DATE     | 등록일            |     | datetime |     | Y        |                           |
| DELETE_F     | 삭제여부          |     | varchar  | 1   | Y        | Y, N                      |


### 복슬지식
- TBEA_KNOWLEDGE: 지식정보

| Column Name   | Attribute Name | Key | Type     | Len | Not Null | Description   |
| ------------- | -------------- | --- | -------- | --- | -------- | ------------- |
| KNOWLEDGE_SEQ | 키             | PK  | integer  | 4   | Y        |               |
| CLASSIFY_C    | 분류 코드      |     | varchar  | 20  | Y        | KNOWLEDGE     |
| PROBLEM       | 문제           |     | TEXT     |     | Y        | 문제상황 정리 |
| SOLUTION      | 해법           |     | TEXT     |     | N        |               |
| REG_DATE      | 등록일         |     | datetime |     | Y        |               |
| DELETE_F      | 삭제여부       |     | varchar  | 1   | Y        | Y, N          |

### 복슬관계
- TBFA_NETWORK: 네트워크 관계도

| Column Name | Attribute Name | Key | Type     | Len | Not Null | Description |
| ----------- | -------------- | --- | -------- | --- | -------- | ----------- |
| NETWORK_SEQ | 키             | PK  | integer  | 4   | Y        |             |
| TITLE       | 제목           |     | varchar  | 200 | Y        |             |
| CONTENT     | JSON_DATA      |     | TEXT     |     | Y        |             |
| REG_DATE    | 등록일         |     | datetime |     | Y        |             |
| EDIT_DATE   | 마지막 수정일  |     | datetime | 1   |          |             |
| DELETE_F    | 삭제여부       |     | varchar  | 1   | Y        | Y, N        |

### TODO
- TBHA_TODO: TODO 항목

| Column Name | Attribute Name | Key | Type     | Len  | Not Null | Description            |
| ----------- | -------------- | --- | -------- | ---- | -------- | ---------------------- |
| TODO_SEQ    | 일련번호       | PK  | integer  | 4    | Y        |                        |
| CONTENT     | 내용           |     | varchar  | 1000 | Y        |                        |
| STATUS_TYPE | 상태 유형      |     | varchar  | 20   | Y        | PLAN, GIVEUP, COMPLETE |
| REG_DATE    | 등록일         |     | datetime |      | Y        |                        |
| CHECK_DATE  | 체크일         |     | datetime |      | Y        |                        |
| DELETE_F    | 삭제여부       |     | varchar  | 1    | Y        | Y, N                   |

### 공통관리 항목
- TBYA_ATTACH_FILE: 파일 업로드

| Column Name     | Attribute Name   | Key | Type     | Len | Not Null | Description                                                                                       |
| --------------- | ---------------- | --- | -------- | --- | -------- | ------------------------------------------------------------------------------------------------- |
| ATTACH_FIlE_SEQ | 키               | PK  | integer  | 4   | Y        |                                                                                                   |
| MODULE_NAME     | 모듈이름         |     | varchar  | 20  | Y        | 예: 게시판, 포토갤러리, …                                                                         |
| MODULE_ID       | 모듈내 항목 번호 |     | varchar  | 50  | Y        | 모듈내 항목의 관계를 알 수 있는 값                                                                |
| ORIGINAL_NAME   | 원본파일명       |     | varchar  | 250 | Y        | 복슬이_일상.hwp                                                                                   |
| SAVE_NAME       | 저장파일명       |     | varchar  | 250 | Y        | 기본 베이스 경로에서 시작되는 경로 포함<br>시작을 ‘/’시작하지 않음<br>Ex)2010/02/03/issue_232.gif |
| SIZE            | 파일 사이즈      |     | integer  | 4   | Y        |                                                                                                   |
| REG_DATE        | 등록일           |     | datetime |     | Y        |                                                                                                   |

- TBYB_COMMENT: 댓글

| Column Name | Attribute Name   | Key | Type     | Len  | Not Null | Description                        |
| ----------- | ---------------- | --- | -------- | ---- | -------- | ---------------------------------- |
| COMMENT_SEQ | 일련번호         | PK  | integer  | 4    | Y        |                                    |
| MODULE_NAME | 모듈이름         |     | varchar  | 20   | Y        | 예: 게시판, 포토갤러리, …          |
| MODULE_ID   | 모듈내 항목 번호 |     | varchar  | 50   | Y        | 모듈내 항목의 관계를 알 수 있는 값 |
| USER_ID     | 아이디           | FK  | varchar  | 20   | Y        | TBAA_USER                          |
| CONTENT     | 내용             |     | varchar  | 4000 | Y        |                                    |
| REG_DATE    | 등록일           |     | datetime |      | Y        |                                    |

- TBYC_CODE: 코드 관리

| Column Name | Attribute Name | Key | Type    | Len | Not Null | Description |
| ----------- | -------------- | --- | ------- | --- | -------- | ----------- |
| CODE_SEQ    | 일련번호       | PK  | integer | 4   | Y        |             |
| MAJOR_CODE  | 메인코드       |     | varchar | 20  | Y        |             |
| MINOR_CODE  | 코드           |     | varchar | 20  | Y        |             |
| CODE_VALUE  | 코드값         |     | varchar | 100 | Y        |             |
| ORDER_NO    | 순서           |     | integer |     | Y        |             |
