# BokslHome Docker 가이드

Docker로 BokslHome을 실행, 배포할 때 필요한 구조와 명령을 정리했습니다.

## 1. 데이터 볼륨 구조
모든 데이터는 리포지터리 루트의 `./data/` 아래에 둡니다(bind mount).
```
data/
├─ db/        # H2 데이터베이스 파일
├─ attach/    # 첨부 파일
├─ logs/      # 애플리케이션 로그 (backend.log 등)
├─ temp/      # 임시 파일
└─ config/    # 외부 설정(application*.yml)
```

## 2. 실행 방법

### A. Docker Compose(권장)
이미지가 있다면 바로 실행:
```bash
docker compose up -d --no-build
```
빌드까지 포함:
```bash
docker compose up -d --build
```
주요 설정은 `docker-compose.yml` 참고(포트 3000/8080, `/config` 마운트, 데이터 볼륨 등).

### B. 스크립트 사용
한 번에 빌드+실행:
```bash
./scripts/docker-build.sh run
```
이미지만 빌드:
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
호스트에서 관리하고 컨테이너가 참고하도록 `/config`에 마운트합니다.
```bash
mkdir -p data/config
cp backend/src/main/resources/application.yml data/config/
cp backend/src/main/resources/application-docker.yml data/config/
```
Compose와 스크립트 모두 `/config` 마운트를 사용하므로 `data/config` 내 파일을 수정하면 컨테이너에 반영됩니다.

## 4. 권한(퍼미션 이슈 해결)
컨테이너 기본 UID/GID는 1001(appuser)입니다. 호스트 디렉터리 권한 문제 시:
```bash
# 방법 1: 스크립트
./scripts/fix-permissions.sh

# 방법 2: 수동 chown
sudo chown -R 1001:1001 ./data/

# 방법 3: 호스트 사용자로 컨테이너 실행
docker run --user $(id -u):$(id -g) ...
```

## 5. 로그/상태 확인
```bash
docker compose logs -f         # compose 사용 시
docker logs -f bokslhome-app   # 단일 컨테이너

ls -l data/logs data/log       # 호스트 로그 파일 위치
```

## 6. 백업/복원
전체 데이터를 백업:
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
- 포트 점유: `lsof -i:3000`, `lsof -i:8080` 확인 후 필요 시 포트 매핑 변경(`-p 4000:3000`).
- Permission denied: `./scripts/fix-permissions.sh` 또는 `sudo chown -R 1001:1001 ./data/`.
- 백엔드 미기동/로그 없음: `docker logs`, `data/logs/backend.log` 확인. H2 파일 경로가 `/app/db`로 마운트됐는지 점검.
- 컨테이너 포트가 안 열릴 때: `docker ps`, `docker inspect -f '{{json .HostConfig.PortBindings}}' bokslhome-app`로 포트 publish 확인.

## 8. 추가 참고
- H2 콘솔을 열려면 `application-docker.yml`에서 `spring.h2.console.enabled=true`, `path=/h2-console`, URL `http://localhost:8080/h2-console`.
- 서버 이전 시 `data/`를 `tar`로 묶어 함께 옮기면 데이터 복사까지 한번에 가능.

## 9. Docker Hub 없이 이미지 전송/고립(오프라인)

이미지 빌드→저장→전송→로드 순서로 Docker Hub 없이 배포할 수 있습니다.

### A. deploy-offline.sh (권장)
- 실행: `./scripts/deploy-offline.sh [버전]` (기본 latest, OUTPUT_DIR 기본 `./offline-dist`)
- 작업: 이미지 빌드 → `bokslhome-<버전>.tar.gz` 생성 → `docker-compose.offline.yml`(포트 3000/8080, `/config` 등 동일 마운트), `install.sh`, `README.md` 생성
- 옵션: 다른 아키텍처 필요 시 `PLATFORM=linux/amd64 ./scripts/deploy-offline.sh`
- 서버 배포 예시:
  ```bash
  scp -r offline-dist/ user@target:/opt/bokslhome-offline/
  ssh user@target
  cd /opt/bokslhome-offline
  chmod +x install.sh
  ./install.sh
  ```
  패키지 디렉터리의 `./data` 하위가 볼륨 마운트 지점입니다(`config`, `db`, `logs` 등). 필요하면 `data/config`를 함께 전송하세요.

### B. 수동 (필요 시)
1) 이미지 빌드: `docker build -t bokslhome:latest .`  
2) 저장: `docker save -o bokslhome.tar bokslhome:latest`  
3) 전송: scp/rsync/USB 등  
4) 로드: `docker load -i bokslhome.tar`  
5) 실행: `docker compose up -d --no-build` 또는 `docker run ... bokslhome:latest`

### C. 여러 이미지 번들
```bash
docker save -o bundle.tar image1:tag image2:tag
```
서버에서 `docker load -i bundle.tar`로 순차 로드 가능합니다.

### D. 주의
- 아키텍처: 빌드 머신과 서버 OS/CPU(amd64/arm64)가 일치해야 합니다. 다르면 `PLATFORM=... ./scripts/deploy-offline.sh`로 빌드하세요.
- 설정/데이터: `data/config` 등 필수 볼륨이 서버에도 존재해야 합니다. 필요시 함께 압축 전송하세요.
