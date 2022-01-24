module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: ['prettier', 'plugin:@typescript-eslint/recommended'],
  plugins: ['prettier'],
  ignorePatterns: ['*.config.js', 'node_modules/', 'dist/'],
  rules: {
    'linebreak-style': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-new': 'off',
    'no-return-assign': 'off',
    'no-console': 'off',
    semi: 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'error',
  },
};
