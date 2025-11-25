# BokslHome Docker 설정 가이드

## ⚠️ 중요: 첫 실행 전 권한 설정

Docker 컨테이너가 외부 데이터 디렉토리에 접근하려면 **한 번만** 권한 설정이 필요합니다.

### 방법 1: 자동 스크립트 (권장)

```bash
./fix-permissions.sh
```

비밀번호를 입력하면 자동으로 권한이 설정됩니다.

### 방법 2: 수동 설정

```bash
sudo chown -R 1001:1001 ./data/
```

### 방법 3: 현재 사용자로 실행 (권한 설정 불필요)

```bash
# 현재 사용자의 UID/GID 확인
id

# docker run 시 --user 옵션 추가
docker run -d \
  --name bokslhome-app \
  --user $(id -u):$(id -g) \
  -p 3000:3000 \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=docker \
  -v "$(pwd)/data/db:/app/db" \
  -v "$(pwd)/data/attach:/app/attach" \
  -v "$(pwd)/data/logs:/app/logs" \
  -v "$(pwd)/data/log:/app/log" \
  -v "$(pwd)/data/temp:/app/temp" \
  bokslhome-unified:latest
```

---

## 🚀 빠른 시작

### 1. 이미지 빌드

```bash
./docker-build-unified.sh build
```

### 2. 권한 설정 (최초 1회)

```bash
./fix-permissions.sh
```

### 3. 컨테이너 실행

```bash
./docker-run-unified.sh
```

### 4. 접속

- Frontend: http://localhost:3000
- Backend: http://localhost:8080

---

## 📁 데이터 위치

모든 데이터는 `./data/` 디렉토리에 저장됩니다:

```
data/
├── db/          # H2 데이터베이스
├── attach/      # 첨부파일
├── logs/        # 애플리케이션 로그
├── log/         # Backend 로그
└── temp/        # 임시 파일
```

---

## 🔧 트러블슈팅

### "Permission denied" 에러

**원인**: 데이터 디렉토리 권한 문제

**해결**:
```bash
# 권한 재설정
./fix-permissions.sh

# 또는 수동으로
sudo chown -R 1001:1001 ./data/

# 또는 현재 사용자로 실행
docker run --user $(id -u):$(id -g) ...
```

### Backend가 시작되지 않음

```bash
# 로그 확인
docker logs bokslhome-app

# Backend 로그 확인
cat data/log/application.log
```

### 포트 충돌

```bash
# 사용 중인 프로세스 확인
sudo lsof -i:3000
sudo lsof -i:8080

# 다른 포트 사용
docker run -p 4000:3000 -p 9090:8080 ...
```

---

## 📚 더 많은 정보

- [Docker 통합 가이드](README.docker-unified.md)
- [데이터 관리 가이드](README.docker-volume.md)
- [분리형 이미지 가이드](README.docker.md)

