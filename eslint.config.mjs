import eslint from '@eslint/js'
import globals from 'globals'
import tseslint, { parser } from 'typescript-eslint'
import preferArrow from 'eslint-plugin-prefer-arrow'
import unicorn from 'eslint-plugin-unicorn'

export default tseslint.config(
  {
    ignores: ['src/fixtures/**', 'dist/**', '**/commitlint.config.cjs', '**/eslint.config.mjs'],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
      parser,
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      '@typescript-eslint/no-unnecessary-condition': 'off',
      'dot-notation': 'off',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'default',
          format: null,
        },
        {
          selector: 'variable',
          types: ['boolean'],
          format: ['UPPER_CASE'],
          prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
        },
        {
          selector: 'classProperty',
          types: ['boolean'],
          format: ['camelCase'],
          filter: {
            regex: '^(is|should|has|can|did|will)[A-Z]',
            match: true,
          },
        },
        {
          selector: 'variableLike',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'parameter',
          format: ['camelCase'],
        },
        {
          selector: 'memberLike',
          modifiers: ['private'],
          format: ['camelCase'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'property',
          modifiers: ['readonly'],
          format: ['PascalCase'],
        },
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
        },
      ],
      '@typescript-eslint/no-extraneous-class': 'off',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      complexity: ['error', { max: 10 }],
      'func-names': ['error', 'always'],
    },
  },
  {
    ignores: ['src/fixtures/**', 'dist/**'],
    languageOptions: {
      globals: globals.builtin,
    },
    plugins: {
      unicorn,
      preferArrow,
    },
    rules: {
      'unicorn/filename-case': [
        'warn',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
            kebabCase: true,
          },
        },
      ],
      'unicorn/no-fn-reference-in-iterator': 'off',
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-array-some': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/prefer-spread': 'off',
      'unicorn/no-array-callback-reference': 'off',
      'unicorn/consistent-function-scoping': 'off',
      'unicorn/no-useless-undefined': 'off',
      'unicorn/prefer-ternary': 'off',
      'unicorn/prefer-node-protocol': 'off',
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            Param: true,
            Req: true,
            Res: true,
          },
        },
      ],
    },
  }
)
