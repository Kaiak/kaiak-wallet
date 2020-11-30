module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    env: {
      es6: true,
      node: true, // for config files
    },
    extends: ['eslint:recommended', 'prettier'],
    overrides: [
      {
        files: ['**/*.svelte'],
        plugins: ['svelte3'], // no plugin:prettier/recommended, it enables eslint-plugin-prettier
        processor: 'svelte3/svelte3',
        env: { browser: true, node: false },
        settings: {
          'svelte3/ignore-styles': () => true,
        },
        // no prettier/prettier rule, it makes eslint run prettier
      },
      {
        files: ['*.ts', '*.spec.ts'],
        extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
        env: { browser: true, node: false },
        rules: {
          'prettier/prettier': 'error',
        },
      },
      {
        files: ['*.spec.ts'],
        env: {
          browser: false,
          jest: true,
        },
      },
    ],
  };