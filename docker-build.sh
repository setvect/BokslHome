#!/bin/bash

##############################################################################
# BokslHome Docker 빌드 및 배포 스크립트
# 
# 사용법:
#   ./docker-build.sh [옵션]
#
# 옵션:
#   build       - 이미지 빌드만 수행
#   up          - 컨테이너 시작 (빌드 포함)
#   down        - 컨테이너 중지 및 제거
#   restart     - 컨테이너 재시작
#   logs        - 로그 확인
#   clean       - 빌드 캐시 및 볼륨 정리
#   status      - 컨테이너 상태 확인
#   help        - 도움말 표시
##############################################################################

set -e

# 색상 정의
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 로그 함수
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 도움말 표시
show_help() {
    cat << EOF
BokslHome Docker 빌드 및 배포 스크립트

사용법:
  ./docker-build.sh [옵션]

옵션:
  build       - 이미지 빌드만 수행
  up          - 컨테이너 시작 (빌드 포함)
  down        - 컨테이너 중지 및 제거
  restart     - 컨테이너 재시작
  logs        - 로그 확인
  clean       - 빌드 캐시 및 볼륨 정리
  status      - 컨테이너 상태 확인
  help        - 도움말 표시

예시:
  ./docker-build.sh build          # 이미지만 빌드
  ./docker-build.sh up             # 빌드 후 컨테이너 시작
  ./docker-build.sh down           # 컨테이너 중지
  ./docker-build.sh logs backend   # backend 로그 확인
  
Nginx 포함 실행:
  docker compose --profile with-nginx up -d

EOF
}

# Docker 및 Docker Compose 확인
check_dependencies() {
    log_info "의존성 확인 중..."
    
    if ! command -v docker &> /dev/null; then
        log_error "Docker가 설치되어 있지 않습니다."
        exit 1
    fi
    
    if ! docker compose version &> /dev/null; then
        log_error "Docker Compose가 설치되어 있지 않습니다."
        exit 1
    fi
    
    log_success "의존성 확인 완료"
}

# 빌드 수행
build_images() {
    log_info "Docker 이미지 빌드 시작..."
    
    # Backend 빌드
    log_info "Backend 이미지 빌드 중..."
    docker compose build backend
    
    # Frontend 빌드
    log_info "Frontend 이미지 빌드 중..."
    docker compose build frontend
    
    log_success "모든 이미지 빌드 완료"
}

# 컨테이너 시작
start_containers() {
    log_info "컨테이너 시작 중..."
    docker compose up -d
    
    log_info "컨테이너 시작 대기 중..."
    sleep 5
    
    docker compose ps
    
    log_success "컨테이너 시작 완료"
    log_info "Frontend: http://localhost:3000"
    log_info "Backend:  http://localhost:8080"
}

# 컨테이너 중지
stop_containers() {
    log_info "컨테이너 중지 중..."
    docker compose down
    log_success "컨테이너 중지 완료"
}

# 컨테이너 재시작
restart_containers() {
    log_info "컨테이너 재시작 중..."
    docker compose restart
    log_success "컨테이너 재시작 완료"
}

# 로그 확인
show_logs() {
    if [ -z "$2" ]; then
        docker compose logs -f
    else
        docker compose logs -f "$2"
    fi
}

# 정리
clean_all() {
    log_warning "모든 컨테이너, 이미지, 볼륨을 정리하시겠습니까? (y/N)"
    read -r response
    
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        log_info "정리 시작..."
        
        # 컨테이너 중지 및 제거
        docker compose down -v
        
        # 이미지 제거
        docker compose down --rmi all
        
        # 빌드 캐시 정리
        docker builder prune -f
        
        log_success "정리 완료"
    else
        log_info "정리 취소됨"
    fi
}

# 상태 확인
check_status() {
    log_info "컨테이너 상태 확인..."
    docker compose ps
    
    echo ""
    log_info "볼륨 상태 확인..."
    docker volume ls | grep bokslhome || log_warning "볼륨이 없습니다."
}

# 메인 로직
main() {
    # 스크립트 디렉토리로 이동
    cd "$(dirname "$0")"
    
    case "${1:-help}" in
        build)
            check_dependencies
            build_images
            ;;
        up)
            check_dependencies
            build_images
            start_containers
            ;;
        down)
            stop_containers
            ;;
        restart)
            restart_containers
            ;;
        logs)
            show_logs "$@"
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
}

# 스크립트 실행
main "$@"

