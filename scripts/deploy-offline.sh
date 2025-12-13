#!/bin/bash
# scripts/deploy-offline.sh - 오프라인 배포용 이미지/패키지 생성 스크립트

set -euo pipefail

# 색상
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

IMAGE_NAME=${IMAGE_NAME:-"bokslhome"}
VERSION=${1:-"latest"}
TAG="${IMAGE_NAME}:${VERSION}"
OUTPUT_DIR=${OUTPUT_DIR:-"./offline-dist"}
TAR_FILE="${OUTPUT_DIR}/${IMAGE_NAME}-${VERSION}.tar"
TAR_GZ="${TAR_FILE}.gz"
COMPOSE_FILE="${OUTPUT_DIR}/docker-compose.offline.yml"
INSTALL_SCRIPT="${OUTPUT_DIR}/install.sh"
BOKSLHOME_SCRIPT="${OUTPUT_DIR}/bokslhome.sh"
README_FILE="${OUTPUT_DIR}/README.md"
PLATFORM=${PLATFORM:-""} # 예: PLATFORM=linux/amd64

mkdir -p "${OUTPUT_DIR}"

info "1) Docker 이미지 빌드 시작 (tag: ${TAG})"
if [ -n "${PLATFORM}" ]; then
  info "buildx로 지정 플랫폼 빌드: ${PLATFORM}"
  docker buildx build --platform="${PLATFORM}" -t "${TAG}" -f Dockerfile --load .
else
  docker build -t "${TAG}" -f Dockerfile .
fi
success "이미지 빌드 완료: ${TAG}"

info "2) 이미지 tar 저장: ${TAR_FILE}"
docker save -o "${TAR_FILE}" "${TAG}"
success "이미지 저장 완료"

info "3) 압축: ${TAR_GZ}"
gzip -f "${TAR_FILE}"
success "압축 완료"

info "4) 오프라인 compose 파일 생성: ${COMPOSE_FILE}"
cat > "${COMPOSE_FILE}" <<EOF
version: "3.8"

services:
  bokslhome:
    image: ${TAG}
    container_name: bokslhome
    user: "${LOCAL_UID:-1001}:${LOCAL_GID:-1001}"
    restart: unless-stopped
    ports:
      - "3000:3000"
      - "8080:8080"
    environment:
      - TZ=Asia/Seoul
      - JAVA_OPTS=-Xms256m -Xmx512m -XX:+UseG1GC
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_CONFIG_ADDITIONAL_LOCATION=optional:file:/config/
    volumes:
      - ./data/logs:/app/logs
      - ./data/db:/app/db
      - ./data/attach:/app/attach
      - ./data/temp:/app/temp
      - ./data/config:/config
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 5s
      retries: 3
      start_period: 40s
EOF
success "Compose 파일 생성 완료"

info "5) 오프라인 설치 스크립트 생성: ${INSTALL_SCRIPT}"
cat > "${INSTALL_SCRIPT}" <<'EOF'
#!/bin/bash
# offline-dist/install.sh - 오프라인 배포 설치 스크립트

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

step() { echo -e "${BLUE}[STEP]${NC} $1"; }
ok() { echo -e "${GREEN}[OK]${NC} $1"; }
fail() { echo -e "${RED}[ERROR]${NC} $1"; }

IMAGE_TAR_GZ="$(ls -1 *.tar.gz | head -1)"
COMPOSE_FILE="docker-compose.offline.yml"

command -v docker >/dev/null 2>&1 || { fail "Docker가 필요합니다."; exit 1; }
command -v docker compose >/dev/null 2>&1 || { fail "Docker Compose V2가 필요합니다."; exit 1; }

if [ -z "${IMAGE_TAR_GZ}" ]; then
  fail "tar.gz 이미지 파일을 찾을 수 없습니다."
  exit 1
fi

HOST_UID=${LOCAL_UID:-$(id -u)}
HOST_GID=${LOCAL_GID:-$(id -g)}

step "데이터 디렉터리 생성"
mkdir -p data/{db,attach,logs,temp,config}

step "데이터 디렉터리 소유권 정리 (UID:GID=${HOST_UID}:${HOST_GID})"
docker run --rm -v "$PWD/data:/data" alpine sh -c "chown -R ${HOST_UID}:${HOST_GID} /data && chmod -R g+rwX /data"

step "이미지 로드: ${IMAGE_TAR_GZ}"
gunzip -c "${IMAGE_TAR_GZ}" | docker load
ok "이미지 로드 완료"

step "기존 컨테이너/네트워크 정리"
docker compose -f "${COMPOSE_FILE}" down --remove-orphans 2>/dev/null || true

step "컨테이너 기동"
LOCAL_UID=${HOST_UID} LOCAL_GID=${HOST_GID} docker compose -f "${COMPOSE_FILE}" up -d --no-build --force-recreate

step "상태 확인"
docker compose -f "${COMPOSE_FILE}" ps

ok "배포 완료! 포트: 3000(프론트), 8080(백엔드)"
echo "로그 확인: docker logs bokslhome"
EOF
chmod +x "${INSTALL_SCRIPT}"
success "설치 스크립트 생성 완료"

info "5-1) 운영 편의 단일 스크립트 생성: ${BOKSLHOME_SCRIPT}"
cat > "${BOKSLHOME_SCRIPT}" <<'EOF'
#!/bin/bash
# bokslhome.sh - start/stop/restart/log/status helper
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"
COMPOSE_FILE="docker-compose.offline.yml"
SERVICE_NAME="bokslhome"
HOST_UID=${LOCAL_UID:-$(id -u)}
HOST_GID=${LOCAL_GID:-$(id -g)}

ensure_perms() {
  docker run --rm -v "$PWD/data:/data" alpine sh -c "chown -R ${HOST_UID}:${HOST_GID} /data && chmod -R g+rwX /data"
}

start() {
  ensure_perms
  LOCAL_UID=${HOST_UID} LOCAL_GID=${HOST_GID} docker compose -f "${COMPOSE_FILE}" up -d --no-build --force-recreate
}

stop() {
  docker compose -f "${COMPOSE_FILE}" down
}

restart() {
  stop || true
  start
}

logs() {
  docker compose -f "${COMPOSE_FILE}" logs -f "${SERVICE_NAME}"
}

status() {
  docker compose -f "${COMPOSE_FILE}" ps
}

usage() {
  echo "Usage: $0 {start|stop|restart|log|status}"
  exit 1
}

case "${1:-}" in
  start) start ;;
  stop) stop ;;
  restart) restart ;;
  log|logs) logs ;;
  status) status ;;
  *) usage ;;
esac
EOF
chmod +x "${BOKSLHOME_SCRIPT}"

info "6) 패키지 README 생성: ${README_FILE}"
cat > "${README_FILE}" <<EOF
# BokslHome 오프라인 배포 패키지

## 포함 파일
- ${IMAGE_NAME}-${VERSION}.tar.gz: Docker 이미지 압축 파일
- docker-compose.offline.yml: 오프라인 실행용 Compose 파일
- install.sh: 서버에서 실행하는 설치 스크립트

## 사용 방법
1) 패키지 전송
   scp -r ${OUTPUT_DIR}/ user@target:/opt/bokslhome-offline/

2) 서버에서 설치
   ssh user@target
   cd /opt/bokslhome-offline
   chmod +x install.sh
   ./install.sh
   # 필요 시 로컬 계정 UID/GID로 실행 (편집 편의)
   LOCAL_UID=$(id -u) LOCAL_GID=$(id -g) docker compose -f docker-compose.offline.yml up -d --no-build --force-recreate

3) 종료/재기동/로그
   docker compose -f docker-compose.offline.yml down
   docker compose -f docker-compose.offline.yml up -d --no-build
   docker logs bokslhome

## 권한 오류(Permission denied) 발생 시
- sudo가 없을 때: 컨테이너로 소유자 변경
  docker run --rm -v "\$PWD/data:/data" alpine sh -c "chown -R 1001:1001 /data"
- 호스트 편집을 원하면 두 가지 방법 중 선택:
  1) 컨테이너를 내 UID/GID로 실행 (권장)
     docker run --rm -v "\$PWD/data:/data" alpine sh -c "chown -R \$(id -u):\$(id -g) /data"
     LOCAL_UID=$(id -u) LOCAL_GID=$(id -g) docker compose -f docker-compose.offline.yml up -d --no-build --force-recreate
  2) 컨테이너 UID 1001을 유지하고 그룹만 내 GID로 맞추기
     docker run --rm -v "\$PWD/data:/data" alpine sh -c "chown -R 1001:\$(id -g) /data && chmod -R g+rwX /data"
     # 내 계정이 해당 GID 그룹에 속해야 함
- 그 후 재기동
  docker compose -f docker-compose.offline.yml down
  docker compose -f docker-compose.offline.yml up -d --no-build

## 참고
- 데이터/설정은 이 디렉터리의 ./data 하위에 생성/마운트됩니다.
- 다른 아키텍처가 필요하면 로컬 빌드 시 PLATFORM=linux/amd64 ./scripts/deploy-offline.sh 처럼 지정하세요.
EOF
success "README 생성 완료"

echo ""
success "오프라인 패키지 생성 완료: ${OUTPUT_DIR}"
ls -la "${OUTPUT_DIR}"
echo ""
warn "패키지를 서버로 복사 후 install.sh를 실행하세요."
