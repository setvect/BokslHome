import type { KnowledgeAttachment, KnowledgeCollectionMock, KnowledgeDocument } from '@/lib/types/knowledge';

const ATTACHMENT_PLACEHOLDER: KnowledgeAttachment = {
  id: 'att-init-gradle',
  filename: 'init.gradle.temp',
  url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=60',
  description: 'init.gradle.temp 파일이 남아 있는 Finder 화면',
};

export const KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 1804,
    category: 'JAVA',
    question: '[setvect@ip-172-31-37-73 bin]$ jmap -heap',
    questionDetail: `[setvect@ip-172-31-37-73 bin]$ jmap -heap 27781
Object Histogram done.
> jmap -dclass 27781`,
    answerSummary: '[setvect@ip-172-31-37-73 bin]$ jhsdb jmap --heap --pid 27781',
    answerDetail: `jmap 에서 deprecated 된 옵션을 계속 쓰고 있어서 발생하는 메시지입니다. 동일한 기능을 새 도구로 실행하면 됩니다.

1. jhsdb 가 설치되어 있는지 확인합니다.
2. \`jhsdb jmap --heap --pid <PID>\` 형태로 명령을 바꿉니다.
3. 힙 정보를 파일로 받고 싶다면 \`--binaryheap\` 옵션을 추가하세요.`,
    updatedAt: '2022-12-03',
  },
  {
    id: 1803,
    category: 'JAVA',
    question: 'ERROR 22-09-18 08:23:18[main] [o.s.b.SpringApplication] Application run failed',
    questionDetail: `Spring Boot 실행 시 ERROR 로그와 함께 바로 종료됩니다. 로그 뒤쪽에
"Failed to configure a DataSource: 'url' attribute is not specified" 메시지가 따라옵니다.`,
    answerSummary: '결론파일명 변경하라.logback.xml → application.yml 에서 URL 지정',
    answerDetail: `Spring Boot 2.x에서는 DataSource URL이 필수라 누락되면 위 오류가 납니다.
application.yml 에 datasource.url 설정을 추가하거나, 프로필 별로 분리해서 입력하세요.`,
    updatedAt: '2022-09-18',
  },
  {
    id: 1802,
    category: 'JAVA',
    question: '어느날 갑자기 잘 되던게 실행이 안된다-...',
    questionDetail: `로컬에서 잘 되던 Spring 애플리케이션이 어느 날부터 404만 반환합니다.
캐시 삭제, 재시작을 모두 시도했지만 동일합니다.`,
    answerSummary: '쓸데 없는게 들어가서 생긴 문제라 public class Application 이름 수정',
    answerDetail: `main 패키지에 동일한 @SpringBootApplication 이 2개 생겨서 부팅 시 충돌했습니다.
Entry point 클래스를 하나만 남기고, 나머지는 @Configuration 으로 분리하세요.`,
    updatedAt: '2022-05-08',
  },
  {
    id: 1801,
    category: 'JAVA',
    question: '어느날 갑자기 "Module not specified" 가 발생합니다.',
    questionDetail: `IntelliJ 에서 특정 Gradle 프로젝트만 실행 시 Module not specified 로 실패합니다.`,
    answerSummary: 'config 지우고 다시 시작하면 됨',
    answerDetail: `IntelliJ .idea 설정이 꼬여있어서 발생합니다.
1. IDE 종료
2. 프로젝트 루트 .idea 삭제
3. 다시 Import from Gradle`,
    updatedAt: '2022-04-30',
  },
  {
    id: 1800,
    category: 'JAVA',
    question: '이번엔 진짜 어느날 갑자기 안됨',
    questionDetail: `Gradle task 가 갑자기 인식되지 않습니다. \`gradlew tasks\` 도 중간에 멈춥니다.`,
    answerSummary: '예전에 경험했던 일 IntelliJ 로 변경하면 됨',
    answerDetail: `Gradle wrapper 버전이 프로젝트와 안 맞는 상태입니다.
gradle/wrapper/gradle-wrapper.properties 의 distributionUrl 을 7.5로 맞추고 다시 동기화하세요.`,
    updatedAt: '2022-04-18',
  },
  {
    id: 1799,
    category: 'JAVA',
    question: '어느날 갑자기 오류가 남--------Either task...',
    questionDetail: `빌드 시 \`Either task is not defined\` 에러가 발생합니다.`,
    answerSummary: '내 잘 못이야. 수정 전 private AwsLambdaSilentDeploy 문법 오류',
    answerDetail: `build.gradle.kts 에 존재하지 않는 task 명을 dependsOn 으로 등록해서 발생했습니다.
task 이름을 정확히 맞추고, 필요하다면 task 등록 순서를 조정하세요.`,
    updatedAt: '2022-04-18',
  },
  {
    id: 1798,
    category: 'JAVA',
    question: '@SpyBean mocking 할 때 오류가 납니다.',
    questionDetail: `테스트에서 @SpyBean 으로 주입받은 객체 메서드를 doReturn 으로 감쌀 때 InvalidUseOfMatchersException 이 발생합니다.`,
    answerSummary: '참고: https://stackoverflow.com/questions/50617455',
    answerReference: 'https://stackoverflow.com/questions/50617455',
    answerDetail: `spy 객체와 when/then 패턴을 섞어서 사용할 때는 doReturn().when() 패턴을 유지해야 합니다.
또한 Mockito 3 버전 이상을 사용하면 @SpyBean + Kotlin 환경에서도 동일하게 동작합니다.`,
    updatedAt: '2022-03-28',
  },
  {
    id: 1797,
    category: 'JAVA',
    question: '개별 테스트는 잘 되는 데 @Suite 실행 시 실패합니다.',
    questionDetail: `JUnitSuite 로 묶은 테스트만 ClassNotFoundException 이 납니다.`,
    answerSummary: 'https://stackoverflow.com/questions/50617455 (테스트 클래스 경로 확인)',
    answerReference: 'https://stackoverflow.com/questions/50617455',
    answerDetail: `테스트 러너가 module-path 를 인식하지 못해서 발생합니다.
--add-modules 옵션을 추가하거나, Gradle 에서 useJUnitPlatform() 설정을 확인하세요.`,
    updatedAt: '2022-03-24',
  },
  {
    id: 1796,
    category: 'JAVA',
    question: "Task 'publish' not found in root project 'goyard'.",
    questionDetail: `Task 'publish' not found in root project 'goyard'.

* Try:
Run gradle tasks to get a list of available tasks. Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.`,
    answerSummary: '내가 임시로 파일명을 변경해서 발생한 문제',
    answerDetail: `gradle/init.gradle 파일을 임시로 변경해 둔 상태였습니다.
숨김파일 포함해서 탐색기에서 init.gradle.temp 를 삭제하고 다시 빌드하면 해결됩니다.`,
    attachments: [ATTACHMENT_PLACEHOLDER],
    updatedAt: '2022-03-14',
  },
  {
    id: 1795,
    category: 'JAVA',
    question: 'JD-GUI에서 No suitable Java version found 가 뜹니다.',
    questionDetail: `macOS 에서 JD-GUI 실행 시 No suitable Java version found 메시지가 뜨고 바로 종료됩니다.`,
    answerSummary: 'https://118k.tistory.com/10101. 패키지 내 JRE 경로 수정',
    answerReference: 'https://118k.tistory.com/10101',
    answerDetail: `JD-GUI.app/Contents/Info.plist 에 기술된 JVM 버전이 설치된 버전보다 높아서 발생합니다.
/Library/Java/JavaVirtualMachines 경로를 확인하고, 낮은 버전을 요구하도록 Info.plist 를 수정하세요.`,
    updatedAt: '2022-03-02',
  },
];

export function getMockKnowledgeCollection(): KnowledgeCollectionMock {
  return { documents: KNOWLEDGE_DOCUMENTS };
}

export function getMockKnowledgeDocument(id: string | number): KnowledgeDocument | undefined {
  const numericId = typeof id === 'string' ? Number(id) : id;
  return KNOWLEDGE_DOCUMENTS.find((document) => document.id === numericId);
}

export function getKnowledgeCategories(): string[] {
  return Array.from(new Set(KNOWLEDGE_DOCUMENTS.map((document) => document.category)));
}

