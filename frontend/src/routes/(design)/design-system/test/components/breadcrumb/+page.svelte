<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '$lib/components/ui/breadcrumb';
  
  // 동적 브레드크럼을 위한 경로 데이터
  let currentPath = ['홈', '제품', '카테고리', '상품상세'];
  let customPaths = [
    ['홈'],
    ['홈', '소개'],
    ['홈', '제품', '전자기기'],
    ['홈', '제품', '전자기기', '스마트폰'],
    ['홈', '제품', '전자기기', '스마트폰', 'iPhone 15'],
    ['홈', '서비스', '고객지원', 'FAQ', '배송문의', '상세내용']
  ];
  
  function addBreadcrumb() {
    const newItems = ['새항목1', '새항목2', '새항목3'];
    const randomItem = newItems[Math.floor(Math.random() * newItems.length)];
    currentPath = [...currentPath, randomItem];
  }
  
  function removeBreadcrumb() {
    if (currentPath.length > 1) {
      currentPath = currentPath.slice(0, -1);
    }
  }
  
  function resetBreadcrumb() {
    currentPath = ['홈'];
  }
</script>

<svelte:head>
  <title>Breadcrumb 컴포넌트 테스트 - 디자인 시스템</title>
</svelte:head>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-6xl mx-auto">
    <!-- 헤더 -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-4 text-foreground">Breadcrumb 컴포넌트 테스트</h1>
      <p class="text-lg text-muted-foreground">
        Breadcrumb 컴포넌트의 다양한 구조와 스타일을 테스트하는 페이지입니다.
      </p>
      
      <!-- 현재 페이지 브레드크럼 -->
      <div class="mt-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">홈</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/design-system/test/components">테스트</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Breadcrumb 컴포넌트</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
    
    <!-- 기본 Breadcrumb 구조 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">기본 Breadcrumb 구조</h2>
      <div class="space-y-6">
        
        <!-- 2단계 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>2단계 Breadcrumb</CardTitle>
            <CardDescription>홈 → 현재페이지</CardDescription>
          </CardHeader>
          <CardContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>현재 페이지</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
        
        <!-- 3단계 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>3단계 Breadcrumb</CardTitle>
            <CardDescription>홈 → 카테고리 → 현재페이지</CardDescription>
          </CardHeader>
          <CardContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/category">카테고리</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>현재 페이지</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
        
        <!-- 4단계 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>4단계 Breadcrumb</CardTitle>
            <CardDescription>홈 → 카테고리 → 서브카테고리 → 현재페이지</CardDescription>
          </CardHeader>
          <CardContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/category">카테고리</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/category/sub">서브카테고리</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>현재 페이지</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
        
        <!-- 긴 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>깊은 네비게이션 Breadcrumb</CardTitle>
            <CardDescription>여러 단계의 깊은 네비게이션 구조</CardDescription>
          </CardHeader>
          <CardContent>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products">제품</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products/electronics">전자기기</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products/electronics/smartphones">스마트폰</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/products/electronics/smartphones/apple">Apple</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>iPhone 15 Pro</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 다양한 용도별 Breadcrumb -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">다양한 용도별 예시</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- 쇼핑몰 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>쇼핑몰 네비게이션</CardTitle>
            <CardDescription>전형적인 쇼핑몰 카테고리 구조</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">🏠 홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/fashion">👗 패션</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/fashion/women">👩 여성</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>원피스</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">🏠 홈</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics">📱 전자제품</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/electronics/mobile">📱 모바일</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>갤럭시 S24</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
        
        <!-- 문서/블로그 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>문서/블로그 네비게이션</CardTitle>
            <CardDescription>문서나 블로그의 계층 구조</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">📝 블로그</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tech">💻 기술</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tech/frontend">🎨 프론트엔드</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Svelte 5 가이드</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">📚 문서</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/api">🔧 API</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/api/components">🧩 컴포넌트</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Button API</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
        
        <!-- 관리자 패널 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>관리자 패널 네비게이션</CardTitle>
            <CardDescription>관리자 대시보드의 네비게이션</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">⚙️ 관리자</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users">👥 사용자</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/users/list">목록</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>상세정보</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin">⚙️ 관리자</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/content">📝 콘텐츠</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/admin/content/posts">게시글</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>새 게시글 작성</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
        
        <!-- 파일 시스템 Breadcrumb -->
        <Card>
          <CardHeader>
            <CardTitle>파일 시스템 네비게이션</CardTitle>
            <CardDescription>파일 탐색기 스타일의 경로</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/drive">💾 C:</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/drive/users">👥 Users</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/drive/users/john">👤 John</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/drive/users/john/documents">📄 Documents</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>📁 Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 동적 Breadcrumb -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">동적 Breadcrumb</h2>
      <Card>
        <CardHeader>
          <CardTitle>실시간 경로 변경</CardTitle>
          <CardDescription>JavaScript로 경로를 동적으로 변경하는 예시</CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
          <!-- 현재 동적 Breadcrumb -->
          <div class="p-4 bg-muted rounded-lg">
            <h4 class="font-medium mb-2">현재 경로:</h4>
            <Breadcrumb>
              <BreadcrumbList>
                {#each currentPath as item, index}
                  <BreadcrumbItem>
                    {#if index === currentPath.length - 1}
                      <BreadcrumbPage>{item}</BreadcrumbPage>
                    {:else}
                      <BreadcrumbLink href={`/${item.toLowerCase()}`}>{item}</BreadcrumbLink>
                    {/if}
                  </BreadcrumbItem>
                  {#if index < currentPath.length - 1}
                    <BreadcrumbSeparator />
                  {/if}
                {/each}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <!-- 컨트롤 버튼들 -->
          <div class="flex flex-wrap gap-2">
            <Button size="sm" onclick={addBreadcrumb}>
              경로 추가
            </Button>
            <Button size="sm" variant="outline" onclick={removeBreadcrumb}>
              경로 제거
            </Button>
            <Button size="sm" variant="secondary" onclick={resetBreadcrumb}>
              초기화
            </Button>
          </div>
          
          <!-- 미리 정의된 경로들 -->
          <div class="space-y-3">
            <h4 class="font-medium">미리 정의된 경로로 변경:</h4>
            {#each customPaths as path, index}
              <div class="p-2 bg-card border rounded cursor-pointer hover:bg-accent"
                   onclick={() => currentPath = [...path]}
                   onkeydown={(e) => e.key === 'Enter' || e.key === ' ' ? currentPath = [...path] : null}
                   role="button" 
                   tabindex="0"
                   aria-label="브레드크럼 경로 변경">
                <Breadcrumb>
                  <BreadcrumbList>
                    {#each path as item, itemIndex}
                      <BreadcrumbItem>
                        {#if itemIndex === path.length - 1}
                          <BreadcrumbPage>{item}</BreadcrumbPage>
                        {:else}
                          <BreadcrumbLink href={`/${item.toLowerCase()}`}>{item}</BreadcrumbLink>
                        {/if}
                      </BreadcrumbItem>
                      {#if itemIndex < path.length - 1}
                        <BreadcrumbSeparator />
                      {/if}
                    {/each}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            {/each}
          </div>
        </CardContent>
      </Card>
    </section>
    
    <!-- 반응형 테스트 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">반응형 테스트</h2>
      <Card>
        <CardHeader>
          <CardTitle>화면 크기별 표시</CardTitle>
          <CardDescription>브라우저 창 크기를 변경하여 반응형 동작을 확인하세요</CardDescription>
        </CardHeader>
        <CardContent class="space-y-4">
          <!-- 매우 긴 Breadcrumb -->
          <div class="p-4 bg-muted rounded-lg">
            <h4 class="font-medium mb-2">긴 경로 (반응형 테스트):</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">홈페이지</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/ecommerce">전자상거래</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/ecommerce/electronics">전자제품카테고리</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/ecommerce/electronics/computers">컴퓨터및주변기기</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/ecommerce/electronics/computers/laptops">노트북컴퓨터</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>맥북프로16인치M3Max</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <p class="text-sm text-muted-foreground">
            💡 화면 크기가 작아지면 Breadcrumb이 적절히 줄바꿈되거나 축약될 수 있습니다.
          </p>
        </CardContent>
      </Card>
    </section>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4 pt-8 border-t">
      <Button href="/design-system/test/components/input" variant="outline">
        ← Input 테스트
      </Button>
      <Button href="/design-system/test/components" variant="secondary">
        전체 컴포넌트 테스트
      </Button>
      <Button href="/design-system/test/components/badge" variant="outline">
        Badge 테스트 →
      </Button>
    </div>
  </div>
</div>