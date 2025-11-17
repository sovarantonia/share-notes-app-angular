import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
    ,plugins: {
      '@typescript-eslint': tseslint
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'no-console': 'warn',
      'no-debugger': 'error'
    }
  },
  prettier
]);
