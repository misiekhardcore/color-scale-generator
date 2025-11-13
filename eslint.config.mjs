import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import testingLibrary from 'eslint-plugin-testing-library';
import prettier from 'eslint-plugin-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import nextPlugin from '@next/eslint-plugin-next';
import globals from 'globals';

export default [
  {
    ignores: ['node_modules', 'dist', 'build', 'coverage', '.next'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      sourceType: 'module',
      parserOptions: {},
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
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
];
