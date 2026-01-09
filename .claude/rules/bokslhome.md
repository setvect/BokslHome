# BokslHome Project Rules

_Last updated: 2026-01-09_

이 문서는 Claude Code에서 BokslHome 프로젝트 작업 시 참고할 핵심 규칙과 프로젝트 구조를 제공합니다.

## 📋 프로젝트 개요

Backend (Spring Boot + Kotlin) + Frontend (Next.js) 통합 웹 애플리케이션

### 주요 디렉토리 구조
```
BokslHome/
├── backend/              # Spring Boot 백엔드
├── frontend/             # Next.js 프론트엔드
├── data/                 # Docker 데이터 (DB, 첨부파일, 로그)
├── docs/                 # 문서
├── scripts/              # 빌드 및 실행 스크립트
├── .cursor/rules/        # Cursor AI 규칙
└── .claude/rules/        # Claude Code 규칙
```

## 🛠 기술 스택

### Backend
- **Language:** Kotlin 1.9.25
- **Framework:** Spring Boot 3.4.0 (Java 21)
- **Database:** H2 (파일 기반, `jdbc:h2:file:./db/BokslHome_db`)
- **Security:** Spring Security + JWT (HS512 서명, AES 암호화)
- **Build:** Gradle

### Frontend
- **Framework:** Next.js 15.5.2 (App Router)
- **Language:** TypeScript 5 (strict mode)
- **UI:** React 19.1.0
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **Theme:** next-themes (라이트/다크 모드)

### Infrastructure
- **Container:** Docker
- **Runtime:** Java 21 + Node.js 20

## 🚀 개발 환경 실행

### Backend (로컬)
```bash
cd backend
./gradlew bootRun
# http://localhost:8080
```

### Frontend (로컬)
```bash
cd frontend
npm install
npm run dev
# http://localhost:3000
```

### Docker 배포
- 자세한 내용은 [docs/DOCKER-GUIDE.md](docs/DOCKER-GUIDE.md) 참고

## 🏗 Backend 아키텍처

### 인증 & 보안
- **JWT 인증**: `JwtUtil`이 userId를 AES(ECB/PKCS5Padding)로 암호화 후 HS512 서명
- **권한**: `/api/login`만 `permitAll`, 그 외 모두 `ROLE_ADMIN` 필요
- **인증 흐름**: `JwtAuthenticationFilter` → `UserService.getUser` → `SecurityContext`

### 공통 규칙
- **예외 처리**: `UserGuideException` 사용, `GlobalExceptionHandler`가 `ErrorResponse`로 직렬화
- **Soft Delete**: 대부분 `deleteF=Y` 업데이트 처리 (실제 행 삭제는 드물음)
- **첨부파일**: `AttachFileService`/`AttachFileHelper`만 사용, `./attach` 하위에 `yyyy/MM/dd` + UUID 구조
- **HTTP 로깅**: `bokslhome.http-logging` 플래그 제어, `multipart/*` 자동 제외

### 도메인 모듈
| 모듈 | 엔티티 | 엔드포인트 | 특징 |
|------|--------|------------|------|
| User/Auth | `UserEntity`, `UserRoleEntity` | `POST /api/login` | BCrypt + JWT, ROLE 기반 권한 |
| Attach | `AttachFileEntity` | 내부 서비스 | 모듈/ID별 첨부 관리 |
| Board | `BoardManagerEntity`, `BoardArticleEntity` | `/api/board-manager`, `/api/board-article` | 게시판 메타 & 게시물 CRUD |
| Comment | `CommentEntity` | `/api/comments` | 다양한 모듈 대상 댓글 |
| Code | `CodeEntity` | `/api/code` | Major/Minor 공통 코드 |
| Knowledge | `KnowledgeEntity` | `/api/knowledge` | 문제/해결, 텍스트 검색 |
| Memo | `MemoCategoryEntity`, `MemoEntity` | `/api/memo-category`, `/api/memo` | 카테고리 + 메모 |
| Note | `NoteCategoryEntity`, `NoteEntity` | `/api/note-category`, `/api/note` | 계층형 카테고리, markdown |
| Network | `NetworkEntity` | `/api/network` | 마인드맵, 제목 검색 |
| Luck | (무상태) | `/luck/lotto` | 랜덤 로또 (ROLE_ADMIN) |

## 🎨 Frontend 아키텍처

### 레이아웃 & 인증
- **레이아웃**: `(app)/layout.tsx` (서버) → `ClientAppLayout` (클라이언트)
- **인증**: `localStorage`의 `auth_token` 확인, 없으면 `/login` 리다이렉트
- **사이드바**: cookie + viewport 기반 열림 상태 관리

### Mock 데이터 (백엔드 연동 전)
- `src/lib/mock/data/*` - 게시판, 노트, 메모, 지식, 네트워크 샘플
- `src/lib/types` - 도메인별 타입 정의
- `src/lib/constants/board.ts` - 게시판 카테고리 정보

### 주요 페이지/기능
| 경로 | 컴포넌트 | 특징 |
|------|----------|------|
| `(app)/page.tsx` | 홈 대시보드 | 기능 링크 카드 |
| `(app)/board` | 게시판 목록/상세 | BOARD_CATEGORIES + mock posts |
| `(app)/knowledge` | 지식 카드/타임라인 | mock 지식 데이터 |
| `(app)/note` | 노트 목록/상세 | markdown 렌더링 |
| `(app)/memo` | 메모 칸반 보드 | 카테고리별 메모 |
| `(app)/network` | 관계 그래프 | vis-network 기반 |
| `(app)/misc/lotto` | 로또 번호 생성 | localStorage 기반 |

### UI 컴포넌트
- `src/components/ui` - shadcn 기반 래핑 컴포넌트
- **폼**: React Hook Form + Zod
- **에디터**:
  - `html-editor.tsx` - Quill 기반 WYSIWYG
  - `markdown-editor.tsx` - CodeMirror + Preview
- **마크다운**: `marked` + `DOMPurify` + `Prism` + `Mermaid`

## 💾 데이터 관리

### 디렉토리 구조
```
data/
├── db/          # H2 데이터베이스
├── attach/      # 첨부파일 (yyyy/MM/dd/UUID)
├── logs/        # 애플리케이션 로그
├── log/         # Backend 로그
└── temp/        # 임시 파일
```

### 백업/복원
```bash
# 백업
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# 복원
docker stop bokslhome-app 2>/dev/null || true
tar -xzf backup-YYYYMMDD.tar.gz
docker start bokslhome-app 2>/dev/null || true
```

## ✅ 작업 시 체크리스트

### Backend 작업
1. **보안**: 새 API 추가 시 `SecurityConfig` 권한 요구사항 갱신
2. **첨부파일**: `AttachFileService`만 사용, 논리 삭제 시 파일 정리 여부 결정
3. **Soft Delete**: Repository JPQL에 `deleteF = false` 조건 추가
4. **Lazy 로딩**: `@Lob(fetch = LAZY)` 필드는 트랜잭션 내에서 DTO 변환
5. **예외 메시지**: 한글 유지, HTTP Status는 `UserGuideCode` 사용
6. **테스트**: 핵심 서비스에 단위/통합 테스트 추가

### Frontend 작업
1. **서버/클라이언트 분리**: 데이터는 서버 컴포넌트, 상호작용은 `_components` 클라이언트
2. **라우팅**: Next.js App Router 규칙 준수, `next/link` 사용
3. **스타일**: Tailwind 유틸리티 + CSS 변수 (`bg-background`, `text-muted-foreground`)
4. **Mock → API 전환**: 동일 타입 유지하며 fetch로 교체 준비
5. **접근성**: 기본적인 aria-label 유지

## 📝 커밋 규칙

- **언어**: 한국어로 작성
- **형식**:
  ```
  feat: 새 기능 추가
  fix: 버그 수정
  refactor: 리팩토링
  docs: 문서 수정
  test: 테스트 추가/수정
  ```

## 🐛 알려진 이슈 & TODO

### Backend
- [ ] `NoteCategoryRepository.deleteUpdate` JPQL 수정 필요 (`m.id` → `m.noteCategorySeq`)
- [ ] Todo 모듈 API/서비스 미완성
- [ ] 노트/게시판 삭제 시 첨부파일 정리 누락 (디스크 누수 가능)
- [ ] 테스트 커버리지 부족

### Frontend
- [ ] 실제 백엔드 연동 (현재 Mock 데이터만 사용)
- [ ] 실제 로그인/JWT 연동
- [ ] 파일 업로드 API 연동
- [ ] 라우팅 경로 동기화 (sidebar vs 실제 페이지)
- [ ] 테스트 추가 (Playwright, Jest/React Testing Library)

## 📚 참고 문서

- [docs/DOCKER-GUIDE.md](docs/DOCKER-GUIDE.md) - Docker 설정 및 배포
- [CURSOR_SETUP.md](CURSOR_SETUP.md) - 개발 환경 설정
- [backend/doc/backend-analysis.md](backend/doc/backend-analysis.md) - 백엔드 상세 분석
- [.cursor/rules/backend.md](.cursor/rules/backend.md) - Backend Rulebook
- [.cursor/rules/frontend.md](.cursor/rules/frontend.md) - Frontend Rulebook

## 🔄 업데이트 지침

- 주요 변경 시 이 문서 상단 날짜를 갱신
- 대규모 아키텍처 변경은 별도 섹션 추가
- 기존 규칙 폐기/대체 시 명시
