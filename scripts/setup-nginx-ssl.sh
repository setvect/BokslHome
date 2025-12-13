#!/bin/bash
# BokslHome SSL 프로비저닝 스크립트 (nginx + certbot)
# 용도: Ubuntu/apt 환경에서 지정 도메인(예: example.com)에 대한 무료 SSL 발급 및 nginx 리버스 프록시 설정

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

info() { echo -e "${BLUE}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

DOMAIN="${1:-example.com}"
EMAIL="${2:-}"
WEBROOT="/var/www/bokslhome"
NGINX_SITE="/etc/nginx/sites-available/${DOMAIN}"

if [ -z "${EMAIL}" ]; then
  error "사용법: sudo $0 <domain> <email>"
  echo "예시: sudo $0 example.com admin@example.com"
  exit 1
fi

info "도메인: ${DOMAIN}"
info "이메일: ${EMAIL}"

info "1) nginx 설치 및 기본 준비"
sudo apt update
sudo apt install -y nginx
sudo systemctl enable --now nginx

info "2) 웹루트 및 권한 준비: ${WEBROOT}"
sudo mkdir -p "${WEBROOT}"
sudo chown -R www-data:www-data "${WEBROOT}"

info "3) HTTP용 nginx 서버블록 작성 (ACME challenge 포함)"
sudo tee "${NGINX_SITE}" > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN};

    root ${WEBROOT};

    location /.well-known/acme-challenge/ {
        allow all;
    }

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_buffering off;
    }

    location /api/ {
        # keep /api prefix when forwarding to backend
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /health {
        access_log off;
        return 200 "OK\n";
        add_header Content-Type text/plain;
    }
}
EOF

sudo ln -sf "${NGINX_SITE}" "/etc/nginx/sites-enabled/${DOMAIN}"
sudo nginx -t
sudo systemctl reload nginx
success "HTTP 서버블록 적용 완료 (ACME 준비)"

info "4) certbot 설치 및 SSL 발급 (webroot 모드)"
sudo apt install -y certbot python3-certbot-nginx
if sudo certbot certonly --webroot -w "${WEBROOT}" -d "${DOMAIN}" --email "${EMAIL}" --agree-tos --non-interactive --rsa-key-size 4096; then
  success "SSL 인증서 발급 완료"
else
  error "SSL 인증서 발급 실패"
  exit 1
fi

info "5) HTTPS 리다이렉트 + 인증서 적용 구성으로 업데이트"
sudo tee "${NGINX_SITE}" > /dev/null <<EOF
server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    root ${WEBROOT};

    ssl_certificate /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";

    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_buffering off;
    }

    location /api/ {
        # keep /api prefix when forwarding to backend
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /health {
        access_log off;
        return 200 "OK\n";
        add_header Content-Type text/plain;
    }
}
EOF

sudo nginx -t
sudo systemctl reload nginx
success "HTTPS 설정 적용 완료"

info "6) 방화벽(UFW) 열기 (설치되어 있는 경우만)"
if command -v ufw >/dev/null 2>&1; then
  sudo ufw allow 'Nginx Full'
  sudo ufw allow 22
  success "방화벽 규칙 적용 완료"
else
  warn "ufw 미설치: 방화벽 규칙은 수동 적용 필요"
fi

info "7) 인증서 자동 갱신 cron 등록"
(sudo crontab -l 2>/dev/null; echo "0 3 * * * /usr/bin/certbot renew --quiet && /usr/sbin/nginx -s reload") | sudo crontab -
success "cron 등록 완료"

echo ""
success "SSL 설정 완료! https://${DOMAIN} 에서 확인하세요."
