<script lang="ts">
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Table from '$lib/components/ui/table/index.js';
  import { CheckCircle, XCircle, Clock, AlertTriangle, Star, User, Tag } from '@lucide/svelte';

  // 샘플 데이터
  const posts = [
    { id: 1, title: 'SvelteKit 5 Runes 가이드', status: 'published', category: '개발', priority: 'high', likes: 24 },
    { id: 2, title: 'TypeScript 고급 패턴', status: 'draft', category: '개발', priority: 'medium', likes: 0 },
    { id: 3, title: 'UI/UX 디자인 원칙', status: 'review', category: '디자인', priority: 'low', likes: 12 },
    { id: 4, title: 'React vs Svelte 비교', status: 'archived', category: '개발', priority: 'high', likes: 45 }
  ];

  const users = [
    { id: 1, name: '복슬이', role: 'admin', status: 'online', posts: 23, exp: 'expert' },
    { id: 2, name: '이개발', role: 'developer', status: 'offline', posts: 12, exp: 'intermediate' },
    { id: 3, name: '박디자인', role: 'designer', status: 'away', posts: 8, exp: 'beginner' },
    { id: 4, name: '최사용자', role: 'user', status: 'online', posts: 3, exp: 'beginner' }
  ];

  const notifications = [
    { id: 1, type: 'success', message: '게시글이 발행되었습니다', unread: true },
    { id: 2, type: 'warning', message: '저장되지 않은 변경사항', unread: true },
    { id: 3, type: 'error', message: '업로드 실패', unread: false },
    { id: 4, type: 'info', message: '새로운 댓글이 있습니다', unread: true }
  ];

  function getStatusBadgeVariant(status: string) {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
      case 'review':
        return 'outline';
      case 'archived':
        return 'destructive';
      default:
        return 'outline';
    }
  }

  function getStatusText(status: string) {
    switch (status) {
      case 'published':
        return '발행';
      case 'draft':
        return '초안';
      case 'review':
        return '검토';
      case 'archived':
        return '보관';
      default:
        return status;
    }
  }

  function getPriorityBadgeVariant(priority: string) {
    switch (priority) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'default';
      case 'low':
        return 'secondary';
      default:
        return 'outline';
    }
  }

  function getPriorityText(priority: string) {
    switch (priority) {
      case 'high':
        return '높음';
      case 'medium':
        return '보통';
      case 'low':
        return '낮음';
      default:
        return priority;
    }
  }

  function getRoleBadgeVariant(role: string) {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'developer':
        return 'default';
      case 'designer':
        return 'secondary';
      case 'user':
        return 'outline';
      default:
        return 'outline';
    }
  }

  function getStatusIndicatorBadgeVariant(status: string) {
    switch (status) {
      case 'online':
        return 'default';
      case 'away':
        return 'secondary';
      case 'offline':
        return 'outline';
      default:
        return 'outline';
    }
  }

  function getStatusIndicatorText(status: string) {
    switch (status) {
      case 'online':
        return '온라인';
      case 'away':
        return '자리비움';
      case 'offline':
        return '오프라인';
      default:
        return status;
    }
  }

  function getNotificationBadgeVariant(type: string) {
    switch (type) {
      case 'success':
        return 'default';
      case 'warning':
        return 'secondary';
      case 'error':
        return 'destructive';
      case 'info':
        return 'outline';
      default:
        return 'outline';
    }
  }

  function getExperienceBadgeVariant(exp: string) {
    switch (exp) {
      case 'expert':
        return 'default';
      case 'intermediate':
        return 'secondary';
      case 'beginner':
        return 'outline';
      default:
        return 'outline';
    }
  }

  function getExperienceText(exp: string) {
    switch (exp) {
      case 'expert':
        return '전문가';
      case 'intermediate':
        return '중급자';
      case 'beginner':
        return '초보자';
      default:
        return exp;
    }
  }
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Badge</h1>
    <p class="text-muted-foreground">배지 컴포넌트 - 상태, 카테고리, 레이블 등을 간결하게 표시하는 작은 태그입니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 배지 변형</h2>
      <div class="flex flex-wrap gap-2">
        <Badge variant="default">기본</Badge>
        <Badge variant="secondary">보조</Badge>
        <Badge variant="destructive">삭제</Badge>
        <Badge variant="outline">아웃라인</Badge>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">상태 배지</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-lg font-medium">게시글 상태</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="default" class="flex items-center gap-1">
              <CheckCircle class="h-3 w-3" />
              발행됨
            </Badge>
            <Badge variant="secondary" class="flex items-center gap-1">
              <Clock class="h-3 w-3" />
              초안
            </Badge>
            <Badge variant="outline" class="flex items-center gap-1">
              <AlertTriangle class="h-3 w-3" />
              검토 중
            </Badge>
            <Badge variant="destructive" class="flex items-center gap-1">
              <XCircle class="h-3 w-3" />
              보관됨
            </Badge>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">우선순위</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="destructive">높음</Badge>
            <Badge variant="default">보통</Badge>
            <Badge variant="secondary">낮음</Badge>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">사용자 상태</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="default" class="bg-green-500">
              <span class="w-2 h-2 bg-white rounded-full mr-1"></span>
              온라인
            </Badge>
            <Badge variant="secondary" class="bg-yellow-500">
              <span class="w-2 h-2 bg-white rounded-full mr-1"></span>
              자리비움
            </Badge>
            <Badge variant="outline" class="border-gray-400">
              <span class="w-2 h-2 bg-gray-400 rounded-full mr-1"></span>
              오프라인
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">역할 및 권한 배지</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-lg font-medium">사용자 역할</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="destructive" class="flex items-center gap-1">
              <User class="h-3 w-3" />
              관리자
            </Badge>
            <Badge variant="default" class="flex items-center gap-1">
              <User class="h-3 w-3" />
              개발자
            </Badge>
            <Badge variant="secondary" class="flex items-center gap-1">
              <User class="h-3 w-3" />
              디자이너
            </Badge>
            <Badge variant="outline" class="flex items-center gap-1">
              <User class="h-3 w-3" />
              사용자
            </Badge>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">경험 수준</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="default" class="flex items-center gap-1">
              <Star class="h-3 w-3" />
              전문가
            </Badge>
            <Badge variant="secondary" class="flex items-center gap-1">
              <Star class="h-3 w-3" />
              중급자
            </Badge>
            <Badge variant="outline" class="flex items-center gap-1">
              <Star class="h-3 w-3" />
              초보자
            </Badge>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">카테고리 및 태그</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-lg font-medium">콘텐츠 카테고리</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="outline" class="flex items-center gap-1">
              <Tag class="h-3 w-3" />
              개발
            </Badge>
            <Badge variant="outline" class="flex items-center gap-1">
              <Tag class="h-3 w-3" />
              디자인
            </Badge>
            <Badge variant="outline" class="flex items-center gap-1">
              <Tag class="h-3 w-3" />
              기획
            </Badge>
            <Badge variant="outline" class="flex items-center gap-1">
              <Tag class="h-3 w-3" />
              마케팅
            </Badge>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">기술 태그</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="default">JavaScript</Badge>
            <Badge variant="default">TypeScript</Badge>
            <Badge variant="secondary">Svelte</Badge>
            <Badge variant="secondary">React</Badge>
            <Badge variant="outline">Node.js</Badge>
            <Badge variant="outline">Python</Badge>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">테이블에서의 활용</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>제목</Table.Head>
                <Table.Head>상태</Table.Head>
                <Table.Head>카테고리</Table.Head>
                <Table.Head>우선순위</Table.Head>
                <Table.Head>좋아요</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each posts as post}
                <Table.Row>
                  <Table.Cell class="font-medium">{post.title}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={getStatusBadgeVariant(post.status)}>
                      {getStatusText(post.status)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant="outline">{post.category}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={getPriorityBadgeVariant(post.priority)}>
                      {getPriorityText(post.priority)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    {#if post.likes > 0}
                      <Badge variant="secondary" class="flex items-center gap-1 w-fit">
                        <Star class="h-3 w-3" />
                        {post.likes}
                      </Badge>
                    {:else}
                      <span class="text-muted-foreground">-</span>
                    {/if}
                  </Table.Cell>
                </Table.Row>
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">사용자 카드에서의 활용</h2>
      <div class="grid gap-4 md:grid-cols-2">
        {#each users as user}
          <Card.Root>
            <Card.Content class="p-4">
              <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User class="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div class="font-medium flex items-center gap-2">
                      {user.name}
                      <Badge variant={getStatusIndicatorBadgeVariant(user.status)} class="text-xs">
                        {getStatusIndicatorText(user.status)}
                      </Badge>
                    </div>
                    <div class="flex items-center gap-2 mt-1">
                      <Badge variant={getRoleBadgeVariant(user.role)}>
                        {user.role}
                      </Badge>
                      <Badge variant={getExperienceBadgeVariant(user.exp)}>
                        {getExperienceText(user.exp)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" class="text-xs">
                  {user.posts}개 게시글
                </Badge>
              </div>
            </Card.Content>
          </Card.Root>
        {/each}
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">알림에서의 활용</h2>
      <Card.Root>
        <Card.Header>
          <Card.Title class="flex items-center justify-between">
            알림
            <Badge variant="destructive" class="text-xs">
              {notifications.filter((n) => n.unread).length}개 읽지 않음
            </Badge>
          </Card.Title>
        </Card.Header>
        <Card.Content class="space-y-2">
          {#each notifications as notification}
            <div class="flex items-center gap-3 p-2 border rounded-lg {notification.unread ? '' : 'opacity-60'}">
              <Badge variant={getNotificationBadgeVariant(notification.type)} class="text-xs">
                {notification.type}
              </Badge>
              <span class="flex-1 text-sm">{notification.message}</span>
              {#if notification.unread}
                <div class="w-2 h-2 bg-primary rounded-full"></div>
              {/if}
            </div>
          {/each}
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">인터랙티브 배지</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-lg font-medium">닫기 버튼이 있는 배지</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="secondary" class="flex items-center gap-2">
              JavaScript
              <Button variant="ghost" size="sm" class="h-3 w-3 p-0 text-xs">×</Button>
            </Badge>
            <Badge variant="secondary" class="flex items-center gap-2">
              TypeScript
              <Button variant="ghost" size="sm" class="h-3 w-3 p-0 text-xs">×</Button>
            </Badge>
            <Badge variant="secondary" class="flex items-center gap-2">
              Svelte
              <Button variant="ghost" size="sm" class="h-3 w-3 p-0 text-xs">×</Button>
            </Badge>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">클릭 가능한 배지</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="outline" class="cursor-pointer hover:bg-accent">#개발</Badge>
            <Badge variant="outline" class="cursor-pointer hover:bg-accent">#디자인</Badge>
            <Badge variant="outline" class="cursor-pointer hover:bg-accent">#기획</Badge>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">크기 변형</h2>
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Badge variant="default" class="text-xs px-2 py-1">Small</Badge>
          <Badge variant="default">Default</Badge>
          <Badge variant="default" class="text-base px-3 py-1.5">Large</Badge>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Star, User, Tag } from '@lucide/svelte';

  // 동적 배지 variant 설정
  function getStatusBadgeVariant(status: string) {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'secondary';
      case 'inactive': return 'outline';
      case 'error': return 'destructive';
      default: return 'outline';
    }
  }
</script>

<!-- 기본 배지 -->
<Badge variant="default">기본</Badge>
<Badge variant="secondary">보조</Badge>
<Badge variant="destructive">위험</Badge>
<Badge variant="outline">아웃라인</Badge>

<!-- 아이콘과 함께 -->
<Badge variant="default" class="flex items-center gap-1">
  <Star class="h-3 w-3" />
  인기
</Badge>

<Badge variant="secondary" class="flex items-center gap-1">
  <User class="h-3 w-3" />
  관리자
</Badge>

<!-- 동적 배지 -->
{#each items as item}
  <Badge variant={getStatusBadgeVariant(item.status)}>
    {item.status}
  </Badge>
{/each}

<!-- 닫기 버튼이 있는 배지 -->
<Badge variant="secondary" class="flex items-center gap-2">
  태그명
  <Button
    variant="ghost"
    size="sm"
    class="h-3 w-3 p-0"
    onclick={() => removeTag(tag)}
  >
    ×
  </Button>
</Badge>

<!-- 클릭 가능한 배지 -->
<Badge
  variant="outline"
  class="cursor-pointer hover:bg-accent"
  onclick={() => handleTagClick(tag)}
>
  #개발
</Badge>

<!-- 크기 조정 -->
<Badge variant="default" class="text-xs px-2 py-1">작은 배지</Badge>
<Badge variant="default" class="text-base px-3 py-1.5">큰 배지</Badge>

<!-- 상태 표시기와 함께 -->
<Badge variant="default" class="bg-green-500">
  <span class="w-2 h-2 bg-white rounded-full mr-1"></span>
  온라인
</Badge>

<!-- 숫자 배지 -->
<Badge variant="destructive" class="rounded-full text-xs">
  3
</Badge>`}</code
        ></pre>
    </div>
  </div>
</section>
