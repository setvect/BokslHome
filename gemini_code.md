# Gemini Code - Project Context for BokslHome

이 문서는 Gemini Code가 BokslHome 프로젝트에 대한 질문에 답변하고 작업을 수행하는 데 사용하는 컨텍스트입니다.

## 1. 프로젝트 개요

- **프로젝트명**: BokslHome (복슬홈피)
- **설명**: 기존 "BokslPortal" 프로젝트를 개편한 풀스택 웹 애플리케이션입니다.
- **주요 기능**: 게시판, 복슬지식, 복슬노트, 복슬메모, 관계, 댓글, 첨부파일, 로또 번호 생성기 등.

## 2. 기술 스택

### 2.1. 백엔드

- **언어**: Kotlin
- **프레임워크**: Spring Boot
- **빌드 도구**: Gradle
- **데이터베이스**: H2 (개발용)

### 2.2. 프론트엔드

- **언어**: TypeScript
- **프레임워크**: Svelte


## 3. 프로젝트 구조

- `backend/`: Kotlin/Spring Boot 백엔드 소스 코드
- `frontend/`: TypeScript/Svelte 프론트엔드 소스 코드
- `db/`: H2 데이터베이스 파일
- `Dockerfile`: 프론트엔드와 백엔드를 함께 빌드하여 단일 Docker 이미지를 생성
- `build.gradle.kts`: 전체 프로젝트 및 백엔드 모듈의 빌드 스크립트
- `README.md`: 프로젝트 설정, 빌드, 배포에 대한 상세 가이드

## 4. 주요 명령어

### 4.1. 개발 환경 실행

- **백엔드 실행**:
  ```sh
  cd backend
  ./gradlew bootRun
  ```
- **프론트엔드 실행**:
  ```sh
  cd frontend
  npm install # 최초 한 번
  npm run dev
  ```

### 4.2. 빌드

- **로컬 빌드 (Front + Back)**:
  ```sh
  ./backend/gradlew buildAll
  ```
- **Docker 이미지 빌드**:
  ```sh
  docker build -t bokslhome .
  ```

### 4.3. 배포 (Docker)

- **Docker 컨테이너 실행**:
  ```sh
  docker run -p 3000:3000 -p 8080:8080 bokslhome
  ```

## 5. 작업 가이드라인

- 제공된 컨텍스트를 기반으로 일관성 있는 코드 스타일과 아키텍처를 유지합니다.
- 새로운 기능 추가 시 기존 코드베이스의 패턴을 따릅니다.
- 커밋 메시지 등 별도의 규칙이 주어지면 해당 규칙을 준수합니다.
- "npm run" 명령어는 직접 실행하지 말고 사용자가 실행하도록 하고 명령어를 알려준다.
