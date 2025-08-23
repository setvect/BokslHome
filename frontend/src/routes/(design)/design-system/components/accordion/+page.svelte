<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { ChevronDown, HelpCircle, Settings, FileText, Users, BarChart3 } from '@lucide/svelte';

  // FAQ 데이터
  const faqs = [
    {
      question: "복슬홈이 무엇인가요?",
      answer: "복슬홈은 개인 지식 관리를 위한 올인원 플랫폼입니다. 게시판, 지식 베이스, 노트, 메모 등의 기능을 통해 정보를 체계적으로 관리할 수 있습니다."
    },
    {
      question: "어떤 기술 스택을 사용하나요?",
      answer: "백엔드는 Spring Boot + Kotlin을 사용하고, 프론트엔드는 SvelteKit + TypeScript를 사용합니다. 디자인 시스템으로는 shadcn-svelte와 Tailwind CSS를 활용합니다."
    },
    {
      question: "데이터는 어떻게 저장되나요?",
      answer: "현재는 H2 Database를 사용하고 있으며, 향후 PostgreSQL로 마이그레이션할 예정입니다. 모든 데이터는 안전하게 암호화되어 저장됩니다."
    },
    {
      question: "모바일에서도 사용할 수 있나요?",
      answer: "네, 반응형 웹 디자인으로 구현되어 있어 모바일, 태블릿, 데스크톱 모든 기기에서 최적화된 경험을 제공합니다."
    }
  ];

  // 설정 데이터
  const settingCategories = [
    {
      title: "계정 설정",
      icon: Users,
      items: [
        { name: "프로필 관리", description: "이름, 이메일, 프로필 사진 변경" },
        { name: "비밀번호 변경", description: "보안을 위해 정기적으로 비밀번호를 변경하세요" },
        { name: "2단계 인증", description: "추가 보안 계층으로 계정을 보호하세요" }
      ]
    },
    {
      title: "알림 설정",
      icon: Settings,
      items: [
        { name: "이메일 알림", description: "새 댓글, 멘션, 업데이트 알림 받기" },
        { name: "브라우저 알림", description: "실시간 푸시 알림 설정" },
        { name: "알림 빈도", description: "즉시, 일일 요약, 주간 요약 중 선택" }
      ]
    },
    {
      title: "개인정보 설정",
      icon: BarChart3,
      items: [
        { name: "프로필 공개 설정", description: "다른 사용자에게 보여질 정보 설정" },
        { name: "활동 기록", description: "활동 내역 공개 여부 설정" },
        { name: "데이터 내보내기", description: "개인 데이터를 JSON 형태로 다운로드" }
      ]
    }
  ];

  // 프로젝트 구조 데이터
  const projectStructure = [
    {
      name: "복슬홈 프로젝트",
      children: [
        {
          name: "backend",
          children: [
            { name: "src/main/kotlin/com/setvect/bokslhome" },
            { name: "build.gradle.kts" },
            { name: "application.yml" }
          ]
        },
        {
          name: "frontend",
          children: [
            {
              name: "src",
              children: [
                { name: "routes" },
                { name: "lib/components" },
                { name: "lib/stores" },
                { name: "lib/utils" }
              ]
            },
            { name: "package.json" },
            { name: "vite.config.ts" }
          ]
        },
        {
          name: "docs",
          children: [
            { name: "TODO" },
            { name: "API.md" },
            { name: "README.md" }
          ]
        }
      ]
    }
  ];
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Accordion</h1>
    <p class="text-muted-foreground">아코디언 컴포넌트 - 콘텐츠를 접을 수 있는 섹션으로 구성하여 공간을 효율적으로 사용할 수 있습니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 아코디언</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Accordion.Root class="w-full">
            <Accordion.Item value="item-1">
              <Accordion.Trigger>첫 번째 섹션</Accordion.Trigger>
              <Accordion.Content>
                <p class="text-muted-foreground">
                  이것은 첫 번째 아코디언 섹션의 내용입니다. 클릭하여 내용을 펼치거나 접을 수 있습니다.
                  긴 내용이 있을 때 공간을 절약하면서도 필요할 때만 정보를 표시할 수 있어 유용합니다.
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-2">
              <Accordion.Trigger>두 번째 섹션</Accordion.Trigger>
              <Accordion.Content>
                <p class="text-muted-foreground">
                  두 번째 아코디언 섹션입니다. 각 섹션은 독립적으로 동작하며, 
                  여러 섹션을 동시에 열 수도 있고 하나만 열리도록 설정할 수도 있습니다.
                </p>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="item-3">
              <Accordion.Trigger>세 번째 섹션</Accordion.Trigger>
              <Accordion.Content>
                <div class="space-y-4">
                  <p class="text-muted-foreground">
                    세 번째 섹션에는 다양한 콘텐츠를 포함할 수 있습니다.
                  </p>
                  <div class="flex gap-2">
                    <Button size="sm">액션 1</Button>
                    <Button variant="outline" size="sm">액션 2</Button>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">FAQ 아코디언</h2>
      <Card.Root>
        <Card.Header>
          <Card.Title class="flex items-center gap-2">
            <HelpCircle class="h-5 w-5" />
            자주 묻는 질문
          </Card.Title>
          <Card.Description>복슬홈에 대한 궁금증을 해결해보세요</Card.Description>
        </Card.Header>
        <Card.Content>
          <Accordion.Root class="w-full">
            {#each faqs as faq, index}
              <Accordion.Item value={'faq-' + index}>
                <Accordion.Trigger class="text-left">
                  {faq.question}
                </Accordion.Trigger>
                <Accordion.Content>
                  <p class="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            {/each}
          </Accordion.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">설정 메뉴 아코디언</h2>
      <Card.Root>
        <Card.Header>
          <Card.Title>사용자 설정</Card.Title>
          <Card.Description>계정 및 개인정보 설정을 관리하세요</Card.Description>
        </Card.Header>
        <Card.Content>
          <Accordion.Root class="w-full">
            {#each settingCategories as category, categoryIndex}
              <Accordion.Item value={'settings-' + categoryIndex}>
                <Accordion.Trigger class="text-left">
                  <div class="flex items-center gap-2">
                    <svelte:component this={category.icon} class="h-4 w-4" />
                    {category.title}
                    <Badge variant="outline" class="ml-auto">
                      {category.items.length}개 항목
                    </Badge>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content>
                  <div class="space-y-3">
                    {#each category.items as item}
                      <div class="flex items-start justify-between p-3 border rounded-lg">
                        <div class="flex-1">
                          <div class="font-medium text-sm">{item.name}</div>
                          <div class="text-sm text-muted-foreground">{item.description}</div>
                        </div>
                        <Button variant="outline" size="sm">설정</Button>
                      </div>
                    {/each}
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            {/each}
          </Accordion.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">네스티드 아코디언</h2>
      <Card.Root>
        <Card.Header>
          <Card.Title class="flex items-center gap-2">
            <FileText class="h-5 w-5" />
            프로젝트 구조
          </Card.Title>
          <Card.Description>복슬홈 프로젝트의 폴더 구조를 탐색해보세요</Card.Description>
        </Card.Header>
        <Card.Content>
          <Accordion.Root class="w-full">
            <Accordion.Item value="project-root">
              <Accordion.Trigger class="text-left">
                <div class="flex items-center gap-2">
                  <span class="text-blue-600">📁</span>
                  {projectStructure[0].name}
                </div>
              </Accordion.Trigger>
              <Accordion.Content>
                <div class="space-y-2 pl-4">
                  <Accordion.Root class="w-full">
                    {#each projectStructure[0].children as folder, folderIndex}
                      <Accordion.Item value={'folder-' + folderIndex}>
                        <Accordion.Trigger class="text-left text-sm">
                          <div class="flex items-center gap-2">
                            <span class="text-blue-500">📁</span>
                            {folder.name}
                          </div>
                        </Accordion.Trigger>
                        <Accordion.Content>
                          <div class="space-y-1 pl-4">
                            {#if folder.children}
                              {#each folder.children as file}
                                <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span class="text-gray-500">
                                    {typeof file === 'string' ? '📄' : '📁'}
                                  </span>
                                  {typeof file === 'string' ? file : file.name}
                                </div>
                                {#if typeof file === 'object' && file.children}
                                  <div class="pl-6 space-y-1">
                                    {#each file.children as subFile}
                                      <div class="flex items-center gap-2 text-sm text-muted-foreground">
                                        <span class="text-gray-400">📄</span>
                                        {subFile}
                                      </div>
                                    {/each}
                                  </div>
                                {/if}
                              {/each}
                            {/if}
                          </div>
                        </Accordion.Content>
                      </Accordion.Item>
                    {/each}
                  </Accordion.Root>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">단일 선택 아코디언</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <p class="text-sm text-muted-foreground mb-4">
            type="single" 속성을 사용하면 한 번에 하나의 섹션만 열리도록 할 수 있습니다.
          </p>
          <Accordion.Root type="single" class="w-full" collapsible>
            <Accordion.Item value="single-1">
              <Accordion.Trigger>계정 관리</Accordion.Trigger>
              <Accordion.Content>
                <div class="space-y-3">
                  <div class="p-3 border rounded-lg">
                    <div class="font-medium">프로필 정보</div>
                    <div class="text-sm text-muted-foreground">기본 정보를 수정할 수 있습니다</div>
                  </div>
                  <div class="p-3 border rounded-lg">
                    <div class="font-medium">보안 설정</div>
                    <div class="text-sm text-muted-foreground">비밀번호 및 2FA 설정</div>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="single-2">
              <Accordion.Trigger>알림 설정</Accordion.Trigger>
              <Accordion.Content>
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">이메일 알림</div>
                      <div class="text-sm text-muted-foreground">새로운 활동 알림 받기</div>
                    </div>
                    <input type="checkbox" checked class="rounded" />
                  </div>
                  <div class="flex items-center justify-between">
                    <div>
                      <div class="font-medium">푸시 알림</div>
                      <div class="text-sm text-muted-foreground">브라우저 알림 받기</div>
                    </div>
                    <input type="checkbox" class="rounded" />
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="single-3">
              <Accordion.Trigger>개인정보</Accordion.Trigger>
              <Accordion.Content>
                <div class="space-y-3">
                  <p class="text-muted-foreground">
                    개인정보 처리방침에 따라 데이터를 안전하게 관리합니다.
                  </p>
                  <div class="flex gap-2">
                    <Button size="sm" variant="outline">데이터 내보내기</Button>
                    <Button size="sm" variant="destructive">계정 삭제</Button>
                  </div>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">커스텀 스타일 아코디언</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Accordion.Root class="w-full">
            <Accordion.Item value="custom-1" class="border border-blue-200 rounded-lg mb-2">
              <Accordion.Trigger class="px-4 py-3 hover:bg-blue-50 rounded-t-lg data-[state=open]:rounded-b-none">
                <div class="flex items-center gap-2">
                  <span class="text-blue-600">💡</span>
                  팁: 개발 생산성 높이기
                </div>
              </Accordion.Trigger>
              <Accordion.Content class="px-4 pb-4 bg-blue-50 rounded-b-lg">
                <div class="pt-3 text-sm text-blue-900">
                  <ul class="space-y-2 list-disc list-inside">
                    <li>코드 자동 완성 기능을 적극 활용하세요</li>
                    <li>단축키를 익혀서 마우스 사용을 줄이세요</li>
                    <li>린터와 포매터를 설정해서 코드 품질을 유지하세요</li>
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Item>
            
            <Accordion.Item value="custom-2" class="border border-green-200 rounded-lg mb-2">
              <Accordion.Trigger class="px-4 py-3 hover:bg-green-50 rounded-t-lg data-[state=open]:rounded-b-none">
                <div class="flex items-center gap-2">
                  <span class="text-green-600">✅</span>
                  베스트 프랙티스
                </div>
              </Accordion.Trigger>
              <Accordion.Content class="px-4 pb-4 bg-green-50 rounded-b-lg">
                <div class="pt-3 text-sm text-green-900">
                  <ul class="space-y-2 list-disc list-inside">
                    <li>컴포넌트는 단일 책임 원칙을 따르세요</li>
                    <li>props는 명확하고 일관된 이름을 사용하세요</li>
                    <li>TypeScript 타입을 활용해서 안전성을 높이세요</li>
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Item>
            
            <Accordion.Item value="custom-3" class="border border-orange-200 rounded-lg">
              <Accordion.Trigger class="px-4 py-3 hover:bg-orange-50 rounded-t-lg data-[state=open]:rounded-b-none">
                <div class="flex items-center gap-2">
                  <span class="text-orange-600">⚠️</span>
                  주의사항
                </div>
              </Accordion.Trigger>
              <Accordion.Content class="px-4 pb-4 bg-orange-50 rounded-b-lg">
                <div class="pt-3 text-sm text-orange-900">
                  <ul class="space-y-2 list-disc list-inside">
                    <li>항상 git 커밋 전에 테스트를 실행하세요</li>
                    <li>민감한 정보는 환경 변수로 관리하세요</li>
                    <li>브라우저 호환성을 확인하세요</li>
                  </ul>
                </div>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code>{`<script lang="ts">
  import * as Accordion from '$lib/components/ui/accordion/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Settings, HelpCircle } from '@lucide/svelte';
</script>

<!-- 기본 아코디언 -->
<Accordion.Root class="w-full">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>첫 번째 섹션</Accordion.Trigger>
    <Accordion.Content>
      <p>첫 번째 섹션의 내용입니다.</p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>두 번째 섹션</Accordion.Trigger>
    <Accordion.Content>
      <p>두 번째 섹션의 내용입니다.</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>

<!-- 단일 선택 아코디언 -->
<Accordion.Root type="single" class="w-full" collapsible>
  <Accordion.Item value="single-1">
    <Accordion.Trigger>계정 설정</Accordion.Trigger>
    <Accordion.Content>
      <p>계정 설정 내용</p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="single-2">
    <Accordion.Trigger>알림 설정</Accordion.Trigger>
    <Accordion.Content>
      <p>알림 설정 내용</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>

<!-- 아이콘과 배지가 있는 아코디언 -->
<Accordion.Root class="w-full">
  <Accordion.Item value="settings">
    <Accordion.Trigger class="text-left">
      <div class="flex items-center gap-2">
        <Settings class="h-4 w-4" />
        설정
        <Badge variant="outline" class="ml-auto">3개 항목</Badge>
      </div>
    </Accordion.Trigger>
    <Accordion.Content>
      <div class="space-y-2">
        <Button variant="outline" size="sm">프로필 수정</Button>
        <Button variant="outline" size="sm">알림 설정</Button>
        <Button variant="outline" size="sm">보안 설정</Button>
      </div>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>

<!-- FAQ 스타일 아코디언 -->
<Accordion.Root class="w-full">
  {#each faqs as faq, index}
    <Accordion.Item value={'faq-' + index}>
      <Accordion.Trigger class="text-left">
        {faq.question}
      </Accordion.Trigger>
      <Accordion.Content>
        <p class="text-muted-foreground">{faq.answer}</p>
      </Accordion.Content>
    </Accordion.Item>
  {/each}
</Accordion.Root>

<!-- 커스텀 스타일 아코디언 -->
<Accordion.Root class="w-full">
  <Accordion.Item value="custom" class="border border-blue-200 rounded-lg">
    <Accordion.Trigger class="px-4 py-3 hover:bg-blue-50">
      커스텀 스타일 섹션
    </Accordion.Trigger>
    <Accordion.Content class="px-4 pb-4 bg-blue-50">
      <p>커스텀 스타일이 적용된 내용</p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>`}</code></pre>
    </div>
  </div>
</section>