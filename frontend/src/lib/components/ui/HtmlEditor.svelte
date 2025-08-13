<script lang="ts">
  // 기본 HtmlEditor 컴포넌트: TinyMCE 기반 최소 동작 버전
  // - CSS/스킨 없이 기능만 동작하도록 구성
  import { onMount, onDestroy } from 'svelte';
  // SSR 안전: TinyMCE 로딩을 onMount에서 동적 import로 처리

  // Runes 모드: $props() 사용
  let { value = '<p>여기에 내용을 입력하세요...</p>', readOnly = false } = $props<{
    value?: string;
    readOnly?: boolean;
  }>();

  let mountEl: HTMLElement;
  let editor: import('tinymce').Editor | undefined;

  onMount(async () => {
    // 1) TinyMCE 본체를 먼저 로드하고 전역에 노출
    const tinymceMod = await import('tinymce/tinymce');
    const tinymce = tinymceMod.default as any;
    (globalThis as any).tinymce = tinymce;

    // 2) 그 다음 플러그인/테마/아이콘 로드 (본체가 전역에 존재해야 함)
    await Promise.all([
      import('tinymce/icons/default'),
      import('tinymce/themes/silver'),
      import('tinymce/models/dom'),
      import('tinymce/plugins/code'),
      import('tinymce/plugins/table'),
      import('tinymce/plugins/link'),
      import('tinymce/plugins/lists'),
      import('tinymce/plugins/image')
    ]);

      const created = await tinymce.init({
        target: mountEl,
        menubar: false,
        plugins: 'code table link lists image',
        // 최소 단계에서는 툴바를 숨기고 인라인 편집으로 전환해 즉시 입력 가능하게 함
        inline: true,
        toolbar: false,
        readonly: readOnly,
        // OSS 라이선스 동의
        license_key: 'gpl',
        // 정적 에셋 경로 지정(스킨/콘텐츠 CSS 404 방지)
        base_url: '/tinymce',
        // 콘텐츠 스타일을 현재 디자인 시스템 변수에 맞춤
        content_css: false,
        content_style: `
          :root { color-scheme: dark light; }
          html, body { margin: 0; padding: 0; background: transparent; color: var(--foreground); font: inherit; }
          body { caret-color: var(--foreground); }
          a { color: var(--primary); }
          p { margin: 0 0 .5rem 0; }
          table { width: 100%; border-collapse: collapse; }
          td, th { border: 1px solid var(--border); padding: 4px 6px; }
        `,
        init_instance_callback: (ed: import('tinymce').Editor) => ed.setContent(value)
      });
    // init은 배열을 반환할 수 있으므로 첫 번째 인스턴스를 사용
    editor = (Array.isArray(created) ? created[0] : created) as import('tinymce').Editor;
  });

  // 읽기 전용 모드 토글
  $effect(() => {
    editor?.mode.set(readOnly ? 'readonly' : 'design');
  });

  onDestroy(() => {
    editor?.remove();
  });
</script>

<div class="html-editor" bind:this={mountEl}></div>

<style>
  /* 2단계에서는 스타일을 추가하지 않음 */
</style>


