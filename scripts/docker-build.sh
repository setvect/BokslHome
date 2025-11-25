#!/bin/bash

##############################################################################
# BokslHome 통합 이미지 빌드 및 실행 스크립트
##############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }

show_help() {
    cat << EOF
BokslHome 통합 이미지 빌드 스크립트

사용법:
  ./docker-build-unified.sh [옵션]

옵션:
  build       - 통합 이미지 빌드
  run         - 컨테이너 실행 (빌드 포함)
  stop        - 컨테이너 중지
  logs        - 로그 확인
  restart     - 재시작
  clean       - 이미지 및 컨테이너 삭제
  status      - 상태 확인

예시:
  ./docker-build-unified.sh build    # 이미지만 빌드
  ./docker-build-unified.sh run      # 빌드 후 실행
  ./docker-build-unified.sh logs     # 로그 확인

EOF
}

IMAGE_NAME="bokslhome"
CONTAINER_NAME="bokslhome-app"

build_image() {
    log_info "통합 이미지 빌드 시작..."
    docker build -f Dockerfile -t $IMAGE_NAME:latest .
    log_success "이미지 빌드 완료: $IMAGE_NAME:latest"
    docker images | grep $IMAGE_NAME
}

run_container() {
    log_info "컨테이너 실행 중..."
    
    # 기존 컨테이너 확인 및 중지
    if docker ps -a | grep -q $CONTAINER_NAME; then
        log_warning "기존 컨테이너 발견. 중지 및 제거 중..."
        docker stop $CONTAINER_NAME 2>/dev/null || true
        docker rm $CONTAINER_NAME 2>/dev/null || true
    fi
    
    # 호스트 데이터 디렉토리 생성 (없는 경우)
    DATA_DIR="$PROJECT_ROOT/data"
    mkdir -p "$DATA_DIR/logs" "$DATA_DIR/log" "$DATA_DIR/db" "$DATA_DIR/attach" "$DATA_DIR/temp"
    
    # 새 컨테이너 실행 (호스트 디렉토리 직접 마운트)
    docker run -d \
        --name $CONTAINER_NAME \
        -p 3000:3000 \
        -p 8080:8080 \
        -v "$DATA_DIR/logs:/app/logs" \
        -v "$DATA_DIR/log:/app/log" \
        -v "$DATA_DIR/db:/app/db" \
        -v "$DATA_DIR/attach:/app/attach" \
        -v "$DATA_DIR/temp:/app/temp" \
        $IMAGE_NAME:latest
    
    log_info "컨테이너 시작 대기 중..."
    sleep 5
    
    docker ps | grep $CONTAINER_NAME
    
    log_success "컨테이너 실행 완료!"
    log_info "Frontend: http://localhost:3000"
    log_info "Backend:  http://localhost:8080"
    log_info "데이터 디렉토리: $DATA_DIR"
}

stop_container() {
    log_info "컨테이너 중지 중..."
    docker stop $CONTAINER_NAME
    log_success "컨테이너 중지 완료"
}

show_logs() {
    docker logs -f $CONTAINER_NAME
}

restart_container() {
    log_info "컨테이너 재시작 중..."
    docker restart $CONTAINER_NAME
    log_success "재시작 완료"
}

clean_all() {
    log_warning "컨테이너와 이미지를 삭제하시겠습니까? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        log_info "정리 시작..."
        docker stop $CONTAINER_NAME 2>/dev/null || true
        docker rm $CONTAINER_NAME 2>/dev/null || true
        docker rmi $IMAGE_NAME:latest 2>/dev/null || true
        log_success "정리 완료"
    else
        log_info "정리 취소됨"
    fi
}

check_status() {
    log_info "컨테이너 상태:"
    docker ps -a | grep $CONTAINER_NAME || log_warning "컨테이너가 없습니다"
    
    echo ""
    log_info "이미지:"
    docker images | grep $IMAGE_NAME || log_warning "이미지가 없습니다"
}

# 프로젝트 루트로 이동
SCRIPT_PATH="$(readlink -f "$0")"
SCRIPT_DIR="$(dirname "$SCRIPT_PATH")"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

case "${1:-help}" in
    build)
        build_image
        ;;
    run)
        build_image
        run_container
        ;;
    stop)
        stop_container
        ;;
    logs)
        show_logs
        ;;
    restart)
        restart_container
        ;;
    clean)
        clean_all
        ;;
    status)
        check_status
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        log_error "알 수 없는 명령: $1"
        echo ""
        show_help
        exit 1
        ;;
esac

