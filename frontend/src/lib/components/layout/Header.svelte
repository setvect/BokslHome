<script lang="ts">
  let props = $props<{ title?: string; actions?: unknown }>();
  // actions: 이름 있는 슬롯 대체 렌더 함수
</script>

<header class="h-14 flex items-center px-4 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/30">
  <h1 class="text-lg font-semibold">{props.title ?? 'BokslHome'}</h1>
  <div class="ml-auto flex items-center gap-2">
    {@render (props as any).actions?.()}
  </div>
</header>
