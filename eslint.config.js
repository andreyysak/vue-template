import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
import playwright from 'eslint-plugin-playwright'
import testingLibrary from 'eslint-plugin-testing-library'

export default defineConfig([
  {
    name: 'app/files-to-lint',
    files: ['**/*.{vue,js,jsx,cjs,mjs}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'playwright-report/**', 'test-results/**']),

  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  skipFormatting,

  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'no-prototype-builtins': 'off',
      'no-unused-vars': 'warn',
    },
  },

  {
    files: ['src/**/*.test.js'],
    ...testingLibrary.configs['flat/vue'],
  },

  {
    files: ['e2e/**', 'playwright.config.js', 'vitest.config.js'],
    ...playwright.configs['flat/recommended'],
    languageOptions: {
      ...playwright.configs['flat/recommended'].languageOptions,
      globals: { ...globals.node },
    },
  },
])
