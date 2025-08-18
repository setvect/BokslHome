<script lang="ts">
  import CodeMirror from 'svelte-codemirror-editor';
  import { oneDark } from '@codemirror/theme-one-dark';
  import { markdown } from '@codemirror/lang-markdown';
  import { getCurrentTheme, onThemeChange } from '$lib/utils/theme-detector';
  import { renderMarkdown } from '$lib/utils/markdown-renderer';
  import type { Extension } from '@codemirror/state';

  // 컴포넌트 Props (Svelte 5 Runes)
  let {
    value = $bindable(''),
    onChange,
    preview = true,
    class: className,
    placeholder,
    lineWrapping = true
  } = $props<{
    value?: string;
    onChange?: (value: string) => void;
    preview?: boolean;
    class?: string;
    placeholder?: string;
    lineWrapping?: boolean;
  }>();

  // 내부 상태
  let showPreview = $state<boolean>(preview);
  let theme = $state<'light' | 'dark'>(getCurrentTheme());
  let html = $state<string>('');

  // 테마 변경 감지
  let stopWatch: (() => void) | null = null;
  $effect(() => {
    stopWatch?.();
    stopWatch = onThemeChange((t) => (theme = t));
    return () => stopWatch?.();
  });

  // 미리보기 HTML 렌더
  $effect(() => {
    renderMarkdown(value, theme).then((h) => {
      html = h;
    });
  });

  // CodeMirror 설정
  const lang = markdown();
  function handleChange(e: CustomEvent<string>) {
    value = e.detail;
    onChange?.(value);
  }

  // 이미지 붙여넣기 & 드래그 앤 드롭 (간단 버전: Data URL 삽입)
  async function handlePaste(e: ClipboardEvent) {
    const items = e.clipboardData?.items || [];
    for (const it of items as unknown as DataTransferItemList) {
      if (it.kind === 'file') {
        const file = it.getAsFile();
        if (file) {
          const url = await fileToDataUrl(file);
          value += `\n![image](${url})\n`;
        }
      }
    }
  }
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (!files) return;
    Array.from(files).forEach(async (f) => {
      const url = await fileToDataUrl(f);
      value += `\n![image](${url})\n`;
    });
  }
  function fileToDataUrl(file: File): Promise<string> {
    return new Promise((res) => {
      const r = new FileReader();
      r.onload = () => res(String(r.result));
      r.readAsDataURL(file);
    });
  }
</script>

<div class={className ?? ''}>
  <div class="flex flex-col gap-2 md:flex-row">
    <div
      class="flex-1 min-w-0"
      role="region"
      aria-label="에디터 드롭 영역"
      onpaste={handlePaste}
      ondrop={handleDrop}
      ondragover={(e) => e.preventDefault()}
    >
      {#if typeof document !== 'undefined'}
        <CodeMirror
          {value}
          on:change={handleChange}
          {lang}
          theme={theme === 'dark' ? oneDark : undefined}
          extensions={theme === 'dark' ? [lang, oneDark] : [lang]}
          {placeholder}
          {lineWrapping}
          tabSize={2}
        />
      {/if}
    </div>
    {#if showPreview}
      <div class="flex-1 min-w-0 md:pl-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:ml-4 border-border">
        <div class="prose dark:prose-invert max-w-none text-sm">{@html html}</div>
      </div>
    {/if}
  </div>
  <div class="mt-2 flex items-center gap-2">
    <button type="button" class="text-xs underline" onclick={() => (showPreview = !showPreview)}>
      {showPreview ? '미리보기 숨기기' : '미리보기 보이기'}
    </button>
    <button
      type="button"
      class="text-xs underline"
      onclick={(e) => {
        const el = (e.currentTarget as HTMLElement | undefined)?.closest('div');
        if (!el) return;
        el.classList.toggle('fixed');
        el.classList.toggle('inset-0');
        el.classList.toggle('z-50');
        el.classList.toggle('bg-background');
      }}>전체화면 토글</button
    >
  </div>
</div>
