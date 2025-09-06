<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { MoreHorizontal, Edit, Trash2 } from '@lucide/svelte';

  // 게시판 데이터 예제
  const boardData = [
    { id: 1, title: '복슬홈 프로젝트 진행상황', author: '관리자', date: '2024-01-15', views: 245, status: 'published' },
    { id: 2, title: 'SvelteKit 5 Runes 마이그레이션 가이드', author: '개발자', date: '2024-01-14', views: 189, status: 'draft' },
    { id: 3, title: 'Tailwind CSS 4.0 업데이트', author: '디자이너', date: '2024-01-13', views: 167, status: 'published' },
    { id: 4, title: '데이터베이스 스키마 변경사항', author: '백엔드개발자', date: '2024-01-12', views: 98, status: 'archived' },
    { id: 5, title: 'UI 컴포넌트 라이브러리 구축', author: '프론트엔드개발자', date: '2024-01-11', views: 312, status: 'published' }
  ];

  // 사용자 데이터 예제
  const userData = [
    { id: 1, name: '복슬이', email: 'boksl@example.com', role: 'Admin', joinDate: '2023-01-15', lastLogin: '2024-01-15 14:30' },
    { id: 2, name: '이개발', email: 'dev@example.com', role: 'Developer', joinDate: '2023-03-20', lastLogin: '2024-01-15 13:45' },
    { id: 3, name: '박디자인', email: 'design@example.com', role: 'Designer', joinDate: '2023-06-10', lastLogin: '2024-01-14 16:20' },
    { id: 4, name: '최사용자', email: 'user@example.com', role: 'User', joinDate: '2023-09-05', lastLogin: '2024-01-13 09:15' }
  ];

  function getStatusBadgeVariant(status: string) {
    switch (status) {
      case 'published':
        return 'default';
      case 'draft':
        return 'secondary';
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
      case 'archived':
        return '보관';
      default:
        return status;
    }
  }

  function getRoleBadgeVariant(role: string) {
    switch (role) {
      case 'Admin':
        return 'destructive';
      case 'Developer':
        return 'default';
      case 'Designer':
        return 'secondary';
      case 'User':
        return 'outline';
      default:
        return 'outline';
    }
  }
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Table</h1>
    <p class="text-muted-foreground">테이블 컴포넌트 - 구조화된 데이터를 행과 열로 표시합니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 테이블</h2>
      <div class="border rounded-lg">
        <Table.Root>
          <Table.Caption>복슬홈 기본 사용자 목록</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head>ID</Table.Head>
              <Table.Head>이름</Table.Head>
              <Table.Head>이메일</Table.Head>
              <Table.Head>역할</Table.Head>
              <Table.Head class="text-right">가입일</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each userData as user}
              <Table.Row>
                <Table.Cell class="font-medium">{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell class="text-right">{user.joinDate}</Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">게시판 스타일 테이블</h2>
      <div class="border rounded-lg">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-12">번호</Table.Head>
              <Table.Head>제목</Table.Head>
              <Table.Head class="w-32">작성자</Table.Head>
              <Table.Head class="w-32">작성일</Table.Head>
              <Table.Head class="w-20 text-center">조회</Table.Head>
              <Table.Head class="w-24">상태</Table.Head>
              <Table.Head class="w-20"></Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each boardData as post}
              <Table.Row>
                <Table.Cell class="font-medium">{post.id}</Table.Cell>
                <Table.Cell>
                  <div class="max-w-xs truncate">
                    {post.title}
                  </div>
                </Table.Cell>
                <Table.Cell>{post.author}</Table.Cell>
                <Table.Cell class="text-muted-foreground">{post.date}</Table.Cell>
                <Table.Cell class="text-center">{post.views}</Table.Cell>
                <Table.Cell>
                  <Badge variant={getStatusBadgeVariant(post.status)}>
                    {getStatusText(post.status)}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal class="h-4 w-4" />
                  </Button>
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">관리자 테이블 (액션 포함)</h2>
      <div class="border rounded-lg">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>사용자</Table.Head>
              <Table.Head>이메일</Table.Head>
              <Table.Head>역할</Table.Head>
              <Table.Head>마지막 로그인</Table.Head>
              <Table.Head class="text-right">액션</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each userData as user}
              <Table.Row>
                <Table.Cell>
                  <div class="font-medium">{user.name}</div>
                  <div class="text-sm text-muted-foreground">#{user.id}</div>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>
                  <Badge variant={getRoleBadgeVariant(user.role)}>
                    {user.role}
                  </Badge>
                </Table.Cell>
                <Table.Cell class="text-muted-foreground">{user.lastLogin}</Table.Cell>
                <Table.Cell class="text-right">
                  <div class="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Edit class="h-3 w-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 class="h-3 w-3" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">빈 상태 테이블</h2>
      <div class="border rounded-lg">
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head>ID</Table.Head>
              <Table.Head>제목</Table.Head>
              <Table.Head>작성자</Table.Head>
              <Table.Head>날짜</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell colspan={4} class="h-24 text-center text-muted-foreground">데이터가 없습니다.</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">테이블 스타일 변형</h2>
      <div class="grid gap-4">
        <div>
          <h3 class="text-lg font-medium mb-2">컴팩트 테이블</h3>
          <div class="border rounded-lg">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.Head class="h-8 px-2">이름</Table.Head>
                  <Table.Head class="h-8 px-2">상태</Table.Head>
                  <Table.Head class="h-8 px-2">날짜</Table.Head>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row class="h-8">
                  <Table.Cell class="px-2">복슬 프로젝트</Table.Cell>
                  <Table.Cell class="px-2"><Badge variant="default" class="h-5 text-xs">진행중</Badge></Table.Cell>
                  <Table.Cell class="px-2">2024-01-15</Table.Cell>
                </Table.Row>
                <Table.Row class="h-8">
                  <Table.Cell class="px-2">디자인 시스템</Table.Cell>
                  <Table.Cell class="px-2"><Badge variant="secondary" class="h-5 text-xs">완료</Badge></Table.Cell>
                  <Table.Cell class="px-2">2024-01-14</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import * as Table from '$lib/components/ui/table/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';

  const data = [
    { id: 1, name: '복슬이', role: 'Admin', status: 'active' },
    { id: 2, name: '이개발', role: 'Developer', status: 'active' }
  ];
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>ID</Table.Head>
      <Table.Head>이름</Table.Head>
      <Table.Head>역할</Table.Head>
      <Table.Head>상태</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data as item}
      <Table.Row>
        <Table.Cell class="font-medium">{item.id}</Table.Cell>
        <Table.Cell>{item.name}</Table.Cell>
        <Table.Cell>{item.role}</Table.Cell>
        <Table.Cell>
          <Badge variant="default">{item.status}</Badge>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>`}</code
        ></pre>
    </div>
  </div>
</section>
