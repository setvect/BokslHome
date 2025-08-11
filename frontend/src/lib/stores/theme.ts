import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark' | 'system';

function createThemeStore() {
    const { subscribe, set, update } = writable<Theme>('dark');

    return {
        subscribe,
        setTheme: (theme: Theme) => {
            if (browser) {
                localStorage.setItem('theme', theme);
                applyTheme(theme);
            }
            set(theme);
        },
        init: () => {
            if (browser) {
                const stored = localStorage.getItem('theme') as Theme;
                const theme = stored || 'dark';
                applyTheme(theme);
                set(theme);
            }
        }
    };
}

function applyTheme(theme: Theme) {
    if (!browser) return;

    const root = document.documentElement;
    
    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.toggle('dark', systemTheme === 'dark');
    } else {
        root.classList.toggle('dark', theme === 'dark');
    }
}

export const theme = createThemeStore();