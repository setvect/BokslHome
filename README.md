# 복슬홈피

## 개발환경
### backend

- 언어: Kotlin
- 프레임워크: Spring Boot
- 데이터베이스: H2

### frontend

- 언어: TypeScript
- 프레임워크: Svelte

## PC환경에서 실행
### backend

```sh
cd backend
./gradlew bootRun
```

### frontend

```sh
cd frontend
npm install # 최초 한번만 실행
npm run dev
```

## 빌드
### 로컬 개발 환경
```sh
./backend/gradlew buildAll
```

### Docker 빌드
프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:
```sh
docker build -t bokslhome .
```

## 배포
### Docker 컨테이너 실행
```sh
# 프론트엔드(3000)와 백엔드(8080) 포트 모두 노출
docker run -p 3000:3000 -p 8080:8080 bokslhome

# 또는 환경변수 설정과 함께 실행
docker run -p 3000:3000 -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  bokslhome
```

### 배포 구성
- Frontend (SSR): Node.js 서버, 3000 포트
- Backend: Spring Boot 서버, 8080 포트
- 단일 Docker 이미지로 구성되어 있어 간편한 배포 가능


## 원격 서버 배포 방법

### 1. Docker 이미지 빌드
```sh
# 로컬 PC에서 이미지 빌드
docker build -t bokslhome:1.0.0 .  # 버전 태그 추가
```

### 2. Docker 이미지 저장
```sh
# 이미지를 tar 파일로 저장
docker save bokslhome:1.0.0 > bokslhome.tar
```

### 3. 원격 서버로 이미지 전송
```sh
# SSH를 사용하여 tar 파일을 원격 서버로 전송
scp bokslhome.tar user@remote-server:/path/to/destination/

# 또는 다른 파일 전송 방식 사용 (FTP 등)
```

### 4. 원격 서버에서 이미지 로드 및 실행
```sh
# 원격 서버에서 실행
ssh user@remote-server

# 이미지 로드
docker load < bokslhome.tar

# 컨테이너 실행
docker run -d \
  -p 3000:3000 \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  --name bokslhome \
  bokslhome:1.0.0
```

### 컨테이너 관리 명령어
```sh
# 컨테이너 상태 확인
docker ps

# 컨테이너 로그 확인
docker logs bokslhome

# 컨테이너 중지
docker stop bokslhome

# 컨테이너 시작
docker start bokslhome

# 컨테이너 재시작
docker restart bokslhome
```
