import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  ssr: {
    noExternal: ['bits-ui', 'vaul-svelte', 'mode-watcher', 'svelte-sonner', 'tailwind-variants']
  }
});
