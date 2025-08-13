<script lang="ts">
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte';
  
  let editorValue = `# Hello Markdown!

여기에 마크다운을 작성해보세요.

## 샘플 내용

**볼드 텍스트**와 *이탤릭 텍스트*

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목`;
</script>

<div class="container">
  <h1>Markdown Editor</h1>
  
  <MarkdownEditor 
    bind:value={editorValue}
    height="600px"
  />
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 24px;
    color: var(--foreground);
  }
</style>