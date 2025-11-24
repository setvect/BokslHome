# BokslHome Backend Rulebook
_Last updated: 2025-11-23_

이 문서는 Cursor 내에서 백엔드 작업 시 참고할 핵심 규칙/배경지식을 제공합니다. 구현 변경이나 신규 작업 시 본 Rulebook을 우선 확인하세요.

## 1. 기술 스택 & 런타임 규칙
- Kotlin 1.9.25 + Spring Boot 3.4.0 (Java 21).
- Spring Data JPA + H2(file) (`jdbc:h2:file:./db/BokslHome_db`, `ddl-auto=update`); 운영 DB로 전환 시 동일 스키마 유지.
- JWT 인증: `JwtUtil`이 AES(ECB/PKCS5Padding)로 userId를 암호화한 뒤 HS512 서명. 발급/검증 로직 수정 시 암복호화를 깨뜨리지 말 것.
- 파일 저장: `bokslhome.attach-file-path`(기본 `./attach`) 아래 `yyyy/MM/dd` 구조 + UUID 파일명. 공용 `AttachFileService`/`AttachFileHelper`만 사용할 것.
- HTTP 로깅은 `bokslhome.http-logging` 플래그로 제어되며 `multipart/*` 요청은 자동 제외. 민감 데이터 필터링 필요 시 `LoggingFilter` 수정.

## 2. 공통 아키텍처 & 보안 원칙
- `SecurityConfig`: 현재 `/api/login`만 `permitAll`, 그 외는 모두 `ROLE_ADMIN`. 공개 API를 추가할 경우 화이트리스트를 명시적으로 확장.
- 인증 흐름: `JwtAuthenticationFilter` → `UserService.getUser` → `SecurityContext`. `UserRoleEntity`를 `ROLE_*` Enum과 매칭한다.
- 예외 정책: 도메인 예외는 `UserGuideException`을 던지고, `GlobalExceptionHandler`가 `ErrorResponse` 형태로 직렬화. Validation 에러도 동일 포맷.
- 빈 문자열 검색 파라미터는 `CommonUtil.emptyStringNull`로 변환해 JPQL 조건을 단순화.
- Soft Delete 기본 정책: 대부분 `deleteF=Y` 업데이트로 처리하며, 실제 행 삭제는 드물다. 삭제 시 첨부파일/연관 데이터 정리가 필요한지 반드시 확인.

## 3. 도메인 맵
| 모듈      | 핵심 리소스                                | 엔드포인트                                 | 특징                                                                  |
| --------- | ------------------------------------------ | ------------------------------------------ | --------------------------------------------------------------------- |
| User/Auth | `UserEntity`, `UserRoleEntity`             | `POST /api/login`                          | BCrypt 비밀번호 + JWT 발급, ROLE 체계를 통해 관리/일반 권한 구분 예정 |
| Attach    | `AttachFileEntity`                         | 내부 서비스 호출                           | 모듈/ID 별 첨부 저장·조회·삭제. 물리 파일은 날짜 경로 하위에 위치     |
| Board     | `BoardManagerEntity`, `BoardArticleEntity` | `/api/board-manager`, `/api/board-article` | 게시판 메타 & 게시물 CRUD, 첨부 지원, soft delete                     |
| Comment   | `CommentEntity`                            | `/api/comments`                            | 다양한 모듈(CommentModule) 대상 댓글, 작성자 일치 여부 검증           |
| Code      | `CodeEntity`                               | `/api/code`                                | Major/Minor 공통 코드 관리 및 통계                                    |
| Knowledge | `KnowledgeEntity`                          | `/api/knowledge`                           | 문제/해결, soft delete, 문제·해결 텍스트 검색                         |
| Memo      | `MemoCategoryEntity`, `MemoEntity`         | `/api/memo-category`, `/api/memo`          | 카테고리 + 메모 CRUD, UI 관련 필드 포함                               |
| Note      | `NoteCategoryEntity`, `NoteEntity`         | `/api/note-category`, `/api/note`          | 계층형 카테고리(HierarchyUtil), 첨부파일, markdown 플래그             |
| Network   | `NetworkEntity`                            | `/api/network`                             | 마인드맵성 콘텐츠, 제목 검색, soft delete                             |
| Luck      | (무상태)                                   | `/luck/lotto`                              | 랜덤 로또 API. 현재 보안 정책 때문에 ROLE 필요                        |
| Todo      | `TodoEntity`                               | (미구현)                                   | 엔티티만 존재, API/서비스/리포지토리 미작성                           |

## 4. 작업 시 필수 체크리스트
1. **보안 정책**: 새 API 추가 시 `SecurityConfig`의 권한 요구사항을 갱신하고 JWT 인증이 필요한지 결정.
2. **첨부파일**: 첨부 CRUD는 `AttachFileService`만 사용. 논리 삭제 시 파일 정리 여부 결정 후 구현(현재 일부 서비스는 미정리).
3. **Soft Delete 후처리**: `deleteF`만 Y로 바꾸면 검색에서 자동 제외되지 않을 수 있으므로 Repository JPQL에 `deleteF = false` 조건을 잊지 말 것.
4. **Lazy 로딩**: `@Lob(fetch = LAZY)` 필드(`NetworkEntity.content` 등)는 트랜잭션 범위 내에서 DTO 변환.
5. **예외 메시지**: 사용자 가이드를 위한 메시지는 한글 유지, HTTP Status는 `UserGuideCode`에 맞춘다.
6. **테스트**: 핵심 서비스에는 최소한의 단위/통합 테스트를 추가. JWT, 첨부파일, 권한 검증 케이스를 우선 보강.

## 5. 알려진 리스크 & TODO
- `NoteCategoryRepository.deleteUpdate` JPQL이 `m.id`를 참조 → `m.noteCategorySeq`로 수정 필요.
- Todo 모듈 API/서비스 미완성.
- 노트/게시판 등에서 삭제 시 첨부파일 정리가 되지 않아 디스크 누수 가능.
- 테스트 커버리지 부족: 현재 `JwtUtilTest`, `HierarchyUtilTest`, `BoardManagerServiceTest` 정도만 존재.
- `SecurityConfig`가 모든 API에 `ROLE_ADMIN`을 요구하여 `/luck/**` 등 공개 API가 막혀 있음.

## 6. 업데이트 지침
- Rulebook 변경 시 날짜를 갱신하고 주요 수정 요약을 문서 상단에 간략히 기재.
- 대규모 아키텍처 변경(예: 인증 정책, 첨부 저장소 전환) 시 별도 섹션을 추가하고 기존 규칙의 폐기/대체 여부를 명시.

추가 정보가 필요하면 `backend/doc/backend-analysis.md` 를 참고하거나 최신 결정을 이 Rulebook에 반영하세요.

