# BokslHome Docker 통합 가이드

Docker로 BokslHome을 실행할 때 필요한 볼륨/설정/권한/운영 방법을 한 곳에 모았습니다.

## 1. 데이터/볼륨 구조

모든 데이터는 리포지토리 루트의 `./data/` 아래에 저장합니다(기본 bind mount).

```
data/
├─ db/        # H2 데이터베이스 파일
├─ attach/    # 첨부파일
├─ logs/      # 애플리케이션 로그 (backend.log 등)
├─ log/       # backend 개별 로그 디렉터리
├─ temp/      # 임시 파일
└─ config/    # 외부 설정(application*.yml)
```

## 2. 실행 방법

### A. Docker Compose(권장)
이미지가 있다면 재빌드 없이 실행:
```bash
docker compose up -d --no-build
```
이미지까지 새로 빌드:
```bash
docker compose up -d --build
```
주요 옵션은 `docker-compose.yml`에 포함되어 있습니다:
- 포트: 3000(프론트), 8080(백엔드)
- 설정: `SPRING_CONFIG_ADDITIONAL_LOCATION=optional:file:/config/`
- 볼륨: `./data/*` → `/app/*`, `./data/config` → `/config`

### B. 스크립트 사용
한 번에 빌드+실행:
```bash
./scripts/docker-build.sh run
```
이미지 빌드만:
```bash
./scripts/docker-build.sh build
```

### C. 직접 docker run
```bash
DATA_DIR="$(pwd)/data"
mkdir -p "$DATA_DIR"/{db,attach,logs,temp,config}

docker run -d \
  --name bokslhome-app \
  -p 3000:3000 -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=docker \
  -e SPRING_CONFIG_ADDITIONAL_LOCATION=optional:file:/config/ \
  -v "$DATA_DIR/db:/app/db" \
  -v "$DATA_DIR/attach:/app/attach" \
  -v "$DATA_DIR/logs:/app/logs" \
  -v "$DATA_DIR/temp:/app/temp" \
  -v "$DATA_DIR/config:/config" \
  bokslhome:latest
```

## 3. 외부 설정(application*.yml)

호스트에서 관리하고 컨테이너가 읽도록 `/config`로 마운트합니다.
```bash
mkdir -p data/config
cp backend/src/main/resources/application.yml data/config/
cp backend/src/main/resources/application-docker.yml data/config/
```
Compose와 스크립트 모두 `/config` 마운트와 `SPRING_CONFIG_ADDITIONAL_LOCATION=optional:file:/config/`를 이미 포함합니다. `data/config`의 파일을 수정한 뒤 컨테이너를 재시작하면 반영됩니다.

## 4. 권한(퍼미션) 문제 해결

컨테이너 기본 UID/GID는 1001(appuser). 호스트 디렉터리에 쓰기 권한이 없을 때:
```bash
# 방법 1: 스크립트
./scripts/fix-permissions.sh

# 방법 2: 소유자 변경
sudo chown -R 1001:1001 ./data/

# 방법 3: 호스트 사용자로 컨테이너 실행
docker run --user $(id -u):$(id -g) ...  # 위 run 예시에 --user 추가
```

## 5. 로그/상태 확인

```bash
docker compose logs -f         # compose 사용 시
docker logs -f bokslhome-app   # 단일 컨테이너

ls -l data/logs data/log       # 호스트에서 로그 파일 위치
```

## 6. 백업/복원

전체 데이터 백업:
```bash
tar -czf backup-$(date +%Y%m%d).tar.gz data/
```
복원:
```bash
docker stop bokslhome-app 2>/dev/null || true
tar -xzf backup-YYYYMMDD.tar.gz
docker compose up -d --no-build    # 또는 docker run ...
```

## 7. 트러블슈팅

- 포트 점유: `lsof -i:3000`, `lsof -i:8080` 확인 후 필요 시 호스트 포트 변경(`-p 4000:3000` 등).
- Permission denied: `./scripts/fix-permissions.sh` 또는 `sudo chown -R 1001:1001 ./data/`.
- 백엔드 미기동/로그 없음: `docker logs`, `data/logs/backend.log` 확인. H2 파일 경로가 `/app/db`로 마운트됐는지 확인.
- 컨테이너 포트가 안 열릴 때: `docker ps`, `docker inspect -f '{{json .HostConfig.PortBindings}}' bokslhome-app`로 포트 publish 여부 확인.

## 8. 추가 참고

- H2 콘솔을 열려면 `application-docker.yml`에서 `spring.h2.console.enabled=true`, `path=/h2-console` 설정 후 `http://localhost:8080/h2-console` 접속.
- 새 서버로 이전 시: `tar`로 `data/` 압축 → 새 서버에 복사 → 압축 해제 후 compose/run 실행.
