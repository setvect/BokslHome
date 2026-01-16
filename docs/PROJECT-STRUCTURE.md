# BokslHome 프로젝트 구조

## 📁 디렉토리 구조

```
BokslHome-wsl/
├── backend/                    # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── kotlin/        # Kotlin 소스 코드
│   │   │   └── resources/     # 설정 파일
│   │   │       ├── application.yml
│   │   │       └── application-docker.yml
│   │   └── test/              # 테스트 코드
│   ├── build.gradle.kts       # Gradle 빌드 설정
│   ├── gradlew                # Gradle Wrapper
│   └── http-client/           # HTTP 테스트 파일
│
├── frontend/                   # Next.js Frontend
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   ├── components/        # React 컴포넌트
│   │   ├── lib/               # 유틸리티 & 훅
│   │   ├── providers/         # Context Providers
│   │   └── styles/            # 스타일 파일
│   ├── public/                # 정적 파일
│   ├── package.json           # npm 설정
│   └── next.config.ts         # Next.js 설정
│
├── data/                       # Docker 데이터 (gitignore)
│   ├── db/                    # H2 데이터베이스
│   ├── attach/                # 첨부파일
│   ├── logs/                  # 애플리케이션 로그
│   ├── log/                   # Backend 로그
│   └── temp/                  # 임시 파일
│
├── docs/                       # 문서
│   ├── DOCKER-QUICKSTART.md   # 빠른 시작 가이드
│   ├── README.docker.md       # Docker 상세 가이드
│   ├── README.docker-volume.md # 데이터 관리 가이드
│   ├── SETUP.md               # 설정 가이드
│   └── PROJECT-STRUCTURE.md   # 이 문서
│
├── scripts/                    # 빌드 & 실행 스크립트
│   ├── docker-build.sh        # Docker 이미지 빌드
│   ├── docker-run.sh          # 컨테이너 실행
│   ├── fix-permissions.sh     # 권한 설정
│   └── install-docker-wsl.sh  # Docker 설치
│
├── nginx/                      # Nginx 설정 (선택사항)
│   ├── nginx.conf
│   └── conf.d/
│
├── Dockerfile                  # Docker 이미지 빌드 파일
├── docker-compose.yml          # Docker Compose 설정
├── README.md                   # 프로젝트 메인 문서
├── CURSOR_SETUP.md            # 개발 환경 설정
├── .gitignore                 # Git 제외 파일
└── build.gradle.kts           # Root Gradle 설정
```

## 📝 주요 파일 설명

### 설정 파일

| 파일                                                | 설명                           |
| --------------------------------------------------- | ------------------------------ |
| `Dockerfile`                                        | Backend + Frontend 통합 이미지 |
| `docker-compose.yml`                                | Docker Compose 설정            |
| `backend/src/main/resources/application.yml`        | 로컬 개발용 설정               |
| `backend/src/main/resources/application-docker.yml` | Docker용 설정                  |
| `frontend/next.config.ts`                           | Next.js 설정                   |

### 스크립트

| 스크립트                        | 용도                        |
| ------------------------------- | --------------------------- |
| `scripts/docker-build.sh`       | 이미지 빌드 및 관리         |
| `scripts/docker-run.sh`         | 컨테이너 실행 (외부 데이터) |
| `scripts/fix-permissions.sh`    | 데이터 디렉토리 권한 설정   |
| `scripts/install-docker-wsl.sh` | WSL2 Docker 설치            |

### 문서

| 문서                           | 내용                       |
| ------------------------------ | -------------------------- |
| `README.md`                    | 프로젝트 개요 및 빠른 시작 |
| `docs/DOCKER-QUICKSTART.md`    | Docker 빠른 시작 (3단계)   |
| `docs/README.docker.md`        | Docker 상세 가이드         |
| `docs/README.docker-volume.md` | 데이터 관리 및 백업        |
| `docs/SETUP.md`                | 상세 설정 및 트러블슈팅    |
| `CURSOR_SETUP.md`              | Cursor IDE 설정            |

## 🔄 워크플로우

### 개발 모드

```bash
# Backend
cd backend
./gradlew bootRun

# Frontend
cd frontend
npm run dev
```

### Docker 모드

```bash
# 빌드
./scripts/docker-build.sh build

# 권한 설정 (최초 1회)
./scripts/fix-permissions.sh

# 실행
./scripts/docker-run.sh
```

## 📦 데이터 흐름

```
┌─────────────────────────────────────────┐
│   Docker Container (bokslhome-app)      │
│                                         │
│  ┌──────────────┐    ┌──────────────┐ │
│  │   Backend    │    │   Frontend   │ │
│  │   :8080      │◄───│   :3000      │ │
│  └──────┬───────┘    └──────────────┘ │
│         │                               │
│         ▼                               │
│    /app/db/  ◄─────┐                   │
│    /app/attach/ ◄──┤                   │
│    /app/logs/   ◄──┤                   │
└────────────────────┼───────────────────┘
                     │ Volume Mount
                     ▼
              ./data/ (Host)
              ├── db/
              ├── attach/
              └── logs/
```

## 🏗️ 빌드 프로세스

### Docker 멀티 스테이지 빌드

```
Stage 1: Frontend Builder
├── Node.js 20 Alpine
├── npm ci
├── npm run build
└── .next/standalone 생성

Stage 2: Backend Builder
├── Eclipse Temurin 21 JDK
├── Gradle 빌드
└── WAR 파일 생성

Stage 3: Runtime
├── Eclipse Temurin 21 JRE + Node.js
├── Frontend Standalone 복사
├── Backend WAR 복사
└── 시작 스크립트 실행
```

## 🔐 환경별 설정

### 로컬 (개발)
- 포트: Backend 8080, Frontend 3000
- DB: `./db/BokslHome_db`
- 첨부파일: `./attach`
- Profile: `default`

### Docker (프로덕션)
- 포트: Backend 8080, Frontend 3000
- DB: `/app/db/BokslHome_db` → `./data/db`
- 첨부파일: `/app/attach` → `./data/attach`
- Profile: `docker`

## 📊 의존성 관리

### Backend
- Gradle 8.11.1
- Kotlin 1.9.25
- Spring Boot 3.4.0
- Java 21

### Frontend
- Node.js 20
- Next.js 15.5.2
- React 19.1.0
- TypeScript 5

## 🔧 유용한 경로

### 로그 확인
```bash
# 컨테이너 로그
docker logs -f bokslhome-app

# Backend 로그
cat data/log/application.log

# Frontend 로그 (컨테이너 내부)
docker exec bokslhome-app cat /app/logs/frontend.log
```

### 데이터베이스 접근
```bash
# DB 파일 위치
ls -lh data/db/

# H2 Console (개발 모드)
http://localhost:8080/h2-console
```

---

**Last Updated:** 2025-11-25

