# =============================================================================
# BokslHome 통합 Dockerfile
# Backend (Spring Boot) + Frontend (Next.js)를 하나의 이미지로 빌드
# =============================================================================

# -----------------------------------------------------------------------------
# Stage 1: Frontend 빌드
# -----------------------------------------------------------------------------
FROM node:20-alpine AS frontend-builder
WORKDIR /frontend

# 의존성 설치
COPY frontend/package*.json ./
RUN npm ci

# 소스 복사 및 빌드
COPY frontend .
# Build-time API base URL (override with --build-arg)
ARG NEXT_PUBLIC_API_URL=http://localhost:8080
ARG NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_API_BASE_URL=${NEXT_PUBLIC_API_BASE_URL}
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Backend 빌드
# -----------------------------------------------------------------------------
FROM eclipse-temurin:21-jdk-alpine AS backend-builder
WORKDIR /backend

# Gradle 설정 및 의존성 다운로드
COPY backend/gradlew .
COPY backend/gradle gradle
COPY backend/build.gradle.kts .
COPY backend/settings.gradle.kts .
RUN ./gradlew dependencies --no-daemon || true

# 소스 복사 및 빌드
COPY backend/src src
RUN ./gradlew clean build -x test --no-daemon

# -----------------------------------------------------------------------------
# Stage 3: 통합 런타임
# -----------------------------------------------------------------------------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# 타임존 설정 및 Node.js 설치
RUN apk add --no-cache tzdata nodejs npm && \
    cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
    echo "Asia/Seoul" > /etc/timezone && \
    apk del tzdata

# Non-root 사용자 생성
RUN addgroup -g 1001 -S appgroup && \
    adduser -u 1001 -S appuser -G appgroup

# Backend WAR 파일 복사
COPY --from=backend-builder --chown=appuser:appgroup \
    /backend/build/libs/bokslhome-0.0.1-SNAPSHOT.war ./backend/app.war

# Frontend Standalone 빌드 복사
COPY --from=frontend-builder --chown=appuser:appgroup \
    /frontend/.next/standalone ./frontend/
COPY --from=frontend-builder --chown=appuser:appgroup \
    /frontend/.next/static ./frontend/.next/static
COPY --from=frontend-builder --chown=appuser:appgroup \
    /frontend/public ./frontend/public

# 로그 및 데이터 디렉토리 생성
RUN mkdir -p logs log db attach temp && \
    chown -R appuser:appgroup logs log db attach temp

# 시작 스크립트 생성
RUN printf '#!/bin/sh\n\
set -e\n\
\n\
echo "=========================================="\n\
echo "BokslHome 통합 서버 시작"\n\
echo "=========================================="\n\
\n\
# Backend 시작 (백그라운드)\n\
echo "Backend 시작 중... (포트 8080)"\n\
cd /app\n\
java $JAVA_OPTS -Dspring.profiles.active=docker -jar backend/app.war > logs/backend.log 2>&1 &\n\
BACKEND_PID=$!\n\
echo "Backend PID: $BACKEND_PID"\n\
echo "Spring Profile: docker"\n\
\n\
# Backend 준비 대기 (30초)\n\
echo "Backend 준비 대기 중 (약 30초)..."\n\
for i in $(seq 1 15); do\n\
    echo "대기 중... $i/15"\n\
    sleep 2\n\
    if wget -q --spider http://localhost:8080 2>/dev/null; then\n\
        echo "Backend 준비 완료!"\n\
        break\n\
    fi\n\
done\n\
echo "Backend 시작 완료 (또는 타임아웃)"\n\
\n\
# Frontend 시작 (포어그라운드)\n\
echo "Frontend 시작 중... (포트 3000)"\n\
cd /app/frontend\n\
export NODE_ENV=production\n\
export PORT=3000\n\
export HOSTNAME="0.0.0.0"\n\
export NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL:-http://localhost:8080}\n\
\n\
echo "=========================================="\n\
echo "서버 시작 완료!"\n\
echo "Frontend: http://localhost:3000"\n\
echo "Backend:  http://localhost:8080"\n\
echo "=========================================="\n\
\n\
exec node server.js\n\
' > start.sh

RUN chmod +x start.sh && chown appuser:appgroup start.sh

# 사용자 전환
USER appuser

# 포트 노출
EXPOSE 3000 8080

# 볼륨 노출 (데이터 저장소 위치 알림)
VOLUME ["/app/logs", "/app/log", "/app/db", "/app/attach", "/app/temp"]

# 환경 변수
ENV JAVA_OPTS="-Xms256m -Xmx512m -XX:+UseG1GC -XX:+UseContainerSupport"
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# 헬스체크 (Frontend 체크)
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# 시작 스크립트 실행
CMD ["./start.sh"]
