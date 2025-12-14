# BokslHome

Backend (Spring Boot + Kotlin) + Frontend (Next.js) 통합 웹 애플리케이션

## 🚀 빠른 시작
- Backend (로컬):
  ```bash
  cd backend
  ./gradlew bootRun
  # http://localhost:8080
  ```
- Frontend (로컬):
  ```bash
  cd frontend
  npm install
  npm run dev
  # http://localhost:3000
  ```
- Docker 배포: `docs/DOCKER-GUIDE.md` 참고.

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
- **[docs/DOCKER-GUIDE.md](docs/DOCKER-GUIDE.md)** - 컨테이너 빌드/실행/설정/백업/트러블슈팅
- **[CURSOR_SETUP.md](CURSOR_SETUP.md)** - 개발 환경 설정

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

백업/복원 예시:
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz data/
docker stop bokslhome-app 2>/dev/null || true
tar -xzf backup-YYYYMMDD.tar.gz
docker start bokslhome-app 2>/dev/null || true
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
curl http://localhost:8080/api/health
```

## 🐛 트러블슈팅

- 권한 문제: `./scripts/fix-permissions.sh`
- 포트 충돌: `lsof -i:3000`, `lsof -i:8080`
- 컨테이너 로그: `docker logs -f bokslhome-app`, `cat data/log/application.log`
