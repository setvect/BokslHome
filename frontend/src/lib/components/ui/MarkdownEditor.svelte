<script lang="ts">
  // MarkdownEditor 컴포넌트 - 코드 하이라이팅 지원
  import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
  import { javascript } from '@codemirror/lang-javascript';
  import { python } from '@codemirror/lang-python';
  import { java } from '@codemirror/lang-java';
  import { html } from '@codemirror/lang-html';
  import { css } from '@codemirror/lang-css';
  import { json } from '@codemirror/lang-json';
  import { EditorView } from '@codemirror/view';
  import { StreamLanguage } from '@codemirror/language';
  import { yaml } from '@codemirror/legacy-modes/mode/yaml';
  import { shell } from '@codemirror/legacy-modes/mode/shell';
  import { go } from '@codemirror/legacy-modes/mode/go';
  import { rust } from '@codemirror/legacy-modes/mode/rust';
  import { marked } from 'marked';
  import mermaid from 'mermaid';
  import { onMount } from 'svelte';
  import CodeMirror from 'svelte-codemirror-editor';
  
  // Prism.js 동적 import로 브라우저 환경에서만 로드
  let Prism: any = null;
  
  // Props 정의
  let { 
    value = $bindable('# Hello Markdown!\n\n여기에 마크다운을 작성하세요...'), 
    readOnly = false,
    height = '400px',
    showPreview = true,
    onChange,
    onImageUpload
  } = $props<{
    value?: string;
    readOnly?: boolean; 
    height?: string;
    showPreview?: boolean;
    onChange?: (value: string) => void;
    onImageUpload?: (file: File) => Promise<string>;
  }>();
  
  // 상태 변수
  let currentValue = $state(value);
  let previewVisible = $state(showPreview);
  let previewHtml = $state('');
  let isDarkMode = $state(false);
  let isFullscreen = $state(false);
  let editorView: any; // CodeMirror EditorView 인스턴스
  
  // 테마 감지 함수
  function detectTheme(): boolean {
    if (typeof window === 'undefined') return false;
    
    // HTML 클래스에서 다크 모드 감지
    const htmlHasDark = document.documentElement.classList.contains('dark');
    
    // localStorage에서 테마 설정 확인
    let storedTheme: string | null = null;
    try {
      storedTheme = localStorage.getItem('theme');
    } catch {}
    
    if (storedTheme === 'dark') return true;
    if (storedTheme === 'light') return false;
    
    // system 모드이거나 설정이 없으면 HTML 클래스 또는 시스템 선호도 사용
    return htmlHasDark || window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  // Mermaid 설정
  let mermaidInitialized = false;
  
  // Prism.js 초기화
  let prismInitialized = false;
  
  async function initPrism() {
    if (prismInitialized || typeof window === 'undefined') return;
    
    try {
      // Prism.js와 필요한 언어 컴포넌트들 동적 로드
      const prismModule = await import('prismjs');
      Prism = prismModule.default;
      
      // 의존성 순서를 고려한 언어 로딩 (일부 언어는 다른 언어에 의존함)
      const basicLanguages = [
        { name: 'json', loader: () => import('prismjs/components/prism-json' as any) },
        { name: 'yaml', loader: () => import('prismjs/components/prism-yaml' as any) },
        { name: 'bash', loader: () => import('prismjs/components/prism-bash' as any) },
        { name: 'sql', loader: () => import('prismjs/components/prism-sql' as any) }
      ];
      
      const advancedLanguages = [
        { name: 'typescript', loader: () => import('prismjs/components/prism-typescript' as any) },
        { name: 'python', loader: () => import('prismjs/components/prism-python' as any) },
        { name: 'java', loader: () => import('prismjs/components/prism-java' as any) },
        { name: 'go', loader: () => import('prismjs/components/prism-go' as any) },
        { name: 'rust', loader: () => import('prismjs/components/prism-rust' as any) }
      ];
      
      const allLanguageLoaders = [...basicLanguages, ...advancedLanguages];
      
      // 각 언어를 개별적으로 로드하여 오류 발생 시에도 다른 언어는 작동하도록 함
      for (const { name, loader } of allLanguageLoaders) {
        try {
          await loader();
          // 언어가 실제로 로드되었는지 확인
          if (Prism.languages[name]) {
            // 언어 로드 성공
          }
        } catch (error) {
          // 언어 로드 실패 (무시)
        }
      }
      
      prismInitialized = true;
    } catch (error) {
      console.error('Prism.js 초기화 오류:', error);
    }
  }
  
  function initMermaid() {
    try {
      // 항상 새로운 설정으로 초기화 (테마 변경 시)
      mermaid.initialize({
        startOnLoad: false,
        theme: isDarkMode ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true
        },
        sequence: {
          useMaxWidth: true,
          actorMargin: 50,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35
        }
      });
      
      mermaidInitialized = true;
    } catch (error) {
      console.error('Mermaid initialization error:', error);
    }
  }
  
  // Marked 커스텀 렌더러 설정
  const renderer = new marked.Renderer();
  
  // 코드 블록 커스텀 렌더러 (Mermaid + Prism.js 지원)
  renderer.code = function(token: any) {
    const { text, lang } = token || {};
    
    try {
      const codeText = text || '';
      const actualLanguage = lang || '';
      
      if (actualLanguage === 'mermaid') {
        const id = `mermaid-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
        // 원본 코드를 data-code 속성에 저장하고, div 내부는 비워둠
        const html = `<div class="mermaid-diagram mermaid-loading" data-id="${id}" data-code="${codeText.replace(/"/g, '&quot;')}"></div>`;
        return html;
      }
      
      // 일반 코드 블록 - Prism.js 클래스 추가
      const escapedCode = codeText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
      
      // Prism.js가 인식할 수 있도록 language- 클래스 추가
      const languageClass = actualLanguage ? `language-${actualLanguage}` : 'language-text';
      return `<pre class="code-block ${languageClass}"><code class="${languageClass}" data-lang="${actualLanguage}">${escapedCode}</code></pre>`;
      
    } catch (error) {
      console.error('Code renderer error:', error, { token });
      return `<pre><code style="color: red;">코드 렌더링 오류: ${error}</code></pre>`;
    }
  };
  
  // Marked 설정
  marked.setOptions({
    breaks: false,
    gfm: true,
    renderer: renderer
  });
  
  // 언어 맵 함수 생성 (CodeMirror가 요구하는 형식)
  const codeLanguages = (info: string) => {
    const lang = info.toLowerCase();
    
    switch (lang) {
      case 'javascript':
      case 'js':
        return javascript().language;
      case 'typescript':
      case 'ts':
        return javascript({ typescript: true }).language;
      case 'python':
      case 'py':
        return python().language;
      case 'java':
        return java().language;
      case 'html':
        return html().language;
      case 'css':
        return css().language;
      case 'json':
        return json().language;
      case 'yaml':
      case 'yml':
        return StreamLanguage.define(yaml);
      case 'bash':
      case 'sh':
      case 'shell':
        return StreamLanguage.define(shell);
      case 'go':
        return StreamLanguage.define(go);
      case 'rust':
        return StreamLanguage.define(rust);
      default:
        return null;
    }
  };

  // CodeMirror 확장 설정 (테마 반응형)
  const extensions = $derived([
    markdown({
      codeLanguages: codeLanguages
    }),
    EditorView.theme({
      '&': {
        fontSize: '14px',
        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
        backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff'
      },
      '.cm-content': {
        padding: '12px',
        minHeight: 'calc(100% - 24px)',
        backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
        color: isDarkMode ? '#fafafa' : '#09090b'
      },
      '.cm-focused': {
        outline: 'none'
      },
      '.cm-editor': {
        height: '100%',
        backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff'
      },
      '.cm-scroller': {
        fontFamily: 'inherit',
        overflow: 'auto',
        maxHeight: '100%'
      },
      '.cm-activeLine': {
        backgroundColor: isDarkMode ? '#1c1c1c' : '#f1f5f9'
      },
      '.cm-selectionBackground': {
        backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
        opacity: '0.3'
      },
      '&.cm-focused .cm-selectionBackground': {
        backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
        opacity: '0.3'
      },
      '.cm-selection': {
        backgroundColor: isDarkMode ? '#3b82f6' : '#2563eb',
        opacity: '0.3'
      },
      '.cm-gutters': {
        backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
        color: isDarkMode ? '#71717a' : '#71717a',
        border: 'none'
      },
      '.cm-lineNumbers .cm-gutterElement': {
        color: isDarkMode ? '#52525b' : '#a1a1aa'
      },
      // Markdown 구문 하이라이트 색상
      '.cm-header': {
        color: isDarkMode ? '#60a5fa' : '#2563eb',
        fontWeight: '600'
      },
      '.cm-strong': {
        color: isDarkMode ? '#fbbf24' : '#d97706',
        fontWeight: '600'
      },
      '.cm-emphasis': {
        color: isDarkMode ? '#a78bfa' : '#7c3aed',
        fontStyle: 'italic'
      },
      '.cm-monospace': {
        color: isDarkMode ? '#34d399' : '#059669',
        backgroundColor: isDarkMode ? '#1c1c1c' : '#f1f5f9',
        padding: '2px 4px',
        borderRadius: '3px'
      },
      '.cm-link': {
        color: isDarkMode ? '#60a5fa' : '#2563eb',
        textDecoration: 'underline'
      },
      '.cm-quote': {
        color: isDarkMode ? '#9ca3af' : '#6b7280',
        fontStyle: 'italic'
      }
    })
  ]);
  
  // Markdown → HTML 변환
  async function convertMarkdownToHtml(markdown: string): Promise<string> {
    try {
      const result = await marked.parse(markdown);
      return result;
    } catch (error) {
      console.error('Markdown parsing error:', error);
      // 에러 발생 시 원본 텍스트를 pre 태그로 감싸서 반환
      const escapedMarkdown = markdown
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return `<pre style="color: red; background: #fef2f2; padding: 12px; border-radius: 4px; border: 1px solid #fecaca;">
마크다운 파싱 오류: ${error}

원본 내용:
${escapedMarkdown}
</pre>`;
    }
  }
  
  // Prism.js 코드 하이라이팅 적용
  async function applySyntaxHighlighting() {
    if (typeof window === 'undefined') return;
    
    // Prism 초기화
    await initPrism();
    if (!prismInitialized || !Prism) {
      return;
    }
    
    // 코드 블록 찾기
    const codeBlocks = document.querySelectorAll('.preview-content pre code[data-lang]');
    
    for (const codeBlock of codeBlocks) {
      const htmlElement = codeBlock as HTMLElement;
      const lang = htmlElement.getAttribute('data-lang') || '';
      
      if (!lang) continue;
      
      try {
        // 언어별 매핑 (일부 언어는 다른 이름으로 등록됨)
        const languageMap: { [key: string]: string } = {
          'js': 'javascript',
          'ts': 'typescript',
          'py': 'python',
          'sh': 'bash',
          'shell': 'bash',
          'yml': 'yaml'
        };
        
        const actualLang = languageMap[lang] || lang;
        
        // 언어별 하이라이팅 적용
        if (Prism.languages[actualLang]) {
          const code = htmlElement.textContent || '';
          try {
            const highlightedCode = Prism.highlight(code, Prism.languages[actualLang], actualLang);
            htmlElement.innerHTML = highlightedCode;
            htmlElement.classList.add('syntax-highlighted');
          } catch (highlightError) {
            // 하이라이팅 실패 시 원본 코드 유지
          }
        }
      } catch (error) {
        console.error(`Syntax highlighting error for ${lang}:`, error);
        // 오류 발생 시 원본 코드 유지
      }
    }
  }
  
  // Mermaid 다이어그램 렌더링
  async function renderMermaidDiagrams() {
    if (typeof window === 'undefined') return;
    
    // Mermaid 초기화
    initMermaid();
    
    // 다양한 선택자로 mermaid 요소 찾기
    const selectors = [
      '.preview-content .mermaid-diagram',
      '.mermaid-diagram',
      '[data-id*="mermaid"]'
    ];
    
    let mermaidElements: NodeListOf<Element> | null = null;
    for (const selector of selectors) {
      mermaidElements = document.querySelectorAll(selector);
      if (mermaidElements.length > 0) break;
    }
    
    if (!mermaidElements || mermaidElements.length === 0) {
      return;
    }
    
    for (const element of mermaidElements) {
      const htmlElement = element as HTMLElement;
      // 원본 코드를 data-code 속성에서 가져옴
      const code = htmlElement.getAttribute('data-code') || htmlElement.textContent || '';
      const dataId = htmlElement.getAttribute('data-id') || `mermaid-${Date.now()}`;
      
      try {
        // 코드가 비어있지 않은지 확인
        if (!code.trim()) {
          continue;
        }
        
        // 기존 내용 제거 (SVG나 오류 메시지)
        htmlElement.innerHTML = '';
        
        // 로딩 상태로 설정
        htmlElement.classList.remove('mermaid-rendered', 'mermaid-error');
        htmlElement.classList.add('mermaid-loading');
        
        try {
          // HTML 엔티티 디코딩
          const decodedCode = code.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          
          // 새로운 ID로 렌더링 (테마 변경 시 충돌 방지)
          const renderId = `${dataId}-${Date.now()}`;
          
          // Mermaid 다이어그램 렌더링
          const { svg } = await mermaid.render(renderId, decodedCode.trim());
          htmlElement.innerHTML = svg;
          
          // 스타일 적용 및 로딩 클래스 제거
          htmlElement.classList.remove('mermaid-loading');
          htmlElement.classList.add('mermaid-rendered');
          
        } catch (renderError) {
          console.error('Mermaid diagram rendering failed:', renderError);
          // 렌더링 실패 시 원본 코드 표시
          const decodedCode = code.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
          const errorMessage = renderError instanceof Error ? renderError.message : String(renderError);
          htmlElement.innerHTML = `<pre style="color: #ef4444; background: rgba(239, 68, 68, 0.1); padding: 12px; border-radius: 4px; border: 1px solid #ef4444; font-family: monospace; white-space: pre-wrap;">\n❌ 다이어그램 렌더링 실패:\n${errorMessage}\n\n📝 원본 코드:\n${decodedCode.trim()}\n</pre>`;
          htmlElement.classList.remove('mermaid-loading');
          htmlElement.classList.add('mermaid-error');
        }
        
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        htmlElement.innerHTML = `<div class="mermaid-error">다이어그램 렌더링 오류: ${error}</div>`;
        htmlElement.classList.remove('mermaid-loading');
        htmlElement.classList.add('mermaid-error');
      }
    }
  }
  
  // 값 변경 핸들러
  function handleValueChange(newValue: string) {
    currentValue = newValue;
    value = newValue; // 양방향 바인딩
    onChange?.(newValue);
  }
  
  // value prop 변경 시 currentValue 동기화
  $effect(() => {
    if (currentValue !== value) {
      currentValue = value;
    }
  });
  
  // 실시간 미리보기 업데이트
  $effect(() => {
    convertMarkdownToHtml(currentValue).then(async (html) => {
      previewHtml = html;
      
      // DOM 업데이트를 위해 다음 틱에서 실행
      await new Promise(resolve => setTimeout(resolve, 0));
      
      // Prism.js 코드 하이라이팅 적용
      await applySyntaxHighlighting();
      
      // Mermaid 다이어그램이 포함된 경우에만 렌더링
      if (html.includes('mermaid-diagram')) {
        await renderMermaidDiagrams();
      }
    });
  });
  
  // 테마 변화 감지 및 업데이트
  onMount(() => {
    // 초기 테마 설정
    isDarkMode = detectTheme();
    
    // Prism.js 초기화
    initPrism();
    
    // HTML 클래스 변화 감지 (MutationObserver)
    const observer = new MutationObserver(() => {
      const newIsDarkMode = detectTheme();
      if (newIsDarkMode !== isDarkMode) {
        isDarkMode = newIsDarkMode;
        // 테마 변경 시 Mermaid 다시 초기화 및 렌더링
        mermaidInitialized = false;
        setTimeout(() => {
          initMermaid();
          renderMermaidDiagrams();
        }, 100);
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    // 시스템 테마 변화 감지
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      const newIsDarkMode = detectTheme();
      if (newIsDarkMode !== isDarkMode) {
        isDarkMode = newIsDarkMode;
        mermaidInitialized = false;
        setTimeout(() => {
          initMermaid();
          renderMermaidDiagrams();
        }, 100);
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // localStorage 변화 감지 (다른 탭에서 테마 변경)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const newIsDarkMode = detectTheme();
        if (newIsDarkMode !== isDarkMode) {
          isDarkMode = newIsDarkMode;
          mermaidInitialized = false;
          setTimeout(() => {
            initMermaid();
            renderMermaidDiagrams();
          }, 100);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // ESC 키 이벤트 리스너 추가
    window.addEventListener('keydown', handleKeydown);
    
    // 정리 함수
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('keydown', handleKeydown);
    };
  });
  
  // 미리보기 토글
  function togglePreview() {
    previewVisible = !previewVisible;
  }
  
  // 커서 위치에 텍스트 삽입 (CodeMirror API 사용)
  function insertAtCursorPosition(textToInsert: string) {
    if (editorView) {
      try {
        const state = editorView.state;
        const selection = state.selection.main;
        const cursorPos = selection.head;
        
        // CodeMirror API로 텍스트 삽입
        editorView.dispatch({
          changes: {
            from: cursorPos,
            to: cursorPos,
            insert: textToInsert
          },
          selection: {
            anchor: cursorPos + textToInsert.length,
            head: cursorPos + textToInsert.length
          }
        });
        
        return;
      } catch (error) {
        console.error('CodeMirror API 사용 실패:', error);
      }
    }
    
    // 폴백: 텍스트 끝에 추가
    const newValue = currentValue + textToInsert;
    handleValueChange(newValue);
  }
  
  // 전체화면 토글 (7단계)
  function toggleFullscreen() {
    isFullscreen = !isFullscreen;
  }
  
  // ESC 키 핸들러
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && isFullscreen) {
      isFullscreen = false;
    }
  }
  
  // 클립보드 이미지 처리 (6단계)
  async function mockImageUpload(file: File): Promise<string> {
    // 백엔드 모킹: 실제로는 서버에 업로드하고 URL 반환
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        // 가상의 업로드된 URL 생성 (실제로는 서버 응답)
        const fileName = file.name || 'image.png';
        const mockUrl = `https://example.com/uploads/${Date.now()}-${fileName}`;
        resolve(mockUrl);
      };
      reader.readAsDataURL(file);
    });
  }
  
  // 클립보드 paste 이벤트 핸들러
  async function handlePaste(event: ClipboardEvent) {
    if (readOnly) return;
    
    const items = event.clipboardData?.items;
    if (!items) return;
    
    for (const item of items) {
      if (item.type.startsWith('image/')) {
        event.preventDefault();
        
        const file = item.getAsFile();
        if (!file) continue;
        
        try {
          // 사용자 정의 업로드 함수가 있으면 사용, 없으면 기본 모킹 함수 사용
          const imageUrl = onImageUpload ? await onImageUpload(file) : await mockImageUpload(file);
          
          // 현재 커서 위치에 마크다운 이미지 문법 삽입
          const imageMarkdown = `![${file.name || 'image'}](${imageUrl})`;
          insertAtCursorPosition(imageMarkdown);
          
        } catch (error) {
          console.error('이미지 업로드 실패:', error);
          // TODO: 사용자에게 오류 메시지 표시
        }
        
        break; // 첫 번째 이미지만 처리
      }
    }
  }
</script>

<!-- 컴포넌트 구조 -->
<div 
  class="markdown-editor" 
  style="height: {isFullscreen ? '100vh' : height};" 
  onpaste={handlePaste} 
  class:fullscreen={isFullscreen}
>
  <!-- 툴바 -->
  <div class="markdown-toolbar">
    <button 
      class="toolbar-btn" 
      onclick={togglePreview}
      aria-label="미리보기 토글"
    >
      {previewVisible ? '📝 편집만' : '👁️ 미리보기'}
    </button>
    <button 
      class="toolbar-btn" 
      onclick={toggleFullscreen}
      aria-label="전체화면 토글"
    >
      {isFullscreen ? '🗗 창모드' : '🗖 전체화면'}
    </button>
    <span class="toolbar-title">Markdown Editor</span>
    <span class="toolbar-info">📋 이미지 붙여넣기 지원 | ESC: 전체화면 해제</span>
  </div>
  
  <!-- 메인 영역: 2단 레이아웃 -->
  <div class="markdown-content" class:preview-hidden={!previewVisible}>
    <!-- 에디터 패널 -->
    <div class="editor-panel">
      <div class="codemirror-container">
        <CodeMirror
          bind:value={currentValue}
          {extensions}
          readonly={readOnly}
          on:change={(e) => handleValueChange(e.detail)}
          on:ready={(e) => editorView = e.detail}
          class="markdown-codemirror"
        />
      </div>
    </div>
    
    <!-- 분할자 -->
    {#if previewVisible}
      <div class="editor-divider"></div>
    {/if}
    
    <!-- 미리보기 패널 -->
    {#if previewVisible}
      <div class="preview-panel">
        <div class="preview-content">
          {@html previewHtml}
        </div>
      </div>
    {/if}
  </div>
</div>


<style>
  .markdown-editor {
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--background);
    color: var(--foreground);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
  }
  
  /* 전체화면 모드 (7단계) */
  .markdown-editor.fullscreen {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 1000;
    border-radius: 0 !important;
    border: none !important;
    margin: 0 !important;
    padding: 0;
  }
  
  
  /* 툴바 */
  .markdown-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--border);
    background: var(--muted);
    min-height: 40px;
  }
  
  .toolbar-btn {
    padding: 4px 8px;
    border: 1px solid var(--border);
    border-radius: 4px;
    background: var(--background);
    color: var(--foreground);
    cursor: pointer;
    font-size: 14px;
  }
  
  .toolbar-btn:hover {
    background: var(--accent);
  }
  
  .toolbar-title {
    font-weight: 500;
    color: var(--muted-foreground);
  }
  
  .toolbar-info {
    font-size: 12px;
    color: var(--muted-foreground);
    margin-left: auto;
  }
  
  /* 메인 컨텐츠 영역 */
  .markdown-content {
    display: flex;
    flex: 1;
    overflow: hidden;
    min-height: 0; /* flex 자식의 최소 높이 문제 해결 */
  }
  
  .markdown-content.preview-hidden .editor-panel {
    flex: 1;
  }
  
  /* 에디터 패널 */
  .editor-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0; /* flex 자식의 최소 너비 문제 해결 */
    min-height: 0; /* flex 자식의 최소 높이 문제 해결 */
    overflow: hidden;
  }
  
  .codemirror-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    min-height: 0; /* flex 자식의 스크롤 문제 해결 */
  }
  
  :global(.markdown-codemirror) {
    height: 100%;
    flex: 1;
    min-height: 0;
    overflow: auto;
  }
  
  :global(.markdown-codemirror .cm-focused) {
    outline: 2px solid var(--ring);
    outline-offset: -2px;
  }
  
  /* 텍스트 선택 영역 강화 */
  :global(.markdown-codemirror .cm-selectionLayer .cm-selectionBackground) {
    background: #3b82f6 !important;
    opacity: 0.3 !important;
  }
  
  :global(.markdown-codemirror .cm-content ::selection) {
    background: #3b82f6 !important;
    opacity: 0.3 !important;
  }
  
  :global(.markdown-codemirror .cm-content ::-moz-selection) {
    background: #3b82f6 !important;
    opacity: 0.3 !important;
  }
  
  /* 다크모드에서 텍스트 선택 */
  :global(.dark .markdown-codemirror .cm-selectionLayer .cm-selectionBackground) {
    background: #60a5fa !important;
    opacity: 0.4 !important;
  }
  
  :global(.dark .markdown-codemirror .cm-content ::selection) {
    background: #60a5fa !important;
    opacity: 0.4 !important;
  }
  
  :global(.dark .markdown-codemirror .cm-content ::-moz-selection) {
    background: #60a5fa !important;
    opacity: 0.4 !important;
  }
  
  /* 분할자 */
  .editor-divider {
    width: 1px;
    background: var(--border);
    cursor: col-resize;
  }
  
  .editor-divider:hover {
    background: var(--ring);
  }
  
  /* 미리보기 패널 */
  .preview-panel {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  
  .preview-content {
    flex: 1;
    padding: 20px;
    background: var(--background);
    color: var(--foreground);
    overflow: auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
  }
  
  /* 미리보기 내 마크다운 스타일링 */
  :global(.preview-content h1) {
    font-size: 2rem;
    font-weight: 700;
    margin: 1.5rem 0 1rem 0;
    border-bottom: 1px solid var(--border);
    padding-bottom: 0.5rem;
    color: var(--foreground);
  }
  
  :global(.preview-content h2) {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 1.25rem 0 0.75rem 0;
    color: var(--foreground);
  }
  
  :global(.preview-content h3) {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1rem 0 0.5rem 0;
    color: var(--foreground);
  }
  
  :global(.preview-content p) {
    margin: 0.75rem 0;
    color: var(--foreground);
  }
  
  :global(.preview-content strong) {
    font-weight: 600;
    color: var(--foreground);
  }
  
  :global(.preview-content em) {
    font-style: italic;
    color: var(--muted-foreground);
  }
  
  :global(.preview-content code) {
    background: var(--muted);
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
    color: var(--foreground);
  }
  
  :global(.preview-content pre) {
    background: var(--muted);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1rem 0;
    border: 1px solid var(--border);
  }
  
  :global(.preview-content pre code) {
    background: none;
    padding: 0;
    font-size: 0.875rem;
  }
  
  /* Prism.js 코드 하이라이팅 스타일 */
  :global(.preview-content .code-block) {
    position: relative;
    background: var(--muted) !important;
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    overflow: auto;
    font-family: 'JetBrains Mono', 'Fira Code', monospace;
  }
  
  /* 토큰별 스타일링 - 라이트 모드 */
  :global(.preview-content .token.comment),
  :global(.preview-content .token.prolog),
  :global(.preview-content .token.doctype),
  :global(.preview-content .token.cdata) {
    color: #6a737d;
    font-style: italic;
  }
  
  :global(.preview-content .token.punctuation) {
    color: #586069;
  }
  
  :global(.preview-content .token.property),
  :global(.preview-content .token.tag),
  :global(.preview-content .token.boolean),
  :global(.preview-content .token.number),
  :global(.preview-content .token.constant),
  :global(.preview-content .token.symbol),
  :global(.preview-content .token.deleted) {
    color: #d73a49;
  }
  
  :global(.preview-content .token.selector),
  :global(.preview-content .token.attr-name),
  :global(.preview-content .token.string),
  :global(.preview-content .token.char),
  :global(.preview-content .token.builtin),
  :global(.preview-content .token.inserted) {
    color: #032f62;
  }
  
  :global(.preview-content .token.operator),
  :global(.preview-content .token.entity),
  :global(.preview-content .token.url),
  :global(.preview-content .language-css .token.string),
  :global(.preview-content .style .token.string) {
    color: #d73a49;
  }
  
  :global(.preview-content .token.atrule),
  :global(.preview-content .token.attr-value),
  :global(.preview-content .token.keyword) {
    color: #d73a49;
  }
  
  :global(.preview-content .token.function),
  :global(.preview-content .token.class-name) {
    color: #6f42c1;
  }
  
  :global(.preview-content .token.regex),
  :global(.preview-content .token.important),
  :global(.preview-content .token.variable) {
    color: #e36209;
  }
  
  /* 다크 모드에서의 토큰 스타일링 */
  :global(.dark .preview-content .token.comment),
  :global(.dark .preview-content .token.prolog),
  :global(.dark .preview-content .token.doctype),
  :global(.dark .preview-content .token.cdata) {
    color: #8b949e;
    font-style: italic;
  }
  
  :global(.dark .preview-content .token.punctuation) {
    color: #c9d1d9;
  }
  
  :global(.dark .preview-content .token.property),
  :global(.dark .preview-content .token.tag),
  :global(.dark .preview-content .token.boolean),
  :global(.dark .preview-content .token.number),
  :global(.dark .preview-content .token.constant),
  :global(.dark .preview-content .token.symbol),
  :global(.dark .preview-content .token.deleted) {
    color: #f85149;
  }
  
  :global(.dark .preview-content .token.selector),
  :global(.dark .preview-content .token.attr-name),
  :global(.dark .preview-content .token.string),
  :global(.dark .preview-content .token.char),
  :global(.dark .preview-content .token.builtin),
  :global(.dark .preview-content .token.inserted) {
    color: #a5d6ff;
  }
  
  :global(.dark .preview-content .token.operator),
  :global(.dark .preview-content .token.entity),
  :global(.dark .preview-content .token.url),
  :global(.dark .preview-content .language-css .token.string),
  :global(.dark .preview-content .style .token.string) {
    color: #f85149;
  }
  
  :global(.dark .preview-content .token.atrule),
  :global(.dark .preview-content .token.attr-value),
  :global(.dark .preview-content .token.keyword) {
    color: #f85149;
  }
  
  :global(.dark .preview-content .token.function),
  :global(.dark .preview-content .token.class-name) {
    color: #d2a8ff;
  }
  
  :global(.dark .preview-content .token.regex),
  :global(.dark .preview-content .token.important),
  :global(.dark .preview-content .token.variable) {
    color: #ffa657;
  }
  
  :global(.preview-content ul, .preview-content ol) {
    margin: 0.75rem 0;
    padding-left: 1.5rem;
  }
  
  :global(.preview-content li) {
    margin: 0.25rem 0;
    color: var(--foreground);
  }
  
  :global(.preview-content blockquote) {
    border-left: 4px solid var(--primary);
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    color: var(--muted-foreground);
    background: var(--muted);
    padding: 1rem;
    border-radius: 0.25rem;
  }
  
  :global(.preview-content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    border: 1px solid var(--border);
  }
  
  :global(.preview-content th, .preview-content td) {
    border: 1px solid var(--border);
    padding: 0.5rem;
    text-align: left;
  }
  
  :global(.preview-content th) {
    background: var(--muted);
    font-weight: 600;
  }
  
  /* Mermaid 다이어그램 스타일 */
  :global(.preview-content .mermaid-diagram) {
    margin: 1rem 0;
    text-align: center;
    background: var(--background);
    border: 1px solid var(--border);
    border-radius: 0.5rem;
    padding: 1rem;
    overflow-x: auto;
  }
  
  /* 로딩 중인 Mermaid 다이어그램 숨김 */
  :global(.preview-content .mermaid-diagram.mermaid-loading) {
    opacity: 0;
    height: 0;
    padding: 0;
    margin: 0;
    overflow: hidden;
    transition: all 0.2s ease;
  }
  
  :global(.preview-content .mermaid-diagram.mermaid-rendered) {
    opacity: 1;
    border: none;
    padding: 0.5rem;
    transition: opacity 0.2s ease;
  }
  
  :global(.preview-content .mermaid-diagram svg) {
    max-width: 100%;
    height: auto;
  }
  
  :global(.preview-content .mermaid-error) {
    color: #ef4444;
    background: color-mix(in srgb, #ef4444 10%, transparent);
    padding: 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ef4444;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.875rem;
  }
  
  /* 반응형 */
  @media (max-width: 768px) {
    .markdown-content {
      flex-direction: column;
    }
    
    .editor-divider {
      width: 100%;
      height: 1px;
      cursor: row-resize;
    }
  }
</style>