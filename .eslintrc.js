const path = require('path');
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  ignorePatterns: ['node_modules', 'dist'],
  plugins: ['react', 'jsx-a11y', '@typescript-eslint'],
  env: {
    node: true,
    jest: true,
    browser: true,
    es6: true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
      },
    ],
    'react/prop-types': 0,
    'react/no-array-index-key': 'error',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
  },
  settings: {
    alias: {
      map: [['test-utils', path.resolve(__dirname, 'jest/utils')]],
      extensions: ['.ts', '.tsx'],
    },
    react: {
      pragma: 'React',
      version: '16.10.0',
    },
  },
  parser: '@typescript-eslint/parser',
};
