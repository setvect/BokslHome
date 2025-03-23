<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';
  import { Editor, rootCtx } from '@milkdown/core';
  import { commonmark } from '@milkdown/preset-commonmark';
  import { nord } from '@milkdown/theme-nord';

  const dispatch = createEventDispatcher();
  let editorContainer: HTMLDivElement;
  let editor: Editor | null = null;

  onMount(async () => {
    editor = await Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, editorContainer);
      })
      .use(nord)
      .use(commonmark)
      .create();

    // 필요 시 Milkdown 에디터 업데이트 시점을 커스텀 이벤트로 상위 컴포넌트에 전달할 수 있습니다.
    // 예시: editor.actionSomeCallback((value) => dispatch('change', value));

    return () => editor?.destroy();
  });
</script>

<div bind:this={editorContainer} class="milkdown-editor"></div>

<style>
  .milkdown-editor {
    min-height: 300px;
    border: 1px solid #ccc;
    padding: 1rem;
  }
</style>
