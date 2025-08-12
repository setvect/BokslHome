<script lang="ts">
  import { Card, CardContent } from '$lib/components/ui/card';
  import { Badge } from '$lib/components/ui/badge';
  
  export let props: Array<{
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
    required?: boolean;
  }>;
  
  export let title: string = '속성 (Props)';
  export let description: string = '컴포넌트에서 사용할 수 있는 모든 속성들입니다.';
</script>

<section class="mb-16">
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-foreground mb-4">{title}</h2>
    <p class="text-muted-foreground">{description}</p>
  </div>
  
  <Card>
    <CardContent class="pt-6">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="text-left py-3 font-medium text-foreground">속성</th>
              <th class="text-left py-3 font-medium text-foreground">타입</th>
              <th class="text-left py-3 font-medium text-foreground">기본값</th>
              <th class="text-left py-3 font-medium text-foreground">설명</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            {#each props as prop}
              <tr class="border-b hover:bg-muted/30 transition-colors">
                <td class="py-3">
                  <div class="flex items-center gap-2">
                    <code class="bg-muted px-2 py-1 rounded text-foreground font-mono text-xs">
                      {prop.name}
                    </code>
                    {#if prop.required}
                      <Badge variant="destructive" class="text-xs">필수</Badge>
                    {/if}
                  </div>
                </td>
                <td class="py-3">
                  <code class="text-muted-foreground font-mono text-xs break-words">
                    {prop.type}
                  </code>
                </td>
                <td class="py-3">
                  {#if prop.defaultValue}
                    <code class="bg-muted px-2 py-1 rounded text-foreground font-mono text-xs">
                      {prop.defaultValue}
                    </code>
                  {:else}
                    <span class="text-muted-foreground text-xs">-</span>
                  {/if}
                </td>
                <td class="py-3 text-foreground">
                  {prop.description}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </CardContent>
  </Card>
</section>

<style>
  /* 작은 화면에서의 테이블 반응형 처리 */
  @media (max-width: 640px) {
    table {
      font-size: 0.75rem;
    }
    
    td, th {
      padding: 0.5rem 0.25rem;
    }
    
    code {
      font-size: 0.625rem;
    }
  }
</style>