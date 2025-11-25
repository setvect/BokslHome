# 🚀 BokslHome Docker 빠른 시작

## 📦 필요한 것
- Docker 설치됨
- WSL2 환경 (Windows)

## ⚡ 3단계로 시작하기

### 1️⃣ 빌드
\`\`\`bash
./scripts/docker-build.sh build
\`\`\`

### 2️⃣ 권한 설정 (최초 1회)
\`\`\`bash
./scripts/fix-permissions.sh
# 비밀번호 입력
\`\`\`

### 3️⃣ 실행
\`\`\`bash
./scripts/docker-run.sh
\`\`\`

## 🌐 접속
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

## 📁 데이터 위치
모든 데이터는 \`./data/\` 폴더에 저장됩니다:
- \`data/db/\` - 데이터베이스
- \`data/attach/\` - 첨부파일
- \`data/logs/\` - 로그

## 🔧 유용한 명령어

\`\`\`bash
# 로그 보기
docker logs -f bokslhome-app

# 중지
docker stop bokslhome-app

# 재시작
docker restart bokslhome-app

# 완전 삭제 (데이터는 유지)
docker rm -f bokslhome-app
docker rmi bokslhome

# 재빌드 후 실행
./scripts/docker-build.sh run
\`\`\`

## 📚 더 자세한 정보
- [상세 가이드](README.docker.md)
- [데이터 관리](README.docker-volume.md)
- [설정 가이드](SETUP.md)
