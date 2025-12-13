# BokslHome SSL 설정 가이드 (예시: example.com)

본 문서는 BokslHome을 특정 도메인(예: `example.com`)으로 HTTPS 배포하기 위한 스크립트 사용법을 정리합니다. 대상 환경은 Ubuntu(apt) + 호스트 nginx + Docker 컨테이너가 3000/8080으로 노출된 상태입니다.

## 준비 사항
- DNS: `example.com`(또는 원하는 서브도메인)이 서버 공인 IP를 가리키는지 확인.
- 포트: 80/443 방화벽 개방. UFW 사용 시 스크립트가 규칙을 추가합니다.
- Docker/컨테이너: BokslHome 컨테이너가 `localhost:3000`(프론트), `localhost:8080`(백엔드)에 접근 가능해야 합니다(`docker compose up -d` 등으로 기동).

## 1) 최초 SSL 설정
스크립트: `scripts/setup-nginx-ssl.sh`

```bash
sudo bash scripts/setup-nginx-ssl.sh example.com admin@example.com
```

동작:
- nginx 설치/기동, `/var/www/bokslhome` 웹루트 생성
- 80포트 서버블록에 ACME challenge 및 리버스 프록시(3000, 8080) 설정
- certbot(webroot)으로 인증서 발급
- 443 서버블록 적용(HTTPS 리다이렉트, HSTS, 3000/8080 프록시, health 체크)
- UFW가 있으면 `Nginx Full`/`22` 허용
- cron에 `certbot renew && nginx reload` 등록(매일 03:00)

## 2) 자동 갱신 스크립트(선택 실행/테스트)
스크립트: `scripts/ssl-auto-renew.sh`

```bash
sudo DOMAIN=example.com bash scripts/ssl-auto-renew.sh
```

역할:
- `certbot renew` 실행 후 nginx 설정 테스트/리로드
- 로그: `/var/log/ssl-renew.log` (환경변수 `LOG_FILE`로 변경 가능)

cron은 `setup-nginx-ssl.sh`에서 이미 등록되지만, 별도 주기로 운영하고 싶다면 root crontab에 추가할 수 있습니다.

## 확인/문제 해결
- 인증서 정보: `sudo certbot certificates`
- nginx 상태: `sudo systemctl status nginx`, `sudo nginx -t`
- 포트 리스닝: `sudo lsof -i:80`, `sudo lsof -i:443`
- 애플리케이션 헬스: `curl -I https://example.com/health` (200 OK 확인)

## 주의
- 스크립트는 Ubuntu/apt 환경을 가정합니다(다른 OS는 수동 설정 필요).
- HTTPS 적용 후에는 80포트가 443으로 리다이렉트됩니다.
- 도메인/이메일은 인자로 변경 가능하지만, 기본값은 `example.com`입니다.
