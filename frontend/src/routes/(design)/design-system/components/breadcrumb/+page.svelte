<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Home, ChevronRight, MoreHorizontal } from '@lucide/svelte';

  // 현재 경로 시뮬레이션
  let currentPath = $state('/design-system/components/breadcrumb');

  function handleNavigation(path: string) {
    console.log('Navigate to:', path);
    // 실제로는 router.push(path) 등을 사용
  }

  // 다양한 브래드크럼 데이터
  const basicBreadcrumb = [
    { label: '홈', href: '/' },
    { label: '디자인 시스템', href: '/design-system' },
    { label: '컴포넌트', href: '/design-system/components' },
    { label: 'Breadcrumb' }
  ];

  const blogBreadcrumb = [
    { label: '복슬홈', href: '/' },
    { label: '게시판', href: '/board' },
    { label: '개발', href: '/board/category/dev' },
    { label: 'SvelteKit 가이드' }
  ];

  const knowledgeBreadcrumb = [
    { label: '복슬홈', href: '/' },
    { label: '복슬지식', href: '/knowledge' },
    { label: 'TypeScript', href: '/knowledge/category/typescript' },
    { label: '고급 타입 시스템' }
  ];

  const longBreadcrumb = [
    { label: '홈', href: '/' },
    { label: '관리자', href: '/admin' },
    { label: '사용자 관리', href: '/admin/users' },
    { label: '권한 설정', href: '/admin/users/permissions' },
    { label: '역할 관리', href: '/admin/users/permissions/roles' },
    { label: '개발팀 역할', href: '/admin/users/permissions/roles/dev-team' },
    { label: '권한 상세 설정' }
  ];
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Breadcrumb</h1>
    <p class="text-muted-foreground">브래드크럼 네비게이션 - 사용자의 현재 위치를 표시하고 상위 페이지로 쉽게 이동할 수 있게 합니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 브래드크럼</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/" onclick={() => handleNavigation('/')}>홈</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/design-system" onclick={() => handleNavigation('/design-system')}>디자인 시스템</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/design-system/components" onclick={() => handleNavigation('/design-system/components')}
                  >컴포넌트</Breadcrumb.Link
                >
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">아이콘과 함께</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/" onclick={() => handleNavigation('/')} class="flex items-center gap-2">
                  <Home class="h-4 w-4" />
                  복슬홈
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/board" onclick={() => handleNavigation('/board')}>게시판</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/board/category/dev" onclick={() => handleNavigation('/board/category/dev')}>개발</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Page>SvelteKit 가이드</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">긴 경로 (Ellipsis 사용)</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/" onclick={() => handleNavigation('/')}>홈</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Ellipsis />
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/admin/users/permissions/roles" onclick={() => handleNavigation('/admin/users/permissions/roles')}
                  >역할 관리</Breadcrumb.Link
                >
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Link
                  href="/admin/users/permissions/roles/dev-team"
                  onclick={() => handleNavigation('/admin/users/permissions/roles/dev-team')}>개발팀 역할</Breadcrumb.Link
                >
              </Breadcrumb.Item>
              <Breadcrumb.Separator>
                <ChevronRight class="h-4 w-4" />
              </Breadcrumb.Separator>
              <Breadcrumb.Item>
                <Breadcrumb.Page>권한 상세 설정</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
          </Breadcrumb.Root>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">다양한 사용 사례</h2>
      <div class="space-y-4">
        <!-- 게시판 브래드크럼 -->
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-lg">게시판 페이지</Card.Title>
          </Card.Header>
          <Card.Content>
            <Breadcrumb.Root>
              <Breadcrumb.List>
                {#each blogBreadcrumb as item, index}
                  <Breadcrumb.Item>
                    {#if item.href}
                      <Breadcrumb.Link href={item.href} onclick={() => handleNavigation(item.href || '')}>{item.label}</Breadcrumb.Link>
                    {:else}
                      <Breadcrumb.Page>{item.label}</Breadcrumb.Page>
                    {/if}
                  </Breadcrumb.Item>
                  {#if index < blogBreadcrumb.length - 1}
                    <Breadcrumb.Separator>
                      <ChevronRight class="h-4 w-4" />
                    </Breadcrumb.Separator>
                  {/if}
                {/each}
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </Card.Content>
        </Card.Root>

        <!-- 지식베이스 브래드크럼 -->
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-lg">복슬지식 페이지</Card.Title>
          </Card.Header>
          <Card.Content>
            <Breadcrumb.Root>
              <Breadcrumb.List>
                {#each knowledgeBreadcrumb as item, index}
                  <Breadcrumb.Item>
                    {#if item.href}
                      <Breadcrumb.Link href={item.href} onclick={() => handleNavigation(item.href || '')}>{item.label}</Breadcrumb.Link>
                    {:else}
                      <Breadcrumb.Page>{item.label}</Breadcrumb.Page>
                    {/if}
                  </Breadcrumb.Item>
                  {#if index < knowledgeBreadcrumb.length - 1}
                    <Breadcrumb.Separator>
                      <ChevronRight class="h-4 w-4" />
                    </Breadcrumb.Separator>
                  {/if}
                {/each}
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </Card.Content>
        </Card.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">커스텀 구분자</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <div class="space-y-4">
            <!-- 슬래시 구분자 -->
            <div>
              <p class="text-sm text-muted-foreground mb-2">슬래시 구분자</p>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/" onclick={() => handleNavigation('/')}>홈</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>/</Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/design-system" onclick={() => handleNavigation('/design-system')}>디자인 시스템</Breadcrumb.Link
                    >
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>/</Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>컴포넌트</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </div>

            <!-- 점 구분자 -->
            <div>
              <p class="text-sm text-muted-foreground mb-2">점 구분자</p>
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/" onclick={() => handleNavigation('/')}>홈</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>•</Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/design-system" onclick={() => handleNavigation('/design-system')}>디자인 시스템</Breadcrumb.Link
                    >
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>•</Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>컴포넌트</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">반응형 브래드크럼</h2>
      <Card.Root>
        <Card.Content class="p-6">
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">모바일에서는 마지막 2-3개 항목만 표시</p>

            <!-- 데스크톱 버전 -->
            <div class="hidden md:block">
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  {#each longBreadcrumb as item, index}
                    <Breadcrumb.Item>
                      {#if item.href}
                        <Breadcrumb.Link href={item.href} onclick={() => handleNavigation(item.href || '')}>{item.label}</Breadcrumb.Link>
                      {:else}
                        <Breadcrumb.Page>{item.label}</Breadcrumb.Page>
                      {/if}
                    </Breadcrumb.Item>
                    {#if index < longBreadcrumb.length - 1}
                      <Breadcrumb.Separator>
                        <ChevronRight class="h-4 w-4" />
                      </Breadcrumb.Separator>
                    {/if}
                  {/each}
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </div>

            <!-- 모바일 버전 -->
            <div class="md:hidden">
              <Breadcrumb.Root>
                <Breadcrumb.List>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href="/" onclick={() => handleNavigation('/')}>홈</Breadcrumb.Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <ChevronRight class="h-4 w-4" />
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Ellipsis />
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <ChevronRight class="h-4 w-4" />
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link
                      href="/admin/users/permissions/roles/dev-team"
                      onclick={() => handleNavigation('/admin/users/permissions/roles/dev-team')}>개발팀 역할</Breadcrumb.Link
                    >
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <ChevronRight class="h-4 w-4" />
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <Breadcrumb.Page>권한 상세 설정</Breadcrumb.Page>
                  </Breadcrumb.Item>
                </Breadcrumb.List>
              </Breadcrumb.Root>
            </div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
  import { ChevronRight, Home } from '@lucide/svelte';
  
  function handleNavigation(path: string) {
    // 페이지 이동 로직
    console.log('Navigate to:', path);
  }
</script>

<!-- 기본 브래드크럼 -->
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/" onclick={() => handleNavigation('/')}>
        홈
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <ChevronRight class="h-4 w-4" />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/products">제품</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <ChevronRight class="h-4 w-4" />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>상세 페이지</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>

<!-- 아이콘과 함께 -->
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/" class="flex items-center gap-2">
        <Home class="h-4 w-4" />
        홈
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>/</Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>현재 페이지</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>

<!-- 긴 경로 (Ellipsis) -->
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">홈</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <ChevronRight class="h-4 w-4" />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Ellipsis />
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <ChevronRight class="h-4 w-4" />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/category">카테고리</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <ChevronRight class="h-4 w-4" />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>현재 페이지</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>`}</code
        ></pre>
    </div>
  </div>
</section>
