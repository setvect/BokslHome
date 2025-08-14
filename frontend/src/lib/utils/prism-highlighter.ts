// Prism.js 코드 하이라이팅 유틸리티

let Prism: any = null;
let prismInitialized = false;

// Prism.js 초기화
export async function initPrism() {
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

// Prism.js 코드 하이라이팅 적용
export async function applySyntaxHighlighting() {
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
        js: 'javascript',
        ts: 'typescript',
        py: 'python',
        sh: 'bash',
        shell: 'bash',
        yml: 'yaml'
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
