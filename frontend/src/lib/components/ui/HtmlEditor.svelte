<script lang="ts">
  // 기본 HtmlEditor 컴포넌트: TinyMCE 기반 최소 동작 버전
  // - CSS/스킨 없이 기능만 동작하도록 구성
  import { onMount, onDestroy } from 'svelte';
  // SSR 안전: TinyMCE 로딩을 onMount에서 동적 import로 처리

  // Runes 모드: $props() 사용
  let { value = '<p>여기에 내용을 입력하세요...</p>', readOnly = false, onChange } = $props<{
    value?: string;
    readOnly?: boolean;
    // 내용 변경 콜백(HTML)
    onChange?: (html: string) => void;
  }>();

  let mountEl: HTMLElement;
  let editor: import('tinymce').Editor | undefined;
  let isDark = $state(false);

  // 디버깅 로그 제거

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

    // 테마 상태 계산 및 리스너 설정
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const computeIsDark = () => {
      const htmlDark = document.documentElement.classList.contains('dark');
      let stored: 'light' | 'dark' | 'system' | null = null;
      try { stored = (localStorage.getItem('theme') as any) || null; } catch {}
      if (stored === 'dark') return true;
      if (stored === 'light') return false;
      // stored === 'system' 또는 없음 → 시스템 선호 사용, 단 htmlDark가 명시되면 우선
      return htmlDark || prefersDark.matches;
    };
    isDark = computeIsDark();

    const reinit = async () => {
      const currentHtml = editor?.getContent?.() ?? value;
      if (editor) {
        await editor.remove();
        editor = undefined;
      }
      const created = await tinymce.init({
        target: mountEl,
        menubar: false,
        branding: false,
      license_key: 'gpl',
        plugins: 'lists link image table code',
        toolbar: 'undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image table | code',
        inline: false,
        skin: isDark ? 'oxide-dark' : 'oxide',
        content_css: isDark ? 'dark' : 'default',
        content_style: isDark ? 'body{color:#ccc !important;}' : '',
        base_url: '/tinymce',
        readonly: readOnly,
        height: 360,
        init_instance_callback: (ed: import('tinymce').Editor) => {
          ed.setContent(currentHtml);
          ed.on('Change KeyUp SetContent Undo Redo Input', () => {
            onChange?.(ed.getContent());
          });
        }
      });
      editor = (Array.isArray(created) ? created[0] : created) as import('tinymce').Editor;
    };

    await reinit();

    const mo = new MutationObserver(async () => {
      const next = computeIsDark();
      if (next !== isDark) {
        isDark = next;
        await reinit();
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    prefersDark.addEventListener('change', async () => {
      const next = computeIsDark();
      if (next !== isDark) {
        isDark = next;
        await reinit();
      }
    });

    // storage 이벤트(다른 탭/윈도우에서 테마 변경) 대응
    window.addEventListener('storage', async (e) => {
      if (e.key === 'theme') {
        const next = computeIsDark();
        if (next !== isDark) {
          isDark = next;
          await reinit();
        }
      }
    });
  });

  // 읽기 전용 모드 토글
  $effect(() => {
    editor?.mode.set(readOnly ? 'readonly' : 'design');
  });

  onDestroy(() => {
    editor?.remove();
  });

  // 외부에서 소스 보기 다이얼로그를 열 수 있도록 메서드 노출
  export function openSource(): void {
    editor?.execCommand('mceCodeEditor');
  }

  // 외부에서 내용 제어를 위한 메서드 노출
  export function getHTML(): string {
    return editor?.getContent() ?? '';
  }

  export function setHTML(html: string): void {
    editor?.setContent(html);
  }

  // 외부 value가 바뀌면 에디터에 반영 (읽기 전용이 아닐 때)
  $effect(() => {
    if (editor && typeof value === 'string') {
      const current = editor.getContent();
      if (current !== value) {
        editor.setContent(value);
      }
    }
  });
</script>

<div class="html-editor" bind:this={mountEl}></div>

<style>
  /* 디자인 시스템 테마 변수를 상속 받아 가독성 확보 */
  .html-editor {
    color: var(--foreground);
    background: transparent;
  }
  /* TinyMCE 포커스 시 외곽선 오버레이 투명도 조절 */
  :global(.tox.tox-edit-focus .tox-edit-area::before) {
    opacity: 0.3 !important;
  }
  /* 다크 모드에서 TinyMCE 툴바 아이콘 컬러 다운톤 */
  :global(.dark .tox .tox-tbtn svg) {
    fill: #ccc !important;
  }
  /* TinyMCE는 자체 스킨을 사용하므로 최소 래퍼 스타일만 유지 */
</style>


