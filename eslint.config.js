import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import react from 'eslint-plugin-react' // 👈 NUEVO

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      prettierConfig,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react, // 👈 NUEVO
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' }, // 👈 NUEVO
      'import/resolver': {
        vite: {
          configPath: './vite.config.js',
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules, // 👈 NUEVO
      'react/react-in-jsx-scope': 'off', // 👈 NUEVO (no necesitas importar React en cada archivo)
      'react/jsx-uses-react': 'off', // 👈 NUEVO
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      semi: ['error', 'never'],
    },
  },
  {
    extends: [js.configs.recommended, prettierConfig],
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: react, // 👈 NUEVO
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettier,
      import: importPlugin,
    },
    settings: {
      react: { version: 'detect' }, // 👈 NUEVO
      'import/resolver': {
        vite: {
          configPath: './vite.config.js',
        },
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules, // 👈 NUEVO
      'react/react-in-jsx-scope': 'off', // 👈 NUEVO
      'react/jsx-uses-react': 'off', // 👈 NUEVO
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error',
      semi: ['error', 'never'],
    },
  }
)
