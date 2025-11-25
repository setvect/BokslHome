# BokslHome

Backend (Spring Boot + Kotlin) + Frontend (Next.js) 통합 웹 애플리케이션

## 🚀 빠른 시작

### Docker로 실행 (권장)

```bash
# 1. 이미지 빌드
./scripts/docker-build.sh build

# 2. 권한 설정 (최초 1회)
./scripts/fix-permissions.sh

# 3. 실행
./scripts/docker-run.sh
```

**접속:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8080

## 📁 프로젝트 구조

```
BokslHome-wsl/
├── backend/              # Spring Boot 백엔드
├── frontend/             # Next.js 프론트엔드
├── data/                 # Docker 데이터 (DB, 첨부파일, 로그)
├── docs/                 # 문서
├── scripts/              # 빌드 및 실행 스크립트
├── Dockerfile            # Docker 이미지 빌드 파일
└── docker-compose.yml    # Docker Compose 설정
```

## 📚 문서

### Docker 관련
- **[빠른 시작 가이드](docs/DOCKER-QUICKSTART.md)** - 3단계로 바로 시작
- **[Docker 상세 가이드](docs/README.docker.md)** - 전체 설정 및 사용법
- **[데이터 관리 가이드](docs/README.docker-volume.md)** - 외부 데이터 관리 및 백업
- **[설정 가이드](docs/SETUP.md)** - 상세 설정 및 트러블슈팅

### 개발 환경
- **[Cursor 설정](CURSOR_SETUP.md)** - 개발 환경 설정

## 🛠️ 개발 모드

### Backend 개발

```bash
cd backend
./gradlew bootRun
```

**접속:** http://localhost:8080

### Frontend 개발

```bash
cd frontend
npm install
npm run dev
```

**접속:** http://localhost:3000

## 🔧 스크립트

| 스크립트                        | 설명                             |
| ------------------------------- | -------------------------------- |
| `scripts/docker-build.sh`       | Docker 이미지 빌드 및 관리       |
| `scripts/docker-run.sh`         | 컨테이너 실행 (외부 데이터 사용) |
| `scripts/fix-permissions.sh`    | 데이터 디렉토리 권한 설정        |
| `scripts/install-docker-wsl.sh` | WSL2에 Docker 설치               |

## 🐳 Docker 명령어

```bash
# 이미지 빌드
./scripts/docker-build.sh build

# 컨테이너 실행
./scripts/docker-run.sh

# 로그 확인
docker logs -f bokslhome-app

# 컨테이너 중지
docker stop bokslhome-app

# 컨테이너 재시작
docker restart bokslhome-app

# 전체 정리
./scripts/docker-build.sh clean
```

## 📦 기술 스택

### Backend
- **Language:** Kotlin 1.9.25
- **Framework:** Spring Boot 3.4.0
- **Database:** H2 (파일 기반)
- **Security:** Spring Security + JWT
- **Build:** Gradle

### Frontend
- **Framework:** Next.js 15.5.2
- **Language:** TypeScript 5
- **UI:** React 19.1.0
- **Styling:** Tailwind CSS 4
- **State:** React Hooks

### Infrastructure
- **Container:** Docker
- **Runtime:** Java 21 + Node.js 20

## 💾 데이터 관리

모든 데이터는 `./data/` 디렉토리에 저장됩니다:

```
data/
├── db/          # H2 데이터베이스
├── attach/      # 첨부파일
├── logs/        # 애플리케이션 로그
├── log/         # Backend 로그
└── temp/        # 임시 파일
```

**백업:**
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz data/
```

**복원:**
```bash
docker stop bokslhome-app
tar -xzf backup-20251125.tar.gz
docker start bokslhome-app
```

## 🔐 보안

- `.env` 파일로 환경 변수 관리
- `data/` 디렉토리는 `.gitignore`에 포함됨
- JWT 기반 인증 (10일 만료)

## 🌐 환경별 설정

### 로컬 개발
- `application.yml` 사용
- 상대 경로 (./db, ./attach)

### Docker
- `application-docker.yml` 사용
- 절대 경로 (/app/db, /app/attach)
- 볼륨 마운트로 외부 데이터 연결

## 📝 API 테스트

```bash
# HTTP 클라이언트 파일 사용
# backend/http-client/bokslhome.http

# 또는 curl
curl http://localhost:8080/luck/lotto
```

## 🐛 트러블슈팅

### Permission Denied

```bash
./scripts/fix-permissions.sh
```

### Port 충돌

```bash
# 사용 중인 포트 확인
sudo lsof -i:3000
sudo lsof -i:8080
```

### 컨테이너 로그 확인

```bash
docker logs bokslhome-app
cat data/log/application.log
```
