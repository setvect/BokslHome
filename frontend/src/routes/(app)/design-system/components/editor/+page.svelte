<script lang="ts">
  import HtmlEditor from '$lib/components/ui/HtmlEditor.svelte';
  let html = '<p>안녕하세요, HtmlEditor 테스트입니다.</p>';
  function handleChange(v: string) { html = v; }
  </script>

<section class="p-4 space-y-4">
  <h1 class="text-2xl font-bold">HtmlEditor — 기본 동작 확인</h1>
  <p class="text-sm opacity-70">스타일 없이 기능만 동작하는 최소 버전</p>

  <div class="demo border rounded p-2">
    <HtmlEditor value={html} onChange={handleChange} />
  </div>

  <div class="mt-4 text-xs opacity-70">
    현재 HTML 미리보기:
    <pre class="mt-2 p-2 rounded bg-muted overflow-auto">{html}</pre>
  </div>
</section>



