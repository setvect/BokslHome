<script lang="ts">
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  import Button from '$lib/components/ui/button/button.svelte';
  
  let copiedCode = '';
  
  async function copyCode(code: string, id: string) {
    try {
      await navigator.clipboard.writeText(code);
      copiedCode = id;
      setTimeout(() => {
        copiedCode = '';
      }, 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }
  
  const installSteps = [
    {
      id: 'sveltekit',
      title: '1. SvelteKit 프로젝트 생성',
      description: 'TypeScript를 포함한 새 SvelteKit 프로젝트를 생성합니다.',
      code: `npm create svelte@latest my-project
cd my-project
npm install`,
      language: 'bash'
    },
    {
      id: 'tailwind',
      title: '2. Tailwind CSS v4.1 설치',
      description: 'Tailwind CSS v4.1과 필요한 PostCSS 플러그인을 설치합니다.',
      code: `npm install -D tailwindcss@4.1.1 @tailwindcss/postcss@4.1.1 autoprefixer postcss`,
      language: 'bash'
    },
    {
      id: 'postcss-config',
      title: '3. PostCSS 설정',
      description: 'postcss.config.js 파일을 생성하고 설정합니다.',
      code: `export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}`,
      language: 'javascript',
      filename: 'postcss.config.js'
    },
    {
      id: 'tailwind-config',
      title: '4. Tailwind 설정',
      description: 'tailwind.config.ts 파일을 생성하고 다크 모드를 설정합니다.',
      code: `import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: ["class"]
} satisfies Config;`,
      language: 'typescript',
      filename: 'tailwind.config.ts'
    },
    {
      id: 'app-css',
      title: '5. 글로벌 CSS 설정',
      description: 'src/app.pcss 파일에 Tailwind와 커스텀 색상을 설정합니다.',
      code: `@import "tailwindcss";

@theme {
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
}

:root {
  --background: oklch(98% 0.01 220);
  --foreground: oklch(15% 0.01 220);
  --card: oklch(100% 0 0);
  --card-foreground: oklch(15% 0.01 220);
  --primary: oklch(20.8% 0.042 264.6);
  --primary-foreground: oklch(87.1% 0.042 264.6);
  --secondary: oklch(96.1% 0.013 286.3);
  --secondary-foreground: oklch(15.7% 0.013 286.3);
  --muted: oklch(96.1% 0.013 286.3);
  --muted-foreground: oklch(45.2% 0.013 286.3);
  --accent: oklch(96.1% 0.013 286.3);
  --accent-foreground: oklch(15.7% 0.013 286.3);
  --destructive: oklch(60% 0.196 17.38);
  --destructive-foreground: oklch(100% 0 0);
  --border: oklch(89.5% 0.005 286.3);
  --input: oklch(89.5% 0.005 286.3);
  --ring: oklch(20.8% 0.042 264.6);
}

.dark {
  --background: oklch(9% 0.01 220);
  --foreground: oklch(98% 0.01 220);
  --card: oklch(12% 0.01 220);
  --card-foreground: oklch(98% 0.01 220);
  --primary: oklch(87.1% 0.042 264.6);
  --primary-foreground: oklch(20.8% 0.042 264.6);
  --secondary: oklch(15.7% 0.013 286.3);
  --secondary-foreground: oklch(87.1% 0.013 286.3);
  --muted: oklch(15.7% 0.013 286.3);
  --muted-foreground: oklch(64.9% 0.013 286.3);
  --accent: oklch(15.7% 0.013 286.3);
  --accent-foreground: oklch(87.1% 0.013 286.3);
  --destructive: oklch(60% 0.196 17.38);
  --destructive-foreground: oklch(100% 0 0);
  --border: oklch(17.9% 0.013 286.3);
  --input: oklch(17.9% 0.013 286.3);
  --ring: oklch(87.1% 0.042 264.6);
}`,
      language: 'css',
      filename: 'src/app.pcss'
    },
    {
      id: 'shadcn-init',
      title: '6. shadcn-svelte 초기화',
      description: 'shadcn-svelte CLI를 사용하여 프로젝트를 초기화합니다.',
      code: `npx shadcn-svelte@latest init`,
      language: 'bash'
    },
    {
      id: 'shadcn-components',
      title: '7. 컴포넌트 설치',
      description: '필요한 UI 컴포넌트들을 설치합니다.',
      code: `# 기본 컴포넌트 설치
npx shadcn-svelte@latest add button
npx shadcn-svelte@latest add card
npx shadcn-svelte@latest add input
npx shadcn-svelte@latest add label
npx shadcn-svelte@latest add badge
npx shadcn-svelte@latest add breadcrumb`,
      language: 'bash'
    },
    {
      id: 'theme-store',
      title: '8. 테마 관리 스토어 생성',
      description: '다크/라이트 모드 전환을 위한 Svelte 스토어를 생성합니다.',
      code: `import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
  const { subscribe, set, update } = writable<Theme>('system');

  return {
    subscribe,
    setTheme: (theme: Theme) => {
      if (browser) {
        localStorage.setItem('theme', theme);
        updateDocument(theme);
      }
      set(theme);
    },
    init: () => {
      if (browser) {
        const stored = localStorage.getItem('theme') as Theme;
        const theme = stored || 'system';
        updateDocument(theme);
        set(theme);
      }
    }
  };
}

function updateDocument(theme: Theme) {
  const root = document.documentElement;
  
  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' : 'light';
    root.classList.toggle('dark', systemTheme === 'dark');
  } else {
    root.classList.toggle('dark', theme === 'dark');
  }
}

export const theme = createThemeStore();`,
      language: 'typescript',
      filename: 'src/lib/stores/theme.ts'
    }
  ];
  
  const troubleshooting = [
    {
      issue: 'PostCSS 오류',
      solution: '@tailwindcss/postcss 버전이 4.1.1인지 확인하세요.',
      code: 'npm list @tailwindcss/postcss'
    },
    {
      issue: '색상이 적용되지 않음',
      solution: 'app.pcss가 올바르게 import되었는지 확인하세요.',
      code: '// src/app.html\n<link rel="stylesheet" href="%sveltekit.assets%/app.pcss" />'
    },
    {
      issue: 'TypeScript 오류',
      solution: 'tsconfig.json에서 shadcn-svelte 타입을 포함했는지 확인하세요.',
      code: '{\n  "compilerOptions": {\n    "types": ["@tailwindcss/postcss"]\n  }\n}'
    }
  ];
</script>

<svelte:head>
  <title>설치 가이드 - 디자인 시스템</title>
  <meta name="description" content="디자인 시스템을 프로젝트에 설치하는 단계별 가이드" />
</svelte:head>

<div class="container mx-auto px-6 py-8 max-w-4xl">
  <!-- 헤더 -->
  <section class="mb-12">
    <div class="mb-6">
      <h1 class="text-4xl font-bold text-foreground mb-4">설치 가이드</h1>
      <p class="text-lg text-muted-foreground max-w-3xl">
        단계별 가이드를 따라 디자인 시스템을 프로젝트에 설치하고 설정하세요. 
        모든 과정은 약 10-15분 정도 소요됩니다.
      </p>
    </div>
    
    <div class="flex flex-wrap gap-2">
      <Badge>SvelteKit</Badge>
      <Badge variant="secondary">Tailwind CSS v4.1</Badge>
      <Badge variant="outline">shadcn-svelte</Badge>
      <Badge variant="outline">TypeScript</Badge>
    </div>
  </section>
  
  <!-- 시스템 요구사항 -->
  <section class="mb-12">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          📋 시스템 요구사항
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-medium mb-2">필수 요구사항</h4>
            <ul class="space-y-1 text-sm text-muted-foreground">
              <li>• Node.js 18.0 이상</li>
              <li>• npm 9.0 이상 또는 pnpm</li>
              <li>• 모던 브라우저 지원</li>
            </ul>
          </div>
          <div>
            <h4 class="font-medium mb-2">권장 환경</h4>
            <ul class="space-y-1 text-sm text-muted-foreground">
              <li>• VS Code + Svelte 확장</li>
              <li>• Prettier + ESLint</li>
              <li>• TypeScript 5.0 이상</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 설치 단계 -->
  <section class="mb-12">
    <div class="mb-8">
      <h2 class="text-3xl font-bold text-foreground mb-4">설치 단계</h2>
      <p class="text-muted-foreground">
        아래 단계를 순서대로 따라하면 완전한 디자인 시스템을 설치할 수 있습니다.
      </p>
    </div>
    
    <div class="space-y-8">
      {#each installSteps as step, index}
        <Card>
          <CardHeader>
            <CardTitle class="flex items-center justify-between">
              <span>{step.title}</span>
              <Badge variant="outline">{index + 1}/8</Badge>
            </CardTitle>
            <CardDescription>{step.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              {#if step.filename}
                <div class="text-sm font-medium text-muted-foreground">
                  📄 {step.filename}
                </div>
              {/if}
              
              <div class="relative">
                <pre class="bg-muted rounded-lg p-4 text-sm overflow-x-auto border"><code class="language-{step.language}">{step.code}</code></pre>
                <Button
                  variant="ghost"
                  size="sm"
                  class="absolute top-2 right-2"
                  onclick={() => copyCode(step.code, step.id)}
                >
                  {copiedCode === step.id ? '✓' : '📋'}
                </Button>
              </div>
              
              {#if copiedCode === step.id}
                <div class="text-sm text-green-600">✓ 코드가 클립보드에 복사되었습니다!</div>
              {/if}
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 검증 -->
  <section class="mb-12">
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          ✅ 설치 검증
        </CardTitle>
        <CardDescription>
          설치가 완료되었다면 다음 컴포넌트들이 정상적으로 작동해야 합니다.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium mb-3">테스트 컴포넌트</h4>
              <div class="space-y-2">
                <Button size="sm">Primary Button</Button>
                <div class="flex gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 class="font-medium mb-3">테마 전환 확인</h4>
              <Card class="bg-card p-4">
                <div class="text-sm font-medium text-card-foreground mb-1">테스트 카드</div>
                <div class="text-xs text-muted-foreground">
                  테마를 변경해보세요 (우상단 버튼)
                </div>
              </Card>
            </div>
          </div>
          
          <div class="pt-4 border-t">
            <div class="flex flex-col sm:flex-row gap-4">
              <Button href="/design-system/test/components" variant="outline">
                컴포넌트 테스트 페이지
              </Button>
              <Button href="/design-system/colors" variant="outline">
                색상 시스템 확인
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
  
  <!-- 문제 해결 -->
  <section class="mb-12">
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-foreground mb-4">문제 해결</h2>
      <p class="text-muted-foreground">
        설치 중 자주 발생하는 문제들과 해결 방법입니다.
      </p>
    </div>
    
    <div class="space-y-4">
      {#each troubleshooting as item}
        <Card>
          <CardHeader class="pb-3">
            <CardTitle class="text-lg text-destructive">❌ {item.issue}</CardTitle>
            <CardDescription class="text-green-600">💡 {item.solution}</CardDescription>
          </CardHeader>
          <CardContent>
            <div class="relative">
              <pre class="bg-muted rounded p-3 text-sm overflow-x-auto"><code>{item.code}</code></pre>
              <Button
                variant="ghost"
                size="sm"
                class="absolute top-1 right-1"
                onclick={() => copyCode(item.code, `troubleshooting-${item.issue}`)}
              >
                {copiedCode === `troubleshooting-${item.issue}` ? '✓' : '📋'}
              </Button>
            </div>
          </CardContent>
        </Card>
      {/each}
    </div>
  </section>
  
  <!-- 다음 단계 -->
  <section>
    <Card class="bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent class="pt-6">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-foreground mb-4">🎉 설치 완료!</h3>
          <p class="text-muted-foreground mb-6">
            이제 강력한 디자인 시스템을 사용할 준비가 되었습니다. 
            다음 단계로 넘어가서 더 많은 기능을 알아보세요.
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/design-system/colors" size="lg">
              색상 시스템 알아보기
            </Button>
            <Button href="/design-system/components/button" variant="outline" size="lg">
              첫 번째 컴포넌트 사용하기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </section>
</div>