<script lang="ts">
  interface Props {
    children: any;
  }

  let { children }: Props = $props();
</script>

<!-- 메인 콘텐츠 영역 -->
<main class="flex-1 lg:ml-64 ml-0 pt-16">
  <div class="min-h-[calc(100vh-4rem)] bg-background">
    <!-- 콘텐츠 컨테이너 -->
    <div class="p-6">
      {@render children()}
    </div>
  </div>
</main>