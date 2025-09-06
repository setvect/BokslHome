<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Separator } from '$lib/components/ui/separator/index.js';
  import { Heart, MessageCircle, Share, User, Calendar, Eye, BookOpen, FileText, Lightbulb } from '@lucide/svelte';

  // 게시글 카드 데이터
  const posts = [
    {
      id: 1,
      title: 'SvelteKit 5 Runes 완전 가이드',
      excerpt: 'Svelte 5의 새로운 반응성 시스템인 Runes를 활용한 현대적인 웹 개발 방법을 알아봅시다.',
      author: '김개발',
      date: '2024-01-15',
      category: '개발',
      views: 245,
      likes: 18,
      comments: 12,
      image: null
    },
    {
      id: 2,
      title: '복슬홈 UI 디자인 시스템',
      excerpt: 'shadcn-svelte와 Tailwind CSS를 활용한 일관성 있는 디자인 시스템 구축 과정을 공유합니다.',
      author: '박디자인',
      date: '2024-01-14',
      category: '디자인',
      views: 189,
      likes: 24,
      comments: 8,
      image: null
    }
  ];

  // 지식 베이스 카드 데이터
  const knowledge = [
    {
      id: 1,
      title: 'TypeScript 고급 타입 시스템',
      description: '제네릭, 유니온 타입, 조건부 타입 등 고급 TypeScript 개념들',
      tags: ['TypeScript', 'Frontend', '고급'],
      lastUpdated: '2024-01-15',
      difficulty: 'Advanced'
    },
    {
      id: 2,
      title: 'Spring Boot JWT 인증 구현',
      description: 'JWT를 활용한 스프링 부트 보안 시스템 구축 방법',
      tags: ['Spring Boot', 'JWT', 'Security'],
      lastUpdated: '2024-01-14',
      difficulty: 'Intermediate'
    }
  ];

  // 노트 카드 데이터
  const notes = [
    {
      id: 1,
      title: '회의록 - 프로젝트 킥오프',
      preview: '복슬홈 프로젝트의 목표와 일정, 역할 분담에 대해 논의했습니다...',
      category: '회의',
      createdAt: '2024-01-15 14:30',
      updatedAt: '2024-01-15 16:45'
    },
    {
      id: 2,
      title: '학습 노트 - 리액티브 프로그래밍',
      preview: 'RxJS와 Svelte의 반응성을 비교하며 리액티브 프로그래밍 패러다임을 공부...',
      category: '학습',
      createdAt: '2024-01-14 09:20',
      updatedAt: '2024-01-14 09:20'
    }
  ];

  function getDifficultyBadgeVariant(difficulty: string) {
    switch (difficulty) {
      case 'Beginner':
        return 'secondary';
      case 'Intermediate':
        return 'default';
      case 'Advanced':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  function getDifficultyText(difficulty: string) {
    switch (difficulty) {
      case 'Beginner':
        return '초급';
      case 'Intermediate':
        return '중급';
      case 'Advanced':
        return '고급';
      default:
        return difficulty;
    }
  }
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Card</h1>
    <p class="text-muted-foreground">카드 컴포넌트 - 관련된 정보를 그룹화하여 표시하는 컨테이너입니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 카드</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card.Root>
          <Card.Header>
            <Card.Title>기본 카드</Card.Title>
            <Card.Description>간단한 카드 예제입니다.</Card.Description>
          </Card.Header>
          <Card.Content>
            <p class="text-sm">카드 내용이 여기에 표시됩니다. 다양한 정보를 구조화하여 보여줄 수 있습니다.</p>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <Card.Title>액션이 있는 카드</Card.Title>
            <Card.Description>버튼과 액션을 포함한 카드입니다.</Card.Description>
          </Card.Header>
          <Card.Content>
            <p class="text-sm">사용자가 상호작용할 수 있는 요소들을 포함할 수 있습니다.</p>
          </Card.Content>
          <Card.Footer class="flex justify-between">
            <Button variant="outline">취소</Button>
            <Button>확인</Button>
          </Card.Footer>
        </Card.Root>

        <Card.Root>
          <Card.Header>
            <div class="flex items-start justify-between">
              <div>
                <Card.Title>헤더가 복잡한 카드</Card.Title>
                <Card.Description>배지와 아이콘을 포함한 헤더</Card.Description>
              </div>
              <Badge variant="secondary">New</Badge>
            </div>
          </Card.Header>
          <Card.Content>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <User class="h-4 w-4" />
              <span>복슬 개발자</span>
              <Separator orientation="vertical" class="h-4" />
              <Calendar class="h-4 w-4" />
              <span>2024-01-15</span>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">게시글 카드</h2>
      <div class="grid gap-4 md:grid-cols-2">
        {#each posts as post}
          <Card.Root class="hover:shadow-md transition-shadow">
            <Card.Header>
              <div class="flex items-start justify-between">
                <Badge variant="outline">{post.category}</Badge>
                <div class="flex items-center gap-4 text-sm text-muted-foreground">
                  <div class="flex items-center gap-1">
                    <Eye class="h-3 w-3" />
                    <span>{post.views}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Heart class="h-3 w-3" />
                    <span>{post.likes}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <MessageCircle class="h-3 w-3" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
              <Card.Title class="leading-tight">{post.title}</Card.Title>
              <Card.Description class="line-clamp-2">{post.excerpt}</Card.Description>
            </Card.Header>
            <Card.Footer class="flex items-center justify-between">
              <div class="flex items-center gap-2 text-sm text-muted-foreground">
                <User class="h-4 w-4" />
                <span>{post.author}</span>
                <Separator orientation="vertical" class="h-4" />
                <span>{post.date}</span>
              </div>
              <Button variant="ghost" size="sm">
                <Share class="h-4 w-4" />
              </Button>
            </Card.Footer>
          </Card.Root>
        {/each}
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">지식 베이스 카드</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each knowledge as item}
          <Card.Root class="hover:shadow-md transition-shadow">
            <Card.Header>
              <div class="flex items-center gap-2 mb-2">
                <BookOpen class="h-5 w-5 text-primary" />
                <Badge variant={getDifficultyBadgeVariant(item.difficulty)}>
                  {getDifficultyText(item.difficulty)}
                </Badge>
              </div>
              <Card.Title class="text-lg">{item.title}</Card.Title>
              <Card.Description>{item.description}</Card.Description>
            </Card.Header>
            <Card.Content>
              <div class="flex flex-wrap gap-1">
                {#each item.tags as tag}
                  <Badge variant="outline" class="text-xs">{tag}</Badge>
                {/each}
              </div>
            </Card.Content>
            <Card.Footer>
              <div class="flex items-center gap-2 text-sm text-muted-foreground w-full">
                <Calendar class="h-3 w-3" />
                <span>업데이트: {item.lastUpdated}</span>
              </div>
            </Card.Footer>
          </Card.Root>
        {/each}
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">노트 카드</h2>
      <div class="grid gap-4 md:grid-cols-2">
        {#each notes as note}
          <Card.Root class="hover:shadow-md transition-shadow">
            <Card.Header>
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-2">
                  <FileText class="h-4 w-4 text-primary" />
                  <Badge variant="secondary">{note.category}</Badge>
                </div>
              </div>
              <Card.Title class="text-lg leading-tight">{note.title}</Card.Title>
            </Card.Header>
            <Card.Content>
              <p class="text-sm text-muted-foreground line-clamp-3">{note.preview}</p>
            </Card.Content>
            <Card.Footer>
              <div class="flex flex-col gap-1 text-xs text-muted-foreground w-full">
                <div class="flex items-center gap-2">
                  <span>생성: {note.createdAt}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span>수정: {note.updatedAt}</span>
                </div>
              </div>
            </Card.Footer>
          </Card.Root>
        {/each}
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">스탯 카드</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card.Root>
          <Card.Content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">총 게시글</p>
                <p class="text-2xl font-bold">1,234</p>
                <p class="text-xs text-muted-foreground mt-1">+12% from last month</p>
              </div>
              <FileText class="h-8 w-8 text-muted-foreground" />
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">지식 베이스</p>
                <p class="text-2xl font-bold">567</p>
                <p class="text-xs text-muted-foreground mt-1">+8% from last month</p>
              </div>
              <BookOpen class="h-8 w-8 text-muted-foreground" />
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">노트</p>
                <p class="text-2xl font-bold">89</p>
                <p class="text-xs text-muted-foreground mt-1">+3% from last month</p>
              </div>
              <Lightbulb class="h-8 w-8 text-muted-foreground" />
            </div>
          </Card.Content>
        </Card.Root>

        <Card.Root>
          <Card.Content class="p-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">사용자</p>
                <p class="text-2xl font-bold">45</p>
                <p class="text-xs text-muted-foreground mt-1">+15% from last month</p>
              </div>
              <User class="h-8 w-8 text-muted-foreground" />
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import * as Card from '$lib/components/ui/card/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
</script>

<!-- 기본 카드 -->
<Card.Root>
  <Card.Header>
    <Card.Title>카드 제목</Card.Title>
    <Card.Description>카드 설명</Card.Description>
  </Card.Header>
  <Card.Content>
    <p>카드 내용</p>
  </Card.Content>
  <Card.Footer>
    <Button>액션</Button>
  </Card.Footer>
</Card.Root>

<!-- 게시글 카드 -->
<Card.Root class="hover:shadow-md transition-shadow">
  <Card.Header>
    <div class="flex items-start justify-between">
      <Badge variant="outline">카테고리</Badge>
      <div class="text-sm text-muted-foreground">
        조회 245 · 좋아요 18
      </div>
    </div>
    <Card.Title>게시글 제목</Card.Title>
    <Card.Description>게시글 요약</Card.Description>
  </Card.Header>
  <Card.Footer>
    <div class="text-sm text-muted-foreground">
      작성자 · 2024-01-15
    </div>
  </Card.Footer>
</Card.Root>`}</code
        ></pre>
    </div>
  </div>
</section>

<style>
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
