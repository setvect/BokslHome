<script lang="ts">
  // 코드 블록 + 복사 버튼 컴포넌트
  let props = $props<{ code: string; language?: string }>();
  let copied = $state(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(props.code);
      copied = true;
      setTimeout(() => (copied = false), 1200);
    } catch (e) {
      // 실패 시에도 짧게 피드백
      copied = true;
      setTimeout(() => (copied = false), 800);
    }
  }
</script>

<div class="relative border rounded-md bg-card">
  <button
    type="button"
    class="absolute right-2 top-2 z-10 px-2 py-1 text-xs rounded border bg-background hover:bg-accent hover:text-accent-foreground"
    aria-label="코드 복사"
    onclick={handleCopy}
  >
    {copied ? 'Copied' : 'Copy'}
  </button>
  <pre class="overflow-auto p-4 text-xs leading-relaxed">
<code>{props.code}</code>
  </pre>
</div>
