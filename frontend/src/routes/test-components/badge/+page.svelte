<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '$lib/components/ui/breadcrumb';
  
  // 동적 상태 관리
  let notificationCount = 5;
  let onlineUsers = 42;
  let tasks = [
    { id: 1, title: '디자인 시스템 구축', status: '진행중', priority: 'high' },
    { id: 2, title: '버그 수정', status: '완료', priority: 'medium' },
    { id: 3, title: '문서 작성', status: '대기', priority: 'low' },
    { id: 4, title: '테스트 케이스', status: '검토', priority: 'high' }
  ];
  
  function getStatusVariant(status: string) {
    switch (status) {
      case '완료': return 'default';
      case '진행중': return 'secondary';
      case '대기': return 'outline';
      case '검토': return 'destructive';
      default: return 'secondary';
    }
  }
  
  function getPriorityColor(priority: string) {
    switch (priority) {
      case 'high': return 'bg-red-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  }
  
  function addNotification() {
    notificationCount++;
  }
  
  function clearNotifications() {
    notificationCount = 0;
  }
</script>

<svelte:head>
  <title>Badge 컴포넌트 테스트 - 디자인 시스템</title>
</svelte:head>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-6xl mx-auto">
    <!-- 헤더 -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-4 text-foreground">Badge 컴포넌트 테스트</h1>
        <p class="text-lg text-muted-foreground">
          Badge 컴포넌트의 다양한 variant, 크기, 용도를 테스트하는 페이지입니다.
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
                <BreadcrumbLink href="/test-components">테스트</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Badge 컴포넌트</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <ThemeToggle />
    </div>
    
    <!-- 기본 Badge Variant -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">기본 Badge Variant</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>기본 Variant</CardTitle>
            <CardDescription>shadcn-svelte에서 제공하는 기본 변형들</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap gap-3">
              <Badge>Default Badge</Badge>
              <Badge variant="secondary">Secondary Badge</Badge>
              <Badge variant="destructive">Destructive Badge</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>크기 비교</CardTitle>
            <CardDescription>같은 텍스트로 크기 비교</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="flex flex-wrap items-center gap-3">
              <Badge class="text-xs px-2 py-0.5">작은 배지</Badge>
              <Badge>기본 배지</Badge>
              <Badge class="text-sm px-3 py-1">큰 배지</Badge>
              <Badge class="text-lg px-4 py-2">매우 큰 배지</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 실용적인 사용 예시 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">실용적인 사용 예시</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- 상태 표시 -->
        <Card>
          <CardHeader>
            <CardTitle>상태 표시</CardTitle>
            <CardDescription>다양한 상태를 나타내는 배지</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between">
              <span>서버 상태:</span>
              <Badge class="bg-green-600 text-white">온라인</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>데이터베이스:</span>
              <Badge class="bg-yellow-600 text-white">점검중</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>API 서비스:</span>
              <Badge variant="destructive">오프라인</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>백업 시스템:</span>
              <Badge variant="secondary">대기</Badge>
            </div>
          </CardContent>
        </Card>
        
        <!-- 카운터 -->
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              알림 카운터
              <Badge variant="destructive">{notificationCount}</Badge>
            </CardTitle>
            <CardDescription>실시간으로 변경되는 카운터 배지</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between">
              <span>새 메시지</span>
              <Badge>{notificationCount}</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>온라인 사용자</span>
              <Badge variant="secondary">{onlineUsers}</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>대기중인 작업</span>
              <Badge variant="outline">3</Badge>
            </div>
            <div class="flex gap-2 mt-4">
              <Button size="sm" onclick={addNotification}>알림 추가</Button>
              <Button size="sm" variant="outline" onclick={clearNotifications}>초기화</Button>
            </div>
          </CardContent>
        </Card>
        
        <!-- 태그/라벨 -->
        <Card>
          <CardHeader>
            <CardTitle>태그/라벨</CardTitle>
            <CardDescription>콘텐츠 분류 및 태깅</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">기술 스택:</h4>
              <div class="flex flex-wrap gap-1">
                <Badge class="bg-blue-600 text-white">React</Badge>
                <Badge class="bg-green-600 text-white">Svelte</Badge>
                <Badge class="bg-yellow-600 text-white">JavaScript</Badge>
                <Badge class="bg-blue-500 text-white">TypeScript</Badge>
              </div>
            </div>
            <div>
              <h4 class="font-medium mb-2">프로젝트 태그:</h4>
              <div class="flex flex-wrap gap-1">
                <Badge variant="outline">프론트엔드</Badge>
                <Badge variant="outline">UI/UX</Badge>
                <Badge variant="outline">디자인시스템</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <!-- 우선순위 -->
        <Card>
          <CardHeader>
            <CardTitle>우선순위 표시</CardTitle>
            <CardDescription>작업이나 이슈의 우선순위</CardDescription>
          </CardHeader>
          <CardContent class="space-y-3">
            {#each tasks as task}
              <div class="flex items-center justify-between">
                <span class="text-sm">{task.title}</span>
                <div class="flex gap-2">
                  <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                  <Badge class={getPriorityColor(task.priority)}>{task.priority}</Badge>
                </div>
              </div>
            {/each}
          </CardContent>
        </Card>
        
        <!-- 버전/릴리스 -->
        <Card>
          <CardHeader>
            <CardTitle>버전 정보</CardTitle>
            <CardDescription>소프트웨어 버전 및 릴리스 표시</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between">
              <span>현재 버전:</span>
              <Badge class="bg-blue-600 text-white">v2.1.0</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>최신 버전:</span>
              <Badge class="bg-green-600 text-white">v2.1.3</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>베타 버전:</span>
              <Badge class="bg-orange-600 text-white">v2.2.0-beta</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>개발 버전:</span>
              <Badge variant="outline">v2.3.0-dev</Badge>
            </div>
          </CardContent>
        </Card>
        
        <!-- 통계/지표 -->
        <Card>
          <CardHeader>
            <CardTitle>통계 지표</CardTitle>
            <CardDescription>수치형 데이터 표시</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="flex items-center justify-between">
              <span>완료율:</span>
              <Badge class="bg-green-600 text-white">85%</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>성능 점수:</span>
              <Badge class="bg-blue-600 text-white">94/100</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>사용자 만족도:</span>
              <Badge class="bg-purple-600 text-white">⭐ 4.8</Badge>
            </div>
            <div class="flex items-center justify-between">
              <span>다운로드 수:</span>
              <Badge variant="secondary">12.5K</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 커스텀 스타일링 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">커스텀 스타일링</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>색상 변형</CardTitle>
            <CardDescription>커스텀 색상을 적용한 배지들</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">기본 색상:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge class="bg-red-500 text-white">Red</Badge>
                <Badge class="bg-orange-500 text-white">Orange</Badge>
                <Badge class="bg-yellow-500 text-white">Yellow</Badge>
                <Badge class="bg-green-500 text-white">Green</Badge>
                <Badge class="bg-blue-500 text-white">Blue</Badge>
                <Badge class="bg-purple-500 text-white">Purple</Badge>
                <Badge class="bg-pink-500 text-white">Pink</Badge>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">밝은 색상:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge class="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100">Light Red</Badge>
                <Badge class="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">Light Green</Badge>
                <Badge class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">Light Blue</Badge>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">그라데이션:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge class="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Purple to Pink</Badge>
                <Badge class="bg-gradient-to-r from-blue-500 to-green-500 text-white">Blue to Green</Badge>
                <Badge class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Sunset</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>모양 변형</CardTitle>
            <CardDescription>다양한 모양과 크기의 배지들</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">둥근 정도:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge class="rounded-none">각진 모서리</Badge>
                <Badge class="rounded-sm">약간 둥근</Badge>
                <Badge class="rounded-md">기본 둥근</Badge>
                <Badge class="rounded-lg">많이 둥근</Badge>
                <Badge class="rounded-full">완전히 둥근</Badge>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">크기 변형:</h4>
              <div class="flex flex-wrap items-center gap-2">
                <Badge class="text-xs px-1 py-0">XS</Badge>
                <Badge class="text-xs px-2 py-0.5">S</Badge>
                <Badge>M</Badge>
                <Badge class="text-base px-3 py-1">L</Badge>
                <Badge class="text-lg px-4 py-2">XL</Badge>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">특수 효과:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge class="shadow-lg">그림자</Badge>
                <Badge class="border-2 border-dashed">점선 테두리</Badge>
                <Badge class="animate-pulse">깜빡임</Badge>
                <Badge class="hover:scale-110 transition-transform cursor-pointer">호버 효과</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 상호작용 배지 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">상호작용 배지</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <Card>
          <CardHeader>
            <CardTitle>클릭 가능한 배지</CardTitle>
            <CardDescription>클릭 시 동작하는 배지들</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">필터 태그:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge 
                  class="cursor-pointer hover:bg-opacity-80 transition-colors" 
                  onclick={() => alert('JavaScript 필터 적용됨')}>
                  JavaScript
                </Badge>
                <Badge 
                  variant="outline" 
                  class="cursor-pointer hover:bg-accent transition-colors"
                  onclick={() => alert('TypeScript 필터 적용됨')}>
                  TypeScript
                </Badge>
                <Badge 
                  variant="secondary" 
                  class="cursor-pointer hover:bg-opacity-80 transition-colors"
                  onclick={() => alert('React 필터 적용됨')}>
                  React
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">삭제 가능한 태그:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge class="cursor-pointer hover:bg-red-500 transition-colors flex items-center gap-1">
                  디자인
                  <span onclick={() => alert('태그 삭제됨')}>×</span>
                </Badge>
                <Badge class="cursor-pointer hover:bg-red-500 transition-colors flex items-center gap-1">
                  개발
                  <span onclick={() => alert('태그 삭제됨')}>×</span>
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>토글 배지</CardTitle>
            <CardDescription>상태가 변경되는 배지들</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div>
              <h4 class="font-medium mb-2">즐겨찾기:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge 
                  class="cursor-pointer hover:bg-yellow-500 transition-colors"
                  onclick={(e) => {
                    const badge = e.target as HTMLElement;
                    if (badge && badge.textContent && badge.textContent.includes('⭐')) {
                      badge.textContent = '☆ 즐겨찾기 추가';
                    } else if (badge && badge.textContent) {
                      badge.textContent = '⭐ 즐겨찾기';
                    }
                  }}>
                  ☆ 즐겨찾기 추가
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-2">알림 설정:</h4>
              <div class="flex flex-wrap gap-2">
                <Badge 
                  variant="outline"
                  class="cursor-pointer hover:bg-accent transition-colors"
                  onclick={(e) => {
                    const badge = e.target as HTMLElement;
                    if (badge && badge.textContent && badge.textContent.includes('🔔')) {
                      badge.textContent = '🔕 알림 끄기';
                      badge.className = badge.className.replace('variant="outline"', '').replace('outline', '') + ' bg-green-500 text-white';
                    } else if (badge && badge.textContent) {
                      badge.textContent = '🔔 알림 켜기';
                      badge.className = 'cursor-pointer hover:bg-accent transition-colors border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground';
                    }
                  }}>
                  🔔 알림 켜기
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 실제 UI 패턴에서의 사용 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibent mb-6 text-foreground">실제 UI 패턴</h2>
      <div class="space-y-6">
        
        <!-- 카드에서 배지 사용 -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle>프로젝트: 디자인 시스템</CardTitle>
              <CardDescription>현대적인 웹 애플리케이션을 위한 UI 컴포넌트 라이브러리</CardDescription>
            </div>
            <div class="flex gap-2">
              <Badge class="bg-green-600 text-white">활성</Badge>
              <Badge variant="outline">v2.1.0</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span>진행률:</span>
                <Badge class="bg-blue-600 text-white">75%</Badge>
              </div>
              <div class="flex gap-2 flex-wrap">
                <Badge class="bg-purple-600 text-white">React</Badge>
                <Badge class="bg-orange-600 text-white">Svelte</Badge>
                <Badge class="bg-blue-600 text-white">TypeScript</Badge>
                <Badge class="bg-pink-600 text-white">Tailwind</Badge>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm">팀원:</span>
                <Badge variant="secondary">김개발</Badge>
                <Badge variant="secondary">이디자인</Badge>
                <Badge variant="secondary">박매니저</Badge>
                <Badge variant="outline">+2명</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <!-- 리스트에서 배지 사용 -->
        <Card>
          <CardHeader>
            <CardTitle>작업 목록</CardTitle>
            <CardDescription>현재 진행중인 작업들과 상태</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-3">
              {#each tasks as task}
                <div class="flex items-center justify-between p-3 border rounded-lg">
                  <div class="flex items-center gap-3">
                    <span class="font-medium">{task.title}</span>
                    <Badge variant={getStatusVariant(task.status)}>{task.status}</Badge>
                  </div>
                  <div class="flex gap-2">
                    <Badge class={getPriorityColor(task.priority)}>
                      {task.priority === 'high' ? '높음' : task.priority === 'medium' ? '보통' : '낮음'}
                    </Badge>
                    <Badge variant="outline">#{task.id}</Badge>
                  </div>
                </div>
              {/each}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4 pt-8 border-t">
      <Button href="/test-components/breadcrumb" variant="outline">
        ← Breadcrumb 테스트
      </Button>
      <Button href="/test-components" variant="secondary">
        전체 컴포넌트 테스트
      </Button>
      <Button href="/" variant="outline">
        홈으로 →
      </Button>
    </div>
  </div>
</div>