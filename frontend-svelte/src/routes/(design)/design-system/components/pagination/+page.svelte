<script lang="ts">
  import * as Pagination from '$lib/components/ui/pagination/index.js';

  let currentPage = $state(3);
  const totalItems = 150;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  let currentPageLarge = $state(1);
  const totalItemsLarge = 1000;
  const totalPagesLarge = Math.ceil(totalItemsLarge / itemsPerPage);

  function handlePageChange(page: number) {
    currentPage = page;
  }

  function handlePageChangeLarge(page: number) {
    currentPageLarge = page;
  }
</script>

<section class="space-y-8">
  <div>
    <h1 class="text-2xl font-bold">Pagination</h1>
    <p class="text-muted-foreground">페이지네이션 컴포넌트 - 긴 콘텐츠를 여러 페이지로 나누어 탐색할 수 있게 합니다.</p>
  </div>

  <div class="space-y-6">
    <div class="space-y-4">
      <h2 class="text-xl font-semibold">기본 페이지네이션</h2>
      <p class="text-sm text-muted-foreground">현재 페이지: {currentPage} / {totalPages}</p>
      <div class="flex justify-center">
        <Pagination.Root count={totalPages} page={currentPage}>
          {#snippet children({ pages, currentPage: paginationCurrentPage })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.PrevButton onclick={() => handlePageChange(Math.max(1, paginationCurrentPage - 1))} />
              </Pagination.Item>
              {#each pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link {page} isActive={paginationCurrentPage === page.value} onclick={() => handlePageChange(page.value)}>
                      {page.value}
                    </Pagination.Link>
                  </Pagination.Item>
                {/if}
              {/each}
              <Pagination.Item>
                <Pagination.NextButton onclick={() => handlePageChange(Math.min(totalPages, paginationCurrentPage + 1))} />
              </Pagination.Item>
            </Pagination.Content>
          {/snippet}
        </Pagination.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">큰 데이터셋 페이지네이션</h2>
      <p class="text-sm text-muted-foreground">현재 페이지: {currentPageLarge} / {totalPagesLarge} (총 {totalItemsLarge}개 항목)</p>
      <div class="flex justify-center">
        <Pagination.Root count={totalPagesLarge} page={currentPageLarge}>
          {#snippet children({ pages, currentPage: paginationCurrentPageLarge })}
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.PrevButton onclick={() => handlePageChangeLarge(Math.max(1, paginationCurrentPageLarge - 1))} />
              </Pagination.Item>
              {#each pages as page (page.key)}
                {#if page.type === 'ellipsis'}
                  <Pagination.Item>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                {:else}
                  <Pagination.Item>
                    <Pagination.Link
                      {page}
                      isActive={paginationCurrentPageLarge === page.value}
                      onclick={() => handlePageChangeLarge(page.value)}
                    >
                      {page.value}
                    </Pagination.Link>
                  </Pagination.Item>
                {/if}
              {/each}
              <Pagination.Item>
                <Pagination.NextButton onclick={() => handlePageChangeLarge(Math.min(totalPagesLarge, paginationCurrentPageLarge + 1))} />
              </Pagination.Item>
            </Pagination.Content>
          {/snippet}
        </Pagination.Root>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">사용 예제</h2>
      <div class="rounded-md border p-4 bg-muted">
        <h3 class="font-medium mb-2">게시판 목록</h3>
        <div class="space-y-2">
          {#each Array.from({ length: itemsPerPage }, (_, i) => i + 1 + (currentPage - 1) * itemsPerPage) as item}
            <div class="p-2 border rounded bg-background">
              <span class="text-sm font-medium">게시글 #{item}</span>
              <span class="text-xs text-muted-foreground ml-2">복슬홈 게시판 샘플 데이터</span>
            </div>
          {/each}
        </div>
        <div class="mt-4 flex justify-center">
          <Pagination.Root count={totalPages} page={currentPage}>
            {#snippet children({ pages, currentPage: paginationCurrentPageExample })}
              <Pagination.Content>
                <Pagination.Item>
                  <Pagination.PrevButton onclick={() => handlePageChange(Math.max(1, paginationCurrentPageExample - 1))} />
                </Pagination.Item>
                {#each pages as page (page.key)}
                  {#if page.type === 'ellipsis'}
                    <Pagination.Item>
                      <Pagination.Ellipsis />
                    </Pagination.Item>
                  {:else}
                    <Pagination.Item>
                      <Pagination.Link
                        {page}
                        isActive={paginationCurrentPageExample === page.value}
                        onclick={() => handlePageChange(page.value)}
                      >
                        {page.value}
                      </Pagination.Link>
                    </Pagination.Item>
                  {/if}
                {/each}
                <Pagination.Item>
                  <Pagination.NextButton onclick={() => handlePageChange(Math.min(totalPages, paginationCurrentPageExample + 1))} />
                </Pagination.Item>
              </Pagination.Content>
            {/snippet}
          </Pagination.Root>
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold">코드 예제</h2>
      <pre class="text-sm bg-muted p-4 rounded-md overflow-x-auto"><code
          >{`<script lang="ts">
  import * as Pagination from '$lib/components/ui/pagination/index.js';
  
  let currentPage = $state(1);
  const totalPages = 10;
  
  function handlePageChange(page: number) {
    currentPage = page;
  }
</script>

<Pagination.Root count={totalPages} page={currentPage}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton onclick={() => handlePageChange(Math.max(1, currentPage - 1))} />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === 'ellipsis'}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link
              {page}
              isActive={currentPage === page.value}
              onclick={() => handlePageChange(page.value)}
            >
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton onclick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>`}</code
        ></pre>
    </div>
  </div>
</section>
