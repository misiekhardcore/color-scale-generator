import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {},
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      'testing-library': testingLibrary,
      prettier,
      '@typescript-eslint': tseslint,
      '@next/next': nextPlugin,
    },

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
  {
    ignores: [
      '**/jest.config.js',
      '**/jest.setup.js',
      '**/lint-staged.config.js',
      '**/next.config.js',
      '**/prettier.config.js',
      '.next',
      '.yarn',
      '.swc',
      'node_modules',
    ],
  },
];
