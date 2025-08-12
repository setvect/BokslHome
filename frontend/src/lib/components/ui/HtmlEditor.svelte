<script lang="ts">
  // 기본 HtmlEditor 컴포넌트: 기능만 동작하는 최소 버전
  // - TipTap v2 + svelte-tiptap 기반
  // - StarterKit만 포함, 스타일 없음
  import { onMount, onDestroy } from 'svelte';
  import type { Readable } from 'svelte/store';
  import StarterKit from '@tiptap/starter-kit';
  import { createEditor, Editor, EditorContent } from 'svelte-tiptap';

  // Runes 모드: $props() 사용
  let { value = '<p>여기에 내용을 입력하세요...</p>', readOnly = false } = $props<{
    value?: string;
    readOnly?: boolean;
  }>();

  // svelte-tiptap은 store 형태의 editor를 사용
  let editor = $state() as Readable<Editor>;

  onMount(() => {
    editor = createEditor({
      extensions: [StarterKit],
      content: value,
      editable: !readOnly
    });
  });

  // readOnly가 바뀌면 editable 업데이트
  $effect(() => {
    if ($editor) {
      $editor.setEditable(!readOnly);
    }
  });

  onDestroy(() => {
    $editor?.destroy();
  });
</script>

<div class="html-editor">
  <!-- 최소 동작 확인용: StarterKit만 구성 -->
  <EditorContent editor={$editor} />
</div>

<style>
  /* 2단계에서는 스타일을 추가하지 않음 */
</style>


