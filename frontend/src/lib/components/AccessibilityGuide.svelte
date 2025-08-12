<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  
  export let guidelines: Array<{
    title: string;
    description: string;
    items: string[];
    level?: 'A' | 'AA' | 'AAA';
  }>;
  
  export let title: string = '접근성 (Accessibility)';
  export let description: string = '웹 접근성 표준을 준수하는 컴포넌트입니다.';
  
  function getLevelColor(level?: string) {
    switch (level) {
      case 'A': return 'default';
      case 'AA': return 'secondary'; 
      case 'AAA': return 'outline';
      default: return 'secondary';
    }
  }
</script>

<section class="mb-16">
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-foreground mb-4">{title}</h2>
    <p class="text-muted-foreground">{description}</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    {#each guidelines as guideline}
      <Card class="h-full">
        <CardHeader>
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <CardTitle class="text-lg">{guideline.title}</CardTitle>
              <CardDescription class="mt-1">{guideline.description}</CardDescription>
            </div>
            {#if guideline.level}
              <Badge variant={getLevelColor(guideline.level)} class="ml-2 shrink-0">
                WCAG {guideline.level}
              </Badge>
            {/if}
          </div>
        </CardHeader>
        <CardContent>
          <ul class="space-y-3">
            {#each guideline.items as item}
              <li class="flex items-start gap-3 text-sm">
                <span class="text-primary mt-1 shrink-0">•</span>
                <span class="text-foreground leading-relaxed">{item}</span>
              </li>
            {/each}
          </ul>
        </CardContent>
      </Card>
    {/each}
  </div>
  
  <!-- 접근성 체크리스트 -->
  <Card class="mt-8 border-primary/20 bg-primary/5">
    <CardHeader>
      <CardTitle class="text-lg flex items-center gap-2">
        ♿ 접근성 체크리스트
      </CardTitle>
      <CardDescription>
        이 컴포넌트가 준수하는 주요 접근성 기준들입니다.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            키보드 접근성
          </h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>• Tab 키로 포커스 이동 가능</li>
            <li>• Enter/Space 키로 활성화 가능</li>
            <li>• 포커스 표시기 제공</li>
            <li>• 논리적 탭 순서 유지</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            스크린 리더 지원
          </h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>• 적절한 role 속성</li>
            <li>• 명확한 레이블 제공</li>
            <li>• 상태 변화 알림</li>
            <li>• 의미있는 HTML 구조</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            시각적 접근성
          </h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>• WCAG AA 대비율 준수</li>
            <li>• 색상에만 의존하지 않는 정보 전달</li>
            <li>• 충분한 클릭 영역 (최소 44px)</li>
            <li>• 확대 시 가독성 유지</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-semibold text-foreground mb-3 flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            운동 장애 지원
          </h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>• 충분한 클릭 영역</li>
            <li>• 드래그 동작 불필요</li>
            <li>• 시간 제한 없음</li>
            <li>• 실수 방지 및 복구 지원</li>
          </ul>
        </div>
      </div>
    </CardContent>
  </Card>
</section>