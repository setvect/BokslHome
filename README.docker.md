# BokslHome Docker 빌드 가이드

## 📋 개요

BokslHome 프로젝트는 Backend (Spring Boot)와 Frontend (Next.js)로 구성된 풀스택 애플리케이션입니다.
이 가이드는 Docker를 사용하여 프로젝트를 빌드하고 실행하는 방법을 설명합니다.

## 🏗️ 프로젝트 구조

```
BokslHome-wsl/
├── backend/              # Spring Boot 애플리케이션
│   ├── Dockerfile       # Backend Docker 이미지
│   └── .dockerignore
├── frontend/            # Next.js 애플리케이션
│   ├── Dockerfile       # Frontend Docker 이미지
│   └── .dockerignore
├── nginx/               # Nginx 설정 (선택사항)
│   ├── nginx.conf
│   └── conf.d/
├── docker-compose.yml   # Docker Compose 설정
└── docker-build.sh      # 빌드 스크립트
```

## 🚀 빠른 시작

### 1. 사전 요구사항

- Docker 20.10 이상
- Docker Compose v2 이상

### 2. 빌드 및 실행

```bash
# 빌드 스크립트에 실행 권한 부여 (최초 1회)
chmod +x docker-build.sh

# 빌드 및 실행
./docker-build.sh up
```

### 3. 접속

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

## 📝 빌드 스크립트 사용법

### 기본 명령어

```bash
# 이미지만 빌드
./docker-build.sh build

# 빌드 후 컨테이너 시작
./docker-build.sh up

# 컨테이너 중지
./docker-build.sh down

# 컨테이너 재시작
./docker-build.sh restart

# 로그 확인
./docker-build.sh logs

# 특정 서비스 로그만 확인
./docker-build.sh logs backend
./docker-build.sh logs frontend

# 상태 확인
./docker-build.sh status

# 정리 (컨테이너, 이미지, 볼륨 삭제)
./docker-build.sh clean

# 도움말
./docker-build.sh help
```

## 🐳 Docker Compose 직접 사용

스크립트 없이 직접 Docker Compose를 사용할 수도 있습니다:

```bash
# 빌드 및 실행
docker compose up -d

# 로그 확인
docker compose logs -f

# 중지
docker compose down

# 볼륨까지 삭제
docker compose down -v

# Nginx 포함하여 실행
docker compose --profile with-nginx up -d
```

## 🔧 개별 서비스 빌드

### Backend만 빌드

```bash
cd backend
docker build -t bokslhome-backend .
docker run -p 8080:8080 bokslhome-backend
```

### Frontend만 빌드

```bash
cd frontend
docker build -t bokslhome-frontend .
docker run -p 3000:3000 bokslhome-frontend
```

## 📦 빌드 최적화

### 멀티 스테이지 빌드

각 Dockerfile은 멀티 스테이지 빌드를 사용하여 최종 이미지 크기를 최소화합니다:

- **Backend**: Builder + Runtime (JRE만 포함)
- **Frontend**: Dependencies + Builder + Runner (Standalone 모드)

### 빌드 캐시 활용

```bash
# 캐시 무시하고 빌드
docker compose build --no-cache

# 특정 서비스만 재빌드
docker compose build backend
```

## 🔒 보안 고려사항

### 1. Non-root 사용자
- Frontend는 `nextjs` 사용자로 실행
- Backend는 JRE 최소 권한으로 실행

### 2. 환경 변수
- `.env` 파일을 사용하여 민감한 정보 관리
- `.dockerignore`로 불필요한 파일 제외

### 3. 헬스체크
- 각 서비스에 헬스체크 설정
- 자동 재시작 정책 적용

## 📊 모니터링

### 컨테이너 상태 확인

```bash
docker compose ps
```

### 리소스 사용량 확인

```bash
docker stats
```

### 로그 확인

```bash
# 전체 로그
docker compose logs -f

# 최근 100줄만
docker compose logs --tail=100

# 특정 시간 이후
docker compose logs --since 10m
```

## 🔄 업데이트 및 배포

### 1. 코드 업데이트 후 재배포

```bash
# Git pull 후
git pull

# 재빌드 및 재시작
./docker-build.sh down
./docker-build.sh up
```

### 2. 무중단 업데이트

```bash
# 새 이미지 빌드
docker compose build

# 롤링 업데이트
docker compose up -d --no-deps --build backend
docker compose up -d --no-deps --build frontend
```

## 🐛 트러블슈팅

### 포트 충돌

```bash
# 포트 사용 확인
sudo netstat -tulpn | grep :8080
sudo netstat -tulpn | grep :3000

# docker-compose.yml에서 포트 변경
ports:
  - "8081:8080"  # 호스트:컨테이너
```

### 빌드 실패

```bash
# 캐시 정리 후 재빌드
docker builder prune -a
./docker-build.sh clean
./docker-build.sh up
```

### 볼륨 권한 문제

```bash
# 볼륨 재생성
docker compose down -v
./docker-build.sh up
```

## 📈 프로덕션 배포

### 1. 환경 변수 설정

`.env` 파일 생성:

```env
# Backend
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=jdbc:postgresql://db:5432/bokslhome
DATABASE_USERNAME=admin
DATABASE_PASSWORD=secure_password

# Frontend
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

### 2. Nginx 리버스 프록시 사용

```bash
docker compose --profile with-nginx up -d
```

### 3. HTTPS 설정

Nginx에 SSL 인증서 추가:

```bash
# Let's Encrypt 사용
docker run -it --rm -v ./nginx/certs:/etc/letsencrypt \
  certbot/certbot certonly --webroot \
  -w /var/www/certbot \
  -d yourdomain.com
```

## 📚 추가 정보

### 관련 문서

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment#docker-image)
- [Spring Boot Docker Guide](https://spring.io/guides/topicals/spring-boot-docker)

### 참고 사항

- Backend는 H2 데이터베이스를 사용합니다 (개발용)
- 프로덕션에서는 PostgreSQL/MySQL 사용을 권장합니다
- Frontend는 Standalone 모드로 빌드되어 경량화되었습니다

## 🤝 기여

문제가 발생하거나 개선 사항이 있다면 이슈를 등록해주세요.

---

**Last Updated**: 2025-11-25

