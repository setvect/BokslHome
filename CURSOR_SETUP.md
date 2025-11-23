# Cursor AI 개발 환경 설정 가이드

IntelliJ IDEA에서 Cursor AI로 개발 환경을 전환하기 위한 가이드입니다.

## 1. 필수 확장 프로그램 설치

Cursor를 열고 다음 확장 프로그램을 설치하세요:

1. **Kotlin Language** (`fwcd.kotlin`)
   - Kotlin 언어 지원 및 Language Server
   - 설치: `Ctrl+Shift+X` → "Kotlin" 검색 → "Kotlin Language" 설치

2. **Extension Pack for Java** (`vscjava.vscode-java-pack`)
   - Java/Kotlin 개발에 필요한 확장 모음
   - 설치: `Ctrl+Shift+X` → "Extension Pack for Java" 검색 → 설치

3. **Gradle for Java** (`vscjava.vscode-gradle`)
   - Gradle 프로젝트 지원
   - 설치: `Ctrl+Shift+X` → "Gradle for Java" 검색 → 설치

4. **Spring Boot Extension Pack** (선택사항)
   - Spring Boot 개발 도구
   - 설치: `Ctrl+Shift+X` → "Spring Boot Extension Pack" 검색 → 설치

> **팁**: `.vscode/extensions.json` 파일이 있으면 Cursor가 자동으로 권장 확장 프로그램을 제안합니다.

## 2. 프로젝트 열기

1. Cursor에서 `File` → `Open Folder...` 선택
2. 프로젝트 루트 디렉토리 (`/home/setve/BokslHome-wsl`) 선택
3. Cursor가 자동으로 Gradle 프로젝트를 인식하고 빌드합니다

## 3. Gradle 프로젝트 동기화

프로젝트를 열면 자동으로 Gradle 동기화가 시작됩니다. 수동으로 동기화하려면:

1. `Ctrl+Shift+P` (또는 `Cmd+Shift+P` on Mac)
2. "Gradle: Refresh Gradle Project" 입력 후 실행

## 4. 주요 단축키

### 일반
- `Ctrl+Shift+P`: 명령 팔레트
- `Ctrl+P`: 파일 빠른 열기
- `Ctrl+Shift+F`: 전체 프로젝트 검색
- `Ctrl+B`: 사이드바 토글

### Kotlin/Java 개발
- `F12`: 정의로 이동
- `Shift+F12`: 참조 찾기
- `Alt+F12`: 정의 미리보기
- `Ctrl+Space`: 자동 완성
- `Ctrl+Shift+Space`: 매개변수 힌트
- `F2`: 심볼 이름 바꾸기
- `Ctrl+.`: 빠른 수정

### 디버깅
- `F5`: 디버깅 시작
- `F9`: 중단점 토글
- `F10`: Step Over
- `F11`: Step Into
- `Shift+F11`: Step Out

## 5. 디버깅 설정

Spring Boot 애플리케이션을 디버깅하려면 `.vscode/launch.json` 파일을 생성하세요:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "Spring Boot App",
      "request": "launch",
      "mainClass": "com.setvect.bokslhome.BokslHomeApplicationKt",
      "projectName": "backend",
      "args": "",
      "envFile": "${workspaceFolder}/backend/.env"
    }
  ]
}
```

> **참고**: `mainClass`는 실제 메인 클래스 경로로 변경해야 합니다.

## 6. 빌드 및 실행

### 터미널에서 실행

```bash
# Backend 실행
cd backend
./gradlew bootRun

# Frontend 실행
cd frontend
npm run dev
```

### Cursor 통합 터미널 사용

- `Ctrl+`` (백틱): 터미널 열기/닫기
- `Ctrl+Shift+``: 새 터미널 생성

## 7. IntelliJ와의 차이점

### 장점
- ✅ AI 기반 코드 자동 완성 및 제안
- ✅ 더 가벼운 에디터
- ✅ VS Code 생태계 활용 가능
- ✅ 무료

### 주의사항
- ⚠️ IntelliJ의 일부 고급 리팩토링 기능은 제한적
- ⚠️ Kotlin Language Server가 IntelliJ만큼 성숙하지 않을 수 있음
- ⚠️ 일부 IntelliJ 전용 플러그인은 사용 불가

## 8. 문제 해결

### Kotlin Language Server가 작동하지 않는 경우

1. 확장 프로그램이 설치되어 있는지 확인
2. `Ctrl+Shift+P` → "Kotlin: Restart Language Server" 실행
3. Cursor 재시작

### Gradle 프로젝트가 인식되지 않는 경우

1. `Ctrl+Shift+P` → "Java: Clean Java Language Server Workspace" 실행
2. Cursor 재시작
3. 프로젝트 폴더 다시 열기

### 빌드 오류가 발생하는 경우

```bash
# Gradle 캐시 정리
cd backend
./gradlew clean
./gradlew build --refresh-dependencies
```

## 9. 추가 리소스

- [Kotlin Language Server 문서](https://github.com/fwcd/kotlin-language-server)
- [VS Code Java 문서](https://code.visualstudio.com/docs/languages/java)
- [Gradle VS Code 확장 문서](https://github.com/microsoft/vscode-gradle)

## 10. IntelliJ 프로젝트 파일 정리 (선택사항)

IntelliJ를 더 이상 사용하지 않는다면 다음 파일들을 삭제할 수 있습니다:

```bash
# .idea 폴더 삭제 (이미 .gitignore에 추가됨)
rm -rf .idea
rm -rf backend/.idea

# .iml 파일 삭제
find . -name "*.iml" -delete
```

> **주의**: 팀원이 IntelliJ를 사용한다면 이 파일들을 삭제하지 마세요.

