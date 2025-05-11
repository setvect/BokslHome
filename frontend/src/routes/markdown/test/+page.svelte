<script lang="ts">
  import MarkdownEditor from '$lib/components/markdown/MarkdownEditor.svelte';

  let content = '# hello\n\n```sql\nSELECT * FROM users;\n```';
  let isDarkMode = false;
</script>

<div class="container">
  <h1>마크다운 에디터 테스트</h1>

  <div class="controls">
    <label>
      <input type="checkbox" bind:checked={isDarkMode} />
      다크 모드
    </label>
  </div>

  <MarkdownEditor bind:value={content} darkMode={isDarkMode} />
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .controls {
    margin-bottom: 1rem;
  }
</style>
