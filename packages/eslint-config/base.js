import js from '@eslint/js';
import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import onlyWarn from 'eslint-plugin-only-warn';
import tseslint from 'typescript-eslint';

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 **/
export const config = [
    {
        ignores: ['dist/**'],
    },
    {
        extends: [
            js.configs.recommended,
            eslintConfigPrettier,
            ...tseslint.configs.recommended,
        ],
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            onlyWarn,
        },
    },
];
