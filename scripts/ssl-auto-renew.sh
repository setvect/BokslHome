#!/bin/bash
# BokslHome SSL 자동 갱신 및 nginx reload 스크립트

set -euo pipefail

DOMAIN="${DOMAIN:-example.com}"
LOG_FILE="${LOG_FILE:-/var/log/ssl-renew.log}"
DATE=$(date '+%Y-%m-%d %H:%M:%S')

log() { echo "[$DATE] $1" | sudo tee -a "$LOG_FILE"; }

log "=== SSL 갱신 시작 (domain=${DOMAIN}) ==="

CERT_PATH="/etc/letsencrypt/live/${DOMAIN}/fullchain.pem"
if [ ! -f "$CERT_PATH" ]; then
  log "인증서 경로가 없습니다: $CERT_PATH"
  exit 1
fi

log "현재 만료일: $(sudo openssl x509 -enddate -noout -in "$CERT_PATH" | cut -d= -f2)"

if sudo /usr/bin/certbot renew --quiet; then
  log "certbot renew 성공"
  if sudo /usr/sbin/nginx -t; then
    log "nginx 설정 테스트 성공"
    sudo /usr/sbin/nginx -s reload
    log "nginx reload 완료"
    log "갱신 후 만료일: $(sudo openssl x509 -enddate -noout -in "$CERT_PATH" | cut -d= -f2)"
  else
    log "nginx 설정 테스트 실패"
    exit 1
  fi
else
  log "certbot renew 실패"
  exit 1
fi

log "=== SSL 갱신 완료 ==="
