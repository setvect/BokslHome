// 테마 감지 유틸: 라이트/다크 모드 문자열 반환
export function getCurrentTheme(): 'light' | 'dark' {
    if (typeof document === 'undefined') return 'light';
    const cls = document.documentElement.classList;
    return cls.contains('dark') ? 'dark' : 'light';
}

export function onThemeChange(callback: (theme: 'light' | 'dark') => void): () => void {
    // 간단한 MutationObserver로 html class 변경 감지
    if (typeof document === 'undefined') return () => { };
    const target = document.documentElement;
    const observer = new MutationObserver(() => callback(getCurrentTheme()));
    observer.observe(target, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
}


