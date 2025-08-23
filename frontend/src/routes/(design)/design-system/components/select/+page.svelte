<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import * as Card from '$lib/components/ui/card/index.js';

  let basicSelection = $state('');
  let categorySelection = $state('');
  let multipleCategories = $state([]);
  let userRoleSelection = $state('');
  let sortSelection = $state('');
  let filterSelection = $state('');

  const categories = [
    { value: 'general', label: '일반' },
    { value: 'dev', label: '개발' },
    { value: 'design', label: '디자인' },
    { value: 'backend', label: '백엔드' },
    { value: 'frontend', label: '프론트엔드' },
    { value: 'devops', label: 'DevOps' }
  ];

  const userRoles = [
    { value: 'admin', label: '관리자', description: '모든 권한을 가진 관리자' },
    { value: 'developer', label: '개발자', description: '개발 관련 권한을 가진 사용자' },
    { value: 'designer', label: '디자이너', description: '디자인 관련 권한을 가진 사용자' },
    { value: 'user', label: '일반 사용자', description: '기본 사용자 권한' }
  ];

  const sortOptions = [
    { value: 'latest', label: '최신순' },
    { value: 'oldest', label: '오래된순' },
    { value: 'popular', label: '인기순' },
    { value: 'alphabetical', label: '가나다순' }
  ];

  function getRoleBadgeVariant(role: string) {
    switch (role) {
      case 'admin': return 'destructive';
      case 'developer': return 'default';
      case 'designer': return 'secondary';
      case 'user': return 'outline';
      default: return 'outline';
    }
  }
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Select</h1>
    <p class="text-muted-foreground">셀렉트/드롭다운 컴포넌트 - 옵션 목록에서 하나 또는 여러 항목을 선택할 수 있습니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 셀렉트</h2>
      <div class="space-y-4 max-w-sm">
        <div>
          <Label>카테고리 선택</Label>
          <Select.Root bind:selected={basicSelection}>
            <Select.Trigger>
              {basicSelection || "카테고리를 선택하세요"}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                {#each categories as category}
                  <Select.Item value={category.value}>{category.label}</Select.Item>
                {/each}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          {#if basicSelection}
            <p class="text-sm text-muted-foreground mt-2">선택됨: {basicSelection}</p>
          {/if}
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">그룹화된 셀렉트</h2>
      <div class="space-y-4 max-w-sm">
        <div>
          <Label>사용자 역할 선택</Label>
          <Select.Root bind:selected={userRoleSelection}>
            <Select.Trigger>
              {userRoles.find(role => role.value === userRoleSelection)?.label || "역할을 선택하세요"}
            </Select.Trigger>
            <Select.Content>
              <Select.Group>
                <Select.GroupHeading>관리자 권한</Select.GroupHeading>
                <Select.Item value="admin">관리자</Select.Item>
                <Select.Separator />
                <Select.GroupHeading>사용자 권한</Select.GroupHeading>
                <Select.Item value="developer">개발자</Select.Item>
                <Select.Item value="designer">디자이너</Select.Item>
                <Select.Item value="user">일반 사용자</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          {#if userRoleSelection}
            <div class="flex items-center gap-2 mt-2">
              <Badge variant={getRoleBadgeVariant(userRoleSelection)}>
                {userRoles.find(role => role.value === userRoleSelection)?.label}
              </Badge>
              <span class="text-sm text-muted-foreground">
                {userRoles.find(role => role.value === userRoleSelection)?.description}
              </span>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">스크롤 가능한 셀렉트</h2>
      <div class="space-y-4 max-w-sm">
        <div>
          <Label>정렬 옵션</Label>
          <Select.Root bind:selected={sortSelection}>
            <Select.Trigger>
              {sortOptions.find(option => option.value === sortSelection)?.label || "정렬 방식을 선택하세요"}
            </Select.Trigger>
            <Select.Content>
              <Select.ScrollUpButton />
              <Select.Group>
                {#each sortOptions as option}
                  <Select.Item value={option.value}>{option.label}</Select.Item>
                {/each}
                <!-- 추가 옵션들 (스크롤 테스트용) -->
                <Select.Item value="views">조회순</Select.Item>
                <Select.Item value="comments">댓글순</Select.Item>
                <Select.Item value="likes">좋아요순</Select.Item>
                <Select.Item value="random">랜덤</Select.Item>
              </Select.Group>
              <Select.ScrollDownButton />
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">폼에서의 활용</h2>
      <Card.Root>
        <Card.Header>
          <Card.Title>게시글 설정</Card.Title>
          <Card.Description>새 게시글의 카테고리와 공개 설정을 선택하세요.</Card.Description>
        </Card.Header>
        <Card.Content class="space-y-4">
          <div class="grid gap-2">
            <Label>카테고리</Label>
            <Select.Root bind:selected={categorySelection}>
              <Select.Trigger>
                {categories.find(cat => cat.value === categorySelection)?.label || "카테고리를 선택하세요"}
              </Select.Trigger>
              <Select.Content>
                <Select.Group>
                  <Select.GroupHeading>주요 카테고리</Select.GroupHeading>
                  <Select.Item value="general">일반</Select.Item>
                  <Select.Item value="dev">개발</Select.Item>
                  <Select.Item value="design">디자인</Select.Item>
                  <Select.Separator />
                  <Select.GroupHeading>기술 분야</Select.GroupHeading>
                  <Select.Item value="backend">백엔드</Select.Item>
                  <Select.Item value="frontend">프론트엔드</Select.Item>
                  <Select.Item value="devops">DevOps</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </div>

          <div class="grid gap-2">
            <Label>공개 설정</Label>
            <Select.Root>
              <Select.Trigger>
                공개 범위를 선택하세요
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="public">전체 공개</Select.Item>
                <Select.Item value="members">회원만</Select.Item>
                <Select.Item value="private">비공개</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>

          <div class="grid gap-2">
            <Label>알림 설정</Label>
            <Select.Root>
              <Select.Trigger>
                알림 수준을 선택하세요
              </Select.Trigger>
              <Select.Content>
                <Select.Item value="all">모든 알림</Select.Item>
                <Select.Item value="mentions">멘션만</Select.Item>
                <Select.Item value="none">알림 끄기</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </Card.Content>
        <Card.Footer>
          <Button>게시글 작성</Button>
        </Card.Footer>
      </Card.Root>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">필터링과 함께 사용</h2>
      <div class="flex gap-4 items-end">
        <div class="grid gap-2">
          <Label>필터</Label>
          <Select.Root bind:selected={filterSelection}>
            <Select.Trigger class="w-[180px]">
              {filterSelection || "필터 선택"}
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="all">전체</Select.Item>
              <Select.Item value="published">발행됨</Select.Item>
              <Select.Item value="draft">초안</Select.Item>
              <Select.Item value="archived">보관됨</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>

        <div class="grid gap-2">
          <Label>정렬</Label>
          <Select.Root bind:selected={sortSelection}>
            <Select.Trigger class="w-[180px]">
              {sortOptions.find(option => option.value === sortSelection)?.label || "정렬 방식"}
            </Select.Trigger>
            <Select.Content>
              {#each sortOptions as option}
                <Select.Item value={option.value}>{option.label}</Select.Item>
              {/each}
            </Select.Content>
          </Select.Root>
        </div>

        <Button>적용</Button>
      </div>
      
      {#if filterSelection || sortSelection}
        <div class="flex gap-2 items-center">
          <span class="text-sm text-muted-foreground">적용된 필터:</span>
          {#if filterSelection}
            <Badge variant="secondary">
              필터: {filterSelection}
              <Button variant="ghost" size="sm" class="h-4 w-4 p-0 ml-1" onclick={() => filterSelection = ''}>
                ×
              </Button>
            </Badge>
          {/if}
          {#if sortSelection}
            <Badge variant="secondary">
              정렬: {sortOptions.find(option => option.value === sortSelection)?.label}
              <Button variant="ghost" size="sm" class="h-4 w-4 p-0 ml-1" onclick={() => sortSelection = ''}>
                ×
              </Button>
            </Badge>
          {/if}
        </div>
      {/if}
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">비활성 상태</h2>
      <div class="space-y-4 max-w-sm">
        <div>
          <Label>비활성 셀렉트</Label>
          <Select.Root disabled>
            <Select.Trigger>
              비활성 상태
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="option1">옵션 1</Select.Item>
              <Select.Item value="option2">옵션 2</Select.Item>
            </Select.Content>
          </Select.Root>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code>{`<script lang="ts">
  import * as Select from '$lib/components/ui/select/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  
  let selectedValue = $state('');
  
  const options = [
    { value: 'option1', label: '옵션 1' },
    { value: 'option2', label: '옵션 2' },
    { value: 'option3', label: '옵션 3' }
  ];
</script>

<!-- 기본 셀렉트 -->
<div class="grid gap-2">
  <Label>선택하세요</Label>
  <Select.Root bind:selected={selectedValue}>
    <Select.Trigger>
      {selectedValue || "옵션을 선택하세요"}
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        {#each options as option}
          <Select.Item value={option.value}>{option.label}</Select.Item>
        {/each}
      </Select.Group>
    </Select.Content>
  </Select.Root>
</div>

<!-- 그룹화된 셀렉트 -->
<Select.Root bind:selected={selectedValue}>
  <Select.Trigger>
    {selectedValue || "카테고리를 선택하세요"}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.GroupHeading>주요 카테고리</Select.GroupHeading>
      <Select.Item value="general">일반</Select.Item>
      <Select.Item value="dev">개발</Select.Item>
      <Select.Separator />
      <Select.GroupHeading>기술 분야</Select.GroupHeading>
      <Select.Item value="backend">백엔드</Select.Item>
      <Select.Item value="frontend">프론트엔드</Select.Item>
    </Select.Group>
  </Select.Content>
</Select.Root>

<!-- 스크롤 가능한 셀렉트 -->
<Select.Root bind:selected={selectedValue}>
  <Select.Trigger>
    {selectedValue || "옵션을 선택하세요"}
  </Select.Trigger>
  <Select.Content>
    <Select.ScrollUpButton />
    <Select.Group>
      {#each manyOptions as option}
        <Select.Item value={option.value}>{option.label}</Select.Item>
      {/each}
    </Select.Group>
    <Select.ScrollDownButton />
  </Select.Content>
</Select.Root>`}</code></pre>
    </div>
  </div>
</section>