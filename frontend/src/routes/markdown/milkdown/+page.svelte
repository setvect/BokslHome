<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  
  import '@milkdown/crepe/theme/common/style.css';
  import '@milkdown/crepe/theme/frame.css';

  let editorElement: HTMLElement;
  let crepe: any; // Crepe 인스턴스를 저장할 변수

  onMount(async () => {
    if (browser) {
      const { Crepe } = await import('@milkdown/crepe');
      
      crepe = new Crepe({
        root: editorElement,
        defaultValue: "Hello, Milkdown!"
      });

      await crepe.create();
    }
  });

  // 컴포넌트가 파괴될 때 에디터도 정리
  onDestroy(() => {
    if (crepe) {
      crepe.destroy();
    }
  });
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Milkdown 에디터 테스트</h1>
  
  <div class="border rounded-lg p-4 min-h-[600px]">
    <div class="milkdown h-full" bind:this={editorElement}></div>
  </div>
</div>