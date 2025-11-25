# Docker 외부 데이터 관리 가이드

## 📁 외부 데이터 디렉토리 구조

Docker 컨테이너의 데이터를 외부에서 관리하여 **데이터 영속성**과 **백업**을 쉽게 할 수 있습니다.

```
BokslHome-wsl/
├── data/                    # 모든 데이터가 여기에 저장됩니다
│   ├── db/                 # H2 데이터베이스 파일
│   │   ├── BokslHome_db.mv.db
│   │   └── BokslHome_db.trace.db
│   ├── attach/             # 첨부파일
│   ├── logs/               # 애플리케이션 로그
│   ├── log/                # Backend 로그
│   └── temp/               # 임시 파일
├── Dockerfile.unified
└── docker-compose.unified.yml
```

## 🎯 장점

✅ **데이터 영속성**: 컨테이너를 삭제해도 데이터 유지  
✅ **쉬운 백업**: `data/` 폴더만 백업하면 됨  
✅ **직접 접근**: 호스트에서 DB 파일 직접 확인 가능  
✅ **이식성**: `data/` 폴더를 다른 서버로 복사만 하면 됨  

## 🚀 사용 방법

### 방법 1: 전용 스크립트 사용 (가장 간단)

```bash
# 빌드 (최초 1회 또는 코드 변경 시)
./docker-build-unified.sh build

# 실행 (외부 데이터 디렉토리 자동 생성)
./docker-run-unified.sh
```

### 방법 2: Docker Compose 사용

```bash
# data 디렉토리 생성
mkdir -p data/{db,attach,logs,log,temp}

# 실행
docker compose -f docker-compose.unified.yml up -d

# 중지
docker compose -f docker-compose.unified.yml down
```

### 방법 3: Docker 직접 사용

```bash
# 데이터 디렉토리 생성
mkdir -p data/{db,attach,logs,log,temp}

# 실행
docker run -d \
  --name bokslhome-app \
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

## 📊 설정 상세

### application.yml vs application-docker.yml

**로컬 개발** (`application.yml`):
```yaml
datasource:
  url: jdbc:h2:file:./db/BokslHome_db  # 상대 경로
bokslhome:
  attach-file-path: "./attach"
```

**Docker** (`application-docker.yml`):
```yaml
datasource:
  url: jdbc:h2:file:/app/db/BokslHome_db  # 절대 경로 (볼륨 마운트)
bokslhome:
  attach-file-path: "/app/attach"
```

### 볼륨 매핑

| 컨테이너 내부 | 호스트 경로 | 용도 |
|-------------|-----------|------|
| `/app/db` | `./data/db` | H2 데이터베이스 |
| `/app/attach` | `./data/attach` | 첨부파일 |
| `/app/logs` | `./data/logs` | 애플리케이션 로그 |
| `/app/log` | `./data/log` | Backend 로그 |
| `/app/temp` | `./data/temp` | 임시 파일 |

## 🔧 데이터 관리

### 백업

```bash
# 전체 백업
tar -czf backup-$(date +%Y%m%d).tar.gz data/

# DB만 백업
cp -r data/db data/db.backup
```

### 복원

```bash
# 컨테이너 중지
docker stop bokslhome-app

# 데이터 복원
tar -xzf backup-20251125.tar.gz

# 컨테이너 재시작
docker start bokslhome-app
```

### H2 데이터베이스 직접 접근

```bash
# H2 Console 사용하려면 (개발 모드)
# application-docker.yml에 추가:
spring:
  h2:
    console:
      enabled: true
      path: /h2-console

# 브라우저에서 접속: http://localhost:8080/h2-console
# JDBC URL: jdbc:h2:file:/app/db/BokslHome_db
# Username: sa
# Password: 1122aabb$$
```

### 로그 확인

```bash
# 실시간 로그
docker logs -f bokslhome-app

# Backend 로그 파일
cat data/log/application.log

# 최근 100줄
tail -100 data/log/application.log
```

## 🔄 데이터 마이그레이션

### 다른 서버로 이동

```bash
# 1. 현재 서버에서 백업
docker stop bokslhome-app
tar -czf bokslhome-data.tar.gz data/

# 2. 새 서버로 복사
scp bokslhome-data.tar.gz user@new-server:/path/to/BokslHome-wsl/

# 3. 새 서버에서 복원
tar -xzf bokslhome-data.tar.gz
./docker-run-unified.sh
```

## 📝 주의사항

### 1. 권한 문제

컨테이너는 `appuser:appgroup` (UID 1001)으로 실행됩니다.

```bash
# 권한 문제 발생 시
sudo chown -R 1001:1001 data/
```

### 2. 디스크 공간

```bash
# 디스크 사용량 확인
du -sh data/*

# 임시 파일 정리
rm -rf data/temp/*
```

### 3. 로그 로테이션

로그가 계속 쌓이므로 주기적으로 정리:

```bash
# 오래된 로그 삭제 (7일 이상)
find data/logs -name "*.log" -mtime +7 -delete
```

## 🆚 Named Volume vs Bind Mount

현재 설정은 **Bind Mount**를 사용합니다.

| 방식 | 장점 | 단점 |
|------|------|------|
| **Bind Mount** (현재) | 호스트에서 직접 접근 가능<br>백업 쉬움 | 권한 관리 필요 |
| **Named Volume** | Docker가 관리<br>성능 좋음 | 위치 찾기 어려움 |

Named Volume 사용하려면:

```yaml
# docker-compose.unified.yml
volumes:
  - bokslhome-db:/app/db

volumes:
  bokslhome-db:
    driver: local
```

## 🔒 보안

### 민감한 정보 보호

`data/` 디렉토리에 데이터베이스 비밀번호가 포함되어 있습니다.

```bash
# .gitignore에 추가
echo "data/" >> .gitignore

# 권한 제한
chmod 700 data/db
```

## 📈 모니터링

### 디스크 사용량 모니터링

```bash
# 데이터 크기 확인
watch -n 5 'du -sh data/*'

# Docker 볼륨 확인
docker system df -v
```

---

## 🎉 완료!

이제 Docker 컨테이너를 삭제해도 데이터가 `data/` 폴더에 안전하게 보관됩니다!

```bash
# 컨테이너 삭제해도 데이터는 유지됨
docker rm -f bokslhome-app

# 다시 실행하면 기존 데이터 그대로 사용
./docker-run-unified.sh
```

