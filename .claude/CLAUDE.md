# BokslHome Project Rules

_Last updated: 2026-01-09_

이 문서는 Claude Code에서 BokslHome 프로젝트 작업 시 참고할 핵심 규칙과 빠른 참조 가이드입니다.

## 📋 프로젝트 개요

Backend (Spring Boot + Kotlin) + Frontend (Next.js) 통합 웹 애플리케이션

### 디렉토리 구조
```
BokslHome/
├── backend/              # Spring Boot + Kotlin
├── frontend/             # Next.js + TypeScript
├── data/                 # Docker 데이터 (DB, 첨부파일, 로그)
├── docs/                 # 프로젝트 문서
│   └── rules/            # 상세 개발 규칙
└── scripts/              # 빌드/배포 스크립트
```

## 🛠 기술 스택

| 영역     | 기술                                                   | 영역 | 기술 |
| -------- | ------------------------------------------------------ |
| Backend  | Kotlin 1.9.25, Spring Boot 3.4.0, H2 DB, JWT, Gradle   |
| Frontend | Next.js 15.5.2, TypeScript 5, React 19, Tailwind CSS 4 |
| Infra    | Docker, Java 21, Node.js 20                            |

## 🚀 빠른 시작

```bash
# Backend (로컬)
cd backend && ./gradlew bootRun
# → http://localhost:8080

# Frontend (로컬)
cd frontend && npm install && npm run dev
# → http://localhost:3000

# Docker 배포
# → docs/DOCKER-GUIDE.md 참고
```

## 🎯 핵심 규칙

### Backend
- **인증**: JWT (AES + HS512), `/api/login`만 public, 나머지 `ROLE_ADMIN`
- **예외**: `UserGuideException` → `GlobalExceptionHandler`
- **첨부파일**: `AttachFileService`만 사용, `./attach/yyyy/MM/dd/UUID` 구조
- **Soft Delete**: `deleteF=Y` 업데이트, Repository에 `deleteF=false` 조건 필수
- **HTTP 로깅**: `bokslhome.http-logging` 플래그 제어

### Frontend
- **현재 상태**: Mock 데이터 사용 중 (백엔드 연동 전)
- **인증**: `localStorage.auth_token` 체크 → 없으면 `/login`
- **컴포넌트**: 서버/클라이언트 분리, `_components/`에 클라이언트 컴포넌트
- **스타일**: Tailwind + shadcn/ui, CSS 변수 사용
- **UI**: React Hook Form + Zod, Quill/CodeMirror 에디터

### 공통
- **커밋**: 한국어 (`feat:`, `fix:`, `refactor:`, `docs:`, `test:`)
- **테스트**: 핵심 로직은 테스트 추가 (현재 커버리지 부족)

## 📦 주요 모듈

| 모듈      | 엔드포인트                       | 특징                      |
| --------- | -------------------------------- | ------------------------- |
| User/Auth | `POST /api/login`                | BCrypt + JWT              |
| Board     | `/api/board-manager`, `-article` | 게시판 메타 & 게시물      |
| Note      | `/api/note-category`, `-note`    | 계층형 카테고리, markdown |
| Memo      | `/api/memo-category`, `-memo`    | 칸반 스타일 메모          |
| Knowledge | `/api/knowledge`                 | 문제/해결 지식            |
| Network   | `/api/network`                   | 관계 그래프 (vis-network) |
| Code      | `/api/code`                      | 공통 코드 관리            |
| Comment   | `/api/comments`                  | 다중 모듈 댓글            |
## 💾 데이터 관리

```bash
# 백업
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# 복원
docker stop bokslhome-app 2>/dev/null || true
tar -xzf backup-YYYYMMDD.tar.gz
docker start bokslhome-app 2>/dev/null || true
```

데이터 위치: `./data/` (db, attach, logs, temp)

## 🐛 알려진 이슈

### Backend
- `NoteCategoryRepository.deleteUpdate` JPQL 수정 필요 (`m.id` → `m.noteCategorySeq`)
- Todo 모듈 미완성
- 노트/게시판 삭제 시 첨부파일 정리 누락
- 테스트 커버리지 부족

### Frontend
- Mock 데이터만 사용 (백엔드 연동 전)
- 실제 로그인/JWT 미연동
- 파일 업로드 API 미연동
- 테스트 부재

## 📚 상세 문서

작업 전 해당 영역의 상세 규칙을 반드시 확인하세요.

### 개발 가이드
- [docs/DOCKER-GUIDE.md](docs/DOCKER-GUIDE.md) - Docker 설정 및 배포
- [CURSOR_SETUP.md](CURSOR_SETUP.md) - 개발 환경 설정

### 상세 규칙 (필독)
- [docs/rules/backend.md](docs/rules/backend.md) - Backend 아키텍처, 도메인 모듈, 체크리스트
- [docs/rules/frontend.md](docs/rules/frontend.md) - Frontend 구조, 컴포넌트, 레이아웃
- [docs/rules/api-endpoints.md](docs/rules/api-endpoints.md) - 전체 API 엔드포인트 목록
- [docs/rules/code-api-guide.md](docs/rules/code-api-guide.md) - Code API 사용법
- [docs/rules/commit.md](docs/rules/commit.md) - 커밋 메시지 규칙

### 분석 문서
- [backend/doc/backend-analysis.md](backend/doc/backend-analysis.md) - 백엔드 상세 분석


## 커밋 메시지 규칙
- 한국어를 사용
- 단 전문 용어는 영문으로 사용 가능함

---

**업데이트 지침**: 주요 변경 시 날짜 갱신, 대규모 변경은 별도 섹션 추가
