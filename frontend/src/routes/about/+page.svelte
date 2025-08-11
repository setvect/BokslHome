<script lang="ts">
  // SvelteKit에서 자동으로 전달하는 모든 props를 무시
  $: void $$restProps;
  
  import * as Card from "$lib/components/ui/card/index";
</script>

<div class="min-h-screen bg-background text-foreground">
  <div class="container mx-auto py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">📋 프로젝트 정보</h1>
      <p class="text-muted-foreground text-lg">
        BokslHome 웹 애플리케이션에 대해 알아보세요
      </p>
    </div>

    <div class="max-w-4xl mx-auto space-y-8">
      <!-- Project Overview -->
      <Card.Root>
        <Card.Header>
          <Card.Title>🏠 BokslHome</Card.Title>
          <Card.Description>
            현대적인 웹 기술 스택으로 구축된 프로젝트
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <p class="text-muted-foreground">
            이 프로젝트는 SvelteKit과 shadcn-svelte를 사용하여 구축된 웹 애플리케이션입니다. 
            Headless 아키텍처와 AI 친화적 설계를 통해 유연하고 확장 가능한 UI 컴포넌트 시스템을 제공합니다.
          </p>
        </Card.Content>
      </Card.Root>

      <!-- Tech Stack -->
      <Card.Root>
        <Card.Header>
          <Card.Title>⚙️ 기술 스택</Card.Title>
          <Card.Description>
            프로젝트에 사용된 주요 기술들
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-semibold mb-3">프론트엔드</h4>
              <ul class="space-y-2 text-muted-foreground">
                <li>• <strong>SvelteKit</strong> - 웹 프레임워크</li>
                <li>• <strong>shadcn-svelte</strong> - UI 컴포넌트 라이브러리</li>
                <li>• <strong>Tailwind CSS v4</strong> - 유틸리티 우선 CSS</li>
                <li>• <strong>TypeScript</strong> - 타입 안전성</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3">개발 도구</h4>
              <ul class="space-y-2 text-muted-foreground">
                <li>• <strong>Vite</strong> - 빌드 도구</li>
                <li>• <strong>PostCSS</strong> - CSS 처리</li>
                <li>• <strong>ESLint + Prettier</strong> - 코드 품질</li>
                <li>• <strong>Claude Code</strong> - AI 개발 도구</li>
              </ul>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Features -->
      <Card.Root>
        <Card.Header>
          <Card.Title>✨ 주요 특징</Card.Title>
          <Card.Description>
            프로젝트의 핵심 기능과 특징들
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold mb-2">🚀 Headless 아키텍처</h4>
                <p class="text-sm text-muted-foreground">
                  Melt UI → Bits UI → shadcn-svelte 3단계 구조로 완전한 커스터마이징 가능
                </p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">🎨 다크/라이트 테마</h4>
                <p class="text-sm text-muted-foreground">
                  시스템 설정 감지 및 사용자 선택 테마 지원
                </p>
              </div>
            </div>
            <div class="space-y-4">
              <div>
                <h4 class="font-semibold mb-2">🤖 AI 친화적 코드</h4>
                <p class="text-sm text-muted-foreground">
                  일관된 API와 명확한 구조로 AI 도구 활용 최적화
                </p>
              </div>
              <div>
                <h4 class="font-semibold mb-2">📱 반응형 디자인</h4>
                <p class="text-sm text-muted-foreground">
                  모바일부터 데스크톱까지 모든 화면 크기 지원
                </p>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card.Root>

      <!-- Navigation -->
      <div class="flex justify-center gap-4">
        <a 
          href="/samples" 
          class="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          🎨 컴포넌트 샘플 보기
        </a>
        <a 
          href="/" 
          class="inline-flex items-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
        >
          ← 홈으로 돌아가기
        </a>
      </div>
    </div>
  </div>
</div>