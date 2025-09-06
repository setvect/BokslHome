<script lang="ts">
  import { SearchBar } from '$lib/components/ui/search-bar/index.js';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Badge } from '$lib/components/ui/badge/index.js';
  import * as Card from '$lib/components/ui/card/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Search, X, Filter, SortAsc, Zap } from '@lucide/svelte';

  // 검색 상태들
  let basicSearch = $state('');
  let searchWithLoading = $state('');
  let isLoadingResults = $state(false);
  let ghostSearch = $state('');
  let outlineSearch = $state('');

  // 필터링 가능한 검색
  let filterSearch = $state('');
  let selectedFilter = $state('all');

  // 샘플 데이터
  const allItems = [
    { id: 1, title: 'SvelteKit 5 Runes 완전 가이드', category: '개발', type: 'post' },
    { id: 2, title: 'TypeScript 고급 타입 시스템', category: '지식', type: 'knowledge' },
    { id: 3, title: '복슬홈 UI 디자인 시스템', category: '디자인', type: 'post' },
    { id: 4, title: 'Spring Boot JWT 인증 구현', category: '백엔드', type: 'knowledge' },
    { id: 5, title: '회의록 - 프로젝트 킥오프', category: '회의', type: 'note' },
    { id: 6, title: 'React vs Svelte 비교 분석', category: '개발', type: 'post' },
    { id: 7, title: '데이터베이스 설계 노하우', category: '데이터베이스', type: 'knowledge' },
    { id: 8, title: '학습 노트 - 함수형 프로그래밍', category: '학습', type: 'note' }
  ];

  let filteredItems = $derived(() => {
    let items = allItems;

    // 타입 필터링
    if (selectedFilter !== 'all') {
      items = items.filter((item) => item.type === selectedFilter);
    }

    // 검색어 필터링
    if (filterSearch.trim()) {
      const query = filterSearch.toLowerCase();
      items = items.filter((item) => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));
    }

    return items;
  });

  function handleBasicSearch(value: string) {
    console.log('기본 검색:', value);
  }

  function handleSearchWithLoading(value: string) {
    console.log('로딩 검색:', value);
    if (value.trim()) {
      isLoadingResults = true;
      // 실제로는 API 호출
      setTimeout(() => {
        isLoadingResults = false;
      }, 2000);
    }
  }

  function handleGhostSearch(value: string) {
    console.log('고스트 검색:', value);
  }

  function handleOutlineSearch(value: string) {
    console.log('아웃라인 검색:', value);
  }

  function handleFilterSearch(value: string) {
    console.log('필터 검색:', value);
  }

  function handleClear() {
    console.log('검색어 지우기');
  }

  function getTypeBadgeVariant(type: string) {
    switch (type) {
      case 'post':
        return 'default';
      case 'knowledge':
        return 'secondary';
      case 'note':
        return 'outline';
      default:
        return 'outline';
    }
  }

  function getTypeText(type: string) {
    switch (type) {
      case 'post':
        return '게시글';
      case 'knowledge':
        return '지식';
      case 'note':
        return '노트';
      default:
        return type;
    }
  }
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Search Bar</h1>
    <p class="text-muted-foreground">검색 바 컴포넌트 - 사용자가 콘텐츠를 검색할 수 있는 입력 필드입니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 검색 바</h2>
      <div class="space-y-4 max-w-md">
        <SearchBar placeholder="게시글, 지식, 노트 검색..." bind:value={basicSearch} onsearch={handleBasicSearch} onclear={handleClear} />
        {#if basicSearch}
          <p class="text-sm text-muted-foreground">검색어: "{basicSearch}"</p>
        {/if}
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">로딩 상태가 있는 검색 바</h2>
      <div class="space-y-4 max-w-md">
        <SearchBar
          placeholder="검색하면 로딩 상태를 볼 수 있습니다"
          bind:value={searchWithLoading}
          loading={isLoadingResults}
          onsearch={handleSearchWithLoading}
          onclear={handleClear}
        />
        {#if isLoadingResults}
          <p class="text-sm text-muted-foreground">검색 중...</p>
        {/if}
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">다양한 스타일</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-medium mb-2">기본 스타일</h3>
          <SearchBar class="max-w-md" placeholder="기본 검색 바" bind:value={basicSearch} />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">고스트 스타일</h3>
          <SearchBar
            class="max-w-md"
            variant="ghost"
            placeholder="고스트 스타일 검색 바"
            bind:value={ghostSearch}
            onsearch={handleGhostSearch}
          />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">아웃라인 스타일</h3>
          <SearchBar
            class="max-w-md"
            variant="outline"
            placeholder="아웃라인 스타일 검색 바"
            bind:value={outlineSearch}
            onsearch={handleOutlineSearch}
          />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">크기 변형</h2>
      <div class="space-y-4">
        <div>
          <h3 class="text-lg font-medium mb-2">작은 크기</h3>
          <SearchBar class="max-w-sm" size="sm" placeholder="작은 검색 바" />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">기본 크기</h3>
          <SearchBar class="max-w-md" size="md" placeholder="기본 크기 검색 바" />
        </div>

        <div>
          <h3 class="text-lg font-medium mb-2">큰 크기</h3>
          <SearchBar class="max-w-lg" size="lg" placeholder="큰 크기 검색 바" />
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">필터링과 함께 사용</h2>
      <div class="space-y-4">
        <div class="flex flex-col sm:flex-row gap-4">
          <SearchBar
            class="flex-1 max-w-md"
            placeholder="제목, 카테고리로 검색..."
            bind:value={filterSearch}
            oninput={handleFilterSearch}
          />
          <div class="flex gap-2">
            <Button variant={selectedFilter === 'all' ? 'default' : 'outline'} size="sm" onclick={() => (selectedFilter = 'all')}>
              전체
            </Button>
            <Button variant={selectedFilter === 'post' ? 'default' : 'outline'} size="sm" onclick={() => (selectedFilter = 'post')}>
              게시글
            </Button>
            <Button
              variant={selectedFilter === 'knowledge' ? 'default' : 'outline'}
              size="sm"
              onclick={() => (selectedFilter = 'knowledge')}
            >
              지식
            </Button>
            <Button variant={selectedFilter === 'note' ? 'default' : 'outline'} size="sm" onclick={() => (selectedFilter = 'note')}>
              노트
            </Button>
          </div>
        </div>

        <!-- 검색 결과 -->
        <div class="space-y-2">
          {#if filteredItems.length === 0}
            <div class="text-center py-8 text-muted-foreground">
              {#if filterSearch.trim() || selectedFilter !== 'all'}
                검색 결과가 없습니다.
              {:else}
                모든 항목
              {/if}
            </div>
          {:else}
            <p class="text-sm text-muted-foreground mb-4">
              {filteredItems.length}개 항목 발견
            </p>
            <div class="grid gap-2">
              {#each filteredItems().slice(0, 6) as item}
                <Card.Root class="hover:shadow-sm transition-shadow">
                  <Card.Content class="p-4">
                    <div class="flex items-start justify-between">
                      <div class="flex-1">
                        <h3 class="font-medium leading-tight mb-1">{item.title}</h3>
                        <p class="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <Badge variant={getTypeBadgeVariant(item.type)} class="ml-2">
                        {getTypeText(item.type)}
                      </Badge>
                    </div>
                  </Card.Content>
                </Card.Root>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">고급 검색 패턴</h2>
      <div class="space-y-4">
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-lg">검색 + 필터 + 정렬</Card.Title>
            <Card.Description>완전한 검색 인터페이스 예제</Card.Description>
          </Card.Header>
          <Card.Content class="space-y-4">
            <div class="flex flex-col sm:flex-row gap-4">
              <SearchBar class="flex-1" placeholder="통합 검색..." size="md" />
              <div class="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter class="h-4 w-4 mr-2" />
                  필터
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc class="h-4 w-4 mr-2" />
                  정렬
                </Button>
              </div>
            </div>

            <div class="flex flex-wrap gap-2">
              <Badge variant="secondary">
                최신순
                <Button variant="ghost" size="sm" class="h-4 w-4 p-0 ml-1">
                  <X class="h-3 w-3" />
                </Button>
              </Badge>
              <Badge variant="secondary">
                개발 카테고리
                <Button variant="ghost" size="sm" class="h-4 w-4 p-0 ml-1">
                  <X class="h-3 w-3" />
                </Button>
              </Badge>
            </div>

            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap class="h-4 w-4" />
              <span>빠른 검색: "svelte", "typescript", "spring boot"</span>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">비활성 상태</h2>
      <SearchBar class="max-w-md" placeholder="비활성 상태 검색 바" disabled />
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import { SearchBar } from '$lib/components/ui/search-bar/index.js';
  
  let searchValue = $state('');
  let loading = $state(false);
  
  function handleSearch(value: string) {
    console.log('검색:', value);
    // API 호출 등의 검색 로직
  }
  
  function handleClear() {
    console.log('검색어 지우기');
  }
</script>

<!-- 기본 검색 바 -->
<SearchBar
  placeholder="검색어를 입력하세요"
  bind:value={searchValue}
  onsearch={handleSearch}
  onclear={handleClear}
/>

<!-- 로딩 상태가 있는 검색 바 -->
<SearchBar
  placeholder="검색 중..."
  bind:value={searchValue}
  loading={loading}
  onsearch={handleSearch}
/>

<!-- 스타일 변형 -->
<SearchBar variant="ghost" placeholder="고스트 스타일" />
<SearchBar variant="outline" placeholder="아웃라인 스타일" />

<!-- 크기 변형 -->
<SearchBar size="sm" placeholder="작은 크기" />
<SearchBar size="md" placeholder="기본 크기" />
<SearchBar size="lg" placeholder="큰 크기" />

<!-- 비활성 상태 -->
<SearchBar disabled placeholder="비활성 상태" />`}</code
        ></pre>
    </div>
  </div>
</section>
