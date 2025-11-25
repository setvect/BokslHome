# BokslHome 통합 Docker 이미지 가이드

## 🎯 개요

Backend + Frontend를 **하나의 Docker 이미지**로 빌드하여 단일 컨테이너로 실행합니다.

## 📊 분리형 vs 통합형 비교

| 항목 | 분리형 (2개 이미지) | 통합형 (1개 이미지) |
|------|-------------------|-------------------|
| **이미지 수** | backend + frontend = 2개 | 통합 = 1개 |
| **컨테이너 수** | 2개 | 1개 |
| **이미지 크기** | 408MB + 311MB = 719MB | 약 600-650MB |
| **메모리 사용** | 중간 | 낮음 |
| **관리 복잡도** | 중간 (docker-compose) | 낮음 (단일 컨테이너) |
| **확장성** | 높음 (개별 스케일링) | 낮음 (함께 스케일링) |
| **배포 속도** | 느림 (2개 빌드) | 빠름 (1개 빌드) |
| **개발/디버깅** | 쉬움 (개별 재시작) | 중간 |
| **프로덕션** | 권장 (마이크로서비스) | 소규모 프로젝트 적합 |

## 🚀 사용 방법

### 1. 통합 이미지 빌드 및 실행

```bash
# 빌드 스크립트 사용
./docker-build-unified.sh run

# 또는 docker-compose 사용
docker compose -f docker-compose.unified.yml up -d

# 또는 직접 빌드
docker build -f Dockerfile.unified -t bokslhome-unified .
docker run -d -p 3000:3000 -p 8080:8080 bokslhome-unified
```

### 2. 접속

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

### 3. 로그 확인

```bash
# 스크립트 사용
./docker-build-unified.sh logs

# 또는 docker 직접 사용
docker logs -f bokslhome-app
```

### 4. 중지 및 정리

```bash
# 중지
./docker-build-unified.sh stop

# 완전 삭제
./docker-build-unified.sh clean
```

## 📝 스크립트 명령어

```bash
./docker-build-unified.sh build    # 이미지만 빌드
./docker-build-unified.sh run      # 빌드 후 실행
./docker-build-unified.sh stop     # 컨테이너 중지
./docker-build-unified.sh restart  # 재시작
./docker-build-unified.sh logs     # 로그 확인
./docker-build-unified.sh status   # 상태 확인
./docker-build-unified.sh clean    # 정리
```

## 🔧 통합 이미지의 동작 방식

1. **멀티 스테이지 빌드**
   - Stage 1: Frontend 빌드 (Node.js)
   - Stage 2: Backend 빌드 (Gradle)
   - Stage 3: 통합 런타임 (JRE + Node.js)

2. **시작 순서**
   - Backend 먼저 시작 (백그라운드)
   - Backend 헬스체크 대기
   - Frontend 시작 (포어그라운드)

3. **프로세스 관리**
   - Backend: 백그라운드 프로세스
   - Frontend: 메인 프로세스 (컨테이너 종료 시 함께 종료)

## 💡 언제 통합 이미지를 사용할까?

### ✅ 통합 이미지 사용이 좋은 경우:

- 간단한 웹사이트/프로토타입
- 개인 프로젝트 또는 소규모 팀
- 배포/관리가 간단해야 할 때
- 트래픽이 많지 않을 때
- 학습 목적

### ❌ 분리형 이미지를 사용해야 하는 경우:

- 프로덕션 환경
- Frontend/Backend를 독립적으로 스케일링해야 할 때
- 각 서비스를 독립적으로 업데이트해야 할 때
- 고가용성(HA)이 필요할 때
- 마이크로서비스 아키텍처

## 📦 이미지 크기 최적화

현재 통합 이미지는 다음과 같이 최적화되어 있습니다:

- ✅ 멀티 스테이지 빌드로 빌드 도구 제외
- ✅ JRE (JDK 아님) 사용으로 크기 감소
- ✅ Alpine Linux 베이스 이미지
- ✅ Next.js Standalone 모드로 최소 파일만 포함
- ✅ npm ci --production으로 devDependencies 제외

## 🔄 분리형으로 전환하기

나중에 프로덕션 환경에서 분리형으로 전환하고 싶다면:

```bash
# 기존 분리형 사용
./docker-build.sh up

# 또는 docker-compose 사용
docker compose up -d
```

두 방식 모두 사용 가능하니 상황에 맞게 선택하세요!

## 🐛 트러블슈팅

### Backend가 시작되지 않는 경우

```bash
# 로그 확인
docker logs bokslhome-app

# 컨테이너 내부 접속
docker exec -it bokslhome-app sh
cat logs/backend.log
```

### 포트 충돌

```bash
# 포트 변경하여 실행
docker run -d -p 4000:3000 -p 9090:8080 bokslhome-unified
```

## 📈 성능 모니터링

```bash
# 리소스 사용량 확인
docker stats bokslhome-app

# 실시간 로그
docker logs -f --tail=100 bokslhome-app
```

---

**추천**: 개발/테스트 환경에서는 통합 이미지, 프로덕션에서는 분리형 이미지 사용을 권장합니다! 🚀

