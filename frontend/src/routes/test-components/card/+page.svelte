<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  
  let favoriteCards = new Set<string>();
  
  function toggleFavorite(cardId: string) {
    if (favoriteCards.has(cardId)) {
      favoriteCards.delete(cardId);
    } else {
      favoriteCards.add(cardId);
    }
    favoriteCards = favoriteCards; // Svelte reactivity
  }
</script>

<svelte:head>
  <title>Card 컴포넌트 테스트 - 디자인 시스템</title>
</svelte:head>

<div class="p-8 bg-background text-foreground min-h-screen">
  <div class="max-w-6xl mx-auto">
    <!-- 헤더 -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-4xl font-bold mb-4 text-foreground">Card 컴포넌트 테스트</h1>
        <p class="text-lg text-muted-foreground">
          Card 컴포넌트의 다양한 구조와 스타일을 테스트하는 페이지입니다.
        </p>
      </div>
      
      <ThemeToggle />
    </div>
    
    <!-- 기본 Card 구조 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">기본 Card 구조</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- 최소한의 Card -->
        <Card>
          <CardContent class="pt-6">
            <p class="text-foreground">가장 간단한 Card입니다.</p>
          </CardContent>
        </Card>
        
        <!-- Header만 있는 Card -->
        <Card>
          <CardHeader>
            <CardTitle>제목만 있는 Card</CardTitle>
          </CardHeader>
        </Card>
        
        <!-- Header + Content -->
        <Card>
          <CardHeader>
            <CardTitle>완전한 Card</CardTitle>
            <CardDescription>설명이 포함된 카드입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-foreground">카드의 주요 내용이 여기에 들어갑니다.</p>
          </CardContent>
        </Card>
        
        <!-- 모든 구성요소 포함 -->
        <Card class="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>전체 구성요소를 포함한 Card</CardTitle>
            <CardDescription>Header, Content, Footer를 모두 포함한 완전한 카드 예시입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-foreground mb-4">
              이 카드는 모든 Card 하위 컴포넌트를 포함하고 있습니다. 
              실제 애플리케이션에서 가장 일반적으로 사용되는 형태입니다.
            </p>
            <div class="flex gap-2">
              <Badge>태그1</Badge>
              <Badge variant="secondary">태그2</Badge>
              <Badge variant="outline">태그3</Badge>
            </div>
          </CardContent>
          <CardFooter class="flex justify-between">
            <Button variant="outline">취소</Button>
            <Button>확인</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
    
    <!-- 다양한 용도의 Card -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">다양한 용도별 Card</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- 사용자 프로필 Card -->
        <Card>
          <CardHeader class="text-center">
            <div class="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl">
              👤
            </div>
            <CardTitle>김철수</CardTitle>
            <CardDescription>프론트엔드 개발자</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-muted-foreground">경력:</span>
                <span>3년</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">기술스택:</span>
                <span>React, Svelte</span>
              </div>
              <div class="flex justify-between">
                <span class="text-muted-foreground">위치:</span>
                <span>서울</span>
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex gap-2">
            <Button size="sm" class="flex-1">연락하기</Button>
            <Button variant="outline" size="sm" 
                    onclick={() => toggleFavorite('profile1')}
                    class={favoriteCards.has('profile1') ? 'text-red-500' : ''}>
              {favoriteCards.has('profile1') ? '❤️' : '🤍'}
            </Button>
          </CardFooter>
        </Card>
        
        <!-- 제품/상품 Card -->
        <Card>
          <CardHeader>
            <div class="w-full h-32 bg-muted rounded mb-4 flex items-center justify-center text-6xl">
              📱
            </div>
            <CardTitle>스마트폰</CardTitle>
            <CardDescription>최신 기술이 적용된 스마트폰</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-primary">₩899,000</span>
                <Badge variant="destructive">20% 할인</Badge>
              </div>
              <div class="text-sm text-muted-foreground line-through">₹1,120,000</div>
              <div class="flex gap-1 mt-2">
                <span class="text-yellow-500">⭐⭐⭐⭐⭐</span>
                <span class="text-sm text-muted-foreground">(4.8/5.0)</span>
              </div>
            </div>
          </CardContent>
          <CardFooter class="flex gap-2">
            <Button size="sm" class="flex-1">장바구니</Button>
            <Button variant="outline" size="sm" class="flex-1">바로구매</Button>
          </CardFooter>
        </Card>
        
        <!-- 통계/대시보드 Card -->
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">총 매출</CardTitle>
            <div class="text-2xl">💰</div>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">₩45,231,890</div>
            <div class="text-xs text-muted-foreground">
              <span class="text-green-600">+20.1%</span> from last month
            </div>
            <div class="mt-4 h-2 bg-muted rounded-full overflow-hidden">
              <div class="h-full w-3/4 bg-primary rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        
        <!-- 알림/메시지 Card -->
        <Card class="md:col-span-2 lg:col-span-1">
          <CardHeader>
            <CardTitle class="flex items-center gap-2">
              <span class="w-2 h-2 bg-green-500 rounded-full"></span>
              시스템 알림
            </CardTitle>
            <CardDescription>5분 전</CardDescription>
          </CardHeader>
          <CardContent>
            <p class="text-foreground">
              디자인 시스템 업데이트가 완료되었습니다. 
              새로운 컴포넌트와 테마를 확인해보세요.
            </p>
          </CardContent>
          <CardFooter>
            <Button size="sm" variant="outline" class="ml-auto">확인</Button>
          </CardFooter>
        </Card>
        
        <!-- 설정/폼 Card -->
        <Card class="md:col-span-2">
          <CardHeader>
            <CardTitle>계정 설정</CardTitle>
            <CardDescription>프로필 정보를 업데이트하세요.</CardDescription>
          </CardHeader>
          <CardContent class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <Label for="firstname">이름</Label>
                <Input id="firstname" value="철수" />
              </div>
              <div class="space-y-2">
                <Label for="lastname">성</Label>
                <Input id="lastname" value="김" />
              </div>
            </div>
            <div class="space-y-2">
              <Label for="email">이메일</Label>
              <Input id="email" type="email" value="kim@example.com" />
            </div>
            <div class="space-y-2">
              <Label for="bio">자기소개</Label>
              <Input id="bio" placeholder="간단한 자기소개를 입력하세요..." />
            </div>
          </CardContent>
          <CardFooter class="flex justify-between">
            <Button variant="outline">취소</Button>
            <Button>저장</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
    
    <!-- 다양한 스타일링 -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">다양한 스타일링</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- 기본 Card -->
        <Card>
          <CardHeader>
            <CardTitle>기본 Card</CardTitle>
            <CardDescription>기본 배경색과 보더를 가진 카드</CardDescription>
          </CardHeader>
          <CardContent>
            <p>기본적인 Card 스타일입니다.</p>
          </CardContent>
        </Card>
        
        <!-- Accent 배경 Card -->
        <Card class="bg-accent">
          <CardHeader>
            <CardTitle>Accent 배경</CardTitle>
            <CardDescription>accent 배경색을 사용한 카드</CardDescription>
          </CardHeader>
          <CardContent>
            <p>강조된 배경색을 가진 카드입니다.</p>
          </CardContent>
        </Card>
        
        <!-- Muted 배경 Card -->
        <Card class="bg-muted">
          <CardHeader>
            <CardTitle>Muted 배경</CardTitle>
            <CardDescription>muted 배경색을 사용한 카드</CardDescription>
          </CardHeader>
          <CardContent>
            <p>부드러운 배경색을 가진 카드입니다.</p>
          </CardContent>
        </Card>
        
        <!-- 커스텀 보더 Card -->
        <Card class="border-2 border-primary">
          <CardHeader>
            <CardTitle class="text-primary">Primary 보더</CardTitle>
            <CardDescription>primary 색상 보더를 가진 카드</CardDescription>
          </CardHeader>
          <CardContent>
            <p>강조된 보더를 가진 카드입니다.</p>
          </CardContent>
        </Card>
        
        <!-- 그라데이션 배경 Card -->
        <Card class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle>그라데이션 배경</CardTitle>
            <CardDescription>그라데이션 배경을 가진 카드</CardDescription>
          </CardHeader>
          <CardContent>
            <p>특별한 시각 효과를 가진 카드입니다.</p>
          </CardContent>
        </Card>
        
        <!-- 그림자 효과 Card -->
        <Card class="shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle>그림자 효과</CardTitle>
            <CardDescription>hover 시 그림자가 커지는 카드</CardDescription>
          </CardHeader>
          <CardContent>
            <p>인터랙티브한 그림자 효과를 가진 카드입니다.</p>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 인터랙티브 Card -->
    <section class="mb-12">
      <h2 class="text-3xl font-semibold mb-6 text-foreground">인터랙티브 Card</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- 클릭 가능한 Card -->
        <Card class="cursor-pointer hover:bg-accent/50 transition-colors" 
              onclick={() => alert('Card가 클릭되었습니다!')}>
          <CardHeader>
            <CardTitle>클릭 가능한 Card</CardTitle>
            <CardDescription>전체 카드 영역이 클릭 가능합니다</CardDescription>
          </CardHeader>
          <CardContent>
            <p>이 카드를 클릭해보세요. hover 효과도 확인할 수 있습니다.</p>
            <div class="mt-4 text-sm text-muted-foreground">
              💡 hover 시 배경색이 변경됩니다
            </div>
          </CardContent>
        </Card>
        
        <!-- 토글 가능한 Card -->
        <Card class={`transition-all cursor-pointer ${favoriteCards.has('toggle-card') ? 'bg-primary/10 border-primary' : 'hover:bg-accent/50'}`}
              onclick={() => toggleFavorite('toggle-card')}>
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              토글 Card
              <span class="text-2xl">
                {favoriteCards.has('toggle-card') ? '❤️' : '🤍'}
              </span>
            </CardTitle>
            <CardDescription>클릭하면 선택/해제됩니다</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {favoriteCards.has('toggle-card') ? '선택됨! 다시 클릭하면 해제됩니다.' : '클릭하면 선택 상태가 됩니다.'}
            </p>
            <div class="mt-4">
              <Badge variant={favoriteCards.has('toggle-card') ? 'default' : 'secondary'}>
                {favoriteCards.has('toggle-card') ? '활성' : '비활성'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
    
    <!-- 네비게이션 -->
    <div class="text-center space-x-4 pt-8 border-t">
      <Button href="/test-components/button" variant="outline">
        ← Button 테스트
      </Button>
      <Button href="/test-components" variant="secondary">
        전체 컴포넌트 테스트
      </Button>
      <Button href="/test-components/input" variant="outline">
        Input 테스트 →
      </Button>
    </div>
  </div>
</div>