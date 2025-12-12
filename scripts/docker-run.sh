#!/bin/bash

##############################################################################
# BokslHome 통합 컨테이너 실행 스크립트 (외부 데이터 디렉토리 사용)
##############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

SCRIPT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
DATA_DIR="$SCRIPT_DIR/data"

# 데이터 디렉토리 생성
log_info "데이터 디렉토리 준비 중..."
mkdir -p "$DATA_DIR/db"
mkdir -p "$DATA_DIR/attach"
mkdir -p "$DATA_DIR/logs"
mkdir -p "$DATA_DIR/temp"

# 권한 설정 (Docker 컨테이너 사용자 UID:GID = 1001:1001)
log_info "권한 설정 중..."
sudo chown -R 1001:1001 "$DATA_DIR" 2>/dev/null || \
    log_warning "권한 설정 실패. sudo 권한이 필요합니다."

log_success "데이터 디렉토리 준비 완료: $DATA_DIR"

# 기존 컨테이너 정리
if docker ps -a | grep -q bokslhome-app; then
    log_warning "기존 컨테이너 제거 중..."
    docker rm -f bokslhome-app 2>/dev/null || true
fi

# 컨테이너 실행
log_info "컨테이너 시작 중..."
docker run -d \
    --name bokslhome-app \
    -p 3000:3000 \
    -p 8080:8080 \
    -e SPRING_PROFILES_ACTIVE=docker \
    -v "$DATA_DIR/db:/app/db" \
    -v "$DATA_DIR/attach:/app/attach" \
    -v "$DATA_DIR/logs:/app/logs" \
    -v "$DATA_DIR/temp:/app/temp" \
    bokslhome:latest

log_success "컨테이너 시작 완료!"
echo ""
log_info "==================================================="
log_info "Frontend:   http://localhost:3000"
log_info "Backend:    http://localhost:8080"
log_info ""
log_info "데이터 위치: $DATA_DIR"
log_info "  - DB:      $DATA_DIR/db"
log_info "  - 첨부파일: $DATA_DIR/attach"
log_info "  - 로그:    $DATA_DIR/logs"
log_info "==================================================="
echo ""
log_info "로그 확인: docker logs -f bokslhome-app"
