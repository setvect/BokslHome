<script lang="ts">
  // TinyMCE 동적 import 기반 HTML 에디터
  // - SSR 안전
  // - 기본 플러그인: code, table, link, lists, image

  let {
    value = $bindable(''),
    onChange,
    height = 360,
    menubar = false,
    toolbar = 'undo redo | bold italic underline | bullist numlist | link table image | code',
    class: className
  } = $props<{
    value?: string;
    onChange?: (v: string) => void;
    height?: number;
    menubar?: boolean;
    toolbar?: string;
    class?: string;
  }>();

  import type { ThemeType } from '$lib/utils/theme';
  import { ThemeUtils, getCurrentTheme, onThemeChange } from '$lib/utils/theme';
  
  let elementId = $state(`tinymce-${Date.now()}-${Math.random().toString(36).slice(2)}`);
  let editorInstance: any = null;
  let tinymceRef: any = null;
  let theme = $state<ThemeType>(getCurrentTheme());

  async function initTiny() {
    if (typeof window === 'undefined') return;
    const tinymce = (await import('tinymce/tinymce')).default;
    tinymceRef = tinymce;
    // 필수 에셋 로드
    await import('tinymce/icons/default');
    await import('tinymce/themes/silver');
    await import('tinymce/models/dom');
    // 스킨/콘텐츠 CSS 직접 import (Vite 번들에 포함)
    if (ThemeUtils.isDark(theme)) {
      await import('tinymce/skins/ui/oxide-dark/skin.min.css');
    } else {
      await import('tinymce/skins/ui/oxide/skin.min.css');
    }
    // 플러그인
    await import('tinymce/plugins/link');
    await import('tinymce/plugins/lists');
    await import('tinymce/plugins/table');
    await import('tinymce/plugins/code');
    await import('tinymce/plugins/image');

    const cs = buildContentStyle();
    editorInstance = await tinymce.init({
      selector: `#${elementId}`,
      skin: false,
      content_css: false,
      license_key: 'gpl',
      content_style: cs,
      menubar,
      toolbar,
      height,
      plugins: 'link lists table code image',
      branding: false,
      convert_urls: false,
      setup: (ed: any) => {
        ed.on('init', () => {
          ed.setContent(value || '');
        });
        ed.on('change input undo redo', () => {
          value = ed.getContent();
          onChange?.(value);
        });
      }
    });
  }

  $effect(() => {
    initTiny();
    const stop = onThemeChange((t) => {
      theme = t;
      destroyEditor();
      // 테마 변경 시 재초기화
      initTiny();
    });
    return () => {
      if (typeof window !== 'undefined') {
        destroyEditor();
      }
      stop?.();
    };
  });

  function buildContentStyle(): string {
    if (typeof window === 'undefined') return '';
    const root = getComputedStyle(document.documentElement);
    const bg = root.getPropertyValue('--color-background').trim() || '#0b1220';
    const fg = root.getPropertyValue('--color-foreground').trim() || '#e5e7eb';
    const border = root.getPropertyValue('--color-border').trim() || '#2a3244';
    const link = root.getPropertyValue('--color-primary').trim() || '#60a5fa';
    const muted = root.getPropertyValue('--color-muted').trim() || '#111827';
    const mutedFg = root.getPropertyValue('--color-muted-foreground').trim() || '#9ca3af';
    return `
      :root{color-scheme:${theme};}
      body{background:${bg};color:${fg};font-family:inherit;}
      a{color:${link};}
      table,td,th{border-color:${border};}
      pre,code{background:${muted};color:${mutedFg};}
      .mce-content-body{padding:8px;}
    `;
  }

  function destroyEditor() {
    try {
      if (editorInstance && typeof editorInstance.remove === 'function') {
        editorInstance.remove();
        editorInstance = null;
        return;
      }
      const ed = tinymceRef?.get?.(elementId) ?? (window as any)?.tinymce?.get?.(elementId);
      ed?.remove?.();
    } catch {
      // ignore
    } finally {
      editorInstance = null;
    }
  }
</script>

<div class={className ?? ''}>
  <textarea id={elementId} aria-label="HTML editor" class="w-full border rounded hidden"></textarea>
</div>
