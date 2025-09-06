<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { RefreshCw } from '@lucide/svelte';

  let isLoading = $state(false);
  let showPostsLoading = $state(false);
  let showTableLoading = $state(false);
  let showProfileLoading = $state(false);

  function simulateLoading(callback: (value: boolean) => void) {
    callback(true);
    setTimeout(() => {
      callback(false);
    }, 3000);
  }

  // 실제 데이터 (로딩 완료 후 표시)
  const posts = [
    {
      id: 1,
      title: 'SvelteKit 5 Runes 완전 가이드',
      excerpt: 'Svelte 5의 새로운 반응성 시스템인 Runes를 활용한 현대적인 웹 개발 방법을 알아봅시다.',
      author: '김개발',
      date: '2024-01-15',
      image: true
    },
    {
      id: 2,
      title: 'TypeScript 고급 타입 패턴',
      excerpt: '제네릭, 유니온 타입, 조건부 타입 등 TypeScript의 고급 기능들을 마스터해보세요.',
      author: '박타입',
      date: '2024-01-14',
      image: false
    },
    {
      id: 3,
      title: '모던 CSS 레이아웃 기법',
      excerpt: 'Grid, Flexbox, Container Queries를 활용한 반응형 레이아웃 구성 방법을 소개합니다.',
      author: '이스타일',
      date: '2024-01-13',
      image: true
    }
  ];

  const users = [
    { id: 1, name: '복슬이', email: 'boksl@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: '이개발', email: 'dev@example.com', role: 'Developer', status: 'Active' },
    { id: 3, name: '박디자인', email: 'design@example.com', role: 'Designer', status: 'Inactive' }
  ];
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Skeleton</h1>
    <p class="text-muted-foreground">스켈레톤 로딩 컴포넌트 - 콘텐츠가 로딩되는 동안 사용자에게 구조적인 플레이스홀더를 보여줍니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 스켈레톤</h2>
      <div class="space-y-4">
        <div class="space-y-2">
          <h3 class="text-lg font-medium">다양한 크기</h3>
          <div class="space-y-2">
            <Skeleton class="h-4 w-[250px]" />
            <Skeleton class="h-4 w-[200px]" />
            <Skeleton class="h-4 w-[150px]" />
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">원형 및 사각형</h3>
          <div class="flex items-center space-x-4">
            <Skeleton class="h-12 w-12 rounded-full" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-[250px]" />
              <Skeleton class="h-4 w-[200px]" />
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="text-lg font-medium">큰 콘텐츠 블록</h3>
          <Skeleton class="h-32 w-full" />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">카드 스켈레톤</h2>
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <!-- 스켈레톤 카드 1 -->
        <Card.Root>
          <Card.Content class="p-6 space-y-4">
            <Skeleton class="h-4 w-2/3" />
            <div class="space-y-2">
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-3/4" />
            </div>
            <div class="flex items-center space-x-2">
              <Skeleton class="h-6 w-6 rounded-full" />
              <Skeleton class="h-4 w-20" />
            </div>
          </Card.Content>
        </Card.Root>

        <!-- 스켈레톤 카드 2 -->
        <Card.Root>
          <Card.Content class="p-6 space-y-4">
            <Skeleton class="h-40 w-full rounded-md" />
            <div class="space-y-2">
              <Skeleton class="h-5 w-3/4" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-2/3" />
            </div>
          </Card.Content>
        </Card.Root>

        <!-- 스켈레톤 카드 3 -->
        <Card.Root>
          <Card.Content class="p-6 space-y-4">
            <div class="flex items-center space-x-2">
              <Skeleton class="h-8 w-8 rounded-full" />
              <div class="space-y-1">
                <Skeleton class="h-4 w-24" />
                <Skeleton class="h-3 w-16" />
              </div>
            </div>
            <div class="space-y-2">
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-5/6" />
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">실제 사용 예제 - 게시글 목록</h2>
      <div class="flex gap-2 mb-4">
        <Button
          onclick={() => simulateLoading((val) => (showPostsLoading = val))}
          disabled={showPostsLoading}
          class="flex items-center gap-2"
        >
          {#if showPostsLoading}
            <RefreshCw class="h-4 w-4 animate-spin" />
            로딩 중...
          {:else}
            로딩 시뮬레이션
          {/if}
        </Button>
      </div>

      <div class="space-y-4">
        {#if showPostsLoading}
          <!-- 로딩 중일 때 스켈레톤 표시 -->
          {#each Array(3) as _, index}
            <Card.Root>
              <Card.Content class="p-6">
                <div class="flex gap-4">
                  <Skeleton class="h-24 w-24 rounded-md flex-shrink-0" />
                  <div class="flex-1 space-y-3">
                    <div class="space-y-2">
                      <Skeleton class="h-5 w-3/4" />
                      <Skeleton class="h-4 w-full" />
                      <Skeleton class="h-4 w-2/3" />
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-2">
                        <Skeleton class="h-5 w-5 rounded-full" />
                        <Skeleton class="h-4 w-16" />
                      </div>
                      <Skeleton class="h-4 w-20" />
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          {/each}
        {:else}
          <!-- 로딩 완료 후 실제 데이터 표시 -->
          {#each posts as post}
            <Card.Root>
              <Card.Content class="p-6">
                <div class="flex gap-4">
                  {#if post.image}
                    <div class="h-24 w-24 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                      <span class="text-muted-foreground text-xs">Image</span>
                    </div>
                  {:else}
                    <div class="h-24 w-24 bg-gray-100 rounded-md flex-shrink-0"></div>
                  {/if}
                  <div class="flex-1 space-y-3">
                    <div class="space-y-2">
                      <h3 class="text-lg font-semibold">{post.title}</h3>
                      <p class="text-muted-foreground text-sm">{post.excerpt}</p>
                    </div>
                    <div class="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>작성자: {post.author}</span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </Card.Content>
            </Card.Root>
          {/each}
        {/if}
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">테이블 스켈레톤</h2>
      <div class="flex gap-2 mb-4">
        <Button
          onclick={() => simulateLoading((val) => (showTableLoading = val))}
          disabled={showTableLoading}
          class="flex items-center gap-2"
        >
          {#if showTableLoading}
            <RefreshCw class="h-4 w-4 animate-spin" />
            로딩 중...
          {:else}
            테이블 로딩 시뮬레이션
          {/if}
        </Button>
      </div>

      <Card.Root>
        <Card.Content class="p-0">
          <div class="overflow-hidden">
            <!-- 테이블 헤더는 항상 표시 -->
            <div class="grid grid-cols-4 gap-4 p-4 border-b bg-muted/50">
              <div class="font-medium">이름</div>
              <div class="font-medium">이메일</div>
              <div class="font-medium">역할</div>
              <div class="font-medium">상태</div>
            </div>

            {#if showTableLoading}
              <!-- 스켈레톤 행들 -->
              {#each Array(5) as _, index}
                <div class="grid grid-cols-4 gap-4 p-4 border-b">
                  <Skeleton class="h-4 w-24" />
                  <Skeleton class="h-4 w-32" />
                  <Skeleton class="h-6 w-16 rounded-full" />
                  <Skeleton class="h-6 w-20 rounded-full" />
                </div>
              {/each}
            {:else}
              <!-- 실제 데이터 행들 -->
              {#each users as user}
                <div class="grid grid-cols-4 gap-4 p-4 border-b">
                  <div class="font-medium">{user.name}</div>
                  <div class="text-muted-foreground">{user.email}</div>
                  <div class="font-medium">{user.role}</div>
                  <div class="font-medium text-green-600">{user.status}</div>
                </div>
              {/each}
            {/if}
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">프로필 스켈레톤</h2>
      <div class="flex gap-2 mb-4">
        <Button
          onclick={() => simulateLoading((val) => (showProfileLoading = val))}
          disabled={showProfileLoading}
          class="flex items-center gap-2"
        >
          {#if showProfileLoading}
            <RefreshCw class="h-4 w-4 animate-spin" />
            로딩 중...
          {:else}
            프로필 로딩 시뮬레이션
          {/if}
        </Button>
      </div>

      <Card.Root>
        <Card.Content class="p-6">
          {#if showProfileLoading}
            <!-- 프로필 스켈레톤 -->
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <Skeleton class="h-20 w-20 rounded-full" />
                <div class="space-y-2">
                  <Skeleton class="h-6 w-32" />
                  <Skeleton class="h-4 w-48" />
                  <Skeleton class="h-5 w-20 rounded-full" />
                </div>
              </div>

              <div class="space-y-4">
                <Skeleton class="h-5 w-24" />
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {#each Array(4) as _, index}
                    <div class="text-center p-4 border rounded-lg space-y-2">
                      <Skeleton class="h-8 w-12 mx-auto" />
                      <Skeleton class="h-4 w-16 mx-auto" />
                    </div>
                  {/each}
                </div>
              </div>

              <div class="space-y-3">
                <Skeleton class="h-5 w-20" />
                <div class="space-y-2">
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-4 w-3/4" />
                  <Skeleton class="h-4 w-2/3" />
                </div>
              </div>
            </div>
          {:else}
            <!-- 실제 프로필 데이터 -->
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="text-2xl">👤</span>
                </div>
                <div class="space-y-2">
                  <h2 class="text-2xl font-bold">복슬이</h2>
                  <p class="text-muted-foreground">boksl@example.com</p>
                  <span class="inline-block px-3 py-1 text-xs bg-green-100 text-green-800 rounded-full">관리자</span>
                </div>
              </div>

              <div class="space-y-4">
                <h3 class="text-lg font-semibold">활동 통계</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div class="text-center p-4 border rounded-lg">
                    <div class="text-2xl font-bold">23</div>
                    <div class="text-sm text-muted-foreground">게시글</div>
                  </div>
                  <div class="text-center p-4 border rounded-lg">
                    <div class="text-2xl font-bold">45</div>
                    <div class="text-sm text-muted-foreground">지식</div>
                  </div>
                  <div class="text-center p-4 border rounded-lg">
                    <div class="text-2xl font-bold">12</div>
                    <div class="text-sm text-muted-foreground">노트</div>
                  </div>
                  <div class="text-center p-4 border rounded-lg">
                    <div class="text-2xl font-bold">89</div>
                    <div class="text-sm text-muted-foreground">댓글</div>
                  </div>
                </div>
              </div>

              <div class="space-y-3">
                <h3 class="text-lg font-semibold">소개</h3>
                <p class="text-muted-foreground">
                  복슬홈 프로젝트를 개발하고 있는 풀스택 개발자입니다. Spring Boot와 SvelteKit을 주로 사용하며, 깔끔하고 효율적인 코드를
                  작성하는 것을 좋아합니다.
                </p>
              </div>
            </div>
          {/if}
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">스켈레톤 패턴들</h2>
      <div class="grid gap-6 md:grid-cols-2">
        <!-- 리스트 아이템 패턴 -->
        <Card.Root>
          <Card.Header>
            <Card.Title>리스트 아이템 패턴</Card.Title>
          </Card.Header>
          <Card.Content class="space-y-4">
            {#each Array(3) as _, index}
              <div class="flex items-center space-x-4">
                <Skeleton class="h-10 w-10 rounded-full" />
                <div class="space-y-2 flex-1">
                  <Skeleton class="h-4 w-full" />
                  <Skeleton class="h-3 w-3/4" />
                </div>
              </div>
            {/each}
          </Card.Content>
        </Card.Root>

        <!-- 미디어 카드 패턴 -->
        <Card.Root>
          <Card.Header>
            <Card.Title>미디어 카드 패턴</Card.Title>
          </Card.Header>
          <Card.Content class="space-y-4">
            <Skeleton class="h-32 w-full rounded-md" />
            <div class="space-y-2">
              <Skeleton class="h-5 w-3/4" />
              <Skeleton class="h-4 w-full" />
              <Skeleton class="h-4 w-2/3" />
            </div>
            <div class="flex items-center justify-between">
              <Skeleton class="h-4 w-20" />
              <Skeleton class="h-8 w-16 rounded-md" />
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import { Skeleton } from '$lib/components/ui/skeleton/index.js';

  let isLoading = $state(true);

  // 로딩 시뮬레이션
  function simulateLoading() {
    isLoading = true;
    setTimeout(() => {
      isLoading = false;
    }, 2000);
  }
</script>

<!-- 기본 스켈레톤 -->
<Skeleton class="h-4 w-[250px]" />
<Skeleton class="h-4 w-[200px]" />
<Skeleton class="h-4 w-[150px]" />

<!-- 원형 스켈레톤 -->
<div class="flex items-center space-x-4">
  <Skeleton class="h-12 w-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>

<!-- 조건부 로딩 -->
{#if isLoading}
  <!-- 스켈레톤 표시 -->
  <div class="space-y-4">
    {#each Array(3) as _}
      <div class="flex items-center space-x-4">
        <Skeleton class="h-10 w-10 rounded-full" />
        <div class="space-y-2 flex-1">
          <Skeleton class="h-4 w-full" />
          <Skeleton class="h-3 w-3/4" />
        </div>
      </div>
    {/each}
  </div>
{:else}
  <!-- 실제 데이터 표시 -->
  {#each items as item}
    <div class="flex items-center space-x-4">
      <img src={item.avatar} alt={item.name} class="h-10 w-10 rounded-full" />
      <div>
        <p class="font-medium">{item.name}</p>
        <p class="text-sm text-muted-foreground">{item.description}</p>
      </div>
    </div>
  {/each}
{/if}

<!-- 카드 스켈레톤 -->
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
  {#if isLoading}
    {#each Array(6) as _}
      <Card.Root>
        <Card.Content class="p-6 space-y-4">
          <Skeleton class="h-40 w-full rounded-md" />
          <div class="space-y-2">
            <Skeleton class="h-5 w-3/4" />
            <Skeleton class="h-4 w-full" />
            <Skeleton class="h-4 w-2/3" />
          </div>
        </Card.Content>
      </Card.Root>
    {/each}
  {:else}
    {#each posts as post}
      <Card.Root>
        <Card.Content class="p-6">
          <img src={post.image} alt={post.title} class="h-40 w-full object-cover rounded-md" />
          <h3 class="text-lg font-semibold mt-4">{post.title}</h3>
          <p class="text-muted-foreground">{post.excerpt}</p>
        </Card.Content>
      </Card.Root>
    {/each}
  {/if}
</div>

<!-- 테이블 스켈레톤 -->
<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>이름</Table.Head>
      <Table.Head>이메일</Table.Head>
      <Table.Head>상태</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#if isLoading}
      {#each Array(5) as _}
        <Table.Row>
          <Table.Cell><Skeleton class="h-4 w-24" /></Table.Cell>
          <Table.Cell><Skeleton class="h-4 w-32" /></Table.Cell>
          <Table.Cell><Skeleton class="h-6 w-16 rounded-full" /></Table.Cell>
        </Table.Row>
      {/each}
    {:else}
      {#each users as user}
        <Table.Row>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.status}</Table.Cell>
        </Table.Row>
      {/each}
    {/if}
  </Table.Body>
</Table.Root>`}</code
        ></pre>
    </div>
  </div>
</section>
