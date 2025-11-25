#!/bin/bash

##############################################################################
# WSL2에 Docker 설치 스크립트
# Ubuntu/Debian 기반 배포판용
##############################################################################

set -e

echo "=========================================="
echo "WSL2 Docker 설치 시작"
echo "=========================================="

# 1. 기존 Docker 패키지 제거
echo "기존 Docker 패키지 제거 중..."
sudo apt-get remove -y docker docker-engine docker.io containerd runc 2>/dev/null || true

# 2. 필요한 패키지 설치
echo "필수 패키지 설치 중..."
sudo apt-get update
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 3. Docker GPG 키 추가
echo "Docker GPG 키 추가 중..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 4. Docker 저장소 추가
echo "Docker 저장소 추가 중..."
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 5. Docker 설치
echo "Docker 설치 중..."
sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# 6. Docker 서비스 시작
echo "Docker 서비스 시작 중..."
sudo service docker start

# 7. 현재 사용자를 docker 그룹에 추가
echo "사용자를 docker 그룹에 추가 중..."
sudo usermod -aG docker $USER

# 8. 설치 확인
echo ""
echo "=========================================="
echo "설치 완료!"
echo "=========================================="
docker --version
docker compose version

echo ""
echo "=========================================="
echo "중요: 다음 명령을 실행하거나 WSL을 재시작하세요"
echo "=========================================="
echo "newgrp docker"
echo ""
echo "또는"
echo "wsl --shutdown (Windows PowerShell에서)"
echo "그 후 WSL 재시작"
echo "=========================================="

