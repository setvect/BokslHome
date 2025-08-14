<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { Pagination } from '$lib/components/ui/pagination';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Input } from '$lib/components/ui/input';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import PropsTable from '$lib/components/PropsTable.svelte';
  import ChevronUpIcon from "@lucide/svelte/icons/chevron-up";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import SearchIcon from "@lucide/svelte/icons/search";
  
  const users = [
    { id: 1, name: '김철수', email: 'kim@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-15' },
    { id: 2, name: '이영희', email: 'lee@example.com', role: 'User', status: 'Active', joinDate: '2023-03-22' },
    { id: 3, name: '박민수', email: 'park@example.com', role: 'Editor', status: 'Inactive', joinDate: '2023-02-10' },
    { id: 4, name: '최지원', email: 'choi@example.com', role: 'User', status: 'Active', joinDate: '2023-04-05' },
    { id: 5, name: '정수민', email: 'jung@example.com', role: 'Admin', status: 'Active', joinDate: '2023-01-28' }
  ];

  let searchQuery = $state('');
  let sortField = $state<'name' | 'email' | 'role' | 'joinDate'>('name');
  let sortDirection = $state<'asc' | 'desc'>('asc');
  let selectedUsers = $state<number[]>([]);
  let currentPage = $state(1);
  const itemsPerPage = 3;

  // 필터링된 사용자 목록
  const filteredUsers = $derived(
    users.filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // 정렬된 사용자 목록
  const sortedUsers = $derived(
    [...filteredUsers].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'joinDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }
      
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    })
  );

  // 페이지네이션된 사용자 목록
  const paginatedUsers = $derived(
    sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  );

  const totalPages = $derived(Math.ceil(sortedUsers.length / itemsPerPage));

  function handleSort(field: typeof sortField) {
    if (sortField === field) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortField = field;
      sortDirection = 'asc';
    }
  }

  function toggleUserSelection(userId: number) {
    if (selectedUsers.includes(userId)) {
      selectedUsers = selectedUsers.filter(id => id !== userId);
    } else {
      selectedUsers = [...selectedUsers, userId];
    }
  }

  function toggleAllSelection() {
    if (selectedUsers.length === paginatedUsers.length) {
      selectedUsers = [];
    } else {
      selectedUsers = paginatedUsers.map(user => user.id);
    }
  }

  const isAllSelected = $derived(
    paginatedUsers.length > 0 && selectedUsers.length === paginatedUsers.length
  );
  const isIndeterminate = $derived(
    selectedUsers.length > 0 && selectedUsers.length < paginatedUsers.length
  );

  const tableProps = [
    {
      name: 'Table',
      type: 'component',
      description: '테이블의 루트 컨테이너입니다.',
      required: true
    },
    {
      name: 'TableHeader',
      type: 'component',
      description: '테이블 헤더 섹션을 감싸는 컴포넌트입니다.',
      required: false
    },
    {
      name: 'TableBody',
      type: 'component',
      description: '테이블 바디 섹션을 감싸는 컴포넌트입니다.',
      required: true
    },
    {
      name: 'TableRow',
      type: 'component',
      description: '테이블의 행을 나타내는 컴포넌트입니다.',
      required: true
    },
    {
      name: 'TableHead',
      type: 'component',
      description: '테이블 헤더 셀 컴포넌트입니다.',
      required: false
    },
    {
      name: 'TableCell',
      type: 'component',
      description: '테이블 데이터 셀 컴포넌트입니다.',
      required: true
    }
  ];
</script>

<svelte:head>
  <title>Table - 디자인 시스템</title>
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-6xl">
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">Table</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        구조화된 데이터를 표시하기 위한 테이블 컴포넌트입니다.
      </p>
    </div>
    <div class="flex flex-wrap gap-2">
      <Badge>Data Display</Badge>
      <Badge variant="secondary">Responsive</Badge>
    </div>
  </section>
  
  <!-- 기본 테이블 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>기본 테이블</CardTitle>
        <CardDescription>간단한 데이터 표시용 테이블</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>이름</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>역할</TableHead>
              <TableHead class="text-right">액션</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each users.slice(0, 3) as user}
              <TableRow>
                <TableCell>{user.id}</TableCell>
                <TableCell class="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell class="text-right">
                  <Button variant="ghost" size="sm">편집</Button>
                </TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </section>

  <!-- 정렬 가능한 테이블 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>정렬 가능한 테이블</CardTitle>
        <CardDescription>컬럼 헤더를 클릭하여 정렬할 수 있는 테이블</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  class="h-auto p-0 font-semibold"
                  onclick={() => handleSort('name')}
                >
                  이름
                  {#if sortField === 'name'}
                    {#if sortDirection === 'asc'}
                      <ChevronUpIcon class="ml-1 h-4 w-4" />
                    {:else}
                      <ChevronDownIcon class="ml-1 h-4 w-4" />
                    {/if}
                  {/if}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  class="h-auto p-0 font-semibold"
                  onclick={() => handleSort('email')}
                >
                  이메일
                  {#if sortField === 'email'}
                    {#if sortDirection === 'asc'}
                      <ChevronUpIcon class="ml-1 h-4 w-4" />
                    {:else}
                      <ChevronDownIcon class="ml-1 h-4 w-4" />
                    {/if}
                  {/if}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  class="h-auto p-0 font-semibold"
                  onclick={() => handleSort('role')}
                >
                  역할
                  {#if sortField === 'role'}
                    {#if sortDirection === 'asc'}
                      <ChevronUpIcon class="ml-1 h-4 w-4" />
                    {:else}
                      <ChevronDownIcon class="ml-1 h-4 w-4" />
                    {/if}
                  {/if}
                </Button>
              </TableHead>
              <TableHead>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  class="h-auto p-0 font-semibold"
                  onclick={() => handleSort('joinDate')}
                >
                  가입일
                  {#if sortField === 'joinDate'}
                    {#if sortDirection === 'asc'}
                      <ChevronUpIcon class="ml-1 h-4 w-4" />
                    {:else}
                      <ChevronDownIcon class="ml-1 h-4 w-4" />
                    {/if}
                  {/if}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {#each sortedUsers.slice(0, 3) as user}
              <TableRow>
                <TableCell class="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
              </TableRow>
            {/each}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </section>

  <!-- 선택 가능한 테이블 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>선택 가능한 테이블</CardTitle>
        <CardDescription>체크박스로 행을 선택할 수 있는 테이블</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-muted-foreground">
              {selectedUsers.length}개 항목 선택됨
            </p>
            {#if selectedUsers.length > 0}
              <Button variant="destructive" size="sm">
                선택된 항목 삭제
              </Button>
            {/if}
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead class="w-12">
                  <Checkbox 
                    checked={isAllSelected}
                    indeterminate={isIndeterminate}
                    onCheckedChange={toggleAllSelection}
                  />
                </TableHead>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each users.slice(0, 3) as user}
                <TableRow class={selectedUsers.includes(user.id) ? 'bg-muted/50' : ''}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell class="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  </section>

  <!-- 검색 및 페이지네이션 테이블 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>검색 및 페이지네이션 테이블</CardTitle>
        <CardDescription>검색 기능과 페이지네이션이 포함된 완전한 테이블</CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <!-- 검색 -->
          <div class="flex items-center space-x-2">
            <div class="relative flex-1 max-w-sm">
              <SearchIcon class="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="이름, 이메일, 역할로 검색..."
                bind:value={searchQuery}
                class="pl-8"
              />
            </div>
          </div>

          <!-- 테이블 -->
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>이름</TableHead>
                <TableHead>이메일</TableHead>
                <TableHead>역할</TableHead>
                <TableHead>가입일</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {#each paginatedUsers as user}
                <TableRow>
                  <TableCell class="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'Admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                      {user.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              {:else}
                <TableRow>
                  <TableCell colspan="5" class="text-center text-muted-foreground">
                    검색 결과가 없습니다.
                  </TableCell>
                </TableRow>
              {/each}
            </TableBody>
          </Table>

          <!-- 페이지네이션 -->
          {#if totalPages > 1}
            <Pagination 
              bind:currentPage 
              totalPages={totalPages}
              class="mt-4"
            />
          {/if}

          <div class="text-sm text-muted-foreground text-center">
            총 {sortedUsers.length}개 항목 중 {Math.min(itemsPerPage, sortedUsers.length - (currentPage - 1) * itemsPerPage)}개 표시
          </div>
        </div>
      </CardContent>
    </Card>
  </section>

  <!-- 사용법 예시 -->
  <section class="mb-16">
    <Card>
      <CardHeader>
        <CardTitle>기본 사용법</CardTitle>
      </CardHeader>
      <CardContent>
        <CodeBlock code={`<` + `script>
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '$lib/components/ui/table';
<` + `/script>

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead>이메일</TableHead>
      <TableHead>역할</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>김철수</TableCell>
      <TableCell>kim@example.com</TableCell>
      <TableCell>Admin</TableCell>
    </TableRow>
  </TableBody>
</Table>`} language="svelte" />
      </CardContent>
    </Card>
  </section>

  <!-- 속성 -->
  <PropsTable 
    props={tableProps} 
    title="컴포넌트 구조"
    description="Table 컴포넌트의 하위 컴포넌트들입니다."
  />
</div>