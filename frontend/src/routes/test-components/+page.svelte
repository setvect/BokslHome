<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { Badge } from '$lib/components/ui/badge';
  import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '$lib/components/ui/breadcrumb';
</script>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-4xl mx-auto">
    <!-- 헤더 -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-4 text-foreground">shadcn-svelte 컴포넌트 테스트</h1>
        <p class="text-lg text-muted-foreground">
          shadcn-svelte 컴포넌트가 커스텀 색상 변수와 올바르게 연동되는지 확인하는 페이지입니다.
        </p>
      </div>
      
      <ThemeToggle />
    </div>
    
    <!-- 버튼 클래스 명시적 선언 (Tailwind 생성 보장) -->
    <div class="hidden">
      <!-- hover 클래스들 -->
      <div class="hover:bg-primary/90 hover:bg-destructive/90 hover:bg-secondary/80 hover:bg-accent hover:text-accent-foreground hover:bg-input/50 hover:underline"></div>
      <!-- transition 클래스들 -->
      <div class="transition-all transition-colors transition-opacity"></div>
      <!-- focus 클래스들 -->
      <div class="focus-visible:ring-[3px] focus-visible:border-ring focus-visible:ring-ring/50"></div>
      <!-- cursor 클래스들 -->
      <div class="cursor-pointer cursor-not-allowed disabled:cursor-not-allowed aria-disabled:cursor-not-allowed"></div>
    </div>
    
    <!-- Button 컴포넌트 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">Button 컴포넌트 테스트</h2>
      
      <!-- 기본 변형들 -->
      <div class="space-y-6">
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-foreground">버튼 변형 (Variants)</h3>
          <div class="flex flex-wrap gap-3">
            <Button variant="default" onclick={() => alert('Default 버튼 클릭됨!')}>
              Default Button
            </Button>
            
            <Button variant="secondary" onclick={() => alert('Secondary 버튼 클릭됨!')}>
              Secondary Button
            </Button>
            
            <Button variant="destructive" onclick={() => alert('Destructive 버튼 클릭됨!')}>
              Destructive Button
            </Button>
            
            <Button variant="outline">
              Outline Button
            </Button>
            
            <Button variant="ghost">
              Ghost Button
            </Button>
            
            <Button variant="link">
              Link Button
            </Button>
          </div>
        </div>
        
        <!-- 크기 변형들 -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-foreground">버튼 크기 (Sizes)</h3>
          <div class="flex items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🎨</Button>
          </div>
        </div>
        
        <!-- 상태 테스트 -->
        <div class="space-y-3">
          <h3 class="text-lg font-medium text-foreground">버튼 상태</h3>
          <div class="flex gap-3">
            <Button variant="default">Normal</Button>
            <Button variant="default" disabled>Disabled</Button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 색상 연동 확인 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">테마별 색상 연동 확인</h2>
      
      <div class="space-y-4">
        <p class="text-muted-foreground">
          테마를 전환하여 각 버튼의 색상이 올바르게 변경되는지 확인하세요:
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h3 class="text-base font-medium text-foreground">Primary Colors</h3>
            <div class="space-y-2">
              <Button variant="default" class="w-full">
                Primary (bg-primary + text-primary-foreground)
              </Button>
              <Button variant="secondary" class="w-full">
                Secondary (bg-secondary + text-secondary-foreground)
              </Button>
            </div>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-base font-medium text-foreground">Interactive Colors</h3>
            <div class="space-y-2">
              <Button variant="outline" class="w-full">
                Outline (bg-background + hover:bg-accent)
              </Button>
              <Button variant="destructive" class="w-full">
                Destructive (bg-destructive + text-white)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Card 컴포넌트 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">Card 컴포넌트 테스트</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card class="w-full">
          <CardHeader>
            <CardTitle>카드 제목</CardTitle>
            <CardDescription>
              카드 설명입니다. 이 텍스트가 muted-foreground 색상으로 잘 표시되는지 확인하세요.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-foreground">
              카드 내용입니다. 여기에는 더 자세한 정보가 들어갑니다.
            </p>
          </CardContent>
          <CardFooter class="flex gap-2">
            <Button size="sm">액션</Button>
            <Button variant="outline" size="sm">취소</Button>
          </CardFooter>
        </Card>
        
        <Card class="w-full bg-accent">
          <CardHeader>
            <CardTitle>Accent 배경 카드</CardTitle>
            <CardDescription>
              accent 배경색을 사용한 카드입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <Badge variant="default">기본 배지</Badge>
              <Badge variant="secondary">보조 배지</Badge>
              <Badge variant="destructive">중요 배지</Badge>
              <Badge variant="outline">외곽선 배지</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    
    <!-- Input & Label 컴포넌트 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">Input & Label 컴포넌트 테스트</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="email">이메일 주소</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="example@email.com"
              class="w-full"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="password">비밀번호</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="비밀번호를 입력하세요"
              class="w-full"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="disabled">비활성화된 입력</Label>
            <Input 
              id="disabled" 
              type="text" 
              placeholder="비활성화됨"
              disabled
              class="w-full"
            />
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="space-y-2">
            <Label for="search">검색</Label>
            <Input 
              id="search" 
              type="search" 
              placeholder="검색어를 입력하세요"
              class="w-full"
            />
          </div>
          
          <div class="space-y-2">
            <Label for="textarea">긴 텍스트</Label>
            <Input 
              id="textarea" 
              placeholder="여러 줄 텍스트..."
              class="w-full h-20"
            />
          </div>
        </div>
      </div>
    </div>
    
    <!-- Breadcrumb 컴포넌트 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">Breadcrumb 컴포넌트 테스트</h2>
      
      <div class="space-y-4">
        <div>
          <p class="text-sm text-muted-foreground mb-2">기본 브레드크럼:</p>
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
                <BreadcrumbPage>컴포넌트</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div>
          <p class="text-sm text-muted-foreground mb-2">깊은 네비게이션:</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">홈</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/design-system">디자인 시스템</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/design-system/components">컴포넌트</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>테스트</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
    
    <!-- Badge 컴포넌트 집중 테스트 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">Badge 컴포넌트 테스트</h2>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-lg font-medium text-foreground mb-3">Badge 변형</h3>
          <div class="flex flex-wrap gap-2">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
            <Badge variant="destructive">Destructive Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-foreground mb-3">상태별 배지</h3>
          <div class="flex flex-wrap gap-2">
            <Badge class="bg-green-600 text-white">활성</Badge>
            <Badge class="bg-yellow-600 text-white">대기</Badge>
            <Badge class="bg-red-600 text-white">오류</Badge>
            <Badge class="bg-blue-600 text-white">진행중</Badge>
            <Badge class="bg-purple-600 text-white">완료</Badge>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-medium text-foreground mb-3">카운터와 함께</h3>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2">
              <span class="text-foreground">메시지</span>
              <Badge variant="destructive">3</Badge>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-foreground">알림</span>
              <Badge>12</Badge>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-foreground">할일</span>
              <Badge variant="secondary">5</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 개별 컴포넌트 테스트 페이지 링크 -->
    <div class="bg-card rounded-lg border p-6 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-card-foreground">개별 컴포넌트 상세 테스트</h2>
      <p class="text-muted-foreground mb-4">
        각 컴포넌트의 모든 기능과 상태를 자세히 테스트할 수 있는 전용 페이지들입니다.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button href="/test-components/button" variant="outline" class="h-auto p-4 flex flex-col items-start text-left">
          <span class="font-semibold mb-1">Button 컴포넌트</span>
          <span class="text-sm text-muted-foreground">모든 variant, 크기, 상태, 로딩 등</span>
        </Button>
        
        <Button href="/test-components/card" variant="outline" class="h-auto p-4 flex flex-col items-start text-left">
          <span class="font-semibold mb-1">Card 컴포넌트</span>
          <span class="text-sm text-muted-foreground">다양한 구조와 스타일, 인터랙션</span>
        </Button>
        
        <Button href="/test-components/input" variant="outline" class="h-auto p-4 flex flex-col items-start text-left">
          <span class="font-semibold mb-1">Input & Label</span>
          <span class="text-sm text-muted-foreground">모든 input 타입, 검증, 상태</span>
        </Button>
        
        <Button href="/test-components/breadcrumb" variant="outline" class="h-auto p-4 flex flex-col items-start text-left">
          <span class="font-semibold mb-1">Breadcrumb</span>
          <span class="text-sm text-muted-foreground">동적 경로, 다양한 패턴</span>
        </Button>
        
        <Button href="/test-components/badge" variant="outline" class="h-auto p-4 flex flex-col items-start text-left">
          <span class="font-semibold mb-1">Badge</span>
          <span class="text-sm text-muted-foreground">상태, 카운터, 태그, 인터랙션</span>
        </Button>
      </div>
    </div>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4">
      <Button href="/" variant="secondary">
        홈으로 돌아가기
      </Button>
      <Button href="/test-colors/custom" variant="outline">
        커스텀 색상 테스트
      </Button>
      <Button href="/test-theme" variant="ghost">
        테마 검증 페이지
      </Button>
    </div>
  </div>
</div>