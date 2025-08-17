/* eslint 설정: 접근성은 warn, Svelte 5 룰 유지 */
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:svelte/recommended',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module'
    },
    overrides: [
        {
            files: ['**/*.svelte'],
            parser: 'svelte-eslint-parser'
        }
    ],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        'svelte/valid-compile': 'error',
        'svelte/no-at-debug-tags': 'warn',
        // 접근성은 warn 수준으로 유지
        'svelte/a11y-no-static-element-interactions': 'warn'
    }
};


