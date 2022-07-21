module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-prettier'],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    unusedimport: 'warn',
    'no-console': import.meta.env.DEV ? 'warn' : 'off',
    'no-debugger': import.meta.env.DEV ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'no-empty': 'warn',
    'vue/multi-word-component-names': 'off',
  },
};
