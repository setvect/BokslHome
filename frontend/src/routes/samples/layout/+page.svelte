<script lang="ts">
  // SvelteKit에서 자동으로 전달하는 모든 props를 무시
  $: void $$restProps;
  
  import * as Card from "$lib/components/ui/card/index";
</script>

<div class="min-h-screen bg-background text-foreground">
  <div class="container mx-auto py-12">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">📐 Layout</h1>
      <p class="text-muted-foreground">레이아웃과 구조를 위한 컴포넌트들</p>
    </div>

    <div class="space-y-8">
      <!-- Card Examples -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Card 컴포넌트</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Basic Card -->
          <Card.Root>
            <Card.Header>
              <Card.Title>기본 카드</Card.Title>
              <Card.Description>
                가장 기본적인 카드 구성입니다.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p>카드의 주요 내용이 들어갑니다.</p>
            </Card.Content>
          </Card.Root>

          <!-- Card with Footer -->
          <Card.Root>
            <Card.Header>
              <Card.Title>푸터가 있는 카드</Card.Title>
              <Card.Description>
                푸터 영역이 포함된 카드입니다.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p>카드 내용 영역입니다.</p>
            </Card.Content>
            <Card.Footer class="text-sm text-muted-foreground">
              마지막 업데이트: 2024년
            </Card.Footer>
          </Card.Root>

          <!-- Interactive Card -->
          <Card.Root class="hover:bg-accent transition-colors cursor-pointer">
            <Card.Header>
              <Card.Title>인터랙티브 카드</Card.Title>
              <Card.Description>
                호버 효과가 적용된 카드입니다.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p>마우스를 올려보세요!</p>
            </Card.Content>
          </Card.Root>
        </div>
      </section>

      <!-- Grid Examples -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">그리드 레이아웃</h2>
        
        <!-- 2 Column Grid -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">2단 그리드</h3>
          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-muted p-4 rounded-md">
              <h4 class="font-semibold mb-2">첫 번째 열</h4>
              <p class="text-sm text-muted-foreground">첫 번째 열의 내용입니다.</p>
            </div>
            <div class="bg-muted p-4 rounded-md">
              <h4 class="font-semibold mb-2">두 번째 열</h4>
              <p class="text-sm text-muted-foreground">두 번째 열의 내용입니다.</p>
            </div>
          </div>
        </div>

        <!-- 3 Column Grid -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">3단 그리드</h3>
          <div class="grid md:grid-cols-3 gap-4">
            {#each Array(6) as _, i}
              <div class="bg-muted p-4 rounded-md">
                <h4 class="font-semibold mb-2">항목 {i + 1}</h4>
                <p class="text-sm text-muted-foreground">그리드 항목 {i + 1}의 내용입니다.</p>
              </div>
            {/each}
          </div>
        </div>

        <!-- 4 Column Grid -->
        <div>
          <h3 class="text-lg font-medium mb-3">4단 그리드</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {#each Array(8) as _, i}
              <div class="bg-muted p-3 rounded-md text-center">
                <div class="text-2xl mb-2">📦</div>
                <p class="text-sm">박스 {i + 1}</p>
              </div>
            {/each}
          </div>
        </div>
      </section>

      <!-- Container Examples -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">컨테이너 레이아웃</h2>
        <div class="space-y-4">
          <div class="bg-muted p-4 rounded-md">
            <h3 class="font-semibold mb-2">기본 컨테이너</h3>
            <p class="text-muted-foreground">최대 너비가 제한된 중앙 정렬 컨테이너입니다.</p>
          </div>
          
          <div class="bg-accent p-4 rounded-md">
            <h3 class="font-semibold mb-2">강조 컨테이너</h3>
            <p class="text-muted-foreground">accent 색상을 사용한 컨테이너입니다.</p>
          </div>
          
          <div class="border-2 border-dashed border-border p-4 rounded-md">
            <h3 class="font-semibold mb-2">보더 컨테이너</h3>
            <p class="text-muted-foreground">대시 보더를 사용한 컨테이너입니다.</p>
          </div>
        </div>
      </section>
    </div>
  </div>
</div>